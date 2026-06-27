"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2, Clock } from "lucide-react";
import GoogleButton from "@/components/auth/google-button";
import Divider from "@/components/auth/divider";

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
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  // === Estados para 2FA ===
  const [requiresMFA, setRequiresMFA] = useState(false);
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState("");
  const [verifyingMFA, setVerifyingMFA] = useState(false);

  // Detectar si fue redirigida por inactividad
  useEffect(() => {
    const reason = searchParams.get("reason");
    if (reason === "inactivity") {
      setInfoMessage(
        "Tu sesión se cerró por seguridad debido a inactividad. Ingresa de nuevo para continuar."
      );
    }
  }, [searchParams]);

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

    // Verificar si tiene 2FA activado
    const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (aalData?.nextLevel === "aal2" && aalData.nextLevel !== aalData.currentLevel) {
      // Necesita verificar 2FA
      const { data: factorsData } = await supabase.auth.mfa.listFactors();
      const verifiedFactor = factorsData?.totp.find((f) => f.status === "verified");
      if (verifiedFactor) {
        setMfaFactorId(verifiedFactor.id);
        setRequiresMFA(true);
        setLoading(false);
        return;
      }
    }

    // Sin 2FA o ya completado: ir a la agenda
    router.push("/agenda");
    router.refresh();
  }

  async function handleVerifyMFA(e: React.FormEvent) {
    e.preventDefault();
    if (!mfaFactorId || mfaCode.length !== 6) return;
    setVerifyingMFA(true);
    setError(null);

    try {
      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({ factorId: mfaFactorId });
      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: mfaFactorId,
        challengeId: challengeData.id,
        code: mfaCode,
      });
      if (verifyError) throw verifyError;

      router.push("/agenda");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Código incorrecto";
      setError(msg);
      setVerifyingMFA(false);
    }
  }

  async function cancelMFA() {
    await supabase.auth.signOut();
    setRequiresMFA(false);
    setMfaFactorId(null);
    setMfaCode("");
    setError(null);
  }

  // Si requiere 2FA, mostrar pantalla de codigo TOTP
  if (requiresMFA) {
    return (
      <form onSubmit={handleVerifyMFA} className="space-y-4">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-coral/20 flex items-center justify-center mx-auto">
            <svg
              className="w-7 h-7 text-coral"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 1l3 5h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl text-cacao">
            Verificación de 2 pasos 🔐
          </h2>
          <p className="text-sm text-cacao/70">
            Ingresa el código de 6 dígitos de tu app autenticadora
          </p>
        </div>

        {error && (
          <div className="bg-error/15 border border-error/30 rounded-suave px-4 py-3 text-sm text-cacao">
            {error}
          </div>
        )}

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={mfaCode}
          onChange={(e) =>
            setMfaCode(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          placeholder="123456"
          autoFocus
          className="w-full px-4 py-4 rounded-suave border border-petalo/40 bg-perla text-cacao text-3xl text-center tracking-widest font-mono focus:border-coral focus:outline-none"
        />

        <button
          type="submit"
          disabled={mfaCode.length !== 6 || verifyingMFA}
          className="btn-primario w-full flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {verifyingMFA && <Loader2 className="w-4 h-4 animate-spin" />}
          {verifyingMFA ? "Verificando..." : "Verificar 🌸"}
        </button>

        <button
          type="button"
          onClick={cancelMFA}
          className="w-full text-sm text-cacao/60 hover:text-cacao"
        >
          Cancelar
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mensaje informativo (ej: cierre por inactividad) */}
      {infoMessage && (
        <div className="bg-bruma/30 border border-lavanda/40 rounded-suave px-4 py-3 text-sm text-cacao flex items-start gap-2">
          <Clock className="w-4 h-4 text-lavanda flex-shrink-0 mt-0.5" />
          <span>{infoMessage}</span>
        </div>
      )}

      {/* Boton de Google */}
      <GoogleButton text="Continuar con Google" />

      <Divider text="o con tu correo" />

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
        <Link
          href="/recuperar"
          className="text-coral hover:underline font-medium"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </p>
      </form>
    </div>
  );
}
