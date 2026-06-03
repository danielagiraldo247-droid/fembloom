import Link from "next/link";
import { Flower2 } from "lucide-react";

/**
 * Header superior para las paginas autenticadas.
 * Logo de FemBloom + avatar/perfil de la usuaria.
 */
interface Props {
  fullName?: string | null;
  avatarUrl?: string | null;
}

export default function AppHeader({ fullName, avatarUrl }: Props) {
  // Iniciales para fallback de avatar
  const initials = (fullName || "F")
    .split(" ")
    .map((p: string) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-perla/95 backdrop-blur-sm border-b border-petalo/30">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/agenda"
          className="inline-flex items-center gap-2 text-cacao hover:opacity-80 transition"
        >
          <Flower2 className="w-6 h-6 text-coral" strokeWidth={1.5} />
          <span className="font-display text-2xl">FemBloom</span>
        </Link>

        <Link
          href="/perfil"
          className="w-9 h-9 rounded-full bg-petalo/40 overflow-hidden flex items-center justify-center hover:ring-2 hover:ring-coral/30 transition"
          aria-label="Mi perfil"
        >
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={fullName || ""}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs font-semibold text-cacao">
              {initials}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
