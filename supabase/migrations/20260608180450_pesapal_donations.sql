-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Donations
CREATE TABLE public.donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  donor_name text NOT NULL,
  donor_email text NOT NULL,
  donor_phone text NOT NULL,
  amount numeric(12,2) NOT NULL CHECK (amount > 0),
  currency text NOT NULL DEFAULT 'USD',
  cause_slug text,
  recurring boolean NOT NULL DEFAULT false,
  -- Pesapal
  merchant_reference text NOT NULL UNIQUE,
  pesapal_tracking_id text UNIQUE,
  status text NOT NULL DEFAULT 'PENDING',
  payment_method text,
  payment_account text,
  confirmation_code text,
  raw_status jsonb
);

GRANT SELECT, INSERT, UPDATE ON public.donations TO authenticated;
GRANT ALL ON public.donations TO service_role;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins read all donations" ON public.donations FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- IPN registrations (cache)
CREATE TABLE public.pesapal_ipn (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ipn_id text NOT NULL,
  url text NOT NULL,
  environment text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.pesapal_ipn TO service_role;
ALTER TABLE public.pesapal_ipn ENABLE ROW LEVEL SECURITY;
