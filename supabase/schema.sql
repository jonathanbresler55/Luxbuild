-- ============================================
-- LUXBUILD Database Schema
-- Pegar completo en Supabase → SQL Editor → Run
-- ============================================

-- Clients
create table if not exists clientes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  contacto text,
  email text,
  telefono text,
  empresa text,
  notas text,
  created_at timestamptz default now()
);

-- Quote line item catalog (base de precios)
create table if not exists partidas (
  id uuid primary key default gen_random_uuid(),
  categoria text not null,
  descripcion text not null,
  unidad text not null,
  precio_material numeric(12,2) default 0,
  precio_mano_obra numeric(12,2) default 0,
  precio_total numeric(12,2) generated always as (precio_material + precio_mano_obra) stored,
  fuente text default 'manual' check (fuente in ('manual','ai','mercado')),
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Quotes / Cotizaciones
create table if not exists cotizaciones (
  id uuid primary key default gen_random_uuid(),
  numero text unique not null,
  cliente_id uuid references clientes(id),
  nombre text not null,
  descripcion text,
  estado text default 'borrador' check (estado in ('borrador','enviada','negociacion','ganada','perdida')),
  monto_total numeric(12,2) default 0,
  margen_porcentaje numeric(5,2) default 0,
  fecha_emision date default current_date,
  fecha_vencimiento date,
  notas text,
  plano_url text,
  created_at timestamptz default now()
);

-- Quote line items
create table if not exists cotizacion_items (
  id uuid primary key default gen_random_uuid(),
  cotizacion_id uuid references cotizaciones(id) on delete cascade,
  partida_id uuid references partidas(id),
  descripcion text not null,
  categoria text,
  unidad text not null,
  cantidad numeric(12,3) not null,
  precio_material numeric(12,2) default 0,
  precio_mano_obra numeric(12,2) default 0,
  precio_unitario numeric(12,2) generated always as (precio_material + precio_mano_obra) stored,
  margen_porcentaje numeric(5,2) default 0,
  precio_venta numeric(12,2) default 0,
  total numeric(12,2) generated always as (precio_venta * cantidad) stored,
  sort_order int default 0
);

-- Projects
create table if not exists proyectos (
  id uuid primary key default gen_random_uuid(),
  numero text unique not null,
  cotizacion_id uuid references cotizaciones(id),
  cliente_id uuid references clientes(id),
  nombre text not null,
  descripcion text,
  estado text default 'planificacion' check (estado in ('planificacion','en_ejecucion','pausado','completado','cancelado')),
  presupuesto numeric(12,2) default 0,
  costo_ejecutado numeric(12,2) default 0,
  avance_programado numeric(5,2) default 0,
  avance_real numeric(5,2) default 0,
  fecha_inicio date,
  fecha_fin_programada date,
  fecha_fin_real date,
  responsable text,
  created_at timestamptz default now()
);

-- Project activities (Gantt / Cronograma)
create table if not exists actividades (
  id uuid primary key default gen_random_uuid(),
  proyecto_id uuid references proyectos(id) on delete cascade,
  nombre text not null,
  descripcion text,
  responsable text,
  estado text default 'pendiente' check (estado in ('pendiente','en_progreso','completada','bloqueada')),
  avance_programado numeric(5,2) default 0,
  avance_real numeric(5,2) default 0,
  presupuesto numeric(12,2) default 0,
  costo_real numeric(12,2) default 0,
  fecha_inicio date,
  fecha_fin date,
  semana_inicio int,
  semana_fin int,
  sort_order int default 0
);

-- Bitácora (weekly tracking)
create table if not exists bitacora (
  id uuid primary key default gen_random_uuid(),
  proyecto_id uuid references proyectos(id) on delete cascade,
  actividad_id uuid references actividades(id),
  fecha date not null default current_date,
  semana int,
  responsable text,
  descripcion text not null,
  avance_reportado numeric(5,2),
  problemas text,
  proximos_pasos text,
  created_at timestamptz default now()
);

-- Bitácora photos
create table if not exists bitacora_fotos (
  id uuid primary key default gen_random_uuid(),
  bitacora_id uuid references bitacora(id) on delete cascade,
  url text not null,
  descripcion text,
  created_at timestamptz default now()
);

-- Purchase orders
create table if not exists ordenes_compra (
  id uuid primary key default gen_random_uuid(),
  numero text unique not null,
  proyecto_id uuid references proyectos(id),
  proveedor text not null,
  estado text default 'pendiente' check (estado in ('pendiente','aprobada','recibida','cancelada')),
  monto_total numeric(12,2) default 0,
  fecha_emision date default current_date,
  fecha_entrega date,
  notas text,
  created_at timestamptz default now()
);

-- Purchase order items
create table if not exists orden_items (
  id uuid primary key default gen_random_uuid(),
  orden_id uuid references ordenes_compra(id) on delete cascade,
  descripcion text not null,
  unidad text,
  cantidad numeric(12,3),
  precio_unitario numeric(12,2),
  total numeric(12,2) generated always as (cantidad * precio_unitario) stored
);

-- Change orders
create table if not exists ordenes_cambio (
  id uuid primary key default gen_random_uuid(),
  numero text unique not null,
  proyecto_id uuid references proyectos(id),
  descripcion text not null,
  monto numeric(12,2),
  estado text default 'pendiente' check (estado in ('pendiente','aprobada','rechazada')),
  fecha date default current_date,
  aprobado_por text
);

-- Invoices
create table if not exists facturas (
  id uuid primary key default gen_random_uuid(),
  numero text unique not null,
  proyecto_id uuid references proyectos(id),
  cliente_id uuid references clientes(id),
  monto numeric(12,2),
  estado text default 'pendiente' check (estado in ('pendiente','pagada','vencida')),
  fecha_emision date default current_date,
  fecha_vencimiento date,
  porcentaje_avance numeric(5,2)
);

-- AI analysis log
create table if not exists ai_analisis (
  id uuid primary key default gen_random_uuid(),
  proyecto_id uuid references proyectos(id),
  tipo text check (tipo in ('riesgos','estimado','resumen_semanal','flujo_caja')),
  prompt text,
  respuesta text,
  created_at timestamptz default now()
);

-- ============================================
-- RLS: Habilitar acceso público (sin auth por ahora)
-- ============================================
alter table clientes enable row level security;
alter table cotizaciones enable row level security;
alter table cotizacion_items enable row level security;
alter table partidas enable row level security;
alter table proyectos enable row level security;
alter table actividades enable row level security;
alter table bitacora enable row level security;
alter table bitacora_fotos enable row level security;
alter table ordenes_compra enable row level security;
alter table orden_items enable row level security;
alter table ordenes_cambio enable row level security;
alter table facturas enable row level security;
alter table ai_analisis enable row level security;

create policy "public access" on clientes for all using (true) with check (true);
create policy "public access" on cotizaciones for all using (true) with check (true);
create policy "public access" on cotizacion_items for all using (true) with check (true);
create policy "public access" on partidas for all using (true) with check (true);
create policy "public access" on proyectos for all using (true) with check (true);
create policy "public access" on actividades for all using (true) with check (true);
create policy "public access" on bitacora for all using (true) with check (true);
create policy "public access" on bitacora_fotos for all using (true) with check (true);
create policy "public access" on ordenes_compra for all using (true) with check (true);
create policy "public access" on orden_items for all using (true) with check (true);
create policy "public access" on ordenes_cambio for all using (true) with check (true);
create policy "public access" on facturas for all using (true) with check (true);
create policy "public access" on ai_analisis for all using (true) with check (true);
