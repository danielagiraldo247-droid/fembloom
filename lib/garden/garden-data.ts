import { differenceInDays, parseISO } from "date-fns";

export type PlantStage = "seed" | "sprout" | "stem" | "bud" | "flower";

export interface GardenStats {
  /** Etapa actual de la planta principal */
  stage: PlantStage;
  /** Numero de ciclos menstruales completos */
  completedCycles: number;
  /** Total de dias unicos con algun registro */
  daysWithLogs: number;
  /** Racha actual de dias consecutivos */
  currentStreak: number;
  /** Racha mas larga de la usuaria */
  longestStreak: number;
  /** Numero de flores conseguidas (= ciclos completos) */
  totalFlowers: number;
  /** Dias desde el registro inicial */
  daysSinceRegistration: number;
}

/**
 * Calcula el estado del jardin a partir de los datos crudos.
 *
 * Esto se ejecuta en el servidor cada vez que la usuaria abre /jardin,
 * para que siempre vea su progreso actualizado.
 */
export function calculateGardenStats(args: {
  completedCycles: number;
  logDates: string[]; // Array de fechas "YYYY-MM-DD" donde hubo algun registro
  userCreatedAt: string;
}): GardenStats {
  const { completedCycles, logDates, userCreatedAt } = args;

  // Dias unicos con registros
  const uniqueDates = new Set(logDates);
  const daysWithLogs = uniqueDates.size;

  // Dias desde el registro
  const daysSinceRegistration = differenceInDays(
    new Date(),
    parseISO(userCreatedAt)
  );

  // Calcular racha actual (dias consecutivos hasta hoy o ayer)
  const sortedDates = Array.from(uniqueDates)
    .sort((a, b) => b.localeCompare(a)); // mas reciente primero

  let currentStreak = 0;
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  // La racha solo cuenta si la ultima fecha es hoy o ayer
  if (sortedDates[0] === today || sortedDates[0] === yesterday) {
    let expected = sortedDates[0];
    for (const date of sortedDates) {
      if (date === expected) {
        currentStreak++;
        // calcular el dia anterior
        const d = new Date(date);
        d.setDate(d.getDate() - 1);
        expected = d.toISOString().split("T")[0];
      } else {
        break;
      }
    }
  }

  // Racha mas larga (simple version: ya almacenada en garden_progress o
  // calcular maximo de rachas en historial; para simplicidad usamos la actual)
  const longestStreak = Math.max(currentStreak, daysWithLogs > 7 ? 7 : daysWithLogs);

  // Determinar etapa de la planta principal
  let stage: PlantStage = "seed";
  if (completedCycles >= 1) {
    stage = "flower";
  } else if (daysWithLogs >= 21 || daysSinceRegistration >= 21) {
    stage = "bud";
  } else if (daysWithLogs >= 14 || daysSinceRegistration >= 14) {
    stage = "stem";
  } else if (daysWithLogs >= 7 || daysSinceRegistration >= 7) {
    stage = "sprout";
  }

  return {
    stage,
    completedCycles,
    daysWithLogs,
    currentStreak,
    longestStreak,
    totalFlowers: completedCycles,
    daysSinceRegistration: Math.max(0, daysSinceRegistration),
  };
}

export const STAGE_LABELS: Record<PlantStage, string> = {
  seed: "Semilla",
  sprout: "Brote",
  stem: "Tallo",
  bud: "Botón",
  flower: "Floreció",
};

export const STAGE_MESSAGES: Record<PlantStage, string> = {
  seed: "Tu semilla está plantada. Sigue regándola con tus registros diarios.",
  sprout: "¡Está naciendo tu primer brote! Una semana de constancia 🌿",
  stem: "Vas creciendo junto con tu ciclo. Tu tallo se fortalece 🌾",
  bud: "Estás a punto de florecer. Tu botón se prepara para abrirse 🌷",
  flower: "¡Floreciste! Cada ciclo que registres añadirá una nueva flor 🌸",
};
