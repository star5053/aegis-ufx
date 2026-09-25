import { UfxNav } from "@/components/ufx/UfxNav";

export const dynamic = "force-dynamic";

export default function UfxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ufx-shell">
      <div className="relative mx-auto min-h-[100dvh] max-w-lg pb-[calc(5.5rem+env(safe-area-inset-bottom))] [&:has([data-ufx-home])]:pb-0">
        {children}
      </div>
      <UfxNav />
    </div>
  );
}
