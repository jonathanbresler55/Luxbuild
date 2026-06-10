"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/app/actions/projects";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

export default function NewProjectDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "", descripcion: "", presupuesto: "",
    fecha_inicio: "", fecha_fin_programada: "", responsable: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    setLoading(true);
    try {
      await createProject({
        nombre: form.nombre,
        descripcion: form.descripcion || undefined,
        presupuesto: form.presupuesto ? Number(form.presupuesto) : undefined,
        fecha_inicio: form.fecha_inicio || undefined,
        fecha_fin_programada: form.fecha_fin_programada || undefined,
        responsable: form.responsable || undefined,
      });
      toast.success("Proyecto creado exitosamente");
      setOpen(false);
      setForm({ nombre: "", descripcion: "", presupuesto: "", fecha_inicio: "", fecha_fin_programada: "", responsable: "" });
    } catch (err: any) {
      toast.error(err.message ?? "Error al crear el proyecto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-[#c9a566] hover:bg-[#b8914f] text-[#0e0f14] font-semibold">
        <Plus size={15} className="mr-1.5" /> Nuevo Proyecto
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Nuevo Proyecto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="nombre">Nombre del proyecto *</Label>
              <Input id="nombre" placeholder="Ej. Residencia Torre Vista" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea id="descripcion" placeholder="Alcance general del proyecto..." value={form.descripcion} onChange={(e) => set("descripcion", e.target.value)} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="presupuesto">Presupuesto ($)</Label>
                <Input id="presupuesto" type="number" placeholder="0.00" value={form.presupuesto} onChange={(e) => set("presupuesto", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="responsable">Responsable</Label>
                <Input id="responsable" placeholder="Nombre del arquitecto" value={form.responsable} onChange={(e) => set("responsable", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="fecha_inicio">Fecha de inicio</Label>
                <Input id="fecha_inicio" type="date" value={form.fecha_inicio} onChange={(e) => set("fecha_inicio", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fecha_fin">Fecha fin programada</Label>
                <Input id="fecha_fin" type="date" value={form.fecha_fin_programada} onChange={(e) => set("fecha_fin_programada", e.target.value)} />
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={loading} className="bg-[#c9a566] hover:bg-[#b8914f] text-[#0e0f14] font-semibold">
                {loading ? <Loader2 size={15} className="mr-1.5 animate-spin" /> : <Plus size={15} className="mr-1.5" />}
                Crear Proyecto
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
