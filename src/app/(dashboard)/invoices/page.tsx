import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Receipt, Plus, Search } from "lucide-react";

const estadoConfig: Record<string, string> = {
  pendiente: "bg-amber-100 text-amber-700",
  pagada:    "bg-green-100 text-green-700",
  vencida:   "bg-red-100 text-red-700",
};

export default function InvoicesPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Facturas</h1>
          <p className="text-zinc-500 mt-1">Facturación vinculada a avance de obra</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
          <Plus size={16} className="mr-2" /> Nueva Factura
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pendiente", color: estadoConfig.pendiente, count: 0, monto: "$0" },
          { label: "Pagada", color: estadoConfig.pagada, count: 0, monto: "$0" },
          { label: "Vencida", color: estadoConfig.vencida, count: 0, monto: "$0" },
        ].map(({ label, color, count, monto }) => (
          <Card key={label}>
            <CardContent className="pt-4 pb-4 text-center">
              <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${color}`}>
                {label}
              </div>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs text-zinc-400">{monto}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
        <Input placeholder="Buscar factura..." className="pl-9" />
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10 text-zinc-400">
            <Receipt className="mx-auto mb-2 opacity-30" size={36} />
            <p className="text-sm">No hay facturas registradas</p>
            <p className="text-xs mt-1">Las facturas se vinculan automáticamente al % de avance de cada proyecto</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
