import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import PlanificacionView from "./planificacion-view";

export const metadata = { title: "Planificación Familiar — FemBloom" };

export default async function PlanificacionPage() {
  const { user, supabase } = await requireUserAndOnboarding();

  const { data: currentMethod } = await supabase
    .from("contraceptive_methods")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  return <PlanificacionView initialMethod={currentMethod} />;
}
