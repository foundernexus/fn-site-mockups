"""Publish approved VEN bundle pages as ordinary HTML; no third-party packages."""
from __future__ import annotations

import argparse
import base64
import hashlib
import html
import json
import re
import shutil
from pathlib import Path, PurePosixPath
from urllib.parse import parse_qsl, urlencode, urljoin, urlsplit, urlunsplit
from xml.etree import ElementTree as ET

TOOLS = Path(__file__).resolve().parent
REPO = TOOLS.parents[1]
SOURCE = REPO / 'ven-hospitality-v13-3'
CONFIG = TOOLS / 'site.json'
HOME = 'clean/index.html'
DIRECTORY = {'clean/experts.html', 'clean/experts-2.html'}


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def read_bundle():
    data = (SOURCE / 'index.html').read_bytes()
    match = re.search(r'<script id="ven-bundle" type="application/json">(.*?)</script>', data.decode('utf-8'), re.S)
    if not match:
        raise ValueError('The approved VEN source bundle was not found')
    return json.loads(match[1]), digest(data)


def write(path: Path, value: str | bytes):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(value.encode('utf-8') if isinstance(value, str) else value)


def safe_relative(value: str) -> PurePosixPath:
    path = PurePosixPath(value)
    if path.is_absolute() or '..' in path.parts or not value or '\\' in value:
        raise ValueError(f'Unsafe local file path: {value}')
    return path


def resolve_link(value: str, current: str, pages: dict) -> str | None:
    """Map original relative page links to clean paths, preserving query and anchors."""
    if not value or value.startswith('#') or re.match(r'^(?:[a-z][a-z0-9+.-]*:|//)', value, re.I):
        return None
    url = urlsplit(urljoin('https://ven.local/' + current, html.unescape(value)))
    route = url.path.lstrip('/')
    query = parse_qsl(url.query, keep_blank_values=True)
    if route in DIRECTORY and any(key == 'page' for key, _ in query):
        requested = dict(query).get('page', '1')
        try:
            page = max(1, min(2, int(requested)))
        except ValueError:
            page = 1
        route = 'clean/experts.html' if page == 1 else 'clean/experts-2.html'
        query = [(key, val) for key, val in query if key != 'page']
    if route not in pages:
        return None
    return urlunsplit(('', '', pages[route]['path'], urlencode(query), url.fragment))


def rewrite_links(body: str, route: str, pages: dict, base_path: str) -> str:
    def link(match):
        value = resolve_link(match[3], route, pages)
        if value is None:
            return match[0]
        return match[1] + match[2] + html.escape(base_path + value, quote=True) + match[2]
    return re.sub(r'(<a\b[^>]*?\bhref=)([\"\'])(.*?)\2', link, body, flags=re.I | re.S)


def svg_dimensions(body: str, target: Path, base_path: str, changes: list) -> str:
    def image(match):
        tag = match[0]
        src = re.search(r'\bsrc=[\"\']([^\"\']+)[\"\']', tag)
        if not src or not src[1].startswith(base_path) or not src[1].endswith('.svg'):
            return tag
        if re.search(r'\bwidth=', tag) and re.search(r'\bheight=', tag):
            return tag
        root = ET.parse(target / src[1][len(base_path):]).getroot()
        view = root.get('viewBox', '').replace(',', ' ').split()
        width, height = root.get('width', ''), root.get('height', '')
        if not re.fullmatch(r'[\d.]+(?:px)?', width) or not re.fullmatch(r'[\d.]+(?:px)?', height):
            if len(view) != 4:
                return tag
            width, height = view[2:]
        width, height = round(float(width.removesuffix('px'))), round(float(height.removesuffix('px')))
        if width <= 0 or height <= 0:
            return tag
        suffix = '/>' if tag.endswith('/>') else '>'
        extra = ''
        if not re.search(r'\bwidth=', tag):
            extra += f' width="{width}"'
        if not re.search(r'\bheight=', tag):
            extra += f' height="{height}"'
        changes.append({'image': src[1], 'width': width, 'height': height})
        return tag[:-len(suffix)] + extra + suffix
    return re.sub(r'<img\b[^>]*>', image, body, flags=re.I)


def schema(config: dict, route: str, site_url: str) -> dict:
    meta = config['pages'][route]
    canonical = urljoin(site_url, meta['path'])
    organization = {
        '@type': 'Organization', '@id': site_url + '#organization',
        'name': config['name'], 'alternateName': config['alternate_name'],
        'url': site_url, 'description': config['description'],
        'logo': {'@type': 'ImageObject', 'url': urljoin(site_url, 'seo/ven-icon-512.png'), 'width': 512, 'height': 512},
    }
    website = {
        '@type': 'WebSite', '@id': site_url + '#website',
        'url': site_url, 'name': config['name'], 'alternateName': config['alternate_name'],
        'publisher': {'@id': site_url + '#organization'}, 'inLanguage': 'en',
    }
    page = {
        '@type': 'WebPage', '@id': canonical + '#webpage',
        'url': canonical, 'name': meta['title'], 'description': meta['description'],
        'isPartOf': {'@id': site_url + '#website'}, 'about': {'@id': site_url + '#organization'},
        'inLanguage': 'en',
    }
    graph = [organization, website, page]
    if route != HOME:
        trail = [HOME]
        if meta.get('parent'):
            trail.append(meta['parent'])
        trail.append(route)
        breadcrumb = {
            '@type': 'BreadcrumbList', '@id': canonical + '#breadcrumb',
            'itemListElement': [
                {'@type': 'ListItem', 'position': i, 'name': config['pages'][item]['label'],
                 'item': urljoin(site_url, config['pages'][item]['path'])}
                for i, item in enumerate(trail, 1)
            ],
        }
        graph.append(breadcrumb)
        page['breadcrumb'] = {'@id': breadcrumb['@id']}
    return {'@context': 'https://schema.org', '@graph': graph}


def adapt_script(name: str, script: str, changes: list) -> str:
    """Only adapt page-context reads needed by the existing scripts on clean URLs."""
    replacements = {
        'study/site.js': [
            ("const page = (location.hash.match(/clean\\/([\\w-]+)\\.html/) || [])[1] || '';",
             "const page = (window.__VEN_PAGE_ROUTE__ || '').replace(/\\.html$/, '') || (location.hash.match(/clean\\/([\\w-]+)\\.html/) || [])[1] || '';"),
        ],
        'care/advisor-directory.js': [
            ('if (page > 1) document.title = `Our operational advisors — Page ${page} | Venture Executive Network`;',
             'if (page > 1) document.title = window.__VEN_SEO_TITLE__ || `Our operational advisors — Page ${page} | Venture Executive Network`;'),
        ],
        'clarity/hubspot-application.js': [
            ("const routeQuery = new URLSearchParams(url.hash.split('?')[1]?.split('#')[0] || '');",
             "const routeQuery = new URLSearchParams(window.__VEN_PAGE_QUERY__ || url.hash.split('?')[1]?.split('#')[0] || url.search);"),
        ],
    }
    for find, replacement in replacements.get(name, []):
        if script.count(find) != 1:
            raise ValueError(f'Expected one page-context adaptation in {name}; source has changed')
        script = script.replace(find, replacement, 1)
        changes.append({'script': name, 'find': find, 'replacement': replacement})
    return script


def build(output: Path, mode: str = 'preview', site_url: str | None = None, standalone: bool = False) -> dict:
    config = json.loads(CONFIG.read_text(encoding='utf-8'))
    bundle, source_hash = read_bundle()
    if set(config['pages']) != set(bundle['pages']):
        raise ValueError('Add SEO metadata and a clean path for every new source page before publishing')
    if len({item['path'] for item in config['pages'].values()}) != len(config['pages']):
        raise ValueError('Clean page paths must be unique')
    for item in config['pages'].values():
        if item['path']:
            safe_relative(item['path'])
    site_url = (site_url or config['production_url' if mode == 'production' else 'preview_url']).rstrip('/') + '/'
    parts = urlsplit(site_url)
    if parts.scheme not in ('http', 'https') or not parts.netloc or parts.query or parts.fragment:
        raise ValueError('Use a complete site URL with no query or hash')
    if mode == 'production' and (parts.scheme != 'https' or not standalone):
        raise ValueError('Production must use HTTPS and --standalone for the final site root')
    base_path = parts.path
    output = output.resolve()
    if output == REPO or output.is_relative_to(REPO):
        raise ValueError('Choose a separate output folder outside the source checkout')
    if output.exists() and any(output.iterdir()):
        raise ValueError('Output must be new or empty; no source or existing output is deleted')
    output.mkdir(parents=True, exist_ok=True)
    if standalone:
        shutil.copytree(SOURCE, output, dirs_exist_ok=True)
        target = output
    else:
        def ignore(directory, names):
            hidden = {'.git', '.github', '__pycache__'}
            if Path(directory).resolve() == (REPO / 'tools').resolve():
                hidden.add('ven-seo')
            return [name for name in names if name in hidden]
        shutil.copytree(REPO, output, dirs_exist_ok=True, ignore=ignore)
        target = output / SOURCE.name

    asset_paths = {}
    for name, record in bundle['assets'].items():
        src = record.get('src')
        if src:
            if re.match(r'^https?://', src):
                asset_paths[name] = src
                continue
            relative = safe_relative(src)
            if not (SOURCE / relative).is_file():
                raise ValueError(f'Missing source asset: {src}')
        else:
            relative = safe_relative('assets/embedded/' + name)
            write(target / relative, base64.b64decode(record['base64'], validate=True))
        asset_paths[name] = base_path + relative.as_posix()

    def fill_assets(value):
        return re.sub(r'\[\[VEN_ASSET:([^\]]+)\]\]', lambda m: asset_paths[m[1]], value)

    styles = {}
    for name, style in bundle['styles'].items():
        content = fill_assets(style)
        slug = re.sub(r'[^a-zA-Z0-9_-]', '-', name.removesuffix('.css'))
        filename = f'seo/styles/{slug}.{digest(content.encode())[:12]}.css'
        write(target / filename, content)
        styles[name] = base_path + filename

    scripts = {}
    script_changes = []
    for name, script in bundle['scripts'].items():
        content = fill_assets(adapt_script(name, script, script_changes))
        slug = re.sub(r'[^a-zA-Z0-9_-]', '-', name.removesuffix('.js'))
        filename = f'seo/scripts/{slug}.{digest(content.encode())[:12]}.js'
        write(target / filename, content)
        scripts[name] = base_path + filename
    runtime = (TOOLS / 'runtime.js').read_bytes()
    runtime_path = f'seo/scripts/runtime.{digest(runtime)[:12]}.js'
    write(target / runtime_path, runtime)

    # Supplied icons and a browser-rendered card using the supplied wordmark.
    for name in ('favicon.svg', 'favicon-32.png', 'ven-icon-512.png', 'social-preview.jpg'):
        shutil.copy2(TOOLS / 'brand' / name, target / 'seo' / name)
    manifest = {
        'name': config['name'], 'short_name': 'VEN', 'start_url': base_path, 'scope': base_path,
        'display': 'browser', 'background_color': '#F4F1E9', 'theme_color': '#F4F1E9',
        'icons': [{'src': base_path + 'seo/ven-icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any'}],
    }
    write(target / 'site.webmanifest', json.dumps(manifest, ensure_ascii=False, separators=(',', ':')))

    indexable = mode == 'production'
    robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' if indexable else 'noindex,nofollow'
    route_map = {route: item['path'] for route, item in config['pages'].items()}
    pages_report = []
    image_changes = []
    for route, source in bundle['pages'].items():
        meta = config['pages'][route]
        canonical = urljoin(site_url, meta['path'])
        document = source['html']
        head_match = re.search(r'<head\b[^>]*>(.*?)</head>', document, re.S | re.I)
        body_match = re.search(r'<body\b([^>]*)>(.*?)</body>', document, re.S | re.I)
        if not head_match or not body_match:
            raise ValueError(f'Incomplete source document: {route}')
        head = head_match[1]
        head = re.sub(r'<title\b[^>]*>.*?</title>', '', head, flags=re.S | re.I)
        head = re.sub(r'<meta\b[^>]*(?:name|property)=[\"\'](?:description|robots|googlebot|og:[^\"\']+|twitter:[^\"\']+)[\"\'][^>]*>', '', head, flags=re.I)
        head = re.sub(r'<link\b[^>]*rel=[\"\']canonical[\"\'][^>]*>', '', head, flags=re.I)

        def stylesheet(match):
            return f'<link rel="stylesheet" href="{html.escape(styles[match[1]], quote=True)}">'
        head = re.sub(r'<style\b[^>]*>\s*\[\[VEN_STYLE:([^\]]+)\]\]\s*</style>', stylesheet, head, flags=re.S | re.I)
        head = fill_assets(head)
        esc = lambda value: html.escape(value, quote=True)
        tags = [
            f'<title>{esc(meta["title"])}</title>',
            f'<meta name="description" content="{esc(meta["description"])}">',
            f'<meta name="robots" content="{robots}">',
            f'<link rel="canonical" href="{esc(canonical)}">',
            '<meta property="og:type" content="website">',
            '<meta property="og:locale" content="en_US">',
            f'<meta property="og:site_name" content="{esc(config["name"])}">',
            f'<meta property="og:title" content="{esc(meta["title"])}">',
            f'<meta property="og:description" content="{esc(meta["description"])}">',
            f'<meta property="og:url" content="{esc(canonical)}">',
            f'<meta property="og:image" content="{esc(urljoin(site_url, "seo/social-preview.jpg"))}">',
            '<meta property="og:image:type" content="image/jpeg">',
            '<meta property="og:image:width" content="1200">',
            '<meta property="og:image:height" content="630">',
            '<meta property="og:image:alt" content="VEN: Accepting venture money raises expectations.">',
            '<meta name="twitter:card" content="summary_large_image">',
            f'<meta name="twitter:title" content="{esc(meta["title"])}">',
            f'<meta name="twitter:description" content="{esc(meta["description"])}">',
            f'<meta name="twitter:image" content="{esc(urljoin(site_url, "seo/social-preview.jpg"))}">',
            '<meta name="twitter:image:alt" content="VEN: Accepting venture money raises expectations.">',
            f'<link rel="icon" type="image/svg+xml" href="{base_path}seo/favicon.svg">',
            f'<link rel="icon" type="image/png" sizes="32x32" href="{base_path}seo/favicon-32.png">',
            f'<link rel="apple-touch-icon" href="{base_path}seo/ven-icon-512.png">',
            f'<link rel="manifest" href="{base_path}site.webmanifest">',
            f'<link rel="preload" as="font" type="font/woff2" crossorigin href="{asset_paths["221a4135d06a4b33abbd.woff2"]}">',
            f'<link rel="preload" as="font" type="font/woff2" crossorigin href="{asset_paths["newsreader-400-normal-e66067814f1c.woff2"]}">',
        ]
        structured = json.dumps(schema(config, route, site_url), ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
        context = json.dumps({'route': route, 'routes': route_map, 'basePath': base_path, 'title': meta['title'], 'advisorPages': 2}, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
        tags.extend([
            f'<script type="application/ld+json">{structured}</script>',
            f'<script id="ven-page-context" type="application/json">{context}</script>',
            f'<script defer src="{base_path}{runtime_path}"></script>',
        ])
        tags.extend(f'<script defer data-source="{esc(name)}" src="{esc(scripts[name])}"></script>' for name in source['scripts'])
        body = rewrite_links(fill_assets(body_match[2]), route, config['pages'], base_path)
        body = svg_dimensions(body, target, base_path, image_changes)
        rendered = '<!doctype html><html lang="en"><head>' + head + '\n' + '\n'.join(tags) + '</head><body' + body_match[1] + '>' + body + '</body></html>\n'
        if '[[VEN_' in rendered:
            raise ValueError(f'Unresolved source placeholder: {route}')
        filename = Path(meta['path']) / 'index.html'
        write(target / filename, rendered)
        pages_report.append({'source': route, 'path': meta['path'], 'title': meta['title'], 'description': meta['description'], 'canonical': canonical, 'bytes': len(rendered.encode()), 'robots': robots})

    urls = ''.join(f'<url><loc>{html.escape(urljoin(site_url, item["path"]))}</loc></url>' for item in config['pages'].values()) if indexable else ''
    write(target / 'sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls + '</urlset>\n')
    # Do not block crawling of noindex pages: crawlers need to see their robots meta tag.
    crawl = 'User-agent: *\nAllow: /\n'
    if indexable:
        crawl += '\nSitemap: ' + urljoin(site_url, 'sitemap.xml') + '\n'
    else:
        crawl = '# Preview: every HTML page carries noindex,nofollow.\n' + crawl
    write(target / 'robots.txt', crawl)
    assert digest((SOURCE / 'index.html').read_bytes()) == source_hash, 'The source bundle changed during build'
    report = {
        'mode': mode, 'site_url': site_url, 'indexable': indexable, 'source_sha256': source_hash,
        'source_bundle_unchanged': True, 'page_count': len(pages_report), 'pages': pages_report,
        'source_scripts_changed': False, 'emitted_script_page_context_adaptations': script_changes,
        'source_styles_and_portraits_unchanged': True,
        'emitted_svg_intrinsic_dimensions': image_changes,
        'brand_assets': 'Supplied Ink icons copied exactly; share card renders the supplied wordmark and approved headline on ivory. Final branding remains open.',
        'sitemap_url_count': len(pages_report) if indexable else 0,
    }
    write(output / 'ven-seo-build-report.json', json.dumps(report, ensure_ascii=False, indent=2))
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--mode', choices=('preview', 'production'), default='preview')
    parser.add_argument('--site-url')
    parser.add_argument('--standalone', action='store_true')
    args = parser.parse_args()
    report = build(args.output, args.mode, args.site_url, args.standalone)
    print(f'{report["page_count"]} VEN pages built for {report["site_url"]}; indexing {"enabled" if report["indexable"] else "disabled"}. Source bundle preserved.')
