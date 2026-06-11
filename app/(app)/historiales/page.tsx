import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import HistorialesView from "./historiales-view";

export const metadata = { title: "Mis historiales — FemBloom" };

export default async function HistorialesPage() {
  const { user, supabase } = await requireUserAndOnboarding();

  const [cyclesRes, dailyLogsRes, symptomsRes, moodsRes, relationsRes] =
    await Promise.all([
      supabase
        .from("cycles")
        .select("id, start_date, end_date, cycle_length, period_length")
        .eq("user_id", user.id)
        .order("start_date", { ascending: false })
        .limit(50),
      supabase
        .from("daily_logs")
        .select("log_date, is_menstruation, flow_intensity, note")
        .eq("user_id", user.id)
        .order("log_date", { ascending: false })
        .limit(100),
      supabase
        .from("symptoms")
        .select("log_date, symptom_type, body_zone")
        .eq("user_id", user.id)
        .order("log_date", { ascending: false })
        .limit(200),
      supabase
        .from("moods")
        .select("log_date, mood_type")
        .eq("user_id", user.id)
        .order("log_date", { ascending: false })
        .limit(200),
      supabase
        .from("relations")
        .select("relation_date, with_protection, in_fertile_window")
        .eq("user_id", user.id)
        .order("relation_date", { ascending: false })
        .limit(50),
    ]);

  return (
    <HistorialesView
      cycles={cyclesRes.data || []}
      dailyLogs={dailyLogsRes.data || []}
      symptoms={symptomsRes.data || []}
      moods={moodsRes.data || []}
      relations={relationsRes.data || []}
    />
  );
}
