import { createFileRoute, Link, useRouter, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { refreshDonationStatus } from "@/lib/donations.functions";
import { z } from "zod";

const searchSchema = z.object({
  OrderTrackingId: z.string().optional(),
  OrderMerchantReference: z.string().optional(),
});

export const Route = createFileRoute("/donate/callback")({
  validateSearch: (s) => searchSchema.parse(s),
  component: CallbackPage,
  head: () => ({
    meta: [
      { title: "Donation status — Al-Abdul Trust" },
      { name: "robots", content: "noindex" },
    ],
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
});

function CallbackPage() {
  const { OrderTrackingId, OrderMerchantReference } = Route.useSearch();
  const refresh = useServerFn(refreshDonationStatus);
  const [status, setStatus] = useState<string>("PENDING");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!OrderTrackingId) {
        setLoading(false);
        return;
      }
      try {
        const res = await refresh({ data: { order_tracking_id: OrderTrackingId } });
        if (!cancelled) setStatus((res.status || "PENDING").toUpperCase());
      } catch (e) {
        if (!cancelled) setStatus("UNKNOWN");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [OrderTrackingId, refresh]);

  useEffect(() => {
    if (loading) return;
    if (status === "PENDING") return;
    if (secondsLeft <= 0) {
      navigate({ to: "/" });
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [loading, status, secondsLeft, navigate]);

  const isComplete = status === "COMPLETED";
  const isFailed = status === "FAILED" || status === "INVALID";
  const Icon = isComplete ? CheckCircle2 : isFailed ? XCircle : Clock;
  const color = isComplete ? "text-emerald-600" : isFailed ? "text-destructive" : "text-warm";

  return (
    <SiteLayout>
      <section className="py-24">
        <div className="container-narrow max-w-lg">
          <Card className="p-10 text-center">
            <Icon className={`mx-auto h-14 w-14 ${color}`} />
            <h1 className="mt-4 font-display text-3xl font-bold text-primary">
              {loading ? "Confirming your donation…" : isComplete ? "Thank you!" : isFailed ? "Payment failed" : "Payment pending"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              {isComplete
                ? "Your donation was received. A receipt has been sent to your email."
                : isFailed
                  ? "We couldn't complete your payment. No funds were taken."
                  : "We're waiting for confirmation from the payment provider. This page updates automatically."}
            </p>
            {OrderMerchantReference && (
              <p className="mt-4 text-xs text-muted-foreground">
                Reference: <code className="font-mono">{OrderMerchantReference}</code>
              </p>
            )}
            {!loading && status !== "PENDING" && (
              <p className="mt-4 text-xs text-muted-foreground">
                Redirecting to home in {secondsLeft}s…
              </p>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-full"><Link to="/">Go home now</Link></Button>
              <Button asChild variant="outline" className="rounded-full"><Link to="/causes">Back to projects</Link></Button>
            </div>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}