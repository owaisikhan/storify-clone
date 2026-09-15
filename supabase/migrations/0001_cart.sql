-- Anonymous, device-scoped shopping cart. There is no real auth in this
-- clone, so a cart is identified purely by its own uuid (minted client-side
-- on first add-to-cart and kept in localStorage) rather than a user id.

create extension if not exists pgcrypto;

create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  item_key text not null,
  slug text not null,
  href text not null,
  name text not null,
  image text,
  price numeric,
  price_label text not null,
  variant_label text,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (cart_id, item_key)
);

create index if not exists cart_items_cart_id_idx on public.cart_items (cart_id);

alter table public.carts enable row level security;
alter table public.cart_items enable row level security;

-- No auth to scope by, so any holder of the anon key (i.e. this app) may
-- read/write any cart row by id — the cart id itself is the only secret,
-- generated per device and never listed anywhere.
create policy "anon full access to carts" on public.carts
  for all using (true) with check (true);

create policy "anon full access to cart_items" on public.cart_items
  for all using (true) with check (true);
