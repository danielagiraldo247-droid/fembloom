import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import { Mail, Calendar, Target, Heart, Shield } from "lucide-react";
import LogoutButton from "./logout-button";
import DiscreteToggle from "./discrete-toggle";

export const metadata = { title: "Mi perfil — FemBloom" };

const objectiveLabels: Record<string, string> = {
  seeking_pregnancy: "Buscar embarazo",
  avoiding_pregnancy: "Evitar embarazo",
  tracking_only: "Solo seguimiento",
};

export default async function PerfilPage() {
  const { user, supabase } = await requireUserAndOnboarding();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, trial_ends_at, subscription_status, objective, discrete_mode")
    .eq("id", user.id)
    .single();

  const { data: cycleSettings } = await supabase
    .from("cycle_settings")
    .select("avg_cycle_length, avg_period_length, last_period_start")
    .eq("user_id", user.id)
    .single();

  const initials = (profile?.full_name || "F")
    .split(" ")
    .map((p: string) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  let diasRestantes: number | null = null;
  if (profile?.trial_ends_at) {
    const ms =
      new Date(profile.trial_ends_at).getTime() - new Date().getTime();
    diasRestantes = Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-6 space-y-6 animate-florecer">
      {/* Identidad */}
      <header className="text-center space-y-3">
        <div className="inline-block">
          <div className="w-24 h-24 rounded-full bg-petalo/40 overflow-hidden flex items-center justify-center mx-auto ring-4 ring-perla">
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt={profile?.full_name || ""}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-display text-3xl text-cacao">
                {initials}
              </span>
            )}
          </div>
        </div>
        <div>
          <p className="font-display text-3xl text-cacao">
            {profile?.full_name || "Sin nombre"}
          </p>
          <p className="text-sm text-cacao/60 flex items-center justify-center gap-1 mt-1">
            <Mail className="w-3.5 h-3.5" />
            {user.email}
          </p>
        </div>
      </header>

      {/* Suscripcion */}
      <div className="tarjeta bg-petalo/15 border border-petalo/30 space-y-2">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-coral" />
          <p className="font-semibold text-cacao text-sm">
            Plan{" "}
            {profile?.subscription_status === "trial"
              ? "Prueba gratuita"
              : "Premium"}
          </p>
        </div>
        {diasRestantes !== null && (
          <p className="text-xs text-cacao/70">
            {diasRestantes} días restantes
          </p>
        )}
      </div>

      {/* Mi ciclo */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-cacao/80 uppercase tracking-wider px-1">
          Mi ciclo
        </h2>
        <div className="tarjeta space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-cacao/60 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Duración del ciclo
            </span>
            <span className="font-medium text-cacao">
              {cycleSettings?.avg_cycle_length || "—"} días
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-petalo/20">
            <span className="text-cacao/60 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Duración de menstruación
            </span>
            <span className="font-medium text-cacao">
              {cycleSettings?.avg_period_length || "—"} días
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-petalo/20">
            <span className="text-cacao/60 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Mi objetivo
            </span>
            <span className="font-medium text-cacao">
              {profile?.objective
                ? objectiveLabels[profile.objective]
                : "Sin definir"}
            </span>
          </div>
        </div>
      </section>

      {/* Privacidad */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-cacao/80 uppercase tracking-wider px-1 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          Privacidad
        </h2>
        <DiscreteToggle initialValue={profile?.discrete_mode || false} />
      </section>

      {/* Cerrar sesion */}
      <div className="text-center pt-4">
        <LogoutButton />
      </div>
    </div>
  );
}
