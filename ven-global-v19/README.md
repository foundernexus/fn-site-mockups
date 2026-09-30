# VEN Global v19: warm main-site mockup

Open `index.html` for the full site, or `HANDOFF.html` for the team's review guide. All files required for a static-host preview are local. The inquiry is a demonstration and sends nothing.

This version responds to the warmth regression audit. It preserves the previous main mockup and the separate v18 homepage explorations.

## Editable sources

- Home: `index.html`.
- Supporting-page content: `story-content.html`, `team-content.html` and the other `*-content.html` fragments.
- Shared presentation: the site's linked stylesheets, including `warm-v19.css`.
- Build wrappers after changing fragments with `python build-support.py`; the generated `story.html`, `team.html` and other pages are what the preview serves.
- Local photographs, fonts and original company marks: `assets/`.

The portable package includes the content fragments and wrapper helper. No build is needed to view the delivered site.

## Review evidence

`AUDIT.md` explains the regression and the priorities for this revision. `DESIGN-NOTES.md` explains the visual and narrative decisions. `COPY-REVIEW.md` and `REVIEW.md` record the completed review scope, actual checks and approval. `validation.json` records static and packaging checks. `qa/browser-validation.json` records the 48 responsive checks and essential interactions. The review guide links to rendered previews; independent visual evidence is included in `review-evidence/`.

Member and sponsor evidence is visibly unsupplied. Existing quotes, company marks and photos retain their FounderNexus context. Events are a dated snapshot, and article/event/member-login links point to the existing services.

## Internal validation

The working source has `validate.py` and `package.py`. These compare with preserved local baselines and require final independent approval before packaging; they are not needed or included in the team's portable HTML handoff.
