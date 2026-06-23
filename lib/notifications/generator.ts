import { differenceInDays, parseISO, format } from "date-fns";
import { es } from "date-fns/locale";
import { calculateCycleInfo } from "@/lib/cycle/calculations";
import { getColombiaDate } from "@/lib/time/colombia";

export interface Notification {
  id: string;
  type: "period" | "ovulation" | "fertile" | "method" | "cycle";
  title: string;
  message: string;
  priority: "high" | "medium" | "low";
  daysFromNow: number;
  emoji: string;
}

interface Args {
  cycleSettings: {
    avg_cycle_length: number;
    avg_period_length: number;
    last_period_start: string;
  } | null;
  contraceptiveMethod: {
    method_type: string;
    next_action_date: string | null;
    daily_reminder_time: string | null;
  } | null;
  discreteMode: boolean;
}

/**
 * Genera notificaciones dinamicas basadas en el ciclo y metodo anticonceptivo.
 * Si modo discreto esta activo, los mensajes son genericos.
 */
export function generateNotifications(args: Args): Notification[] {
  const { cycleSettings, contraceptiveMethod, discreteMode } = args;
  const notifications: Notification[] = [];
  const today = getColombiaDate();

  if (!cycleSettings?.last_period_start) return notifications;

  const cycleInfo = calculateCycleInfo(
    today,
    parseISO(cycleSettings.last_period_start),
    cycleSettings.avg_cycle_length,
    cycleSettings.avg_period_length
  );

  // Notificacion de proximo periodo
  if (cycleInfo.daysToNextPeriod <= 3 && cycleInfo.daysToNextPeriod > 0) {
    notifications.push({
      id: "period-coming",
      type: "period",
      title: discreteMode ? "Recordatorio importante" : "Tu período se acerca",
      message: discreteMode
        ? "Tienes un evento próximo en tu agenda"
        : `Tu próximo período comienza en ${cycleInfo.daysToNextPeriod} días, el ${format(
            cycleInfo.nextPeriodDate,
            "d 'de' MMMM",
            { locale: es }
          )}.`,
      priority: "high",
      daysFromNow: cycleInfo.daysToNextPeriod,
      emoji: "🩸",
    });
  }

  // Notificacion de ovulacion
  const daysToOvulation = differenceInDays(cycleInfo.ovulationDate, today);
  if (daysToOvulation > 0 && daysToOvulation <= 2) {
    notifications.push({
      id: "ovulation-coming",
      type: "ovulation",
      title: discreteMode ? "Recordatorio" : "Tu ovulación se acerca",
      message: discreteMode
        ? "Tienes una actividad en tu agenda"
        : `Tu ovulación estimada es el ${format(
            cycleInfo.ovulationDate,
            "d 'de' MMMM",
            { locale: es }
          )}.`,
      priority: "medium",
      daysFromNow: daysToOvulation,
      emoji: "✨",
    });
  }

  // Notificacion de ventana fertil
  if (cycleInfo.isFertile) {
    notifications.push({
      id: "fertile-window",
      type: "fertile",
      title: discreteMode ? "Estás en una fase importante" : "Estás en tu ventana fértil",
      message: discreteMode
        ? "Revisa tu agenda para más información"
        : "Tu fertilidad está elevada estos días.",
      priority: "high",
      daysFromNow: 0,
      emoji: "🌷",
    });
  }

  // Notificacion de dia de ovulacion
  if (cycleInfo.isOvulation) {
    notifications.push({
      id: "ovulation-today",
      type: "ovulation",
      title: discreteMode ? "Recordatorio" : "Hoy es tu día de ovulación",
      message: discreteMode
        ? "Revisa tu agenda"
        : "Es tu pico de fertilidad y energía.",
      priority: "high",
      daysFromNow: 0,
      emoji: "🌸",
    });
  }

  // Notificaciones del metodo anticonceptivo
  if (contraceptiveMethod) {
    // Pastillas: recordatorio diario
    if (
      contraceptiveMethod.method_type === "pills" &&
      contraceptiveMethod.daily_reminder_time
    ) {
      notifications.push({
        id: "pills-daily",
        type: "method",
        title: discreteMode ? "Tienes una actividad pendiente" : "Recordatorio de pastilla",
        message: discreteMode
          ? `A las ${contraceptiveMethod.daily_reminder_time}`
          : `Recuerda tomar tu pastilla hoy a las ${contraceptiveMethod.daily_reminder_time}.`,
        priority: "high",
        daysFromNow: 0,
        emoji: "💊",
      });
    }

    // Renovacion proxima (inyeccion, DIU, jadelle, implante)
    if (contraceptiveMethod.next_action_date) {
      const renewalDate = parseISO(contraceptiveMethod.next_action_date);
      const daysToRenewal = differenceInDays(renewalDate, today);

      if (daysToRenewal > 0 && daysToRenewal <= 7) {
        const labels: Record<string, string> = {
          injection: "renovación de tu inyección",
          iud: "revisión de tu DIU",
          jadelle: "control de Jadelle",
          implant: "control de tu implante",
        };
        const label =
          labels[contraceptiveMethod.method_type] || "control de tu método";

        notifications.push({
          id: `method-renewal-${contraceptiveMethod.method_type}`,
          type: "method",
          title: discreteMode ? "Recordatorio importante" : `Próxima ${label}`,
          message: discreteMode
            ? `En ${daysToRenewal} días tienes un compromiso`
            : `Te quedan ${daysToRenewal} días para tu próxima ${label}.`,
          priority: "high",
          daysFromNow: daysToRenewal,
          emoji: "📅",
        });
      }
    }
  }

  // Notificacion de inicio de ciclo (dia 1)
  if (cycleInfo.cycleDay === 1) {
    notifications.push({
      id: "cycle-start",
      type: "cycle",
      title: discreteMode ? "Nuevo evento" : "Comienza un nuevo ciclo",
      message: discreteMode
        ? "Revisa tu agenda"
        : "Hoy es el día 1 de tu ciclo. Cuídate y descansa.",
      priority: "medium",
      daysFromNow: 0,
      emoji: "🌙",
    });
  }

  // Ordenar por prioridad y dias
  return notifications.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.daysFromNow - b.daysFromNow;
  });
}
