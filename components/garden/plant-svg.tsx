import type { PlantStage } from "@/lib/garden/garden-data";

interface Props {
  stage: PlantStage;
  className?: string;
}

/**
 * Planta principal del jardin virtual.
 * 5 etapas: semilla, brote, tallo, boton, flor.
 *
 * Estilo: acuarela suave con pasteles. Animacion sutil de flotacion.
 */
export default function PlantSVG({ stage, className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      {/* Glow de fondo */}
      <div className="absolute inset-0 bg-petalo/30 blur-3xl rounded-full" />

      <svg
        viewBox="0 0 200 240"
        className="relative w-full h-full animate-flotar"
        aria-label={`Planta en etapa: ${stage}`}
      >
        {/* Tierra (siempre presente) */}
        <ellipse
          cx="100"
          cy="220"
          rx="65"
          ry="15"
          className="fill-cacao/40"
        />
        <ellipse
          cx="100"
          cy="215"
          rx="60"
          ry="10"
          className="fill-cacao/60"
        />

        {/* SEMILLA */}
        {stage === "seed" && (
          <g>
            <ellipse cx="100" cy="210" rx="8" ry="5" className="fill-cacao/80" />
            <ellipse cx="98" cy="208" rx="3" ry="2" className="fill-perla/40" />
          </g>
        )}

        {/* BROTE */}
        {stage === "sprout" && (
          <g>
            {/* Tallo */}
            <path
              d="M100,210 Q98,195 100,180"
              className="stroke-fertil fill-none"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Hoja izquierda */}
            <ellipse
              cx="90"
              cy="185"
              rx="10"
              ry="6"
              className="fill-fertil/70"
              transform="rotate(-25 90 185)"
            />
            {/* Hoja derecha */}
            <ellipse
              cx="110"
              cy="185"
              rx="10"
              ry="6"
              className="fill-fertil/70"
              transform="rotate(25 110 185)"
            />
          </g>
        )}

        {/* TALLO */}
        {stage === "stem" && (
          <g>
            <path
              d="M100,210 Q97,170 100,130"
              className="stroke-fertil fill-none"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse cx="85" cy="180" rx="12" ry="7" className="fill-fertil/70" transform="rotate(-30 85 180)" />
            <ellipse cx="115" cy="170" rx="12" ry="7" className="fill-fertil/70" transform="rotate(30 115 170)" />
            <ellipse cx="88" cy="145" rx="11" ry="6" className="fill-fertil/70" transform="rotate(-20 88 145)" />
            <ellipse cx="112" cy="135" rx="11" ry="6" className="fill-fertil/70" transform="rotate(20 112 135)" />
            {/* Punta verde */}
            <circle cx="100" cy="128" r="5" className="fill-fertil/80" />
          </g>
        )}

        {/* BOTON */}
        {stage === "bud" && (
          <g>
            <path
              d="M100,210 Q97,160 100,100"
              className="stroke-fertil fill-none"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse cx="82" cy="180" rx="13" ry="7" className="fill-fertil/70" transform="rotate(-30 82 180)" />
            <ellipse cx="118" cy="165" rx="13" ry="7" className="fill-fertil/70" transform="rotate(30 118 165)" />
            <ellipse cx="85" cy="135" rx="12" ry="7" className="fill-fertil/70" transform="rotate(-20 85 135)" />
            <ellipse cx="115" cy="120" rx="12" ry="7" className="fill-fertil/70" transform="rotate(20 115 120)" />
            {/* Boton cerrado en la punta */}
            <ellipse cx="100" cy="92" rx="12" ry="18" className="fill-coral/50" />
            <ellipse cx="100" cy="88" rx="8" ry="14" className="fill-coral/70" />
            <ellipse cx="98" cy="85" rx="3" ry="6" className="fill-petalo" />
          </g>
        )}

        {/* FLOR (florecio) */}
        {stage === "flower" && (
          <g>
            {/* Tallo */}
            <path
              d="M100,210 Q97,160 100,90"
              className="stroke-fertil fill-none"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Hojas */}
            <ellipse cx="82" cy="180" rx="13" ry="7" className="fill-fertil/70" transform="rotate(-30 82 180)" />
            <ellipse cx="118" cy="165" rx="13" ry="7" className="fill-fertil/70" transform="rotate(30 118 165)" />
            <ellipse cx="85" cy="135" rx="12" ry="7" className="fill-fertil/70" transform="rotate(-20 85 135)" />
            <ellipse cx="115" cy="115" rx="12" ry="7" className="fill-fertil/70" transform="rotate(20 115 115)" />

            {/* Flor abierta (capa de petalos exteriores) */}
            <g>
              {/* 8 petalos en circulo */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <ellipse
                  key={angle}
                  cx="100"
                  cy="60"
                  rx="14"
                  ry="22"
                  className="fill-petalo/70"
                  transform={`rotate(${angle} 100 80)`}
                />
              ))}
              {/* Petalos interiores */}
              {[22, 67, 112, 157, 202, 247, 292, 337].map((angle) => (
                <ellipse
                  key={angle}
                  cx="100"
                  cy="65"
                  rx="10"
                  ry="16"
                  className="fill-coral/80"
                  transform={`rotate(${angle} 100 80)`}
                />
              ))}
              {/* Centro */}
              <circle cx="100" cy="80" r="9" className="fill-durazno" />
              <circle cx="100" cy="80" r="5" className="fill-durazno/80" />
              <circle cx="98" cy="78" r="2" className="fill-perla/60" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
