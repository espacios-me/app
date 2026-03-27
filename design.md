# Atom – Personal Memory Assistant: Design Plan

## Brand Identity

**App Name:** Atom  
**Tagline:** Your personal memory, always with you  
**Color Palette:**
- Primary: `#6C63FF` (soft indigo-violet — intelligent, calm, trustworthy)
- Background: `#FFFFFF` light / `#0F0F14` dark
- Surface: `#F4F3FF` light / `#1A1A24` dark
- Foreground: `#1A1A2E` light / `#EEEEF5` dark
- Muted: `#7B7B9A` light / `#8888AA` dark
- Border: `#E4E3F5` light / `#2E2E42` dark
- Success: `#22C55E` / `#4ADE80`
- Warning: `#F59E0B` / `#FBBF24`
- Error: `#EF4444` / `#F87171`
- Accent (memory): `#6C63FF`
- Accent (goal): `#10B981`
- Accent (reminder): `#F59E0B`
- Accent (behavior): `#EC4899`

---

## Screen List

1. **Chat** (Home) — AI conversation interface
2. **Memories** — Browse, search, and manage saved memories
3. **Goals** — View and manage personal goals
4. **Reminders** — Upcoming and past reminders
5. **Settings** — API key, timezone, theme, data management

---

## Primary Content and Functionality

### 1. Chat Screen (Home Tab)
- Full-screen chat UI with message bubbles (user right, Atom left)
- Text input bar at bottom with send button
- AI replies show intent badge (memory saved, reminder set, etc.)
- Typing indicator animation
- Quick-action chips: "What do you remember?", "Set a reminder", "My goals"
- Empty state: welcome message with onboarding tips

### 2. Memories Screen
- Segmented filter: All | Preferences | Facts | People | Projects | Notes
- Memory cards with: kind badge, importance stars (1–5), text, timestamp
- Swipe-to-delete with confirmation
- Search bar at top
- Empty state illustration

### 3. Goals Screen
- Goal cards with status badge (active/completed)
- Add goal FAB button
- Goal alignment score shown per goal
- Tap to view/edit goal detail
- Empty state illustration

### 4. Reminders Screen
- Upcoming and past sections
- Reminder cards: title, due date/time, recurrence badge
- Swipe-to-delete
- Add reminder FAB
- Empty state illustration

### 5. Settings Screen
- OpenAI API key input (masked)
- Timezone selector
- Theme toggle (light/dark/system)
- Data section: Export data, Erase all data (with confirmation)
- About section: version, credits

---

## Key User Flows

### Save a Memory via Chat
1. User opens Chat tab
2. Types "Remember I prefer email over calls"
3. Atom replies with confirmation + shows "Memory saved" badge
4. Memory appears in Memories tab

### Set a Reminder via Chat
1. User types "Remind me at 6pm to call Ahmed"
2. Atom confirms with parsed time and title
3. Reminder appears in Reminders tab

### Browse & Delete a Memory
1. User opens Memories tab
2. Scrolls or searches for a memory
3. Swipes left → Delete button appears → Confirms
4. Memory removed from list

### Add a Goal Directly
1. User opens Goals tab
2. Taps FAB (+)
3. Types goal text → Saves
4. Goal card appears in list

---

## Layout Principles

- **Tab bar**: 4 tabs — Chat (home), Memories (brain), Goals (target), Reminders (bell)
- **Settings**: accessible via gear icon in Chat header
- **One-handed usage**: primary actions reachable from bottom
- **Typography**: System font (SF Pro on iOS), clean hierarchy
- **Cards**: rounded-2xl, subtle shadow, border on light mode
- **Haptics**: on send, on save, on delete confirmation
