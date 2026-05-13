
-- Tabela de alunos
create table public.alunos (
  id text primary key,
  nome text not null,
  telefone text,
  created_at timestamptz not null default now()
);

-- Treino atual de cada aluno
create table public.treinos (
  aluno_id text primary key references public.alunos(id) on delete cascade,
  treino jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Treinos padrão
create table public.treinos_padroes (
  id int primary key,
  treino jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Progresso da semana atual (estado mutável)
create table public.progresso (
  aluno_id text primary key references public.alunos(id) on delete cascade,
  progresso jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Check-ins
create table public.checkins (
  id uuid primary key default gen_random_uuid(),
  aluno_id text not null references public.alunos(id) on delete cascade,
  aluno_nome text not null,
  gym_name text not null,
  gym_address text,
  distance_m int,
  lat_aluno double precision,
  lng_aluno double precision,
  lat_gym double precision,
  lng_gym double precision,
  created_at timestamptz not null default now()
);
create index on public.checkins (aluno_id, created_at desc);

-- Histórico permanente de treinos concluídos (base do histórico mensal)
create table public.treino_historico (
  id uuid primary key default gen_random_uuid(),
  aluno_id text not null references public.alunos(id) on delete cascade,
  data date not null,
  dia_semana text not null,
  foco text,
  exercicios_feitos jsonb not null default '[]'::jsonb,
  total_exercicios int not null default 0,
  checkin_id uuid references public.checkins(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (aluno_id, data, dia_semana)
);
create index on public.treino_historico (aluno_id, data desc);

-- Credenciais do admin
create table public.admin_credentials (
  id int primary key,
  username text not null,
  password text not null,
  whatsapp text,
  updated_at timestamptz not null default now()
);

-- Seed: credencial admin padrão
insert into public.admin_credentials (id, username, password, whatsapp)
values (1, 'italo', 'italoruan123', '5585981521490');

-- RLS: ativa em todas as tabelas, com policies públicas (modelo de sessão local)
alter table public.alunos enable row level security;
alter table public.treinos enable row level security;
alter table public.treinos_padroes enable row level security;
alter table public.progresso enable row level security;
alter table public.checkins enable row level security;
alter table public.treino_historico enable row level security;
alter table public.admin_credentials enable row level security;

create policy "public access" on public.alunos for all using (true) with check (true);
create policy "public access" on public.treinos for all using (true) with check (true);
create policy "public access" on public.treinos_padroes for all using (true) with check (true);
create policy "public access" on public.progresso for all using (true) with check (true);
create policy "public access" on public.checkins for all using (true) with check (true);
create policy "public access" on public.treino_historico for all using (true) with check (true);
create policy "public access" on public.admin_credentials for all using (true) with check (true);
