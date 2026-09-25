import Link from "next/link";
import {
  ArrowDownToLine,
  Building2,
  ChevronLeft,
  Gift,
  Lock,
  Plus,
  Send,
  Gamepad2,
} from "lucide-react";
import { walletDemo } from "@/lib/ufx-catalog";

export default function WalletPage() {
  return (
    <div className="min-h-screen px-4 pb-10 pt-4">
      <div className="flex items-center gap-2">
        <Link href="/ufx/profile" className="rounded-full p-1 text-white/80">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">Wallet</h1>
      </div>

      <div className="mt-8">
        <p className="text-sm text-white/45">UFX Coins</p>
        <p className="mt-1 font-[family-name:var(--font-syne)] text-5xl font-bold tracking-tight">
          {walletDemo.coins.toLocaleString()}
        </p>
        <p className="mt-2 text-xs text-white/40">{walletDemo.rateNote}</p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sm font-semibold">
          $
        </span>
        <div>
          <p className="text-xs text-white/45">Cash Balance</p>
          <p className="text-lg font-semibold">$ {walletDemo.cash.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-5 gap-2 text-center">
        {[
          { label: "Buy", icon: Plus, accent: true },
          { label: "Send", icon: Send },
          { label: "Receive", icon: ArrowDownToLine },
          { label: "Gift", icon: Gift },
          { label: "Withdraw", icon: Building2 },
        ].map((a) => (
          <button key={a.label} type="button" className="space-y-2">
            <span
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border ${
                a.accent
                  ? "border-[var(--ufx-accent)] text-[var(--ufx-accent)]"
                  : "border-white/15 text-white"
              }`}
            >
              <a.icon className="h-5 w-5" />
            </span>
            <span
              className={`text-xs ${a.accent ? "font-medium text-[var(--ufx-accent)]" : "text-white/55"}`}
            >
              {a.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <button type="button" className="text-sm text-white/45">
          View all
        </button>
      </div>

      <div className="mt-3 space-y-1">
        {walletDemo.transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center gap-3 border-b border-white/[0.06] py-3.5"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                tx.type === "credit"
                  ? "border-[var(--ufx-success)]/40 text-[var(--ufx-success)]"
                  : "border-white/15 text-white/80"
              }`}
            >
              {tx.kind === "game" ? (
                <Gamepad2 className="h-5 w-5" />
              ) : (
                <Gift className="h-5 w-5" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className={`text-sm font-medium ${
                  tx.type === "credit" ? "text-[var(--ufx-success)]" : "text-white"
                }`}
              >
                {tx.title}
              </p>
              <p className="text-xs text-white/40">{tx.at}</p>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-semibold ${
                  tx.amount > 0 ? "text-[var(--ufx-success)]" : "text-[var(--ufx-accent)]"
                }`}
              >
                {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
              </p>
              <p className="text-[11px] text-white/40">UFX Coins</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 flex items-center justify-center gap-1.5 text-xs text-white/35">
        <Lock className="h-3.5 w-3.5" />
        Secured by AEGIS Ledger
      </p>
    </div>
  );
}
