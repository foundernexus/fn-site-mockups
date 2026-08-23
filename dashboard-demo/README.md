# Member portal redesign — clickable demo

Live: **https://foundernexus.github.io/fn-site-mockups/dashboard-demo/**

A clickable prototype of the redesigned FounderNexus member portal, built around
"minimal touch, fast confirmation, self-service only when needed." Every screen is
clickable — search, filters, dialogs, and Register buttons all respond. Nothing is
wired to an API; all content is static sample data.

Internal review only. The page is `noindex, nofollow`.

## What's new in this build

Rebuilt from the 22 Aug 22:01 `Clickable prototype navigation review-cards.zip` handoff (`CHANGES.md`):

- **Advisor pop-out** — roster rows open a shared card (how they help, investor note, Email / LinkedIn / Website). The separate advisor profile page is gone.
- **Directory pop-out** — rows open a shared card (what they're building, LinkedIn, member email). Direct outreach; the profile page is gone.
- Event and benefit pop-outs from the previous pass are unchanged. Content library is still in the demo.

## What to click through

| Screen | What to look at |
| --- | --- |
| Dashboard | Calendar-first. "Coming up" is the only card with a shadow; one status pill per row. Click a **More for you** row to open the event pop-out. "What we're working on" is the right column. |
| Event pop-out | Reached from **More for you**. Navy kind label, date ticket, when/where, takeaways, host, **Register to attend**. After register: "You're registered — it's on your calendar." **Full event page →** opens the live event page. |
| Benefit pop-out | Reached from a Benefits card or **View offer**. Partner identity, headline, **Your member offer** perk list, how to claim, **Go to partner's site**. Overlay or X closes. |
| Advisors | Search + one topic Select. Dense roster table; click a row or **Profile →** to open the pop-out. Ratings appear only where one exists. |
| Advisor pop-out | Reached from a roster row, Recent Activity, or a recording's advisor name. How they help, investor disclaimer when it applies, **Their sessions in the library →**, Email / LinkedIn / Website. Overlay or X closes. |
| Directory | Industry Select + name/company search. Roster of founders at your stage. Click a row or **Profile →** to open the pop-out. Direct LinkedIn / email — no messaging product. |
| Member pop-out | Reached from a Directory row. Role, company, industry, Stage 1, what they're building, LinkedIn and email. Overlay or X closes. |
| Content library | Search + category. Typing 3+ characters (try `discount`) surfaces the exploratory transcript-moments panel. |
| Recording detail | Reached from any recording card or transcript moment. Key moments list with timestamps. |
| Benefits | Search + category Select. Cards show the lead offer term; click a card or **View offer** to open the pop-out (perks, how to claim, partner-site CTA). "Offer a benefit to the community" opens the submission dialog. |
| Profile | Account email vs. work email, calendar connection, membership and billing. |
| Dashboard — mobile | Linked from the top-right of the Dashboard. Pinned bottom bar carries the Nexus Partner contact, since the sidebar disappears on mobile. |

## Review flags (URL parameters)

| URL | Effect |
| --- | --- |
| `/dashboard-demo/` | Default. Dashed blue **Notes** chips visible. |
| `/dashboard-demo/?annotations=0` | Hides the review chips — the clean product view. |
| `/dashboard-demo/?partner=header` | Moves the Nexus Partner control to a topbar button. |
| `/dashboard-demo/?partner=sidebar` | Moves it to a sidebar footer. |
| `/dashboard-demo/?partner=nav` | Default: pale-blue card under the nav items. |

The **Notes** chips are review annotations, not product UI. They mark open
decisions and do not ship.

## Open decisions flagged in the demo

- Directory membership — list includes members and selected active prospects, unlabeled on purpose.
- Directory filter label and taxonomy — pending the tagging review with Bogdan.
- No member-to-member messaging in this iteration. Members contact each other by LinkedIn or email.
- Advisor roster as the browse layer; the richer treatment is the pop-out card. Topic values are representative; tagging model pending review with Bogdan.
- Transcript "moments" and timestamp navigation — exploratory, feasibility not yet validated. The Library works fully without it.
- Working-on stage labels (Finding expert / Scheduling / Waiting for confirmation) — ship only if Ops will reliably maintain them.
- "New since last visit" time logic on Benefits.
- Rating source and threshold — implementation logic, never page copy.
- Headshots — the demo shows initials as a stand-in. Production uses real headshots, never stock, never initials.
- Event pop-out — first pass at a reusable card for sessions, dinners, and introductions. Open whether registering should stay in the card or route to the full event page.
- Benefit pop-out — same card pattern as events, used for partner offers. Open whether claiming should stay a partner-site jump (shown) or complete inside the card.
- Advisor and member pop-outs — same shared shell as events and benefits. Contact is direct (email / LinkedIn / website), not brokered through the Nexus Partner.

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
