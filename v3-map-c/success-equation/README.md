# The Leadership Multiplier

Working name for the dedicated page previously titled Success Equation. The existing `/v3-map-c/success-equation/` route is retained so shared preview links keep working. Homepage and page navigation use Leadership Multiplier.

## What changed

Restored the original calculator's three-card comparison and removed the descending chart. Added a participation control for an explicitly illustrative four-leader team. The page now separates the proposition, calculator, functional benefits, independent evidence and membership invitation so each section makes a different point.

## Model

For four leaders, each making d decisions: n = 4d. If m leaders participate, k = md decisions receive the user-assumed support probability q. Others retain the baseline probability p.

- Baseline: p^n
- Support scenario: p^(n-k) × q^k
- Relative likelihood: support scenario / baseline; undefined if baseline is zero.

These are hypothetical probabilities of ALL modeled decision outcomes occurring, under equal independent probabilities. They are not company-success estimates, financial forecasts or measured FounderNexus effects. The ratio is not a statistical odds ratio. Holding the team and total decisions fixed avoids changing the comparison denominator when participation changes. More participants only increase the output when the user assumes q > p. No uplift is mechanically assigned to membership.

Default: three decisions each, p=80%, q=85%, one participant. Baseline 6.87%, support 8.24%, relative likelihood 1.20×. Whole-team participation under the same assumptions gives 14.22% and 2.07×. Defaults are examples, not benchmarks.

## Evidence

Cai and Szeidl (2018), Interfirm Relationships and Business Performance, Quarterly Journal of Economics 133(3), 1229–1282. DOI: 10.1093/qje/qjx049.

Source checked September 26, 2026: https://research.ceu.edu/en/publications/interfirm-relationships-and-business-performance/

The published abstract describes a randomized study of 2,820 young Chinese firms, monthly manager meetings over one year, and an 8.1% revenue effect. The page keeps the sample and treatment context beside the statistic, identifies it as independent research, and explicitly distinguishes it from FounderNexus results, venture-backed benchmarks and evidence for team-member amplification. The study does not calibrate the calculator.

## Naming recommendation

The Leadership Multiplier is the proposed page name because it connects the individual member's benefit to broader leadership participation. The hero supplies the outcome framing. Team Decision Advantage is a more literal alternative; Success Equation is retained only as a bridge to the familiar concept. The naming is a proposal, not a registered or validated brand claim.

## Verification

Run `node --test v3-map-c/success-equation/model.test.mjs`. Tests cover default arithmetic, fixed decision coverage, full-team participation, no-participation/equal/lower-support cases, zero/perfect/tiny probabilities and invalid inputs. Browser checks exercise participation, keyboard inputs, reset, disclosure and responsive layout. All model and UI assets are local. The academic source opens externally.

The homepage application and login remain prototype destinations. Changes are saved on the existing review branch; the live site is unchanged.
