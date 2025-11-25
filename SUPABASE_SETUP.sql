-- Enable the UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create the table for storing exam scores
create table if not exists exam_scores (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  exam_type text not null, -- 'pretest' or 'posttest'
  score integer not null,
  total_items integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table exam_scores enable row level security;

-- Drop existing policies if they exist to avoid errors when re-running
drop policy if exists "Users can insert their own scores" on exam_scores;
drop policy if exists "Users can view their own scores" on exam_scores;

-- Allow users to insert their own scores
create policy "Users can insert their own scores"
  on exam_scores for insert
  with check (auth.uid() = user_id);

-- Allow users to view their own scores
create policy "Users can view their own scores"
  on exam_scores for select
  using (auth.uid() = user_id);

-- Allow users to update their own scores
create policy "Users can update their own scores"
  on exam_scores for update
  using (auth.uid() = user_id);

-- Allow users to delete their own scores
create policy "Users can delete their own scores"
  on exam_scores for delete
  using (auth.uid() = user_id);

-- Allow admins to view all scores
create policy "Admins can view all scores"
  on exam_scores for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Create a table for user profiles (roles)
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table profiles enable row level security;

-- Drop existing policies for profiles if they exist
drop policy if exists "Public profiles are viewable by everyone." on profiles;
drop policy if exists "Users can insert their own profile." on profiles;
drop policy if exists "Users can update own profile." on profiles;

-- Policies for profiles
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically create profile for new users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

