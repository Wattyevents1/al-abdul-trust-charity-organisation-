// Server-only Pesapal client (sandbox by default).
// Docs: https://developer.pesapal.com/api3-demo-docs.html
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const PESAPAL_ENV = (process.env.PESAPAL_ENV || "sandbox").toLowerCase();
export const PESAPAL_BASE =
  PESAPAL_ENV === "live"
    ? "https://pay.pesapal.com/v3"
    : "https://cybqa.pesapal.com/pesapalv3";

function creds() {
  const key = process.env.PESAPAL_CONSUMER_KEY;
  const secret = process.env.PESAPAL_CONSUMER_SECRET;
  if (!key || !secret) {
    throw new Error(
      "Pesapal credentials missing. Add PESAPAL_CONSUMER_KEY and PESAPAL_CONSUMER_SECRET secrets.",
    );
  }
  return { key, secret };
}

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 30_000) {
    return cachedToken.token;
  }
  const { key, secret } = creds();
  const res = await fetch(`${PESAPAL_BASE}/api/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ consumer_key: key, consumer_secret: secret }),
  });
  const json = (await res.json()) as {
    token?: string;
    expiryDate?: string;
    error?: unknown;
    status?: string;
  };
  if (!res.ok || !json.token) {
    throw new Error(`Pesapal auth failed: ${JSON.stringify(json)}`);
  }
  const expiresAt = json.expiryDate
    ? new Date(json.expiryDate).getTime()
    : Date.now() + 4 * 60 * 1000;
  cachedToken = { token: json.token, expiresAt };
  return json.token;
}

async function authedFetch(path: string, init: RequestInit) {
  const token = await getAccessToken();
  return fetch(`${PESAPAL_BASE}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export async function ensureIpn(callbackOrigin: string): Promise<string> {
  const ipnUrl = `${callbackOrigin}/api/public/pesapal/ipn`;
  const { data: existing } = await supabaseAdmin
    .from("pesapal_ipn")
    .select("ipn_id, url, environment")
    .eq("environment", PESAPAL_ENV)
    .eq("url", ipnUrl)
    .maybeSingle();
  if (existing?.ipn_id) return existing.ipn_id;

  const res = await authedFetch("/api/URLSetup/RegisterIPN", {
    method: "POST",
    body: JSON.stringify({ url: ipnUrl, ipn_notification_type: "GET" }),
  });
  const json = (await res.json()) as { ipn_id?: string; error?: unknown };
  if (!res.ok || !json.ipn_id) {
    throw new Error(`Pesapal IPN registration failed: ${JSON.stringify(json)}`);
  }
  await supabaseAdmin
    .from("pesapal_ipn")
    .insert({ ipn_id: json.ipn_id, url: ipnUrl, environment: PESAPAL_ENV });
  return json.ipn_id;
}

export type SubmitOrderInput = {
  id: string;
  amount: number;
  currency: string;
  description: string;
  callback_url: string;
  notification_id: string;
  billing: {
    email_address: string;
    phone_number: string;
    first_name: string;
    last_name?: string;
  };
};

export async function submitOrder(input: SubmitOrderInput) {
  const res = await authedFetch("/api/Transactions/SubmitOrderRequest", {
    method: "POST",
    body: JSON.stringify(input),
  });
  const json = (await res.json()) as {
    order_tracking_id?: string;
    merchant_reference?: string;
    redirect_url?: string;
    error?: unknown;
  };
  if (!res.ok || !json.redirect_url || !json.order_tracking_id) {
    throw new Error(`Pesapal submit order failed: ${JSON.stringify(json)}`);
  }
  return json as Required<Pick<typeof json, "order_tracking_id" | "redirect_url" | "merchant_reference">>;
}

export async function getTransactionStatus(orderTrackingId: string) {
  const res = await authedFetch(
    `/api/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(orderTrackingId)}`,
    { method: "GET" },
  );
  const json = (await res.json()) as Record<string, unknown>;
  if (!res.ok) throw new Error(`Pesapal status failed: ${JSON.stringify(json)}`);
  return json;
}