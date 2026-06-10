"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FolderOpen, FileText, Calendar,
  Camera, Users, DollarSign, ShoppingCart, Building2,
  BookOpen, TrendingUp, Sparkles, Receipt, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navSections = [
  {
    label: "General",
    dot: "bg-zinc-500",
    items: [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "CRM Comercial",
    dot: "bg-[#c9a566]",
    items: [
      { href: "/clients", label: "Clientes", icon: Users },
      { href: "/quotes", label: "Cotizaciones", icon: FileText },
    ],
  },
  {
    label: "Ejecución de Obra",
    dot: "bg-sky-400",
    items: [
      { href: "/projects", label: "Proyectos", icon: FolderOpen },
      { href: "/schedule", label: "Cronograma", icon: Calendar },
      { href: "/tracking", label: "Avance de Obra", icon: Camera },
      { href: "/bitacora", label: "Bitácora", icon: BookOpen },
    ],
  },
  {
    label: "Finanzas",
    dot: "bg-emerald-400",
    items: [
      { href: "/prices", label: "Base de Precios", icon: DollarSign },
      { href: "/purchases", label: "Compras / OC", icon: ShoppingCart },
      { href: "/invoices", label: "Facturas", icon: Receipt },
      { href: "/financials", label: "Control Financiero", icon: TrendingUp },
    ],
  },
  {
    label: "Inteligencia AI",
    dot: "bg-violet-400",
    items: [{ href: "/ai", label: "Agentes AI", icon: Sparkles }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] min-h-screen bg-[#0e0f14] text-white flex flex-col shrink-0 border-r border-white/[0.05]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-[18px] border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-[#c9a566] flex items-center justify-center shrink-0">
          <Building2 size={17} className="text-[#0e0f14]" />
        </div>
        <div>
          <p className="font-bold text-[14px] leading-tight tracking-tight text-white">LUXBUILD</p>
          <p className="text-[10px] text-zinc-500 font-medium tracking-wide">Project Management</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label}>
            <div className="flex items-center gap-2 px-2 mb-1">
              <div className={`w-1 h-1 rounded-full ${section.dot}`} />
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-600">
                {section.label}
              </p>
            </div>
            <div className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "group flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[12.5px] font-medium transition-all",
                      active
                        ? "bg-white/[0.07] text-white"
                        : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
                    )}
                  >
                    <Icon
                      size={14}
                      className={active ? "text-[#c9a566]" : "text-zinc-600 group-hover:text-zinc-400"}
                    />
                    <span className="flex-1 leading-none">{label}</span>
                    {active && <div className="w-1 h-1 rounded-full bg-[#c9a566]" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 py-3 border-t border-white/[0.05]">
        <p className="text-[10px] text-zinc-700 font-medium">© 2025 LUXBUILD</p>
      </div>
    </aside>
  );
}
