import NewLeadDialog from "@/components/dialogs/NewLeadDialog";
import { getLeads } from "@/app/actions/leads";
import { Target, DollarSign } from "lucide-react";

const estadoConfig: Record<string, { label: string; color: string }> = {
  nuevo:      { label: "Nuevo",       color: "bg-zinc-100 text-zinc-600" },
  contactado: { label: "Contactado",  color: "bg-sky-100 text-sky-700" },
  calificado: { label: "Calificado",  color: "bg-violet-100 text-violet-700" },
  propuesta:  { label: "Propuesta",   color: "bg-amber-100 text-amber-700" },
  ganado:     { label: "Ganado",      color: "bg-emerald-100 text-emerald-700" },
  perdido:    { label: "Perdido",     color: "bg-red-100 text-red-700" },
};

export default async function LeadsPage() {
  let leads: any[] = [];
  try { leads = await getLeads(); } catch {}

  const countByEstado = (e: string) => leads.filter((l) => l.estado === e).length;

  return (
    <div className="p-7 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight">Leads & Oportunidades</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Pipeline comercial de LUXBUILD</p>
        </div>
        <NewLeadDialog />
      </div>

      {/* Pipeline summary */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {Object.entries(estadoConfig).map(([key, { label, color }]) => (
          <div key={key} className="bg-white rounded-xl p-4 text-center shadow-sm border border-zinc-100">
            <div className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold mb-2 ${color}`}>{label}</div>
            <p className="text-2xl font-bold text-zinc-900">{countByEstado(key)}</p>
          </div>
        ))}
      </div>

      {leads.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center py-20">
          <Target className="text-zinc-200 mb-3" size={44} />
          <p className="text-sm font-semibold text-zinc-400">No hay leads registrados</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500">Contacto</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500">Email</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500">Fuente</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500">Estado</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-zinc-500">Valor Est.</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => {
                const cfg = estadoConfig[l.estado] ?? estadoConfig.nuevo;
                return (
                  <tr key={l.id} className="border-b border-zinc-50 hover:bg-zinc-50 cursor-pointer transition-colors">
                    <td className="px-5 py-3 font-medium text-zinc-800">{l.nombre}</td>
                    <td className="px-5 py-3 text-zinc-500">{l.email ?? "—"}</td>
                    <td className="px-5 py-3 text-zinc-500">{l.fuente ?? "—"}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${cfg.color}`}>{cfg.label}</span>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-zinc-800">
                      {l.valor_estimado ? `$${Number(l.valor_estimado).toLocaleString()}` : "—"}
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
