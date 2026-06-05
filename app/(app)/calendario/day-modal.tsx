"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { X, Droplet, Trash2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { DailyLog } from "./calendar-view";

interface Props {
  date: Date;
  existingLog: DailyLog | null;
  onClose: () => void;
  onLogUpdated: (date: string, log: DailyLog | null) => void;
}

const FLOW_INTENSITIES = [
  { value: "spotting", label: "Manchado", drops: 1 },
  { value: "light", label: "Leve", drops: 2 },
  { value: "moderate", label: "Moderado", drops: 3 },
  { value: "heavy", label: "Intenso", drops: 4 },
] as const;

/**
 * Modal que aparece al tocar un dia del calendario.
 *
 * En Dia 2 permite:
 * - Marcar/desmarcar como dia de menstruacion
 * - Seleccionar intensidad del flujo (1-4 gotas)
 *
 * En Dia 3 agregaremos: sintomas, animo, notas y relaciones.
 */
export default function DayModal({
  date,
  existingLog,
  onClose,
  onLogUpdated,
}: Props) {
  const supabase = createClient();

  const [isMenstruation, setIsMenstruation] = useState(
    existingLog?.is_menstruation || false
  );
  const [intensity, setIntensity] = useState<string>(
    existingLog?.flow_intensity || "moderate"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dateStr = format(date, "yyyy-MM-dd");
  const displayDate = format(date, "EEEE, d 'de' MMMM", { locale: es });

  async function handleSave() {
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("Tu sesion expiro. Vuelve a iniciar sesion.");
      setLoading(false);
      return;
    }

    const { data, error: saveError } = await supabase
      .from("daily_logs")
      .upsert(
        {
          user_id: user.id,
          log_date: dateStr,
          is_menstruation: isMenstruation,
          flow_intensity: isMenstruation ? intensity : null,
        },
        { onConflict: "user_id,log_date" }
      )
      .select("log_date, is_menstruation, flow_intensity")
      .single();

    if (saveError) {
      setError(saveError.message);
      setLoading(false);
      return;
    }

    if (data) {
      onLogUpdated(dateStr, data as DailyLog);
    }
    setLoading(false);
    onClose();
  }

  async function handleDelete() {
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error: deleteError } = await supabase
      .from("daily_logs")
      .delete()
      .eq("user_id", user.id)
      .eq("log_date", dateStr);

    if (deleteError) {
      setError(deleteError.message);
      setLoading(false);
      return;
    }

    onLogUpdated(dateStr, null);
    setLoading(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Fondo oscurecido */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-cacao/40 backdrop-blur-sm"
      />

      {/* Contenido del modal */}
      <div className="relative w-full sm:max-w-md bg-perla rounded-t-3xl sm:rounded-suave shadow-petalo animate-florecer max-h-[90vh] overflow-y-auto">
        {/* Handle (movil) */}
        <div className="sm:hidden flex justify-center pt-3">
          <div className="w-12 h-1 bg-petalo/40 rounded-full" />
        </div>

        {/* Boton cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-petalo/30 transition z-10"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4 text-cacao/60" />
        </button>

        <div className="p-6 space-y-5">
          {/* Encabezado */}
          <div className="space-y-1">
            <p className="text-xs text-cacao/60 uppercase tracking-wider font-medium">
              Registro del día
            </p>
            <h2 className="font-display text-2xl text-cacao capitalize">
              {displayDate}
            </h2>
          </div>

          {/* Toggle menstruacion */}
          <button
            onClick={() => setIsMenstruation(!isMenstruation)}
            className={`w-full flex items-center justify-between p-4 rounded-suave border-2 transition ${
              isMenstruation
                ? "border-coral bg-petalo/20"
                : "border-petalo/30 bg-crema hover:border-petalo"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isMenstruation ? "bg-coral" : "bg-petalo/40"
                }`}
              >
                <Droplet
                  className={`w-5 h-5 ${
                    isMenstruation ? "text-white" : "text-coral"
                  }`}
                  fill={isMenstruation ? "white" : "none"}
                />
              </div>
              <div className="text-left">
                <p className="font-medium text-cacao">Día de menstruación</p>
                <p className="text-xs text-cacao/60">
                  {isMenstruation
                    ? "Sí, tuve mi período este día"
                    : "Tócame si tuviste tu período"}
                </p>
              </div>
            </div>
            <div
              className={`w-12 h-6 rounded-full transition-colors relative ${
                isMenstruation ? "bg-coral" : "bg-cacao/20"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-perla rounded-full transition-all ${
                  isMenstruation ? "right-0.5" : "left-0.5"
                }`}
              />
            </div>
          </button>

          {/* Intensidad del flujo */}
          {isMenstruation && (
            <div className="space-y-2 animate-florecer">
              <p className="text-sm font-medium text-cacao px-1">
                ¿Qué tan intenso fue el flujo?
              </p>
              <div className="grid grid-cols-4 gap-2">
                {FLOW_INTENSITIES.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setIntensity(opt.value)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-suave border-2 transition ${
                      intensity === opt.value
                        ? "border-coral bg-petalo/20"
                        : "border-petalo/30 bg-crema hover:border-petalo"
                    }`}
                  >
                    <div className="flex gap-0.5">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Droplet
                          key={i}
                          className={`w-3 h-3 ${
                            i < opt.drops
                              ? "text-coral"
                              : "text-cacao/15"
                          }`}
                          fill={i < opt.drops ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-cacao">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hint */}
          <div className="text-center text-xs text-cacao/50 py-1">
            Mañana podrás registrar también síntomas, ánimo, notas y relaciones 🌸
          </div>

          {/* Error */}
          {error && (
            <div className="bg-error/15 border border-error/30 rounded-suave px-4 py-3 text-sm text-cacao">
              {error}
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-2 pt-1">
            {existingLog && (
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-3 py-3 rounded-botón text-error hover:bg-error/10 transition flex items-center gap-2 disabled:opacity-50"
                aria-label="Borrar registro"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              disabled={loading}
              className="btn-secundario flex-1 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="btn-primario flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Guardando..." : "Guardar 🌸"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
