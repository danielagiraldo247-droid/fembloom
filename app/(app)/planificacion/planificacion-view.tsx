"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { METHODS, type MethodType } from "@/lib/data/contraceptive-methods";
import { Check, Loader2, Bell, Shield } from "lucide-react";

interface Props {
  initialMethod: {
    method_type: MethodType;
    start_date?: string | null;
    next_action_date?: string | null;
    daily_reminder_time?: string | null;
  } | null;
}

export default function PlanificacionView({ initialMethod }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [selectedMethod, setSelectedMethod] = useState<MethodType | null>(
    initialMethod?.method_type || null
  );
  const [startDate, setStartDate] = useState(initialMethod?.start_date || "");
  const [renewalDate, setRenewalDate] = useState(
    initialMethod?.next_action_date || ""
  );
  const [reminderTime, setReminderTime] = useState(
    initialMethod?.daily_reminder_time || "08:00"
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const method = METHODS.find((m) => m.id === selectedMethod);

  async function handleSave() {
    if (!selectedMethod) return;
    setLoading(true);
    setMessage(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setMessage("Sesion expirada");
      setLoading(false);
      return;
    }

    // Desactivar metodo anterior
    await supabase
      .from("contraceptive_methods")
      .update({ is_active: false })
      .eq("user_id", user.id);

    // Crear nuevo
    const { error } = await supabase.from("contraceptive_methods").insert({
      user_id: user.id,
      method_type: selectedMethod,
      start_date: startDate || null,
      next_action_date: renewalDate || null,
      daily_reminder_time: method?.needsTimeField ? reminderTime : null,
      is_active: true,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("¡Guardado! Tu método anticonceptivo está actualizado 🌸");
    setLoading(false);
    setTimeout(() => router.refresh(), 1500);
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 space-y-6 animate-florecer">
      <header>
        <h1 className="font-display text-4xl text-cacao">Planificación 💊</h1>
        <p className="text-cacao/70 mt-1 text-sm">
          Elige y configura tu método anticonceptivo
        </p>
      </header>

      {/* Grid de metodos */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider px-1">
          Tu método actual
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMethod(m.id)}
              className={`tarjeta text-left space-y-2 transition ${
                selectedMethod === m.id
                  ? "ring-2 ring-coral bg-petalo/10"
                  : "hover:shadow-petalo"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{m.emoji}</span>
                {selectedMethod === m.id && (
                  <div className="w-6 h-6 rounded-full bg-coral flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-cacao text-sm">{m.name}</p>
                <p className="text-[10px] text-cacao/60">{m.description}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-fertil">
                <Shield className="w-3 h-3" />
                <span>{m.effectiveness}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Configuracion del metodo seleccionado */}
      {method && (
        <section className="space-y-3 animate-florecer">
          <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider px-1">
            Configuración
          </h2>
          <div className="tarjeta space-y-4">
            <p className="text-sm text-cacao/80 leading-relaxed bg-menta/15 rounded-suave p-3">
              <span className="font-medium">{method.emoji} {method.name}.</span> {method.info}
            </p>

            {method.needsDateField && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-cacao">
                  Fecha de inicio o aplicación
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-suave border border-petalo/40 bg-perla text-cacao focus:border-coral focus:outline-none transition"
                />
              </div>
            )}

            {method.needsRenewalField && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-cacao">
                  {method.reminderLabel}
                </label>
                <input
                  type="date"
                  value={renewalDate}
                  onChange={(e) => setRenewalDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-suave border border-petalo/40 bg-perla text-cacao focus:border-coral focus:outline-none transition"
                />
              </div>
            )}

            {method.needsTimeField && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-cacao flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-coral" />
                  Hora del recordatorio diario
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-suave border border-petalo/40 bg-perla text-cacao focus:border-coral focus:outline-none transition"
                />
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={loading}
              className="btn-primario w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Guardando..." : "Guardar método 🌸"}
            </button>

            {message && (
              <div
                className={`rounded-suave px-4 py-3 text-sm ${
                  message.includes("Guardado")
                    ? "bg-menta/30 text-cacao"
                    : "bg-error/15 text-cacao"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
