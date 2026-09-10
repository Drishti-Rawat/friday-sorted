# 🎉 Friday, Sorted.

> **Stop overthinking your weekend. Tell us your mood, energy, and crew — we'll find fun ideas to make your Friday special.**

An interactive, responsive web application designed to cure Friday night indecision. Built with **Next.js 15**, **React 19**, **Tailwind CSS**, and **Framer Motion**, featuring a playful lifestyle aesthetic, custom sound effects, calendar export, and spontaneous wildcard generation.

---

## 🚀 Live Demo & Getting Started

### Prerequisites
- Node.js 18.17+ or later
- npm / pnpm / yarn

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/friday-sorted.git
cd friday-sorted

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
# Visit http://localhost:3000
```

---

## 🎨 Design System & Color Palette

Friday, Sorted uses a warm, tactile lifestyle design system with creamy backdrops, editorial serif headings, and vibrant energetic accents:

| Token | Name | Hex Code | Preview | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `cream` | Warm Vanilla | `#FFF9F2` | ![#FFF9F2](https://via.placeholder.com/15/FFF9F2/000000?text=+) | Primary app background |
| `primary` | Electric Purple | `#7C5CFC` | ![#7C5CFC](https://via.placeholder.com/15/7C5CFC/000000?text=+) | Primary brand buttons, links, active accents |
| `secondary` | Warm Coral | `#FF6B5E` | ![#FF6B5E](https://via.placeholder.com/15/FF6B5E/000000?text=+) | Like hearts, high-energy tags, badges |
| `accent` | Sun Yellow | `#FFD166` | ![#FFD166](https://via.placeholder.com/15/FFD166/000000?text=+) | Sticky notes, highlighter brush strokes, doodles |
| `sage` | Fresh Sage | `#A7C557` | ![#A7C557](https://via.placeholder.com/15/A7C557/000000?text=+) | Relaxed tags, wellness indicators |
| `dark` | Deep Charcoal | `#1F1B24` | ![#1F1B24](https://via.placeholder.com/15/1F1B24/000000?text=+) | Primary text, high-contrast buttons |

### Typography

- **Display & Headlines**: [`Fraunces`](https://fonts.google.com/specimen/Fraunces) — Warm, expressive, high-contrast serif font with vintage character.
- **Body & UI**: [`Plus Jakarta Sans`](https://fonts.google.com/specimen/Plus+Jakarta+Sans) — Modern, clean geometric sans-serif for crystal-clear readability.
- **Handwritten Doodles & Notes**: [`Caveat`](https://fonts.google.com/specimen/Caveat) — Playful handwritten accent font for sticky notes and polaroid captions.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server & Client Components)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animations & Physics**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Audio**: Custom Web Audio API Synthesizer (Zero-latency micro-sounds)
- **Storage**: Browser LocalStorage for persistent saved favorites

---

## 📱 Pages & User Flows

### 1. Landing Page (`/`)
The main discovery hub loaded with micro-interactions:
- **Live Countdown to Friday**: Animated real-time countdown bar with pulsing live indicator. Automatically switches to active celebration mode on Fridays (*"IT'S FINALLY FRIDAY!"*).
- **Sticky Glassmorphic Header**: Clean branding, saved plans counter, floating mobile navigation overlay that never pushes layout down, and anchor navigation to page sections.
- **Hero Section**:
  - Left-aligned editorial poster layout.
  - Interactive celebration confetti trigger on button click.
  - Interactive 3D Polaroid collage with real activity snapshots, sticky notes (*"Good Food"*, *"Better Company"*, *"Happier You"*), and mouse tilt physics.
  - Responsive optimization with crisp Retina rendering on mobile.
- **Mood Selector Grid (`#ideas`)**: Filter friday plans by vibe: *Chill & Cozy*, *Food & Drinks*, *Social & Out*, *Active & Fun*, and *Creative & Curious*.
- **Friday Favorites (`#favorites`)**: Curated community picks with single-row swipeable energy filters (*All Vibes*, *Chill*, *Explorer*, *Full Send*) and instant like/save buttons.
- **Wild Card Teaser (`#wildcard`)**: Spontaneous adventure roller with real-time shuffle animation.
- **Saved Plans Drawer**: Slide-over drawer to browse, view, or remove saved Friday itineraries.
- **Footer**: 3-column quick navigation, legal links, and smooth back-to-top button.

### 2. The Friday Planner (`/planner`)
A focused full-screen interactive wizard to generate the perfect night:
- **Step 1: Mood & Vibe**: Choose your Friday headspace (Unwind & Cozy, Good Food & Drinks, Party & Social, Outdoor Adventure, etc.).
- **Step 2: Energy Level**: Dial in your battery (🛋️ Low / Chill, 🚶 Medium / Explorer, ⚡ High / Full Send).
- **Step 3: Company**: Pick your crew (Solo recharge, Partner date night, Small group, Big squad).
- **Smart Recommendation Engine**: Matches user answers against a database of curated Friday experiences.
- **Detailed Itinerary View**:
  - **Hero Banner**: High-res photography with category tag, vibe badge, and heart save toggle.
  - **Timeline Itinerary**: Hour-by-hour schedule breakdown for the evening.
  - **Key Details Grid**: Estimated budget ($ to $$$), optimal duration, and company recommendations.
  - **Spontaneous Rule**: A fun challenge or game rule for the evening to keep things memorable.
  - **Spotify Playlist Link**: Curated playlist to set the soundtrack for the night.
  - **What to Wear**: Dress code guidelines.
  - **Pro Tips**: Local insider advice for smooth execution.
- **Spontaneous Wild Card Shuffle**:
  - Feeling lucky? Click *"Surprise Me"* to launch a slot-machine reel shuffle animation.
  - Includes an audio-synced reel spinner that locks onto an unexpected Friday idea.
  - *"Back to matched plan"* recovery button to restore your original quiz result anytime.
- **Export & Share**:
  - **Calendar Export**: Generates a standard `.ics` file to add the plan directly to Apple, Google, or Outlook Calendar.
  - **Social Sharing**: Native Web Share API with instant fallback to clipboard copy.

---

## 🔊 Custom Sound Effects Engine

A lightweight, zero-dependency sound engine built with the **Web Audio API** ([utils/sound.ts](file:///d:/friday-sorted/utils/sound.ts)):
- **Pop**: Snappy, pleasant high-frequency bubble pop for buttons, filters, and like toggles.
- **Shuffle Tick**: Rhythmic mechanical tick for the slot-machine wildcard roller.
- **Tada / Victory**: Multi-tone harmonic chime when revealing a matched Friday plan.
- **Confetti Whoosh**: Celebratory sweep for hero CTA interactions.

---

## 📂 Project Structure

```text
friday-sorted/
├── app/
│   ├── layout.tsx              # Root layout with Fraunces, Jakarta Sans & Caveat fonts
│   ├── page.tsx                # Landing page with all curated sections
│   ├── globals.css             # Tailwind base styles and font variables
│   └── planner/
│       └── page.tsx            # Full interactive quiz & itinerary result page
├── components/
│   ├── FridayCountdownTicker.tsx # Dynamic countdown timer to Friday midnight
│   ├── Header.tsx              # Sticky nav with floating mobile drawer overlay
│   ├── Hero.tsx                # Editorial typography & 3D polaroid collage
│   ├── MoodSelector.tsx        # Grid mood categories with filter tags
│   ├── FridayFavorites.tsx     # Curated cards with horizontal swipeable pills
│   ├── IdeaCard.tsx            # Reusable card component (standard & wildcard)
│   ├── WildCardSection.tsx     # Landing page interactive wildcard teaser
│   ├── QuizScreen.tsx          # 3-step question wizard with progress bar
│   ├── ResultScreen.tsx        # Comprehensive itinerary view & calendar export
│   ├── SavedIdeasDrawer.tsx    # Slide-over saved ideas drawer
│   └── Footer.tsx              # 3-column navigation & back-to-top button
├── data/
│   └── fridayData.ts           # Curated database of Friday ideas & matching algorithm
├── utils/
│   └── sound.ts                # Web Audio API sound synthesis engine
├── public/
│   ├── hero-image.png          # High-resolution Polaroid collage graphic
│   └── logo.png                # Friday, Sorted. wordmark logo
├── tailwind.config.ts          # Custom color tokens and font families
└── tsconfig.json               # TypeScript configuration
```

---

## 📄 License

MIT © Friday, Sorted. Built with 💜 for better weekends.
