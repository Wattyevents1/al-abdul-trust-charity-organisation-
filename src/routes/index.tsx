import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-children.jpg";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/site/Counter";
import { causes } from "@/data/causes";
import { ArrowRight, Heart, Users, Utensils, Globe, Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al-Abdul Trust Charity Organisation — Changing Lives Through Compassion" },
      { name: "description", content: "Join Al-Abdul Trust Charity Organisation in delivering food, education, healthcare and clean water across Africa. Donate or volunteer today." },
      { property: "og:title", content: "Al-Abdul Trust Charity Organisation" },
      { property: "og:description", content: "Changing lives through compassion and action." },
    ],
  }),
  component: HomePage,
});

const stats = [
  { icon: Heart, label: "Children helped", value: 124500, suffix: "+" },
  { icon: Utensils, label: "Meals distributed", value: 2300000, suffix: "+" },
  { icon: Globe, label: "Communities reached", value: 380, suffix: "" },
  { icon: Users, label: "Volunteers worldwide", value: 6200, suffix: "" },
];

const testimonials = [
  { name: "Amara Okonkwo", role: "Mother, Lagos", quote: "Al-Abdul Trust rebuilt our school after the floods. My children have hope again.", rating: 5 },
  { name: "James Mwangi", role: "Teacher, Nairobi", quote: "The clean water project changed our entire village. Sickness has dropped dramatically.", rating: 5 },
  { name: "Fatima Diallo", role: "Volunteer, Dakar", quote: "Volunteering here showed me the power of small acts done with great love.", rating: 5 },
];

const partners = ["UNICEF", "Red Cross", "WHO", "Oxfam", "USAID", "Save the Children", "World Vision", "Care"];

const news = [
  { title: "300th well opened in Kakuma region", date: "Mar 2026", excerpt: "A new well brings clean water to 4,000 people in northern Kenya." },
  { title: "Annual gala raises $1.2M for education", date: "Feb 2026", excerpt: "Generous donors funded scholarships for 2,500 girls across 6 countries." },
  { title: "Emergency response in Sudan", date: "Jan 2026", excerpt: "Mobile clinics and food convoys reach displaced families." },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative -mt-20 min-h-[92vh] flex items-center overflow-hidden">
        <img src={heroImg} alt="Children smiling at sunset" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
        <div className="container-narrow relative z-10 pt-24 pb-16 text-white">
          <div className="max-w-3xl" style={{ animation: "var(--animate-fade-up)" }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.25em] border border-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Humanitarian NGO • Since 2009
            </span>
            <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-[1.05]">
              Changing Lives Through{" "}
              <span className="text-gradient-warm">Compassion</span> and Action
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl">
              We deliver food, education, healthcare and clean water to communities across Africa — and we'd love your help to reach the next thousand families.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 h-13 text-base shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}>
                <Link to="/causes">Donate Now <Heart className="ml-1 h-4 w-4 fill-current" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-13 text-base bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white hover:text-primary">
                <Link to="/volunteer">Become a Volunteer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-secondary/40">
        <div className="container-narrow">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-warm)" }}>
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <div className="font-display text-4xl md:text-5xl font-bold text-primary">
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAUSES */}
      <section className="py-24">
        <div className="container-narrow">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-warm font-semibold">Featured causes</p>
              <h2 className="mt-2 text-4xl md:text-5xl font-bold text-primary max-w-xl">Where your donation makes a real difference</h2>
            </div>
            <Button asChild variant="link" className="text-primary">
              <Link to="/causes">View all causes <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {causes.slice(0, 6).map((c) => {
              const pct = Math.round((c.raised / c.goal) * 100);
              return (
                <Card key={c.slug} className="group overflow-hidden p-0 border-border/60 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary">{c.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-primary mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{c.description}</p>
                    <Progress value={pct} className="h-2" />
                    <div className="mt-3 flex justify-between text-sm">
                      <span className="font-semibold text-primary">${c.raised.toLocaleString()} raised</span>
                      <span className="text-muted-foreground">Goal ${c.goal.toLocaleString()}</span>
                    </div>
                    <Button asChild className="mt-5 w-full rounded-full" style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}>
                      <Link to="/causes">Donate</Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-narrow text-white">
          <p className="text-center text-sm uppercase tracking-[0.25em] text-gold font-semibold">Voices of hope</p>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold text-center max-w-3xl mx-auto">Stories from the communities we serve</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="glass border border-white/15 rounded-2xl p-7 text-white">
                <Quote className="h-8 w-8 text-gold mb-4" />
                <p className="text-white/90 leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-white/60">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-16 border-y border-border bg-background overflow-hidden">
        <div className="container-narrow">
          <p className="text-center text-sm uppercase tracking-[0.25em] text-muted-foreground mb-8">Trusted by leading organizations</p>
          <div className="relative overflow-hidden">
            <div className="flex gap-12 whitespace-nowrap" style={{ animation: "var(--animate-marquee)" }}>
              {[...partners, ...partners].map((p, i) => (
                <span key={i} className="font-display text-2xl text-muted-foreground/70 tracking-wider">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="py-24">
        <div className="container-narrow">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-warm font-semibold">Latest news</p>
              <h2 className="mt-2 text-4xl font-bold text-primary">Stories &amp; updates</h2>
            </div>
            <Button asChild variant="link"><Link to="/blog">All news <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((n) => (
              <Card key={n.title} className="p-6 hover:shadow-[var(--shadow-soft)] transition">
                <p className="text-xs uppercase tracking-wider text-warm font-semibold">{n.date}</p>
                <h3 className="mt-2 font-display text-xl text-primary">{n.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{n.excerpt}</p>
                <Link to="/blog" className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-warm">Read more <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="pb-24">
        <div className="container-narrow">
          <div className="rounded-3xl p-10 md:p-16 text-white text-center" style={{ background: "var(--gradient-hero)" }}>
            <h2 className="text-3xl md:text-4xl font-bold">Be part of the journey</h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">Get monthly stories, project updates, and ways to help — straight to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="your@email.com" className="bg-white/10 border-white/30 text-white placeholder:text-white/60" />
              <Button type="submit" className="rounded-full px-6" style={{ background: "var(--gold)", color: "var(--gold-foreground)" }}>Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
