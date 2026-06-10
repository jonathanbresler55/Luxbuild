"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createLead } from "@/app/actions/leads";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

const fuentes = ["Referido", "Redes Sociales", "Web", "Llamada entrante", "Evento", "Otro"];

export default function NewLeadDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", fuente: "", valor_estimado: "", notas: "" });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    setLoading(true);
    try {
      await createLead({
        nombre: form.nombre,
        email: form.email || undefined,
        telefono: form.telefono || undefined,
        fuente: form.fuente || undefined,
        valor_estimado: form.valor_estimado ? Number(form.valor_estimado) : undefined,
        notas: form.notas || undefined,
      });
      toast.success("Lead registrado exitosamente");
      setOpen(false);
      setForm({ nombre: "", email: "", telefono: "", fuente: "", valor_estimado: "", notas: "" });
    } catch (err: any) {
      toast.error(err.message ?? "Error al registrar el lead");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-[#c9a566] hover:bg-[#b8914f] text-[#0e0f14] font-semibold">
        <Plus size={15} className="mr-1.5" /> Nuevo Lead
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nuevo Lead / Oportunidad</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Nombre del contacto *</Label>
              <Input placeholder="Ej. Ana García" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Teléfono</Label>
                <Input placeholder="+507 6000-0000" value={form.telefono} onChange={(e) => set("telefono", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Fuente</Label>
                <Select value={form.fuente} onValueChange={(v) => set("fuente", v ?? "")}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                  <SelectContent>
                    {fuentes.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Valor estimado ($)</Label>
                <Input type="number" placeholder="0.00" value={form.valor_estimado} onChange={(e) => set("valor_estimado", e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Notas</Label>
              <Textarea placeholder="Detalles del proyecto de interés..." value={form.notas} onChange={(e) => set("notas", e.target.value)} rows={3} />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={loading} className="bg-[#c9a566] hover:bg-[#b8914f] text-[#0e0f14] font-semibold">
                {loading ? <Loader2 size={15} className="mr-1.5 animate-spin" /> : <Plus size={15} className="mr-1.5" />}
                Registrar Lead
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
