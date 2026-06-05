import type { CycleInfo } from "./calculations";

export type PregnancyRisk = "low" | "medium" | "high";

export interface PregnancyRiskResult {
  level: PregnancyRisk;
  label: string;
  explanation: string;
}

interface Args {
  cycleInfo: CycleInfo;
  /** Relaciones de los ultimos 7 dias (objeto con date + with_protection) */
  recentRelations: { date: string; with_protection: boolean }[];
  /** Si la usuaria tiene un metodo anticonceptivo confiable activo */
  hasReliableContraceptive: boolean;
}

/**
 * Calcula la probabilidad estimada de embarazo basada en:
 * - Fase del ciclo actual (ventana fertil o no)
 * - Relaciones recientes (con/sin proteccion)
 * - Metodo anticonceptivo activo
 *
 * IMPORTANTE: Este calculo es solo orientativo, no es diagnostico medico.
 */
export function calculatePregnancyRisk({
  cycleInfo,
  recentRelations,
  hasReliableContraceptive,
}: Args): PregnancyRiskResult {
  // Con anticonceptivo confiable (pastilla, DIU, inyeccion, Jadelle, implante)
  if (hasReliableContraceptive) {
    return {
      level: "low",
      label: "Baja",
      explanation:
        "Tu método anticonceptivo activo reduce significativamente la probabilidad.",
    };
  }

  const unprotected = recentRelations.filter((r) => !r.with_protection);

  // En ventana fertil
  if (cycleInfo.isFertile) {
    if (unprotected.length > 0) {
      return {
        level: "high",
        label: "Alta",
        explanation:
          "Estás en tu ventana fértil y tuviste relaciones sin protección recientemente.",
      };
    }
    return {
      level: "medium",
      label: "Media",
      explanation:
        "Estás en tu ventana fértil. Tu fertilidad está elevada estos días.",
    };
  }

  // Fuera de ventana fertil
  return {
    level: "low",
    label: "Baja",
    explanation: "Estás fuera de tu ventana fértil. La probabilidad es baja.",
  };
}
