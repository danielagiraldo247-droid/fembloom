"use client";

import { useState, useMemo } from "react";
import { format, parseISO, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import {
  Droplet,
  HeartPulse,
  Smile,
  Heart,
  Calendar,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { SYMPTOMS, BODY_ZONE_LABELS } from "@/lib/data/symptoms";
import { MOODS } from "@/lib/data/moods";

type Tab = "cycles" | "symptoms" | "moods" | "relations";

interface Cycle {
  id: string;
  start_date: string;
  end_date: string | null;
  cycle_length: number | null;
  period_length: number | null;
}

interface DailyLog {
  log_date: string;
  is_menstruation: boolean;
  flow_intensity: string | null;
  note: string | null;
}

interface Symptom {
  log_date: string;
  symptom_type: string;
  body_zone: string | null;
}

interface Mood {
  log_date: string;
  mood_type: string;
}

interface Relation {
  relation_date: string;
  with_protection: boolean;
  in_fertile_window: boolean;
}

interface Props {
  cycles: Cycle[];
  dailyLogs: DailyLog[];
  symptoms: Symptom[];
  moods: Mood[];
  relations: Relation[];
}

export default function HistorialesView({
  cycles,
  dailyLogs,
  symptoms,
  moods,
  relations,
}: Props) {
  const [tab, setTab] = useState<Tab>("cycles");

  // Stats de sintomas
  const symptomStats = useMemo(() => {
    const counts = new Map<string, number>();
    symptoms.forEach((s) => {
      counts.set(s.symptom_type, (counts.get(s.symptom_type) || 0) + 1);
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({
        type,
        count,
        symptom: SYMPTOMS.find((sym) => sym.id === type),
      }));
  }, [symptoms]);

  // Stats de animo
  const moodStats = useMemo(() => {
    const counts = new Map<string, number>();
    moods.forEach((m) => {
      counts.set(m.mood_type, (counts.get(m.mood_type) || 0) + 1);
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({
        type,
        count,
        mood: MOODS.find((mood) => mood.id === type),
      }));
  }, [moods]);

  // Detectar ciclos irregulares
  const cyclesWithStats = useMemo(() => {
    return cycles.map((c, i) => {
      const next = cycles[i - 1];
      const duration = next
        ? differenceInDays(parseISO(next.start_date), parseISO(c.start_date))
        : null;
      const isIrregular = duration && (duration < 21 || duration > 35);
      return { ...c, duration, isIrregular };
    });
  }, [cycles]);

  const protectedCount = relations.filter((r) => r.with_protection).length;
  const fertileWindowRelations = relations.filter((r) => r.in_fertile_window).length;

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 space-y-5 animate-florecer">
      <header>
        <h1 className="font-display text-4xl text-cacao">Historiales 📊</h1>
        <p className="text-cacao/70 mt-1 text-sm">
          Tu historial completo organizado
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto -mx-1 px-1 pb-1 scrollbar-hide">
        <TabBtn tab="cycles" active={tab} onClick={setTab} icon={Droplet} label="Ciclos" />
        <TabBtn tab="symptoms" active={tab} onClick={setTab} icon={HeartPulse} label="Síntomas" />
        <TabBtn tab="moods" active={tab} onClick={setTab} icon={Smile} label="Ánimo" />
        <TabBtn tab="relations" active={tab} onClick={setTab} icon={Heart} label="Relaciones" />
      </div>

      {/* CICLOS */}
      {tab === "cycles" && (
        <section className="space-y-3 animate-florecer">
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              value={cycles.length}
              label="ciclos registrados"
              icon={Droplet}
              color="coral"
            />
            <StatCard
              value={dailyLogs.filter((l) => l.is_menstruation).length}
              label="días de menstruación"
              icon={Calendar}
              color="petalo"
            />
          </div>

          {cyclesWithStats.length === 0 ? (
            <EmptyState text="Aún no tienes ciclos registrados" />
          ) : (
            <div className="tarjeta space-y-3">
              <h3 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider">
                Tus ciclos
              </h3>
              {cyclesWithStats.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between py-2 border-b border-petalo/20 last:border-0"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-cacao capitalize">
                      {format(parseISO(c.start_date), "d 'de' MMMM yyyy", {
                        locale: es,
                      })}
                    </p>
                    {c.duration && (
                      <p className="text-xs text-cacao/60">
                        Duración: {c.duration} días
                      </p>
                    )}
                  </div>
                  {c.isIrregular && (
                    <span className="flex items-center gap-1 text-[10px] bg-durazno/40 text-coral px-2 py-0.5 rounded-full font-semibold">
                      <AlertTriangle className="w-3 h-3" />
                      Irregular
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* SINTOMAS */}
      {tab === "symptoms" && (
        <section className="space-y-3 animate-florecer">
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              value={symptoms.length}
              label="síntomas totales"
              icon={HeartPulse}
              color="coral"
            />
            <StatCard
              value={symptomStats[0]?.symptom?.label || "—"}
              label="más frecuente"
              icon={TrendingUp}
              color="lavanda"
              small
            />
          </div>

          {symptomStats.length === 0 ? (
            <EmptyState text="Aún no tienes síntomas registrados" />
          ) : (
            <div className="tarjeta space-y-3">
              <h3 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider">
                Frecuencia de síntomas
              </h3>
              {symptomStats.map(({ type, count, symptom }) => (
                <div key={type} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-cacao">
                      <span className="text-lg">{symptom?.emoji || "•"}</span>
                      {symptom?.label || type}
                    </span>
                    <span className="font-semibold text-coral">{count}</span>
                  </div>
                  <div className="h-1.5 bg-petalo/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-coral"
                      style={{
                        width: `${Math.min(100, (count / symptomStats[0].count) * 100)}%`,
                      }}
                    />
                  </div>
                  {symptom?.zone && (
                    <p className="text-[10px] text-cacao/50">
                      Zona: {BODY_ZONE_LABELS[symptom.zone]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ANIMO */}
      {tab === "moods" && (
        <section className="space-y-3 animate-florecer">
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              value={moods.length}
              label="registros de ánimo"
              icon={Smile}
              color="lavanda"
            />
            <StatCard
              value={moodStats[0]?.mood?.label || "—"}
              label="más frecuente"
              icon={TrendingUp}
              color="durazno"
              small
            />
          </div>

          {moodStats.length === 0 ? (
            <EmptyState text="Aún no tienes ánimos registrados" />
          ) : (
            <div className="tarjeta space-y-3">
              <h3 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider">
                Distribución de emociones
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {moodStats.map(({ type, count, mood }) => (
                  <div
                    key={type}
                    className="flex items-center gap-3 p-3 rounded-suave bg-crema"
                  >
                    <span className="text-3xl">{mood?.emoji || "•"}</span>
                    <div>
                      <p className="text-xs text-cacao/60">{mood?.label || type}</p>
                      <p className="font-display text-2xl text-coral leading-none">
                        {count}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* RELACIONES */}
      {tab === "relations" && (
        <section className="space-y-3 animate-florecer">
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              value={relations.length}
              label="relaciones totales"
              icon={Heart}
              color="coral"
            />
            <StatCard
              value={`${protectedCount}/${relations.length}`}
              label="con protección"
              icon={Heart}
              color="fertil"
              small
            />
          </div>

          {relations.length === 0 ? (
            <EmptyState text="Aún no tienes relaciones registradas" />
          ) : (
            <div className="tarjeta space-y-3">
              <h3 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider">
                Resumen
              </h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-menta/30 rounded-suave p-3">
                  <p className="font-display text-2xl text-fertil">
                    {protectedCount}
                  </p>
                  <p className="text-xs text-cacao/70">Con protección</p>
                </div>
                <div className="bg-petalo/30 rounded-suave p-3">
                  <p className="font-display text-2xl text-coral">
                    {relations.length - protectedCount}
                  </p>
                  <p className="text-xs text-cacao/70">Sin protección</p>
                </div>
              </div>

              {fertileWindowRelations > 0 && (
                <div className="bg-durazno/30 rounded-suave p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-cacao/80">
                    <span className="font-semibold">{fertileWindowRelations}</span> de tus
                    relaciones fueron durante tu ventana fértil
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

// ===========================================
// Subcomponentes
// ===========================================

function TabBtn({
  tab,
  active,
  onClick,
  icon: Icon,
  label,
}: {
  tab: Tab;
  active: Tab;
  onClick: (t: Tab) => void;
  icon: React.ElementType;
  label: string;
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

function StatCard({
  value,
  label,
  icon: Icon,
  color,
  small = false,
}: {
  value: string | number;
  label: string;
  icon: React.ElementType;
  color: "coral" | "petalo" | "lavanda" | "fertil" | "durazno";
  small?: boolean;
}) {
  const colorMap: Record<string, string> = {
    coral: "text-coral",
    petalo: "text-coral",
    lavanda: "text-lavanda",
    fertil: "text-fertil",
    durazno: "text-coral",
  };
  return (
    <div className="tarjeta space-y-1">
      <Icon className={`w-4 h-4 ${colorMap[color]}`} strokeWidth={1.5} />
      <p className={`font-display text-coral ${small ? "text-base" : "text-2xl"}`}>
        {value}
      </p>
      <p className="text-[10px] text-cacao/60">{label}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="tarjeta text-center py-8 space-y-2">
      <div className="text-4xl opacity-30">📊</div>
      <p className="text-sm text-cacao/70">{text}</p>
      <p className="text-xs text-cacao/50">
        Empieza a registrar en tu calendario 🌸
      </p>
    </div>
  );
}
