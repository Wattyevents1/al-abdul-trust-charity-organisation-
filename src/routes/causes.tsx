import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { causes } from "@/data/causes";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/causes")({
  head: () => ({
    meta: [
      { title: "Causes & Donate — Al-Abdul Trust Charity Organisation" },
      { name: "description", content: "Support food, education, healthcare, water, women, and community programs across Africa." },
      { property: "og:title", content: "Donate to Al-Abdul Trust" },
      { property: "og:description", content: "Pick a cause and make a difference today." },
    ],
  }),
  component: CausesPage,
});

const presets = [25, 50, 100, 250];

function CausesPage() {
  const [amount, setAmount] = useState(50);
  const [recurring, setRecurring] = useState(false);
  const [currency, setCurrency] = useState("USD");

  return (
    <SiteLayout>
      <PageHero eyebrow="Our projects" title="Where your support changes lives" subtitle="Nine focused programmes — from clean water and orphan care to mosques, schools and emergency relief. Every donation is tracked and reported." />

      <section className="py-20">
        <div className="container-narrow grid lg:grid-cols-3 gap-10">
          {/* Donation form */}
          <aside className="lg:sticky lg:top-28 self-start">
            <Card className="p-7 shadow-[var(--shadow-elegant)]">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-warm fill-warm" />
                <h3 className="font-display text-2xl font-bold text-primary">Make a donation</h3>
              </div>
              <div className="mt-5 inline-flex rounded-full bg-secondary p-1 text-sm">
                <button onClick={() => setRecurring(false)} className={`px-4 py-1.5 rounded-full transition ${!recurring ? "bg-white shadow text-primary" : "text-muted-foreground"}`}>One-time</button>
                <button onClick={() => setRecurring(true)} className={`px-4 py-1.5 rounded-full transition ${recurring ? "bg-white shadow text-primary" : "text-muted-foreground"}`}>Monthly</button>
              </div>
              <div className="mt-5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {["USD", "EUR", "GBP", "KES", "NGN"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-2">
                {presets.map(p => (
                  <button key={p} onClick={() => setAmount(p)} className={`rounded-lg border py-2 text-sm font-semibold transition ${amount === p ? "border-warm bg-warm text-white" : "border-border hover:border-warm"}`}>{p}</button>
                ))}
              </div>
              <div className="mt-3">
                <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="text-lg font-semibold" />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {currency} {amount} {recurring ? "/ month" : ""} · provides {Math.round(amount / 5)} meals or {Math.round(amount / 25)} school days.
              </p>
              <Button className="mt-5 w-full rounded-full h-12 text-base shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}>
                Donate {currency} {amount}{recurring ? "/mo" : ""}
              </Button>
              <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-center text-muted-foreground">
                <span className="rounded border border-border py-1.5">Stripe</span>
                <span className="rounded border border-border py-1.5">PayPal</span>
                <span className="rounded border border-border py-1.5">M-Pesa</span>
              </div>
              <p className="mt-3 text-[11px] text-center text-muted-foreground">Secure 256-bit SSL · Tax-deductible receipt emailed</p>
            </Card>
          </aside>

          {/* Causes list */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {causes.map(c => {
              const pct = Math.round((c.raised / c.goal) * 100);
              return (
                <Card key={c.slug} className="overflow-hidden p-0 hover:shadow-[var(--shadow-elegant)] transition group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-primary">{c.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-primary">{c.title}</h3>
                    <p className="mt-2 text-sm font-medium text-foreground/80">{c.description}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{c.details}</p>
                    <Progress value={pct} className="mt-4 h-2" />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span><strong className="text-primary">${c.raised.toLocaleString()}</strong> raised</span>
                      <span>{pct}% of ${c.goal.toLocaleString()}</span>
                    </div>
                    <Button asChild className="mt-4 w-full rounded-full" style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}>
                      <Link to="/causes">Donate</Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
