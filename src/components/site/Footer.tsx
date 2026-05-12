import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container-narrow py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm text-primary-foreground/70 max-w-xs">
            A humanitarian movement bringing hope, dignity and opportunity to communities across Africa.
          </p>
          <div className="flex gap-3 pt-2">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold hover:text-gold-foreground transition flex items-center justify-center">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-white">Explore</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {[["About", "/about"], ["Our Causes", "/causes"], ["Events", "/events"], ["Blog", "/blog"], ["Gallery", "/gallery"]].map(([l, h]) => (
              <li key={h}><Link to={h} className="hover:text-gold transition">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-white">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" />Plot 24, Hope Street, Nairobi, Kenya</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" />+254 700 123 456</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" />hello@hopeafrica.org</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-white">Newsletter</h4>
          <p className="text-sm text-primary-foreground/70 mb-3">Stories of hope, straight to your inbox.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="your@email.com" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
            <Button type="submit" className="rounded-md" style={{ background: "var(--gold)", color: "var(--gold-foreground)" }}>Join</Button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-narrow py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Al-Abdul Trust Charity Organisation. All rights reserved.</p>
          <p>Registered NGO • Tax ID 00-1234567</p>
        </div>
      </div>
    </footer>
  );
}
