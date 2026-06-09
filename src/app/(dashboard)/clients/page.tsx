import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Plus, Search } from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Clientes</h1>
          <p className="text-zinc-500 mt-1">Base de datos de clientes LUXBUILD</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
          <Plus size={16} className="mr-2" /> Nuevo Cliente
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
        <Input placeholder="Buscar cliente..." className="pl-9" />
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10 text-zinc-400">
            <Users className="mx-auto mb-2 opacity-30" size={36} />
            <p className="text-sm">No hay clientes registrados</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
