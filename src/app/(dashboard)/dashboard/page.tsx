import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FolderOpen,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const stats = [
  { title: "Proyectos Activos", value: "0", icon: FolderOpen, color: "text-blue-600" },
  { title: "Cotizaciones", value: "0", icon: FileText, color: "text-amber-600" },
  { title: "Facturado (mes)", value: "$0", icon: DollarSign, color: "text-green-600" },
  { title: "Margen Promedio", value: "0%", icon: TrendingUp, color: "text-purple-600" },
];

const recentProjects = [
  // placeholder — se llenará con datos reales de Supabase
];

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-500 mt-1">Resumen general de LUXBUILD</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ title, value, icon: Icon, color }) => (
          <Card key={title}>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className={cn("p-3 rounded-xl bg-zinc-100", color)}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-sm text-zinc-500">{title}</p>
                <p className="text-2xl font-bold text-zinc-900">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Proyectos recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Proyectos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <div className="text-center py-10 text-zinc-400">
                <FolderOpen className="mx-auto mb-2 opacity-30" size={36} />
                <p className="text-sm">No hay proyectos aún</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Actividad reciente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10 text-zinc-400">
              <Clock className="mx-auto mb-2 opacity-30" size={36} />
              <p className="text-sm">Sin actividad reciente</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Avance de obras en curso */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Avance de Obras en Curso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-zinc-400">
            <CheckCircle2 className="mx-auto mb-2 opacity-30" size={36} />
            <p className="text-sm">No hay obras en ejecución</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
