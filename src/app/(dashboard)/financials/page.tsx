import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function FinancialsPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Control Financiero</h1>
        <p className="text-zinc-500 mt-1">Presupuesto vs. costo real, flujo de caja y órdenes de cambio</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Presupuesto Total", value: "$0", sub: "en todos los proyectos", icon: DollarSign, color: "bg-blue-50 text-blue-600" },
          { label: "Costo Ejecutado", value: "$0", sub: "0% del presupuesto", icon: TrendingUp, color: "bg-amber-50 text-amber-600" },
          { label: "Órdenes de Cambio", value: "$0", sub: "0 pendientes", icon: ArrowUpRight, color: "bg-purple-50 text-purple-600" },
          { label: "Por Facturar", value: "$0", sub: "0 facturas pendientes", icon: ArrowDownRight, color: "bg-green-50 text-green-600" },
        ].map(({ label, value, sub, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="flex items-start gap-3 pt-5">
              <div className={`p-2.5 rounded-xl shrink-0 ${color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500">{label}</p>
                <p className="text-xl font-bold text-zinc-900 mt-0.5">{value}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Budget vs actual by project */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Presupuesto vs. Real por Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10 text-zinc-400">
              <TrendingUp className="mx-auto mb-2 opacity-30" size={36} />
              <p className="text-sm">Sin proyectos en ejecución</p>
            </div>
          </CardContent>
        </Card>

        {/* Cash flow */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Flujo de Caja Proyectado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10 text-zinc-400">
              <DollarSign className="mx-auto mb-2 opacity-30" size={36} />
              <p className="text-sm">Sin datos de flujo de caja</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Órdenes de Cambio</CardTitle>
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
            Nueva OC
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-zinc-400">
            <AlertTriangle className="mx-auto mb-2 opacity-30" size={32} />
            <p className="text-sm">No hay órdenes de cambio</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
