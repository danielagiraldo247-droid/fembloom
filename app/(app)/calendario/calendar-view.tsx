"use client";

import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isToday,
  parseISO,
  getDay,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  calculateCycleInfo,
  PHASE_LABELS,
  type CycleInfo,
} from "@/lib/cycle/calculations";
import DayModal from "./day-modal";

export interface DailyLog {
  log_date: string;
  is_menstruation: boolean;
  flow_intensity?: string | null;
}

interface Props {
  lastPeriodStart: string;
  cycleLength: number;
  periodLength: number;
  initialLogs: DailyLog[];
}

const DAY_NAMES = ["L", "M", "X", "J", "V", "S", "D"];

export default function CalendarView({
  lastPeriodStart,
  cycleLength,
  periodLength,
  initialLogs,
}: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [logs, setLogs] = useState<DailyLog[]>(initialLogs);

  const lastPeriodDate = useMemo(
    () => parseISO(lastPeriodStart),
    [lastPeriodStart]
  );

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });
  }, [currentMonth]);

  // Espacios vacios antes del primer dia del mes (para alinear lunes)
  const blanksBefore = useMemo(() => {
    const dayOfWeek = getDay(startOfMonth(currentMonth)); // 0=domingo
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  }, [currentMonth]);

  // Mapa de logs por fecha para acceso rapido
  const logsMap = useMemo(() => {
    return new Map(logs.map((l) => [l.log_date, l]));
  }, [logs]);

  // Info del ciclo HOY (para mostrar arriba)
  const todayCycle = useMemo(
    () =>
      calculateCycleInfo(
        new Date(),
        lastPeriodDate,
        cycleLength,
        periodLength
      ),
    [lastPeriodDate, cycleLength, periodLength]
  );

  function handleLogUpdated(date: string, log: DailyLog | null) {
    setLogs((prev) => {
      const filtered = prev.filter((l) => l.log_date !== date);
      return log ? [...filtered, log] : filtered;
    });
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 animate-florecer">
      {/* Header */}
      <header className="px-2">
        <h1 className="font-display text-4xl text-cacao">
          Tu calendario 📅
        </h1>
        <p className="text-cacao/70 mt-1 text-sm">
          Día{" "}
          <span className="font-semibold text-coral">
            {todayCycle.cycleDay}
          </span>{" "}
          de tu ciclo · Fase{" "}
          <span className="font-semibold">{PHASE_LABELS[todayCycle.phase]}</span>
        </p>
      </header>

      {/* Tarjeta del calendario */}
      <div className="tarjeta space-y-4">
        {/* Navegacion de mes */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-full hover:bg-petalo/30 transition"
            aria-label="Mes anterior"
          >
            <ChevronLeft className="w-5 h-5 text-cacao" />
          </button>
          <h2 className="font-display text-2xl text-cacao capitalize">
            {format(currentMonth, "MMMM yyyy", { locale: es })}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-full hover:bg-petalo/30 transition"
            aria-label="Mes siguiente"
          >
            <ChevronRight className="w-5 h-5 text-cacao" />
          </button>
        </div>

        {/* Encabezado de dias de la semana */}
        <div className="grid grid-cols-7 gap-1">
          {DAY_NAMES.map((d) => (
            <div
              key={d}
              className="text-center text-xs font-medium text-cacao/50 py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Cuadricula de dias */}
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: blanksBefore }).map((_, i) => (
            <div key={`blank-${i}`} className="aspect-square" />
          ))}
          {days.map((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const cycleInfo = calculateCycleInfo(
              day,
              lastPeriodDate,
              cycleLength,
              periodLength
            );
            const log = logsMap.get(dateStr);

            return (
              <CalendarDay
                key={dateStr}
                day={day}
                cycleInfo={cycleInfo}
                log={log}
                onClick={() => setSelectedDate(day)}
              />
            );
          })}
        </div>
      </div>

      {/* Leyenda */}
      <Legend />

      {/* Info del proximo periodo */}
      <div className="tarjeta bg-petalo/15 border border-petalo/30">
        <p className="text-xs text-cacao/60 uppercase tracking-wider font-medium">
          Próximo período estimado
        </p>
        <p className="font-display text-2xl text-cacao mt-1 capitalize">
          {format(todayCycle.nextPeriodDate, "d 'de' MMMM", { locale: es })}
        </p>
        <p className="text-xs text-cacao/60 mt-1">
          En {todayCycle.daysToNextPeriod} días aproximadamente
        </p>
      </div>

      {/* Modal del dia */}
      {selectedDate && (
        <DayModal
          date={selectedDate}
          existingLog={
            logsMap.get(format(selectedDate, "yyyy-MM-dd")) || null
          }
          onClose={() => setSelectedDate(null)}
          onLogUpdated={handleLogUpdated}
        />
      )}
    </div>
  );
}

// =============================================
// Subcomponente: una celda del calendario
// =============================================

interface CellProps {
  day: Date;
  cycleInfo: CycleInfo;
  log: DailyLog | undefined;
  onClick: () => void;
}

function CalendarDay({ day, cycleInfo, log, onClick }: CellProps) {
  const today = isToday(day);

  // Decidir color de fondo segun fase + si esta registrado
  let bg = "bg-crema text-cacao/70";

  if (log?.is_menstruation) {
    bg = "bg-coral text-white shadow-sm";
  } else if (cycleInfo.phase === "menstrual") {
    bg = "bg-petalo/50 text-cacao";
  } else if (cycleInfo.isOvulation) {
    bg = "bg-lavanda/70 text-white";
  } else if (cycleInfo.isFertile) {
    bg = "bg-menta/60 text-cacao";
  } else if (cycleInfo.phase === "luteal") {
    bg = "bg-bruma/40 text-cacao/80";
  } else if (cycleInfo.phase === "follicular") {
    bg = "bg-durazno/40 text-cacao/80";
  }

  return (
    <button
      onClick={onClick}
      className={`
        relative aspect-square rounded-full flex items-center justify-center
        transition-all hover:scale-105 active:scale-95
        ${bg}
        ${today ? "ring-2 ring-coral ring-offset-1 ring-offset-perla font-bold" : ""}
      `}
      aria-label={format(day, "d 'de' MMMM", { locale: es })}
    >
      <span className="text-sm">{format(day, "d")}</span>
      {log && !log.is_menstruation && (
        <div className="absolute bottom-1 w-1 h-1 bg-cacao/40 rounded-full" />
      )}
    </button>
  );
}

// =============================================
// Subcomponente: leyenda de colores
// =============================================

function Legend() {
  const items = [
    { color: "bg-coral", label: "Menstruación registrada" },
    { color: "bg-petalo/50", label: "Menstruación prevista" },
    { color: "bg-menta/60", label: "Ventana fértil" },
    { color: "bg-lavanda/70", label: "Ovulación" },
    { color: "bg-durazno/40", label: "Fase folicular" },
    { color: "bg-bruma/40", label: "Fase lútea" },
  ];

  return (
    <div className="tarjeta">
      <p className="text-xs font-semibold text-cacao/70 uppercase tracking-wider mb-3">
        Leyenda
      </p>
      <div className="grid grid-cols-2 gap-y-2 gap-x-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-xs text-cacao/70">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
