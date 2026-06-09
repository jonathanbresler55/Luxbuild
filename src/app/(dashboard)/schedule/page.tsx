import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";

export default function SchedulePage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Cronograma</h1>
          <p className="text-zinc-500 mt-1">Planificación semanal de actividades por proyecto</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
          <Plus size={16} className="mr-2" /> Nuevo Cronograma
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-16 text-zinc-400">
            <Calendar className="mx-auto mb-3 opacity-30" size={48} />
            <p className="text-sm font-medium">Gantt semanal por proyecto</p>
            <p className="text-xs mt-1">Selecciona un proyecto para ver o crear su cronograma</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
