import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.png";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-gold/40 shadow-sm">
        <img src={logoImg} alt="Al-Abdul Trust CHARITY ORGANISATION logo" className="h-full w-full object-contain" />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={`font-display text-sm sm:text-base font-bold tracking-tight ${
            light ? "text-white" : "text-foreground"
          }`}
        >
          Al-Abdul Trust
        </span>
        <span
          className={`text-[9px] sm:text-[10px] uppercase tracking-[0.18em] ${
            light ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          CHARITY ORGANISATION
        </span>
      </span>
    </Link>
  );
}
