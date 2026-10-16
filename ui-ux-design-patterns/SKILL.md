---
name: ui-ux-design-patterns
description: Real-world UI/UX screen patterns, interaction flows, and component heuristics distilled from Mobbin, Refero, Page Flows, 60fps, Collect UI, and top design inspiration libraries. Equips Claude Code with the collective intelligence of the top 1% web and mobile apps.
---

# 📱 UI/UX Design Patterns & Screen Intelligence

> Distilled from the world's premier production design archives: **Mobbin, Refero, Page Flows, 60fps, Collect UI, Appshots, UI Sources, Chamjo, Appllama, Asoinspo, Spottedinprod, and Pttrns**.

When building user interfaces, AI models often default to generic, sterile layouts (the "AI template look"). This skill replaces generic defaults with proven, high-converting design patterns observed in industry-defining production apps (Linear, Stripe, Airbnb, Notion, Apple, Duolingo, Arc).

---

## 🏛️ 1. The 12 Inspiration Intelligence Libraries

| Source | Primary Focus | Best For Claude Prompts & Workflows |
| :--- | :--- | :--- |
| **Mobbin** ([mobbin.com](https://mobbin.com)) | Real-world iOS, Android & Web screen flows | Complete end-to-end user journeys (Onboarding, Checkout, Paywalls, Settings) |
| **Refero** ([refero.design](https://refero.design)) | Curated real-world Web & SaaS UI | Modern SaaS landing pages, marketing layouts, pricing tables, hero sections |
| **Page Flows** ([pageflows.com](https://pageflows.com)) | Video user-flow recordings of top products | Step-by-step UX logic, edge cases, error recovery, invite flows |
| **60fps** ([60fps.design](https://60fps.design)) | High-fidelity micro-interactions & motion | Spring curves, swipe gestures, gesture-driven transitions, 60fps feedback |
| **Appshots** ([appshots.design](https://appshots.design)) | Curated mobile app screenshot library | Mobile app navigation, tab bars, bottom sheets, mobile cards |
| **UI Sources** ([screensdesign.com](https://screensdesign.com)) | Growth loops & user psychology breakdowns | High-converting onboarding, viral loops, gamification mechanics |
| **Chamjo** ([chamjo.design](https://chamjo.design)) | East-Asian & Global UI pattern archive | High-density information design, typographic balance, card architectures |
| **Appllama** ([appllama.io](https://appllama.io)) | Mobile app UI breakdowns | Mobile design hierarchies, widget architectures, native UX conventions |
| **Asoinspo** ([asoinspo.com](https://asoinspo.com)) | App Store screenshots & paywall visual design | High-converting paywalls, feature highlight bento cards, benefit badges |
| **Collect UI** ([collectui.com](https://collectui.com)) | Exhaustive daily component-by-component library | Specific components (Modals, Dropdowns, Search Bars, 404s, Profile headers) |
| **Spottedinprod** ([spottedinprod.com](https://spottedinprod.com)) | Real unedited production UI edge cases | Clever micro-interactions, subtle UX details, graceful degradation |
| **Pttrns** ([pttrns.com](https://pttrns.com)) | Categorized mobile UI patterns | Mobile navigation patterns, feed structures, activity timelines |

---

## 🔄 2. End-to-End Flow Heuristics (Mobbin & Page Flows Standards)

### A. High-Converting Onboarding Flow
1. **Value-First Introduction**: Maximum 3 swipeable cards or a 15-second interactive teaser. Never start with a 10-field form.
2. **Progress Stepper**: Use a segmented horizontal pill bar (`h-1 rounded-full bg-primary/20` with active state `bg-primary`), not circular numbered badges.
3. **Personalization Questioning**: 2–3 multi-choice single-tap cards (e.g., "What is your primary goal?") with active borders (`ring-2 ring-primary bg-primary/5`).
4. **Permission Primer Screen**: Explain *why* notifications or camera access improves their experience *before* triggering native browser/system permission dialogs.
5. **Aha! Moment Payoff**: Immediately land them on an active, populated workspace with 1 demo item, never a barren empty screen.

### B. SaaS Pricing & Paywall Architecture (Asoinspo & Refero Standards)
1. **Billing Frequency Toggle**: Monthly vs Annual switch with an eye-catching pill: `"Save 20%"` in high-contrast accent color (`bg-emerald-500/10 text-emerald-500 font-semibold`).
2. **3-Tier Card Hierarchy**:
   - Free / Starter: Subtle outline, muted CTA (`variant="outline"`).
   - **Pro / Growth (Hero Tier)**: Elevated with subtle ring (`ring-2 ring-primary shadow-xl scale-105`), `"Most Popular"` badge pinned to top-center, primary saturated CTA (`variant="default"`).
   - Enterprise: Clean enterprise card with `"Contact Sales"` CTA.
3. **Feature Comparison Checklist**:
   - Clear green checkmarks (`lucide-react` `Check` with `text-emerald-500`).
   - Group features logically (Core Capabilities, Collaboration, Security & SLA).
   - Tooltips on technical jargon.
4. **Risk Reversals & Trust Signals**:
   - `"14-day money-back guarantee"` badge.
   - 3 real customer mini-avatars + quote right under the CTA.
   - Encrypted payment icons (Stripe, Visa, Mastercard, Apple Pay).

### C. Modern Dashboard Architecture (Refero & Collect UI Standards)
1. **Top Bar**: Sticky header with workspace switcher, global search trigger (`Cmd + K`), notifications bell with unread dot, and user avatar.
2. **Key Metric KPI Cards (Top Row)**:
   - 3 or 4 cards: Metric Label (12px uppercase muted), Value (28px font-bold tracking-tight), Sparkline mini-graph or Trend delta (`+14.2% vs last month` with green arrow).
3. **Main Content Split (70/30 or Bento Grid)**:
   - Left 70%: Primary interactive chart or data table with inline search, sorting, and pagination.
   - Right 30%: Activity feed, quick action buttons, and upcoming deadlines.
4. **Data Table Hygiene**:
   - Row hover state (`hover:bg-muted/50 transition-colors`).
   - Sticky table header.
   - Action overflow menu (`...` button) per row.

---

## ⚡ 3. Motion & Micro-Interaction Guidelines (60fps Standards)

When adding animations, adhere to the **60fps physics manifesto**:

1. **No Linear Motion**: Never use `transition-timing-function: linear` for UI layout shifts. Always use natural spring physics:
   - React / Framer Motion: `transition={{ type: "spring", stiffness: 300, damping: 25 }}`
   - CSS: `cubic-bezier(0.16, 1, 0.3, 1)` (Apple/Linear ease-out).
2. **Micro-Feedback on Every Action**:
   - Buttons: Active press-down effect (`active:scale-[0.98] transition-transform duration-100`).
   - Cards: Subtle hover lift (`hover:-translate-y-1 hover:shadow-lg transition-all duration-200`).
   - Modals: Enter scale from `0.95` to `1.0` with fade in `150ms`.
3. **Skeleton Loading Over Spinners**:
   - Use shimmer skeleton blocks (`animate-pulse bg-muted/60 rounded-md`) matching the exact layout of text and images. Never show a generic center spinner.

---

## 🧩 4. Component Patterns Library (Collect UI & Spottedinprod Index)

### 1. Command Palette (`Cmd + K` / `Ctrl + K`)
- Backdrop: `fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-24`.
- Modal: `w-full max-w-xl bg-card border rounded-xl shadow-2xl overflow-hidden`.
- Input: Borderless search input with `lucide-react` `Search` icon and `Esc` badge.
- Grouped Results: "Recent", "Actions", "Pages", "Settings" with arrow-key navigation.

### 2. Floating Action Dock / Bottom Sheet
- Mobile: Draggable bottom sheet with swipe handle (`w-12 h-1.5 bg-muted rounded-full mx-auto my-3`).
- Desktop: Floating pill dock centered at viewport bottom (`fixed bottom-6 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-md border rounded-full px-4 py-2 shadow-xl flex items-center gap-3 z-40`).

### 3. Toast Notifications (Sonner-style)
- Position: Bottom-right (`bottom-4 right-4`).
- Layout: Icon + Bold Title + 1-line description + Optional inline action button + Dismiss cross.
- Physics: Swipe-to-dismiss with exit scale.

---

## 🎯 5. How to Prompt Claude with This Skill

When asking Claude to generate or refactor any frontend UI:

```text
"Using the ui-ux-design-patterns skill:
1. Reference the [Mobbin/Refero] standard for this [Onboarding / Dashboard / Pricing] flow.
2. Use modern Tailwind CSS + Lucide icons + Framer Motion spring physics.
3. Include proper skeleton loaders, active button states, and defensive edge cases."
```
