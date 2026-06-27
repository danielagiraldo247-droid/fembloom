import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import AppHeader from "@/components/nav/app-header";
import BottomNav from "@/components/nav/bottom-nav";
import IdleTimeout from "@/components/auth/idle-timeout";
import { generateNotifications } from "@/lib/notifications/generator";

/**
 * Layout compartido por todas las paginas autenticadas (Agenda, Calendario,
 * Jardin, Conocete, Perfil).
 *
 * Verifica autenticacion y onboarding antes de renderizar.
 * Agrega el header arriba y el bottom-nav abajo.
 */
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, supabase } = await requireUserAndOnboarding();

  // Traer datos en paralelo: perfil + ciclo + metodo
  const [profileRes, cycleRes, methodRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, avatar_url, discrete_mode")
      .eq("id", user.id)
      .single(),
    supabase
      .from("cycle_settings")
      .select("avg_cycle_length, avg_period_length, last_period_start")
      .eq("user_id", user.id)
      .maybeSingle(),
    supabase
      .from("contraceptive_methods")
      .select("method_type, next_action_date, daily_reminder_time")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .maybeSingle(),
  ]);

  // Calcular notificaciones activas
  const notifications = generateNotifications({
    cycleSettings: cycleRes.data,
    contraceptiveMethod: methodRes.data,
    discreteMode: profileRes.data?.discrete_mode || false,
  });

  return (
    <>
      <AppHeader
        fullName={profileRes.data?.full_name}
        avatarUrl={profileRes.data?.avatar_url}
        notificationCount={notifications.length}
      />
      <main className="pb-24 min-h-[calc(100vh-200px)]">{children}</main>
      <BottomNav />
      <IdleTimeout />
    </>
  );
}
