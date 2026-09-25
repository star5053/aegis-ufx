/** Curated product catalog for Stage 2/3 UI — later replaced by AEGIS Music / Game / Wallet services. */

export const musicCatalog = {
  featured: {
    title: "Neon Frequency",
    subtitle: "UFX Sounds • Vol. 1",
    badge: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=1200&q=80",
  },
  tracks: [
    {
      id: "t1",
      title: "Afterglow",
      artist: "KAIRO & LAYLA",
      duration: "3:42",
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80",
    },
    {
      id: "t2",
      title: "Lost in the Echo",
      artist: "NOAH V",
      duration: "4:01",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80",
    },
    {
      id: "t3",
      title: "Pressure",
      artist: "JXN",
      duration: "3:19",
      cover:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&q=80",
    },
    {
      id: "t4",
      title: "Velocity",
      artist: "SYNAPSE",
      duration: "2:58",
      cover:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&q=80",
    },
    {
      id: "t5",
      title: "Night Drive",
      artist: "ELIJAH K",
      duration: "4:33",
      cover:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&q=80",
    },
  ],
};

export const gameCatalog = {
  featured: {
    title: "NEON CIRCUIT",
    subtitle: "High-speed night racing. No brakes. No limits.",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&q=80",
  },
  rooms: [
    {
      id: "g1",
      name: "Racing",
      players: "4/8 players",
      entry: 50,
      kind: "racing" as const,
    },
    {
      id: "g2",
      name: "Wrestling",
      players: "2/4 players",
      entry: 25,
      kind: "wrestling" as const,
    },
    {
      id: "g3",
      name: "Mini Quiz",
      players: "6/10 players",
      entry: 20,
      kind: "quiz" as const,
    },
  ],
};

export const walletDemo = {
  coins: 12480,
  cash: 86.75,
  rateNote: "≈ configurable rate via AEGIS",
  transactions: [
    {
      id: "w1",
      title: "Gift received",
      at: "May 24, 2025 • 7:12 PM",
      amount: 500,
      type: "credit" as const,
      kind: "gift" as const,
    },
    {
      id: "w2",
      title: "Game entry",
      at: "May 24, 2025 • 6:45 PM",
      amount: -200,
      type: "debit" as const,
      kind: "game" as const,
    },
    {
      id: "w3",
      title: "Gift sent",
      at: "May 24, 2025 • 5:33 PM",
      amount: -100,
      type: "debit" as const,
      kind: "gift" as const,
    },
  ],
};

export const liveDemo = {
  host: "live.luna",
  viewers: "8.2K",
  image:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80",
  chat: [
    { user: "alex.r", text: "Your energy is everything ✨" },
    { user: "sophia.l", text: "Loving this vibe 💞" },
    { user: "jordan.k", text: "So inspiring, thank you!" },
    { user: "live.luna", text: "just sent a Rose 🌹 x1", gift: true },
    { user: "taylor.m", text: "Tell us more about your routine!" },
  ],
};

export const reelsDemo = [
  {
    id: "r1",
    username: "sunny.moves",
    caption: "chasing light, becoming it. movement is my language. ✨",
    sound: "Original Sound — Neon Pulse",
    likes: "12.4K",
    comments: "892",
    // Rooftop / golden-hour dance energy matching Images/2 mockup
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1080&q=85",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&q=80",
  },
  {
    id: "r2",
    username: "henry",
    caption: "Night views. No plans. Just vibes. #citylights",
    sound: "Original Sound — City Pulse",
    likes: "12.4K",
    comments: "218",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1080&q=80",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Henry&backgroundColor=0a0a0a",
  },
];

export const storiesDemo = [
  { label: "You", seed: "You", self: true },
  { label: "@sara", seed: "Sara", add: true },
  { label: "@liam", seed: "Liam" },
  { label: "@ava", seed: "Ava" },
  { label: "@explore", seed: "Explore" },
];
