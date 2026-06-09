import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Upload, Sparkles, Search, ArrowRight } from "lucide-react";

const estadoConfig: Record<string, { label: string; color: string }> = {
  borrador:     { label: "Borrador",     color: "bg-zinc-100 text-zinc-600" },
  enviada:      { label: "Enviada",      color: "bg-blue-100 text-blue-700" },
  negociacion:  { label: "Negociación",  color: "bg-amber-100 text-amber-700" },
  ganada:       { label: "Ganada ✓",     color: "bg-green-100 text-green-700" },
  perdida:      { label: "Perdida",      color: "bg-red-100 text-red-700" },
};

const estadoStats = Object.entries(estadoConfig).map(([key, { label, color }]) => ({
  key, label, color, count: 0, monto: "$0",
}));

export default function QuotesPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Cotizaciones</h1>
          <p className="text-zinc-500 mt-1">Presupuestos y propuestas comerciales</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload size={16} className="mr-2" /> Analizar Planos (AI)
          </Button>
          <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
            <Plus size={16} className="mr-2" /> Nueva Cotización
          </Button>
        </div>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {estadoStats.map(({ key, label, color, count, monto }) => (
          <Card key={key}>
            <CardContent className="pt-4 pb-4 text-center">
              <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${color}`}>
                {label}
              </div>
              <p className="text-2xl font-bold text-zinc-900">{count}</p>
              <p className="text-xs text-zinc-400">{monto}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI analysis banner */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-amber-100 rounded-xl shrink-0">
              <Sparkles className="text-amber-600" size={20} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-zinc-800">Estimador AI — Análisis de Planos</p>
              <p className="text-sm text-zinc-600 mt-1">
                Sube planos PDF o imágenes. La AI extrae áreas, identifica materiales y genera
                automáticamente las partidas de cotización con precios del mercado de Panamá.
              </p>
            </div>
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold shrink-0">
              <Upload size={14} className="mr-2" /> Subir Planos
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Convert to project banner */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-3">
            <ArrowRight className="text-green-600 shrink-0" size={20} />
            <p className="text-sm text-zinc-700">
              <span className="font-semibold">Cotización Ganada →</span> Convierte directamente
              en proyecto con un clic. Se copian cliente, alcance, presupuesto y fechas.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
        <Input placeholder="Buscar cotización..." className="pl-9" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Todas las Cotizaciones</CardTitle>
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
