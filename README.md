# FounderNexus Site Mockups

This repo hosts static FounderNexus website mockups for internal review through GitHub Pages.

## Mockups in this repo

| Mockup | Path | Live |
| --- | --- | --- |
| Acquisition homepage prototype | `vn-home-mockup.html` | https://foundernexus.github.io/fn-site-mockups/vn-home-mockup.html |
| Public homepage (June 2026 v2) | `index.html` | https://foundernexus.github.io/fn-site-mockups/ |
| Homepage v3 — Map C | `v3-map-c/` | https://foundernexus.github.io/fn-site-mockups/v3-map-c/ |
| VEN redesign | `ven/` | https://foundernexus.github.io/fn-site-mockups/ven/ |
| VEN Global team review | `ven-global/` | https://foundernexus.github.io/fn-site-mockups/ven-global/ |
| VEN Global v19 team review | `ven-global-v19/` | https://foundernexus.github.io/fn-site-mockups/ven-global-v19/ |
| VEN homepage design review | `ven-homepage-review/` | https://foundernexus.github.io/fn-site-mockups/ven-homepage-review/ |
| VEN logo and icon review | `ven-brand-review/` | https://foundernexus.github.io/fn-site-mockups/ven-brand-review/ |
| Member portal redesign — clickable demo | `dashboard-demo/` | https://foundernexus.github.io/fn-site-mockups/dashboard-demo/ |

## VEN homepage design review

`ven-homepage-review/` is a single self-contained page for comparing three homepage concepts: Working Table, Field Notes, and Open Door, plus the approved v17.3 baseline and its supporting pages. The selector at the top switches designs, and also opens the September 29 homepage and the v19 homepage. “All designs” returns to the comparison. The address records the selected view so a teammate can open a specific concept. Inquiry forms stay on the page and do not submit. Event, article, and member-login links leave the mockup. This is the v18 concept collection and does not replace `ven-global/` or `ven-global-v19/`.

Review URL: https://foundernexus.github.io/fn-site-mockups/ven-homepage-review/

## VEN Global v19 team review

`ven-global-v19/` is the September 30, 2026 warmth revision (v19), published beside the earlier v15.3 review at `ven-global/`. Pages: Home, For your team, Success Equation, Our story, Events, Blog, Decision examples, and Explore membership. It is a static review prototype. The inquiry shows a local summary and does not submit. Member login, blog articles, and event links leave the mockup for the existing FounderNexus site. Events remain the September 29 snapshot. The Success Equation is illustrative. Member and sponsor evidence slots are marked as placeholders.

Review URL: https://foundernexus.github.io/fn-site-mockups/ven-global-v19/

Review guide: https://foundernexus.github.io/fn-site-mockups/ven-global-v19/HANDOFF.html

## VEN Global team review

`ven-global/` is the September 29, 2026 VEN Global concept (v15.3): Home, For your team, Success Equation, Our story, Events, Blog, and Explore membership. It is a static review prototype. The membership form shows a local summary and does not submit. Member login, blog articles, and event links leave the mockup for the existing FounderNexus site. Events are an October 2026 snapshot. The Success Equation is illustrative. Company logos are the integrated set from this handoff.

Review URL: https://foundernexus.github.io/fn-site-mockups/ven-global/

Review guide: https://foundernexus.github.io/fn-site-mockups/ven-global/HANDOFF.html

## VEN logo and icon review

`ven-brand-review/` is the round 2 wordmark review: nine directions (A is the current favorite), lockups, favicon studies, and a discussion guide. Choosing a logo updates the selected lockup. It is separate from the VEN site at `ven/`.

Review URL: https://foundernexus.github.io/fn-site-mockups/ven-brand-review/

## VEN redesign

`ven/` is the Venture Executive Network review site (homepage, Our Story, Success Equation, and an unlinked wordmark page). It is a static mockup: Apply, log in, and legal actions show a preview notice, and the Success Equation is an illustrative scenario. Link previews use `assets/og-image.png`. The hero's "VEN is launching soon" button plays `assets/ven-launch.mp4` in a dialog, and the globe behind the decision card spins slowly (it stays still for visitors who prefer reduced motion).

Review URL: https://foundernexus.github.io/fn-site-mockups/ven/

## Homepage v3 — Map C

`v3-map-c/` is the September 2026 homepage prototype (source file: FounderNexus v3 Map C). It is a single self-contained page: hero, membership fit, the success-equation calculator, stage rooms, Nexus Partner, admission, comparison, sessions, and the location map. The map loads geography and drawing libraries from public CDNs when the page opens.

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
