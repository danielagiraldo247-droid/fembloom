import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Garantiza que haya una sesion activa.
 * Si no hay usuaria autenticada, redirige a /login.
 */
export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { user, supabase };
}

/**
 * Garantiza autenticacion Y que ya complete el onboarding.
 * Si falta onboarding, redirige a /onboarding.
 */
export async function requireUserAndOnboarding() {
  const { user, supabase } = await requireUser();

  const { data: cycleSettings } = await supabase
    .from("cycle_settings")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!cycleSettings) {
    redirect("/onboarding");
  }

  return { user, supabase };
}
