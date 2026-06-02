import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind de forma inteligente, evitando conflictos.
 *
 * Uso:
 *   <div className={cn("bg-petalo", isActive && "bg-coral")} />
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
