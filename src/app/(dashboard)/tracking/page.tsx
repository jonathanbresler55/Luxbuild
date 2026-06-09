import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Upload, Plus } from "lucide-react";

export default function TrackingPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Avance de Obra</h1>
          <p className="text-zinc-500 mt-1">Seguimiento semanal con fotos por proyecto</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
          <Upload size={16} className="mr-2" /> Subir Reporte
        </Button>
      </div>

      {/* Upload zone */}
      <Card className="border-dashed border-2 border-zinc-300 bg-zinc-50 hover:border-amber-400 transition-colors cursor-pointer">
        <CardContent className="pt-8 pb-8 text-center">
          <Camera className="mx-auto mb-3 text-zinc-300" size={40} />
          <p className="text-sm font-medium text-zinc-600">
            Arrastra fotos aquí o haz clic para subir
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            El arquitecto encargado puede subir fotos de avance por actividad
          </p>
          <Button size="sm" variant="outline" className="mt-4">
            Seleccionar fotos
          </Button>
        </CardContent>
      </Card>

      {/* Weekly reports placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Reportes Semanales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-zinc-400">
            <Camera className="mx-auto mb-2 opacity-30" size={36} />
            <p className="text-sm">No hay reportes de avance registrados</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
