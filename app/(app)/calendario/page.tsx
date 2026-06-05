import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import CalendarView from "./calendar-view";

export const metadata = { title: "Calendario — FemBloom" };

/**
 * Pagina de calendario.
 *
 * Trae la configuracion del ciclo y los registros diarios desde Supabase,
 * y los pasa al componente cliente que maneja la interaccion.
 */
export default async function CalendarioPage() {
  const { user, supabase } = await requireUserAndOnboarding();

  // Configuracion del ciclo
  const { data: cycleSettings } = await supabase
    .from("cycle_settings")
    .select("avg_cycle_length, avg_period_length, last_period_start")
    .eq("user_id", user.id)
    .single();

  // Registros diarios (ultimos 200 para tener varios meses)
  const { data: dailyLogs } = await supabase
    .from("daily_logs")
    .select("log_date, is_menstruation, flow_intensity")
    .eq("user_id", user.id)
    .order("log_date", { ascending: false })
    .limit(200);

  if (!cycleSettings?.last_period_start) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-6">
        <p className="text-cacao">
          Falta configurar tu ciclo. Vuelve al onboarding.
        </p>
      </div>
    );
  }

  return (
    <CalendarView
      lastPeriodStart={cycleSettings.last_period_start}
      cycleLength={cycleSettings.avg_cycle_length}
      periodLength={cycleSettings.avg_period_length}
      initialLogs={dailyLogs || []}
    />
  );
}
