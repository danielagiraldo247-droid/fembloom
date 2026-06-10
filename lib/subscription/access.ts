export type SubscriptionStatus = "trial" | "active" | "expired" | "cancelled";

export interface SubscriptionInfo {
  status: SubscriptionStatus;
  trialEndsAt?: string | null;
  hasAccess: boolean;
  daysLeft: number | null;
  label: string;
  isPremium: boolean;
}

/**
 * Determina si la usuaria tiene acceso premium activo,
 * basado en su subscription_status y trial_ends_at.
 */
export function getSubscriptionInfo(args: {
  subscription_status?: string | null;
  trial_ends_at?: string | null;
}): SubscriptionInfo {
  const { subscription_status, trial_ends_at } = args;

  // En prueba gratuita
  if (subscription_status === "trial" && trial_ends_at) {
    const trialEnd = new Date(trial_ends_at);
    const now = new Date();
    const msLeft = trialEnd.getTime() - now.getTime();
    const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));

    if (daysLeft > 0) {
      return {
        status: "trial",
        trialEndsAt: trial_ends_at,
        hasAccess: true,
        daysLeft,
        label: `Prueba gratuita - ${daysLeft} días restantes`,
        isPremium: true,
      };
    }

    return {
      status: "expired",
      trialEndsAt: trial_ends_at,
      hasAccess: false,
      daysLeft: 0,
      label: "Prueba gratuita vencida",
      isPremium: false,
    };
  }

  // Suscripcion activa
  if (subscription_status === "active") {
    return {
      status: "active",
      hasAccess: true,
      daysLeft: null,
      label: "Premium activo",
      isPremium: true,
    };
  }

  // Cancelada
  if (subscription_status === "cancelled") {
    return {
      status: "cancelled",
      hasAccess: false,
      daysLeft: null,
      label: "Suscripción cancelada",
      isPremium: false,
    };
  }

  // Vencida o sin plan
  return {
    status: "expired",
    hasAccess: false,
    daysLeft: 0,
    label: "Sin plan activo",
    isPremium: false,
  };
}
