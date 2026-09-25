import Link from "next/link";
import {
  ArrowRight,
  Clapperboard,
  Gamepad2,
  Gauge,
  Music2,
  Radio,
  Sparkles,
  Wallet,
} from "lucide-react";

const screens = [
  { href: "/ufx", title: "Home", desc: "For You feed · Stories · Gifts", icon: Sparkles },
  { href: "/ufx/reels", title: "Reels", desc: "Vertical video · Sounds", icon: Clapperboard },
  { href: "/ufx/music", title: "Music", desc: "Charts · Play · Use in video", icon: Music2 },
  { href: "/ufx/game", title: "Games Hub", desc: "Rooms · Coin entry", icon: Gamepad2 },
  { href: "/ufx/wallet", title: "Wallet", desc: "Coins · Ledger · Withdraw", icon: Wallet },
  { href: "/ufx/live", title: "Live", desc: "Chat · Gifts · Viewers", icon: Radio },
  { href: "/aegis", title: "AEGIS Control", desc: "Metrics · Apps · Audit", icon: Gauge },
];

function LandingAtmosphere() {
  return (
    <div className="landing-atmosphere" aria-hidden>
      <div className="landing-atmosphere__base" />
      <div className="landing-atmosphere__aurora" />
      <div className="landing-atmosphere__orb landing-atmosphere__orb--aegis" />
      <div className="landing-atmosphere__orb landing-atmosphere__orb--ufx" />
      <div className="landing-atmosphere__orb landing-atmosphere__orb--core" />
      <div className="landing-atmosphere__grid" />
      <div className="landing-atmosphere__floor" />
      <div className="landing-atmosphere__horizon" />
      <div className="landing-atmosphere__shine" />

      {/* Platform topology: AEGIS core linking UFX product surfaces */}
      <svg
        className="landing-atmosphere__network"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="linkAegis" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2fd6c4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2fd6c4" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="linkUfx" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff2d55" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ff2d55" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="bridge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2fd6c4" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ff2d55" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        <path d="M220 210 C340 160, 420 240, 520 280" stroke="url(#linkAegis)" strokeWidth="1.2" />
        <path d="M980 190 C860 150, 760 230, 680 275" stroke="url(#linkUfx)" strokeWidth="1.2" />
        <path d="M520 280 L680 275" stroke="url(#bridge)" strokeWidth="1.4" />
        <path d="M600 278 L600 420" stroke="url(#bridge)" strokeWidth="1" strokeDasharray="4 6" opacity="0.7" />
        <path d="M220 210 L180 340" stroke="url(#linkAegis)" strokeWidth="1" opacity="0.7" />
        <path d="M980 190 L1040 330" stroke="url(#linkUfx)" strokeWidth="1" opacity="0.7" />
        <path d="M180 340 L320 460" stroke="url(#linkAegis)" strokeWidth="0.9" opacity="0.5" />
        <path d="M1040 330 L900 470" stroke="url(#linkUfx)" strokeWidth="0.9" opacity="0.5" />
        <path d="M320 460 L600 420" stroke="url(#bridge)" strokeWidth="0.9" opacity="0.45" />
        <path d="M900 470 L600 420" stroke="url(#bridge)" strokeWidth="0.9" opacity="0.45" />

        <circle className="node" cx="220" cy="210" r="3.5" fill="#2fd6c4" />
        <circle className="node" cx="180" cy="340" r="2.5" fill="#2fd6c4" />
        <circle className="node" cx="320" cy="460" r="2.5" fill="#2fd6c4" />
        <circle className="node node-ufx" cx="980" cy="190" r="3.5" fill="#ff2d55" />
        <circle className="node node-ufx" cx="1040" cy="330" r="2.5" fill="#ff2d55" />
        <circle className="node node-ufx" cx="900" cy="470" r="2.5" fill="#ff2d55" />
        <circle className="node" cx="600" cy="278" r="4.5" fill="#ffffff" opacity="0.85" />
        <circle className="node" cx="600" cy="420" r="3" fill="#ffffff" opacity="0.55" />
        <circle cx="600" cy="278" r="14" stroke="#ffffff" strokeOpacity="0.12" />
        <circle cx="600" cy="278" r="28" stroke="#2fd6c4" strokeOpacity="0.1" />
        <circle cx="600" cy="278" r="44" stroke="#ff2d55" strokeOpacity="0.08" />
      </svg>

      <div className="landing-atmosphere__noise" />
      <div className="landing-atmosphere__vignette" />
    </div>
  );
}

/** MVP first page — architecture + product map. */
export default function LandingPage() {
  return (
    <main className="landing-shell">
      <LandingAtmosphere />

      <div className="landing-header-glass relative z-10">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <p className="font-[family-name:var(--font-syne)] text-lg font-semibold tracking-tight">
              <span className="text-[var(--aegis-accent)]">AEGIS</span>{" "}
              <span className="text-white/30">×</span>{" "}
              <span className="tracking-[0.2em] text-white">.UFX.</span>
            </p>
            <p className="mt-0.5 font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[0.14em] text-white/40 uppercase">
              Client MVP · Stage 1 foundation + product UI
            </p>
          </div>
          <div className="flex gap-2 text-sm">
            <Link
              href="/aegis"
              className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-white/75 backdrop-blur-md transition hover:border-[var(--aegis-accent)]/55 hover:text-[var(--aegis-accent)]"
            >
              Control Center
            </Link>
            <Link
              href="/ufx"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--ufx-accent)] px-4 py-2 font-medium shadow-[0_10px_32px_rgba(255,45,85,0.4)] transition hover:brightness-110"
            >
              Open UFX
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-6 sm:pt-10">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/25 px-3.5 py-1.5 text-xs text-white/75 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--aegis-accent)] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--aegis-accent)] shadow-[0_0_10px_var(--aegis-accent)]" />
          </span>
          Users open UFX · Operators run AEGIS
        </p>

        <h1 className="max-w-3xl font-[family-name:var(--font-syne)] text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
          Social. Music. Games. Live. Wallet.
          <span className="mt-3 block bg-gradient-to-r from-[var(--ufx-accent)] via-[#ff5a7a] to-[var(--aegis-accent)] bg-clip-text text-transparent">
            On one AEGIS platform.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/58 sm:text-lg">
          This MVP mirrors your product UI and keeps the real architecture: identity, APIs,
          permissions, audit, and multi-app registry — ready to expand into Stage 2–4 without a
          rewrite.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/ufx/login"
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_10px_28px_rgba(255,255,255,0.14)] transition hover:bg-white/92"
          >
            Try as Henry
          </Link>
          <Link
            href="/aegis/login"
            className="rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:border-[var(--aegis-accent)]/45 hover:text-[var(--aegis-accent)]"
          >
            Operator login
          </Link>
        </div>
        <p className="mt-4 font-[family-name:var(--font-jetbrains)] text-[11px] tracking-wide text-white/35">
          Demo password for all accounts: <span className="text-white/65">Demo123!</span>
        </p>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-1 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-syne)] text-2xl font-semibold">
              Product screens in this MVP
            </h2>
            <p className="mt-2 text-sm text-white/48">
              Every screen maps to your design — wired for expansion into full AEGIS services.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {screens.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="landing-card group flex min-h-[7.25rem] w-full flex-col rounded-2xl p-4 sm:w-[calc(50%-0.375rem)] md:w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-0.5625rem)]"
            >
              <s.icon className="mb-3 h-5 w-5 shrink-0 text-[var(--ufx-accent)] transition duration-300 group-hover:scale-110 group-hover:text-[var(--aegis-accent)]" />
              <p className="font-semibold tracking-tight">{s.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/45">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
