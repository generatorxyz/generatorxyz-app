create table countries (
  id bigint not null primary key,
  name text,
  iso2 text not null,
  iso3 text,
  local_name text,
  continent public.continents
);

create table messages (
  id bigint not null primary key,
  created_at timestamp default now(),
  user_id uuid,
  cost numeric,
  message text,
  api_key text not null,
  uuid uuid default uuid_generate_v4() primary key,
  url text,
  source_content text,
  type text not null
);

create table user (
  id uuid default uuid_generate_v4() primary key,
  email character not null,
  customer_id character,
  created_at timestamp default now(),
  session_id text,
  sub_start_date timestamp default now(),
  sub_end_date timestamp default now(),
  sub_id text,
  sub_status text
);

create table orders (
  id bigint not null primary key,
  created_at timestamp default now(),
  user_id uuid default uuid_generate_v4(),
  product_id text not null,
  price_id text not null,
  amount numeric not null,
  customer_id text not null
);

create table credits (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp default now(),
  amount numeric,
  user_id uuid default uuid_generate_v4(),
  updated_at timestamp default now()
);

create table products (
  id bigint not null primary key,
  created_at timestamp default now(),
  stripe_product_id text not null,
  name text not null,
  credits numeric not null
);

create table profiles (
  id uuid default uuid_generate_v4() primary key,
  updated_at timestamp default now(),
  username character,
  full_name text,
  avatar_url text,
  website text,
  country bigint references countries (id),
  api_key uuid default uuid_generate_v4(),
  credit uuid references credits (id),
  beta_user boolean not null,
  onboarding_done boolean not null,
  customer_id text
);

create table customers (
  id bigint not null primary key,
  created_at timestamp default now(),
  user_id uuid references user (id),
  active_subscription boolean,
  start_date date default now()
);

create table summaries (
  id bigint not null primary key,
  created_at timestamp default now(),
  user_id uuid references profiles (id) primary key,
  url text,
  summary text
);

