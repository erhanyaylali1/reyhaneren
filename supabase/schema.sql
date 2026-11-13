-- Reyhan Eren — blog schema.
-- Run once in Supabase → SQL Editor → New query → paste → Run.
-- Safe to re-run: every statement is idempotent.
--
-- Security model: Row Level Security is ON with NO policies, so the public
-- (anon / publishable) key can read or write nothing. Only the Next.js server,
-- using the secret key, talks to these tables.

-- ─── Posts ──────────────────────────────────────────────────────────────────
create table if not exists public.posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique check (slug ~ '^[a-z0-9-]{1,120}$'),
  title           text not null check (char_length(title) between 1 and 160),
  excerpt         text not null default '',
  cover_image     text,
  cover_alt       text not null default '',
  content_html    text not null default '',
  reading_minutes int  not null default 1,
  status          text not null default 'draft' check (status in ('draft', 'published')),
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  views           int  not null default 0
);

create index if not exists posts_status_published_idx
  on public.posts (status, published_at desc);

alter table public.posts enable row level security;

-- Atomic "views = views + 1" so two simultaneous readers are both counted.
create or replace function public.increment_post_views(p_slug text)
returns int
language sql
security definer
set search_path = ''
as $$
  update public.posts
     set views = views + 1
   where slug = p_slug and status = 'published'
  returning views;
$$;

revoke execute on function public.increment_post_views(text) from public, anon, authenticated;
grant  execute on function public.increment_post_views(text) to service_role;

-- ─── Admin settings (single row) ────────────────────────────────────────────
-- The PIN is stored as a salted scrypt hash, never in plain text. The row is
-- created automatically on first login with ADMIN_PIN (default 1234).
create table if not exists public.admin_settings (
  id              smallint primary key default 1 check (id = 1),
  pin_hash        text not null,
  session_version int  not null default 1
);

alter table public.admin_settings enable row level security;

-- ─── Login brute-force protection ───────────────────────────────────────────
create table if not exists public.login_attempts (
  key          text primary key,
  failures     int  not null default 0,
  locked_until timestamptz
);

alter table public.login_attempts enable row level security;

-- ─── Image storage ──────────────────────────────────────────────────────────
-- Public bucket: anyone can VIEW images by URL (needed for the blog), but
-- only the server can upload or delete (no storage policies are added).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

-- ─── Newsletter ─────────────────────────────────────────────────────────────
-- Double opt-in: a row starts as 'pending' and becomes 'confirmed' only after
-- the visitor clicks the link in the confirmation e-mail. `token` is a random
-- secret used in the confirm and unsubscribe links (no login needed).
create table if not exists public.subscribers (
  id               uuid primary key default gen_random_uuid(),
  email            text not null unique check (email = lower(email) and char_length(email) <= 254),
  status           text not null default 'pending' check (status in ('pending', 'confirmed', 'unsubscribed')),
  token            text not null unique,
  consent_at       timestamptz not null default now(),
  confirm_sent_at  timestamptz,
  confirmed_at     timestamptz,
  unsubscribed_at  timestamptz,
  created_at       timestamptz not null default now()
);

create index if not exists subscribers_status_idx on public.subscribers (status);

alter table public.subscribers enable row level security;

-- When a post was e-mailed to subscribers. Set once, so editing a published
-- post never sends it again.
alter table public.posts add column if not exists newsletter_sent_at timestamptz;

-- Posts already published before the newsletter existed must not be mailed
-- out the next time someone edits them.
update public.posts
   set newsletter_sent_at = coalesce(published_at, now())
 where status = 'published'
   and newsletter_sent_at is null;
