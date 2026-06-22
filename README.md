# FounderNexus Site Mockups

This repo hosts static FounderNexus website mockups for internal review through GitHub Pages.

## Current Mockup

The current homepage mockup is the June 2026 v2 pass built from the local June 14 live clone.

Scope of this pass:

- Replace legacy tier language with Stage 1 through Stage 4.
- Add a member-facing Nexus Partner section.
- Remove legacy chapter-chair/local-chapter copy from the editable page surface.
- Keep broader page expansion and new subpages for a later pass.

Review files:

- `index.html` is the reviewable homepage.
- `styles.css` and `script.js` are the static page assets.
- `LIVE-DIFF.md` documents intentional differences from the June 14 live clone.

## Mockup comment workflow

This site uses [Agentation](https://agentation.com) for visual feedback.

1. Open the live mockup URL.
2. Click the **Agentation icon** in the bottom-right corner to activate annotation mode.
3. Hover over any element to highlight it, then click to add a note.
4. When done, click the **Copy** button in the Agentation toolbar — a pre-filled GitHub issue opens in a new tab.
5. Review the issue content and click **Submit new issue** to send feedback.

## GitHub Pages

The `.github/workflows/deploy-pages.yml` workflow publishes the repository root to GitHub Pages on every push to `main`.
