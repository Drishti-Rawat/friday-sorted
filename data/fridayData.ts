export interface TimelineItem {
  time: string;
  activity: string;
  icon?: string;
}

export interface FridayIdea {
  id: string;
  title: string;
  favoriteTitle?: string;
  category: "couch" | "main-character" | "chaos" | "reset" | "soft";
  mood: string; // "Chill" | "Party" | "Outdoors" | "Cozy" | "Productive" | "Date Night" | "With Friends" | "Cheap & Fun"
  energy: "low" | "medium" | "high";
  company: "solo" | "partner" | "friends" | "family";
  budget: "free" | "budget" | "splurge";
  duration: string;
  description: string;
  image: string;
  peopleCount: string;
  matchScore?: number;
  tags: string[];
  timeline: TimelineItem[];
  isSurprise?: boolean;
  surpriseRule?: string;
}

export const FRIDAY_IDEAS: FridayIdea[] = [
  // 1. Sunset Picnic (Chill / Partner / Budget)
  {
    id: "sunset-picnic",
    title: "Sunset Picnic",
    favoriteTitle: "Sunset Chasing",
    category: "soft",
    mood: "Chill",
    energy: "low",
    company: "partner",
    budget: "budget",
    duration: "2-3 hours",
    description:
      "Grab some snacks, find a nice spot and watch the sunset without checking your phone every 5 minutes.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.4k",
    tags: ["Chill", "Outdoors", "Low Cost", "2-3 hours"],
    timeline: [
      { time: "6:00 PM", activity: "Pick up some favorite snacks & drinks" },
      { time: "6:30 PM", activity: "Head to a scenic park or beach viewpoint" },
      { time: "7:00 PM", activity: "Unwind & watch the golden hour glow" },
      { time: "8:00 PM", activity: "Late-night hot chai or gelato" },
    ],
  },

  // 2. Food Adventure (With Friends / Friends / Budget)
  {
    id: "food-adventure",
    title: "Food Adventure",
    favoriteTitle: "Food Adventure",
    category: "chaos",
    mood: "With Friends",
    energy: "medium",
    company: "friends",
    budget: "budget",
    duration: "3-4 hours",
    description:
      "Pick a bustling neighborhood you've never eaten in, order one specialty at three different local spots.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    peopleCount: "1.8k",
    tags: ["Foodie", "Social", "Medium Cost", "3-4 hours"],
    timeline: [
      { time: "6:30 PM", activity: "Meet the crew at an artisanal street food joint" },
      { time: "7:45 PM", activity: "Walk through vibrant alleys to spot dessert" },
      { time: "8:45 PM", activity: "Try unexpected flavors at a local night market" },
      { time: "9:45 PM", activity: "Post-crawl laugh session & playlist exchange" },
    ],
  },

  // 3. Movie Marathon (Cozy / Solo / Free)
  {
    id: "movie-marathon",
    title: "Movie Marathon & Pillow Fort",
    favoriteTitle: "Movie Marathon",
    category: "couch",
    mood: "Cozy",
    energy: "low",
    company: "solo",
    budget: "free",
    duration: "4+ hours",
    description:
      "Cozy blankets, dimmed ambient fairy lights, stove-popped popcorn, and a nostalgic 90s trilogy.",
    image:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80",
    peopleCount: "1.5k",
    tags: ["Cozy", "Solo / Duet", "Free", "Evening"],
    timeline: [
      { time: "6:00 PM", activity: "Build maximum-comfort couch nest & soft lighting" },
      { time: "6:30 PM", activity: "Fresh popcorn with smoked paprika & melted butter" },
      { time: "7:00 PM", activity: "Start the classic movie double-feature" },
      { time: "9:30 PM", activity: "Intermission ice cream & soundtrack vibes" },
    ],
  },

  // 4. Rooftop Neon Bash (Party / High Energy / Friends / Splurge)
  {
    id: "rooftop-neon-bash",
    title: "Rooftop Neon DJ & Dancing",
    favoriteTitle: "Rooftop Skyline Party",
    category: "main-character",
    mood: "Party",
    energy: "high",
    company: "friends",
    budget: "splurge",
    duration: "4+ hours",
    description:
      "Skyline views, bass pulsing under neon lights, craft cocktails, and non-stop dancing with your best people.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    peopleCount: "3.2k",
    tags: ["High Energy", "Party", "Nightlife", "Skyline"],
    timeline: [
      { time: "8:00 PM", activity: "Pre-party cocktails & outfit check" },
      { time: "9:30 PM", activity: "Rooftop club entry under the city lights" },
      { time: "11:00 PM", activity: "Midnight bass drop & dancefloor energy" },
      { time: "1:30 AM", activity: "Late-night food truck slice & playlist review" },
    ],
  },

  // 5. Retro Arcade & Tacos (Cheap & Fun / Medium Energy / Friends / Budget)
  {
    id: "arcade-boardgame-night",
    title: "Retro Arcade & Street Tacos",
    favoriteTitle: "Arcade & Tacos",
    category: "chaos",
    mood: "Cheap & Fun",
    energy: "medium",
    company: "friends",
    budget: "budget",
    duration: "3 hours",
    description:
      "Pocket full of tokens, fierce Mario Kart battles, air hockey rivalries, and hot tacos on paper plates.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.1k",
    tags: ["Cheap & Fun", "Arcade", "Low Cost", "Social"],
    timeline: [
      { time: "6:30 PM", activity: "Grab two loaded street tacos & cold drinks" },
      { time: "7:15 PM", activity: "Load game tokens at the retro arcade" },
      { time: "8:00 PM", activity: "4-player Mario Kart tournament" },
      { time: "9:15 PM", activity: "Claw machine triumphs & ticket redemption" },
    ],
  },

  // 6. Candlelight Cooking (Date Night / Partner / Budget)
  {
    id: "candlelight-cooking",
    title: "Handmade Pasta & Candlelight",
    favoriteTitle: "Handmade Pasta Date",
    category: "soft",
    mood: "Date Night",
    energy: "medium",
    company: "partner",
    budget: "budget",
    duration: "3 hours",
    description:
      "Roll out fresh pasta from scratch, blast vintage Italian jazz in the kitchen, and uncork a deep red wine.",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.8k",
    tags: ["Romantic", "Foodie", "Handmade", "Cozy Date"],
    timeline: [
      { time: "6:30 PM", activity: "Pick up fresh basil, semolina flour & wine" },
      { time: "7:15 PM", activity: "Knead and hand-cut golden tagliatelle" },
      { time: "8:15 PM", activity: "Candlelit dinner with jazz in the background" },
      { time: "9:30 PM", activity: "Warm espresso & dessert on the balcony" },
    ],
  },

  // 7. Midnight City Ride (Outdoors / High Energy / Friends / Free)
  {
    id: "night-bike-ride",
    title: "Midnight City Stargaze Ride",
    favoriteTitle: "Midnight City Ride",
    category: "reset",
    mood: "Outdoors",
    energy: "high",
    company: "friends",
    budget: "free",
    duration: "2 hours",
    description:
      "Empty Friday roads, cool night breeze, portable speakers, and neon bike spokes gliding under city lamps.",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80",
    peopleCount: "1.2k",
    tags: ["High Energy", "Outdoors", "Free", "Fresh Air"],
    timeline: [
      { time: "8:00 PM", activity: "Pump tires, test clip-on safety lights" },
      { time: "8:30 PM", activity: "Cruise down the wide open waterfront boulevard" },
      { time: "9:30 PM", activity: "Rooftop stopover for city skyline panoramas" },
    ],
  },

  // 8. Hidden Vinyl Lounge (Main Character / Date Night / Partner / Splurge)
  {
    id: "secret-vinyl-lounge",
    title: "Hidden Vinyl & Jazz Lounge",
    favoriteTitle: "Vinyl & Jazz Lounge",
    category: "main-character",
    mood: "Date Night",
    energy: "medium",
    company: "partner",
    budget: "splurge",
    duration: "2-3 hours",
    description:
      "Dress up in your sleekest jacket, slip into an intimate low-lit listening bar, and sip craft concoctions.",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    peopleCount: "3.1k",
    tags: ["Vibes", "Music", "Splurge", "Intimate"],
    timeline: [
      { time: "7:30 PM", activity: "Golden hour cocktail at a retro listening parlor" },
      { time: "8:30 PM", activity: "Request favorite vintage vinyl record" },
      { time: "9:45 PM", activity: "Stroll under nighttime city neon lights" },
    ],
  },

  // 9. Midnight Cafe Creative Sprint (Productive / Solo / Budget)
  {
    id: "night-cafe-sprint",
    title: "Midnight Cafe Creative Sprint",
    favoriteTitle: "Creative Cafe Sprint",
    category: "reset",
    mood: "Productive",
    energy: "medium",
    company: "solo",
    budget: "budget",
    duration: "3 hours",
    description:
      "A cozy corner booth at a late-night cafe, noise-cancelling headphones, and uninterrupted flow on your passion project.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80",
    peopleCount: "1.1k",
    tags: ["Focus", "Creative", "Solo Flow", "Coffee"],
    timeline: [
      { time: "6:30 PM", activity: "Set up corner workstation with warm latte" },
      { time: "7:00 PM", activity: "90-minute focused deep creation block" },
      { time: "8:30 PM", activity: "Croissant break & sketchbook review" },
      { time: "9:15 PM", activity: "Wrap up sprint notes feeling accomplished" },
    ],
  },

  // 10. Hilltop Stargaze (Outdoors / Low Energy / Solo / Free)
  {
    id: "hilltop-stargaze",
    title: "Hilltop Stargaze & Thermos Chai",
    favoriteTitle: "Hilltop Stargaze",
    category: "reset",
    mood: "Outdoors",
    energy: "low",
    company: "solo",
    budget: "free",
    duration: "2 hours",
    description:
      "Drive out past the city glow, lay out a thick wool blanket, sip hot cardamom chai, and count shooting stars.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80",
    peopleCount: "1.4k",
    tags: ["Outdoors", "Peaceful", "Free", "Stargazing"],
    timeline: [
      { time: "7:00 PM", activity: "Brew cardamom chai & pack warm blankets" },
      { time: "7:45 PM", activity: "Arrive at panoramic scenic hill viewpoint" },
      { time: "8:15 PM", activity: "Track constellations with night sky map" },
      { time: "9:15 PM", activity: "Calm, peaceful drive home" },
    ],
  },

  // 11. Backyard Firepit & S'mores (Chill / Family / Budget)
  {
    id: "backyard-firepit",
    title: "Backyard Firepit & S'mores",
    favoriteTitle: "Firepit S'mores",
    category: "couch",
    mood: "Chill",
    energy: "low",
    company: "family",
    budget: "budget",
    duration: "2.5 hours",
    description:
      "Crackling wood fire, toasted golden marshmallows, acoustic singalongs, and cozy blankets under the porch lights.",
    image:
      "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=800&auto=format&fit=crop&q=80",
    peopleCount: "1.9k",
    tags: ["Wholesome", "Family", "Firepit", "Cozy"],
    timeline: [
      { time: "6:30 PM", activity: "Stack firewood and light the firepit" },
      { time: "7:15 PM", activity: "Roast golden marshmallows & assemble s'mores" },
      { time: "8:00 PM", activity: "Acoustic tunes & storytelling under the stars" },
    ],
  },

  // 12. Clay & Ceramic Pottery (Productive / Soft / Solo / Budget)
  {
    id: "pottery-session",
    title: "Clay & Ceramic Studio Session",
    favoriteTitle: "Ceramic Studio",
    category: "soft",
    mood: "Productive",
    energy: "low",
    company: "solo",
    budget: "budget",
    duration: "2.5 hours",
    description:
      "Turn off work notifications, get your hands wonderfully messy on a potter's wheel, and shape your own mug.",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=80",
    peopleCount: "950",
    tags: ["Creative", "Mindful", "Hands-on", "Calm"],
    timeline: [
      { time: "5:30 PM", activity: "Arrive at cozy open pottery workshop" },
      { time: "6:00 PM", activity: "Shape, throw, and pinch ceramic coffee bowls" },
      { time: "7:30 PM", activity: "Paint pastel glazes with herbal tea in hand" },
    ],
  },
];

// Weighted matching algorithm that picks the true best matching idea based on all 4 user answers
export function matchFridayIdea(userAnswers: {
  mood: string;
  energy: string;
  company: string;
  budget: string;
}): FridayIdea {
  let bestMatch = FRIDAY_IDEAS[0];
  let maxScore = -1;

  for (const idea of FRIDAY_IDEAS) {
    let score = 0;

    // 1. Mood Match (Highest Weight: 45 points)
    if (idea.mood.toLowerCase() === userAnswers.mood.toLowerCase()) {
      score += 45;
    } else {
      // Partial mood affinity
      const affinities: Record<string, string[]> = {
        Chill: ["Cozy", "Outdoors"],
        Party: ["With Friends", "Cheap & Fun"],
        Outdoors: ["Chill", "Cheap & Fun"],
        Cozy: ["Chill", "Date Night"],
        Productive: ["Chill", "Cozy"],
        "Date Night": ["Cozy", "Chill", "Party"],
        "With Friends": ["Party", "Cheap & Fun"],
        "Cheap & Fun": ["With Friends", "Outdoors"],
      };
      if (affinities[userAnswers.mood]?.includes(idea.mood)) {
        score += 20;
      }
    }

    // 2. Energy Match (Weight: 25 points)
    if (idea.energy === userAnswers.energy) {
      score += 25;
    }

    // 3. Company Match (Weight: 20 points)
    if (idea.company === userAnswers.company) {
      score += 20;
    }

    // 4. Budget Match (Weight: 15 points)
    if (idea.budget === userAnswers.budget) {
      score += 15;
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = {
        ...idea,
        matchScore: Math.min(99, Math.max(82, score)),
      };
    }
  }

  return bestMatch;
}

// Exclusive collection of unique, quirky, high-spontaneity Friday adventures
export const SURPRISE_IDEAS: FridayIdea[] = [
  {
    id: "coin-toss-odyssey",
    title: "The 50/50 City Odyssey",
    favoriteTitle: "50/50 City Odyssey",
    category: "chaos",
    mood: "With Friends",
    energy: "high",
    company: "friends",
    budget: "budget",
    duration: "3 hours",
    description:
      "Surrender your Friday to fate. Heads you turn right, tails you turn left at every corner. Zero GPS allowed.",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80",
    peopleCount: "4.2k",
    matchScore: 100,
    isSurprise: true,
    surpriseRule: "Rule: No GPS allowed. Heads right, tails left. You must eat at whatever place you end up in front of.",
    tags: ["🎲 100% Spontaneous", "City Odyssey", "Zero Planning", "Wild Card"],
    timeline: [
      { time: "7:00 PM", activity: "First coin flip right out your front door" },
      { time: "7:45 PM", activity: "Stumble upon an undiscovered back-alley gem" },
      { time: "8:30 PM", activity: "Order the server's personal favorite dish" },
      { time: "9:45 PM", activity: "Post-adventure dessert & mapping your crazy route" },
    ],
  },
  {
    id: "midnight-market-cookoff",
    title: "24-Hour Market Mystery Cookoff",
    favoriteTitle: "Midnight Market Cookoff",
    category: "main-character",
    mood: "Productive",
    energy: "medium",
    company: "friends",
    budget: "budget",
    duration: "3 hours",
    description:
      "Raid an all-night international grocery market at 10 PM. Buy 4 ingredients you've never heard of under $15, and cook an unhinged fusion midnight snack.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80",
    peopleCount: "3.7k",
    matchScore: 100,
    isSurprise: true,
    surpriseRule: "Rule: Buy 4 mystery ingredients you cannot pronounce. You must taste everything you make.",
    tags: ["🍳 Midnight Kitchen", "Culinary Roulette", "Under $15", "Wild Card"],
    timeline: [
      { time: "9:30 PM", activity: "Midnight raid on an international grocery aisle" },
      { time: "10:15 PM", activity: "20-minute chopped mystery kitchen battle" },
      { time: "11:00 PM", activity: "Dramatic tasting ceremony with scorecards" },
    ],
  },
  {
    id: "secret-speakeasy-hunt",
    title: "Password-Only Speakeasy Hunt",
    favoriteTitle: "Secret Speakeasy Hunt",
    category: "main-character",
    mood: "Date Night",
    energy: "medium",
    company: "partner",
    budget: "splurge",
    duration: "3 hours",
    description:
      "Track down an unmarked doorway behind an unassuming vintage phone booth or bookcase alley. Whisper the secret password for dimly lit craft cocktails.",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    peopleCount: "4.5k",
    matchScore: 100,
    isSurprise: true,
    surpriseRule: "Rule: Dress like a 1940s film character. You must whisper the password to the doorman.",
    tags: ["🍸 Secret Door", "Password Entry", "Dimly Lit", "Main Character"],
    timeline: [
      { time: "7:30 PM", activity: "Crack the week's secret clue or entry password" },
      { time: "8:15 PM", activity: "Locate the hidden telephone booth entrance" },
      { time: "9:00 PM", activity: "Bespoke smoked cocktails by candlelight" },
    ],
  },
  {
    id: "silent-disco-park",
    title: "Moonlit Silent Disco in the Park",
    favoriteTitle: "Moonlit Silent Disco",
    category: "chaos",
    mood: "Party",
    energy: "high",
    company: "friends",
    budget: "free",
    duration: "2.5 hours",
    description:
      "Sync the exact same high-energy disco playlist with your crew on headphones. Dance like unhinged main characters in an empty moonlit public square.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.9k",
    matchScore: 100,
    isSurprise: true,
    surpriseRule: "Rule: Headphone sync countdown. No speaking out loud while tracks are playing.",
    tags: ["🎧 Silent Disco", "Under The Stars", "Zero Dollars", "Pure Euphoria"],
    timeline: [
      { time: "8:30 PM", activity: "Meet at the moonlit fountain pavilion" },
      { time: "8:45 PM", activity: "Headphone sync countdown: 3, 2, 1, PLAY" },
      { time: "10:00 PM", activity: "Collapse on the cool grass sharing boba tea" },
    ],
  },
  {
    id: "retro-thrift-timemachine",
    title: "Late-Night Thrift Time Machine",
    favoriteTitle: "Thrift Time Machine",
    category: "reset",
    mood: "Cheap & Fun",
    energy: "low",
    company: "solo",
    budget: "budget",
    duration: "2 hours",
    description:
      "Head to a late-night vintage bazaar or thrift shop. Find the weirdest retro object or record under $10, and invent its tragic backstory over street coffee.",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.3k",
    matchScore: 100,
    isSurprise: true,
    surpriseRule: "Rule: Buy one artifact you would never normally own. Give it a name and a tragic origin story.",
    tags: ["🕰️ Thrift Odyssey", "Vintage Bazaar", "Under $10", "Storytelling"],
    timeline: [
      { time: "7:00 PM", activity: "Rummage through old vinyl crates and antique shelves" },
      { time: "8:00 PM", activity: "Find the weirdest curio under $10" },
      { time: "8:45 PM", activity: "Hot cardamom chai & dramatic backstory reading" },
    ],
  },
  {
    id: "cosmic-glow-bowling",
    title: "Cosmic Glow Bowling & 80s Anthems",
    favoriteTitle: "Cosmic Glow Bowling",
    category: "chaos",
    mood: "Cheap & Fun",
    energy: "high",
    company: "friends",
    budget: "budget",
    duration: "3 hours",
    description:
      "Blacklights, neon pins, synthwave blasting over retro speakers, cheesy loaded nachos, and over-the-top victory dances in rental bowling shoes.",
    image:
      "https://images.unsplash.com/photo-1545809074-59472b3f5ecc?w=800&auto=format&fit=crop&q=80",
    peopleCount: "3.5k",
    matchScore: 100,
    isSurprise: true,
    surpriseRule: "Rule: Every gutter ball requires a dramatic 3-second bow of shame to the alley.",
    tags: ["🎳 Cosmic Glow", "Synthwave", "Cheesy Nachos", "Chaos"],
    timeline: [
      { time: "8:00 PM", activity: "Lace up retro bowling shoes & order nachos" },
      { time: "8:30 PM", activity: "Cosmic blacklight lanes with retro 80s jams" },
      { time: "10:00 PM", activity: "Trophy ceremony for the most ridiculous strike" },
    ],
  },
];

// Returns a truly unique spontaneous surprise idea different from current
export function getSurpriseIdea(excludeId?: string): FridayIdea {
  const pool = SURPRISE_IDEAS.filter((i) => i.id !== excludeId);
  const selected = pool[Math.floor(Math.random() * pool.length)] || SURPRISE_IDEAS[0];
  return {
    ...selected,
    isSurprise: true,
  };
}

export interface MoodCategory {
  id: "couch" | "main-character" | "chaos" | "reset" | "soft";
  title: string;
  subtitle: string;
  icon: string;
  themeColor: string;
  bgColor: string;
  borderColor: string;
}

export const MOOD_CATEGORIES: MoodCategory[] = [
  {
    id: "couch",
    title: "Couch Friday",
    subtitle: "Do absolutely nothing.",
    icon: "sofa",
    themeColor: "#FF6B5E",
    bgColor: "bg-[#FFF2EE]",
    borderColor: "border-[#FF6B5E]/20",
  },
  {
    id: "main-character",
    title: "Main Character Friday",
    subtitle: "Go somewhere you've never been.",
    icon: "sunglasses",
    themeColor: "#7C5CFC",
    bgColor: "bg-[#F3EFFF]",
    borderColor: "border-[#7C5CFC]/20",
  },
  {
    id: "chaos",
    title: "Chaos Friday",
    subtitle: "Make questionable decisions.",
    icon: "sparkles",
    themeColor: "#D946EF",
    bgColor: "bg-[#FDF0FB]",
    borderColor: "border-[#D946EF]/20",
  },
  {
    id: "reset",
    title: "Reset Friday",
    subtitle: "Touch some grass.",
    icon: "plant",
    themeColor: "#A7C557",
    bgColor: "bg-[#F1F8EE]",
    borderColor: "border-[#A7C557]/20",
  },
  {
    id: "soft",
    title: "Soft Friday",
    subtitle: "Good food + good company.",
    icon: "heart",
    themeColor: "#FF6B5E",
    bgColor: "bg-[#FFF0F3]",
    borderColor: "border-[#FF6B5E]/20",
  },
];
