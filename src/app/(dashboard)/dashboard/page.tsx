import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FolderOpen, FileText, DollarSign, TrendingUp,
  AlertTriangle, CheckCircle2, Clock, Target,
  ArrowUpRight, ArrowDownRight,
} from "lucide-react";

const kpis = [
  {
    label: "Proyectos Activos",
    value: "0",
    delta: null,
    icon: FolderOpen,
    bg: "bg-blue-500",
    light: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    label: "Cotizaciones Abiertas",
    value: "0",
    delta: null,
    icon: FileText,
    bg: "bg-violet-500",
    light: "bg-violet-50",
    text: "text-violet-600",
  },
  {
    label: "Facturado (mes)",
    value: "$0",
    delta: null,
    icon: DollarSign,
    bg: "bg-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    label: "Margen Promedio",
    value: "0%",
    delta: null,
    icon: TrendingUp,
    bg: "bg-amber-500",
    light: "bg-amber-50",
    text: "text-amber-600",
  },
];

const pipelineStages = [
  { label: "Nuevo",        count: 0, color: "bg-zinc-400"   },
  { label: "Contactado",   count: 0, color: "bg-blue-400"   },
  { label: "Propuesta",    count: 0, color: "bg-violet-400" },
  { label: "Negociación",  count: 0, color: "bg-amber-400"  },
  { label: "Ganado",       count: 0, color: "bg-emerald-400" },
];

export default function DashboardPage() {
  return (
    <div className="p-7 space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight">Dashboard Ejecutivo</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Resumen general — LUXBUILD</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-zinc-400 font-medium">Hoy</p>
          <p className="text-sm font-semibold text-zinc-700">
            {new Date().toLocaleDateString("es-PA", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* KPI row — Monday-style colored cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(({ label, value, icon: Icon, bg, light, text }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${light} ${text} flex items-center justify-center`}>
                <Icon size={20} />
              </div>
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${bg}`} />
            </div>
            <p className="text-[28px] font-bold text-zinc-900 leading-none">{value}</p>
            <p className="text-xs text-zinc-500 font-medium mt-1.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Projects progress — Buildertrend style */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-zinc-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-zinc-900 text-sm">Avance de Proyectos en Ejecución</h2>
            <span className="text-xs text-zinc-400 bg-zinc-100 rounded-full px-2 py-0.5">0 activos</span>
          </div>
          <div className="flex flex-col items-center justify-center py-10 text-zinc-300">
            <FolderOpen size={40} className="mb-2" />
            <p className="text-sm text-zinc-400">No hay proyectos en ejecución</p>
          </div>
        </div>

        {/* AI Alerts — Procore style */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={15} className="text-orange-500" />
            <h2 className="font-semibold text-zinc-900 text-sm">Alertas AI</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-8 text-zinc-300">
            <CheckCircle2 size={36} className="mb-2 text-emerald-200" />
            <p className="text-sm text-zinc-400">Sin alertas activas</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Pipeline CRM — Monday Kanban-inspired */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5">
          <h2 className="font-semibold text-zinc-900 text-sm mb-4">Pipeline Comercial</h2>
          <div className="space-y-2.5">
            {pipelineStages.map(({ label, count, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm text-zinc-600">{label}</span>
                  <span className="font-semibold text-sm text-zinc-900">{count}</span>
                </div>
                <div className="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full`} style={{ width: "0%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5">
          <h2 className="font-semibold text-zinc-900 text-sm mb-4">Actividad Reciente</h2>
          <div className="flex flex-col items-center justify-center py-8 text-zinc-300">
            <Clock size={36} className="mb-2" />
            <p className="text-sm text-zinc-400">Sin actividad reciente</p>
          </div>
        </div>
      </div>
    </div>
  );
}
