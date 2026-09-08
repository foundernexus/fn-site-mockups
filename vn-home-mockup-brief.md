# FounderNexus acquisition homepage prototype

## Scope
New sibling page: `vn-home-mockup.html`, reachable through the original index navigation. `vn` is a working filename, not a name decision. FounderNexus remains the only visible brand. This is an internal-review prototype, not a change to the production website.

Reuse the existing logo, local Plus Jakarta Sans fonts, navy/blue palette, photography, pill buttons, cards, and responsive structure. Shared CSS and the original homepage content remain unchanged apart from the new navigation link. No new dependencies or third-party data collection.

## Messaging and page order
1. Hero audience: **For CEOs and senior executives of venture-backed companies.** Headline: **Work through the decisions your company needs you to get right.** Support names the Nexus Partner as a dedicated point of contact. Primary CTA: Talk to a Nexus Partner. Secondary CTA: See example sessions. Hero note: You do not need to have founded the company.
2. Eligibility strip immediately after the hero: founder-CEOs, hired CEOs, and direct reports; company has raised at least $500,000 from qualified VCs; invitation without multiple sessions; curated sessions use that same bar; a Partner meeting is not required first.
3. Nexus Partner: **Start with what needs your attention.** Three parts: who they are, the first conversation, what “relevant” means.
4. Example sessions: **What are you working on?** Topic, stage, relevant role, and attendance criteria make fit visible. Three explicitly illustrative cards demonstrate the hierarchy without invented dates or hosts. Preview dialogs route to a Partner conversation rather than pretending to register. A partner meeting is not required before appropriate session registration.
5. Membership: **Each executive is a member in their own right.** CEO does not need to go first. Confidential conversations are not reported to the company or VC.
6. Teams: **Bring in the person who owns the challenge.** Each executive is a member with individual support. First seat full price; additional seats 40% lower. Executive-first entry is supported.
7. Pricing: monthly dues from the new strategy: S1 $400; S2 $800; S3 $1,250; S4 $2,000. Additional seats: $240, $480, $750, $1,200. Stage names from the existing homepage (Finding the model through Operating at scale) help self-identification. Same membership at every stage. No invented annual commitment or cancellation promise.
8. VC FastPass as its own band, routing to the conversation form with purpose preselected. The pre-July attendee reset is a secondary note, not an equal-weight column.
9. Conversation form: name, work email, company, role, interest, and an optional current-decision field. Explicitly non-submitting prototype. No scheduler, CRM integration, payment, automatic qualification, or real registration.

## Intentional changes from the original
- Replace founder-only audience with explicit CEO and direct-report eligibility.
- Remove success equation/calculator and multiplier promises from this version.
- Replace earned admission and peer evaluation sequence with immediate invitation eligibility.
- Explain the Nexus Partner mechanism before broader membership detail, including who they are and what “relevant” means.
- Lead acquisition with a Partner conversation, not a preview of an unscheduled session.
- Separate open-event attendance from curated-session and membership eligibility; keep event-policy detail off the first-visit surface.
- Preserve one brand; introduce no founder/growth/executive sub-brands.
- Do not reuse founder testimonials as proof of executive outcomes or invent new proof.

## Before production use
Replace illustrative topics with confirmed current events, including dates, timezones, hosts, available places, and event-specific access criteria. Wire real registration and conversation endpoints. Confirm billing/seat-transfer terms and confidentiality metadata policy. Keep discussion content confidential. For proof, use only approved statements with permission for the intended use.

Track entry path and existing cohort/source through registration, attendance, paid membership, and subsequent activity. This prototype sends no analytics or form data.

## Handoff for Grok or engineering
Keep the page's existing styling and copy hierarchy. Use `styles.css` plus the page-specific stylesheet; do not redesign the brand. The original homepage is a comparison control. Mobile navigation, session preview dialogs, contextual interest selection, form validation, and a clearly simulated next step are implemented in `vn-home-mockup.js`.
