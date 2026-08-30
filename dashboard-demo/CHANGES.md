# Changes in this handoff

Rebuilt from `Clickable prototype navigation review.zip` (29 Aug 2026, 18:50). Source of truth: `HANDOFF.md` in that zip.

Hosted-demo layout kept from the previous live pass: Coming up / Working on headings sit above their cards at the same size so the two modules share a top edge, and the Profile completion banner is capped at 760px to match the form cards.

## 1. Account is a new nav item

Seven-item nav: Dashboard, Advisors, Directory, Content library, Benefits, Profile, **Account**. Profile is personal only. Everything payable (subscription, payment, billing, sign-in, email prefs) lives on Account.

## 2. Invited-to-paid conversion

A `memberState` of Invited shows a dashboard invitation card and an Account chooser. **Choose your membership** opens the shared pop-out: stage cards at or below the qualified maximum → Stripe payment fields → "You're in."

A navy **Prototype controls** bar (review chrome, not product UI) sits above the topbar with **Member state** (Active member / Invited prospect) and **Review notes** (On / Off). Same switches via URL: `?member=invited` and `?annotations=0`.

## 3. Event status vocabulary (deliberate reversal)

Coming up rows use five status pills instead of a single "On your calendar" state: **Invitation sent** · **Pending acceptance** · **Accepted** · **On your calendar** · **Declined**. Flagged for a second look.

## 4. Release your spot

Registered event pop-outs no longer say Cancel / Deregister. Member-facing wording is **Can't attend? Release your spot**, with an inline confirm (navy / gray, no red). On mobile it is a full-width action at the foot of the sheet.

## 5. Profile completion banner

Sits first on Profile. Names the highest-value gap and why it matters, with a button that jumps to that field. Disappears at 100%. Demo gap: **What you're building** (the line the directory card reads from). Membership is gone from Profile.

## 6. Advisors and Directory chips

Expertise on both rosters is chips, capped at two plus a "+N" overflow on a single line. Member pop-out: industry + expertise, no ratings, no stage.

## 7. Benefits cards

Every card shows a **Featured benefit** eyebrow, the primary perk, and **View more benefits →** when there are further perks (otherwise **View offer →**). The old "+1 more" string is retired.

## Unchanged

Shared pop-out shell (events, benefits, members, advisors), Content library (recordings / article / newsletter + exploratory moments), recording detail, Nexus Partner card under the nav, partner-logo tiles, mobile proposal. Dashed **Notes** chips are still prototype-only (hide with `?annotations=0`).
