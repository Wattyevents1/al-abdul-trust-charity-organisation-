import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Sign in — Al-Abdul Trust" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Check your email if confirmation is required.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <section className="py-24">
        <div className="container-narrow max-w-md">
          <Card className="p-8">
            <h1 className="font-display text-3xl font-bold text-primary text-center">
              {mode === "signin" ? "Admin sign in" : "Create admin account"}
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Access the donations dashboard
            </p>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signin" ? "current-password" : "new-password"} />
              </div>
              <Button type="submit" disabled={loading} className="w-full rounded-full h-11">
                {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
              </Button>
            </form>
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-4 w-full text-sm text-muted-foreground hover:text-primary">
              {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
            </button>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary">← Back to site</Link>
            </p>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}