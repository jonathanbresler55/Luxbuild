"use client";

import { useState, useEffect } from "react";
import NewProjectDialog from "@/components/dialogs/NewProjectDialog";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, Calendar, User, DollarSign } from "lucide-react";

const estadoConfig: Record<string, { label: string; color: string }> = {
  planificacion: { label: "Planificación",  color: "bg-zinc-100 text-zinc-600" },
  en_ejecucion:  { label: "En Ejecución",   color: "bg-sky-100 text-sky-700" },
  pausado:       { label: "Pausado",         color: "bg-amber-100 text-amber-700" },
  completado:    { label: "Completado",      color: "bg-emerald-100 text-emerald-700" },
  cancelado:     { label: "Cancelado",       color: "bg-red-100 text-red-700" },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projects").then((r) => r.json()).then(setProjects).catch(() => {});
  }, []);

  return (
    <div className="p-7 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight">Proyectos</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Todos los proyectos de construcción LUXBUILD</p>
        </div>
        <NewProjectDialog onCreated={() => fetch("/api/projects").then((r) => r.json()).then(setProjects).catch(() => {})} />
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-5 gap-3">
        {Object.entries(estadoConfig).map(([key, { label, color }]) => {
          const count = projects.filter((p) => p.estado === key).length;
          return (
            <div key={key} className="bg-white rounded-xl p-4 text-center shadow-sm border border-zinc-100">
              <div className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold mb-2 ${color}`}>{label}</div>
              <p className="text-2xl font-bold text-zinc-900">{count}</p>
            </div>
          );
        })}
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center py-20">
          <FolderOpen className="text-zinc-200 mb-3" size={44} />
          <p className="text-sm font-semibold text-zinc-400">No hay proyectos aún</p>
          <p className="text-xs text-zinc-300 mt-1">Crea tu primer proyecto con el botón de arriba</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {projects.map((p) => {
            const cfg = estadoConfig[p.estado] ?? estadoConfig.planificacion;
            return (
              <div key={p.id} className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[11px] text-zinc-400 font-mono">{p.numero}</p>
                    <p className="font-semibold text-zinc-900 mt-0.5">{p.nombre}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${cfg.color}`}>{cfg.label}</span>
                </div>
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Avance real</span>
                    <span className="font-semibold text-zinc-700">{p.avance_real ?? 0}%</span>
                  </div>
                  <Progress value={p.avance_real ?? 0} className="h-1.5" />
                </div>
                <div className="flex items-center gap-4 text-xs text-zinc-400">
                  {p.responsable && <span className="flex items-center gap-1"><User size={11} />{p.responsable}</span>}
                  {p.fecha_inicio && <span className="flex items-center gap-1"><Calendar size={11} />{new Date(p.fecha_inicio).toLocaleDateString("es-PA")}</span>}
                  {p.presupuesto && <span className="ml-auto font-semibold text-zinc-800 flex items-center gap-0.5"><DollarSign size={11} />{Number(p.presupuesto).toLocaleString()}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
