# Member portal redesign — clickable demo

Live: **https://foundernexus.github.io/fn-site-mockups/dashboard-demo/**

A clickable prototype of the redesigned FounderNexus member portal, built around
"minimal touch, fast confirmation, self-service only when needed." Every screen is
clickable — search, filters, dialogs, and Register buttons all respond. Nothing is
wired to an API; all content is static sample data.

Internal review only. The page is `noindex, nofollow`.

## What's new in this build

Rebuilt from the 29 Aug 18:50 `Clickable prototype navigation review.zip` handoff (`CHANGES.md`):

- **Prototype controls** bar above the topbar: **Active member / Invited prospect**, **Review notes On / Off**, and **Calendar Connected / Not connected**. Same switches via `?member=invited`, `?annotations=0`, and `?calendar=0`.
- **Profile calendar** — connected (Manage) and not connected (Connect calendar) states. Both open a pop-out: Google / Microsoft → weekly availability → saved. Disconnect is inside the card, behind a confirmation.
- **Account** is a seventh nav item. Profile is personal only; subscription, payment, billing, sign-in, and email prefs live here.
- **Invited-to-paid conversion** — invitation card on the Dashboard, membership chooser + Stripe pay flow in the shared pop-out.
- **Five event statuses** on Coming up (Invitation sent → Declined), replacing the single "On your calendar" pill.
- **Release your spot** in the registered event pop-out (inline confirm, no red).
- **Profile completion banner** first on Profile; **What you're building** is the open gap. Membership moved off Profile.
- Advisor and Directory expertise chips capped at two plus "+N". Benefits cards always show a **Featured benefit** line.

## What to click through

| Screen | What to look at |
| --- | --- |
| Dashboard | Calendar-first. Coming up is the only card with a shadow; each row has a status pill. Click a **More for you** row to open the event pop-out. "What we're working on" is the right column. |
| Invited dashboard | Use **Prototype controls → Invited prospect** (or `?member=invited`). Pale-blue invitation card → **Choose your membership**. |
| Event pop-out | Reached from **More for you**. Navy kind label, date ticket, takeaways, host, **Register to attend**. After register: confirmation + **Release your spot**. **Full event page →** opens the live event page. |
| Benefit pop-out | Reached from a Benefits card. Partner identity, headline, **Your member offer** perk list, how to claim, **Go to partner's site**. |
| Membership pop-out | Reached from the invite card or Account **Change membership level**. Stage cards at or below the qualified max → pay → "You're in." |
| Advisors | Search + one topic Select. Dense roster; expertise chips capped at two plus "+N". Click a row or **Profile →** for the pop-out. |
| Advisor pop-out | How they help, investor disclaimer when it applies, **Their sessions in the library →**, Email / LinkedIn / Website. |
| Directory | Industry Select + search. Same column grammar as Advisors. No ratings, no stage. Click a row for the member pop-out. |
| Member pop-out | Role, company, industry + expertise, what they're building, LinkedIn and email. Direct outreach. |
| Content library | Search + category. Recordings, one in-portal **Article**, one **Newsletter** that links out to Substack. Typing 3+ characters (try `discount`) surfaces the exploratory transcript-moments panel. |
| Recording detail | Reached from any recording card or transcript moment. Key moments list with timestamps. |
| Benefits | Search + category Select. Cards show **Featured benefit** + the primary perk; **View more benefits →** when there are further perks. "Offer a benefit to the community" opens the submission dialog. |
| Profile | Completion banner first, then personal / company / **What you're building** / expertise / calendar. Calendar shows **connected** (Manage) or **not connected** (Connect calendar). No prices. |
| Calendar pop-out | Reached from Profile **Manage** or **Connect calendar**. Connect: Google / Microsoft + what we ask for. Availability: timezone, weekly hours, accounts. Saved confirmation. **Disconnect all** sits in the card behind a confirm. |
| Account | Subscription, sign-in & security, email prefs, payment method, billing history, billing address + ZIP + Tax ID. Invited state is the inline chooser. |
| Dashboard — mobile | Linked from the top-right of the Dashboard. Pinned bottom bar carries the Nexus Partner contact. Release your spot is a full-width action at the foot of the event sheet. |

## Review flags (URL parameters)

| URL | Effect |
| --- | --- |
| `/dashboard-demo/` | Default. Dashed blue **Notes** chips visible. Active member. Partner card under the nav. |
| `/dashboard-demo/?annotations=0` | Hides the review chips — the clean product view. |
| `/dashboard-demo/?member=invited` | Invited prospect: dashboard invitation card + Account chooser. |
| `/dashboard-demo/?member=active` | Active member (the default). |
| `/dashboard-demo/?calendar=0` | Profile calendar empty state (Not connected). Default is connected. |
| `/dashboard-demo/?partner=header` | Moves the Nexus Partner control to a topbar button. |
| `/dashboard-demo/?partner=nav` | Default: pale-blue card under the nav items. |

The **Notes** chips and the navy **Prototype controls** bar are review annotations, not product UI. They mark open decisions and do not ship.

## Open decisions flagged in the demo

- Tagging / taxonomy — pending review with Bogdan. All topic values are representative placeholders.
- Event status vocabulary — five states reverse the earlier single-state decision; confirm before build.
- Recent Activity default count — 3 vs. 5 (demo shows 5).
- Stage progression — member-initiated vs. Nexus Partner-initiated "Discuss next stage" (both entry points sit on Account).
- Member stage on directory cards — currently hidden.
- Directory filter label and taxonomy — currently a representative industry dropdown.
- Comped memberships — the demo member now pays so billing has something to show; the comped state needs its own treatment.
- Member-to-member messaging — out of scope this iteration. Members contact each other by LinkedIn or email.
- "New since last visit" time logic on Benefits.
- Transcript "moments" — exploratory; feasibility unvalidated. The Library works fully without it.
- Working-on stage labels — ship only if Ops will reliably maintain them.
- Headshots — the demo shows initials as a stand-in. Production uses real headshots, never stock, never initials.
- Event pop-out — open whether registering should stay in the card or route to the full event page.
- Benefit pop-out — open whether claiming should stay a partner-site jump (shown) or complete inside the card.

## How this is built

The design handoff shipped as a single self-contained HTML file. That file has been
unpacked into ordinary static assets so it can be hosted, diffed, and reviewed:

```
dashboard-demo/
  index.html                          page markup, styles, and app logic
  assets/brand/                       FounderNexus mark and wordmark
  assets/fonts/                       Plus Jakarta Sans 400/500/600/700, Roboto 400/500/700
  assets/partners/                    Google and Seed IP logos used on Benefits
  vendor/dc-runtime.js                template runtime
  vendor/fn-design-system.js          FounderNexus component library bundle
  vendor/react-*.production.min.js    React 18.3.1 UMD, served locally rather than from a CDN
```

No build step and no network calls — it is plain static files, same as the rest of
this repo. GitHub Pages picks it up from the existing `deploy-pages.yml` workflow.

To run it locally:

```bash
python3 -m http.server 8000 --directory dashboard-demo
# then open http://localhost:8000/
```

Opening `index.html` directly from the filesystem also works.

## Turning this into production code

This is a design reference, not production code. Recreate it in the target codebase
using the FounderNexus component library (Button, Input, Select, Tabs, Dialog, Avatar,
SidebarNav, Card). Colors, typography, spacing, and copy are final-intent. Design
tokens are defined at the top of `index.html`.
