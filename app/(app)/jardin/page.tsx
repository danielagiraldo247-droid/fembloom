import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import { Flower2, Sprout } from "lucide-react";

export const metadata = { title: "Mi jardín — FemBloom" };

export default async function JardinPage() {
  const { user, supabase } = await requireUserAndOnboarding();

  const { data: garden } = await supabase
    .from("garden_progress")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="max-w-2xl mx-auto px-6 py-6 space-y-6 animate-florecer">
      <header>
        <h1 className="font-display text-4xl text-cacao">Mi jardín 🌷</h1>
        <p className="text-cacao/70 mt-1">
          Crece con cada ciclo que registras
        </p>
      </header>

      <div className="tarjeta text-center py-12 space-y-4">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-fertil/20 blur-2xl rounded-full" />
          <Sprout
            className="relative w-20 h-20 text-fertil mx-auto animate-flotar"
            strokeWidth={1.5}
          />
        </div>
        <p className="font-display text-2xl text-cacao">
          Tu semilla {garden?.current_plant_stage === "seed" ? "está plantada" : "está creciendo"}
        </p>
        <p className="text-sm text-cacao/60 max-w-sm mx-auto">
          Sigue registrando tu ciclo diariamente y verás cómo tu jardín
          florece con el tiempo. ✨
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="tarjeta text-center">
          <p className="font-display text-3xl text-coral">
            {garden?.completed_cycles ?? 0}
          </p>
          <p className="text-xs text-cacao/60">Ciclos</p>
        </div>
        <div className="tarjeta text-center">
          <p className="font-display text-3xl text-lavanda">
            {garden?.streak_days ?? 0}
          </p>
          <p className="text-xs text-cacao/60">Racha</p>
        </div>
        <div className="tarjeta text-center">
          <p className="font-display text-3xl text-fertil">
            {garden?.total_flowers ?? 0}
          </p>
          <p className="text-xs text-cacao/60">Flores</p>
        </div>
      </div>

      <div className="tarjeta bg-petalo/15 text-center">
        <Flower2 className="w-8 h-8 text-coral mx-auto mb-2" strokeWidth={1.5} />
        <p className="text-sm text-cacao">
          Tu jardín completo se desbloquea en el <strong>Día 5</strong> 🌸
        </p>
      </div>
    </div>
  );
}
