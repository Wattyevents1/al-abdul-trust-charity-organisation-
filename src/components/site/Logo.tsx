import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span
        className="relative flex h-10 w-10 items-center justify-center rounded-full"
        style={{ background: "var(--gradient-warm)" }}
      >
        <Heart className="h-5 w-5 fill-white text-white" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-bold tracking-tight ${
            light ? "text-white" : "text-foreground"
          }`}
        >
          Al-Abdul Trust
        </span>
        <span
          className={`text-[10px] uppercase tracking-[0.2em] ${
            light ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          Foundation
        </span>
      </span>
    </Link>
  );
}
