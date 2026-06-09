"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Calendar,
  Camera,
  Users,
  DollarSign,
  ShoppingCart,
  Building2,
  Target,
  BookOpen,
  TrendingUp,
  Sparkles,
  Receipt,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navSections = [
  {
    label: "General",
    color: "bg-zinc-600",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "CRM Comercial",
    color: "bg-violet-500",
    items: [
      { href: "/clients", label: "Clientes", icon: Users },
      { href: "/leads", label: "Leads & Oportunidades", icon: Target },
      { href: "/quotes", label: "Cotizaciones", icon: FileText },
    ],
  },
  {
    label: "Ejecución de Obra",
    color: "bg-blue-500",
    items: [
      { href: "/projects", label: "Proyectos", icon: FolderOpen },
      { href: "/schedule", label: "Cronograma", icon: Calendar },
      { href: "/tracking", label: "Avance de Obra", icon: Camera },
      { href: "/bitacora", label: "Bitácora", icon: BookOpen },
    ],
  },
  {
    label: "Finanzas",
    color: "bg-emerald-500",
    items: [
      { href: "/prices", label: "Base de Precios", icon: DollarSign },
      { href: "/purchases", label: "Compras / OC", icon: ShoppingCart },
      { href: "/invoices", label: "Facturas", icon: Receipt },
      { href: "/financials", label: "Control Financiero", icon: TrendingUp },
    ],
  },
  {
    label: "Inteligencia AI",
    color: "bg-amber-500",
    items: [
      { href: "/ai", label: "Agentes AI", icon: Sparkles },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-[#0f1117] text-white flex flex-col shrink-0 border-r border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
          <Building2 size={20} className="text-black" />
        </div>
        <div>
          <p className="font-bold text-[15px] leading-tight tracking-tight">LUXBUILD</p>
          <p className="text-[11px] text-zinc-500 font-medium">Project Management</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label}>
            <div className="flex items-center gap-2 px-2 mb-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${section.color}`} />
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
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
                      "group flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all",
                      active
                        ? "bg-white/10 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                    )}
                  >
                    <Icon
                      size={15}
                      className={active ? "text-amber-400" : "text-zinc-500 group-hover:text-zinc-300"}
                    />
                    <span className="flex-1">{label}</span>
                    {active && <ChevronRight size={12} className="text-zinc-500" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 py-3 border-t border-white/5">
        <p className="text-[11px] text-zinc-600 font-medium">© 2025 LUXBUILD</p>
      </div>
    </aside>
  );
}
