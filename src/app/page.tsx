import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Clapperboard,
  Coins,
  Fingerprint,
  Gamepad2,
  Gauge,
  Music2,
  Radio,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

const experiences = [
  {
    href: "/ufx",
    title: "For You",
    desc: "A full-screen feed tuned to what you love — stories, gifts, and creators in one swipe.",
    icon: Sparkles,
  },
  {
    href: "/ufx/reels",
    title: "Reels",
    desc: "Shoot, edit, and post vertical video with sounds pulled straight from UFX Music.",
    icon: Clapperboard,
  },
  {
    href: "/ufx/music",
    title: "Music",
    desc: "Trending charts, new releases, and one tap to use any track in your next video.",
    icon: Music2,
  },
  {
    href: "/ufx/game",
    title: "Games",
    desc: "Join racing, wrestling, and quiz rooms with friends and play for coins.",
    icon: Gamepad2,
  },
  {
    href: "/ufx/live",
    title: "Live",
    desc: "Go live, chat in real time, and receive gifts from your audience as it happens.",
    icon: Radio,
  },
  {
    href: "/ufx/wallet",
    title: "Wallet",
    desc: "One coin balance for gifts, game entries, and creator earnings — with a clear ledger.",
    icon: Wallet,
  },
];

const pillars = [
  {
    title: "AEGIS ID",
    desc: "One identity and session across every app, with two-factor protection for staff.",
    icon: Fingerprint,
  },
  {
    title: "Roles & audit",
    desc: "Role-based permissions on every API, and an audit trail for every sensitive action.",
    icon: ShieldCheck,
  },
  {
    title: "Coins & ledger",
    desc: "Server-authoritative balances, so gifts, game entries, and payouts always reconcile.",
    icon: Coins,
  },
  {
    title: "Multi-app registry",
    desc: "UFX is the first app on AEGIS. New apps plug into the same users, wallet, and controls.",
    icon: Boxes,
  },
];

const nextUp = ["Creator payouts", "Live commerce", "AI recommendations", "Marketplace app"];

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

function Eyebrow({ children, tone = "ufx" }: { children: React.ReactNode; tone?: "ufx" | "aegis" }) {
  return (
    <p
      className={`font-[family-name:var(--font-jetbrains)] text-[11px] font-medium uppercase tracking-[0.22em] ${
        tone === "aegis" ? "text-[var(--aegis-accent)]" : "text-[var(--ufx-accent)]"
      }`}
    >
      {children}
    </p>
  );
}

export default function LandingPage() {
  return (
    <main className="landing-shell">
      <LandingAtmosphere />

      <div className="landing-header-glass sticky top-0 z-20">
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="shrink-0">
            <p className="font-[family-name:var(--font-syne)] text-lg font-semibold tracking-tight">
              <span className="text-[var(--aegis-accent)]">AEGIS</span>{" "}
              <span className="text-white/30">×</span>{" "}
              <span className="tracking-[0.2em] text-white">.UFX.</span>
            </p>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-white/60 md:flex">
            <a href="#experience" className="transition hover:text-white">
              The app
            </a>
            <a href="#platform" className="transition hover:text-white">
              Platform
            </a>
            <a href="#next" className="transition hover:text-white">
              What&apos;s next
            </a>
          </nav>

          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/ufx/login"
              className="hidden rounded-full px-4 py-2 text-white/75 transition hover:text-white sm:inline-flex"
            >
              Sign in
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

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-10 sm:pt-16">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/25 px-3.5 py-1.5 text-xs text-white/75 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--aegis-accent)] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--aegis-accent)] shadow-[0_0_10px_var(--aegis-accent)]" />
          </span>
          UFX is live on the AEGIS platform
        </p>

        <h1 className="max-w-4xl font-[family-name:var(--font-syne)] text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
          Social. Music. Games. Live. Wallet.
          <span className="mt-3 block bg-gradient-to-r from-[var(--ufx-accent)] via-[#ff5a7a] to-[var(--aegis-accent)] bg-clip-text text-transparent">
            One app. One identity.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          UFX brings short video, music, games, live streaming, and a coin wallet together in a
          single app — powered by AEGIS, the platform that keeps every account, payment, and
          permission secure.
        </p>

        <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
          <Link href="/ufx/login" className="landing-cta landing-cta--primary group">
            <span className="landing-cta__shine" aria-hidden />
            <span className="relative z-[1] inline-flex items-center justify-center gap-2">
              Get started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link href="/ufx" className="landing-cta landing-cta--operator group">
            <span className="relative z-[1] inline-flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--aegis-accent)] shadow-[0_0_8px_var(--aegis-accent)]" />
              Explore UFX
            </span>
          </Link>
        </div>

        <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          {[
            ["1", "AEGIS ID for every app"],
            ["6", "experiences in UFX"],
            ["1", "coin wallet across it all"],
            ["24/7", "audit & moderation"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight">
                {value}
              </dd>
              <dd className="mt-1 text-xs leading-snug text-white/45">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* The app */}
      <section id="experience" className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-6 py-16">
        <Eyebrow>The app</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you watch, play, and share — in one place.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
          No hopping between apps. Your feed, your sounds, your games, and your coins all live
          under one account.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="landing-card group flex min-h-[10.5rem] flex-col rounded-2xl p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[var(--ufx-accent)]/10">
                <s.icon className="h-5 w-5 text-[var(--ufx-accent)] transition duration-300 group-hover:scale-110" />
              </span>
              <p className="mt-4 text-lg font-semibold tracking-tight">{s.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">{s.desc}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-medium text-white/40 transition group-hover:text-[var(--ufx-accent)]">
                Open
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* The platform */}
      <section id="platform" className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow tone="aegis">The platform</Eyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight sm:text-4xl">
              AEGIS runs everything behind the scenes.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
              Identity, permissions, payments, and moderation are owned by the platform — not
              rebuilt inside each app. That&apos;s how UFX stays secure today and how new apps
              launch tomorrow.
            </p>
            <Link
              href="/aegis/login"
              className="landing-cta landing-cta--operator group mt-8 w-full sm:w-auto"
            >
              <span className="relative z-[1] inline-flex items-center justify-center gap-2">
                <Gauge className="h-4 w-4 text-[var(--aegis-accent)]" />
                Open Control Center
              </span>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.title} className="landing-card rounded-2xl p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--aegis-accent)]/25 bg-[var(--aegis-accent)]/10">
                  <p.icon className="h-5 w-5 text-[var(--aegis-accent)]" />
                </span>
                <p className="mt-4 text-lg font-semibold tracking-tight">{p.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/50">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's next */}
      <section id="next" className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-6 py-16">
        <div className="landing-card rounded-3xl p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Eyebrow>What&apos;s next</Eyebrow>
              <h2 className="mt-3 font-[family-name:var(--font-syne)] text-2xl font-semibold tracking-tight sm:text-3xl">
                Built to grow with its community.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
                Because every feature sits on the same AEGIS foundation, new capabilities ship
                into UFX — and into new apps — without starting over.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2.5 lg:justify-end">
              {nextUp.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-white/75"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-8 text-center">
        <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight sm:text-4xl">
          Your world, in one app.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/55 sm:text-base">
          Create your AEGIS ID once and step into everything UFX has to offer.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/ufx/login" className="landing-cta landing-cta--primary group w-full max-w-xs sm:w-auto">
            <span className="landing-cta__shine" aria-hidden />
            <span className="relative z-[1] inline-flex items-center justify-center gap-2">
              Create your account
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-white/40 sm:flex-row">
          <p>© 2026 AEGIS. UFX is built on the AEGIS platform.</p>
          <div className="flex items-center gap-5">
            <Link href="/ufx" className="transition hover:text-white">
              Open UFX
            </Link>
            <Link href="/ufx/login" className="transition hover:text-white">
              Sign in
            </Link>
            <Link href="/aegis/login" className="transition hover:text-white">
              Control Center
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
