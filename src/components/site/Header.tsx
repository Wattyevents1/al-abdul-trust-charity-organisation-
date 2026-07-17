import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/causes", label: "Projects" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Blog" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
  { to: "/legal", label: "Legal" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border/50 py-2" : "py-4"
      }`}
    >
      <div className="container-narrow flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/volunteer">Volunteer</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full px-5" style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}>
            <Link to="/causes">Donate Now</Link>
          </Button>
        </div>
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden glass border-t border-border/50 mt-2">
          <div className="container-narrow py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-3 rounded-full" style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}>
              <Link to="/causes" onClick={() => setOpen(false)}>Donate Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
