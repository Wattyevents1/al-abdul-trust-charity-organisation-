import { createFileRoute } from "@tanstack/react-router";

// Pesapal IPN: GET ?OrderTrackingId=...&OrderMerchantReference=...&OrderNotificationType=IPNCHANGE
export const Route = createFileRoute("/api/public/pesapal/ipn")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const tracking =
          url.searchParams.get("OrderTrackingId") ||
          url.searchParams.get("orderTrackingId");
        const merchantRef =
          url.searchParams.get("OrderMerchantReference") ||
          url.searchParams.get("orderMerchantReference");
        const notificationType =
          url.searchParams.get("OrderNotificationType") || "IPNCHANGE";

        if (!tracking || !merchantRef) {
          return Response.json(
            { orderNotificationType: notificationType, orderTrackingId: tracking, orderMerchantReference: merchantRef, status: 500 },
            { status: 200 },
          );
        }

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { getTransactionStatus } = await import("@/lib/pesapal.server");
          const status = await getTransactionStatus(tracking);
          const desc = ((status as Record<string, unknown>).payment_status_description as string) || "PENDING";
          await supabaseAdmin
            .from("donations")
            .update({
              status: desc.toUpperCase(),
              payment_method: ((status as Record<string, unknown>).payment_method as string) || null,
              payment_account: ((status as Record<string, unknown>).payment_account as string) || null,
              confirmation_code: ((status as Record<string, unknown>).confirmation_code as string) || null,
              raw_status: JSON.parse(JSON.stringify(status)),
              pesapal_tracking_id: tracking,
              updated_at: new Date().toISOString(),
            })
            .eq("merchant_reference", merchantRef);

          return Response.json({
            orderNotificationType: notificationType,
            orderTrackingId: tracking,
            orderMerchantReference: merchantRef,
            status: 200,
          });
        } catch (err) {
          console.error("[pesapal/ipn]", err);
          return Response.json(
            {
              orderNotificationType: notificationType,
              orderTrackingId: tracking,
              orderMerchantReference: merchantRef,
              status: 500,
            },
            { status: 200 },
          );
        }
      },
    },
  },
});