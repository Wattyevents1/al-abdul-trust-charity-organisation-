import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { causes } from "@/data/causes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";

export const Route = createFileRoute("/causes/$slug")({
  loader: ({ params }) => {
    const cause = causes.find((c) => c.slug === params.slug);
    if (!cause) throw notFound();
    return { cause };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cause.title} — Al-Abdul Trust Charity Organisation` },
          { name: "description", content: loaderData.cause.description.slice(0, 160) },
          { property: "og:title", content: loaderData.cause.title },
          { property: "og:description", content: loaderData.cause.description.slice(0, 160) },
          { property: "og:image", content: loaderData.cause.image },
          { name: "twitter:image", content: loaderData.cause.image },
        ]
      : [],
  }),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <SiteLayout>
        <div className="container-narrow py-32 text-center">
          <h1 className="font-display text-3xl font-bold text-primary">Something went wrong</h1>
          <p className="mt-2 text-muted-foreground">{error.message}</p>
          <Button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-full">Try again</Button>
        </div>
      </SiteLayout>
    );
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-narrow py-32 text-center">
        <h1 className="font-display text-3xl font-bold text-primary">Project not found</h1>
        <p className="mt-2 text-muted-foreground">The project you're looking for doesn't exist.</p>
        <Button asChild className="mt-6 rounded-full"><Link to="/causes">Back to projects</Link></Button>
      </div>
    </SiteLayout>
  ),
  component: CauseDetailPage,
});

function CauseDetailPage() {
  const { cause } = Route.useLoaderData();
  const related = causes.filter((c) => c.slug !== cause.slug).slice(0, 3);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative -mt-20 pt-32 pb-16 overflow-hidden">
        <img src={cause.image} alt={cause.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/85" />
        <div className="relative container-narrow text-white">
          <Link to="/causes" className="inline-flex items-center gap-2 text-sm opacity-90 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <span className="mt-6 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            {cause.category}
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">{cause.title}</h1>
          <p className="mt-5 max-w-3xl text-white/90 text-lg leading-relaxed">{cause.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-full h-12 px-7 text-base shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}>
              <Link to="/causes">
                <Heart className="h-4 w-4 mr-2" /> Donate to this project
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full h-12 px-7 text-base bg-white/10 text-white border-white/30 hover:bg-white/20">
              <Link to="/volunteer">Volunteer with us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact highlights */}
      <section className="py-16 bg-secondary/30">
        <div className="container-narrow">
          <div className="flex items-center gap-2 text-warm">
            <Sparkles className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.18em] font-semibold">Impact Highlights</span>
          </div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-primary">The difference we're making</h2>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cause.highlights.map((h) => (
              <Card key={h.label} className="p-6 text-center hover:shadow-[var(--shadow-elegant)] transition">
                <div className="font-display text-3xl md:text-4xl font-bold text-warm">{h.stat}</div>
                <div className="mt-2 text-sm text-muted-foreground">{h.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container-narrow">
          <span className="text-xs uppercase tracking-[0.18em] font-semibold text-warm">Project Gallery</span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-primary">Moments from the field</h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {cause.gallery.map((src, i) => (
              <div key={i} className={`relative overflow-hidden rounded-xl group ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}>
                <img src={src} alt={`${cause.title} gallery ${i + 1}`} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-secondary/30">
        <div className="container-narrow max-w-3xl">
          <span className="text-xs uppercase tracking-[0.18em] font-semibold text-warm">Frequently Asked</span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-primary">Questions about this project</h2>
          <Accordion type="single" collapsible className="mt-8">
            {cause.faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-primary">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related */}
      <section className="py-16">
        <div className="container-narrow">
          <h2 className="font-display text-3xl font-bold text-primary">Explore more projects</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Card key={r.slug} className="overflow-hidden p-0 hover:shadow-[var(--shadow-elegant)] transition group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={r.image} alt={r.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-primary">{r.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{r.category}</p>
                  <Button asChild variant="outline" className="mt-4 w-full rounded-full">
                    <Link to="/causes/$slug" params={{ slug: r.slug }}>Learn more</Link>
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
