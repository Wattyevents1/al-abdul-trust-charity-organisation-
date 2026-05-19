import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.669.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.747.455 3.448 1.318 4.945L2 22l5.255-1.378a9.86 9.86 0 0 0 4.784 1.224h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.647-1.03-5.135-2.903-7.006A9.847 9.847 0 0 0 12.04 2zm0 18.094h-.003a8.23 8.23 0 0 1-4.193-1.148l-.301-.179-3.118.818.832-3.038-.196-.312a8.225 8.225 0 0 1-1.262-4.385c0-4.541 3.695-8.236 8.244-8.236 2.2 0 4.267.857 5.821 2.413a8.183 8.183 0 0 1 2.41 5.83c0 4.542-3.695 8.237-8.234 8.237z"/>
    </svg>
  );
}
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
            {[
              { Icon: Facebook, href: "https://www.facebook.com/share/14bxSQNEbCT/?mibextid=wwXIfr", label: "Facebook" },
              { Icon: Instagram, href: "https://www.instagram.com/al_abdul_trust_charity_org?igsh=MTV6MzIyaTJicGRyNg%3D%3D&utm_source=qr", label: "Instagram" },
              { Icon: WhatsAppIcon, href: "https://wa.me/message/DWXG46HBOV6CL1", label: "WhatsApp" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold hover:text-gold-foreground transition flex items-center justify-center">
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
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /><a href="tel:+256760886599" className="hover:text-gold transition">+256 76 088 6599</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /><a href="mailto:alabdultrustcharityorg@gmail.com" className="hover:text-gold transition break-all">alabdultrustcharityorg@gmail.com</a></li>
            <li className="flex gap-2"><WhatsAppIcon className="h-4 w-4 mt-0.5 shrink-0" /><a href="https://wa.me/message/DWXG46HBOV6CL1" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">WhatsApp us</a></li>
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
          <p>© {new Date().getFullYear()} Al-Abdul Trust Charity Organisation — Serving Humanity. All rights reserved.</p>
          <p>Registered NGO • Tax ID 00-1234567</p>
        </div>
      </div>
    </footer>
  );
}
