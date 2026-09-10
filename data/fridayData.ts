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

  // 13. Karaoke & Korean Fried Chicken (Party / High Energy / Friends / Budget)
  {
    id: "karaoke-korean-chicken",
    title: "Neon Karaoke & Crispy Fried Chicken",
    favoriteTitle: "Karaoke & Hot Chicken",
    category: "chaos",
    mood: "Party",
    energy: "high",
    company: "friends",
    budget: "budget",
    duration: "3.5 hours",
    description:
      "Private singing booth, tambourines, double-fried spicy soy garlic chicken wings, and screaming 2000s pop anthems.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    peopleCount: "3.8k",
    tags: ["High Energy", "Karaoke", "Foodie", "Singalong"],
    timeline: [
      { time: "7:30 PM", activity: "Meet at the Korean fried chicken joint for loaded platters" },
      { time: "8:45 PM", activity: "Claim private neon-lit karaoke room" },
      { time: "9:15 PM", activity: "Duet showdowns & air guitar solos" },
      { time: "11:00 PM", activity: "Iced boba milk tea debrief walk" },
    ],
  },

  // 14. Secret Speakeasy & Salsa (Party / High Energy / Partner / Splurge)
  {
    id: "speakeasy-salsa",
    title: "Secret Speakeasy & Salsa Nights",
    favoriteTitle: "Speakeasy & Salsa",
    category: "main-character",
    mood: "Party",
    energy: "high",
    company: "partner",
    budget: "splurge",
    duration: "4 hours",
    description:
      "Knock on the unmarked bookcase door, sip mezcal cocktails with smoked rosemary, and join the spontaneous Latin dancefloor.",
    image:
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.7k",
    tags: ["Nightlife", "Romantic", "Dance", "Splurge"],
    timeline: [
      { time: "8:30 PM", activity: "Password entry through hidden bookcase doorway" },
      { time: "9:00 PM", activity: "Smoked cocktail tasting at candlelit booth" },
      { time: "10:15 PM", activity: "Hit the lively salsa dance floor" },
      { time: "12:00 AM", activity: "Midnight churros and city night views" },
    ],
  },

  // 15. Neon Roller Skating Disco (Cheap & Fun / High Energy / Friends / Budget)
  {
    id: "roller-skating-disco",
    title: "Neon Roller Disco & Slushies",
    favoriteTitle: "Neon Roller Disco",
    category: "chaos",
    mood: "Cheap & Fun",
    energy: "high",
    company: "friends",
    budget: "budget",
    duration: "2.5 hours",
    description:
      "Lace up four-wheel retro skates, dodge your wobbly friends under mirror balls, and spin to funky 70s disco beats.",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.5k",
    tags: ["Active", "Retro", "Cheap & Fun", "Laughter"],
    timeline: [
      { time: "7:00 PM", activity: "Rent light-up four-wheel roller skates" },
      { time: "7:30 PM", activity: "Mirror ball disco laps & hand-holding train" },
      { time: "8:45 PM", activity: "Blue raspberry slushies & cheesy pretzel bites" },
      { time: "9:30 PM", activity: "Limbo contest on the main rink floor" },
    ],
  },

  // 16. $10 Grocery Cook-Off Challenge (Cheap & Fun / Medium Energy / Partner / Budget)
  {
    id: "budget-grocery-cookoff",
    title: "The $10 Mystery Cook-Off",
    favoriteTitle: "$10 Cook-Off Duel",
    category: "chaos",
    mood: "Cheap & Fun",
    energy: "medium",
    company: "partner",
    budget: "budget",
    duration: "3 hours",
    description:
      "Each person gets exactly $10 and 15 minutes in the supermarket. Head home and battle for the best gourmet dish.",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
    peopleCount: "1.9k",
    tags: ["Cheap & Fun", "Playful", "Cooking", "Date Duel"],
    timeline: [
      { time: "6:30 PM", activity: "Meet at the market: 15-minute $10 shopping timer" },
      { time: "7:15 PM", activity: "Kitchen apron on: 45-minute cooking clash" },
      { time: "8:00 PM", activity: "Blindfolded plating & taste test judging" },
      { time: "8:45 PM", activity: "Winner picks dessert and movie playlist" },
    ],
  },

  // 17. Night Market Street Food Safari (With Friends / Medium Energy / Friends / Budget)
  {
    id: "night-market-safari",
    title: "Night Market Street Food Safari",
    favoriteTitle: "Night Market Safari",
    category: "chaos",
    mood: "With Friends",
    energy: "medium",
    company: "friends",
    budget: "budget",
    duration: "3 hours",
    description:
      "Follow the scent of charcoal grills and sweet crepes through buzzing neon street stalls with your best crew.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    peopleCount: "3.4k",
    tags: ["Street Food", "Social", "Bustling", "Outdoor Market"],
    timeline: [
      { time: "7:00 PM", activity: "Assemble at the lantern-lit market gate" },
      { time: "7:30 PM", activity: "Round 1: Steaming dumplings & spicy skewers" },
      { time: "8:30 PM", activity: "Round 2: Fresh sugarcane juice & bubble waffles" },
      { time: "9:30 PM", activity: "Browse artisan trinket stalls & vinyl prints" },
    ],
  },

  // 18. Living Room Board Game Showdown (Cozy / Low Energy / Friends / Free)
  {
    id: "board-game-showdown",
    title: "Living Room Board Game Showdown",
    favoriteTitle: "Board Game Showdown",
    category: "couch",
    mood: "Cozy",
    energy: "low",
    company: "friends",
    budget: "free",
    duration: "4 hours",
    description:
      "Break out Catan, Codenames, or Uno. Blankets on the rug, hot chocolate mugs, and friendly banter all night long.",
    image:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.9k",
    tags: ["Cozy", "Games", "Friends", "No Cost"],
    timeline: [
      { time: "6:30 PM", activity: "Gather blankets & brew spiced apple cider" },
      { time: "7:00 PM", activity: "Round 1: Fast-paced social deduction games" },
      { time: "8:30 PM", activity: "Snack pause with warm cookies & dip" },
      { time: "9:00 PM", activity: "Championship strategy showdown" },
    ],
  },

  // 19. Fondue & French Vinyl Night (Cozy / Low Energy / Partner / Budget)
  {
    id: "fondue-french-vinyl",
    title: "Melted Fondue & French Vinyl",
    favoriteTitle: "Fondue & Vinyl Night",
    category: "soft",
    mood: "Cozy",
    energy: "low",
    company: "partner",
    budget: "budget",
    duration: "3 hours",
    description:
      "Bubbling Gruyère cheese fondue pot, crusty sourdough cubes, green apples, and warm vintage French jazz on repeat.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.1k",
    tags: ["Cozy", "Romantic", "Comfort Food", "Vinyl"],
    timeline: [
      { time: "6:30 PM", activity: "Cut sourdough baguettes & crisp Granny Smith apples" },
      { time: "7:15 PM", activity: "Melt Swiss cheese with garlic and white wine" },
      { time: "8:00 PM", activity: "Dipping feast with ambient candlelight and jazz" },
      { time: "9:15 PM", activity: "Dark chocolate strawberries dessert round" },
    ],
  },

  // 20. Solo Bookstore Wandering & Gelato (Chill / Low Energy / Solo / Budget)
  {
    id: "bookstore-gelato-solo",
    title: "Aesthetic Bookstore & Artisan Gelato",
    favoriteTitle: "Bookstore & Gelato",
    category: "reset",
    mood: "Chill",
    energy: "low",
    company: "solo",
    budget: "budget",
    duration: "2.5 hours",
    description:
      "Get wonderfully lost in tall mahogany bookshelves, pick a novel purely by its cover, and enjoy two scoops of pistachio gelato.",
    image:
      "https://images.unsplash.com/photo-1526721940322-10fb6e3ae94a?w=800&auto=format&fit=crop&q=80",
    peopleCount: "1.8k",
    tags: ["Solo Date", "Peaceful", "Books", "Gelato"],
    timeline: [
      { time: "5:30 PM", activity: "Walk through quiet indie bookstore aisles" },
      { time: "6:30 PM", activity: "Choose one book without reading any reviews" },
      { time: "7:15 PM", activity: "Grab two scoops of pistachio & dark chocolate gelato" },
      { time: "7:45 PM", activity: "Read the first three chapters on a park bench" },
    ],
  },

  // 21. At-Home Luxury Spa & Sound Bath (Chill / Low Energy / Solo / Free)
  {
    id: "home-spa-soundbath",
    title: "At-Home Sanctuary Spa & Sound Bath",
    favoriteTitle: "At-Home Spa Reset",
    category: "reset",
    mood: "Chill",
    energy: "low",
    company: "solo",
    budget: "free",
    duration: "2 hours",
    description:
      "Steamy eucalyptus bath, clay face mask, dimmed bathroom candles, and an immersive 432Hz ambient sound bath meditation.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.2k",
    tags: ["Wellness", "Recharge", "Self-Care", "Free"],
    timeline: [
      { time: "7:00 PM", activity: "Eucalyptus essential oils in a hot steaming soak" },
      { time: "7:30 PM", activity: "Cool hydrating face mask & crystal eye stones" },
      { time: "8:15 PM", activity: "Noise-cancelling headphones sound bath session" },
      { time: "9:00 PM", activity: "Sleep tea in fresh clean cotton pajamas" },
    ],
  },

  // 22. Bookstore Date & Dessert Parlor (Date Night / Low Energy / Partner / Budget)
  {
    id: "bookstore-dessert-date",
    title: "Secret Bookstore Date & Warm Churros",
    favoriteTitle: "Bookstore & Dessert Date",
    category: "soft",
    mood: "Date Night",
    energy: "low",
    company: "partner",
    budget: "budget",
    duration: "3 hours",
    description:
      "Pick books for each other that describe your connection, then head to a cozy corner dessert parlor for hot churros and chocolate.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.6k",
    tags: ["Romantic", "Sweet", "Conversations", "Indie"],
    timeline: [
      { time: "6:30 PM", activity: "Bookstore challenge: find a book for each other" },
      { time: "7:30 PM", activity: "Reveal picks with coffee in reading nooks" },
      { time: "8:15 PM", activity: "Late-night dessert parlor for cinnamon churros" },
      { time: "9:15 PM", activity: "Quiet stroll home under golden streetlamps" },
    ],
  },

  // 23. Retro Drive-In Cinema Double Feature (Date Night / Low Energy / Partner / Budget)
  {
    id: "drive-in-cinema",
    title: "Retro Drive-In Cinema & Milkshakes",
    favoriteTitle: "Drive-In Movie Night",
    category: "soft",
    mood: "Date Night",
    energy: "low",
    company: "partner",
    budget: "budget",
    duration: "3.5 hours",
    description:
      "Back the car in, fold down the backseats with duvet blankets and pillows, tune your FM radio to the big screen, and sip thick strawberry milkshakes.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    peopleCount: "3.0k",
    tags: ["Retro", "Romantic", "Drive-In", "Movie"],
    timeline: [
      { time: "7:00 PM", activity: "Arrive early and pick prime center screen spot" },
      { time: "7:30 PM", activity: "Set up bed pillows & order retro diner milkshakes" },
      { time: "8:15 PM", activity: "First feature film under the open twilight sky" },
      { time: "10:15 PM", activity: "Intermission fresh buttered popcorn refill" },
    ],
  },

  // 24. Moonlit Beach Bonfire & Acoustic Jam (Outdoors / Medium Energy / Partner / Free)
  {
    id: "beach-bonfire-acoustic",
    title: "Moonlit Beach Bonfire & Acoustic Jam",
    favoriteTitle: "Beach Bonfire Jam",
    category: "soft",
    mood: "Outdoors",
    energy: "medium",
    company: "partner",
    budget: "free",
    duration: "3 hours",
    description:
      "Tuck warm blankets into the sand, light driftwood in a designated fire ring, listen to waves crash, and hum along to gentle acoustic guitar.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.3k",
    tags: ["Outdoors", "Acoustic", "Ocean Breeze", "Free"],
    timeline: [
      { time: "6:30 PM", activity: "Scout coastal fire ring as the sunset fades" },
      { time: "7:15 PM", activity: "Kindle the bonfire and unwrap thermos hot cider" },
      { time: "8:00 PM", activity: "Acoustic chords with ocean waves crashing rhythm" },
      { time: "9:15 PM", activity: "Stargazing barefoot in the cool evening sand" },
    ],
  },

  // 25. Twilight Glow Kayaking Adventure (Outdoors / Medium Energy / Friends / Splurge)
  {
    id: "twilight-glow-kayaking",
    title: "Twilight Illuminated Kayak Tour",
    favoriteTitle: "Twilight Glow Kayaking",
    category: "reset",
    mood: "Outdoors",
    energy: "medium",
    company: "friends",
    budget: "splurge",
    duration: "2.5 hours",
    description:
      "Glass-bottom kayaks illuminated with neon underwater LED lights, gliding silently over calm nighttime harbor waters.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    peopleCount: "1.7k",
    tags: ["Adventure", "Glow Lights", "Water", "Outdoors"],
    timeline: [
      { time: "6:45 PM", activity: "Gear fitting & safety debrief at the marina dock" },
      { time: "7:15 PM", activity: "Launch illuminated LED kayaks into calm water" },
      { time: "8:15 PM", activity: "Float under historic city bridges reflecting colored light" },
      { time: "9:00 PM", activity: "Dockside warm clam chowder or hot chocolate" },
    ],
  },

  // 26. Co-Working Pizza Jam & Passion Projects (Productive / Medium Energy / Friends / Budget)
  {
    id: "coworking-pizza-jam",
    title: "Co-Working Pizza Jam & Passion Projects",
    favoriteTitle: "Co-Working Pizza Jam",
    category: "reset",
    mood: "Productive",
    energy: "medium",
    company: "friends",
    budget: "budget",
    duration: "3.5 hours",
    description:
      "Laptops around a wooden table, lo-fi beats bumping through the speakers, hot pizza delivered, and finally finishing that creative side project.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    peopleCount: "1.6k",
    tags: ["Productive", "Side Hustle", "Pizza", "Accountability"],
    timeline: [
      { time: "6:30 PM", activity: "Order two giant gourmet specialty pizzas" },
      { time: "7:00 PM", activity: "Lightning pitch: what each person is building tonight" },
      { time: "7:15 PM", activity: "2-hour deep focus work sprint with lo-fi beats" },
      { time: "9:30 PM", activity: "Show & tell demo time with celebratory slices" },
    ],
  },

  // 27. Apartment Sanctuary & Plant Care Reset (Productive / Low Energy / Solo / Free)
  {
    id: "apartment-plant-reset",
    title: "Apartment Sanctuary & Plant Care Reset",
    favoriteTitle: "Plant Care & Room Reset",
    category: "reset",
    mood: "Productive",
    energy: "low",
    company: "solo",
    budget: "free",
    duration: "2 hours",
    description:
      "Mist and prune your house plants, swap bedsheets for crisp eucalyptus linen, declutter your desk, and light a calming cedar candle.",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80",
    peopleCount: "1.4k",
    tags: ["Organize", "Mindful", "Home Reset", "Fresh Start"],
    timeline: [
      { time: "6:00 PM", activity: "Put on calm bossa nova and wipe down surfaces" },
      { time: "6:45 PM", activity: "Water, prune, and rotate all windowsill plants" },
      { time: "7:30 PM", activity: "Make bed with freshly laundered crisp sheets" },
      { time: "8:00 PM", activity: "Light a pine candle and enjoy your pristine sanctuary" },
    ],
  },

  // 28. DIY Artisan Pizza & Family Trivia (Cozy / Low Energy / Family / Budget)
  {
    id: "family-pizza-trivia",
    title: "DIY Artisan Pizza & Family Trivia",
    favoriteTitle: "DIY Pizza & Family Trivia",
    category: "couch",
    mood: "Cozy",
    energy: "low",
    company: "family",
    budget: "budget",
    duration: "3 hours",
    description:
      "Roll out personal pizza dough rounds with all the toppings imaginable, then crown the undisputed household trivia master.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.4k",
    tags: ["Family", "Hands-On", "Pizza", "Trivia"],
    timeline: [
      { time: "6:00 PM", activity: "Set out topping bowls: pesto, burrata, peppers, herbs" },
      { time: "6:30 PM", activity: "Everyone shapes and tops their custom crust" },
      { time: "7:15 PM", activity: "Crispy wood-oven bake and taste comparisons" },
      { time: "8:00 PM", activity: "Family pop-culture and history trivia duel" },
    ],
  },

  // 29. Botanical Garden Stroll & Gelato (Chill / Low Energy / Family / Free)
  {
    id: "botanical-garden-stroll",
    title: "Twilight Botanical Garden Stroll",
    favoriteTitle: "Botanical Garden Stroll",
    category: "soft",
    mood: "Chill",
    energy: "low",
    company: "family",
    budget: "free",
    duration: "2 hours",
    description:
      "Walk the shaded trails of the conservatory, spot exotic blooming orchids in the glass greenhouse, and breathe in fresh pine air.",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop&q=80",
    peopleCount: "1.9k",
    tags: ["Nature", "Peaceful", "Family Walk", "Scenic"],
    timeline: [
      { time: "5:30 PM", activity: "Enter botanical garden grounds during golden hour" },
      { time: "6:15 PM", activity: "Wander through the tropical humidity conservatory" },
      { time: "7:00 PM", activity: "Relax by the koi pond under weeping willows" },
    ],
  },

  // 30. Thrift Store Met Gala Challenge (Cheap & Fun / Medium Energy / Friends / Budget)
  {
    id: "thrift-met-gala",
    title: "The $15 Thrift Store Met Gala",
    favoriteTitle: "Thrift Store Met Gala",
    category: "chaos",
    mood: "Cheap & Fun",
    energy: "medium",
    company: "friends",
    budget: "budget",
    duration: "3 hours",
    description:
      "Each friend gets $15 and 20 minutes to assemble the most absurd, avant-garde haute couture outfit from thrift racks. Red carpet photoshoot included.",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80",
    peopleCount: "3.1k",
    tags: ["Hilarious", "Fashion", "Photoshoot", "Budget Fun"],
    timeline: [
      { time: "6:30 PM", activity: "Meet at a mega thrift store with a $15 budget" },
      { time: "7:15 PM", activity: "Fitting room runway reveals & dramatic critiques" },
      { time: "8:00 PM", activity: "Walk the 'red carpet' outside for hilarious photos" },
      { time: "9:00 PM", activity: "Grab diner fries while rocking the winning outfit" },
    ],
  },

  // 31. Late Night Comedy Cellar & Craft Beer (Party / Medium Energy / Friends / Budget)
  {
    id: "comedy-cellar-craft-beer",
    title: "Underground Comedy Cellar & Craft Pints",
    favoriteTitle: "Comedy Cellar & Beer",
    category: "main-character",
    mood: "Party",
    energy: "medium",
    company: "friends",
    budget: "budget",
    duration: "3 hours",
    description:
      "Descend into a dimly lit brick cellar, catch surprise drop-in standup comedy sets, and laugh till your stomach aches over cold hazy IPAs.",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.8k",
    tags: ["Standup", "Laughter", "Nightlife", "Friends"],
    timeline: [
      { time: "7:30 PM", activity: "Pre-show pints and salty bar snacks at local pub" },
      { time: "8:15 PM", activity: "Take front-middle seats in the basement comedy room" },
      { time: "8:30 PM", activity: "90 minutes of non-stop touring standup sets" },
      { time: "10:15 PM", activity: "Quoting the best punchlines on the walk home" },
    ],
  },

  // 32. Chef's Tasting Menu & Skybar Splurge (Date Night / High Energy / Partner / Splurge)
  {
    id: "chefs-tasting-skybar",
    title: "Chef's Tasting Menu & Skyline High",
    favoriteTitle: "Chef's Tasting & Skybar",
    category: "main-character",
    mood: "Date Night",
    energy: "high",
    company: "partner",
    budget: "splurge",
    duration: "4 hours",
    description:
      "A 6-course seasonal culinary tasting menu with bespoke wine pairings, followed by champagne on the 40th-floor rooftop overlooking the twinkling metropolis.",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80",
    peopleCount: "4.2k",
    tags: ["Splurge", "Fine Dining", "Luxury", "Unforgettable"],
    timeline: [
      { time: "7:30 PM", activity: "Arrive dressed to the nines at chef's table" },
      { time: "8:00 PM", activity: "6-course culinary journey with sommelier pairings" },
      { time: "10:00 PM", activity: "High-speed elevator up to the 40th floor skybar" },
      { time: "10:30 PM", activity: "Champagne toast under the open starlit sky" },
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
  {
    id: "dice-roll-dinner-crawl",
    title: "The 6-Sided Dice Dinner Crawl",
    favoriteTitle: "Dice-Roll Dinner Crawl",
    category: "chaos",
    mood: "With Friends",
    energy: "high",
    company: "friends",
    budget: "budget",
    duration: "3.5 hours",
    description:
      "Carry a single pair of dice into a restaurant district. Roll to pick: 1-2 appetizer spot, 3-4 entree haven, 5-6 dessert parlour. Let fate decide your feast.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    peopleCount: "3.9k",
    matchScore: 100,
    isSurprise: true,
    surpriseRule: "Rule: Roll a d6 at every street corner: odd numbers turn left, evens go right.",
    tags: ["🎲 Dice Roll Feasts", "Fate-Driven", "Foodie Tour", "Wild Card"],
    timeline: [
      { time: "7:00 PM", activity: "Roll first dice for appetizer venue" },
      { time: "7:45 PM", activity: "Roll again for main course location" },
      { time: "8:45 PM", activity: "Final roll for wild late-night dessert" },
      { time: "9:45 PM", activity: "Crown the luckiest roller of the squad" },
    ],
  },
  {
    id: "blindfold-dessert-tournament",
    title: "Blindfolded Dessert Taste-Test Tournament",
    favoriteTitle: "Blindfolded Dessert Duel",
    category: "chaos",
    mood: "Cheap & Fun",
    energy: "medium",
    company: "friends",
    budget: "budget",
    duration: "2.5 hours",
    description:
      "Buy 5 mystery pastries or ice cream pints. Put on silk blindfolds, hand out spoons, and score each blind entry with outrageous sommelier-style critiques.",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
    peopleCount: "3.2k",
    matchScore: 100,
    isSurprise: true,
    surpriseRule: "Rule: No peeking! Elaborate French food-critic accents are mandatory during tasting.",
    tags: ["🍰 Blind Taste Test", "Sweet Tooth", "Party Game", "Wild Card"],
    timeline: [
      { time: "7:30 PM", activity: "Secret pastry run: 5 mystery treats" },
      { time: "8:15 PM", activity: "Silk blindfolds on: Round 1 texture & flavor test" },
      { time: "9:00 PM", activity: "Grand reveal of the champion bakery" },
    ],
  },
  {
    id: "late-night-diner-philosophy",
    title: "24-Hour Neon Diner Philosophy Club",
    favoriteTitle: "24-Hour Diner Club",
    category: "couch",
    mood: "Cozy",
    energy: "low",
    company: "friends",
    budget: "budget",
    duration: "3 hours",
    description:
      "Slide into a squeaky vinyl booth at an all-night diner at 11 PM. Order endless coffee refills and stack of buttermilk pancakes while discussing life's deepest questions.",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.9k",
    matchScore: 100,
    isSurprise: true,
    surpriseRule: "Rule: Phone stack on the center of the table. First person to touch their phone pays for the pancake stack.",
    tags: ["🥞 24-Hour Diner", "Deep Talks", "Pancakes", "Vinyl Booth"],
    timeline: [
      { time: "10:30 PM", activity: "Claim the vintage corner vinyl booth" },
      { time: "11:00 PM", activity: "Buttermilk pancakes, curly fries & bottomless coffee" },
      { time: "12:00 AM", activity: "Late-night philosophy, trivia, & nostalgic playlists" },
    ],
  },
  {
    id: "flashlight-glow-park",
    title: "Adult Flashlight Tag & Childhood Games",
    favoriteTitle: "Flashlight Tag Night",
    category: "reset",
    mood: "Outdoors",
    energy: "high",
    company: "friends",
    budget: "free",
    duration: "2.5 hours",
    description:
      "Crack neon glowsticks, grab flashlights, and head to a quiet neighborhood park for high-stakes games of Capture the Flag and Manhunt under the moon.",
    image:
      "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=800&auto=format&fit=crop&q=80",
    peopleCount: "2.6k",
    matchScore: 100,
    isSurprise: true,
    surpriseRule: "Rule: Glowstick bracelets must stay illuminated at all times. Tagging requires shouting your best movie one-liner.",
    tags: ["🔦 Glow Tag", "Childhood Games", "Moonlit Park", "High Energy"],
    timeline: [
      { time: "8:00 PM", activity: "Suit up in dark clothes & crack neon glowsticks" },
      { time: "8:30 PM", activity: "Round 1: Full-park Capture the Flag" },
      { time: "9:30 PM", activity: "Cool down with cold sodas on the park swings" },
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
