import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Quote } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer — Al-Abdul Trust Charity Organisation" },
      { name: "description", content: "Join our global network of 6,200+ volunteers and help change lives across Africa." },
      { property: "og:title", content: "Volunteer with Al-Abdul Trust" },
      { property: "og:description", content: "Give your time. Change a life." },
    ],
  }),
  component: VolunteerPage,
});

const skills = ["Teaching", "Medical", "Engineering", "Marketing", "Tech / IT", "Translation", "Logistics", "Fundraising"];
const faqs = [
  { q: "Do I need experience?", a: "Not at all. We have roles for every skill set and every level of experience." },
  { q: "Can I volunteer remotely?", a: "Yes — many of our roles in design, translation, mentoring and fundraising are fully remote." },
  { q: "Is there a minimum commitment?", a: "We ask for at least 4 hours per month so we can plan effectively, but flexibility is the norm." },
  { q: "Are travel costs covered?", a: "For field placements over 4 weeks we cover travel, accommodation and a daily stipend." },
];

function VolunteerPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (s: string) => setSelected((p) => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  return (
    <SiteLayout>
      <PageHero eyebrow="Join the movement" title="Become a volunteer" subtitle="Bring your skills, your time and your heart. We'll bring the mission." />

      <section className="py-20">
        <div className="container-narrow grid lg:grid-cols-2 gap-10">
          <Card className="p-8 shadow-[var(--shadow-soft)]">
            <h2 className="font-display text-2xl font-bold text-primary">Sign up to volunteer</h2>
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Thank you! We'll be in touch within 48 hours."); }} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>First name</Label><Input required className="mt-1" /></div>
                <div><Label>Last name</Label><Input required className="mt-1" /></div>
              </div>
              <div><Label>Email</Label><Input type="email" required className="mt-1" /></div>
              <div><Label>Country</Label><Input required className="mt-1" /></div>
              <div>
                <Label>Skills &amp; interests</Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {skills.map(s => (
                    <label key={s} className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm cursor-pointer hover:border-warm">
                      <Checkbox checked={selected.includes(s)} onCheckedChange={() => toggle(s)} />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
              <div><Label>Why do you want to volunteer?</Label><Textarea rows={4} className="mt-1" /></div>
              <Button type="submit" className="w-full h-11 rounded-full" style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}>Submit application</Button>
            </form>
          </Card>

          <div className="space-y-8">
            <Card className="p-7 bg-secondary/30 border-warm/30">
              <Quote className="h-8 w-8 text-warm" />
              <p className="mt-3 text-lg text-foreground/90 italic">"Volunteering with Al-Abdul Trust was the most meaningful month of my life. I came to teach English; I left with a new family."</p>
              <p className="mt-3 font-semibold text-primary">— Lucia, volunteer from Spain</p>
            </Card>
            <Card className="p-7">
              <h3 className="font-display text-xl font-bold text-primary mb-3">Frequently asked</h3>
              <Accordion type="single" collapsible>
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`f${i}`}>
                    <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
