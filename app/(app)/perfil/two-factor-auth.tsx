"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Shield,
  ShieldCheck,
  Loader2,
  Smartphone,
  QrCode,
  Check,
  AlertTriangle,
  Copy,
} from "lucide-react";

interface MFAFactor {
  id: string;
  status: "verified" | "unverified";
  friendly_name?: string;
}

/**
 * Componente de gestion de autenticacion de dos factores (2FA).
 *
 * Permite a la usuaria:
 * - Activar 2FA con TOTP (Google Authenticator, Authy, etc.)
 * - Desactivar 2FA
 * - Ver el estado actual
 */
export default function TwoFactorAuth() {
  const supabase = createClient();
  const [factors, setFactors] = useState<MFAFactor[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados del flujo de activacion
  const [enrolling, setEnrolling] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Cargar factores existentes
  useEffect(() => {
    loadFactors();
  }, []);

  async function loadFactors() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) throw error;
      const totpFactors = (data?.totp || []) as MFAFactor[];
      setFactors(totpFactors);
    } catch (err) {
      console.error("Error loading MFA factors:", err);
    } finally {
      setLoading(false);
    }
  }

  // Iniciar el proceso de activacion
  async function startEnroll() {
    setEnrolling(true);
    setMessage(null);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: `FemBloom-${Date.now()}`,
      });

      if (error) throw error;

      setQrCode(data.totp.qr_code);
      setSecret(data.totp.secret);
      setFactorId(data.id);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al iniciar 2FA";
      setMessage({ type: "error", text: msg });
      setEnrolling(false);
    }
  }

  // Verificar el codigo TOTP
  async function verifyEnrollment() {
    if (!factorId || verifyCode.length !== 6) return;
    setVerifying(true);
    setMessage(null);
    try {
      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({ factorId });
      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code: verifyCode,
      });
      if (verifyError) throw verifyError;

      setMessage({
        type: "success",
        text: "¡2FA activada exitosamente! 🌸 Tu cuenta es más segura ahora.",
      });
      setEnrolling(false);
      setQrCode(null);
      setSecret(null);
      setFactorId(null);
      setVerifyCode("");
      loadFactors();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Código incorrecto";
      setMessage({ type: "error", text: msg });
    } finally {
      setVerifying(false);
    }
  }

  // Cancelar enrollment
  async function cancelEnrollment() {
    if (factorId) {
      try {
        await supabase.auth.mfa.unenroll({ factorId });
      } catch (err) {
        console.error(err);
      }
    }
    setEnrolling(false);
    setQrCode(null);
    setSecret(null);
    setFactorId(null);
    setVerifyCode("");
    setMessage(null);
  }

  // Desactivar 2FA existente
  async function disableMFA(factorId: string) {
    if (
      !confirm("¿Seguro que quieres desactivar 2FA? Tu cuenta será menos segura.")
    )
      return;
    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId });
      if (error) throw error;
      setMessage({ type: "success", text: "2FA desactivada correctamente." });
      loadFactors();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al desactivar";
      setMessage({ type: "error", text: msg });
    }
  }

  function copySecret() {
    if (secret) {
      navigator.clipboard.writeText(secret);
      setMessage({ type: "success", text: "Secreto copiado al portapapeles." });
    }
  }

  // Filtrar solo factores verificados
  const verifiedFactors = factors.filter((f) => f.status === "verified");
  const isActive = verifiedFactors.length > 0;

  if (loading) {
    return (
      <div className="tarjeta flex items-center justify-center py-6">
        <Loader2 className="w-5 h-5 text-coral animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Estado actual de 2FA */}
      <div
        className={`tarjeta border ${
          isActive
            ? "border-fertil/30 bg-menta/15"
            : "border-petalo/30"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              isActive ? "bg-fertil/30" : "bg-petalo/30"
            }`}
          >
            {isActive ? (
              <ShieldCheck className="w-5 h-5 text-fertil" />
            ) : (
              <Shield className="w-5 h-5 text-coral" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-cacao text-sm">
              Autenticación de dos factores (2FA)
            </p>
            <p className="text-xs text-cacao/60 mt-0.5">
              {isActive
                ? "Tu cuenta está protegida con 2FA"
                : "Añade una capa extra de seguridad a tu cuenta"}
            </p>
          </div>
        </div>

        {!isActive && !enrolling && (
          <button onClick={startEnroll} className="btn-primario w-full mt-3">
            <Shield className="w-4 h-4 inline mr-1" />
            Activar 2FA
          </button>
        )}

        {isActive && (
          <div className="mt-3 space-y-2">
            <p className="text-xs text-cacao/70 bg-perla rounded-suave p-2">
              ✅ Cada vez que inicies sesión te pediremos un código de 6 dígitos
              de tu app autenticadora.
            </p>
            <button
              onClick={() => disableMFA(verifiedFactors[0].id)}
              className="text-xs text-error hover:underline"
            >
              Desactivar 2FA
            </button>
          </div>
        )}
      </div>

      {/* Mensaje feedback */}
      {message && (
        <div
          className={`rounded-suave px-4 py-3 text-sm ${
            message.type === "success"
              ? "bg-menta/30 border border-fertil/40 text-cacao"
              : "bg-error/15 border border-error/30 text-cacao"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Modal de enrollment */}
      {enrolling && qrCode && (
        <div className="tarjeta border border-petalo/40 bg-petalo/10 space-y-4">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-coral" />
            <h3 className="font-display text-lg text-cacao">
              Configura tu app autenticadora
            </h3>
          </div>

          <div className="space-y-3 text-sm text-cacao/80">
            <div className="flex items-start gap-2">
              <span className="bg-coral text-white rounded-full w-5 h-5 text-xs flex items-center justify-center flex-shrink-0">
                1
              </span>
              <span>
                Descarga <strong>Google Authenticator</strong>,{" "}
                <strong>Microsoft Authenticator</strong> o <strong>Authy</strong>{" "}
                en tu celular.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-coral text-white rounded-full w-5 h-5 text-xs flex items-center justify-center flex-shrink-0">
                2
              </span>
              <span>Escanea este código QR con la app:</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-perla rounded-suave p-4 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrCode} alt="Código QR" className="w-48 h-48" />
          </div>

          {/* Secret alternativo */}
          {secret && (
            <div className="space-y-1">
              <p className="text-xs text-cacao/60">
                O ingresa este código manualmente:
              </p>
              <div className="flex items-center gap-2 bg-perla rounded-suave p-2">
                <code className="flex-1 text-xs text-cacao font-mono break-all">
                  {secret}
                </code>
                <button
                  onClick={copySecret}
                  className="text-coral hover:text-coral/80 flex-shrink-0"
                  title="Copiar"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Verificacion */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="bg-coral text-white rounded-full w-5 h-5 text-xs flex items-center justify-center flex-shrink-0">
                3
              </span>
              <span className="text-sm text-cacao/80">
                Ingresa el código de 6 dígitos que muestra la app:
              </span>
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={verifyCode}
              onChange={(e) =>
                setVerifyCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="123456"
              className="w-full px-4 py-3 rounded-suave border border-petalo/40 bg-perla text-cacao text-2xl text-center tracking-widest font-mono focus:border-coral focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={cancelEnrollment}
              disabled={verifying}
              className="btn-secundario flex-1"
            >
              Cancelar
            </button>
            <button
              onClick={verifyEnrollment}
              disabled={verifyCode.length !== 6 || verifying}
              className="btn-primario flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {verifying && <Loader2 className="w-4 h-4 animate-spin" />}
              {verifying ? "Verificando..." : "Verificar y activar"}
            </button>
          </div>

          <p className="text-[10px] text-cacao/50 flex items-start gap-1">
            <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
            Guarda el código manual en un lugar seguro por si pierdes tu celular.
          </p>
        </div>
      )}
    </div>
  );
}
