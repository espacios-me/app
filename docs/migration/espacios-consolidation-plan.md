# Espacios Organization Consolidation Plan (Controlled Force, Non-Destructive)

Headquarters repo: `espacios-me/-`

## Stage 0 — Monorepo Scaffolding (Current Step)

### What was imported
- Structural landing zones were created only (directory scaffolding):
  - `apps/product`
  - `apps/operations`
  - `apps/intelligence`
  - `apps/marketing`
  - `apps/campaigns`
  - `services/quality-assurance`
  - `labs/rnd`
- Workspace package discovery was introduced via `pnpm-workspace.yaml`.

### What was changed
- Added monorepo workspace declaration for staged package onboarding.
- Added architecture boundaries documentation and migration runbook.
- No production routing, build pipeline, or domain rewiring changes were made.

### What remains federated
- `espacios-me/atom-app`
- `espacios-me/botspace`
- `espacios-me/flow`
- `espacios-me/meow`
- `espacios-me/landingpages`
- `espacios-me/Apothekari`
- `espacios-me/atom`

### What risks exist
- Directory scaffolding alone does not guarantee runtime parity.
- Inconsistent dependency baselines may surface once source imports begin.
- UI divergence risk exists until each import is validated against `espacios.me` design tokens/components.

### What still needs validation
- Confirm workspace tooling does not affect current deploy build.
- Define shared design-system conformance checklist and visual regression gates.
- Establish per-repo import manifests with branch, commit SHA, and rollback pointers.

---

## Stage 1 — Documentation-First Import Manifests (Next)

### What was imported
- _Planned_: metadata manifests only (repo URLs, default branch, pinned source SHA, ownership, run commands).

### What was changed
- _Planned_: `docs/migration/import-manifests/*.md|*.yaml` for each source repository.

### What remains federated
- All production repos remain independently deployed.

### What risks exist
- Manifest drift if source repos change before code import freeze.

### What still needs validation
- SHA pinning accuracy, ownership approvals, deployment rollback runbooks.

---

## Stage 2 — Source Mirroring into Landing Zones (No Traffic Rewire)

### What was imported
- _Planned_: source trees copied into mapped landing zones with history references.

### What was changed
- _Planned_: local build scripts and package boundaries adjusted to run side-by-side.

### What remains federated
- Original repositories remain active deployment sources.

### What risks exist
- Dependency/version conflicts across package managers and CI assumptions.

### What still needs validation
- Build parity, test parity, route parity, environment variable parity, and design-system conformity.

---

## Stage 3 — Validation & Controlled Cutover

### What was imported
- _Planned_: validated app builds promoted from imported landing zones.

### What was changed
- _Planned_: deployment wiring switched per app after explicit sign-off.

### What remains federated
- Any app failing parity remains federated until resolved.

### What risks exist
- DNS/CDN cache behavior during cutover windows.

### What still needs validation
- Post-cutover monitoring, rollback drills, and route health checks for each property.
