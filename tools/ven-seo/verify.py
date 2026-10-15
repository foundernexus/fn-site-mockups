"""Validate emitted SEO and preserve approved VEN page content and assets."""
import argparse
import json
import re
import struct
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
from xml.etree import ElementTree as ET

from build import SOURCE, REPO, read_bundle


def jpeg_size(data):
    assert data[:2] == b'\xff\xd8', 'Social image must be a real JPEG'
    pos = 2
    while pos + 4 < len(data):
        assert data[pos] == 255
        while data[pos] == 255:
            pos += 1
        marker = data[pos]
        pos += 1
        length = struct.unpack('>H', data[pos:pos + 2])[0]
        if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
            height, width = struct.unpack('>HH', data[pos + 3:pos + 7])
            return width, height
        pos += length
    raise AssertionError('JPEG dimensions not found')


class Page(HTMLParser):
    def __init__(self, value):
        super().__init__(convert_charrefs=True)
        self.title = []
        self.meta = {}
        self.canonical = []
        self.links = []
        self.assets = []
        self.images = []
        self.body = []
        self.headings = []
        self.controls = []
        self.ids = set()
        self.schema = []
        self.in_body = self.in_title = self.in_json = False
        self.skip = 0
        self.feed(value)

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if tag == 'body':
            self.in_body = True
        if tag == 'title':
            self.in_title = True
        if data.get('id'):
            self.ids.add(data['id'])
        if tag == 'meta':
            key = data.get('name') or data.get('property')
            if key:
                assert key not in self.meta, f'Duplicate metadata: {key}'
                self.meta[key] = data.get('content')
        if tag == 'link':
            if data.get('rel') == 'canonical':
                self.canonical.append(data.get('href'))
            elif data.get('href'):
                self.assets.append(data['href'])
        if tag == 'a' and data.get('href'):
            self.links.append(data['href'])
        if tag == 'img':
            self.images.append(data)
            self.assets.append(data.get('src', ''))
        if tag == 'script':
            if data.get('src'):
                self.assets.append(data['src'])
            self.in_json = data.get('type') == 'application/ld+json'
        if self.in_body and re.fullmatch(r'h[1-6]', tag):
            self.headings.append(tag)
        if self.in_body and tag in ('input', 'select', 'option', 'textarea', 'button', 'form'):
            self.controls.append((tag, attrs))
        if tag in ('script', 'style'):
            self.skip += 1

    def handle_endtag(self, tag):
        if tag == 'body':
            self.in_body = False
        if tag == 'title':
            self.in_title = False
        if tag in ('script', 'style'):
            self.skip -= 1
        if tag == 'script':
            self.in_json = False

    def handle_data(self, text):
        if self.in_title:
            self.title.append(text)
        if self.in_json:
            self.schema.append(json.loads(text))
        if self.in_body and not self.skip:
            self.body.extend(text.split())


def verify(output: Path, standalone=False):
    report = json.loads((output / 'ven-seo-build-report.json').read_text(encoding='utf-8'))
    root = output if standalone else output / SOURCE.name
    base = urlsplit(report['site_url']).path
    bundle, source_hash = read_bundle()
    assert source_hash == report['source_sha256']
    parsed = {}
    titles, descriptions = set(), set()
    warnings = []
    for entry in report['pages']:
        path = root / entry['path'] / 'index.html'
        data = path.read_text(encoding='utf-8')
        assert '[[VEN_' not in data
        page, source = Page(data), Page(bundle['pages'][entry['source']]['html'])
        title = ''.join(page.title)
        assert title == entry['title'] and title not in titles
        assert page.meta['description'] == entry['description'] and page.meta['description'] not in descriptions
        titles.add(title)
        descriptions.add(page.meta['description'])
        assert page.canonical == [entry['canonical']]
        assert '#' not in entry['canonical'] and '?' not in entry['canonical']
        assert page.meta['robots'] == entry['robots']
        assert ('noindex' in page.meta['robots']) != report['indexable']
        assert page.headings.count('h1') == 1
        assert page.body == source.body, f'Approved body text changed: {entry["source"]}'
        assert page.headings == source.headings
        assert page.controls == source.controls, f'Form fields/controls changed: {entry["source"]}'
        assert all('alt' in image for image in page.images)
        for image in page.images:
            if not image.get('width') or not image.get('height'):
                warnings.append({'page': entry['path'], 'issue': 'Existing SVG logo lacks explicit dimensions', 'image': image['src']})
        for key in ('og:title', 'twitter:title'):
            assert page.meta[key] == title
        assert page.meta['og:url'] == entry['canonical']
        assert page.meta['og:image'].startswith(report['site_url'])
        assert page.meta['og:image'] == page.meta['twitter:image']
        assert page.meta['og:image:type'] == 'image/jpeg'
        assert page.meta['og:image:width'] == '1200' and page.meta['og:image:height'] == '630'
        assert len(page.schema) == 1
        graph = page.schema[0]['@graph']
        assert {item['@type'] for item in graph} >= {'Organization', 'WebSite', 'WebPage'}
        assert next(item for item in graph if item['@type'] == 'WebPage')['url'] == entry['canonical']
        assert not ({item['@type'] for item in graph} & {'AggregateRating', 'Review', 'FAQPage'})
        if len(title) > 65 or not 100 <= len(page.meta['description']) <= 170:
            warnings.append({'page': entry['path'], 'issue': 'Review search snippet length', 'title_length': len(title), 'description_length': len(page.meta['description'])})
        parsed[entry['path']] = page

    asset_count = internal_count = 0
    for slug, page in parsed.items():
        for value in page.assets:
            if re.match(r'^https?://', value):
                continue
            assert value.startswith(base), (slug, value)
            assert (root / urlsplit(value).path[len(base):]).is_file(), (slug, value)
            asset_count += 1
        for value in page.links:
            if value.startswith('#'):
                # Some section IDs are assigned by the existing enhancement script.
                continue
            if not value.startswith(base):
                assert re.match(r'^(https?:|mailto:|tel:|//)', value), (slug, value)
                continue
            url = urlsplit(value)
            target = url.path[len(base):]
            assert target in parsed or (root / target).is_file(), (slug, value)
            internal_count += 1
        assert 'https://platform.foundernexus.com/registration' in page.links

    for record in bundle['assets'].values():
        if record.get('src') and not re.match(r'^https?://', record['src']):
            relative = record['src']
            assert (SOURCE / relative).read_bytes() == (root / relative).read_bytes()
    sitemap = ET.parse(root / 'sitemap.xml').getroot()
    assert jpeg_size((root / 'seo/social-preview.jpg').read_bytes()) == (1200, 630)
    locs = [node.text for node in sitemap.findall('{*}url/{*}loc')]
    assert len(locs) == report['sitemap_url_count']
    assert len(locs) == len(set(locs))
    if report['indexable']:
        assert set(locs) == {entry['canonical'] for entry in report['pages']}
        assert all(url.startswith('https://www.venexecs.com/') for url in locs)
        assert 'Sitemap: https://www.venexecs.com/sitemap.xml' in (root / 'robots.txt').read_text()
    else:
        assert not locs
    assert 'Disallow: /' not in (root / 'robots.txt').read_text()

    unaffected = 0
    if not standalone:
        for path in REPO.rglob('*'):
            if not path.is_file():
                continue
            relative = path.relative_to(REPO)
            if relative.parts[0] in ('.git', '.github', SOURCE.name) or '__pycache__' in relative.parts or relative.parts[:2] == ('tools', 'ven-seo'):
                continue
            assert (output / relative).read_bytes() == path.read_bytes(), f'Unrelated repository file changed: {relative}'
            unaffected += 1
    result = {
        'mode': report['mode'], 'passed': True, 'pages': len(parsed),
        'unique_titles': len(titles), 'unique_descriptions': len(descriptions),
        'canonical_social_and_structured_data_checks': 'passed',
        'approved_body_text_headings_controls_and_portraits': 'unchanged',
        'internal_links_checked': internal_count, 'asset_references_checked': asset_count,
        'other_repository_files_preserved': unaffected, 'sitemap_urls': len(locs),
        'warnings': warnings,
    }
    (output / 'ven-seo-validation.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--standalone', action='store_true')
    args = parser.parse_args()
    print(json.dumps(verify(args.output, args.standalone), ensure_ascii=False, indent=2))
