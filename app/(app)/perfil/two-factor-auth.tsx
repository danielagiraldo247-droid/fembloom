"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Shield,
  ShieldCheck,
  Loader2,
  Mail,
  Check,
} from "lucide-react";

/**
 * Componente de gestion de autenticacion de dos factores (2FA) por correo.
 *
 * Cuando esta activado, cada vez que la usuaria inicia sesion con email+password,
 * se le envia un codigo de 6 digitos a su correo que debe ingresar para entrar.
 */
export default function TwoFactorAuth() {
  const supabase = createClient();
  const [enabled, setEnabled] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    loadStatus();
  }, []);

  async function loadStatus() {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      setUserEmail(user.email || "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("email_2fa_enabled")
        .eq("id", user.id)
        .single();

      setEnabled(profile?.email_2fa_enabled || false);
    } catch (err) {
      console.error("Error loading 2FA status:", err);
    } finally {
      setLoading(false);
    }
  }

  async function toggle2FA() {
    setSaving(true);
    setMessage(null);

    const newValue = !enabled;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({ email_2fa_enabled: newValue })
        .eq("id", user.id);

      if (error) throw error;

      setEnabled(newValue);
      setMessage({
        type: "success",
        text: newValue
          ? "✅ 2FA activada. La próxima vez que inicies sesión te enviaremos un código a tu correo."
          : "2FA desactivada. Tu cuenta es menos segura ahora.",
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al actualizar";
      setMessage({ type: "error", text: msg });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="tarjeta flex items-center justify-center py-6">
        <Loader2 className="w-5 h-5 text-coral animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Estado actual */}
      <div
        className={`tarjeta border ${
          enabled ? "border-fertil/30 bg-menta/15" : "border-petalo/30"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              enabled ? "bg-fertil/30" : "bg-petalo/30"
            }`}
          >
            {enabled ? (
              <ShieldCheck className="w-5 h-5 text-fertil" />
            ) : (
              <Shield className="w-5 h-5 text-coral" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-cacao text-sm">
              Verificación en dos pasos por correo
            </p>
            <p className="text-xs text-cacao/60 mt-0.5">
              {enabled
                ? "Activada — recibirás un código en tu correo al iniciar sesión"
                : "Añade una capa extra de seguridad con código enviado a tu correo"}
            </p>
          </div>
        </div>

        {/* Correo asociado */}
        {userEmail && (
          <div className="mt-3 bg-perla rounded-suave p-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-cacao/60 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-cacao/60">Correo asociado:</p>
              <p className="text-sm text-cacao font-medium truncate">
                {userEmail}
              </p>
            </div>
          </div>
        )}

        {/* Toggle */}
        <button
          onClick={toggle2FA}
          disabled={saving}
          className={`mt-3 w-full p-3 rounded-suave border-2 transition flex items-center justify-between disabled:opacity-50 ${
            enabled
              ? "border-fertil bg-menta/20"
              : "border-coral bg-petalo/15 hover:bg-petalo/25"
          }`}
        >
          <span className="text-sm font-medium text-cacao">
            {enabled ? "Desactivar 2FA" : "Activar verificación por correo"}
          </span>
          <div className="flex items-center gap-2">
            {saving && <Loader2 className="w-4 h-4 animate-spin text-cacao" />}
            <div
              className={`w-12 h-6 rounded-full relative transition-colors ${
                enabled ? "bg-fertil" : "bg-cacao/20"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-perla rounded-full transition-all ${
                  enabled ? "right-0.5" : "left-0.5"
                }`}
              />
            </div>
          </div>
        </button>
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

      {/* Info de cómo funciona */}
      {enabled && (
        <div className="tarjeta bg-bruma/15 space-y-2">
          <p className="text-sm font-medium text-cacao flex items-center gap-2">
            <Check className="w-4 h-4 text-fertil" /> ¿Cómo funciona?
          </p>
          <ol className="text-xs text-cacao/70 space-y-1 list-decimal list-inside">
            <li>Cuando inicies sesión con tu correo y contraseña</li>
            <li>Te enviaremos un código de 6 dígitos a {userEmail}</li>
            <li>Lo ingresas en la pantalla siguiente</li>
            <li>¡Entras a tu cuenta protegida! 🌸</li>
          </ol>
        </div>
      )}
    </div>
  );
}
