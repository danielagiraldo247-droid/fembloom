import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import ReportesView from "./reportes-view";

export const metadata = { title: "Reportes Médicos — FemBloom" };

export default async function ReportesPage() {
  const { user, supabase } = await requireUserAndOnboarding();

  // Traemos los datos basicos para el reporte. La descarga real
  // se genera en el cliente con react-pdf cuando la usuaria pulsa.
  const [profileRes, cycleRes, methodRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, objective")
      .eq("id", user.id)
      .single(),
    supabase
      .from("cycle_settings")
      .select("avg_cycle_length, avg_period_length, last_period_start")
      .eq("user_id", user.id)
      .single(),
    supabase
      .from("contraceptive_methods")
      .select("method_type")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .maybeSingle(),
  ]);

  return (
    <ReportesView
      patientName={profileRes.data?.full_name || "Paciente"}
      email={user.email || ""}
      objective={profileRes.data?.objective}
      cycleLength={cycleRes.data?.avg_cycle_length || 28}
      periodLength={cycleRes.data?.avg_period_length || 5}
      lastPeriodStart={cycleRes.data?.last_period_start || ""}
      contraceptiveMethod={methodRes.data?.method_type}
    />
  );
}
