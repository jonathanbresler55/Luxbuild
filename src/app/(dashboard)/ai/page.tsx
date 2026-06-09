import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, TrendingUp, FileText, Calendar, AlertTriangle } from "lucide-react";

const agents = [
  {
    icon: AlertTriangle,
    color: "bg-orange-50 text-orange-600",
    title: "Project Manager AI",
    description: "Analiza todos los proyectos activos e identifica riesgos: retrasos, sobrecostos y problemas de flujo de caja.",
    action: "Analizar proyectos",
    prompt: "Analiza el estado de mis proyectos activos. Identifica cuáles están en riesgo de retraso o sobrecosto. Dame un resumen ejecutivo con prioridades.",
  },
  {
    icon: FileText,
    color: "bg-amber-50 text-amber-600",
    title: "Estimador AI",
    description: "Sube planos o describe el alcance del proyecto. La AI genera partidas de cotización con precios del mercado de Panamá.",
    action: "Generar estimado",
    prompt: "Genera un estimado de costos para un proyecto de construcción en Panamá. Incluye materiales, mano de obra y márgenes sugeridos.",
  },
  {
    icon: Calendar,
    color: "bg-blue-50 text-blue-600",
    title: "Follow-Up AI Semanal",
    description: "Consolida el avance de la semana, problemas reportados en bitácora y genera el reporte ejecutivo para el cliente.",
    action: "Generar reporte",
    prompt: "Genera un reporte semanal de avance de obra para el cliente. Incluye: avance programado vs real, problemas encontrados, próximas actividades y estado financiero.",
  },
  {
    icon: TrendingUp,
    color: "bg-green-50 text-green-600",
    title: "Análisis de Flujo de Caja",
    description: "Proyecta el flujo de caja del proyecto basado en el cronograma, compras pendientes y facturas por cobrar.",
    action: "Proyectar flujo",
    prompt: "Analiza el flujo de caja proyectado para los próximos 3 meses. Identifica semanas críticas donde pueda haber déficit de liquidez.",
  },
];

export default function AIPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
          <Sparkles className="text-amber-500" size={24} />
          Análisis AI
        </h1>
        <p className="text-zinc-500 mt-1">
          Agentes inteligentes powered by Claude para gestión de proyectos
        </p>
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {agents.map(({ icon: Icon, color, title, description, action }) => (
          <Card key={title} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${color}`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-zinc-900">{title}</p>
                  <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{description}</p>
                  <Button size="sm" className="mt-4 bg-zinc-900 hover:bg-zinc-700 text-white">
                    <Sparkles size={14} className="mr-2" />
                    {action}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Free-form AI chat */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles size={16} className="text-amber-500" />
            Consulta libre al AI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Pregúntale cualquier cosa sobre tus proyectos, presupuestos o cronogramas..."
            className="min-h-[120px] resize-none"
          />
          <div className="flex justify-end">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
              <Sparkles size={14} className="mr-2" />
              Consultar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Previous analyses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Análisis Anteriores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-zinc-400">
            <Sparkles className="mx-auto mb-2 opacity-30" size={32} />
            <p className="text-sm">No hay análisis previos</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
