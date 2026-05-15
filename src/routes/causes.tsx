import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { causes, CURRENCY_SYMBOL, type Cause, type PriceTier } from "@/data/causes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Mail } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/causes")({
  head: () => ({
    meta: [
      { title: "Projects & Donate — Al-Abdul Trust Charity Organisation" },
      { name: "description", content: "Support water wells, orphan care, Iftar, Qurban, mosques, schools, Quran distribution, tree planting, Zakat and urgent appeals." },
      { property: "og:title", content: "Donate to Al-Abdul Trust" },
      { property: "og:description", content: "Choose a project — your gift becomes ongoing Sadaqah." },
    ],
  }),
  component: CausesPage,
});

function tierAmount(tier: PriceTier): number {
  return tier.amount ?? 0;
}

function CausesPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>(causes[0].slug);
  const selected: Cause = useMemo(
    () => causes.find((c) => c.slug === selectedSlug) ?? causes[0],
    [selectedSlug]
  );
  const fixedTiers = selected.tiers.filter((t) => t.amount !== null);
  const isOpenAmount = fixedTiers.length === 0;

  const [tierIndex, setTierIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customAmount, setCustomAmount] = useState<number>(50);

  const activeTier = fixedTiers[tierIndex];
  const total = isOpenAmount
    ? customAmount
    : tierAmount(activeTier) * Math.max(1, quantity);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our projects"
        title="Where your support changes lives"
        subtitle="Eleven focused projects — clean water, orphan care, Iftar, Qurban, mosques, schools, Qur'an distribution, tree planting, Zakat and urgent appeals. Every donation is tracked and reported."
      />

      <section className="py-20">
        <div className="container-narrow grid lg:grid-cols-3 gap-10">
          {/* Donation form */}
          <aside className="lg:sticky lg:top-28 self-start">
            <Card className="p-7 shadow-[var(--shadow-elegant)]">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-warm fill-warm" />
                <h3 className="font-display text-2xl font-bold text-primary">Make a donation</h3>
              </div>

              <div className="mt-5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Project</label>
                <select
                  value={selectedSlug}
                  onChange={(e) => {
                    setSelectedSlug(e.target.value);
                    setTierIndex(0);
                    setQuantity(1);
                  }}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {causes.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {!isOpenAmount ? (
                <>
                  <div className="mt-5">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Option</label>
                    <div className="mt-2 grid gap-2">
                      {fixedTiers.map((t, i) => (
                        <button
                          key={t.label}
                          onClick={() => setTierIndex(i)}
                          className={`flex justify-between items-center rounded-lg border px-3 py-2.5 text-sm text-left transition ${
                            tierIndex === i
                              ? "border-warm bg-warm/10 text-primary font-semibold"
                              : "border-border hover:border-warm/60"
                          }`}
                        >
                          <span>{t.label}</span>
                          <span className="font-semibold">
                            {CURRENCY_SYMBOL}
                            {t.amount}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Quantity</label>
                    <Input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                      className="mt-1 text-lg font-semibold"
                    />
                  </div>
                </>
              ) : (
                <div className="mt-5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Amount ({CURRENCY_SYMBOL})</label>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {[25, 50, 100, 250].map((p) => (
                      <button
                        key={p}
                        onClick={() => setCustomAmount(p)}
                        className={`rounded-lg border py-2 text-sm font-semibold transition ${
                          customAmount === p ? "border-warm bg-warm text-white" : "border-border hover:border-warm"
                        }`}
                      >
                        {CURRENCY_SYMBOL}
                        {p}
                      </button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    min={1}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(Math.max(1, Number(e.target.value) || 1))}
                    className="mt-3 text-lg font-semibold"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">{selected.tiers[0].label}</p>
                </div>
              )}

              <div className="mt-5 rounded-lg bg-secondary/60 px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-2xl font-bold text-primary">
                  {CURRENCY_SYMBOL}
                  {total.toLocaleString()}
                </span>
              </div>

              <Button
                className="mt-5 w-full rounded-full h-12 text-base shadow-[var(--shadow-glow)]"
                style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}
              >
                Donate {CURRENCY_SYMBOL}
                {total.toLocaleString()}
              </Button>

              {selected.tiers.some((t) => t.amount === null) && (
                <Button asChild variant="outline" className="mt-3 w-full rounded-full">
                  <Link to="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact us for a tailored proposal
                  </Link>
                </Button>
              )}

              <p className="mt-3 text-[11px] text-center text-muted-foreground">
                Secure payment · Receipt emailed automatically
              </p>
            </Card>
          </aside>

          {/* Causes list */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {causes.map((c) => (
              <Card
                key={c.slug}
                className={`overflow-hidden p-0 transition group cursor-pointer ${
                  selectedSlug === c.slug ? "ring-2 ring-warm shadow-[var(--shadow-elegant)]" : "hover:shadow-[var(--shadow-elegant)]"
                }`}
                onClick={() => {
                  setSelectedSlug(c.slug);
                  setTierIndex(0);
                  setQuantity(1);
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-primary">
                    {c.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-primary">{c.title}</h3>
                  <p className="mt-2 text-sm font-medium text-foreground/80">{c.description}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.details}</p>

                  <div className="mt-4 space-y-1.5">
                    {c.tiers.map((t) => (
                      <div
                        key={t.label}
                        className="flex justify-between items-center text-sm border-t border-border pt-1.5"
                      >
                        <span className="text-muted-foreground">{t.label}</span>
                        <span className="font-semibold text-primary whitespace-nowrap ml-3">
                          {t.amount !== null ? `${CURRENCY_SYMBOL}${t.amount}` : "On request"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="mt-4 w-full rounded-full"
                    style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSlug(c.slug);
                      setTierIndex(0);
                      setQuantity(1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Donate to this project
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
