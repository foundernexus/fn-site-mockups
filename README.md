# FounderNexus Site Mockups

This repo hosts static FounderNexus website mockups for internal review through GitHub Pages.

## Mockups in this repo

| Mockup | Path | Live |
| --- | --- | --- |
| Public homepage (June 2026 v2) | `index.html` | https://foundernexus.github.io/fn-site-mockups/ |
| Member portal redesign — clickable demo | `dashboard-demo/` | https://foundernexus.github.io/fn-site-mockups/dashboard-demo/ |

## Member portal demo

`dashboard-demo/` is a clickable prototype of the redesigned member portal: Dashboard,
Advisors, Directory, Content library, Benefits, Profile, Account, plus a mobile
Dashboard proposal. Search, filters, dialogs, event / benefit / advisor / member /
membership pop-outs, and Register buttons all respond; content is static sample data.
The partner contact sits in a pale-blue card under the sidebar nav.

Dashed blue **Notes** chips mark open decisions and are visible by default. Add
`?annotations=0` for the clean product view, or `?member=invited` for the
invited-prospect conversion flow. See `dashboard-demo/README.md` for the full list
of review flags and open decisions.

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
