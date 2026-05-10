import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingDonate } from "./FloatingDonate";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <FloatingDonate />
    </div>
  );
}
