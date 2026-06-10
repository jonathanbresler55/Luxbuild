"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createProject(data: {
  nombre: string;
  cliente_id?: string;
  descripcion?: string;
  presupuesto?: number;
  fecha_inicio?: string;
  fecha_fin_programada?: string;
  responsable?: string;
}) {
  const supabase = await createClient();
  const count = await supabase.from("proyectos").select("id", { count: "exact", head: true });
  const num = ((count.count ?? 0) + 1).toString().padStart(3, "0");
  const { error } = await supabase.from("proyectos").insert([
    { ...data, numero: `P-${num}`, estado: "planificacion" },
  ]);
  if (error) throw new Error(error.message);
  revalidatePath("/projects");
}

export async function getProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proyectos")
    .select("*, clientes(nombre)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}
