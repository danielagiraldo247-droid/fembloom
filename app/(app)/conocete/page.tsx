import { BookOpen } from "lucide-react";

export const metadata = { title: "Conócete — FemBloom" };

export default function ConocetePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-6 space-y-6 animate-florecer">
      <header>
        <h1 className="font-display text-4xl text-cacao">Conócete 📖</h1>
        <p className="text-cacao/70 mt-1">
          Aprende sobre tu ciclo, fertilidad y bienestar
        </p>
      </header>

      <div className="tarjeta text-center py-12 space-y-3">
        <BookOpen className="w-12 h-12 text-coral mx-auto" strokeWidth={1.5} />
        <p className="text-cacao font-medium">Próximamente en el Día 5 🌸</p>
        <p className="text-sm text-cacao/60 max-w-sm mx-auto">
          Tendrás más de 15 artículos sobre tu ciclo menstrual,
          fertilidad, métodos anticonceptivos y bienestar emocional.
        </p>
      </div>
    </div>
  );
}
