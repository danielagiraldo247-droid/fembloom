import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // === Paleta FemBloom ===
        // Colores principales
        petalo: "#F8C9D3",        // Rosa pétalo
        bruma: "#D9C2E9",          // Lila bruma
        menta: "#C5E7D4",          // Verde menta
        crema: "#FDF6F0",          // Crema (fondo)
        perla: "#FFFFFF",          // Blanco perla

        // Funcionales
        coral: "#F4A6B0",          // Rosa coral
        lavanda: "#B89DC9",        // Lavanda ovulación
        fertil: "#9CCFB1",         // Verde fertilidad
        durazno: "#FFD9B3",        // Amarillo durazno
        cacao: "#7D5A4F",          // Marrón cacao (texto principal)
        niebla: "#9B9B9B",         // Gris niebla (texto secundario)

        // Estados
        exito: "#A8D5BA",
        info: "#B5D6E8",
        alerta: "#F5D49E",
        error: "#F2A4A4",
      },
      fontFamily: {
        sans: ["var(--font-quicksand)", "sans-serif"],
        display: ["var(--font-caveat)", "cursive"],
      },
      borderRadius: {
        suave: "16px",
        botón: "24px",
      },
      boxShadow: {
        petalo: "0 4px 16px rgba(248, 201, 211, 0.15)",
        suave: "0 2px 12px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        florecer: "florecer 0.6s ease-out",
        flotar: "flotar 4s ease-in-out infinite",
      },
      keyframes: {
        florecer: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        flotar: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
