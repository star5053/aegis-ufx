"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clapperboard,
  Gamepad2,
  Gift,
  Headphones,
  Music2,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

type Ad = {
  side: "left" | "right";
  src: string;
  alt: string;
  badge: { live?: boolean; icon?: LucideIcon; label: string };
  eyebrow: string;
  title: string;
  handle: string;
  role: string;
  chips: { icon: LucideIcon; label: string }[];
};

const ADS: Ad[] = [
  {
    side: "left",
    src: "/intro/creator-mina.webp",
    alt: "Mina, a music creator, sharing a reel on UFX",
    badge: { live: true, label: "2.4K watching" },
    eyebrow: "Create on UFX",
    title: "Post a reel tonight. Go live tomorrow.",
    handle: "@mina.wav",
    role: "Music creator",
    chips: [
      { icon: Clapperboard, label: "Reels" },
      { icon: Music2, label: "Add any track" },
      { icon: Gift, label: "Live gifts" },
    ],
  },
  {
    side: "right",
    src: "/intro/creator-leo.webp",
    alt: "Leo, a player, joining a game room on UFX",
    badge: { icon: Users, label: "Racing room · 4/8" },
    eyebrow: "Play on UFX",
    title: "Play with friends. Earn real coins.",
    handle: "@leo.gg",
    role: "Top player",
    chips: [
      { icon: Gamepad2, label: "Game rooms" },
      { icon: Headphones, label: "Top charts" },
      { icon: Wallet, label: "Coin wallet" },
    ],
  },
];

function IntroAd({ ad }: { ad: Ad }) {
  const BadgeIcon = ad.badge.icon;
  return (
    <aside className={`intro-ad intro-ad--${ad.side}`}>
      <figure className="intro-ad__figure">
        <div className="intro-ad__glow" aria-hidden />
        <Image
          src={ad.src}
          alt={ad.alt}
          width={768}
          height={1024}
          sizes="(min-width: 900px) 340px, 1px"
          loading="eager"
          fetchPriority="high"
          className="intro-ad__img"
        />
        <span className="intro-ad__badge">
          {ad.badge.live ? (
            <span className="intro-ad__live">Live</span>
          ) : (
            BadgeIcon && <BadgeIcon className="h-3.5 w-3.5" strokeWidth={2.2} />
          )}
          {ad.badge.label}
        </span>
        <ul className="intro-ad__chips">
          {ad.chips.map(({ icon: Icon, label }, i) => (
            <li key={label} className={`intro-ad__chip intro-ad__chip--${i + 1}`}>
              <span className="intro-ad__chip-icon">
                <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </figure>
      <div className="intro-ad__card">
        <p className="intro-ad__eyebrow">
          <Sparkles className="h-3 w-3" />
          {ad.eyebrow}
        </p>
        <p className="intro-ad__title">{ad.title}</p>
        <div className="intro-ad__foot">
          <p className="intro-ad__handle">
            <span className="intro-ad__handle-name">
              {ad.handle}
              <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.2} aria-label="Verified" />
            </span>
            <span className="intro-ad__handle-role">{ad.role}</span>
          </p>
          <Link href="/ufx/login" className="intro-ad__cta">
            Join free
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

const NODES = [
  { label: "Social", icon: Clapperboard },
  { label: "Music", icon: Music2 },
  { label: "Games", icon: Gamepad2 },
  { label: "Live", icon: Radio },
  { label: "Wallet", icon: Wallet },
];

const STEPS = [
  { at: 0, text: "Initializing AEGIS ID" },
  { at: 25, text: "Securing wallet ledger" },
  { at: 50, text: "Syncing music, reels & live" },
  { at: 82, text: "Opening UFX" },
];

// Geometry in the 400×400 SVG viewBox; HTML nodes use the same ratios as percentages.
const CENTER = 200;
const ORBIT_R = 150;
const CORE_R = 52;
const NODE_R = 30;

const round = (n: number) => Math.round(n * 1000) / 1000;

const points = NODES.map((_, i) => {
  const angle = (-90 + (360 / NODES.length) * i) * (Math.PI / 180);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    left: round(50 + (ORBIT_R / 400) * 100 * cos),
    top: round(50 + (ORBIT_R / 400) * 100 * sin),
    x1: round(CENTER + CORE_R * cos),
    y1: round(CENTER + CORE_R * sin),
    x2: round(CENTER + (ORBIT_R - NODE_R) * cos),
    y2: round(CENTER + (ORBIT_R - NODE_R) * sin),
  };
});

const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

const LOAD_MS = 6500;
const READY_MS = 6000;

type Phase = "loading" | "ready" | "exit" | "done";

export function IntroSplash() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const finish = useCallback(() => {
    setPhase((p) => (p === "loading" || p === "ready" ? "exit" : p));
  }, []);

  useEffect(() => {
    // Hydrated: the component owns the lifecycle, so the no-JS CSS failsafe must not cut the ads short.
    if (rootRef.current) rootRef.current.style.animation = "none";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 1100 : LOAD_MS;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(easeOutQuad(t) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase((p) => (p === "loading" ? "ready" : p));
      }
    };
    raf = requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") finish();
    };
    window.addEventListener("keydown", onKey);

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
    };
  }, [finish]);

  useEffect(() => {
    if (phase !== "ready") return;
    const id = window.setTimeout(finish, READY_MS);
    return () => clearTimeout(id);
  }, [phase, finish]);

  useEffect(() => {
    if (phase !== "exit") return;
    document.documentElement.style.overflow = "";
    const id = window.setTimeout(() => setPhase("done"), 750);
    return () => clearTimeout(id);
  }, [phase]);

  if (phase === "done") return null;

  const step = [...STEPS].reverse().find((s) => progress >= s.at) ?? STEPS[0];
  const ready = phase === "ready";

  return (
    <div
      ref={rootRef}
      className={`intro ${phase === "exit" ? "intro--exit" : ""}`}
      aria-label="Loading UFX"
      aria-busy={phase === "loading"}
    >
      <div className="landing-atmosphere" aria-hidden>
        <div className="landing-atmosphere__base" />
        <div className="landing-atmosphere__aurora" />
        <div className="landing-atmosphere__orb landing-atmosphere__orb--aegis" />
        <div className="landing-atmosphere__orb landing-atmosphere__orb--ufx" />
        <div className="landing-atmosphere__grid" />
        <div className="landing-atmosphere__noise" />
        <div className="landing-atmosphere__vignette" />
      </div>

      <button type="button" onClick={finish} className="intro__skip">
        Skip intro
      </button>

      {ADS.map((ad) => (
        <IntroAd key={ad.side} ad={ad} />
      ))}

      <div className="intro__stage">
        <p className="intro__eyebrow">
          <span className="text-[var(--aegis-accent)]">AEGIS</span>
          <span className="text-white/25">platform</span>
        </p>

        <div className="intro__orbit" aria-hidden>
          <svg className="intro__links" viewBox="0 0 400 400" fill="none">
            <defs>
              <linearGradient id="introLink" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2fd6c4" />
                <stop offset="100%" stopColor="#ff2d55" />
              </linearGradient>
            </defs>
            <circle
              cx={CENTER}
              cy={CENTER}
              r={ORBIT_R}
              className="intro__track"
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="2 7"
            />
            {points.map((p, i) => (
              <g key={i}>
                <line
                  x1={p.x1}
                  y1={p.y1}
                  x2={p.x2}
                  y2={p.y2}
                  stroke="url(#introLink)"
                  strokeOpacity="0.45"
                  strokeWidth="1.2"
                  className="intro__link"
                  style={{ animationDelay: `${0.35 + i * 0.12}s` }}
                />
                <line
                  x1={p.x2}
                  y1={p.y2}
                  x2={p.x1}
                  y2={p.y1}
                  stroke="#ffffff"
                  strokeOpacity="0.9"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  className="intro__flow"
                  style={{ animationDelay: `${1.1 + i * 0.12}s` }}
                />
              </g>
            ))}
          </svg>

          <div className="intro__core">
            <span className="intro__ring intro__ring--outer" />
            <span className="intro__ring intro__ring--inner" />
            <span className="intro__core-dot">
              <ShieldCheck className="h-7 w-7 text-[var(--aegis-accent)]" strokeWidth={1.75} />
            </span>
          </div>

          {NODES.map((node, i) => (
            <div
              key={node.label}
              className="intro__node"
              style={{ left: `${points[i].left}%`, top: `${points[i].top}%` }}
            >
              <div className="intro__node-pop" style={{ animationDelay: `${0.55 + i * 0.12}s` }}>
                <span className="intro__node-icon">
                  <node.icon className="h-5 w-5 text-[var(--ufx-accent)]" strokeWidth={1.9} />
                </span>
                <span className="intro__node-label">{node.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="intro__brand">
          <p className="intro__wordmark">.UFX.</p>
          <p className="intro__tagline">
            One app. One identity. <span className="text-white/40">Powered by AEGIS.</span>
          </p>
        </div>

        <div className="intro__people">
          <span className="intro__avatars" aria-hidden>
            {ADS.map((ad) => (
              <span key={ad.side} className="intro__avatar">
                <Image src={ad.src} alt="" width={768} height={1024} sizes="72px" />
              </span>
            ))}
          </span>
          <span>
            Join <strong>Mina</strong>, <strong>Leo</strong> and creators on UFX
          </span>
        </div>

        {ready ? (
          <div className="intro__ready">
            <button type="button" onClick={finish} className="intro__enter">
              Enter UFX
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="intro__autobar" style={{ animationDuration: `${READY_MS}ms` }} />
            <p className="intro__ready-hint">Opening automatically · press Enter</p>
          </div>
        ) : (
          <div className="intro__progress">
            <div className="intro__progress-row">
              <p role="status" aria-live="polite" className="intro__status">
                <span className="intro__status-dot" />
                {step.text}
                <span className="intro__ellipsis" />
              </p>
              <span className="intro__percent">{String(progress).padStart(3, "0")}%</span>
            </div>
            <div className="intro__bar">
              <span className="intro__bar-fill" style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
