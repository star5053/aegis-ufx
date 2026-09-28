"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Clapperboard, Gamepad2, Music2, Radio, ShieldCheck, Wallet } from "lucide-react";

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

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

type Phase = "loading" | "exit" | "done";

export function IntroSplash() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    setPhase((p) => (p === "loading" ? "exit" : p));
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 1100 : 2800;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(easeOutCubic(t) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timers.current.push(window.setTimeout(finish, 280));
      }
    };
    raf = requestAnimationFrame(tick);

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const pending = timers.current;
    return () => {
      cancelAnimationFrame(raf);
      pending.forEach(clearTimeout);
      root.style.overflow = prevOverflow;
    };
  }, [finish]);

  useEffect(() => {
    if (phase !== "exit") return;
    document.documentElement.style.overflow = "";
    const id = window.setTimeout(() => setPhase("done"), 750);
    return () => clearTimeout(id);
  }, [phase]);

  if (phase === "done") return null;

  const step = [...STEPS].reverse().find((s) => progress >= s.at) ?? STEPS[0];

  return (
    <div
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
      </div>
    </div>
  );
}
