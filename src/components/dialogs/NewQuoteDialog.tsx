"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCotizacion } from "@/app/actions/quotes";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

export default function NewQuoteDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nombre: "", descripcion: "", fecha_vencimiento: "", notas: "" });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    setLoading(true);
    try {
      await createCotizacion({
        nombre: form.nombre,
        descripcion: form.descripcion || undefined,
        fecha_vencimiento: form.fecha_vencimiento || undefined,
        notas: form.notas || undefined,
      });
      toast.success("Cotización creada exitosamente");
      setOpen(false);
      setForm({ nombre: "", descripcion: "", fecha_vencimiento: "", notas: "" });
    } catch (err: any) {
      toast.error(err.message ?? "Error al crear la cotización");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-[#c9a566] hover:bg-[#b8914f] text-[#0e0f14] font-semibold">
        <Plus size={15} className="mr-1.5" /> Nueva Cotización
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nueva Cotización</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Nombre del proyecto *</Label>
              <Input placeholder="Ej. Remodelación Oficina Central" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Descripción / Alcance</Label>
              <Textarea placeholder="Describe el alcance de la cotización..." value={form.descripcion} onChange={(e) => set("descripcion", e.target.value)} rows={3} />
            </div>
            <div className="space-y-1.5">
              <Label>Fecha de vencimiento</Label>
              <Input type="date" value={form.fecha_vencimiento} onChange={(e) => set("fecha_vencimiento", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Notas internas</Label>
              <Textarea placeholder="Notas para el equipo..." value={form.notas} onChange={(e) => set("notas", e.target.value)} rows={2} />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={loading} className="bg-[#c9a566] hover:bg-[#b8914f] text-[#0e0f14] font-semibold">
                {loading ? <Loader2 size={15} className="mr-1.5 animate-spin" /> : <Plus size={15} className="mr-1.5" />}
                Crear Cotización
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
