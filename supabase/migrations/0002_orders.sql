-- Real order placement. Same anonymous model as the cart: no auth, so orders
-- are keyed by their own id/order_number and optionally linked back to the
-- cart they came from (kept even if that cart is later cleared, via
-- on delete set null).

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  cart_id uuid references public.carts(id) on delete set null,
  email text not null,
  marketing_opt_in boolean not null default false,
  payment_method text not null,
  shipping_first_name text not null,
  shipping_last_name text not null,
  shipping_address text not null,
  shipping_apartment text,
  shipping_city text not null,
  shipping_postal_code text not null,
  shipping_state text not null,
  billing_same boolean not null default true,
  billing_first_name text,
  billing_last_name text,
  billing_address text,
  billing_apartment text,
  billing_city text,
  billing_postal_code text,
  billing_state text,
  subtotal numeric not null,
  shipping_cost numeric not null default 0,
  tax numeric not null default 0,
  total numeric not null,
  status text not null default 'placed',
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  item_key text not null,
  slug text not null,
  name text not null,
  image text,
  price numeric,
  price_label text not null,
  variant_label text,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "anon full access to orders" on public.orders
  for all using (true) with check (true);

create policy "anon full access to order_items" on public.order_items
  for all using (true) with check (true);

-- Inserting the order and its line items has to land together — a partial
-- write would leave an order with no items. place_order runs both inside one
-- transaction (implicit to a plpgsql function body) and hands back the id and
-- human-facing order number in one round trip.
create or replace function public.place_order(
  p_cart_id uuid,
  p_email text,
  p_marketing_opt_in boolean,
  p_payment_method text,
  p_shipping jsonb,
  p_billing_same boolean,
  p_billing jsonb,
  p_subtotal numeric,
  p_shipping_cost numeric,
  p_tax numeric,
  p_total numeric,
  p_items jsonb
) returns table (order_id uuid, order_number text)
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_order_id uuid;
  v_order_number text;
  v_item jsonb;
begin
  if jsonb_array_length(p_items) = 0 then
    raise exception 'order must have at least one item';
  end if;

  v_order_number := 'ST-' || upper(substr(md5(gen_random_uuid()::text), 1, 6));

  insert into public.orders (
    order_number, cart_id, email, marketing_opt_in, payment_method,
    shipping_first_name, shipping_last_name, shipping_address, shipping_apartment,
    shipping_city, shipping_postal_code, shipping_state,
    billing_same, billing_first_name, billing_last_name, billing_address, billing_apartment,
    billing_city, billing_postal_code, billing_state,
    subtotal, shipping_cost, tax, total
  ) values (
    v_order_number, p_cart_id, p_email, p_marketing_opt_in, p_payment_method,
    p_shipping->>'firstName', p_shipping->>'lastName', p_shipping->>'address', p_shipping->>'apartment',
    p_shipping->>'city', p_shipping->>'postalCode', p_shipping->>'state',
    p_billing_same,
    case when p_billing_same then null else p_billing->>'firstName' end,
    case when p_billing_same then null else p_billing->>'lastName' end,
    case when p_billing_same then null else p_billing->>'address' end,
    case when p_billing_same then null else p_billing->>'apartment' end,
    case when p_billing_same then null else p_billing->>'city' end,
    case when p_billing_same then null else p_billing->>'postalCode' end,
    case when p_billing_same then null else p_billing->>'state' end,
    p_subtotal, p_shipping_cost, p_tax, p_total
  )
  returning id into v_order_id;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    insert into public.order_items (
      order_id, item_key, slug, name, image, price, price_label, variant_label, quantity
    ) values (
      v_order_id,
      v_item->>'key',
      v_item->>'slug',
      v_item->>'name',
      v_item->>'image',
      nullif(v_item->>'price', '')::numeric,
      v_item->>'priceLabel',
      v_item->>'variantLabel',
      (v_item->>'quantity')::integer
    );
  end loop;

  return query select v_order_id, v_order_number;
end;
$$;

grant execute on function public.place_order(
  uuid, text, boolean, text, jsonb, boolean, jsonb, numeric, numeric, numeric, numeric, jsonb
) to anon;
