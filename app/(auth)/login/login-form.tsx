"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2 } from "lucide-react";

/**
 * Formulario de inicio de sesion de FemBloom.
 *
 * Pasos:
 * 1. La usuaria ingresa correo y contrasena.
 * 2. Llamamos a supabase.auth.signInWithPassword().
 * 3. Si las credenciales son correctas, Supabase crea una sesion
 *    (guardada en cookies del navegador).
 * 4. Redirigimos a /agenda.
 */
export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      const msg = signInError.message.toLowerCase();
      if (msg.includes("invalid login credentials")) {
        setError(
          "El correo o la contrasena no coinciden. Revisa e intenta de nuevo."
        );
      } else if (msg.includes("email not confirmed")) {
        setError(
          "Tu correo aun no esta confirmado. Revisa tu bandeja de entrada."
        );
      } else {
        setError(signInError.message);
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
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

      {/* Boton */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primario w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Entrando..." : "Iniciar sesión 🌸"}
      </button>

      <p className="text-center text-sm">
        <span className="text-cacao/60">¿Olvidaste tu contraseña? </span>
        <span className="text-cacao/40">(Próximamente)</span>
      </p>
    </form>
  );
}
