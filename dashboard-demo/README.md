# Member portal redesign — clickable demo

Live: **https://foundernexus.github.io/fn-site-mockups/dashboard-demo/**

A clickable prototype of the redesigned FounderNexus member portal, built around
"minimal touch, fast confirmation, self-service only when needed." Every screen is
clickable — search, filters, dialogs, and Register buttons all respond. Nothing is
wired to an API; all content is static sample data.

Internal review only. The page is `noindex, nofollow`.

## What's new in this build

Rebuilt from the 20 Aug 15:02 `member-portal-demo.html` handoff (`CHANGES.md`):

- **Directory** in the sidebar (founders at your stage). Rows open a member profile.
- **Advisors** is roster-only — the card treatment is the profile page.
- **Benefits** uses search + category Select instead of pill tabs.

## What to click through

| Screen | What to look at |
| --- | --- |
| Dashboard | Calendar-first. "Coming up" is the only card with a shadow; one status pill per row, plus "We registered you" when FounderNexus did the registering. "What we're working on" is the right column. |
| Advisors | Search + one topic Select. Dense roster table (Advisor, Organization, Expertise, Location, Rating, Profile); rows open the advisor profile. Ratings appear only where one exists. |
| Advisor profile | Reached by clicking any roster row. Investor-affiliated advisors carry a quiet "advice, not investment access" note. |
| Directory | Industry Select + name/company search. Roster of founders at your stage (Name, Company, Industry, Location). Rows open a member profile. No member-to-member messaging. |
| Member profile | Reached from a Directory row. Role, company, industry, Stage 1, short bio. |
| Content library | Search + category. Typing 3+ characters (try `discount`) surfaces the exploratory transcript-moments panel. |
| Recording detail | Reached from any recording card or transcript moment. Key moments list with timestamps. |
| Benefits | Search + category Select. "Offer a benefit to the community" opens the submission dialog — no moderation gate, submissions list directly. |
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
- No member-to-member messaging in this iteration.
- Advisor roster as the browse layer; card treatment is the profile. Topic values are representative; tagging model pending review with Bogdan.
- Transcript "moments" and timestamp navigation — exploratory, feasibility not yet validated. The Library works fully without it.
- Working-on stage labels (Finding expert / Scheduling / Waiting for confirmation) — ship only if Ops will reliably maintain them.
- "New since last visit" time logic on Benefits.
- Rating source and threshold — implementation logic, never page copy.
- Headshots — the demo shows initials as a stand-in. Production uses real headshots, never stock, never initials.

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
