"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

interface Props { onCreated?: () => void; }

export default function NewClientDialog({ onCreated }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nombre: "", contacto: "", email: "", telefono: "", empresa: "", notas: "" });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: form.nombre, contacto: form.contacto || null, email: form.email || null, telefono: form.telefono || null, empresa: form.empresa || null, notas: form.notas || null }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      toast.success("Cliente agregado exitosamente");
      setOpen(false);
      setForm({ nombre: "", contacto: "", email: "", telefono: "", empresa: "", notas: "" });
      onCreated?.();
    } catch (err: any) {
      toast.error(err.message ?? "Error al crear el cliente");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-[#c9a566] hover:bg-[#b8914f] text-[#0e0f14] font-semibold">
        <Plus size={15} className="mr-1.5" /> Nuevo Cliente
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader><DialogTitle>Nuevo Cliente</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Nombre completo *</Label>
              <Input placeholder="Ej. Roberto Morales" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Empresa</Label>
                <Input placeholder="Nombre de empresa" value={form.empresa} onChange={(e) => set("empresa", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Cargo</Label>
                <Input placeholder="Ej. Gerente General" value={form.contacto} onChange={(e) => set("contacto", e.target.value)} />
              </div>
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
            <div className="space-y-1.5">
              <Label>Notas</Label>
              <Textarea placeholder="Notas adicionales..." value={form.notas} onChange={(e) => set("notas", e.target.value)} rows={2} />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={loading} className="bg-[#c9a566] hover:bg-[#b8914f] text-[#0e0f14] font-semibold">
                {loading ? <Loader2 size={15} className="mr-1.5 animate-spin" /> : <Plus size={15} className="mr-1.5" />}
                Agregar Cliente
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
