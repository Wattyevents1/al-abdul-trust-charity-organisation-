import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.png";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-gold/40 shadow-sm">
        <img src={logoImg} alt="Al-Abdul Trust Charity Organisation logo" className="h-full w-full object-contain" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-base font-bold tracking-tight ${
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
          Serving Humanity
        </span>
      </span>
    </Link>
  );
}
