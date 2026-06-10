export type PlanId = "monthly" | "annual";

export interface SubscriptionPlan {
  id: PlanId;
  name: string;
  price: number; // en COP
  priceLabel: string;
  pricePerMonth: string;
  duration: string;
  savings?: string;
  recommended?: boolean;
  features: string[];
}

export const PLANS: SubscriptionPlan[] = [
  {
    id: "monthly",
    name: "Plan Mensual",
    price: 12900,
    priceLabel: "$12.900 COP",
    pricePerMonth: "$12.900 / mes",
    duration: "Renovación mensual",
    features: [
      "Acceso completo a la app",
      "Predicciones avanzadas",
      "Consejera virtual con IA",
      "Reportes médicos PDF",
      "Jardín virtual ilimitado",
      "Cancelación en cualquier momento",
    ],
  },
  {
    id: "annual",
    name: "Plan Anual",
    price: 99900,
    priceLabel: "$99.900 COP",
    pricePerMonth: "$8.325 / mes",
    duration: "Renovación anual",
    savings: "Ahorras 35%",
    recommended: true,
    features: [
      "Todo lo del plan mensual",
      "Equivale a $8.325 al mes",
      "2 meses GRATIS",
      "Reportes ilimitados",
      "Prioridad en consejera virtual",
      "Cancelación en cualquier momento",
    ],
  },
];

export const PREMIUM_FEATURES = [
  "🌸 Jardín virtual con flores y logros",
  "💬 Consejera virtual con IA (Bloom)",
  "📄 Reportes médicos PDF descargables",
  "🔮 Predicciones avanzadas del ciclo",
  "💊 Centro de planificación familiar",
  "🤫 Modo discreto personalizable",
  "📊 Historiales completos",
  "🌗 Modo \"¿Cómo me sentiré hoy?\"",
];

export function getPlan(id: string): SubscriptionPlan | undefined {
  return PLANS.find((p) => p.id === id);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
}
