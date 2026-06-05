"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  X,
  Droplet,
  Trash2,
  Loader2,
  Heart,
  Smile,
  NotebookPen,
  HeartPulse,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SYMPTOMS, BODY_ZONE_LABELS, type BodyZone } from "@/lib/data/symptoms";
import { MOODS, type MoodType } from "@/lib/data/moods";
import BodySilhouette from "@/components/body-map/body-silhouette";
import type { DailyLog } from "./calendar-view";

interface Props {
  date: Date;
  existingLog: DailyLog | null;
  onClose: () => void;
  onLogUpdated: (date: string, log: DailyLog | null) => void;
}

type Tab = "period" | "symptoms" | "mood" | "notes" | "relation";

const FLOW_INTENSITIES = [
  { value: "spotting", label: "Manchado", drops: 1 },
  { value: "light", label: "Leve", drops: 2 },
  { value: "moderate", label: "Moderado", drops: 3 },
  { value: "heavy", label: "Intenso", drops: 4 },
] as const;

/**
 * Modal completo de registro del dia.
 *
 * Tabs:
 * - Periodo: menstruacion + intensidad
 * - Sintomas: lista + mapa corporal
 * - Animo: 8 emojis
 * - Notas: texto libre
 * - Relacion: con/sin proteccion + hora + observacion
 */
export default function DayModal({
  date,
  existingLog,
  onClose,
  onLogUpdated,
}: Props) {
  const supabase = createClient();
  const dateStr = format(date, "yyyy-MM-dd");
  const displayDate = format(date, "EEEE, d 'de' MMMM", { locale: es });

  // Tab activo
  const [activeTab, setActiveTab] = useState<Tab>("period");

  // === Estados de cada seccion ===
  const [isMenstruation, setIsMenstruation] = useState(
    existingLog?.is_menstruation || false
  );
  const [intensity, setIntensity] = useState<string>(
    existingLog?.flow_intensity || "moderate"
  );

  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [selectedZone, setSelectedZone] = useState<BodyZone | null>(null);

  const [selectedMoods, setSelectedMoods] = useState<Set<MoodType>>(new Set());

  const [note, setNote] = useState("");

  const [hasRelation, setHasRelation] = useState(false);
  const [withProtection, setWithProtection] = useState(true);
  const [relationTime, setRelationTime] = useState("");
  const [relationObservation, setRelationObservation] = useState("");

  // === Estados de UI ===
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // === Cargar datos del dia al abrir ===
  useEffect(() => {
    async function fetchDayData() {
      setFetching(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setFetching(false);
        return;
      }

      // Daily log (nota)
      const { data: log } = await supabase
        .from("daily_logs")
        .select("note")
        .eq("user_id", user.id)
        .eq("log_date", dateStr)
        .maybeSingle();
      if (log?.note) setNote(log.note);

      // Sintomas
      const { data: syms } = await supabase
        .from("symptoms")
        .select("symptom_type")
        .eq("user_id", user.id)
        .eq("log_date", dateStr);
      if (syms) {
        setSelectedSymptoms(new Set(syms.map((s: { symptom_type: string }) => s.symptom_type)));
      }

      // Animos
      const { data: mds } = await supabase
        .from("moods")
        .select("mood_type")
        .eq("user_id", user.id)
        .eq("log_date", dateStr);
      if (mds) {
        setSelectedMoods(new Set(mds.map((m: { mood_type: MoodType }) => m.mood_type)));
      }

      // Relacion
      const { data: rel } = await supabase
        .from("relations")
        .select("with_protection, relation_time, observation")
        .eq("user_id", user.id)
        .eq("relation_date", dateStr)
        .maybeSingle();
      if (rel) {
        setHasRelation(true);
        setWithProtection(rel.with_protection);
        setRelationTime(rel.relation_time || "");
        setRelationObservation(rel.observation || "");
      }

      setFetching(false);
    }
    fetchDayData();
  }, [dateStr, supabase]);

  // Zonas que tienen sintomas (para el mapa corporal)
  const zonesWithSymptoms = new Set<BodyZone>(
    SYMPTOMS.filter((s) => selectedSymptoms.has(s.id)).map((s) => s.zone)
  );

  // === Toggle helpers ===
  function toggleSymptom(id: string) {
    setSelectedSymptoms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleMood(id: MoodType) {
    setSelectedMoods((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // === Guardar todo ===
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

    try {
      // 1. Upsert daily_log
      const { data: log, error: logError } = await supabase
        .from("daily_logs")
        .upsert(
          {
            user_id: user.id,
            log_date: dateStr,
            is_menstruation: isMenstruation,
            flow_intensity: isMenstruation ? intensity : null,
            note: note.trim() || null,
          },
          { onConflict: "user_id,log_date" }
        )
        .select("id, log_date, is_menstruation, flow_intensity")
        .single();

      if (logError) throw logError;

      // 2. Reemplazar sintomas
      await supabase.from("symptoms").delete().eq("user_id", user.id).eq("log_date", dateStr);
      if (selectedSymptoms.size > 0) {
        const symptomsToInsert = Array.from(selectedSymptoms).map((id) => {
          const cat = SYMPTOMS.find((s) => s.id === id);
          return {
            user_id: user.id,
            daily_log_id: log.id,
            log_date: dateStr,
            symptom_type: id,
            body_zone: cat?.zone || "general",
          };
        });
        const { error: symError } = await supabase.from("symptoms").insert(symptomsToInsert);
        if (symError) throw symError;
      }

      // 3. Reemplazar animos
      await supabase.from("moods").delete().eq("user_id", user.id).eq("log_date", dateStr);
      if (selectedMoods.size > 0) {
        const moodsToInsert = Array.from(selectedMoods).map((mood_type) => ({
          user_id: user.id,
          daily_log_id: log.id,
          log_date: dateStr,
          mood_type,
        }));
        const { error: moodError } = await supabase.from("moods").insert(moodsToInsert);
        if (moodError) throw moodError;
      }

      // 4. Reemplazar relacion
      await supabase.from("relations").delete().eq("user_id", user.id).eq("relation_date", dateStr);
      if (hasRelation) {
        const { error: relError } = await supabase.from("relations").insert({
          user_id: user.id,
          relation_date: dateStr,
          relation_time: relationTime || null,
          with_protection: withProtection,
          observation: relationObservation.trim() || null,
        });
        if (relError) throw relError;
      }

      onLogUpdated(dateStr, {
        log_date: dateStr,
        is_menstruation: isMenstruation,
        flow_intensity: log?.flow_intensity || null,
      });
      setLoading(false);
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al guardar";
      setError(message);
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("symptoms").delete().eq("user_id", user.id).eq("log_date", dateStr);
    await supabase.from("moods").delete().eq("user_id", user.id).eq("log_date", dateStr);
    await supabase.from("relations").delete().eq("user_id", user.id).eq("relation_date", dateStr);
    await supabase.from("daily_logs").delete().eq("user_id", user.id).eq("log_date", dateStr);
    onLogUpdated(dateStr, null);
    setLoading(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-cacao/40 backdrop-blur-sm"
      />

      <div className="relative w-full sm:max-w-md bg-perla rounded-t-3xl sm:rounded-suave shadow-petalo animate-florecer max-h-[92vh] overflow-y-auto">
        {/* Handle movil */}
        <div className="sm:hidden flex justify-center pt-3 sticky top-0 bg-perla">
          <div className="w-12 h-1 bg-petalo/40 rounded-full" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-petalo/30 transition z-10"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4 text-cacao/60" />
        </button>

        <div className="p-5 space-y-4">
          {/* Header */}
          <div className="space-y-1">
            <p className="text-xs text-cacao/60 uppercase tracking-wider font-medium">
              Registro del día
            </p>
            <h2 className="font-display text-2xl text-cacao capitalize">
              {displayDate}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto -mx-1 px-1 pb-1 scrollbar-hide">
            <TabButton tab="period" active={activeTab} icon={Droplet} label="Período" onClick={setActiveTab} />
            <TabButton tab="symptoms" active={activeTab} icon={HeartPulse} label="Síntomas" onClick={setActiveTab} />
            <TabButton tab="mood" active={activeTab} icon={Smile} label="Ánimo" onClick={setActiveTab} />
            <TabButton tab="notes" active={activeTab} icon={NotebookPen} label="Notas" onClick={setActiveTab} />
            <TabButton tab="relation" active={activeTab} icon={Heart} label="Relación" onClick={setActiveTab} />
          </div>

          {/* Contenido del tab */}
          {fetching ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-6 h-6 text-coral animate-spin" />
            </div>
          ) : (
            <div className="min-h-[200px]">
              {activeTab === "period" && (
                <PeriodSection
                  isMenstruation={isMenstruation}
                  setIsMenstruation={setIsMenstruation}
                  intensity={intensity}
                  setIntensity={setIntensity}
                />
              )}
              {activeTab === "symptoms" && (
                <SymptomsSection
                  selectedSymptoms={selectedSymptoms}
                  toggleSymptom={toggleSymptom}
                  selectedZone={selectedZone}
                  setSelectedZone={setSelectedZone}
                  zonesWithSymptoms={zonesWithSymptoms}
                />
              )}
              {activeTab === "mood" && (
                <MoodSection
                  selectedMoods={selectedMoods}
                  toggleMood={toggleMood}
                />
              )}
              {activeTab === "notes" && (
                <NotesSection note={note} setNote={setNote} />
              )}
              {activeTab === "relation" && (
                <RelationSection
                  hasRelation={hasRelation}
                  setHasRelation={setHasRelation}
                  withProtection={withProtection}
                  setWithProtection={setWithProtection}
                  relationTime={relationTime}
                  setRelationTime={setRelationTime}
                  relationObservation={relationObservation}
                  setRelationObservation={setRelationObservation}
                />
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-error/15 border border-error/30 rounded-suave px-4 py-3 text-sm text-cacao">
              {error}
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-2 pt-2 sticky bottom-0 bg-perla">
            {existingLog && (
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-3 py-3 rounded-botón text-error hover:bg-error/10 transition flex items-center disabled:opacity-50"
                aria-label="Borrar dia"
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

// =============================================
// SUB-COMPONENTES de cada tab
// =============================================

function TabButton({
  tab,
  active,
  icon: Icon,
  label,
  onClick,
}: {
  tab: Tab;
  active: Tab;
  icon: React.ElementType;
  label: string;
  onClick: (t: Tab) => void;
}) {
  const isActive = active === tab;
  return (
    <button
      onClick={() => onClick(tab)}
      className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-botón transition text-sm ${
        isActive
          ? "bg-coral text-white"
          : "bg-crema text-cacao/70 hover:bg-petalo/30"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

function PeriodSection({
  isMenstruation,
  setIsMenstruation,
  intensity,
  setIntensity,
}: {
  isMenstruation: boolean;
  setIsMenstruation: (v: boolean) => void;
  intensity: string;
  setIntensity: (v: string) => void;
}) {
  return (
    <div className="space-y-3 animate-florecer">
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
              className={`w-5 h-5 ${isMenstruation ? "text-white" : "text-coral"}`}
              fill={isMenstruation ? "white" : "none"}
            />
          </div>
          <div className="text-left">
            <p className="font-medium text-cacao">Día de menstruación</p>
            <p className="text-xs text-cacao/60">
              {isMenstruation ? "Sí, tuve mi período" : "Tócame para activar"}
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

      {isMenstruation && (
        <div className="space-y-2 animate-florecer">
          <p className="text-sm font-medium text-cacao px-1">Intensidad del flujo</p>
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
                      className={`w-3 h-3 ${i < opt.drops ? "text-coral" : "text-cacao/15"}`}
                      fill={i < opt.drops ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-cacao">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SymptomsSection({
  selectedSymptoms,
  toggleSymptom,
  selectedZone,
  setSelectedZone,
  zonesWithSymptoms,
}: {
  selectedSymptoms: Set<string>;
  toggleSymptom: (id: string) => void;
  selectedZone: BodyZone | null;
  setSelectedZone: (z: BodyZone | null) => void;
  zonesWithSymptoms: Set<BodyZone>;
}) {
  // Si hay zona seleccionada, mostrar sintomas de esa zona
  // Si no, mostrar todos
  const visibleSymptoms = selectedZone
    ? SYMPTOMS.filter((s) => s.zone === selectedZone)
    : SYMPTOMS;

  return (
    <div className="space-y-4 animate-florecer">
      {/* Mapa corporal */}
      <div className="flex justify-center">
        <BodySilhouette
          selectedZone={selectedZone}
          onZoneClick={(z) => setSelectedZone(selectedZone === z ? null : z)}
          zonesWithSymptoms={zonesWithSymptoms}
        />
      </div>

      {/* Filtro activo */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm font-medium text-cacao">
          {selectedZone
            ? `Síntomas en ${BODY_ZONE_LABELS[selectedZone]}`
            : "Todos los síntomas"}
        </p>
        {selectedZone && (
          <button
            onClick={() => setSelectedZone(null)}
            className="text-xs text-coral hover:underline"
          >
            Ver todos
          </button>
        )}
      </div>

      {/* Lista de sintomas */}
      <div className="flex flex-wrap gap-2">
        {visibleSymptoms.map((symptom) => {
          const selected = selectedSymptoms.has(symptom.id);
          return (
            <button
              key={symptom.id}
              onClick={() => toggleSymptom(symptom.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-botón border-2 text-sm transition ${
                selected
                  ? "border-coral bg-petalo/20 text-cacao"
                  : "border-petalo/30 bg-crema text-cacao/70 hover:border-petalo"
              }`}
            >
              <span>{symptom.emoji}</span>
              <span>{symptom.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MoodSection({
  selectedMoods,
  toggleMood,
}: {
  selectedMoods: Set<MoodType>;
  toggleMood: (id: MoodType) => void;
}) {
  return (
    <div className="space-y-3 animate-florecer">
      <p className="text-sm text-cacao/70 px-1">
        ¿Cómo te sentiste hoy? Puedes elegir varios.
      </p>
      <div className="grid grid-cols-4 gap-2">
        {MOODS.map((mood) => {
          const selected = selectedMoods.has(mood.id);
          return (
            <button
              key={mood.id}
              onClick={() => toggleMood(mood.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-suave border-2 transition ${
                selected
                  ? `${mood.borderColor} ${mood.bgColor}`
                  : "border-petalo/30 bg-crema hover:border-petalo"
              }`}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-[10px] text-cacao font-medium">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NotesSection({
  note,
  setNote,
}: {
  note: string;
  setNote: (v: string) => void;
}) {
  return (
    <div className="space-y-2 animate-florecer">
      <p className="text-sm text-cacao/70 px-1">
        Anota cómo te sentiste, qué hiciste o cualquier cosa que quieras recordar.
      </p>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={500}
        rows={6}
        placeholder="Hoy tuve cólicos débiles pero me sentí muy productiva..."
        className="w-full px-4 py-3 rounded-suave border border-petalo/40 bg-perla text-cacao placeholder:text-cacao/40 focus:border-coral focus:outline-none focus:ring-2 focus:ring-petalo/30 transition resize-none"
      />
      <p className="text-xs text-cacao/50 text-right">
        {note.length} / 500
      </p>
    </div>
  );
}

function RelationSection({
  hasRelation,
  setHasRelation,
  withProtection,
  setWithProtection,
  relationTime,
  setRelationTime,
  relationObservation,
  setRelationObservation,
}: {
  hasRelation: boolean;
  setHasRelation: (v: boolean) => void;
  withProtection: boolean;
  setWithProtection: (v: boolean) => void;
  relationTime: string;
  setRelationTime: (v: string) => void;
  relationObservation: string;
  setRelationObservation: (v: string) => void;
}) {
  return (
    <div className="space-y-3 animate-florecer">
      <button
        onClick={() => setHasRelation(!hasRelation)}
        className={`w-full flex items-center justify-between p-4 rounded-suave border-2 transition ${
          hasRelation
            ? "border-coral bg-petalo/20"
            : "border-petalo/30 bg-crema hover:border-petalo"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              hasRelation ? "bg-coral" : "bg-petalo/40"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${hasRelation ? "text-white" : "text-coral"}`}
              fill={hasRelation ? "white" : "none"}
            />
          </div>
          <div className="text-left">
            <p className="font-medium text-cacao">Tuve relación</p>
            <p className="text-xs text-cacao/60">
              {hasRelation ? "Registrada" : "Tócame para registrar"}
            </p>
          </div>
        </div>
        <div
          className={`w-12 h-6 rounded-full transition-colors relative ${
            hasRelation ? "bg-coral" : "bg-cacao/20"
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 bg-perla rounded-full transition-all ${
              hasRelation ? "right-0.5" : "left-0.5"
            }`}
          />
        </div>
      </button>

      {hasRelation && (
        <div className="space-y-3 animate-florecer">
          {/* Proteccion */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setWithProtection(true)}
              className={`p-3 rounded-suave border-2 text-sm transition ${
                withProtection
                  ? "border-fertil bg-menta/30"
                  : "border-petalo/30 bg-crema hover:border-petalo"
              }`}
            >
              🛡️ Con protección
            </button>
            <button
              onClick={() => setWithProtection(false)}
              className={`p-3 rounded-suave border-2 text-sm transition ${
                !withProtection
                  ? "border-coral bg-petalo/20"
                  : "border-petalo/30 bg-crema hover:border-petalo"
              }`}
            >
              ⚠️ Sin protección
            </button>
          </div>

          {/* Hora */}
          <div className="space-y-1">
            <label className="text-xs text-cacao/70">Hora (opcional)</label>
            <input
              type="time"
              value={relationTime}
              onChange={(e) => setRelationTime(e.target.value)}
              className="w-full px-3 py-2 rounded-suave border border-petalo/40 bg-perla text-cacao focus:border-coral focus:outline-none transition"
            />
          </div>

          {/* Observacion */}
          <div className="space-y-1">
            <label className="text-xs text-cacao/70">Observación (opcional)</label>
            <textarea
              value={relationObservation}
              onChange={(e) => setRelationObservation(e.target.value)}
              maxLength={200}
              rows={2}
              placeholder="Notas privadas..."
              className="w-full px-3 py-2 rounded-suave border border-petalo/40 bg-perla text-cacao placeholder:text-cacao/40 focus:border-coral focus:outline-none transition resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
