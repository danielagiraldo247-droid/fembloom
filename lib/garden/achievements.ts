import type { GardenStats } from "./garden-data";

export interface Achievement {
  code: string;
  name: string;
  description: string;
  emoji: string;
  /** Si la usuaria lo desbloqueo */
  isUnlocked: (stats: GardenStats) => boolean;
  /** Progreso actual (numero) */
  getProgress: (stats: GardenStats) => number;
  /** Meta para considerarlo cumplido */
  goal: number;
  /** Etiqueta de progreso (ej: "dias", "ciclos") */
  unit: string;
}

/**
 * Catalogo de 10 logros que la usuaria puede desbloquear.
 * El sistema verifica automaticamente cuales tiene y muestra el progreso.
 */
export const ACHIEVEMENTS: Achievement[] = [
  {
    code: "first_seed",
    name: "Primera semilla",
    description: "Te registraste en FemBloom y comenzaste tu viaje",
    emoji: "🌱",
    isUnlocked: () => true,
    getProgress: () => 1,
    goal: 1,
    unit: "",
  },
  {
    code: "first_sprout",
    name: "Primer brote",
    description: "Registraste 7 días en tu calendario",
    emoji: "🌿",
    isUnlocked: (s) => s.daysWithLogs >= 7,
    getProgress: (s) => Math.min(s.daysWithLogs, 7),
    goal: 7,
    unit: "días",
  },
  {
    code: "first_flower",
    name: "Floreciste",
    description: "Completaste tu primer ciclo menstrual",
    emoji: "🌸",
    isUnlocked: (s) => s.completedCycles >= 1,
    getProgress: (s) => Math.min(s.completedCycles, 1),
    goal: 1,
    unit: "ciclo",
  },
  {
    code: "consistent_week",
    name: "Constancia",
    description: "Mantén una racha de 7 días seguidos",
    emoji: "🔥",
    isUnlocked: (s) => s.currentStreak >= 7 || s.longestStreak >= 7,
    getProgress: (s) => Math.min(Math.max(s.currentStreak, s.longestStreak), 7),
    goal: 7,
    unit: "días seguidos",
  },
  {
    code: "consistent_month",
    name: "Muy constante",
    description: "Registra al menos 30 días en total",
    emoji: "📅",
    isUnlocked: (s) => s.daysWithLogs >= 30,
    getProgress: (s) => Math.min(s.daysWithLogs, 30),
    goal: 30,
    unit: "días",
  },
  {
    code: "gardener",
    name: "Jardinera",
    description: "Completa 3 ciclos completos",
    emoji: "🌷",
    isUnlocked: (s) => s.completedCycles >= 3,
    getProgress: (s) => Math.min(s.completedCycles, 3),
    goal: 3,
    unit: "ciclos",
  },
  {
    code: "cycle_master",
    name: "Maestra del ciclo",
    description: "Completa 6 ciclos completos",
    emoji: "🌺",
    isUnlocked: (s) => s.completedCycles >= 6,
    getProgress: (s) => Math.min(s.completedCycles, 6),
    goal: 6,
    unit: "ciclos",
  },
  {
    code: "year_bloomed",
    name: "Año florecido",
    description: "Un año completo de seguimiento (12 ciclos)",
    emoji: "🌼",
    isUnlocked: (s) => s.completedCycles >= 12,
    getProgress: (s) => Math.min(s.completedCycles, 12),
    goal: 12,
    unit: "ciclos",
  },
  {
    code: "garden_full",
    name: "Jardín lleno",
    description: "Tu jardín tiene al menos 5 flores únicas",
    emoji: "💐",
    isUnlocked: (s) => s.totalFlowers >= 5,
    getProgress: (s) => Math.min(s.totalFlowers, 5),
    goal: 5,
    unit: "flores",
  },
  {
    code: "deep_knowledge",
    name: "Conocimiento profundo",
    description: "Registra 60 días en tu calendario",
    emoji: "✨",
    isUnlocked: (s) => s.daysWithLogs >= 60,
    getProgress: (s) => Math.min(s.daysWithLogs, 60),
    goal: 60,
    unit: "días",
  },
];

export function getUnlockedAchievements(stats: GardenStats): Achievement[] {
  return ACHIEVEMENTS.filter((a) => a.isUnlocked(stats));
}

export function getNextAchievement(stats: GardenStats): Achievement | null {
  return ACHIEVEMENTS.find((a) => !a.isUnlocked(stats)) || null;
}
