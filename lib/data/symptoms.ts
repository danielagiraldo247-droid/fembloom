export type BodyZone = "head" | "chest" | "abdomen" | "back" | "legs" | "general";

export interface Symptom {
  /** Identificador unico - se guarda en BD */
  id: string;
  /** Nombre visible para la usuaria */
  label: string;
  /** Emoji decorativo */
  emoji: string;
  /** Zona del cuerpo a la que pertenece */
  zone: BodyZone;
}

/**
 * Catalogo de sintomas comunes durante el ciclo menstrual.
 * Organizados por zona del cuerpo para el mapa corporal interactivo.
 */
export const SYMPTOMS: Symptom[] = [
  // CABEZA
  { id: "headache", label: "Dolor de cabeza", emoji: "🤕", zone: "head" },
  { id: "migraine", label: "Migraña", emoji: "💢", zone: "head" },
  { id: "dizziness", label: "Mareo", emoji: "😵‍💫", zone: "head" },

  // PECHO
  { id: "breast_tenderness", label: "Sensibilidad pectoral", emoji: "💗", zone: "chest" },
  { id: "breast_swelling", label: "Hinchazón pectoral", emoji: "🎈", zone: "chest" },

  // ABDOMEN
  { id: "cramps", label: "Cólicos", emoji: "⚡", zone: "abdomen" },
  { id: "bloating", label: "Hinchazón abdominal", emoji: "🫧", zone: "abdomen" },
  { id: "nausea", label: "Náuseas", emoji: "🤢", zone: "abdomen" },
  { id: "constipation", label: "Estreñimiento", emoji: "🌀", zone: "abdomen" },
  { id: "diarrhea", label: "Diarrea", emoji: "💧", zone: "abdomen" },

  // ESPALDA
  { id: "back_pain", label: "Dolor lumbar", emoji: "🩹", zone: "back" },
  { id: "upper_back_pain", label: "Dolor de espalda alta", emoji: "🦴", zone: "back" },

  // PIERNAS
  { id: "leg_cramps", label: "Calambres en piernas", emoji: "🦵", zone: "legs" },
  { id: "heaviness", label: "Pesadez en piernas", emoji: "⚓", zone: "legs" },

  // GENERAL
  { id: "fatigue", label: "Fatiga", emoji: "😴", zone: "general" },
  { id: "insomnia", label: "Insomnio", emoji: "🌙", zone: "general" },
  { id: "acne", label: "Acné", emoji: "🌸", zone: "general" },
  { id: "cravings", label: "Antojos", emoji: "🍫", zone: "general" },
  { id: "mood_swings", label: "Cambios emocionales", emoji: "🎭", zone: "general" },
  { id: "anxiety", label: "Ansiedad", emoji: "💭", zone: "general" },
];

export const BODY_ZONE_LABELS: Record<BodyZone, string> = {
  head: "Cabeza",
  chest: "Pecho",
  abdomen: "Abdomen",
  back: "Espalda",
  legs: "Piernas",
  general: "General",
};
