import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { listDonations, checkAdmin } from "@/lib/donations.functions";
import { Logo } from "@/components/site/Logo";
import { LogOut, RefreshCw, Users, CheckCircle2, Clock, XCircle, DollarSign } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin — Al-Abdul Trust" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const fetchAdmin = useServerFn(checkAdmin);
  const fetchList = useServerFn(listDonations);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth" });
    });
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      try {
        const res = await fetchAdmin();
        if (!res.isAdmin) {
          toast.error("Your account is not an admin. Ask an existing admin to grant access.");
          navigate({ to: "/" });
          return;
        }
        setReady(true);
      } catch {
        navigate({ to: "/auth" });
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate, fetchAdmin]);

  const query = useQuery({
    queryKey: ["admin-donations"],
    queryFn: () => fetchList(),
    enabled: ready,
    refetchInterval: 15_000,
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Checking access…
      </div>
    );
  }

  const totals = query.data?.totals;
  const donations = query.data?.donations || [];

  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="border-b bg-background">
        <div className="container-narrow flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="text-sm font-semibold text-muted-foreground">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm"><Link to="/">View site</Link></Button>
            <Button onClick={() => query.refetch()} variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button onClick={signOut} variant="ghost" size="sm" className="gap-2">
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container-narrow py-10 space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Donations dashboard</h1>
          <p className="text-sm text-muted-foreground">Live Pesapal transactions for Al-Abdul Trust.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<DollarSign className="h-5 w-5" />} label="Total raised" value={totals ? `$${totals.raised.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "—"} />
          <StatCard icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />} label="Completed" value={totals?.completed ?? "—"} />
          <StatCard icon={<Clock className="h-5 w-5 text-warm" />} label="Pending" value={totals?.pending ?? "—"} />
          <StatCard icon={<XCircle className="h-5 w-5 text-destructive" />} label="Failed" value={totals?.failed ?? "—"} />
        </div>

        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold">Recent donations</h2>
            </div>
            <span className="text-xs text-muted-foreground">{donations.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3">When</th>
                  <th className="text-left px-4 py-3">Donor</th>
                  <th className="text-left px-4 py-3">Amount</th>
                  <th className="text-left px-4 py-3">Cause</th>
                  <th className="text-left px-4 py-3">Method</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Reference</th>
                </tr>
              </thead>
              <tbody>
                {query.isLoading && (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Loading…</td></tr>
                )}
                {!query.isLoading && donations.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No donations yet.</td></tr>
                )}
                {donations.map((d: any) => (
                  <tr key={d.id} className="border-t hover:bg-secondary/20">
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(d.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-primary">{d.donor_name}</div>
                      <div className="text-xs text-muted-foreground">{d.donor_email} · {d.donor_phone}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">
                      {d.currency} {Number(d.amount).toLocaleString()}
                      {d.recurring && <span className="ml-1 text-xs text-warm">/mo</span>}
                    </td>
                    <td className="px-4 py-3 text-xs">{d.cause_slug || "—"}</td>
                    <td className="px-4 py-3 text-xs">{d.payment_method || "—"}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                    <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{d.merchant_reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">{icon}{label}</div>
      <div className="mt-2 font-display text-2xl font-bold text-primary">{value}</div>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = (status || "PENDING").toUpperCase();
  if (s === "COMPLETED") return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Completed</Badge>;
  if (s === "FAILED" || s === "INVALID") return <Badge variant="destructive">{s}</Badge>;
  if (s === "REVERSED") return <Badge variant="outline">Reversed</Badge>;
  return <Badge variant="secondary">{s}</Badge>;
}