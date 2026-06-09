import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Camera, AlertCircle, ChevronRight } from "lucide-react";

export default function BitacoraPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Bitácora de Obra</h1>
          <p className="text-zinc-500 mt-1">Registro diario de avance, problemas y próximos pasos</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
          <Plus size={16} className="mr-2" /> Nueva Entrada
        </Button>
      </div>

      {/* How it works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: Plus,
            title: "Registra la entrada",
            desc: "Arquitecto o responsable documenta actividades del día, avance y problemas encontrados.",
            color: "text-blue-600 bg-blue-50",
          },
          {
            icon: Camera,
            title: "Agrega fotos",
            desc: "Sube fotos del avance de obra directamente desde el sitio. Quedan vinculadas al proyecto.",
            color: "text-amber-600 bg-amber-50",
          },
          {
            icon: ChevronRight,
            title: "Genera reporte",
            desc: "La AI consolida entradas de la semana en un reporte ejecutivo para el cliente.",
            color: "text-green-600 bg-green-50",
          },
        ].map(({ icon: Icon, title, desc, color }) => (
          <Card key={title}>
            <CardContent className="pt-5 pb-5">
              <div className={`p-2.5 rounded-xl w-fit mb-3 ${color}`}>
                <Icon size={20} />
              </div>
              <p className="font-semibold text-sm text-zinc-800">{title}</p>
              <p className="text-xs text-zinc-500 mt-1">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter by project */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Entradas Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-zinc-400">
            <BookOpen className="mx-auto mb-2 opacity-30" size={36} />
            <p className="text-sm">No hay entradas de bitácora</p>
            <p className="text-xs mt-1">Las entradas diarias de los arquitectos aparecerán aquí</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
