import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import { Flower2, Heart, Sparkles, Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Mi agenda — FemBloom" };

/**
 * Pagina principal "Agenda" — corazon de la app.
 *
 * Por ahora muestra un saludo personalizado basico. En Dia 4 le agregaremos
 * el calculo de fases del ciclo, ovulacion, ventana fertil, etc.
 */
export default async function AgendaPage() {
  const { user, supabase } = await requireUserAndOnboarding();

  // Datos del perfil
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, trial_ends_at, objective")
    .eq("id", user.id)
    .single();

  // Datos del ciclo
  const { data: cycleSettings } = await supabase
    .from("cycle_settings")
    .select("avg_cycle_length, last_period_start")
    .eq("user_id", user.id)
    .single();

  const nombre = profile?.full_name?.split(" ")[0] || "amiga";

  // Calcular dia actual del ciclo
  let diaCiclo: number | null = null;
  if (cycleSettings?.last_period_start) {
    const inicio = new Date(cycleSettings.last_period_start);
    const hoy = new Date();
    const ms = hoy.getTime() - inicio.getTime();
    diaCiclo = Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
  }

  // Dias restantes de prueba
  let diasRestantes: number | null = null;
  if (profile?.trial_ends_at) {
    const ms =
      new Date(profile.trial_ends_at).getTime() - new Date().getTime();
    diasRestantes = Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-6 space-y-6 animate-florecer">
      {/* Saludo */}
      <header className="space-y-1">
        <p className="font-display text-4xl text-cacao">Hola {nombre},</p>
        {diaCiclo !== null && (
          <p className="text-cacao/70">
            Estás en el <span className="font-semibold text-coral">día {diaCiclo}</span> de tu ciclo 🌸
          </p>
        )}
      </header>

      {/* Tarjeta de bienvenida */}
      <div className="tarjeta space-y-3">
        <div className="flex items-center gap-3">
          <Flower2 className="w-7 h-7 text-coral" strokeWidth={1.5} />
          <div>
            <p className="font-semibold text-cacao">¡Bienvenida a tu agenda!</p>
            <p className="text-sm text-cacao/60">
              Aquí veras todo lo importante de tu día
            </p>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-cacao/80 uppercase tracking-wider">
          Próximamente en tu agenda
        </h2>
        <div className="grid gap-3">
          <Link
            href="/calendario"
            className="tarjeta flex items-center gap-3 hover:shadow-petalo transition"
          >
            <div className="w-10 h-10 rounded-full bg-lavanda/30 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-lavanda" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-cacao">Tu calendario</p>
              <p className="text-xs text-cacao/60">Registra tu ciclo día por día</p>
            </div>
          </Link>

          <Link
            href="/jardin"
            className="tarjeta flex items-center gap-3 hover:shadow-petalo transition"
          >
            <div className="w-10 h-10 rounded-full bg-menta/40 flex items-center justify-center">
              <Flower2 className="w-5 h-5 text-fertil" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-cacao">Tu jardín virtual</p>
              <p className="text-xs text-cacao/60">Crece con cada ciclo registrado</p>
            </div>
          </Link>

          <Link
            href="/conocete"
            className="tarjeta flex items-center gap-3 hover:shadow-petalo transition"
          >
            <div className="w-10 h-10 rounded-full bg-petalo/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-coral" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-cacao">Conócete</p>
              <p className="text-xs text-cacao/60">Información sobre tu cuerpo</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Info prueba */}
      {diasRestantes !== null && diasRestantes > 0 && (
        <div className="tarjeta bg-menta/20 border border-fertil/30">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-fertil mt-0.5" strokeWidth={1.5} />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-cacao">
                Te quedan {diasRestantes} días de tu prueba gratuita
              </p>
              <p className="text-cacao/70 mt-1">
                Disfruta de todas las funciones premium sin costo.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
