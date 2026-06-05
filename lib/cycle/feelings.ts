import type { CycleInfo, CyclePhase } from "./calculations";

export type EnergyLevel = "low" | "medium" | "high";

export interface DailyFeeling {
  emoji: string;
  title: string;
  message: string;
  energy: EnergyLevel;
  /** Sugerencias para el dia */
  suggestions: string[];
}

/**
 * Genera un mensaje empatico sobre como podria sentirse la usuaria HOY
 * basado en su fase del ciclo.
 *
 * IMPORTANTE: Es orientativo, no diagnostico. Cada cuerpo es diferente.
 */
export function getDailyFeeling(cycleInfo: CycleInfo): DailyFeeling {
  // Variaciones segun fase y dia dentro de la fase
  if (cycleInfo.phase === "menstrual") {
    if (cycleInfo.cycleDay === 1) {
      return {
        emoji: "🌙",
        title: "Comienza un nuevo ciclo",
        message:
          "Hoy es el primer día de tu menstruación. Sé amable contigo misma, hidrátate bien y date el descanso que necesitas.",
        energy: "low",
        suggestions: [
          "Hidrátate más de lo normal",
          "Té caliente para los cólicos",
          "Descanso si lo necesitas",
        ],
      };
    }
    return {
      emoji: "🌙",
      title: "Tu cuerpo se renueva",
      message:
        "Tu cuerpo está liberando lo que no necesita. Tu energía puede estar baja, y eso es totalmente normal. Cuida tus emociones.",
      energy: "low",
      suggestions: [
        "Ejercicio suave o yoga",
        "Comidas calientes y nutritivas",
        "Acepta tu ritmo de hoy",
      ],
    };
  }

  if (cycleInfo.phase === "follicular") {
    return {
      emoji: "🌱",
      title: "Tu energía está subiendo",
      message:
        "Es un momento ideal para empezar nuevos proyectos. Tu mente está clara y creativa, y tu cuerpo se prepara para la ovulación.",
      energy: "medium",
      suggestions: [
        "Aprovecha para planificar",
        "Ejercicio cardiovascular",
        "Socializa, conecta con otras",
      ],
    };
  }

  if (cycleInfo.isOvulation) {
    return {
      emoji: "✨",
      title: "Estás radiante hoy",
      message:
        "Hoy es tu día de ovulación. Estás en tu pico de energía y fertilidad. Te sientes más segura, comunicativa y atractiva.",
      energy: "high",
      suggestions: [
        "Día ideal para presentaciones",
        "Aprovecha tu energía social",
        "Cuida tu fertilidad según tu objetivo",
      ],
    };
  }

  if (cycleInfo.phase === "ovulation") {
    return {
      emoji: "✨",
      title: "Estás en tu mejor momento",
      message:
        "Tu energía está en su punto más alto. Te sientes empoderada y conectada. Disfruta de esta sensación de plenitud.",
      energy: "high",
      suggestions: [
        "Día perfecto para reuniones importantes",
        "Ejercicio de alta intensidad",
        "Confía en tu intuición",
      ],
    };
  }

  // Lutea
  if (cycleInfo.daysToNextPeriod <= 3) {
    return {
      emoji: "🍂",
      title: "Tu período se acerca",
      message:
        "Podrías sentir cambios emocionales o síntomas premenstruales. Es momento de cuidarte más, dormir bien y reducir el ritmo.",
      energy: "low",
      suggestions: [
        "Reduce el estrés",
        "Evita estimulantes como cafeína",
        "Permítete sentir tus emociones",
      ],
    };
  }

  return {
    emoji: "🌾",
    title: "Tu cuerpo se prepara",
    message:
      "Estás en tu fase lútea. Tu energía puede variar y tus emociones pueden estar más sensibles. Escucha lo que tu cuerpo necesita.",
    energy: "medium",
    suggestions: [
      "Ejercicio moderado",
      "Comidas equilibradas",
      "Tiempo de calidad contigo misma",
    ],
  };
}

/**
 * Mensaje corto descriptivo de la fase actual.
 * Usado en el saludo principal de la agenda.
 */
export function getPhaseGreeting(cycleInfo: CycleInfo): string {
  if (cycleInfo.isOvulation) {
    return "Hoy es tu día de ovulación 🌸";
  }
  if (cycleInfo.isFertile) {
    return "Te encuentras en tu ventana fértil 🌷";
  }
  if (cycleInfo.phase === "menstrual") {
    return "Estás en tu menstruación 🩸";
  }
  if (cycleInfo.phase === "follicular") {
    return "Estás en tu fase folicular 🌱";
  }
  // Lutea
  return "Estás en tu fase lútea 🍂";
}

export const PHASE_ENERGY: Record<CyclePhase, EnergyLevel> = {
  menstrual: "low",
  follicular: "medium",
  ovulation: "high",
  luteal: "medium",
};
