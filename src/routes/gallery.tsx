import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { useState } from "react";
import { X } from "lucide-react";
import f1 from "@/assets/cause-food.jpg";
import f2 from "@/assets/cause-education.jpg";
import f3 from "@/assets/cause-medical.jpg";
import f4 from "@/assets/cause-water.jpg";
import f5 from "@/assets/cause-women.jpg";
import f6 from "@/assets/cause-community.jpg";
import f7 from "@/assets/cause-orphan.jpg";
import f8 from "@/assets/cause-relief.jpg";
import f9 from "@/assets/hero-children.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Hope Africa Foundation" },
      { name: "description", content: "Photos and stories from our programs across Africa." },
      { property: "og:title", content: "Hope Africa Gallery" },
      { property: "og:description", content: "See the impact, in pictures." },
    ],
  }),
  component: Gallery,
});

const photos = [f9, f1, f2, f3, f4, f5, f6, f7, f8, f9, f2, f4];

function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <SiteLayout>
      <PageHero eyebrow="Moments of impact" title="Gallery" subtitle="A look inside our work — the smiles, the labor, the love." />
      <section className="py-20">
        <div className="container-narrow">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
            {photos.map((src, i) => (
              <button key={i} onClick={() => setOpen(src)} className="block w-full overflow-hidden rounded-xl group">
                <img src={src} alt={`Gallery ${i}`} loading="lazy" className="w-full transition duration-500 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>
      </section>
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur grid place-items-center p-6 animate-in fade-in" onClick={() => setOpen(null)}>
          <button className="absolute top-6 right-6 text-white/80 hover:text-white"><X className="h-7 w-7" /></button>
          <img src={open} className="max-h-[90vh] max-w-[95vw] rounded-xl shadow-2xl" alt="Lightbox" />
        </div>
      )}
    </SiteLayout>
  );
}
