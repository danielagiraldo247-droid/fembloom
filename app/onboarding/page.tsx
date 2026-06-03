import { requireUser } from "@/lib/auth/helpers";
import { redirect } from "next/navigation";
import OnboardingFlow from "./onboarding-flow";

export const metadata = { title: "Bienvenida — FemBloom" };

/**
 * Pantalla de onboarding (primera vez que entra la usuaria).
 *
 * - Si ya completo onboarding, redirige a /agenda.
 * - Si no, muestra las 3 pantallas de configuracion inicial.
 */
export default async function OnboardingPage() {
  const { user, supabase } = await requireUser();

  // Si ya tiene cycle_settings, ya completo onboarding
  const { data: cycleSettings } = await supabase
    .from("cycle_settings")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (cycleSettings) {
    redirect("/agenda");
  }

  // Obtener nombre del perfil
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const nombre = profile?.full_name?.split(" ")[0] || "amiga";

  return <OnboardingFlow nombre={nombre} />;
}
