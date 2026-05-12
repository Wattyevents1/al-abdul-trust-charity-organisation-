import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Al-Abdul Trust Charity Organisation" },
      { name: "description", content: "Reach our team for partnerships, press, donations or general questions." },
      { property: "og:title", content: "Contact Al-Abdul Trust" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: Contact,
});

const faqs = [
  { q: "Is my donation tax-deductible?", a: "Yes — we issue a tax receipt by email immediately after every donation." },
  { q: "How do I cancel a recurring donation?", a: "From your donor portal, or just reply to any receipt email and we'll handle it." },
  { q: "Can my company partner with you?", a: "Absolutely. Email partners@hopeafrica.org and we'll set up an intro call." },
  { q: "Do you accept in-kind donations?", a: "Yes, in selected categories. Please contact us first to coordinate logistics." },
];

function Contact() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Get in touch" title="We'd love to hear from you" subtitle="Questions, partnerships, press, or just to say hello." />
      <section className="py-20">
        <div className="container-narrow grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            {[
              { icon: Mail, title: "Email", text: "hello@hopeafrica.org" },
              { icon: Phone, title: "Phone", text: "+254 700 123 456" },
              { icon: MapPin, title: "HQ", text: "Plot 24, Hope Street, Nairobi, Kenya" },
              { icon: MessageCircle, title: "Live chat", text: "Mon–Fri, 9am–6pm EAT" },
            ].map(c => (
              <Card key={c.title} className="p-5 flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: "var(--gradient-warm)" }}>
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.title}</p>
                  <p className="font-semibold text-primary">{c.text}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="lg:col-span-2 p-8">
            <h2 className="font-display text-2xl font-bold text-primary">Send us a message</h2>
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Message received — we'll reply within 24 hours."); }} className="mt-6 grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Name</Label><Input required className="mt-1" /></div>
                <div><Label>Email</Label><Input required type="email" className="mt-1" /></div>
              </div>
              <div><Label>Subject</Label><Input required className="mt-1" /></div>
              <div><Label>Message</Label><Textarea required rows={6} className="mt-1" /></div>
              <Button type="submit" className="w-fit rounded-full px-8 h-11" style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}>Send message</Button>
            </form>
          </Card>
        </div>

        <div className="container-narrow mt-12 grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden border border-border h-80">
            <iframe title="Office map" className="w-full h-full" src="https://maps.google.com/maps?q=Nairobi&output=embed" loading="lazy" />
          </div>
          <Card className="p-8">
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
      </section>
    </SiteLayout>
  );
}
