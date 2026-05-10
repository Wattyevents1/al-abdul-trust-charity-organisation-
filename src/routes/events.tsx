import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Hope Africa Foundation" },
      { name: "description", content: "Charity galas, fundraisers, awareness walks and community days you can join." },
      { property: "og:title", content: "Hope Africa Events" },
      { property: "og:description", content: "Find an event near you." },
    ],
  }),
  component: EventsPage,
});

const events = [
  { title: "Annual Hope Gala 2026", date: "2026-06-12T19:00:00Z", city: "Nairobi, Kenya", desc: "Black-tie gala raising funds for clean water programs." },
  { title: "Run for Education 5K", date: "2026-05-22T07:00:00Z", city: "London, UK", desc: "Community run supporting girls' scholarships." },
  { title: "Community Health Day", date: "2026-05-30T08:00:00Z", city: "Lagos, Nigeria", desc: "Free clinics, vaccinations and family wellness." },
  { title: "Volunteer Summit", date: "2026-09-10T09:00:00Z", city: "Accra, Ghana", desc: "Three days of training and connection for our global team." },
];

function Countdown({ iso }: { iso: string }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const diff = Math.max(0, new Date(iso).getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      {[["d", d], ["h", h], ["m", m], ["s", s]].map(([l, v]) => (
        <div key={l as string} className="rounded-lg bg-primary/5 py-2">
          <div className="font-display text-xl font-bold text-primary">{String(v).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase text-muted-foreground">{l}</div>
        </div>
      ))}
    </div>
  );
}

function EventsPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Upcoming events" title="Show up. Stand together." subtitle="From galas to community walks, your presence makes the mission real." />
      <section className="py-20">
        <div className="container-narrow grid md:grid-cols-2 gap-6">
          {events.map(e => (
            <Card key={e.title} className="p-7 hover:shadow-[var(--shadow-elegant)] transition">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-primary">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
                </div>
                <span className="rounded-full bg-warm/10 text-warm text-xs font-semibold px-3 py-1">Open</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4 text-warm" />{new Date(e.date).toLocaleDateString(undefined, {dateStyle: "medium"})}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4 text-warm" />{new Date(e.date).toLocaleTimeString(undefined, {timeStyle: "short"})}</div>
                <div className="flex items-center gap-2 text-muted-foreground col-span-2"><MapPin className="h-4 w-4 text-warm" />{e.city}</div>
              </div>
              <div className="mt-5"><Countdown iso={e.date} /></div>
              <Button className="mt-5 w-full rounded-full" style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}>Register</Button>
            </Card>
          ))}
        </div>
        <div className="container-narrow mt-12">
          <div className="rounded-2xl overflow-hidden border border-border h-72 bg-muted">
            <iframe title="Map" className="w-full h-full" src="https://maps.google.com/maps?q=Nairobi&output=embed" loading="lazy" />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
