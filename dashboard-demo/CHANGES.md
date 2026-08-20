# Changes since last handoff

The demo HTML (`member-portal-demo.html`) replaces the previous version. Three changes:

## 1. Nexus Partner placement (new default)
The partner contact now lives in a pale-blue card **directly under the sidebar nav items** (divider above it): Sarah's avatar, name, uppercase "YOUR NEXUS PARTNER" label, and a full-width solid-blue **Message Sarah** button (mailto). This replaces the sidebar-bottom footer, which felt buried, and the topbar treatment, which read as a second identity next to the member's own name. Two alternates remain in the prototype behind a `partnerControl` switch (header button / sidebar footer) — build the default ("nav") unless told otherwise. Mobile is unchanged (pinned bottom contact bar).

## 2. Advisors: Cards / Roster toggle
A small segmented **Cards | Roster** control sits next to the results count.
- **Cards** (default): unchanged grid, right for a small roster.
- **Roster**: a dense table — Advisor (28px avatar + name), Organization, Expertise (first 3 tags, dot-separated), Location, Rating (omitted when none), Profile link. Rows are fully clickable to the advisor profile; hover = pale-blue row tint. Table wrapper scrolls horizontally below ~760px; name/org/expertise columns ellipsize.
- Both views share the same search + category Select filtering.
- Intent (from design review): cards suit ~10 advisors; at hundreds, the roster becomes the browse layer, paired with search-first narrowing (default to a narrowed subset, rank by stage-fit, paginate past ~25 — not yet in the mockup). The card treatment moves to the profile page at that point.

## 3. Small fixes
- Partner-logo tiles on Benefits render via background-image (no broken-image flash).
- Default link color darkened to `#0072BA` for small-text contrast.

Everything else matches the previous README spec. Review annotations (dashed blue chips) are still prototype-only chrome — don't ship them.
