import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderOpen, Plus } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Proyectos</h1>
          <p className="text-zinc-500 mt-1">Gestión de todos los proyectos LUXBUILD</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
          <Plus size={16} className="mr-2" /> Nuevo Proyecto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Placeholder — proyectos desde Supabase */}
        <Card className="border-dashed border-2 border-zinc-200 bg-zinc-50 flex items-center justify-center min-h-[160px] cursor-pointer hover:border-amber-400 transition-colors">
          <CardContent className="text-center pt-6">
            <FolderOpen className="mx-auto mb-2 text-zinc-300" size={32} />
            <p className="text-sm text-zinc-400">Crear primer proyecto</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
