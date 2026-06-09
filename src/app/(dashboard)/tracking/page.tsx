import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Upload, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function TrackingPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Avance de Obra</h1>
          <p className="text-zinc-500 mt-1">Seguimiento semanal por proyecto y actividad</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
          <Upload size={16} className="mr-2" /> Subir Reporte Semanal
        </Button>
      </div>

      {/* How architects submit */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-4">
            <Camera className="text-blue-500 shrink-0" size={20} />
            <div>
              <p className="text-sm font-semibold text-zinc-800">Reporte semanal de arquitectos</p>
              <p className="text-xs text-zinc-600 mt-0.5">
                Cada arquitecto encargado sube fotos + % de avance por actividad.
                El dashboard consolida todo automáticamente y genera el reporte al cliente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drag-and-drop photo upload */}
      <Card className="border-dashed border-2 border-zinc-300 bg-zinc-50 hover:border-amber-400 transition-colors cursor-pointer">
        <CardContent className="pt-10 pb-10 text-center">
          <Camera className="mx-auto mb-3 text-zinc-300" size={44} />
          <p className="text-sm font-semibold text-zinc-700">Arrastra fotos aquí o haz clic</p>
          <p className="text-xs text-zinc-400 mt-1">JPG, PNG hasta 20MB por foto</p>
          <Button size="sm" variant="outline" className="mt-4">Seleccionar fotos</Button>
        </CardContent>
      </Card>

      {/* Weekly reports table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Reportes Semanales</CardTitle>
          <div className="flex gap-2 text-xs text-zinc-400 items-center">
            <TrendingUp size={14} className="text-green-500" /> Adelantado
            <Minus size={14} className="text-amber-500" /> En tiempo
            <TrendingDown size={14} className="text-red-500" /> Retrasado
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-zinc-400">
            <Camera className="mx-auto mb-2 opacity-30" size={36} />
            <p className="text-sm">No hay reportes de avance</p>
            <p className="text-xs mt-1">Los arquitectos encargados suben sus reportes semanales aquí</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
