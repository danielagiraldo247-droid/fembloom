"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, CheckCircle2 } from "lucide-react";

/**
 * Formulario para solicitar el enlace de recuperacion.
 *
 * Pasos:
 * 1. La usuaria ingresa su correo.
 * 2. Llamamos a supabase.auth.resetPasswordForEmail().
 * 3. Supabase manda un correo con un enlace magico.
 * 4. El enlace, al ser clickeado, lleva a /auth/callback
 *    que a su vez redirige a /actualizar-password.
 */
export default function RecuperarForm() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/auth/callback?next=/actualizar-password`,
      }
    );

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  // Pantalla de exito (despues de mandar el correo)
  if (sent) {
    return (
      <div className="text-center space-y-4 py-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-menta/40 rounded-full mx-auto">
          <CheckCircle2
            className="w-8 h-8 text-fertil"
            strokeWidth={1.5}
          />
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-cacao">¡Revisa tu correo! 🌸</p>
          <p className="text-sm text-cacao/70">
            Si tu correo está registrado en FemBloom, te enviamos un enlace
            para crear una nueva contraseña.
          </p>
        </div>
        <p className="text-xs text-cacao/60">
          ¿No te llegó? Revisa tu carpeta de spam.
        </p>
      </div>
    );
  }

  // Formulario normal
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-error/15 border border-error/30 rounded-suave px-4 py-3 text-sm text-cacao">
          {error}
        </div>
      )}

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

      <button
        type="submit"
        disabled={loading}
        className="btn-primario w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Enviando..." : "Enviar enlace 🌸"}
      </button>
    </form>
  );
}
