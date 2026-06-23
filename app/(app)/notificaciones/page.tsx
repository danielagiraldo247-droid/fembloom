import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import { generateNotifications } from "@/lib/notifications/generator";
import { Bell, BellOff, Calendar, Heart, Pill, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Notificaciones — FemBloom" };

const ICONS = {
  period: Heart,
  ovulation: Sparkles,
  fertile: Sparkles,
  method: Pill,
  cycle: Calendar,
};

const PRIORITY_STYLES = {
  high: {
    bg: "bg-coral/10",
    border: "border-coral/30",
    text: "text-coral",
    badge: "bg-coral/20",
  },
  medium: {
    bg: "bg-lavanda/10",
    border: "border-lavanda/30",
    text: "text-lavanda",
    badge: "bg-lavanda/20",
  },
  low: {
    bg: "bg-fertil/10",
    border: "border-fertil/30",
    text: "text-fertil",
    badge: "bg-fertil/20",
  },
};

export default async function NotificacionesPage() {
  const { user, supabase } = await requireUserAndOnboarding();

  // Cargar datos en paralelo
  const [cycleRes, methodRes, profileRes] = await Promise.all([
    supabase
      .from("cycle_settings")
      .select("avg_cycle_length, avg_period_length, last_period_start")
      .eq("user_id", user.id)
      .single(),
    supabase
      .from("contraceptive_methods")
      .select("method_type, next_action_date, daily_reminder_time")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .maybeSingle(),
    supabase
      .from("profiles")
      .select("discrete_mode")
      .eq("id", user.id)
      .single(),
  ]);

  const notifications = generateNotifications({
    cycleSettings: cycleRes.data,
    contraceptiveMethod: methodRes.data,
    discreteMode: profileRes.data?.discrete_mode || false,
  });

  const isDiscrete = profileRes.data?.discrete_mode || false;

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 space-y-5 animate-florecer">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="font-display text-4xl text-cacao">Notificaciones</h1>
          {isDiscrete && (
            <span className="bg-cacao/10 text-cacao text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <BellOff className="w-3 h-3" /> Modo discreto
            </span>
          )}
        </div>
        <p className="text-cacao/70 text-sm">
          {notifications.length === 0
            ? "Sin notificaciones por ahora"
            : `${notifications.length} ${
                notifications.length === 1 ? "notificación" : "notificaciones"
              } activas`}
        </p>
      </header>

      {/* Lista de notificaciones */}
      {notifications.length === 0 ? (
        <div className="tarjeta text-center py-12 space-y-3">
          <Bell
            className="w-12 h-12 text-cacao/30 mx-auto"
            strokeWidth={1.5}
          />
          <div>
            <p className="font-medium text-cacao">Todo en orden 🌸</p>
            <p className="text-sm text-cacao/60 max-w-sm mx-auto mt-1">
              No tienes recordatorios pendientes. Las notificaciones aparecerán
              aquí cuando se acerquen eventos importantes de tu ciclo.
            </p>
          </div>
          <Link href="/agenda" className="btn-secundario inline-block mt-2">
            Volver a la agenda
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => {
            const Icon = ICONS[notif.type] || Bell;
            const styles = PRIORITY_STYLES[notif.priority];

            return (
              <div
                key={notif.id}
                className={`tarjeta border ${styles.border} ${styles.bg} space-y-2`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${styles.badge} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${styles.text}`} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-cacao text-sm">
                        {!isDiscrete && (
                          <span className="mr-1">{notif.emoji}</span>
                        )}
                        {notif.title}
                      </p>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${styles.badge} ${styles.text}`}
                      >
                        {notif.priority === "high"
                          ? "Alta"
                          : notif.priority === "medium"
                          ? "Media"
                          : "Baja"}
                      </span>
                    </div>
                    <p className="text-sm text-cacao/80 leading-relaxed">
                      {notif.message}
                    </p>
                    {notif.daysFromNow === 0 ? (
                      <p className="text-[10px] text-cacao/50 mt-1">Hoy</p>
                    ) : (
                      <p className="text-[10px] text-cacao/50 mt-1">
                        En {notif.daysFromNow}{" "}
                        {notif.daysFromNow === 1 ? "día" : "días"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info sobre notificaciones */}
      <div className="tarjeta bg-menta/15 space-y-2">
        <p className="text-sm font-medium text-cacao flex items-center gap-2">
          <Bell className="w-4 h-4 text-fertil" /> ¿Cómo funcionan?
        </p>
        <p className="text-xs text-cacao/70 leading-relaxed">
          Las notificaciones se generan automáticamente según tu ciclo
          menstrual y tu método anticonceptivo. Te recordamos eventos
          importantes como la llegada de tu período, tu ventana fértil, la
          ovulación, y los recordatorios de tu método anticonceptivo.
        </p>
        {isDiscrete && (
          <p className="text-xs text-cacao/70 leading-relaxed">
            🤫 Con el <strong>modo discreto</strong> activado, los mensajes son
            genéricos para proteger tu privacidad.
          </p>
        )}
      </div>
    </div>
  );
}
