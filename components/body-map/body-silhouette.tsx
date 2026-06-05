"use client";

import type { BodyZone } from "@/lib/data/symptoms";

interface Props {
  selectedZone: BodyZone | null;
  onZoneClick: (zone: BodyZone) => void;
  /** Zonas que tienen sintomas registrados (se muestran con un punto) */
  zonesWithSymptoms?: Set<BodyZone>;
}

/**
 * Silueta femenina estilizada con zonas interactivas para registrar sintomas.
 *
 * Zonas tappeables: cabeza, pecho, abdomen, piernas (vista frontal)
 * Zonas externas: espalda, general (como botones debajo)
 */
export default function BodySilhouette({
  selectedZone,
  onZoneClick,
  zonesWithSymptoms = new Set(),
}: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg
          viewBox="0 0 200 400"
          className="w-36 h-72"
          aria-label="Silueta corporal interactiva"
        >
          {/* Silueta femenina estilizada (capa decorativa) */}
          <g className="fill-petalo/40 stroke-petalo/60" strokeWidth="1.5">
            {/* Cabeza */}
            <ellipse cx="100" cy="45" rx="26" ry="30" />
            {/* Cuello */}
            <rect x="92" y="70" width="16" height="14" rx="2" />
            {/* Hombros y pecho */}
            <path d="M55,95 Q55,90 65,88 L135,88 Q145,90 145,95 L142,140 Q142,160 130,170 L70,170 Q58,160 58,140 Z" />
            {/* Cintura */}
            <path d="M68,170 Q68,180 72,195 L128,195 Q132,180 132,170 Z" />
            {/* Cadera */}
            <path d="M62,195 Q60,210 65,235 L135,235 Q140,210 138,195 Z" />
            {/* Pierna izquierda */}
            <path d="M68,235 Q66,260 70,300 L75,380 Q80,395 92,392 L95,300 Q95,265 92,235 Z" />
            {/* Pierna derecha */}
            <path d="M108,235 Q105,265 105,300 L108,392 Q120,395 125,380 L130,300 Q134,260 132,235 Z" />
          </g>

          {/* Zonas tappeables (transparentes encima de la silueta) */}
          <HighlightZone
            cx={100}
            cy={45}
            rx={32}
            ry={36}
            selected={selectedZone === "head"}
            hasSymptoms={zonesWithSymptoms.has("head")}
            onClick={() => onZoneClick("head")}
            ariaLabel="Cabeza"
          />
          <HighlightZone
            cx={100}
            cy={120}
            rx={48}
            ry={38}
            selected={selectedZone === "chest"}
            hasSymptoms={zonesWithSymptoms.has("chest")}
            onClick={() => onZoneClick("chest")}
            ariaLabel="Pecho"
          />
          <HighlightZone
            cx={100}
            cy={195}
            rx={42}
            ry={35}
            selected={selectedZone === "abdomen"}
            hasSymptoms={zonesWithSymptoms.has("abdomen")}
            onClick={() => onZoneClick("abdomen")}
            ariaLabel="Abdomen"
          />
          <HighlightZone
            cx={100}
            cy={320}
            rx={45}
            ry={80}
            selected={selectedZone === "legs"}
            hasSymptoms={zonesWithSymptoms.has("legs")}
            onClick={() => onZoneClick("legs")}
            ariaLabel="Piernas"
          />
        </svg>

        {/* Labels de zonas (visuales) */}
        <div className="absolute -left-2 top-7 text-[10px] text-cacao/50 pointer-events-none">
          cabeza
        </div>
        <div className="absolute -left-2 top-24 text-[10px] text-cacao/50 pointer-events-none">
          pecho
        </div>
        <div className="absolute -right-4 top-44 text-[10px] text-cacao/50 pointer-events-none">
          abdomen
        </div>
        <div className="absolute -left-2 bottom-20 text-[10px] text-cacao/50 pointer-events-none">
          piernas
        </div>
      </div>

      {/* Espalda y General (no visibles en vista frontal) */}
      <div className="flex gap-2">
        <ExternalZoneButton
          label="Espalda"
          selected={selectedZone === "back"}
          hasSymptoms={zonesWithSymptoms.has("back")}
          onClick={() => onZoneClick("back")}
        />
        <ExternalZoneButton
          label="General"
          selected={selectedZone === "general"}
          hasSymptoms={zonesWithSymptoms.has("general")}
          onClick={() => onZoneClick("general")}
        />
      </div>
    </div>
  );
}

// =============================================
// Subcomponentes
// =============================================

interface HighlightZoneProps {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  selected: boolean;
  hasSymptoms: boolean;
  onClick: () => void;
  ariaLabel: string;
}

function HighlightZone({
  cx,
  cy,
  rx,
  ry,
  selected,
  hasSymptoms,
  onClick,
  ariaLabel,
}: HighlightZoneProps) {
  return (
    <g onClick={onClick} className="cursor-pointer" role="button" aria-label={ariaLabel}>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        className={`transition ${
          selected
            ? "fill-coral/40 stroke-coral"
            : hasSymptoms
            ? "fill-coral/15 stroke-coral/40"
            : "fill-transparent stroke-transparent hover:fill-coral/15"
        }`}
        strokeWidth="2"
      />
      {hasSymptoms && !selected && (
        <circle cx={cx + rx - 8} cy={cy - ry + 8} r="4" className="fill-coral" />
      )}
    </g>
  );
}

interface ExternalZoneProps {
  label: string;
  selected: boolean;
  hasSymptoms: boolean;
  onClick: () => void;
}

function ExternalZoneButton({
  label,
  selected,
  hasSymptoms,
  onClick,
}: ExternalZoneProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-4 py-1.5 rounded-full text-xs transition ${
        selected
          ? "bg-coral text-white"
          : "bg-petalo/30 text-cacao hover:bg-petalo/50"
      }`}
    >
      {label}
      {hasSymptoms && !selected && (
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-coral rounded-full" />
      )}
    </button>
  );
}
