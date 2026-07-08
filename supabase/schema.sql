-- Forje Life — Supabase schema
-- Run this once in Supabase: Project > SQL Editor > New query > paste all > Run

-- =========================
-- TASKS
-- =========================
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  priority text not null default 'medium' check (priority in ('low','medium','high')),
  status text not null default 'todo' check (status in ('todo','in_progress','done')),
  due_date date,
  project text,
  created_at timestamptz not null default now()
);
alter table tasks enable row level security;
create policy "tasks_owner" on tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================
-- HABITS
-- =========================
create table if not exists habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text,
  streak int not null default 0,
  best_streak int not null default 0,
  last_completed_date date,
  created_at timestamptz not null default now()
);
alter table habits enable row level security;
create policy "habits_owner" on habits for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists habit_logs (
  id uuid primary key default gen_random_uuid(),
  habit_id uuid not null references habits(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  completed_on date not null,
  created_at timestamptz not null default now(),
  unique (habit_id, completed_on)
);
alter table habit_logs enable row level security;
create policy "habit_logs_owner" on habit_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================
-- JOURNAL
-- =========================
create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null default current_date,
  mood text,
  content text not null,
  created_at timestamptz not null default now()
);
alter table journal_entries enable row level security;
create policy "journal_owner" on journal_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================
-- GOALS + AUTO-GENERATED MILESTONES
-- =========================
create table if not exists goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null default 'personal',
  target_date date not null,
  status text not null default 'active' check (status in ('active','done','abandoned')),
  created_at timestamptz not null default now()
);
alter table goals enable row level security;
create policy "goals_owner" on goals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists goal_milestones (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null references goals(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  target_date date,
  order_index int not null default 0,
  is_done boolean not null default false,
  created_at timestamptz not null default now()
);
alter table goal_milestones enable row level security;
create policy "goal_milestones_owner" on goal_milestones for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================
-- FINANCE (multi-currency, base GBP)
-- =========================
create table if not exists finance_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('income','expense')),
  amount numeric not null,
  currency text not null default 'GBP',
  amount_gbp numeric not null,
  category text,
  note text,
  occurred_on date not null default current_date,
  created_at timestamptz not null default now()
);
alter table finance_transactions enable row level security;
create policy "finance_owner" on finance_transactions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================
-- CALENDAR
-- =========================
create table if not exists calendar_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  event_date date not null,
  event_time time,
  location text,
  notes text,
  created_at timestamptz not null default now()
);
alter table calendar_events enable row level security;
create policy "calendar_owner" on calendar_events for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================
-- HEALTH (one entry per user per day)
-- =========================
create table if not exists health_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null default current_date,
  sleep_hours numeric,
  water_ml int,
  weight_kg numeric,
  exercise_minutes int,
  notes text,
  created_at timestamptz not null default now(),
  unique (user_id, log_date)
);
alter table health_logs enable row level security;
create policy "health_owner" on health_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================
-- NOTES
-- =========================
create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Untitled',
  content text,
  pinned boolean not null default false,
  created_at timestamptz not null default now()
);
alter table notes enable row level security;
create policy "notes_owner" on notes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =========================
-- CONTACTS (with boarding house + year for UK boarding school)
-- =========================
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  relation text,
  phone text,
  email text,
  birthday date,
  boarding_house text,
  year text,
  notes text,
  created_at timestamptz not null default now()
);
alter table contacts enable row level security;
create policy "contacts_owner" on contacts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
