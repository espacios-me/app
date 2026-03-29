# BotSpace ID: botspace_5ed2f2b9-d7e2-444f-9dee-3411273c5848

> **Design System:** This repository follows the [espacios.me](https://espacios.me) high-contrast minimalist design system.

# Espacios.me

**Domain:** espacios.me  
**Hosting:** Cloudflare Pages (SSR + static assets)  
**Repo:** https://github.com/espacios-me/web  
**Status:** Live (main branch deploys automatically)

### Overview
Espacios.me is a Dubai-based marketing and lead-generation agency specializing in high-intent client acquisition for real estate, developers, and similar high-volume businesses. We harness AI to study market behavior—buyer emotions, reactions, timing—and build smarter campaigns that influence decisions without hype.

We don't just run ads. We experiment, analyze psychology, and optimize every touchpoint: what to show, how to make clients feel, so leads convert faster and close higher.

### Core Functionalities (Main Site: espacios.me)
- **Multi-channel lead generation** — Meta, Google, Instagram, WhatsApp, organic flows.  
- **Market behavior analysis** — Track buyer psychology (budget anxiety, timeline pressure, lifestyle desires).  
- **AI-powered ad optimization** — A/B tests, real-time tweaks to visuals/copy for emotional + logical impact.  
- **Targeted influence** — Craft messages that spark trust, urgency, excitement—naturally guiding decisions.  
- **Lead nurturing & routing** — Qualify inbound fast, nurture until ready, hand off to sales teams.  
- **Privacy-first** — All client data, visuals, strategies stay 100% under your control—no leaks.  

### Product: Atom (Landing Page: espacios.me/atom)
Atom is our standalone AI memory tool—think "second brain" for WhatsApp/Instagram chats.  

**Key Features:**  
- Deep conversation memory — Remembers every detail across sessions (goals, budget, hesitations).  
- Smart reminders & nudges — Triggers follow-ups based on past behavior.  
- Context-aware responses — Handles natural language, no generic scripts.  
- Privacy shield — Only triggers **your** content/links; never generates or exposes anything.  
- Waitlist-only — Early access for select users; integrates seamlessly with Espacios campaigns.  

### Tech Stack
- **Frontend:** React + Vite + Tailwind CSS (SSR for speed)  
- **Hosting:** Cloudflare Pages (auto-deploys on push, redirects for clean URLs)  
- **Build:** `npm run build` → outputs to `/dist`  
- **Redirects:** Cloudflare `_redirects` file for legacy paths  
- **Env vars:** Secrets like `vite_app_id` managed in dashboard  

### Deployment
1. Push to `main` — Cloudflare auto-builds.  
2. Check status: https://dash.cloudflare.com → Workers & Pages → your project → Deployments.  
3. Custom domain: Add espacios.me in Cloudflare DNS.  

### Get Started
- Main site: (https://espacios.me)  
- Atom landing: (https://espacios.me/atom)  
- Contact: hello@espacios.me  

-logo img_3231.jpg

Built by Keiffer Japeth. 

## Headquarters Monorepo Transition (Staged)

This repository now includes monorepo landing zones under `apps/`, `services/`, and `labs/` for controlled, non-destructive imports of Espacios satellite repositories. Live deployments remain federated until import and build parity are validated.

## Agentic Workflow Enablement

The repository now includes a Codex Agent persona (`.github/codex-persona.md`) and an autonomous GitHub Actions loop (`.github/workflows/codex-autonomous-agent.yml`) that can:
- ingest prompt/context from PRs, pushes, or manual dispatch,
- generate and validate an execution plan (`action_plan.sh`),
- execute safe repo/cloud operations with GitHub + Cloudflare credentials,
- self-report failures with downloadable debug artifacts.
## Digital Office Governance Overlay
This repository acts as **headquarters** (`espacios-me/-`) in the Espacios digital office model.

### Headquarters responsibilities in this repo
- Root org governance and department directory
- Cross-repo orchestration policy
- Top-level routing and executive switchboard surfaces
- Service registry and automation guardrails

### Governance references
- Constitution: `docs/office-constitution.md`
- Overlay routes exposed from headquarters: `/bot`, `/mcp`, `/admin`

> Non-destructive rule: existing pages/surfaces are preserved and re-routed via governance overlays rather than removed.
