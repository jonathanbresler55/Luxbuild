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
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Proyectos", icon: FolderOpen },
  { href: "/quotes", label: "Cotizaciones", icon: FileText },
  { href: "/schedule", label: "Cronograma", icon: Calendar },
  { href: "/tracking", label: "Avance de Obra", icon: Camera },
  { href: "/clients", label: "Clientes", icon: Users },
  { href: "/prices", label: "Base de Precios", icon: DollarSign },
  { href: "/purchases", label: "Compras", icon: ShoppingCart },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-zinc-900 text-white flex flex-col">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-zinc-700">
        <Building2 className="text-amber-400" size={28} />
        <div>
          <p className="font-bold text-lg leading-tight">LUXBUILD</p>
          <p className="text-zinc-400 text-xs">Project Management</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname.startsWith(href)
                ? "bg-amber-500 text-black"
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-zinc-700">
        <p className="text-zinc-500 text-xs">© 2025 LUXBUILD</p>
      </div>
    </aside>
  );
}
