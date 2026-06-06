import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import {
  calculateGardenStats,
  STAGE_LABELS,
  STAGE_MESSAGES,
} from "@/lib/garden/garden-data";
import {
  ACHIEVEMENTS,
  getUnlockedAchievements,
  getNextAchievement,
} from "@/lib/garden/achievements";
import { getFlowerForCycle, FLOWERS } from "@/components/garden/flower-svg";
import FlowerCard from "@/components/garden/flower-svg";
import PlantSVG from "@/components/garden/plant-svg";
import { Lock, Check, Flame, Calendar, Flower2 } from "lucide-react";

export const metadata = { title: "Mi jardín — FemBloom" };

/**
 * Pagina del jardin virtual.
 *
 * Muestra la planta principal (5 etapas), la galeria de flores conseguidas
 * y los 10 logros que la usuaria puede desbloquear.
 */
export default async function JardinPage() {
  const { user, supabase } = await requireUserAndOnboarding();

  // Cargar datos en paralelo
  const [cyclesRes, logsRes, profileRes] = await Promise.all([
    supabase
      .from("cycles")
      .select("id, end_date")
      .eq("user_id", user.id)
      .not("end_date", "is", null), // solo ciclos completos
    supabase
      .from("daily_logs")
      .select("log_date")
      .eq("user_id", user.id),
    supabase
      .from("profiles")
      .select("created_at, full_name")
      .eq("id", user.id)
      .single(),
  ]);

  const completedCycles = cyclesRes.data?.length || 0;
  const logDates = (logsRes.data || []).map(
    (l: { log_date: string }) => l.log_date
  );
  const userCreatedAt =
    profileRes.data?.created_at || new Date().toISOString();

  // Calcular stats del jardin
  const stats = calculateGardenStats({
    completedCycles,
    logDates,
    userCreatedAt,
  });

  const unlockedAchievements = getUnlockedAchievements(stats);
  const nextAchievement = getNextAchievement(stats);

  // Generar lista de flores conseguidas
  const flowers = Array.from({ length: stats.totalFlowers }).map((_, i) => ({
    cycleNumber: i + 1,
    type: getFlowerForCycle(i + 1),
  }));

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 space-y-6 animate-florecer">
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <header className="text-center space-y-1">
        <h1 className="font-display text-4xl text-cacao">Mi jardín 🌷</h1>
        <p className="text-cacao/70 text-sm">
          Crece con cada día y cada ciclo que registras
        </p>
      </header>

      {/* ============================================ */}
      {/* PLANTA PRINCIPAL */}
      {/* ============================================ */}
      <div className="tarjeta text-center space-y-3 py-6">
        <PlantSVG stage={stats.stage} className="w-48 h-56 mx-auto" />
        <div className="space-y-1">
          <p className="text-xs text-cacao/60 uppercase tracking-wider font-medium">
            Etapa actual
          </p>
          <h2 className="font-display text-2xl text-coral">
            {STAGE_LABELS[stats.stage]}
          </h2>
          <p className="text-sm text-cacao/70 max-w-sm mx-auto leading-relaxed">
            {STAGE_MESSAGES[stats.stage]}
          </p>
        </div>
      </div>

      {/* ============================================ */}
      {/* STATS (3 columnas) */}
      {/* ============================================ */}
      <div className="grid grid-cols-3 gap-3">
        <div className="tarjeta text-center space-y-1">
          <Flower2 className="w-5 h-5 text-coral mx-auto" strokeWidth={1.5} />
          <p className="font-display text-3xl text-coral">
            {stats.totalFlowers}
          </p>
          <p className="text-[10px] text-cacao/60">flores</p>
        </div>
        <div className="tarjeta text-center space-y-1">
          <Flame className="w-5 h-5 text-durazno mx-auto" strokeWidth={1.5} />
          <p className="font-display text-3xl text-durazno">
            {stats.currentStreak}
          </p>
          <p className="text-[10px] text-cacao/60">racha</p>
        </div>
        <div className="tarjeta text-center space-y-1">
          <Calendar
            className="w-5 h-5 text-lavanda mx-auto"
            strokeWidth={1.5}
          />
          <p className="font-display text-3xl text-lavanda">
            {stats.daysWithLogs}
          </p>
          <p className="text-[10px] text-cacao/60">días</p>
        </div>
      </div>

      {/* ============================================ */}
      {/* GALERIA DE FLORES */}
      {/* ============================================ */}
      {flowers.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider px-1">
            Tu jardín de flores
          </h2>
          <div className="tarjeta">
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 justify-items-center">
              {flowers.map((f) => (
                <div key={f.cycleNumber} className="flex flex-col items-center gap-1">
                  <FlowerCard type={f.type} size="small" />
                  <p className="text-[10px] text-cacao/60">
                    Ciclo {f.cycleNumber}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider px-1">
            Tu jardín de flores
          </h2>
          <div className="tarjeta text-center py-6 space-y-2">
            <div className="text-4xl opacity-30">🌱</div>
            <p className="text-sm text-cacao/70">
              Aún no tienes flores en tu jardín
            </p>
            <p className="text-xs text-cacao/60 max-w-sm mx-auto">
              Cada ciclo menstrual completo te regala una flor única.
              Sigue registrando tu menstruación para ver crecer tu jardín 🌸
            </p>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* PROXIMO LOGRO */}
      {/* ============================================ */}
      {nextAchievement && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider px-1">
            Próximo logro
          </h2>
          <div className="tarjeta bg-petalo/15 border border-petalo/30 space-y-3">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{nextAchievement.emoji}</div>
              <div className="flex-1">
                <p className="font-semibold text-cacao">
                  {nextAchievement.name}
                </p>
                <p className="text-xs text-cacao/70">
                  {nextAchievement.description}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-cacao/70">
                <span>
                  {nextAchievement.getProgress(stats)} / {nextAchievement.goal}{" "}
                  {nextAchievement.unit}
                </span>
                <span className="font-semibold text-coral">
                  {Math.round(
                    (nextAchievement.getProgress(stats) /
                      nextAchievement.goal) *
                      100
                  )}
                  %
                </span>
              </div>
              <div className="h-2 bg-perla rounded-full overflow-hidden">
                <div
                  className="h-full bg-coral rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (nextAchievement.getProgress(stats) /
                        nextAchievement.goal) *
                        100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* LOGROS COMPLETOS */}
      {/* ============================================ */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider">
            Tus logros
          </h2>
          <span className="text-xs text-cacao/60">
            {unlockedAchievements.length} / {ACHIEVEMENTS.length}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = achievement.isUnlocked(stats);
            return (
              <div
                key={achievement.code}
                className={`tarjeta p-3 space-y-1.5 ${
                  unlocked
                    ? "bg-perla"
                    : "bg-crema opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`text-2xl ${
                      !unlocked && "grayscale opacity-40"
                    }`}
                  >
                    {achievement.emoji}
                  </span>
                  {unlocked ? (
                    <div className="w-5 h-5 rounded-full bg-fertil flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <Lock className="w-4 h-4 text-cacao/30" />
                  )}
                </div>
                <p className="font-semibold text-sm text-cacao leading-tight">
                  {achievement.name}
                </p>
                <p className="text-[10px] text-cacao/60 leading-tight">
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================ */}
      {/* MENSAJE FINAL MOTIVADOR */}
      {/* ============================================ */}
      <div className="tarjeta bg-menta/20 border border-fertil/30 text-center py-5 space-y-2">
        <Flower2 className="w-8 h-8 text-fertil mx-auto" strokeWidth={1.5} />
        <p className="font-display text-xl text-cacao">
          Sigue floreciendo 🌸
        </p>
        <p className="text-sm text-cacao/70 max-w-sm mx-auto leading-relaxed">
          Cada día que registras es una semilla de auto-conocimiento.
          Tu jardín es único, como tú.
        </p>
      </div>
    </div>
  );
}
