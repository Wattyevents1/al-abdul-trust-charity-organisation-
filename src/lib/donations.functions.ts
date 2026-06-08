import { createServerFn } from "@tanstack/react-start";
import { getRequestHost, getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const InitiateSchema = z.object({
  donor_name: z.string().trim().min(1).max(120),
  donor_email: z.string().trim().email().max(255),
  donor_phone: z.string().trim().min(6).max(20).regex(/^[+0-9 \-()]+$/),
  amount: z.number().positive().max(1_000_000),
  currency: z.enum(["USD", "EUR", "GBP", "KES", "UGX", "NGN"]),
  cause_slug: z.string().trim().min(1).max(120).optional().nullable(),
  recurring: z.boolean().optional().default(false),
});

export const initiateDonation = createServerFn({ method: "POST" })
  .inputValidator((input) => InitiateSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { ensureIpn, submitOrder } = await import("./pesapal.server");

    const host = getRequestHost();
    const proto = getRequestHeader("x-forwarded-proto") || "https";
    const origin = `${proto}://${host}`;

    const merchantRef = `ALAB-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const [firstName, ...rest] = data.donor_name.split(" ");

    const { error: insertErr } = await supabaseAdmin.from("donations").insert({
      donor_name: data.donor_name,
      donor_email: data.donor_email,
      donor_phone: data.donor_phone,
      amount: data.amount,
      currency: data.currency,
      cause_slug: data.cause_slug ?? null,
      recurring: data.recurring ?? false,
      merchant_reference: merchantRef,
      status: "PENDING",
    });
    if (insertErr) throw new Error(`Failed to record donation: ${insertErr.message}`);

    const ipnId = await ensureIpn(origin);
    const order = await submitOrder({
      id: merchantRef,
      amount: Number(data.amount.toFixed(2)),
      currency: data.currency,
      description: data.cause_slug
        ? `Donation to ${data.cause_slug}`
        : "Donation to Al-Abdul Trust",
      callback_url: `${origin}/donate/callback`,
      notification_id: ipnId,
      billing: {
        email_address: data.donor_email,
        phone_number: data.donor_phone,
        first_name: firstName || data.donor_name,
        last_name: rest.join(" ") || undefined,
      },
    });

    await supabaseAdmin
      .from("donations")
      .update({ pesapal_tracking_id: order.order_tracking_id })
      .eq("merchant_reference", merchantRef);

    return { redirect_url: order.redirect_url, merchant_reference: merchantRef };
  });

export const refreshDonationStatus = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ order_tracking_id: z.string().min(8).max(128) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { getTransactionStatus } = await import("./pesapal.server");
    const status = await getTransactionStatus(data.order_tracking_id);
    const desc = (status.payment_status_description as string) || "PENDING";
    await supabaseAdmin
      .from("donations")
      .update({
        status: desc.toUpperCase(),
        payment_method: (status.payment_method as string) || null,
        payment_account: (status.payment_account as string) || null,
        confirmation_code: (status.confirmation_code as string) || null,
        raw_status: JSON.parse(JSON.stringify(status)),
        updated_at: new Date().toISOString(),
      })
      .eq("pesapal_tracking_id", data.order_tracking_id);
    return { status: desc };
  });

export const listDonations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context as { supabase: any; userId: string };
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    const isAdmin = (roles || []).some((r: { role: string }) => r.role === "admin");
    if (!isAdmin) throw new Error("Forbidden: admin only");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("donations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);

    const totals = (data || []).reduce(
      (acc, d) => {
        acc.count += 1;
        if (d.status === "COMPLETED") {
          acc.completed += 1;
          acc.raised += Number(d.amount);
        } else if (d.status === "PENDING") acc.pending += 1;
        else if (d.status === "FAILED" || d.status === "INVALID") acc.failed += 1;
        return acc;
      },
      { count: 0, completed: 0, pending: 0, failed: 0, raised: 0 },
    );
    return { donations: data || [], totals };
  });

export const checkAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context as { supabase: any; userId: string };
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    return { isAdmin: (data || []).some((r: { role: string }) => r.role === "admin") };
  });