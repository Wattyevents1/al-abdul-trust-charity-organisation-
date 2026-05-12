import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Counter } from "@/components/site/Counter";
import { Card } from "@/components/ui/card";
import { Compass, Eye, Heart, Award, Linkedin, Twitter } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Al-Abdul Trust Charity Organisation" },
      { name: "description", content: "Our story, mission and the people behind Al-Abdul Trust Charity Organisation." },
      { property: "og:title", content: "About Al-Abdul Trust Charity Organisation" },
      { property: "og:description", content: "A movement of compassion since 2009." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Heart, title: "Compassion", text: "Every life we touch is treated with dignity and love." },
  { icon: Eye, title: "Transparency", text: "Audited finances, public reports, full accountability." },
  { icon: Compass, title: "Sustainability", text: "We build solutions that empower communities long-term." },
  { icon: Award, title: "Excellence", text: "World-class standards in every program we deliver." },
];

const team = [
  { name: "Dr. Aisha Bello", role: "Founder & CEO" },
  { name: "Samuel Otieno", role: "Director of Programs" },
  { name: "Maria Sanchez", role: "Head of Partnerships" },
  { name: "Kwame Asante", role: "Field Operations Lead" },
];

const milestones = [
  { year: "2009", title: "Foundation born", text: "Started with a single school feeding program in Lagos." },
  { year: "2013", title: "First clinic", text: "Opened our first mobile health clinic in rural Kenya." },
  { year: "2017", title: "100 villages", text: "Reached 100 communities across 6 African countries." },
  { year: "2021", title: "Clean water scale", text: "Built 250 wells, serving over 800,000 people." },
  { year: "2025", title: "Global movement", text: "6,200+ volunteers worldwide, $40M+ raised for impact." },
];

function About() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Our Story" title="A movement built on compassion" subtitle="Since 2009 we've walked alongside communities across Africa, listening, building, and serving." />

      <section className="py-24">
        <div className="container-narrow grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary">From a single meal to a movement</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Al-Abdul Trust Charity Organisation began with one mother handing out meals after school in a Lagos suburb. Sixteen years later we operate in 14 countries — but our principle hasn't changed: meet people where they are, with what they need, and treat them like family.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We focus on six pillars: food security, education, healthcare, clean water, women's empowerment, and emergency relief. Every dollar is tracked. Every program is co-designed with the communities we serve.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{n: 124500, l: "Children helped"}, {n: 380, l: "Communities"}, {n: 14, l: "Countries"}, {n: 16, l: "Years of impact"}].map(s => (
              <Card key={s.l} className="p-6 text-center">
                <div className="font-display text-3xl font-bold text-warm"><Counter end={s.n} suffix={s.n > 1000 ? "+" : ""} /></div>
                <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/40">
        <div className="container-narrow">
          <h2 className="text-4xl font-bold text-center text-primary">Our values</h2>
          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {values.map(v => (
              <Card key={v.title} className="p-7 text-center hover:shadow-[var(--shadow-soft)] transition">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ background: "var(--gradient-warm)" }}>
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-narrow grid md:grid-cols-3 gap-10 items-center">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-warm)" }}>
            <div className="h-full w-full grid place-items-center text-white font-display text-7xl">AB</div>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm uppercase tracking-[0.25em] text-warm font-semibold">Founder's message</p>
            <h2 className="mt-2 text-4xl font-bold text-primary">"Compassion is the bridge between despair and possibility."</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              When I started Al-Abdul Trust, I had no plan, no funding — just a refusal to look away. Today, when I see a child confidently reading her first book or a mother starting her own business, I'm reminded that change is built one person at a time. Thank you for walking with us.
            </p>
            <p className="mt-4 font-display text-lg text-primary">— Dr. Aisha Bello, Founder &amp; CEO</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/40">
        <div className="container-narrow">
          <h2 className="text-4xl font-bold text-center text-primary">Meet the team</h2>
          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(m => (
              <Card key={m.name} className="overflow-hidden p-0 group">
                <div className="aspect-square" style={{ background: `linear-gradient(135deg, var(--primary), var(--warm))` }}>
                  <div className="h-full w-full grid place-items-center text-white font-display text-4xl opacity-80">{m.name.split(" ").map(s=>s[0]).slice(0,2).join("")}</div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-display text-lg font-bold text-primary">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                  <div className="mt-3 flex justify-center gap-2">
                    <a href="#" className="h-8 w-8 rounded-full bg-secondary grid place-items-center hover:bg-warm hover:text-white transition"><Linkedin className="h-4 w-4" /></a>
                    <a href="#" className="h-8 w-8 rounded-full bg-secondary grid place-items-center hover:bg-warm hover:text-white transition"><Twitter className="h-4 w-4" /></a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-narrow">
          <h2 className="text-4xl font-bold text-center text-primary">Our journey</h2>
          <div className="mt-14 relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
            {milestones.map((m, i) => (
              <div key={m.year} className={`relative mb-10 md:grid md:grid-cols-2 md:gap-10 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}>
                <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                  <div className="font-display text-3xl font-bold text-warm">{m.year}</div>
                  <h3 className="mt-1 font-display text-xl text-primary">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
                </div>
                <div className="hidden md:block" />
                <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-warm ring-4 ring-background" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
