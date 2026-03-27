# Atom — Figma Handoff

This document is the design handoff for rebuilding and extending **Atom** in Figma.

Atom is a conversational second-brain / memory assistant built around:
- chat-first capture
- memories
- goals
- reminders
- settings and account controls
- light and dark modes

The current repository already reflects a product shape with:
- a mobile app shell
- bottom tabs for **Chat**, **Memories**, **Goals**, and **Reminders**
- settings access from the chat header
- memory search/filter patterns
- assistant-style conversation UX
- backend integration and secure/local storage concepts

---

## 1. What to build in Figma

Create a mobile-first Figma file with the following sections:

### A. Foundations
- color styles
- text styles
- spacing scale
- radius scale
- shadows / borders
- icon rules
- layout grid

### B. Core components
- buttons
- chips
- tabs
- text inputs
- search bars
- cards
- list rows
- badges
- bottom navigation
- modals / sheets
- confirmation dialogs
- toast / status banners
- empty states
- loading states

### C. App screens
- onboarding / auth
- chat
- memories
- goals
- reminders
- settings
- detail / edit forms
- destructive confirmation flows

### D. Prototypes
- first-run flow
- create memory flow
- create reminder flow
- create goal flow
- search memories flow
- open settings / export / delete data flow

---

## 2. Suggested Figma page structure

### Page 1 — Cover
- file title
- product summary
- version / owner

### Page 2 — Foundations
- colors
- typography
- spacing
- radii
- elevations
- iconography
- motion notes

### Page 3 — Components
- buttons
- inputs
- cards
- chips
- lists
- nav
- modals
- empty/loading/error states

### Page 4 — Mobile screens
- all high-fidelity screens in light mode

### Page 5 — Mobile dark mode
- dark-mode equivalents for key screens

### Page 6 — Flows
- annotated user journeys with arrows and notes

### Page 7 — Prototype / Handoff
- component specs
- redlines
- interaction notes
- accessibility notes

---

## 3. Product architecture

### Primary navigation
Bottom tab bar with:
1. Chat
2. Memories
3. Goals
4. Reminders

### Secondary navigation
- Settings entry from chat header and optionally from other screen headers
- Detail screens pushed from list screens
- Create / edit actions can use full screens or bottom sheets depending on complexity

### Product principle
**Fast capture should be the easiest action in the app.**

Users should be able to:
- tell Atom something to remember
- ask Atom what it remembers
- set reminders in natural language
- track personal goals
- review and edit structured data later

---

## 4. Design direction

### Brand personality
- intelligent
- calm
- warm
- personal
- trustworthy
- lightweight, not enterprise-heavy

### Visual direction
- native mobile feel
- rounded cards
- soft surfaces
- restrained gradients, if any
- emphasis on legibility and quick action
- minimal clutter
- high-contrast typography
- conversational UI as the emotional center

### Motion direction
- subtle transitions
- springy but restrained button feedback
- sheet slide-up for quick actions
- small success states for save/set/delete events

---

## 5. Design tokens

## 5.1 Color tokens

### Light mode
- `Primary / 500` — `#6C63FF`
- `Accent / Pink` — `#EC4899`
- `Success / 500` — `#10B981`
- `Warning / 500` — `#F59E0B`
- `Error / 500` — `#EF4444`

- `Background / Base` — `#F8FAFC`
- `Background / Elevated` — `#FFFFFF`
- `Surface / Card` — `#FFFFFF`
- `Surface / Muted` — `#F1F5F9`

- `Text / Primary` — `#111827`
- `Text / Secondary` — `#475569`
- `Text / Tertiary` — `#64748B`
- `Text / Inverse` — `#FFFFFF`

- `Border / Default` — `#E2E8F0`
- `Border / Strong` — `#CBD5E1`

### Dark mode
- `Background / Base` — `#0F172A`
- `Background / Elevated` — `#111827`
- `Surface / Card` — `#1F2937`
- `Surface / Muted` — `#111827`

- `Text / Primary` — `#F8FAFC`
- `Text / Secondary` — `#CBD5E1`
- `Text / Tertiary` — `#94A3B8`

- `Border / Default` — `#334155`
- `Border / Strong` — `#475569`

Keep brand colors the same across modes.

## 5.2 Typography
Use a clean mobile-safe family such as **Inter**, **SF Pro**, or **Geist**.

Suggested styles:
- `Display / 32 / Bold`
- `Heading 1 / 28 / Bold`
- `Heading 2 / 22 / Bold`
- `Heading 3 / 18 / Semibold`
- `Title / 16 / Semibold`
- `Body / 15 / Regular`
- `Body / 15 / Medium`
- `Caption / 13 / Regular`
- `Caption / 12 / Medium`
- `Micro / 11 / Medium`

Line-height should be generous for chat and notes.

## 5.3 Spacing scale
Use 4-point base:
- 4
- 8
- 12
- 16
- 20
- 24
- 32
- 40

## 5.4 Radius scale
- Small: 10
- Medium: 14
- Large: 18
- Pill: 999

## 5.5 Borders and elevation
- Hairline / divider: 1 px or platform hairline
- Card border: 1 px with light stroke
- Shadows should be subtle and mostly reserved for modals, floating CTA, and elevated sheets

---

## 6. Core components to build

## 6.1 Button system
Variants:
- Primary
- Secondary
- Tertiary / text
- Destructive
- Icon-only
- Floating quick action

States:
- default
- pressed
- disabled
- loading

## 6.2 Input system
Components:
- single-line text input
- multiline composer
- search field
- date/time field
- tag picker / chip input
- dropdown/select
- secure key field
- destructive confirmation input

States:
- default
- focused
- filled
- error
- disabled

## 6.3 Chip system
- filter chips
- quick action chips
- selected / unselected
- intent badge chips
- memory category chips

## 6.4 Card system
- memory card
- goal card
- reminder card
- stat card
- onboarding info card
- confirmation card

## 6.5 Navigation
- bottom tab bar
- page headers
- back navigation
- settings icon button
- optional profile avatar state

## 6.6 Feedback
- toast success
- toast error
- inline validation
- loading spinner
- skeleton rows
- empty state illustration blocks
- destructive confirmation modal

---

## 7. Screen inventory

All mobile frames should be built at:
- **iPhone 15 / 393 x 852**
and optionally:
- **Android large / 412 x 915**

Name frames clearly for dev handoff.

## 7.1 Onboarding / Auth

### Screen: `Auth / Welcome`
Purpose:
- explain the value of Atom in one glance

Content:
- atom mark / logo
- headline: “Your memory layer above everything”
- short body copy
- primary CTA: Continue
- secondary CTA: Sign in
- footer note on privacy / sync

### Screen: `Auth / Sign in`
Content:
- sign in methods
- OAuth buttons
- email option if desired
- note about secure syncing
- loading state

### Screen: `Auth / Callback / Success`
Content:
- loading / success state
- “Setting up your workspace…”

---

## 7.2 Chat

### Screen: `Chat / Empty`
This is a critical screen.

Header:
- Atom avatar / icon
- title: Atom
- status: Active
- settings button

Main body:
- welcome illustration or atom glyph
- title: “Hi, I’m Atom”
- supporting text:
  “Your personal memory assistant. Tell me what to remember, set reminders, or track your goals.”

Suggested quick prompts:
- “Remember I prefer email”
- “Remind me at 6pm to call Ahmed”
- “My goal is to read more”
- “What do you remember?”

Bottom composer:
- multiline text input
- send button
- optional voice / mic button

### Screen: `Chat / Conversation`
States:
- user bubble
- atom bubble
- intent badge under atom bubble
- typing indicator
- message error / retry state

Intent badges:
- Memory saved
- Reminder set
- Goal saved
- Recalling
- Data erased
- Memory deleted

### Screen: `Chat / Quick Action Sheet`
Actions:
- Add memory
- Add reminder
- Add goal
- Record voice note
- Open settings

---

## 7.3 Memories

### Screen: `Memories / List`
Header:
- title: Memories
- count badge

Sections:
- search bar
- horizontal filter chips
- list of memory cards

Filters:
- All
- Preferences
- Facts
- People
- Projects
- Notes

Memory card:
- category chip
- importance stars / score
- memory text
- date
- overflow or delete action

### Screen: `Memories / Empty`
Copy:
- title: “No memories yet”
- body:
  “Tell Atom to remember something in Chat and it will appear here.”

### Screen: `Memories / Search Results`
- active search state
- clear search action
- no results state

### Screen: `Memories / Detail`
Content:
- full memory text
- type/category
- created date
- tags if used
- linked reminder/goal if applicable
- edit
- delete
- share / export

### Screen: `Memories / Edit`
Fields:
- text
- category
- importance
- tags
- optional note
Actions:
- save
- cancel
- delete

---

## 7.4 Goals

### Screen: `Goals / List`
Header:
- title: Goals
- add button

Goal card:
- title
- progress indicator
- status chip
- due date
- short note
- tap opens detail

### Screen: `Goals / Empty`
Copy:
- title: “No goals yet”
- body:
  “Turn intentions into trackable goals and let Atom keep them visible.”

### Screen: `Goals / Create`
Fields:
- title
- description / notes
- progress or starting status
- target date
- reminder toggle

Actions:
- save goal
- cancel

### Screen: `Goals / Detail`
Content:
- title
- progress module
- notes
- milestones or steps if added later
- edit
- mark complete
- archive/delete

### Screen: `Goals / Complete State`
- celebratory but restrained success state
- subtle success iconography

---

## 7.5 Reminders

### Screen: `Reminders / List`
Header:
- title: Reminders
- add button

List sections:
- Upcoming
- Today
- Overdue
- Completed

Reminder row/card:
- title
- time/date
- status
- complete checkbox
- optional note preview

### Screen: `Reminders / Empty`
Copy:
- title: “No reminders set”
- body:
  “Ask Atom naturally or create one manually so the right thing comes back at the right time.”

### Screen: `Reminders / Create`
Fields:
- reminder title
- details / note
- due date
- due time
- repeat selector
- notification toggle

### Screen: `Reminders / Detail`
- title
- scheduled date/time
- note
- status
- edit
- mark complete
- delete

### Screen: `Reminders / Notification Prompt`
- notification permission education screen
- clear benefit copy

---

## 7.6 Settings

### Screen: `Settings / Main`
Sections:
- account
- sync
- notifications
- appearance
- privacy and data
- about

Rows:
- profile/account
- theme
- notification preferences
- export data
- clear all data
- help
- version

### Screen: `Settings / Appearance`
Options:
- light
- dark
- system

### Screen: `Settings / Data Export`
- explain export format
- export CTA
- success state

### Screen: `Settings / Clear Data`
This should feel explicit and safe.

Content:
- warning icon
- irreversible action copy
- typed confirmation or second confirm
- destructive CTA
- cancel CTA

Suggested copy:
- title: “Clear all Atom data?”
- body:
  “This removes memories, reminders, goals, and local settings from this account. This action cannot be undone.”

---

## 8. Component details by feature

## 8.1 Chat bubbles
### User bubble
- filled with primary color
- white text
- right-aligned
- rounded with one sharper corner

### Atom bubble
- elevated card surface
- border stroke
- left-aligned
- atom avatar on row

### Typing
- animated three-dot or small spinner state

## 8.2 Memory cards
- category chip on top-left
- importance indicator
- destructive action should not dominate
- card text should support 2–4 lines in list state

## 8.3 Reminder items
- support checkbox/toggle at left
- due date/time emphasized
- overdue state can use warning tint
- completed state should soften contrast, not disappear completely

## 8.4 Goal cards
- progress bar or ring
- status chip options:
  - Active
  - Paused
  - Completed
  - Behind

---

## 9. User flows to prototype

## Flow 1 — First run
Welcome → Sign in → Callback success → Chat empty state

## Flow 2 — Save a memory through chat
Chat empty → type “Remember I prefer WhatsApp for urgent updates” → Atom confirmation → memory saved badge → Memories tab → memory visible

## Flow 3 — Set a reminder through chat
Chat → type “Remind me tomorrow at 9am to send the proposal” → reminder confirmation → Reminders list → item visible

## Flow 4 — Create a goal manually
Goals empty → create goal → save → goal detail → progress update

## Flow 5 — Find a past memory
Memories list → search field → filtered results → open detail

## Flow 6 — Delete data safely
Settings → Clear data → warning modal → cancel / confirm

---

## 10. Copy guide

Tone:
- clear
- helpful
- lightly warm
- never overly robotic
- never overly playful

Use short sentences and actionable labels.

### Recommended product copy
- “Message Atom…”
- “Tell Atom what to remember”
- “Search memories…”
- “No memories yet”
- “No goals yet”
- “No reminders set”
- “Save goal”
- “Set reminder”
- “Export data”
- “Clear all data”

### Success microcopy
- “Memory saved”
- “Reminder set”
- “Goal saved”
- “Changes saved”
- “Data exported”

### Error microcopy
- “Something went wrong. Try again.”
- “Couldn’t save that memory.”
- “Notification permission is off.”
- “Connection lost. Your change will retry when you’re back online.”

---

## 11. Accessibility checklist

- minimum 44 x 44 touch targets
- color contrast AA minimum
- don’t rely on color alone for status
- support large text scaling
- icon-only buttons require labels/tooltips
- destructive actions need explicit confirmation
- voice/record controls need strong accessibility labels
- search/filter chips should have selected states announced clearly

---

## 12. Dev-handoff notes for Figma

Create component variants with explicit names:
- `Button / Primary / Default`
- `Button / Primary / Disabled`
- `Chip / Filter / Selected`
- `Card / Memory / Default`
- `Input / Search / Active`
- `Nav / Tab / Selected`

Use Auto Layout everywhere practical.

Add annotations for:
- keyboard behavior on chat and forms
- safe area handling on top and bottom
- multiline composer growth
- bottom tab height with safe area inset
- empty/loading/error states

---

## 13. Suggested MVP screen list for immediate design

Design these first before expanding:

1. Auth / Welcome
2. Auth / Sign in
3. Chat / Empty
4. Chat / Conversation
5. Memories / List
6. Memories / Detail
7. Goals / List
8. Goals / Create
9. Reminders / List
10. Reminders / Create
11. Settings / Main
12. Settings / Clear Data

---

## 14. Suggested future screens

- memory relationship view
- person profile memory cluster
- project context page
- daily briefing
- proactive resurfacing center
- connected sources / integrations
- voice capture transcript review
- inbox / triage view for new captured items

---

## 15. Final note

If rebuilding from the current repo direction, the emotional center of Atom should remain:
**conversation first, structure second.**

The product should feel like:
- a calm assistant in chat
- a clean archive in memories
- a lightweight tracker in goals/reminders
- a trustworthy control center in settings
