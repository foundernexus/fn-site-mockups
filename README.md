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

Use the **Comments** button in the bottom-right corner of the mockup:

1. Toggle **Comment mode: On**.
2. Click anywhere on the mockup and add feedback in the prompt.
3. Keep clicking anywhere you have feedback; each note is pinned on-page.
4. Click numbered pins to open note details and remove notes.
5. Click **Copy JSON** to share the feedback payload, or **Copy share link** to share a URL that loads comments directly.
6. Click **Import JSON** to load comments from clipboard.

## GitHub Pages

The `.github/workflows/deploy-pages.yml` workflow publishes the repository root to GitHub Pages on every push to `main`.
