"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCotizacion(data: {
  nombre: string;
  cliente_id?: string;
  descripcion?: string;
  fecha_vencimiento?: string;
  notas?: string;
}) {
  const supabase = await createClient();
  const count = await supabase.from("cotizaciones").select("id", { count: "exact", head: true });
  const num = ((count.count ?? 0) + 1).toString().padStart(3, "0");
  const year = new Date().getFullYear();
  const { error } = await supabase.from("cotizaciones").insert([
    { ...data, numero: `COT-${year}-${num}`, estado: "borrador" },
  ]);
  if (error) throw new Error(error.message);
  revalidatePath("/quotes");
}

export async function getCotizaciones() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cotizaciones")
    .select("*, clientes(nombre)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}
