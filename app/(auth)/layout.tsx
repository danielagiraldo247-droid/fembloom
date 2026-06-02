import Link from "next/link";
import { Flower2 } from "lucide-react";

/**
 * Layout compartido para las paginas de autenticacion:
 * - Login
 * - Registro
 * - Recuperar contrasena
 *
 * Muestra el logo arriba y centra el contenido en una tarjeta.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Logo / link de regreso al inicio */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-cacao hover:opacity-70 transition"
      >
        <Flower2 className="w-7 h-7 text-coral" strokeWidth={1.5} />
        <span className="font-display text-3xl">FemBloom</span>
      </Link>

      {/* Contenido (formulario) */}
      <div className="w-full max-w-md animate-florecer">{children}</div>
    </main>
  );
}
