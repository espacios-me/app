# Espacios Headquarters Monorepo Boundaries

This repository (`espacios-me/-`) is treated as **Headquarters** and the long-term monorepo root.

## Non-Destructive Consolidation Constraints

1. Existing apps and web properties remain live until imported versions are validated.
2. No deployment traffic rewiring before build parity is confirmed.
3. Department boundaries are preserved using landing zones (not merged into one app).
4. Imports happen in controlled stages with validation gates.
5. Every imported app must comply with the `espacios.me` design system before promotion.

## Department Landing Zones

- `apps/product` ← `espacios-me/atom-app`
- `apps/operations` ← `espacios-me/botspace`
- `apps/intelligence` ← `espacios-me/flow`
- `apps/marketing` ← `espacios-me/meow`
- `apps/campaigns` ← `espacios-me/landingpages`
- `services/quality-assurance` ← `espacios-me/Apothekari`
- `labs/rnd` ← `espacios-me/atom`

## Current Federation Model

The current worker/static site in this repository remains authoritative for live routes while satellite repos stay federated and independently deployable.
