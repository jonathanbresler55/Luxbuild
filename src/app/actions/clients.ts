"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCliente(data: {
  nombre: string;
  contacto?: string;
  email?: string;
  telefono?: string;
  empresa?: string;
  notas?: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("clientes").insert([data]);
  if (error) throw new Error(error.message);
  revalidatePath("/clients");
}

export async function getClientes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clientes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}
