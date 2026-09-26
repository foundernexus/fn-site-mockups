"""Rebuild the existing self-contained export from editable sources (stdlib only)."""
from pathlib import Path
import html
import json
import re

root = Path(__file__).resolve().parent
output = root / 'index.html'
raw = output.read_text(encoding='utf-8')
match = re.search(r'(<script type="__bundler/template">\s*)(.*?)(\s*</script>)', raw, re.S)
if not match:
    raise ValueError('Missing export template; refusing to change the bundle')
page = (root / 'src/page.html').read_text(encoding='utf-8')
hero = (root / 'src/hero-map.html').read_text(encoding='utf-8')
css = (root / 'src/refinements.css').read_text(encoding='utf-8')
assert page.count('{{HERO_MAP_DOCUMENT}}') == 1
page = page.replace('{{HERO_MAP_DOCUMENT}}', html.escape(hero, quote=True))
page = page.replace('</helmet>', '<style data-brand-refinement>\n' + css + '\n</style>\n</helmet>')
encoded = json.dumps(page, ensure_ascii=True).replace('</', '<\\/')
output.write_text(raw[:match.start(2)] + encoded + raw[match.end(2):], encoding='utf-8')
print('Updated v3-map-c/index.html; embedded asset manifest retained unchanged.')
