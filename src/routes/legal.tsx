import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Card } from "@/components/ui/card";
import { Shield, FileText, Scale, Globe, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal & Registration — Al-Abdul Trust CHARITY ORGANISATION" },
      { name: "description", content: "Official registration and legal information for Al-Abdul Trust CHARITY ORGANISATION, a registered charity in Uganda." },
      { property: "og:title", content: "Legal & Registration — Al-Abdul Trust CHARITY ORGANISATION" },
      { property: "og:description", content: "Official registration and legal information for Al-Abdul Trust CHARITY ORGANISATION, a registered charity in Uganda." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Legal,
});

const registrationDetails = [
  { label: "Legal name", value: "Al-Abdul Trust CHARITY ORGANISATION" },
  { label: "Country of registration", value: "Republic of Uganda" },
  { label: "Charity registration number", value: "NCD/122/2026" },
  { label: "Legal status", value: "Registered non-profit charity organisation" },
  { label: "Primary operations", value: "Uganda" },
];

const governancePoints = [
  "Governed by a board of trustees and operated in accordance with Ugandan law.",
  "Financial records are maintained transparently and reviewed regularly.",
  "All donations are applied solely toward charitable programs and operational needs.",
  "We comply with applicable data-protection and fundraising regulations.",
  "Annual reports and impact statements are made available to donors and regulators upon request.",
];

function Legal() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Transparency & trust"
        title="Legal & Registration"
        subtitle="Official registration details and legal standing of Al-Abdul Trust CHARITY ORGANISATION."
      />

      <section className="py-20">
        <div className="container-narrow grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium" style={{ background: "var(--gold)", color: "var(--gold-foreground)" }}>
              <Shield className="h-4 w-4" />
              Registered Charity Uganda
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">A registered charity you can trust</h2>
            <p className="text-muted-foreground leading-relaxed">
              Al-Abdul Trust CHARITY ORGANISATION is a Ugandan-based humanitarian charity legally registered under the laws of the Republic of Uganda. Our registration number is <strong className="text-foreground">NCD/122/2026</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We were founded to serve vulnerable communities across Uganda through education, healthcare, food relief, clean water, orphan care, women empowerment, and faith-based community development. Every program is designed to protect dignity, restore hope, and create lasting change.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to full transparency, ethical stewardship of resources, and accountability to our donors, beneficiaries, and regulatory authorities.
            </p>
          </div>

          <Card className="p-8 border-l-4" style={{ borderLeftColor: "var(--gold)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white" style={{ background: "var(--gradient-warm)" }}>
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary">Registration details</h3>
            </div>
            <dl className="space-y-4">
              {registrationDetails.map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:justify-between gap-1 pb-4 border-b border-border last:border-0 last:pb-0">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="font-semibold text-primary text-right sm:max-w-xs">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Governance & accountability</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {governancePoints.map((point, i) => (
              <Card key={i} className="p-6 flex items-start gap-4">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: "var(--green)" }}>
                  <CheckCircle className="h-4 w-4" />
                </div>
                <p className="text-muted-foreground leading-relaxed">{point}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-narrow max-w-3xl text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full mb-6" style={{ background: "var(--gradient-warm)" }}>
            <Scale className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Questions about our legal status?</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            For official verification, partnership due diligence, or regulatory inquiries, please contact us directly. We are happy to provide our registration documents and answer any questions.
          </p>
          <a
            href="mailto:alabdultrustcharityorg@gmail.com"
            className="inline-flex items-center justify-center rounded-full px-8 h-11 text-sm font-medium transition-colors"
            style={{ background: "var(--gradient-warm)", color: "var(--warm-foreground)" }}
          >
            Contact us
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
