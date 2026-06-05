import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import { calculateCycleInfo, PHASE_LABELS } from "@/lib/cycle/calculations";
import { calculatePregnancyRisk } from "@/lib/cycle/predictions";
import { getDailyFeeling, getPhaseGreeting } from "@/lib/cycle/feelings";
import FertilityLine from "@/components/fertility-map/fertility-line";
import { parseISO, format, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import {
  Droplet,
  Sparkles,
  Heart,
  Flower2,
  Calendar as CalendarIcon,
  ChevronRight,
  Activity,
} from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Mi agenda — FemBloom" };

const RELIABLE_METHODS = ["pills", "injection", "iud", "jadelle", "implant"];

/**
 * Pagina principal "Agenda" - el corazon visual de FemBloom.
 *
 * Muestra todo lo importante del dia: fase del ciclo, mapa de fertilidad,
 * probabilidad de embarazo, como te sentiras hoy, proximos eventos
 * y ultimo registro relevante.
 */
export default async function AgendaPage() {
  const { user, supabase } = await requireUserAndOnboarding();

  // Cargar TODOS los datos en paralelo (mucho mas rapido)
  const [profileRes, cycleRes, relationsRes, methodRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, trial_ends_at, objective")
      .eq("id", user.id)
      .single(),
    supabase
      .from("cycle_settings")
      .select("avg_cycle_length, avg_period_length, last_period_start")
      .eq("user_id", user.id)
      .single(),
    supabase
      .from("relations")
      .select("relation_date, with_protection")
      .eq("user_id", user.id)
      .order("relation_date", { ascending: false })
      .limit(5),
    supabase
      .from("contraceptive_methods")
      .select("method_type")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .maybeSingle(),
  ]);

  const profile = profileRes.data;
  const cycle = cycleRes.data;
  const relations = relationsRes.data || [];
  const method = methodRes.data;

  if (!cycle?.last_period_start) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-6">
        <p className="text-cacao">Falta tu configuración del ciclo.</p>
      </div>
    );
  }

  const nombre = profile?.full_name?.split(" ")[0] || "amiga";

  // Calculo del ciclo HOY
  const cycleInfo = calculateCycleInfo(
    new Date(),
    parseISO(cycle.last_period_start),
    cycle.avg_cycle_length,
    cycle.avg_period_length
  );

  // Probabilidad de embarazo
  const recentRelations = relations
    .filter((r: { relation_date: string }) => {
      const diff = differenceInDays(new Date(), parseISO(r.relation_date));
      return diff <= 7 && diff >= 0;
    })
    .map((r: { relation_date: string; with_protection: boolean }) => ({
      date: r.relation_date,
      with_protection: r.with_protection,
    }));

  const risk = calculatePregnancyRisk({
    cycleInfo,
    recentRelations,
    hasReliableContraceptive: !!method && RELIABLE_METHODS.includes(method.method_type),
  });

  // Cómo me sentiré hoy
  const feeling = getDailyFeeling(cycleInfo);

  // Última relación registrada
  const lastRelation = relations[0];
  const daysSinceLastRelation = lastRelation
    ? differenceInDays(new Date(), parseISO(lastRelation.relation_date))
    : null;

  // Días para próximos eventos
  const daysToNextPeriod = Math.max(0, cycleInfo.daysToNextPeriod);
  const daysToOvulation = Math.max(
    0,
    differenceInDays(cycleInfo.ovulationDate, new Date())
  );

  // Saludo según hora del día
  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 space-y-5 animate-florecer">
      {/* ============================================ */}
      {/* SALUDO HERO */}
      {/* ============================================ */}
      <header className="space-y-2">
        <p className="text-xs text-cacao/60 uppercase tracking-wider font-medium">
          {timeGreeting}
        </p>
        <h1 className="font-display text-5xl text-cacao leading-tight">
          Hola {nombre},
        </h1>
        <p className="text-cacao/80 leading-relaxed text-base">
          Día <span className="font-semibold text-coral">{cycleInfo.cycleDay}</span> de tu ciclo.
          <br />
          {getPhaseGreeting(cycleInfo)}.
        </p>
        {lastRelation &&
          daysSinceLastRelation !== null &&
          daysSinceLastRelation <= 7 && (
            <p className="text-cacao/60 text-sm flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-coral" />
              Registraste una relación{" "}
              {daysSinceLastRelation === 0
                ? "hoy"
                : daysSinceLastRelation === 1
                ? "ayer"
                : `hace ${daysSinceLastRelation} días`}
              .
            </p>
          )}
      </header>

      {/* ============================================ */}
      {/* MAPA DE FERTILIDAD VISUAL */}
      {/* ============================================ */}
      <div className="tarjeta space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider">
            Tu ciclo
          </h2>
          <span className="text-xs text-coral font-medium">
            {PHASE_LABELS[cycleInfo.phase]}
          </span>
        </div>
        <FertilityLine
          cycleLength={cycle.avg_cycle_length}
          periodLength={cycle.avg_period_length}
          currentCycleDay={cycleInfo.cycleDay}
        />
      </div>

      {/* ============================================ */}
      {/* COMO ME SENTIRE HOY */}
      {/* ============================================ */}
      <div
        className={`tarjeta space-y-3 ${
          feeling.energy === "high"
            ? "bg-menta/25 border border-fertil/30"
            : feeling.energy === "medium"
            ? "bg-durazno/20 border border-durazno/40"
            : "bg-bruma/20 border border-lavanda/30"
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl">{feeling.emoji}</span>
          <div className="flex-1 space-y-1">
            <p className="text-xs text-cacao/60 uppercase tracking-wider font-medium">
              ¿Cómo me sentiré hoy?
            </p>
            <h3 className="font-display text-xl text-cacao">{feeling.title}</h3>
            <p className="text-sm text-cacao/80 leading-relaxed">
              {feeling.message}
            </p>
          </div>
        </div>
        {feeling.suggestions.length > 0 && (
          <ul className="space-y-1 pl-9">
            {feeling.suggestions.map((s, i) => (
              <li key={i} className="text-xs text-cacao/70 flex items-center gap-2">
                <span className="w-1 h-1 bg-coral rounded-full" />
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ============================================ */}
      {/* PROBABILIDAD DE EMBARAZO */}
      {/* ============================================ */}
      <div className="tarjeta space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider">
            Probabilidad de embarazo
          </h3>
          <RiskBadge level={risk.level} />
        </div>
        <p className="text-sm text-cacao/70 leading-relaxed">{risk.explanation}</p>
        <p className="text-[10px] text-cacao/50 italic">
          Este cálculo es orientativo. No reemplaza un diagnóstico médico.
        </p>
      </div>

      {/* ============================================ */}
      {/* PROXIMOS EVENTOS (grid 2 columnas) */}
      {/* ============================================ */}
      <div className="grid grid-cols-2 gap-3">
        {/* Proximo periodo */}
        <div className="tarjeta text-center space-y-1">
          <div className="w-10 h-10 mx-auto rounded-full bg-petalo/40 flex items-center justify-center">
            <Droplet className="w-5 h-5 text-coral" strokeWidth={1.5} />
          </div>
          <p className="font-display text-3xl text-coral">{daysToNextPeriod}</p>
          <p className="text-[10px] text-cacao/60 leading-tight">
            días para tu
            <br />
            próximo período
          </p>
          <p className="text-xs text-cacao/70 capitalize">
            {format(cycleInfo.nextPeriodDate, "d 'de' MMM", { locale: es })}
          </p>
        </div>

        {/* Proxima ovulacion */}
        <div className="tarjeta text-center space-y-1">
          <div className="w-10 h-10 mx-auto rounded-full bg-bruma/40 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-lavanda" strokeWidth={1.5} />
          </div>
          <p className="font-display text-3xl text-lavanda">
            {cycleInfo.isOvulation ? "Hoy" : daysToOvulation > 0 ? daysToOvulation : "—"}
          </p>
          <p className="text-[10px] text-cacao/60 leading-tight">
            {cycleInfo.isOvulation
              ? "es tu día de ovulación"
              : daysToOvulation > 0
              ? "días para tu ovulación"
              : "ya pasó tu ovulación"}
          </p>
          {daysToOvulation > 0 && !cycleInfo.isOvulation && (
            <p className="text-xs text-cacao/70 capitalize">
              {format(cycleInfo.ovulationDate, "d 'de' MMM", { locale: es })}
            </p>
          )}
        </div>
      </div>

      {/* ============================================ */}
      {/* ACCIONES RAPIDAS */}
      {/* ============================================ */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider px-1">
          Tu agenda
        </h2>
        <div className="space-y-2">
          <Link
            href="/calendario"
            className="tarjeta flex items-center gap-3 hover:shadow-petalo transition group"
          >
            <div className="w-10 h-10 rounded-full bg-lavanda/30 flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="w-5 h-5 text-lavanda" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-cacao text-sm">
                Registra tu día en el calendario
              </p>
              <p className="text-xs text-cacao/60">
                Síntomas, ánimo, notas y más
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-cacao/40 group-hover:text-coral transition" />
          </Link>

          <Link
            href="/jardin"
            className="tarjeta flex items-center gap-3 hover:shadow-petalo transition group"
          >
            <div className="w-10 h-10 rounded-full bg-menta/40 flex items-center justify-center flex-shrink-0">
              <Flower2 className="w-5 h-5 text-fertil" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-cacao text-sm">
                Visita tu jardín virtual
              </p>
              <p className="text-xs text-cacao/60">
                Ve cómo florece con cada ciclo
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-cacao/40 group-hover:text-coral transition" />
          </Link>

          <Link
            href="/conocete"
            className="tarjeta flex items-center gap-3 hover:shadow-petalo transition group"
          >
            <div className="w-10 h-10 rounded-full bg-petalo/40 flex items-center justify-center flex-shrink-0">
              <Activity className="w-5 h-5 text-coral" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-cacao text-sm">
                Conoce más sobre tu cuerpo
              </p>
              <p className="text-xs text-cacao/60">
                Artículos sobre tu fase actual
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-cacao/40 group-hover:text-coral transition" />
          </Link>
        </div>
      </section>
    </div>
  );
}

// =============================================
// Subcomponente: badge de probabilidad
// =============================================

function RiskBadge({ level }: { level: "low" | "medium" | "high" }) {
  const config = {
    low: {
      bg: "bg-menta/40",
      text: "text-fertil",
      label: "Baja",
    },
    medium: {
      bg: "bg-durazno/40",
      text: "text-coral",
      label: "Media",
    },
    high: {
      bg: "bg-petalo/40",
      text: "text-coral",
      label: "Alta",
    },
  }[level];

  return (
    <span
      className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-xs font-semibold`}
    >
      {config.label}
    </span>
  );
}
