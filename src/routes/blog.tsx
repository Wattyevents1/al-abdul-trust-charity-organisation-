import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import food from "@/assets/cause-food.jpg";
import edu from "@/assets/cause-education.jpg";
import med from "@/assets/cause-medical.jpg";
import wat from "@/assets/cause-water.jpg";
import wom from "@/assets/cause-women.jpg";
import com from "@/assets/cause-community.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & News — Hope Africa Foundation" },
      { name: "description", content: "Stories from the field, project updates, and reflections on humanitarian work." },
      { property: "og:title", content: "Hope Africa Blog" },
      { property: "og:description", content: "Voices from the communities we serve." },
    ],
  }),
  component: Blog,
});

const posts = [
  { id: 1, title: "How a single well changed Loiyangalani forever", category: "Water", img: wat, date: "Mar 12, 2026", excerpt: "When Hope Africa drilled its 300th well last month, it didn't just bring water — it rewrote a generation's future." },
  { id: 2, title: "Inside our girls' scholarship program", category: "Education", img: edu, date: "Mar 04, 2026", excerpt: "2,500 girls are now in school thanks to donors like you. Here's what's next." },
  { id: 3, title: "Field notes: Mobile clinics in Sudan", category: "Healthcare", img: med, date: "Feb 26, 2026", excerpt: "A week with our medical team responding to displaced families in the Darfur corridor." },
  { id: 4, title: "Women who started 100 businesses", category: "Empowerment", img: wom, date: "Feb 18, 2026", excerpt: "How microloans of just $200 are creating ripple effects across rural Senegal." },
  { id: 5, title: "Feeding 12,000 families this winter", category: "Food", img: food, date: "Feb 02, 2026", excerpt: "Our largest food distribution to date, made possible by 4,000 volunteers." },
  { id: 6, title: "Building together: a village's story", category: "Community", img: com, date: "Jan 21, 2026", excerpt: "A new community center opened in Mwanza — designed and built by neighbors." },
];

const categories = ["All", "Water", "Education", "Healthcare", "Empowerment", "Food", "Community"];

function Blog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = posts.filter(p => (cat === "All" || p.category === cat) && p.title.toLowerCase().includes(q.toLowerCase()));
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <SiteLayout>
      <PageHero eyebrow="Stories & insights" title="Voices from the field" subtitle="Real stories, real impact, written by the people doing the work." />
      <section className="py-20">
        <div className="container-narrow">
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search articles..." className="pl-9" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-warm hover:text-white"}`}>{c}</button>
              ))}
            </div>
          </div>

          {featured && (
            <Card className="overflow-hidden p-0 mb-10 grid md:grid-cols-2 group">
              <div className="aspect-video md:aspect-auto overflow-hidden">
                <img src={featured.img} alt={featured.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-wider text-warm font-semibold">{featured.category} · Featured</span>
                <h2 className="mt-3 font-display text-3xl font-bold text-primary">{featured.title}</h2>
                <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{featured.date}</span>
                  <a href="#" className="inline-flex items-center text-sm font-semibold text-warm">Read story <ArrowRight className="ml-1 h-4 w-4" /></a>
                </div>
              </div>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(p => (
              <Card key={p.id} className="overflow-hidden p-0 group hover:shadow-[var(--shadow-soft)] transition">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <span className="text-xs uppercase tracking-wider text-warm font-semibold">{p.category}</span>
                  <h3 className="mt-2 font-display text-lg font-bold text-primary">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{p.date}</span>
                    <a href="#" className="font-semibold text-primary hover:text-warm">Read →</a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
