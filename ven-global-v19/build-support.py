"""Wrap supporting content in the homepage's shared header/footer."""
from pathlib import Path
import re
import argparse

root = Path(__file__).resolve().parent
home = (root / 'index.html').read_text(encoding='utf-8')
shared_style = re.search(r'<link rel="stylesheet" href="(styles\.css[^\"]*)"', home).group(1)
shared_script = re.search(r'<script src="(app\.js[^\"]*)"', home).group(1)
warm_style = re.search(r'<link rel="stylesheet" href="(warm-v19\.css[^\"]*)"', home).group(1)
header = re.search(r'<header\b.*?</header>', home, re.S).group(0)
footer = re.search(r'<footer\b.*?</footer>', home, re.S).group(0)
header = re.sub(r'href="#(?!main)([^"]+)"', r'href="index.html#\1"', header)
footer = re.sub(r'href="#(?!main)([^"]+)"', r'href="index.html#\1"', footer)
titles = {
    'blog': ('Blog & field notes', 'Practical reading on the decisions facing venture-backed leadership teams, from the FounderNexus library.'),
    'events': ('Events & working sessions', 'Find upcoming sessions on fundraising, AI, sales, marketing and engineering. Explore relevant conversations for your next decision.'),
    'apply': ('Explore membership', 'Explore individual or team membership with VEN Global. Start with your role, stage, and priorities.'),
    'team': ('For your leadership team', 'A shareable overview of VEN Global membership for executive leaders and company sponsors.'),
    'story': ('Our story', 'Built on FounderNexus. Relevant experience for the leadership teams delivering a venture-backed company’s plan.'),
    'equation': ('The Success Equation', 'Better-informed decisions can create better options for the next one. Explore VEN Global support for each member’s top two challenges every month.'),
    'challenges': ('Decision examples in practice', 'Explore illustrative challenges and relevant experience for venture-backed leaders. Keep up to two starting points for a membership fit conversation.'),
}
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--page', choices=list(titles), help='Rebuild only this supporting page.')
args = parser.parse_args()
selected = {key: value for key, value in titles.items() if not args.page or key == args.page}
for key, (title, description) in selected.items():
    content = (root / f'{key}-content.html').read_text(encoding='utf-8')
    extras = '<link rel="stylesheet" href="equation.css?v=15.1"><script src="equation.js?v=15.1" defer></script>' if key == 'equation' else ''
    if key == 'events':
        extras = '<link rel="stylesheet" href="events.css?v=15.1"><script src="events.js?v=15.1" defer></script>'
    if key == 'challenges':
        extras = '<link rel="stylesheet" href="homepage-v16.css?v=16.1"><link rel="stylesheet" href="depth-v17.css?v=17.3">'
    if key == 'story':
        extras = '<link rel="stylesheet" href="depth-v17.css?v=17.3">'
    if key == 'team':
        extras = '<link rel="stylesheet" href="team-decisions-v17.4.css?v=17.4">'
    header_for_page = re.sub(r'href="' + re.escape(key) + r'\.html(?:\?[^"]*)?"', lambda match: match.group(0) + ' aria-current="page"', header)
    html = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} | VEN Global</title><meta name="description" content="{description}"><meta name="theme-color" content="#f7f4ee">
<link rel="icon" href="assets/ven-logo.svg" type="image/svg+xml"><link rel="stylesheet" href="{shared_style}"><link rel="stylesheet" href="supporting.css?v=16.0"><link rel="stylesheet" href="supporting-v16.css?v=16.0">
<script src="{shared_script}" defer></script><script src="supporting.js?v=16.0" defer></script>{extras}<link rel="stylesheet" href="{warm_style}"></head>
<body class="warm-v19"><a class="skip-link" href="#main">Skip to content</a>{header_for_page}{content}{footer}</body></html>'''
    (root / f'{key}.html').write_text(html, encoding='utf-8')
print(f'Built {len(selected)} supporting pages.')
