import NewQuoteDialog from "@/components/dialogs/NewQuoteDialog";
import { getCotizaciones } from "@/app/actions/quotes";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Sparkles, ArrowRight, Calendar } from "lucide-react";

const estadoConfig: Record<string, { label: string; color: string }> = {
  borrador:    { label: "Borrador",    color: "bg-zinc-100 text-zinc-600" },
  enviada:     { label: "Enviada",     color: "bg-sky-100 text-sky-700" },
  negociacion: { label: "Negociación", color: "bg-amber-100 text-amber-700" },
  ganada:      { label: "Ganada ✓",    color: "bg-emerald-100 text-emerald-700" },
  perdida:     { label: "Perdida",     color: "bg-red-100 text-red-700" },
};

export default async function QuotesPage() {
  let quotes: any[] = [];
  try { quotes = await getCotizaciones(); } catch {}

  const countByEstado = (e: string) => quotes.filter((q) => q.estado === e).length;

  return (
    <div className="p-7 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight">Cotizaciones</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Presupuestos y propuestas comerciales</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-zinc-600">
            <Upload size={14} className="mr-1.5" /> Analizar Planos (AI)
          </Button>
          <NewQuoteDialog />
        </div>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-5 gap-3">
        {Object.entries(estadoConfig).map(([key, { label, color }]) => (
          <div key={key} className="bg-white rounded-xl p-4 text-center shadow-sm border border-zinc-100">
            <div className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold mb-2 ${color}`}>{label}</div>
            <p className="text-2xl font-bold text-zinc-900">{countByEstado(key)}</p>
          </div>
        ))}
      </div>

      {/* AI banner */}
      <div className="bg-gradient-to-r from-[#c9a566]/10 to-amber-50 border border-[#c9a566]/20 rounded-2xl p-4 flex items-center gap-4">
        <div className="w-9 h-9 rounded-xl bg-[#c9a566]/20 flex items-center justify-center shrink-0">
          <Sparkles size={18} className="text-[#c9a566]" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-zinc-800">Estimador AI</p>
          <p className="text-xs text-zinc-500 mt-0.5">Sube planos y la AI genera las partidas de cotización con precios del mercado de Panamá.</p>
        </div>
        <Button size="sm" variant="outline" className="border-[#c9a566]/40 text-[#c9a566] shrink-0">
          Subir planos
        </Button>
      </div>

      {quotes.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center py-20">
          <FileText className="text-zinc-200 mb-3" size={44} />
          <p className="text-sm font-semibold text-zinc-400">No hay cotizaciones aún</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500">Número</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500">Proyecto</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500">Cliente</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500">Estado</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-zinc-500">Monto</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => {
                const cfg = estadoConfig[q.estado] ?? estadoConfig.borrador;
                return (
                  <tr key={q.id} className="border-b border-zinc-50 hover:bg-zinc-50 cursor-pointer transition-colors">
                    <td className="px-5 py-3 text-xs text-zinc-400 font-mono">{q.numero}</td>
                    <td className="px-5 py-3 font-medium text-zinc-800">{q.nombre}</td>
                    <td className="px-5 py-3 text-zinc-500">{q.clientes?.nombre ?? "—"}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${cfg.color}`}>{cfg.label}</span>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-zinc-800">
                      {q.monto_total ? `$${Number(q.monto_total).toLocaleString()}` : "—"}
                    </td>
                    <td className="px-5 py-3 text-zinc-400 text-xs">
                      {q.fecha_emision ? new Date(q.fecha_emision).toLocaleDateString("es-PA") : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
