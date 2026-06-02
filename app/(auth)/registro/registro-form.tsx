"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2 } from "lucide-react";

/**
 * Formulario de registro de FemBloom.
 *
 * Pasos:
 * 1. La usuaria llena nombre, correo y contrasena.
 * 2. Llamamos a supabase.auth.signUp().
 * 3. Supabase crea el usuario en auth.users.
 * 4. Nuestro trigger en la base de datos crea automaticamente
 *    su fila en la tabla profiles (con prueba gratuita de 3 meses).
 * 5. Redirigimos a /agenda.
 */
export default function RegistroForm() {
  const router = useRouter();
  const supabase = createClient();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validaciones basicas
    if (nombre.trim().length < 2) {
      setError("Cuentame tu nombre para personalizar tu experiencia.");
      return;
    }
    if (password.length < 8) {
      setError("Tu contrasena debe tener al menos 8 caracteres.");
      return;
    }
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setError("Tu contrasena debe combinar letras y numeros.");
      return;
    }

    setLoading(true);

    // Llamar a Supabase para crear la cuenta
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Estos datos viajan al trigger que crea la fila en profiles
        data: { full_name: nombre.trim() },
        // URL a la que se redirige despues de confirmar correo (si esta activado)
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined,
      },
    });

    if (signUpError) {
      // Traducir errores comunes a espanol
      const msg = signUpError.message.toLowerCase();
      if (msg.includes("already registered") || msg.includes("already exists")) {
        setError(
          "Este correo ya esta registrado. ¿Quieres iniciar sesion en lugar de crear cuenta?"
        );
      } else if (msg.includes("password")) {
        setError("La contrasena no cumple los requisitos. Intenta con otra.");
      } else {
        setError(signUpError.message);
      }
      setLoading(false);
      return;
    }

    // Exito: ir a la agenda
    router.push("/agenda");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Mensaje de error */}
      {error && (
        <div className="bg-error/15 border border-error/30 rounded-suave px-4 py-3 text-sm text-cacao">
          {error}
        </div>
      )}

      {/* Nombre */}
      <div className="space-y-1">
        <label
          htmlFor="nombre"
          className="block text-sm text-cacao font-medium"
        >
          ¿Cómo te llamas?
        </label>
        <input
          id="nombre"
          type="text"
          required
          autoComplete="given-name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre"
          className="w-full px-4 py-3 rounded-suave border border-petalo/40 bg-perla text-cacao placeholder:text-cacao/40 focus:border-coral focus:outline-none focus:ring-2 focus:ring-petalo/30 transition"
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-sm text-cacao font-medium"
        >
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className="w-full px-4 py-3 rounded-suave border border-petalo/40 bg-perla text-cacao placeholder:text-cacao/40 focus:border-coral focus:outline-none focus:ring-2 focus:ring-petalo/30 transition"
        />
      </div>

      {/* Contrasena */}
      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm text-cacao font-medium"
        >
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres con letras y números"
            className="w-full px-4 py-3 pr-12 rounded-suave border border-petalo/40 bg-perla text-cacao placeholder:text-cacao/40 focus:border-coral focus:outline-none focus:ring-2 focus:ring-petalo/30 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cacao/50 hover:text-cacao transition"
            aria-label={
              showPassword ? "Ocultar contrasena" : "Mostrar contrasena"
            }
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Boton de submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primario w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Creando cuenta..." : "Crear mi cuenta 🌸"}
      </button>

      <p className="text-xs text-center text-cacao/60 leading-relaxed">
        Al registrarte comienzas tu prueba gratuita de 3 meses con acceso
        completo a todas las funciones de FemBloom.
      </p>
    </form>
  );
}
