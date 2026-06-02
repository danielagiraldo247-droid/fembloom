"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2 } from "lucide-react";

/**
 * Formulario para crear una contrasena nueva.
 *
 * Solo es accesible despues de hacer clic en el enlace del correo
 * de recuperacion. En ese momento, la usuaria ya tiene una sesion
 * temporal activa, por lo que podemos llamar a updateUser().
 *
 * Pasos:
 * 1. La usuaria escribe nueva contrasena (dos veces para confirmar).
 * 2. Validamos que cumpla los requisitos.
 * 3. Llamamos a supabase.auth.updateUser({ password }).
 * 4. Redirigimos a /agenda (ya esta logueada).
 */
export default function ActualizarForm() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Tu contrasena debe tener al menos 8 caracteres.");
      return;
    }
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setError("Tu contrasena debe combinar letras y numeros.");
      return;
    }
    if (password !== confirm) {
      setError("Las contrasenas no coinciden. Revisalas.");
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    router.push("/agenda");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-error/15 border border-error/30 rounded-suave px-4 py-3 text-sm text-cacao">
          {error}
        </div>
      )}

      {/* Nueva contrasena */}
      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm text-cacao font-medium"
        >
          Nueva contraseña
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

      {/* Confirmar contrasena */}
      <div className="space-y-1">
        <label
          htmlFor="confirm"
          className="block text-sm text-cacao font-medium"
        >
          Confirma tu contraseña
        </label>
        <input
          id="confirm"
          type={showPassword ? "text" : "password"}
          required
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Vuelve a escribir tu contraseña"
          className="w-full px-4 py-3 rounded-suave border border-petalo/40 bg-perla text-cacao placeholder:text-cacao/40 focus:border-coral focus:outline-none focus:ring-2 focus:ring-petalo/30 transition"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primario w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Guardando..." : "Guardar nueva contraseña 🌸"}
      </button>
    </form>
  );
}
