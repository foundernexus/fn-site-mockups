# Warmth and story regression audit

September 30, 2026. Independent review of the MAIN website, before the isolated v19 redesign. This is a diagnosis and acceptance brief, not approval of the new design.

## Judgment

The problem is not that the team removed all warmth or forgot the positioning. Much of the warm copy survives, and v17 made a real improvement by shortening the homepage and restoring substantial photographs. The regression is that useful human cues were removed along with excess content, while the supporting pages retained an institutional sequence of mission, labels, proof worksheet and sponsor administration. The result explains the service more consistently than it lets a visitor recognize the people and experience behind it.

Earlier versions are references, not a design to restore wholesale. v16 was already diagram-heavy: its saved common-ground screenshot fills almost a screen with an explanatory Venn diagram. v15.5 had welcoming marginal notes and expressive photo composition, but also longer pages, a large explorer and unfilled proof modules. Restoring those burdens would repeat the problem.

## Prioritized findings and changes

### P1 · Story tells the mission before visitors experience the community

The current opening is a text-only support header. The origins section follows, then a large navy mission block, then the community principle/photo. Its words still include “Someone else has a useful chapter to share” and “Recognition is useful. Agreement is optional.” The failure is their hierarchy and setting, not absence of a friendly slogan.

Evidence: `ven-global-v14/story-content.html:3–38`; `supporting-v16.css:4–16` defines the broad text header, formal origin grid, full navy mission panel and rule-separated sections. Compare `ven-global-v15.5-reference/story-content.html:3–40`, where the community photo and principle already gave the page a human destination.

**Change:** begin with an actual community moment alongside the reason FounderNexus exists. Bring the founder/origin facts into a compact second beat. Explain the expansion to leadership teams as the next chapter, then show the Partner's practical monthly contribution. Keep the memorable shared-context/different-experience idea with people, rather than giving it another large explanatory diagram.

### P1 · Missing evidence has become a dominant visitor experience

Current Story adds a full portrait placeholder plus challenge/input/decision/result fields between the community story and its invitation. The older v15.5 Story reached its invitation directly after the community principle. Team also devotes a large block to an absent sponsor quote. These modules are honest, but honesty does not require giving editorial production instructions the same weight as the actual story.

Evidence: current `story-content.html:42–61` versus older `story-content.html:41–44`; current `team-content.html:39–47` and `supporting-v16.css:21`.

**Change:** retain a clearly visible “Content placeholder” notice and the destination anchor, with a short explanation of the evidence to add. Put the detailed editorial worksheet behind an accurately labeled native disclosure. Do not replace it with invented testimonials, blurred fake portraits or implied customer results.

### P1 · Team is a sponsor document before it is a membership invitation

Its eyebrow addresses company sponsors; the page is photo-free. Current reading order is introduction → paired benefits → decision diagram → missing sponsor evidence → trial → five practical questions → borrowing template → action. Useful tools have accumulated into the default story.

Evidence: current `team-content.html:3–85`. The connected-decision visual itself is an improvement over the previous parallel question list: it shows demand affecting delivery, investment responding to constraints, then capacity informing the next commitment.

**Change:** lead with colleagues and a real working moment, state individual support and the shared company relevance together, then retain the illustrative dependency visual. Keep the individual/N+1 trial near the action. Make sponsorship questions and the copyable request available as optional tools. Keep visible eligibility/terms uncertainty honest; do not invent policies to shorten the page.

### P2 · Home lost permission-giving warmth during useful simplification

The v15.5 closing action said “No need to have it all figured out first.” Its hero image carried “You don't have to have every answer.” The current ending retains only the fit request. The current process is shorter and clearer, but some of the sense of a person welcoming another person has become a tidy service outline.

Evidence: `ven-global-v15.5-reference/index.html:31–45,134`; current `index.html:29–44,106`; saved `ven-global-v15.5-reference/preview-new-logo.png`. v16's longer process and diagram can be seen in `ven-global-v16-reference/index.html:38–70` and `preview-v16-approved.png`.

**Change:** restore one or two concise, useful reassurance cues next to an actual invitation or photograph. Keep the short process and bounded real photography. Create variety with text/photo relationships and selective editorial emphasis, not more copy, whimsical props or a return to the large homepage explorer. The old bright sticky-note treatment is not a requirement to copy.

### P2 · Brand distinction is underexpressed when every page becomes an explanation

The distinctive material is available: FounderNexus roots and Court, the supplied gathering photographs, the historical Nicole quote, similar context combined with different experience, and a dedicated Partner's practical attention to each member's top two monthly challenges. Uniform rules, labels and statement blocks flatten those differences into a generic peer-service presentation.

**Change:** give each page one job. Home welcomes and explains the offer; Story shows where the community came from and why its approach matters; Team connects individual participation to shared execution and provides a practical next step. A diagram supports the Team page; it should not become the site's visual identity.

## Recommended hierarchy

| Page | Primary reading sequence | Optional depth |
|---|---|---|
| Home | People + audience + invitation; short Partner mechanism; relevant/different experience; historical community voice; stage/context and compact team connection; concise FAQ; warm action | Full challenge explorer and editorial evidence details remain off the homepage |
| Story | People and founding conviction; recognizable FounderNexus origin; today's leadership-team expansion and Partner mechanism; useful conversation principle; honest compact evidence slot; invitation | Evidence worksheet |
| Team | Colleagues and individual support; illustrative linked decisions and feedback; individual trial and team action; compact sponsor evidence marker | Practical sponsorship questions, copyable request and print tooling |

## Brief current competitive check

Official primary pages checked September 30, 2026. Hampton clearly identifies founders, a small locally meeting monthly peer group and named member experiences. It also describes a City Lead concierge for introductions, so personal introductions alone are not a defensible VEN distinction. My interpretation: the lesson is immediate audience/format recognition and visible humans, not copying its founder-only positioning or exclusivity claims. Its published results are self-reported and were not independently verified. [Hampton membership homepage](https://joinhampton.com/)

Vistage explicitly offers a Key Executive program for senior leaders, separates company and executive benefits, and specifies full-day monthly workshops with 12–18 peers. Executive-team support is therefore not unique to VEN. My interpretation: VEN should emphasize its particular combination of venture-backed leadership context, each member's top two monthly challenges and dedicated Partner relevance, without claiming categorical superiority or unsupported outcomes. [Vistage Key Executive program](https://vistage.com/membership/programs/key-executive-program/)

## Final review gates for v19

1. A first screen containing real people makes the audience, help and next step apparent. Story has recognizable origin/community identity rather than a generic mission masthead.
2. Human reassurance and varied composition are perceptible in actual renders, not merely listed in the copy plan. No return to dense worksheets, decorative card walls or oversized imagery.
3. The connected team visual retains named dependencies and feedback, illustrative labeling and company decision ownership. No fixed four-role roster, quantified membership lift or success guarantee.
4. Dedicated Partner, each member's top two monthly priorities, own trial including N+1, stage facts, real assets, historical attribution and clear evidence placeholders remain.
5. Actual Home/Story/Team checks at desktop, tablet and 390/320 widths verify readable proportions, face/gesture crops, contrast, keyboard paths and optional disclosure behavior. No-overflow alone is not an aesthetic pass.
6. The new version remains isolated. Calculator mathematics and unrelated approved pages are preserved; no production launch is implied.

## Scope of this audit

Grounded in the archived v15.5/v16 sources, their saved screenshots, the current main-site source and the actual current Home/Team renders from the immediately preceding review. No new live comparative Story render was required to identify the structural changes above. Historical screenshots are treated as evidence of those saved states, not proof of current rendering. The prior technical approvals did not establish that the user's desired warmth was achieved. v19 requires a separate independent rendered approval.

