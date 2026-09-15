-- Wishlist: same anonymous, device-scoped model as the cart, but simpler —
-- a wishlist has no parent row of its own (nothing else hangs off it the way
-- order_items hangs off an order), so it's just rows keyed by a device id
-- minted client-side with crypto.randomUUID() and kept in localStorage.
create table if not exists public.wishlist_items (
  device_id uuid not null,
  slug text not null,
  created_at timestamptz not null default now(),
  primary key (device_id, slug)
);

alter table public.wishlist_items enable row level security;

create policy "anon full access to wishlist_items" on public.wishlist_items
  for all using (true) with check (true);

-- Reviews: publicly readable, anyone can add one, nobody can edit or delete
-- one after the fact (no update/delete policy) — the closest thing to
-- moderation this clone has without real accounts.
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_slug text not null,
  author_name text not null,
  rating smallint not null check (rating between 1 and 5),
  comment text not null,
  created_at timestamptz not null default now()
);

create index if not exists reviews_product_slug_idx on public.reviews (product_slug);

alter table public.reviews enable row level security;

create policy "anyone can read reviews" on public.reviews
  for select using (true);

create policy "anyone can add a review" on public.reviews
  for insert with check (
    char_length(author_name) between 1 and 80
    and char_length(comment) between 1 and 2000
  );
