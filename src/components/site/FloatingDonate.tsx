import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export function FloatingDonate() {
  return (
    <Link
      to="/causes"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-[var(--shadow-glow)] transition hover:scale-105"
      style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)", animation: "var(--animate-pulse-glow)" }}
    >
      <Heart className="h-4 w-4 fill-current" />
      Donate
    </Link>
  );
}
