# Homepage editorial and design audit

Review date: September 25, 2026. This is a working mockup, not a conversion-tested production release.

## Commercial objective

A qualified founder or leadership-team member of a venture-backed company should understand the recurring membership value, recognize credible experience behind it, and apply to explore fit and an individual trial.

## Current page argument

| Section | Visitor question | Evidence or action |
| --- | --- | --- |
| Hero | Is this for me, and what does it help me do? | Venture-backed leadership audience, decision/execution outcome, named membership formats, Apply now |
| Early member proof | Who has participated? | Company names paired with actual testimonial authors; a real session photo and unchanged member quote |
| Membership mechanism | What happens beyond joining a network? | Monthly Nexus Partner conversation, connection formats, evolving priorities, session examples |
| Decision examples | Where could I use this? | Revenue, hiring, capital, product and technology situations with intended takeaways |
| Credentials | Who brings the experience? | Verified founder and session-contributor credentials, placed after the offer is explained |
| Fit and stages | Does my role and company context belong? | Leadership roles, reciprocal contribution, four existing stage bands |
| Joining | What happens after I apply? | Apply, discuss fit and terms, take part; individual trial stated once |
| Closing | What is my next step? | One invitation and one application action |

## Editorial decisions

- Removed the repeating promise banner, benefits grid, recurring-value comparison, second support table, separate membership-photo carousel and duplicate closing eligibility panel.
- Selected Nicole Resch and Steve Tout from the existing testimonial set. Their words are unchanged. The other testimonials remain recoverable in Git history.
- Consolidated working-session examples into an accessible disclosure within the membership explanation. They are not presented as a live calendar.
- Kept the map composition, original logo, real member photography, Plus Jakarta Sans and M2 colors. The original embedded asset manifest remains intact.
- The hero explicitly names membership and the venture-backed context. Copy does not introduce a success multiplier, guaranteed outcome, trial duration, price or response-time promise.
- Named people are not interchangeable: Court is identified as a FounderNexus founder; Randy Wootton and Bill Bryant are identified as session contributors. Their appearance does not promise personal access through membership.
- Retained generous section spacing. Reduced page length by removing repeated arguments rather than squeezing the same material into smaller cards.

## Self-audit corrections during implementation

1. Added the word “membership” to avoid making the offer sound like an unspecified advisory service.
2. Replaced an abstract pedigree headline with “Built on firsthand experience.”
3. Restored readable role names in the map's compact view, where initials alone obscured the mechanism.
4. Fixed mobile headings whose hidden line breaks joined adjacent words.
5. Changed the tablet breakpoint after visual review showed that the two-column hero crowded the map.
6. Kept all stage-panel IDs present so each disclosure control points to a real element, including closed panels.

## Latest visual and audience refinement

- Restored the earlier member-company strip using Imperative/Nicole Resch, Identient/Steve Tout, ConversionMagic/Jasper Kuria and ARY Engineering/Arthur Baranovskiy. These pairings come from the original supplied page and testimonial set. The label is "Member voices from"; these organizations are not presented as formal partners.
- The earlier landing-page export contained placeholder logo slots, not supplied logo artwork. This pass uses plain company names with human attribution. Actual approved company marks can replace those names later without changing the relationship label.
- Moved the highlighted Nicole quote near the top and paired it with a captioned group-session photograph. The photograph is not presented as a portrait of Nicole.
- Added blue headline emphasis, clearer card styling, explicit leadership roles and a product/technology example. Company context, individual responsibilities and Nexus Partner support are connected in the fit copy.
- Primary action wording is now "Apply for membership" with a fit-conversation expectation. It remains a prototype action and does not submit information.
- Mobile review caught crowding between map role badges and the caption/control area. Added vertical space and reserved a footer area in the compact map.

## Research and claim sources

The design follows the principles of explicit purpose, authentic organizational information, concrete examples, scannable copy and a clear next step. These are design inputs, not evidence that this specific page will convert.

- [NN/g: About Us information](https://www.nngroup.com/articles/about-us-information-on-websites/) supports clear company descriptions and authentic people/customer evidence.
- [NN/g: Homepage usability](https://www.nngroup.com/articles/113-design-guidelines-homepage-usability/) supports explicit purpose, descriptive navigation and concrete example content.
- [FounderNexus: Court Lorenzini](https://foundernexus.com/event/how-to-do-more-with-limited-resources-with-court-lorenzini) identifies Court as founding CEO of DocuSign and FounderNexus.
- [FounderNexus homepage](https://www.foundernexus.com/) currently describes Randy Wootton's Maxio CEO background and Bill Bryant's former Threshold partnership in its session listings, and publishes the selected testimonials. Only those limited credentials were reused; the production site's conflicting founder-only positioning was not adopted.

## Future story page

Working title: “Our story” or “Why FounderNexus.” The current navigation points to the homepage credibility section, not an unfinished route.

Obtain the wider founding team's approved names, roles, credentials and portraits. Tell the collective origin: what they experienced while building companies, which support gap they saw, why FounderNexus exists, and how those lessons informed the membership model. Court should be one part of that account. A future story page should add depth rather than repeat the homepage benefits.

## Verification results

- Eight main sections, down from thirteen. The latest people-focused pass contains approximately 780 words of default rendered main-page copy versus 1,512 before consolidation. The restored member proof adds useful evidence without reintroducing duplicate eligibility or benefits sections. Counts exclude navigation, footer and iframe content; disclosure state affects the count.
- Visual review at phone, tablet and desktop sizes; horizontal-boundary checks at 320, 390, 768, 1024 and 1440px. The tablet hero was changed to a single column after the first check exposed crowding. No remaining text or iframe clipping was found in the checked layouts.
- One H1, a main landmark, skip link, eight labeled sections, visible focus styles and a reduced-motion path are present. This is basic accessibility verification, not a full accessibility certification.
- Map Pause/Resume, stage switching with expanded-state feedback, the session disclosure, application dialog, Escape dismissal and focus restoration were exercised in the browser.
- All internal anchors resolve; no broken images were found. Selected testimonial text and the original embedded asset manifest were checked against the previous committed version.
- Source JavaScript syntax checks and an idempotent rebuild pass. The known baseline export-runtime error remains documented below.

## What remains unproven or unfinished

- No claim of “world-class” status or conversion improvement is justified by an internal review. Test with qualified founders and executives: ask who the service is for, what membership involves, why they trust it and what happens after applying.
- Confirm current eligibility, ARR/stage interpretation, trial participation and commercial terms with the operating team before publication. The mockup does not invent missing terms.
- Add a permissioned member example documenting a real challenge, conversation and subsequent action. The present examples are illustrative.
- The application, login and legal destinations remain explicit prototype dialogs. They do not submit data. The mockup is not launch-ready as a complete acquisition funnel.
- The original export emits a MutationObserver error that was also present on the unchanged baseline. It was not introduced by this editorial pass; a production implementation should replace or repair that export runtime.
- Live/default-branch publication is not included in this pass. The user has asked to try the revision, and the earlier publication approval remains pending.
