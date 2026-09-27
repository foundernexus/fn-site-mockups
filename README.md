# FounderNexus Site Mockups

This repo hosts static FounderNexus website mockups for internal review through GitHub Pages.

## Mockups in this repo

| Mockup | Path | Live |
| --- | --- | --- |
| Acquisition homepage prototype | `vn-home-mockup.html` | https://foundernexus.github.io/fn-site-mockups/vn-home-mockup.html |
| Public homepage (June 2026 v2) | `index.html` | https://foundernexus.github.io/fn-site-mockups/ |
| Homepage v3 — Map C | `v3-map-c/` | https://foundernexus.github.io/fn-site-mockups/v3-map-c/ |
| Member portal redesign — clickable demo | `dashboard-demo/` | https://foundernexus.github.io/fn-site-mockups/dashboard-demo/ |

## Homepage v3 — Map C

`v3-map-c/` is the September 2026 homepage prototype. Its story focuses on leadership teams of venture-backed companies: value, early member proof, membership mechanism, concrete decisions, credentials, fit, joining and a final invitation. A company-name strip credits the actual member voices beneath the hero, followed by real session photography and an unchanged testimonial. Founder credentials and session-contributor credentials are labeled separately farther down. The Map C hero, supplied photography and FounderNexus logo remain. Illustrative decision examples replace the assumed success-probability calculator. See [the editorial audit](v3-map-c/EDITORIAL-AUDIT.md) for sources, design decisions, self-audit corrections and remaining launch requirements.

The map loads geography and drawing libraries from public CDNs. Its people and locations are illustrative, and motion can be paused. Sessions are examples, not a live event calendar. Application, login and other unfinished destinations display a preview notice; this page does not collect applications.

### Editing Map C

The navigation includes [Success Equation](v3-map-c/success-equation/), the dedicated calculator page. Its original-style calculator compares hypothetical decision outcomes and lets visitors explore support across an example leadership team. Independent peer-learning research is clearly separated from FounderNexus results. See [the model and evidence notes](v3-map-c/success-equation/README.md). This addition is on the review branch and is not published to the live default branch.

Edit `v3-map-c/src/page.html`, `src/hero-map.html`, and `src/refinements.css`, then run `python v3-map-c/build.py` from the repository root. Commit both the sources and rebuilt `v3-map-c/index.html`. The builder preserves the original embedded asset manifest. Serve the repository root locally to keep the map's font paths working.

The original export runtime has a broad camel-case attribute transform, including within iframe documents. Keep newly assigned JavaScript variable names in `hero-map.html` lowercase (for example, `manualpaused`) and check the rendered iframe after rebuilding.

Review URL: https://foundernexus.github.io/fn-site-mockups/v3-map-c/

## Member portal demo

`dashboard-demo/` is a clickable prototype of the redesigned member portal: Dashboard,
Advisors, Directory, Content library, Benefits, Profile, Account, plus a mobile
Dashboard proposal. Search, filters, dialogs, event / benefit / advisor / member /
membership pop-outs, and Register buttons all respond; content is static sample data.
The partner contact sits in a pale-blue card under the sidebar nav.

Dashed blue **Notes** chips mark open decisions and are visible by default. A navy
**Prototype controls** bar at the top of the demo flips Active member / Invited
prospect, turns notes on or off, and switches the Profile calendar between
connected and not connected. `?annotations=0`, `?member=invited`, and
`?calendar=0` do the same via URL. See `dashboard-demo/README.md` for the full
list of review flags and open decisions.

## Current homepage mockup

The current homepage mockup is the June 2026 v2 pass built from the local June 14 live clone.

Scope of this pass:

- Replace legacy tier language with Stage 1 through Stage 4.
- Add a member-facing Nexus Partner section.
- Remove legacy chapter-chair/local-chapter copy from the editable page surface.
- Keep broader page expansion and new subpages for a later pass.

Review files:

- `index.html` is the reviewable homepage.
- `FounderNexus-v2-copy-review.docx` is the Word copy review file for comments and markup.
- `styles.css` and `script.js` are the static page assets.
- `LIVE-DIFF.md` documents intentional differences from the June 14 live clone.

Hosted downloads:

- Homepage: https://foundernexus.github.io/fn-site-mockups/
- Copy review DOCX: https://foundernexus.github.io/fn-site-mockups/FounderNexus-v2-copy-review.docx

## Mockup comment workflow

The homepage mockup uses [Agentation](https://agentation.com) for visual feedback.
(The member portal demo does not carry the toolbar — send that feedback directly.)

1. Open the live homepage mockup URL.
2. Click the **Agentation icon** in the bottom-right corner to activate annotation mode.
3. Hover over any element to highlight it, then click to add a note.
4. When done, click the **Copy** button in the Agentation toolbar — a pre-filled GitHub issue opens in a new tab.
5. Review the issue content and click **Submit new issue** to send feedback.

## GitHub Pages

The `.github/workflows/deploy-pages.yml` workflow publishes the repository root to GitHub Pages on every push to `main`.
