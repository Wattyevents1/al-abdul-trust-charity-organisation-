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
import { useServerFn } from "@tanstack/react-start";
import { initiateDonation } from "@/lib/donations.functions";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/causes")({
  head: () => ({
    meta: [
      { title: "Projects & Donate — Al-Abdul Trust Charity Organisation" },
      { name: "description", content: "Explore our projects: water wells, orphan care, Ramadan iftar, Qurban, mosques, orphanages, schools, Qur'an distribution and urgent relief." },
      { property: "og:title", content: "Our Projects — Al-Abdul Trust" },
      { property: "og:description", content: "Pick a project and make a difference today." },
    ],
  }),
  component: CausesPage,
});

const presets = [25, 50, 100, 250];

function CausesPage() {
  const [amount, setAmount] = useState(50);
  const [recurring, setRecurring] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const initiate = useServerFn(initiateDonation);

  async function onDonate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill in your name, email and phone.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await initiate({
        data: {
          donor_name: name.trim(),
          donor_email: email.trim(),
          donor_phone: phone.trim(),
          amount: Number(amount),
          currency: currency as "USD" | "EUR" | "GBP" | "KES" | "UGX" | "NGN",
          recurring,
        },
      });
      window.location.href = res.redirect_url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not start payment");
      setSubmitting(false);
    }
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Where help meets hope" title="Choose a project to support" subtitle="Every project below is explained in detail. 100% of every donation is tracked and reported — choose where your gift makes the biggest impact." />

      <section className="py-20">
        <div className="container-narrow grid lg:grid-cols-3 gap-10">
          {/* Donation form */}
          <aside className="lg:sticky lg:top-28 self-start">
            <Card className="p-7 shadow-[var(--shadow-elegant)]">
              <form onSubmit={onDonate}>
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
                  {["USD", "EUR", "GBP", "KES", "UGX", "NGN"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-2">
                {presets.map(p => (
                  <button type="button" key={p} onClick={() => setAmount(p)} className={`rounded-lg border py-2 text-sm font-semibold transition ${amount === p ? "border-warm bg-warm text-white" : "border-border hover:border-warm"}`}>{p}</button>
                ))}
              </div>
              <div className="mt-3">
                <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="text-lg font-semibold" />
              </div>
              <div className="mt-5 space-y-3">
                <div>
                  <Label htmlFor="donor-name" className="text-xs uppercase tracking-wider text-muted-foreground">Full name</Label>
                  <Input id="donor-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" autoComplete="name" />
                </div>
                <div>
                  <Label htmlFor="donor-email" className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
                  <Input id="donor-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
                </div>
                <div>
                  <Label htmlFor="donor-phone" className="text-xs uppercase tracking-wider text-muted-foreground">Phone</Label>
                  <Input id="donor-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+256 7XX XXX XXX" autoComplete="tel" />
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {currency} {amount} {recurring ? "/ month" : ""} · provides {Math.round(amount / 5)} meals or {Math.round(amount / 25)} school days.
              </p>
              <Button type="submit" disabled={submitting} className="mt-5 w-full rounded-full h-12 text-base shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}>
                {submitting ? "Redirecting to Pesapal…" : `Donate ${currency} ${amount}${recurring ? "/mo" : ""}`}
              </Button>
              <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-center text-muted-foreground">
                <span className="rounded border border-border py-1.5">Pesapal</span>
                <span className="rounded border border-border py-1.5">Card</span>
                <span className="rounded border border-border py-1.5">M-Pesa</span>
              </div>
              <p className="mt-3 text-[11px] text-center text-muted-foreground">Secure 256-bit SSL · Tax-deductible receipt emailed</p>
              </form>
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
                    <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                    <Progress value={pct} className="mt-4 h-2" />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span><strong className="text-primary">${c.raised.toLocaleString()}</strong> raised</span>
                      <span>{pct}% of ${c.goal.toLocaleString()}</span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Button asChild variant="outline" className="rounded-full">
                        <Link to="/causes/$slug" params={{ slug: c.slug }}>Learn more</Link>
                      </Button>
                      <Button asChild className="rounded-full" style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}>
                        <Link to="/causes">Donate</Link>
                      </Button>
                    </div>
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
