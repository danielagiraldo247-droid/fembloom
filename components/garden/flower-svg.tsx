export type FlowerType =
  | "rose"
  | "lavender"
  | "daisy"
  | "tulip"
  | "anemone"
  | "hydrangea"
  | "peony";

interface FlowerData {
  emoji: string;
  name: string;
  bgClass: string;
}

export const FLOWERS: Record<FlowerType, FlowerData> = {
  rose: { emoji: "🌹", name: "Rosa silvestre", bgClass: "bg-petalo/30" },
  lavender: { emoji: "💜", name: "Lavanda", bgClass: "bg-bruma/40" },
  daisy: { emoji: "🌼", name: "Margarita", bgClass: "bg-durazno/40" },
  tulip: { emoji: "🌷", name: "Tulipán", bgClass: "bg-petalo/40" },
  anemone: { emoji: "🌸", name: "Anémona", bgClass: "bg-bruma/30" },
  hydrangea: { emoji: "💠", name: "Hortensia", bgClass: "bg-menta/40" },
  peony: { emoji: "🪻", name: "Peonía", bgClass: "bg-petalo/40" },
};

const FLOWER_ORDER: FlowerType[] = [
  "rose",
  "lavender",
  "daisy",
  "tulip",
  "anemone",
  "hydrangea",
  "peony",
];

/**
 * Devuelve la flor que corresponde a un ciclo (1-indexed).
 * Las flores rotan ciclicamente.
 */
export function getFlowerForCycle(cycleNumber: number): FlowerType {
  return FLOWER_ORDER[(cycleNumber - 1) % FLOWER_ORDER.length];
}

interface FlowerSVGProps {
  type: FlowerType;
  size?: "small" | "large";
}

/**
 * Tarjeta visual de una flor del jardin.
 * Estilo: pasteles suaves con emoji destacado.
 */
export default function FlowerCard({ type, size = "small" }: FlowerSVGProps) {
  const flower = FLOWERS[type];
  const sizeClasses =
    size === "large"
      ? "w-24 h-24 text-5xl"
      : "w-16 h-16 text-3xl";

  return (
    <div
      className={`${flower.bgClass} ${sizeClasses} rounded-full flex items-center justify-center shadow-suave hover:shadow-petalo transition`}
      title={flower.name}
    >
      <span>{flower.emoji}</span>
    </div>
  );
}
