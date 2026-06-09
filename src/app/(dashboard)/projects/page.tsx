import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, Plus, TrendingUp, AlertTriangle } from "lucide-react";

const estadoConfig: Record<string, { label: string; color: string }> = {
  planificacion: { label: "Planificación",  color: "bg-zinc-100 text-zinc-600" },
  en_ejecucion:  { label: "En Ejecución",   color: "bg-blue-100 text-blue-700" },
  pausado:       { label: "Pausado",         color: "bg-amber-100 text-amber-700" },
  completado:    { label: "Completado",      color: "bg-green-100 text-green-700" },
  cancelado:     { label: "Cancelado",       color: "bg-red-100 text-red-700" },
};

export default function ProjectsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Proyectos</h1>
          <p className="text-zinc-500 mt-1">Todos los proyectos de construcción LUXBUILD</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
          <Plus size={16} className="mr-2" /> Nuevo Proyecto
        </Button>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {Object.entries(estadoConfig).map(([key, { label, color }]) => (
          <Card key={key}>
            <CardContent className="pt-4 pb-4 text-center">
              <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${color}`}>
                {label}
              </div>
              <p className="text-2xl font-bold text-zinc-900">0</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project cards - example layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="border-dashed border-2 border-zinc-200 bg-zinc-50 flex items-center justify-center min-h-[200px] cursor-pointer hover:border-amber-400 transition-colors">
          <CardContent className="text-center pt-6">
            <FolderOpen className="mx-auto mb-2 text-zinc-300" size={36} />
            <p className="text-sm text-zinc-400 font-medium">Crear o convertir cotización en proyecto</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
