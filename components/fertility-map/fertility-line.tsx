interface Props {
  cycleLength: number;
  periodLength: number;
  currentCycleDay: number;
}

/**
 * Linea visual horizontal del ciclo completo.
 * Muestra las fases con colores suaves y marca el dia actual.
 *
 * Cumple RF-018 (mapa de fertilidad) - vista frontal sin graficos complejos.
 */
export default function FertilityLine({
  cycleLength,
  periodLength,
  currentCycleDay,
}: Props) {
  const ovulationDay = cycleLength - 14;
  const fertileStart = Math.max(periodLength + 1, ovulationDay - 5);
  const fertileEnd = ovulationDay + 1;

  // Posicion del dia actual como porcentaje (0-100)
  const currentPosition = ((currentCycleDay - 1) / (cycleLength - 1)) * 100;

  // Segmentos con sus porcentajes
  const segments = [
    {
      key: "menstrual",
      label: "Menstrual",
      startPct: 0,
      endPct: (periodLength / cycleLength) * 100,
      color: "#F4A6B0", // coral
    },
    {
      key: "follicular",
      label: "Folicular",
      startPct: (periodLength / cycleLength) * 100,
      endPct: ((fertileStart - 1) / cycleLength) * 100,
      color: "#FFD9B3", // durazno
    },
    {
      key: "fertile",
      label: "Fértil",
      startPct: ((fertileStart - 1) / cycleLength) * 100,
      endPct: (fertileEnd / cycleLength) * 100,
      color: "#9CCFB1", // fertil
    },
    {
      key: "luteal",
      label: "Lútea",
      startPct: (fertileEnd / cycleLength) * 100,
      endPct: 100,
      color: "#D9C2E9", // bruma
    },
  ];

  return (
    <div className="space-y-4">
      {/* Linea con segmentos */}
      <div className="relative pt-6">
        {/* Marcador del dia actual */}
        <div
          style={{ left: `${currentPosition}%` }}
          className="absolute top-0 -translate-x-1/2 z-10"
          aria-label={`Día ${currentCycleDay}`}
        >
          <div className="w-8 h-8 rounded-full bg-perla border-2 border-coral shadow-petalo flex items-center justify-center">
            <span className="text-[11px] font-bold text-coral">
              {currentCycleDay}
            </span>
          </div>
          {/* Punta apuntando hacia abajo */}
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-coral mx-auto -mt-1" />
        </div>

        {/* Barra con segmentos */}
        <div className="h-4 rounded-full overflow-hidden flex shadow-suave">
          {segments.map((seg) => (
            <div
              key={seg.key}
              style={{
                width: `${seg.endPct - seg.startPct}%`,
                backgroundColor: seg.color,
              }}
              title={seg.label}
            />
          ))}
        </div>
      </div>

      {/* Marcadores de dias */}
      <div className="flex justify-between text-[10px] text-cacao/50 font-medium px-1">
        <span>Día 1</span>
        <span>Ovulación día {ovulationDay}</span>
        <span>Día {cycleLength}</span>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5">
        {segments.map((seg) => (
          <div key={seg.key} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-[11px] text-cacao/70">{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
