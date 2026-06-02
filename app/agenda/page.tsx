import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Flower2, Heart, Sparkles, Calendar } from "lucide-react";
import LogoutButton from "./logout-button";

export const metadata = {
  title: "Mi agenda — FemBloom",
};

/**
 * Pagina principal "Agenda" - solo accesible para usuarias autenticadas.
 *
 * - Si no hay sesion activa, redirige a /login.
 * - Si hay sesion, busca el perfil en la tabla profiles
 *   y muestra un saludo personalizado.
 */
export default async function AgendaPage() {
  const supabase = await createClient();

  // Obtener el usuario actual
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si no hay sesion, mandar a login
  if (!user) {
    redirect("/login");
  }

  // Buscar el perfil en la tabla profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, trial_ends_at, subscription_status")
    .eq("id", user.id)
    .single();

  const nombre = profile?.full_name || "amiga";

  // Calcular dias restantes de la prueba
  let diasRestantes: number | null = null;
  if (profile?.trial_ends_at) {
    const ms =
      new Date(profile.trial_ends_at).getTime() - new Date().getTime();
    diasRestantes = Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  }

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="max-w-2xl mx-auto space-y-6 animate-florecer">
        {/* Saludo */}
        <header className="space-y-2">
          <p className="font-display text-5xl text-cacao">Hola {nombre},</p>
          <p className="text-cacao/70">
            Estamos construyendo tu agenda personal 🌸
          </p>
        </header>

        {/* Tarjeta principal de bienvenida */}
        <div className="tarjeta space-y-4">
          <div className="flex items-center gap-3">
            <Flower2 className="w-8 h-8 text-coral" strokeWidth={1.5} />
            <div>
              <p className="font-semibold text-cacao">
                ¡Bienvenida a FemBloom!
              </p>
              <p className="text-sm text-cacao/60">
                Tu cuenta fue creada exitosamente
              </p>
            </div>
          </div>

          <div className="border-t border-petalo/30 pt-4 space-y-2">
            <p className="text-sm text-cacao/60">Tu correo:</p>
            <p className="text-cacao font-medium">{user.email}</p>
          </div>

          {diasRestantes !== null && (
            <div className="border-t border-petalo/30 pt-4 space-y-2">
              <p className="text-sm text-cacao/60">Tu prueba gratuita:</p>
              <p className="text-cacao">
                <span className="font-semibold text-fertil">
                  {diasRestantes} días restantes
                </span>{" "}
                de acceso completo a funciones premium
              </p>
            </div>
          )}
        </div>

        {/* Pendientes proximos */}
        <div className="tarjeta">
          <h2 className="font-semibold text-cacao mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-lavanda" />
            Lo que viene en tu agenda
          </h2>
          <ul className="space-y-2 text-sm text-cacao/70">
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-lavanda" />
              Tu calendario menstrual inteligente
            </li>
            <li className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-coral" />
              Predicciones de tu ciclo
            </li>
            <li className="flex items-center gap-2">
              <Flower2 className="w-4 h-4 text-fertil" />
              Tu jardín virtual personal
            </li>
          </ul>
          <p className="mt-4 text-xs text-cacao/50">
            Vamos paso a paso. Pronto verás aquí todas estas funciones 🌿
          </p>
        </div>

        {/* Cerrar sesion */}
        <div className="text-center pt-4">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
