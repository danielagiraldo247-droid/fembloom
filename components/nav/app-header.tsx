import Link from "next/link";
import { Flower2, Bell } from "lucide-react";

/**
 * Header superior para las paginas autenticadas.
 * Logo de FemBloom + campana de notificaciones + avatar/perfil de la usuaria.
 */
interface Props {
  fullName?: string | null;
  avatarUrl?: string | null;
  notificationCount?: number;
}

export default function AppHeader({
  fullName,
  avatarUrl,
  notificationCount = 0,
}: Props) {
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

        <div className="flex items-center gap-2">
          {/* Campana de notificaciones */}
          <Link
            href="/notificaciones"
            className="relative w-9 h-9 rounded-full bg-petalo/40 flex items-center justify-center hover:ring-2 hover:ring-coral/30 transition"
            aria-label="Notificaciones"
          >
            <Bell className="w-4 h-4 text-cacao" strokeWidth={1.5} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </Link>

          {/* Avatar */}
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
      </div>
    </header>
  );
}
