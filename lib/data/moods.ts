export type MoodType =
  | "happy"
  | "sad"
  | "irritable"
  | "anxious"
  | "calm"
  | "sensitive"
  | "energetic"
  | "tired";

export interface Mood {
  id: MoodType;
  label: string;
  emoji: string;
  /** Color de fondo cuando esta seleccionado */
  bgColor: string;
  /** Color de borde cuando esta seleccionado */
  borderColor: string;
}

/**
 * Catalogo de estados de animo posibles en FemBloom.
 * Cada uno tiene su emoji y paleta de color suave.
 */
export const MOODS: Mood[] = [
  {
    id: "happy",
    label: "Alegre",
    emoji: "😊",
    bgColor: "bg-durazno/40",
    borderColor: "border-durazno",
  },
  {
    id: "calm",
    label: "Tranquila",
    emoji: "😌",
    bgColor: "bg-menta/40",
    borderColor: "border-fertil",
  },
  {
    id: "energetic",
    label: "Energética",
    emoji: "⚡",
    bgColor: "bg-durazno/40",
    borderColor: "border-coral",
  },
  {
    id: "sensitive",
    label: "Sensible",
    emoji: "🥺",
    bgColor: "bg-petalo/40",
    borderColor: "border-coral",
  },
  {
    id: "anxious",
    label: "Ansiosa",
    emoji: "😰",
    bgColor: "bg-bruma/50",
    borderColor: "border-lavanda",
  },
  {
    id: "irritable",
    label: "Irritable",
    emoji: "😤",
    bgColor: "bg-petalo/40",
    borderColor: "border-coral",
  },
  {
    id: "sad",
    label: "Triste",
    emoji: "😢",
    bgColor: "bg-bruma/40",
    borderColor: "border-lavanda",
  },
  {
    id: "tired",
    label: "Cansada",
    emoji: "😴",
    bgColor: "bg-bruma/30",
    borderColor: "border-cacao/30",
  },
];
