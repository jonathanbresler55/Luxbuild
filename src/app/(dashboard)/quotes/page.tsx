import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Upload, Sparkles } from "lucide-react";

export default function QuotesPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Cotizaciones</h1>
          <p className="text-zinc-500 mt-1">Crear y gestionar presupuestos de obra</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-zinc-300">
            <Upload size={16} className="mr-2" /> Subir Planos (AI)
          </Button>
          <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
            <Plus size={16} className="mr-2" /> Nueva Cotización
          </Button>
        </div>
      </div>

      {/* AI Upload section */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Sparkles className="text-amber-600" size={22} />
            </div>
            <div>
              <p className="font-semibold text-zinc-800">Análisis de Planos con AI</p>
              <p className="text-sm text-zinc-600 mt-1">
                Sube tus planos en PDF o imagen y la AI extraerá áreas, materiales y
                generará automáticamente las líneas de cotización con precios del
                mercado de Panamá.
              </p>
              <Button size="sm" className="mt-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                <Upload size={14} className="mr-2" /> Subir Planos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cotizaciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-zinc-400">
            <FileText className="mx-auto mb-2 opacity-30" size={36} />
            <p className="text-sm">No hay cotizaciones aún</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
