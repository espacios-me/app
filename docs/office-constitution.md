# Espacios Digital Office Constitution (Non-Destructive Overlay)

## Mission
This constitution defines how Espacios operates as a governed digital office with clear department boundaries, bot ownership, and cross-repository execution rules. It is an **overlay governance model** that preserves all existing applications and websites.

## Primary Non-Destructive Rule
- Do not delete existing apps, websites, or repositories for naming cleanliness.
- Prefer reclassification, routing, wrappers, ownership handoff, governance metadata, and staged transitions.
- Any invasive cleanup must be explicitly staged and approved separately.

## Canonical Department Mapping
| Department | Repository | Mandate |
|---|---|---|
| headquarters | `espacios-me/-` | Executive governance, root routing, cross-repo authority |
| operations | `espacios-me/botspace` | Integrations, dispatch, execution mesh, run operations |
| product | `espacios-me/atom-app` | Shipping Atom user experience |
| rnd | `espacios-me/atom` | Prototypes, experiments, future system design |
| intelligence | `espacios-me/flow` | Cross-source synthesis and executive context |
| quality-assurance | `espacios-me/Apothekari` | Incident learning, RCA, prevention coaching |
| marketing | `espacios-me/meow` | Narrative framing, activation messaging, onboarding |
| campaigns | `espacios-me/landingpages` | Fast campaign microsites and conversion experiments |

## Department Charters and Boundaries

### 1) headquarters (`espacios-me/-`)
**Owns:**
- Root governance policy
- Service registry
- Top-level routing (`/`, `/bot`, `/mcp`, `/admin`)
- Cross-repo orchestration policy
- Org-wide automation guardrails

**Must not absorb:**
- Product feature delivery
- Campaign execution details
- QA incident ownership

### 2) operations (`espacios-me/botspace`)
**Owns:** webhook ingestion, dispatch, adapters, execution logs, runbooks, operational dashboards.

**Must not absorb:** product UX or executive governance policy.

### 3) product (`espacios-me/atom-app`)
**Owns:** shipped Atom app, memory/reminders/goals/preferences, conversation UX, release readiness.

**Must not absorb:** prototype-only R&D systems.

### 4) rnd (`espacios-me/atom`)
**Owns:** prototype systems, memory model research, prompt labs, design research, future schemas.

**Must not absorb:** production Atom app responsibility.

### 5) intelligence (`espacios-me/flow`)
**Owns:** context synthesis, normalized events, anomaly and trend insight dashboards.

**Must not absorb:** universal executor responsibilities.

### 6) quality-assurance (`espacios-me/Apothekari`)
**Owns:** incident memory, root-cause analysis, preventive coaching, regressions, postmortems.

**Must not absorb:** generic issue dumping without learning loop.

### 7) marketing (`espacios-me/meow`)
**Owns:** positioning, onboarding narrative, product framing, activation messaging.

### 8) campaigns (`espacios-me/landingpages`)
**Owns:** segmented launch and growth pages, offer-specific microsites, conversion experiments.

## Bot/Worker Office Roster

### Executive (headquarters)
- Chief of Staff Bot
- Portfolio PM Bot
- Repo Marshal Bot
- Governance Bot
- Surface Director Bot

### Operations
- Dispatcher Bot
- Integration Cartographer Bot
- Runbook Bot
- Delivery Ops Bot
- Execution Recorder Bot

### Product
- Product Steward Bot
- UX Integrity Bot
- Memory Quality Bot
- Release Readiness Bot
- Conversation Designer Bot

### R&D
- Systems Architect Bot
- Prompt Lab Bot
- Design Research Bot
- Prototype Curator Bot
- Promotion Gate Bot

### Intelligence
- Context Analyst Bot
- Signal Fusion Bot
- Anomaly Bot
- Executive Briefing Bot

### Quality Assurance
- Incident Clinician Bot
- Root Cause Analyst Bot
- Prevention Coach Bot
- Regression Sentinel Bot

### Marketing
- Narrative Strategist Bot
- Onboarding Copy Bot
- Audience Lens Bot
- Brand Integrity Bot

### Campaigns
- Campaign Composer Bot
- Conversion Auditor Bot
- Experiment Tracker Bot
- Launch Readiness Bot

## Reporting and Authority Model
- Each department bot reports first to its department charter.
- Cross-repo actions require governance rule validation from headquarters.
- Operations may execute against other repos only through approved integration contracts and runbooks.
- R&D artifacts can graduate into product only via Promotion Gate Bot + Product Steward Bot review.
- QA prevention recommendations become action items in owning departments; QA remains the memory authority.

## Cross-Department Interaction Contracts
1. **Policy contract (headquarters -> all):** naming, routing, service registry, escalation rules.
2. **Execution contract (operations <-> all):** webhooks, dispatch IDs, run statuses, retry semantics.
3. **Insight contract (intelligence -> leadership/departments):** normalized events, anomaly alerts, periodic briefs.
4. **Reliability contract (quality-assurance -> all):** failure fingerprints, RCA templates, prevention checkpoints.
5. **Go-to-market contract (marketing <-> campaigns <-> product):** message consistency, launch readiness gates.

## Routing and Surface Governance (Headquarters-Owned)
- `/bot`: operator and human command entry surface.
- `/mcp`: machine protocol entry surface for standardized system-to-system actions.
- `/admin`: executive/operator visibility dashboards.
- `/webhooks/*`: external callback ingress (typically routed into operations adapters).
- `/api/*`: structured internal actions with governance policy checks.

## Repository Action Policy (Safe Overlay)
- Preserve existing pages and app routes.
- Add routing aliases before migrations.
- Use wrappers/proxies to re-own surfaces without deleting source systems.
- Track ownership metadata before moving code.
- Stage cleanup in three phases:
  1. **Classify** (owner + department + criticality)
  2. **Govern** (policy + contracts + visibility)
  3. **Optimize** (optional refactor/move after adoption)

## Risk Register (Current Structural Risks)
1. **Boundary confusion risk:** product and R&D narratives can blur if routing and docs do not distinguish “shipped” vs “experimental”.
2. **Authority drift risk:** headquarters can become a dumping ground if it does not enforce strict charter boundaries.
3. **Execution centralization risk:** operations could absorb business logic if service contracts are weak.
4. **Institutional memory risk:** QA may degrade into ticket filing unless RCA/prevention loops are mandatory.
5. **Go-to-market overlap risk:** marketing and campaigns can duplicate work without narrative/experiment separation.

## Staged Future Cleanup (Non-Destructive)
- Stage A: Add metadata manifests for each repo (`department`, `owner_bot`, `surface_type`, `data_class`).
- Stage B: Introduce org-wide service registry and dependency map from headquarters.
- Stage C: Add cross-repo scorecards (release health, incident recurrence, routing hygiene).
- Stage D: Propose selective consolidation only where duplicate surfaces are proven, stable, and approved.
