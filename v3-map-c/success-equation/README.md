# Success Equation preview

Dedicated page linked from the Map C homepage navigation. Serve the repository root, then open `/v3-map-c/success-equation/`. All fonts, styles, logo and scripts load locally. The official logo is extracted unchanged from the homepage's embedded asset manifest.

## Design and content

- A centered, spacious introduction leads to the calculator as the main feature.
- Three keyboard-operable sliders compare two assumed decision scores across a sequence of decisions. Example presets, reset, live chart and readable results respond immediately.
- On phones, a compact result beside the controls supplements the full result panel below. Results also have a debounced accessible status announcement.
- An expandable method explains the original multiplicative idea; the closing section connects it to relevant experience and Nexus Partner support for leadership teams.
- Application links return to the homepage invitation. The homepage application itself remains a prototype notice. Login on this page also shows a local preview notice.

## Model choice

The original calculator used `(quality / 100) ** decisions`, labeled its results as success probabilities and attributed the higher assumption to FounderNexus. This version preserves that mathematical interaction as an illustrative index: `100 × (score / 100) ** decisions`.

Scenario A and B are user-set assumptions, not with/without-membership estimates. The score is not a success probability or a financial projection. The ratio is B divided by A, displayed only when A is nonzero. Real decisions can be correlated, revisited and differently weighted; the model does not capture that complexity. Adding factors in [0,1] reduces the absolute score or leaves it unchanged, even when the relative gap widens. This is explained in the page's method section.

Defaults: 10 decisions, scores 80 and 85. Combined scores: 10.74 and 19.69 out of 100; ratio: 1.83×. These defaults are examples, not measured benchmarks.

## Editing and verification

Edit `index.html`, `style.css`, `calculator.js`, and the pure calculation module `model.mjs` directly. Shared header styles come from `../src/refinements.css`. Rebuild the homepage after editing its source navigation with `python v3-map-c/build.py`.

Run `node --test v3-map-c/success-equation/model.test.mjs` from the repo root. Tests cover the default calculation, equal/lower/perfect scores, zero-reference handling, small-number formatting, sequence length and invalid values. Browser checks cover presets, keyboard changes, reset, method disclosure, responsive boundaries and links back to the homepage.

Saved to the existing review branch. Publishing the live/default branch is outside this preview pass.
