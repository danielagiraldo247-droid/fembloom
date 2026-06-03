"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Flower2,
  Calendar as CalendarIcon,
  Target,
  Heart,
  Sparkles,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  Loader2,
} from "lucide-react";

type Objetivo = "seeking_pregnancy" | "avoiding_pregnancy" | "tracking_only";

interface Props {
  nombre: string;
}

/**
 * Flujo de onboarding en 3 pasos:
 * 1. Fecha del ultimo periodo
 * 2. Duracion del ciclo y de la menstruacion
 * 3. Objetivo en la plataforma
 *
 * Al finalizar, guarda los datos en cycle_settings y profiles,
 * y redirige a /agenda.
 */
export default function OnboardingFlow({ nombre }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [objective, setObjective] = useState<Objetivo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canContinue =
    (step === 1 && !!lastPeriod) ||
    (step === 2 && cycleLength >= 21 && periodLength >= 2) ||
    (step === 3 && !!objective);

  async function handleFinish() {
    setError(null);
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    // 1. Guardar cycle_settings
    const { error: settingsError } = await supabase
      .from("cycle_settings")
      .insert({
        user_id: user.id,
        avg_cycle_length: cycleLength,
        avg_period_length: periodLength,
        last_period_start: lastPeriod,
      });

    if (settingsError) {
      setError(settingsError.message);
      setLoading(false);
      return;
    }

    // 2. Actualizar objetivo en profile
    await supabase
      .from("profiles")
      .update({ objective })
      .eq("id", user.id);

    // 3. Crear el primer ciclo en el historial
    await supabase.from("cycles").insert({
      user_id: user.id,
      start_date: lastPeriod,
    });

    // 4. Listo, a la agenda
    router.push("/agenda");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-6 animate-florecer">
        {/* Indicador de progreso */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-500 ${
                s <= step ? "bg-coral w-10" : "bg-petalo/40 w-4"
              }`}
            />
          ))}
        </div>

        {/* Paso 1: Ultimo periodo */}
        {step === 1 && (
          <div className="tarjeta space-y-6">
            <div className="text-center space-y-3">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-petalo/40 blur-2xl rounded-full" />
                <Flower2
                  className="relative w-14 h-14 text-coral mx-auto"
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="font-display text-3xl text-cacao">
                ¡Hola, {nombre}! 🌸
              </h1>
              <p className="text-sm text-cacao/70 leading-relaxed">
                Para personalizar tu experiencia, cuéntame cuándo fue
                el <strong>primer día</strong> de tu última menstruación.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lastPeriod"
                className="block text-sm font-medium text-cacao"
              >
                Fecha de tu último período
              </label>
              <input
                id="lastPeriod"
                type="date"
                value={lastPeriod}
                onChange={(e) => setLastPeriod(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 rounded-suave border border-petalo/40 bg-perla text-cacao focus:border-coral focus:outline-none focus:ring-2 focus:ring-petalo/30 transition"
              />
              <p className="text-xs text-cacao/60">
                Si no recuerdas exacto, escoge la fecha más cercana 💕
              </p>
            </div>
          </div>
        )}

        {/* Paso 2: Duracion */}
        {step === 2 && (
          <div className="tarjeta space-y-6">
            <div className="text-center space-y-3">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-bruma/40 blur-2xl rounded-full" />
                <CalendarIcon
                  className="relative w-14 h-14 text-lavanda mx-auto"
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="font-display text-3xl text-cacao">
                ¿Cuánto dura tu ciclo?
              </h1>
              <p className="text-sm text-cacao/70 leading-relaxed">
                El ciclo se mide desde el primer día de menstruación
                hasta el día antes de la siguiente.
              </p>
            </div>

            <div className="space-y-5">
              <NumberStepper
                label="Duración del ciclo"
                value={cycleLength}
                onChange={setCycleLength}
                min={21}
                max={45}
                unit="días"
                help="Promedio: 28 días"
              />
              <NumberStepper
                label="Duración de la menstruación"
                value={periodLength}
                onChange={setPeriodLength}
                min={2}
                max={10}
                unit="días"
                help="Promedio: 5 días"
              />
            </div>
          </div>
        )}

        {/* Paso 3: Objetivo */}
        {step === 3 && (
          <div className="tarjeta space-y-6">
            <div className="text-center space-y-3">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-menta/40 blur-2xl rounded-full" />
                <Target
                  className="relative w-14 h-14 text-fertil mx-auto"
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="font-display text-3xl text-cacao">
                ¿Cuál es tu objetivo?
              </h1>
              <p className="text-sm text-cacao/70 leading-relaxed">
                Elige cómo quieres que FemBloom te acompañe.
              </p>
            </div>

            <div className="space-y-3">
              <ObjectiveCard
                value="seeking_pregnancy"
                icon={Heart}
                label="Buscar embarazo"
                description="Quiero conocer mis días fértiles"
                selected={objective === "seeking_pregnancy"}
                onSelect={setObjective}
                color="coral"
              />
              <ObjectiveCard
                value="avoiding_pregnancy"
                icon={Sparkles}
                label="Evitar embarazo"
                description="Quiero saber mis días de riesgo"
                selected={objective === "avoiding_pregnancy"}
                onSelect={setObjective}
                color="lavanda"
              />
              <ObjectiveCard
                value="tracking_only"
                icon={BarChart3}
                label="Solo seguimiento"
                description="Quiero conocer mi cuerpo"
                selected={objective === "tracking_only"}
                onSelect={setObjective}
                color="fertil"
              />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-error/15 border border-error/30 rounded-suave px-4 py-3 text-sm text-cacao">
            {error}
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              disabled={loading}
              className="btn-secundario flex items-center justify-center gap-1 px-4"
            >
              <ChevronLeft className="w-4 h-4" />
              Atrás
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canContinue}
              className="btn-primario flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={!canContinue || loading}
              className="btn-primario flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Guardando..." : "¡Empezar! 🌸"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

// =====================
// Sub-componentes
// =====================

function NumberStepper({
  label,
  value,
  onChange,
  min,
  max,
  unit,
  help,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  unit: string;
  help?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-cacao">{label}</label>
      <div className="flex items-center gap-4 bg-crema rounded-suave p-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-10 h-10 rounded-full bg-perla text-cacao text-xl flex items-center justify-center hover:bg-petalo/40 transition shadow-suave"
          aria-label="Disminuir"
        >
          −
        </button>
        <div className="flex-1 text-center">
          <p className="font-display text-4xl text-coral leading-none">
            {value}
          </p>
          <p className="text-xs text-cacao/60 mt-1">{unit}</p>
        </div>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-10 h-10 rounded-full bg-perla text-cacao text-xl flex items-center justify-center hover:bg-petalo/40 transition shadow-suave"
          aria-label="Aumentar"
        >
          +
        </button>
      </div>
      {help && (
        <p className="text-xs text-cacao/60 text-center">{help}</p>
      )}
    </div>
  );
}

function ObjectiveCard({
  value,
  icon: Icon,
  label,
  description,
  selected,
  onSelect,
  color,
}: {
  value: Objetivo;
  icon: React.ElementType;
  label: string;
  description: string;
  selected: boolean;
  onSelect: (v: Objetivo) => void;
  color: "coral" | "lavanda" | "fertil";
}) {
  const colorMap = {
    coral: { ring: "ring-coral", icon: "text-coral", bg: "bg-petalo/20" },
    lavanda: { ring: "ring-lavanda", icon: "text-lavanda", bg: "bg-bruma/30" },
    fertil: { ring: "ring-fertil", icon: "text-fertil", bg: "bg-menta/30" },
  };
  const c = colorMap[color];

  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`w-full flex items-center gap-3 p-4 rounded-suave border-2 transition-all ${
        selected
          ? `border-transparent ring-2 ${c.ring} ${c.bg}`
          : "border-petalo/30 bg-perla hover:border-petalo"
      }`}
    >
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center ${
          selected ? c.bg : "bg-crema"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${selected ? c.icon : "text-cacao/50"}`}
          strokeWidth={1.5}
        />
      </div>
      <div className="text-left flex-1">
        <p className="font-medium text-cacao">{label}</p>
        <p className="text-xs text-cacao/60">{description}</p>
      </div>
    </button>
  );
}
