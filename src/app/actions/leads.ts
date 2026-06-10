"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createLead(data: {
  nombre: string;
  email?: string;
  telefono?: string;
  fuente?: string;
  valor_estimado?: number;
  notas?: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert([
    { ...data, estado: "nuevo" },
  ]);
  if (error) throw new Error(error.message);
  revalidatePath("/leads");
}

export async function getLeads() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}
