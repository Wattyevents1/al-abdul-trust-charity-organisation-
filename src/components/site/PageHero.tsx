export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 20% 30%, var(--gold) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--warm) 0%, transparent 40%)"
      }} />
      <div className="container-narrow relative text-center text-white" style={{ animation: "var(--animate-fade-up)" }}>
        {eyebrow && <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">{eyebrow}</p>}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-lg text-white/80 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </section>
  );
}
