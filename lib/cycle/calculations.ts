import { addDays, differenceInDays, startOfDay } from "date-fns";

export type CyclePhase = "menstrual" | "follicular" | "ovulation" | "luteal";

export interface CycleInfo {
  /** Dia actual dentro del ciclo (1, 2, 3...) */
  cycleDay: number;
  /** Fase del ciclo */
  phase: CyclePhase;
  /** Si esta en la ventana fertil */
  isFertile: boolean;
  /** Si es exactamente el dia de ovulacion */
  isOvulation: boolean;
  /** Fecha en que comienza este ciclo */
  cycleStartDate: Date;
  /** Fecha estimada del proximo periodo */
  nextPeriodDate: Date;
  /** Fecha estimada de ovulacion */
  ovulationDate: Date;
  /** Dias restantes para el proximo periodo */
  daysToNextPeriod: number;
}

/**
 * Calcula la informacion del ciclo para una fecha dada.
 *
 * Modelo:
 * - Menstrual: dia 1 hasta dia "periodLength"
 * - Ovulacion: cycleLength - 14 (ocurre 14 dias antes del proximo periodo)
 * - Ventana fertil: 5 dias antes de ovulacion + dia de ovulacion + 1 despues
 * - Folicular: despues de la menstruacion y antes de la ovulacion
 * - Lutea: despues de la ovulacion y antes de la siguiente menstruacion
 */
export function calculateCycleInfo(
  date: Date,
  lastPeriodStart: Date,
  cycleLength: number,
  periodLength: number
): CycleInfo {
  const targetDate = startOfDay(date);
  const lastStart = startOfDay(lastPeriodStart);

  let daysSince = differenceInDays(targetDate, lastStart);

  // Si la fecha es anterior al ultimo periodo registrado,
  // calculamos hacia atras
  if (daysSince < 0) {
    const cyclesBack = Math.ceil(-daysSince / cycleLength);
    daysSince = daysSince + cyclesBack * cycleLength;
  }

  const cycleNumber = Math.floor(daysSince / cycleLength);
  const cycleDay = (daysSince % cycleLength) + 1; // 1-indexed

  const cycleStartDate = addDays(lastStart, cycleNumber * cycleLength);
  const nextPeriodDate = addDays(cycleStartDate, cycleLength);

  // Ovulacion: 14 dias antes del proximo periodo
  const ovulationDayOfCycle = cycleLength - 14;
  const ovulationDate = addDays(cycleStartDate, ovulationDayOfCycle - 1);

  // Determinar fase
  let phase: CyclePhase;
  if (cycleDay <= periodLength) {
    phase = "menstrual";
  } else if (cycleDay === ovulationDayOfCycle) {
    phase = "ovulation";
  } else if (cycleDay < ovulationDayOfCycle) {
    phase = "follicular";
  } else {
    phase = "luteal";
  }

  // Ventana fertil: 5 dias antes de ovulacion + dia ovulacion + 1 despues
  const isFertile =
    cycleDay >= ovulationDayOfCycle - 5 && cycleDay <= ovulationDayOfCycle + 1;
  const isOvulation = cycleDay === ovulationDayOfCycle;

  const daysToNextPeriod = differenceInDays(nextPeriodDate, targetDate);

  return {
    cycleDay,
    phase,
    isFertile,
    isOvulation,
    cycleStartDate,
    nextPeriodDate,
    ovulationDate,
    daysToNextPeriod,
  };
}

export const PHASE_LABELS: Record<CyclePhase, string> = {
  menstrual: "Menstruación",
  follicular: "Folicular",
  ovulation: "Ovulación",
  luteal: "Lútea",
};

export const PHASE_DESCRIPTIONS: Record<CyclePhase, string> = {
  menstrual:
    "Tu cuerpo se renueva. Es momento de descansar y cuidarte con suavidad.",
  follicular:
    "Tu energía sube. Aprovecha para empezar nuevos proyectos y socializar.",
  ovulation:
    "Tu fertilidad está en su punto máximo. Te sientes radiante.",
  luteal:
    "Tu cuerpo se prepara para un nuevo ciclo. Sé amable con tus emociones.",
};
