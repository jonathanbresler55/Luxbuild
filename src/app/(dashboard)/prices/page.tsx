import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Plus, Search, Upload, Sparkles } from "lucide-react";

const categories = [
  "Estructura", "Mampostería", "Acabados", "Eléctrico", "Hidráulico",
  "Techos", "Ventanas y Puertas", "Pisos", "Pintura", "Mano de Obra"
];

export default function PricesPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Base de Precios</h1>
          <p className="text-zinc-500 mt-1">Precios del mercado Panamá + proyectos anteriores</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload size={16} className="mr-2" /> Importar
          </Button>
          <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
            <Plus size={16} className="mr-2" /> Agregar Item
          </Button>
        </div>
      </div>

      {/* AI suggestion banner */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-3">
            <Sparkles className="text-blue-500 shrink-0" size={20} />
            <p className="text-sm text-zinc-700">
              <span className="font-semibold">AI Pricing:</span> La AI puede sugerir
              precios basados en el mercado actual de Panamá y compararlos con tu
              historial de proyectos anteriores.
            </p>
            <Button size="sm" variant="outline" className="ml-auto shrink-0 border-blue-300 text-blue-700">
              Actualizar precios con AI
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="cursor-pointer bg-amber-500 text-black hover:bg-amber-600">
          Todos
        </Badge>
        {categories.map((cat) => (
          <Badge key={cat} variant="secondary" className="cursor-pointer hover:bg-zinc-200">
            {cat}
          </Badge>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
        <Input placeholder="Buscar material o servicio..." className="pl-9" />
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10 text-zinc-400">
            <DollarSign className="mx-auto mb-2 opacity-30" size={36} />
            <p className="text-sm">No hay precios registrados aún</p>
            <p className="text-xs mt-1">Agrega items manualmente o usa AI para poblar la base de precios</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
