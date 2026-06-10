import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("cotizaciones")
      .select("*, clientes(nombre)")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const count = await supabase.from("cotizaciones").select("id", { count: "exact", head: true });
    const num = ((count.count ?? 0) + 1).toString().padStart(3, "0");
    const year = new Date().getFullYear();
    const { data, error } = await supabase
      .from("cotizaciones")
      .insert([{ ...body, numero: `COT-${year}-${num}`, estado: "borrador" }])
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
