# FounderNexus V2 Live Difference Log

Baseline: `/Users/robroyhobbs/foundernexus/10-product-website/live-clone-2026-06-14/`

Working version: `/Users/robroyhobbs/foundernexus/10-product-website/live-clone-v2-2026-06-18/`

Purpose: document every intentional departure from the June 14 live clone so the team can review, accept, revise, or revert changes quickly before production work.

## Executive Summary

V2 keeps the same single-page structure, brand assets, visual system, calculator, events area, testimonials, and application CTA. The major changes are messaging and information architecture:

- Replaces the public tier system with Stage 1 through Stage 4.
- Introduces the Nexus Partner as the trusted advocate inside FounderNexus.
- Removes the chapter-chair/local-chapter model from visible copy.
- Narrows the value section away from budget/outcome claims and toward recurring decision support, practical insight, and next steps.
- Replaces local-chapter interest capture with membership/room-fit application copy.
- Removes or softens public ARR, dues, and tax-deductibility claims.

## Change Register

| Area | Live clone baseline | V2 change | File location | Reason | Review status |
|---|---|---|---|---|---|
| Primary nav | `Chapters` link points to local chapter section | `Nexus Partner` link points to advocate module | `index.html` nav | Chapter chair model is no longer current; Nexus Partner needs visibility | Needs stakeholder approval |
| Venture-scale benefit card | Promises dedicated time with chapter chair | Describes stage-based support from a Nexus Partner | `index.html` Why FounderNexus | Aligns relationship layer with Nexus Partner while avoiding coach/advisor claims | Needs final copy review |
| Fit criteria | Mentions `$100M+ ARR` ambition | Reframes as venture-scale outcome where founder judgment changes trajectory | `index.html` Membership Fit | Avoids hard public ARR threshold | Needs business approval |
| Pre-approval criteria | Mentions building a `$100M+ ARR business` | Reframes as building a venture-scale company | `index.html` Membership Fit | Avoids hard public ARR threshold | Needs business approval |
| Stage section anchor | `#tiers` | `#stages` | `index.html`, `asset-manifest.json` | Stage language replaces tier language | Ready |
| Stage section headline | `The tier system.` | `The stage system.` | `index.html` Stage section | Public language should be Stage 1 through Stage 4 | Ready |
| Stage cards | Five ARR/revenue tiers | Four Stage 1-4 cards with decision context | `index.html` Stage section | Aligns with current stage strategy | Needs stage-label approval |
| Nexus Partner module | Not present | New section: `The Nexus Partner` / `Your advocate inside FounderNexus.` | `index.html` after Stage section | Makes the new relationship layer visible | Needs stakeholder approval |
| Nexus Partner promise | N/A | Trusted point of contact provides stage-based decision support and connects admitted members to the right room, peer, expert, resource, or follow-up | `index.html` advocate module | Explains value without making NP the product hero | Needs final copy review |
| Value section | Budget-spend framing, chapter chair benefits, and monetary savings examples | Recurring member value, stage-matched rooms, Nexus Partner support, and an insight-focused outcome box | `index.html` value section | Keeps v2 focused on Stage + Nexus Partner while avoiding stronger outcome claims | Needs operating-model review |
| Membership process step 04 | Offered membership at the tier matching current stage | Offered membership in the stage room matching current context | `index.html` Membership process | Removes tier/status framing | Ready |
| Tax note | Says dues are generally tax deductible | Says founders may review membership as business expense and should confirm treatment | `index.html` value section | Reduces legal/tax claim risk | Needs legal/tax review if stronger claim returns |
| Competitive comparison | Other groups: chapter quality varies by geography | Other groups: local group quality varies by geography | `index.html` comparison section | Removes chapter vocabulary while preserving contrast | Ready |
| Competitive comparison | FounderNexus: local + online, multiple events per week | FounderNexus: responsive sessions and Nexus Partner support | `index.html` comparison section | Reflects new value proposition | Needs final copy review |
| Bottom section | `Start a local chapter` / city chapter chair interest | `Find your room` / membership fit application | `index.html` final form section | Removes local-growth/chapter-chair path | Needs intake-flow review |
| Form fields | Name, email, city, country | Name, email, company, current stage | `index.html` form | Matches member fit instead of city launch | Needs CRM/form-routing review |
| CSS naming | `tier-grid`, `chapter-grid`, `chapter-form` | `stage-grid`, `application-grid`, `application-form` | `styles.css`, `script.js` | Keeps source names aligned with new model | Ready |
| Footer link | `Tier system` | `Stage system` | `index.html` footer | Aligns with Stage 1-4 | Ready |
| Copyright line | Includes old location/chapter fragment | Clean copyright line only | `index.html` footer | Removes stale text | Ready |
| README | V1 clone note only | Adds V2 migration and revision notes | `README.md` | Captures local context for handoff | Ready |

## New Nexus Partner Copy

Current placement: after the Stage 1-4 section and before Membership Process.

Current section label:

`The Nexus Partner`

Current headline:

`Your advocate inside FounderNexus.`

Current body promise:

Members have a trusted point of contact focused on stage-based decision support. The copy says the Nexus Partner clarifies the decision, understands the stage context, and connects the member to the right same-stage room, peer, expert, resource, or follow-up. It explicitly says the Nexus Partner does not replace the room and helps the right room happen faster.

Current support cards:

- Clarify the decision.
- Match the stage.
- Connect the next step.

Claim validation:

- Supported by the Nexus Partner reference: trusted advocate, practical listener, and connector to the right same-stage room, peer, expert, resource, or follow-up.
- Supported by the messaging framework: stage and decision context are the primary relevance filters; the room remains the product.
- Deliberately avoids unsupported language: coach, consultant, advisor, account manager, VIP support, concierge, guaranteed outcomes, or a bespoke room for every issue.
- Uses `stage-based decision support` instead of claiming Nexus Partners personally make decisions or provide strategic advice.

## Value Section Scope

The value section is a light v2 bridge, not the larger future page/section expansion. It now avoids the old `most leveraged spend in your budget` headline and removes monetary savings examples. The revised section says the most impactful hour should sharpen the next decision.

Recurring benefits currently named:

- Stage-matched rooms around live founder decisions.
- Nexus Partner support to clarify the decision and next step.
- Founder-led pressure-testing from peers who have seen similar tradeoffs.
- Broader peer, expert, or resource access when context calls for it.
- Follow-up while the decision is still live.

The highlighted box now focuses on where the value shows up:

- Hiring: clarify the profile, timing, and risk before the offer.
- Fundraising: pressure-test the story, process, and investor tradeoffs.
- Market moves: compare patterns before a pivot or expansion hardens.
- Leadership calls: leave with the next question, conversation, or action.

Claim boundary: this section should not imply FounderNexus is in the outcomes business. It should frame FounderNexus as helping founders make better decisions by creating a better decision environment.

## Review Questions Before Production

1. Should the Nexus Partner module appear even earlier, directly after the hero or Membership Fit, instead of after Stage?
2. Should `Nexus Partner` be named in the nav, or should the nav stay outcome-oriented with `How it works`?
3. Is `direct 1:1 engagement` the right public phrase, or should we use `a focused 1:1 conversation` to avoid overpromising availability?
4. Are responsive sessions guaranteed monthly, or should monthly copy be softened?
5. Should broader community network access be described as member-only, founder/expert/resource access, or a broader FounderNexus network?
6. Should the application form include `current decision` now, since that is the core Nexus Partner input?
7. Should the local chapter path be removed entirely or preserved as a hidden/future partner page?

## Validation Notes

Completed checks on V2:

- FounderNexus design validator passes.
- Editable surface scan is clean for old public terms: chapter-chair language, tier language, ARR shorthand, pricing/dues language, concierge/coach/advisor/consultant/VIP/account-manager language.
- Asset reference check passes.
- Local preview is running at `http://127.0.0.1:4178/index.html`.

## Files Changed From Baseline

- `index.html`: main copy, sections, nav, form, footer.
- `styles.css`: stage/application/Nexus Partner responsive layout support.
- `script.js`: form selector renamed from old local-growth form to application form.
- `asset-manifest.json`: anchor updated from `#tier` to `#stages`.
- `README.md`: records V2 migration notes.

Raw capture files remain unchanged and may still contain stale live-site language for provenance.
