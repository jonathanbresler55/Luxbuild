import NewClientDialog from "@/components/dialogs/NewClientDialog";
import { getClientes } from "@/app/actions/clients";
import { Input } from "@/components/ui/input";
import { Users, Mail, Phone, Building } from "lucide-react";

export default async function ClientsPage() {
  let clients: any[] = [];
  try { clients = await getClientes(); } catch {}

  return (
    <div className="p-7 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight">Clientes</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Base de datos de clientes LUXBUILD</p>
        </div>
        <NewClientDialog />
      </div>

      {clients.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center py-20">
          <Users className="text-zinc-200 mb-3" size={44} />
          <p className="text-sm font-semibold text-zinc-400">No hay clientes registrados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {clients.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#c9a566]/10 flex items-center justify-center">
                  <span className="text-[#c9a566] font-bold text-sm">{c.nombre[0].toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">{c.nombre}</p>
                  {c.empresa && <p className="text-xs text-zinc-400">{c.empresa}</p>}
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-zinc-500">
                {c.email && <div className="flex items-center gap-2"><Mail size={11} />{c.email}</div>}
                {c.telefono && <div className="flex items-center gap-2"><Phone size={11} />{c.telefono}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
