"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Flower2, BookOpen, User } from "lucide-react";

/**
 * Navegacion inferior tipo app movil.
 * Sticky en la parte inferior, visible en todas las paginas autenticadas.
 */
const items = [
  { href: "/agenda", icon: Home, label: "Agenda" },
  { href: "/calendario", icon: Calendar, label: "Calendario" },
  { href: "/jardin", icon: Flower2, label: "Jardín" },
  { href: "/conocete", icon: BookOpen, label: "Conócete" },
  { href: "/perfil", icon: User, label: "Perfil" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-perla/95 backdrop-blur-sm border-t border-petalo/30 shadow-petalo z-50">
      <div className="max-w-2xl mx-auto flex justify-around items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-3 flex-1 transition ${
                active
                  ? "text-coral"
                  : "text-cacao/50 hover:text-cacao"
              }`}
            >
              <Icon
                className="w-5 h-5"
                strokeWidth={active ? 2.2 : 1.5}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
