# VEN / FounderNexus HTML deployment package

Ready-to-upload static site. No npm install, build command, server-side service or API key is required. JavaScript is required for the bundled homepage and calculator.

## Contents
- `index.html`: latest homepage, static stage guides and selectable member testimonials.
- `our-story/index.html`: mission, founding insight and people.
- `success-equation/index.html`: interactive illustrative calculator.
- `brand/index.html`: optional logo comparison page, not linked from the main navigation.
- `assets/` and `src/`: required images, SVG logos, fonts, local visualization libraries and shared styles.
- `.nojekyll`: serves the files as a static GitHub Pages site.

## Deploy to a new repository
1. Extract the ZIP. Upload its CONTENTS to your repository, with `index.html` at the repository root. Do not upload only the ZIP or only index.html.
2. Commit the files to the branch you want to publish, usually `main`.
3. In GitHub, open Settings > Pages. Under Build and deployment, select Deploy from a branch, choose that branch and `/(root)`, then Save.
4. Open the published address shown by GitHub Pages once deployment completes.

## Update your existing fn-site-mockups repository
Upload the package CONTENTS inside `v3-map-c/`, keeping the folder structure intact. The included `assets/` will therefore live at `v3-map-c/assets/`. Do not move it up to the repository root. Keep your existing Pages publishing configuration.

The homepage will remain at https://foundernexus.github.io/fn-site-mockups/v3-map-c/ and the two linked pages will live below that path. The package uses relative paths and also works under a different repository/folder name.

## Before sharing
This preserves the current mockup: four company logo placeholders remain labeled, and Apply, login and legal actions use preview notices rather than live integrations. The Success Equation is an illustrative scenario, not a forecast or verified membership effect. The proposed VEN identity and historical FounderNexus testimonial attribution remain visible.

The original video, machine transcript, internal editorial reviews, Git history and unrelated website versions are excluded.

## Changes in this package
- Wall screen in `member-conversation.jpg` retouched to off (removes the Zoom warning and old slide), on the homepage and Our Story.
- Success Equation now opens with all four leaders participating (14.22% vs 6.87%, 2.07×). Reset returns to this.
- Favicon and link-preview tags (Open Graph) added to every page, plus `assets/og-image.png`. Some apps (LinkedIn, iMessage) need an absolute `og:image` URL; once the Pages address is known, prefix it, e.g. `https://<user>.github.io/<repo>/assets/og-image.png`.
- Wordmark updated to the "Open E, refined" direction (V, three equal bars with a blue center, N) in all three SVGs, the favicon and the link-preview image.
- C2PA metadata stripped from the three wordmark SVGs (about 8 KB to 0.3 KB each).

## Local preview
From this extracted folder: `python -m http.server 8000`, then open http://localhost:8000/. Use HTTP rather than double-clicking the HTML so browser module and data-loading rules match deployment.

## Libraries
The globe uses D3 7.9.0, topojson-client 3.1.0 and world-atlas 2.0.2. These public dependencies and their licenses are included in `assets/vendor/`. Their contents and the existing integrity attributes are retained.

GitHub's publishing instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Packaged from local commit 6b7644b. No changes have been pushed or published by creating this ZIP.
