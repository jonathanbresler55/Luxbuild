import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Plus, Search } from "lucide-react";

const estadoColors: Record<string, string> = {
  nuevo: "bg-zinc-100 text-zinc-700",
  contactado: "bg-blue-100 text-blue-700",
  calificado: "bg-purple-100 text-purple-700",
  propuesta: "bg-amber-100 text-amber-700",
  ganado: "bg-green-100 text-green-700",
  perdido: "bg-red-100 text-red-700",
};

const pipeline = [
  { estado: "nuevo", label: "Nuevo", count: 0, total: "$0" },
  { estado: "contactado", label: "Contactado", count: 0, total: "$0" },
  { estado: "calificado", label: "Calificado", count: 0, total: "$0" },
  { estado: "propuesta", label: "Propuesta", count: 0, total: "$0" },
  { estado: "ganado", label: "Ganado", count: 0, total: "$0" },
  { estado: "perdido", label: "Perdido", count: 0, total: "$0" },
];

export default function LeadsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Leads y Oportunidades</h1>
          <p className="text-zinc-500 mt-1">Pipeline comercial de LUXBUILD</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
          <Plus size={16} className="mr-2" /> Nuevo Lead
        </Button>
      </div>

      {/* Pipeline kanban summary */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {pipeline.map(({ estado, label, count, total }) => (
          <Card key={estado} className="text-center">
            <CardContent className="pt-4 pb-4">
              <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${estadoColors[estado]}`}>
                {label}
              </div>
              <p className="text-2xl font-bold text-zinc-900">{count}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{total}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
        <Input placeholder="Buscar lead..." className="pl-9" />
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10 text-zinc-400">
            <Target className="mx-auto mb-2 opacity-30" size={36} />
            <p className="text-sm">No hay leads registrados</p>
            <p className="text-xs mt-1">Agrega leads para hacer seguimiento de tu pipeline comercial</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
