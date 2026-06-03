import { Calendar as CalendarIcon } from "lucide-react";

export const metadata = { title: "Calendario — FemBloom" };

export default function CalendarioPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-6 space-y-6 animate-florecer">
      <header>
        <h1 className="font-display text-4xl text-cacao">Tu calendario 📅</h1>
        <p className="text-cacao/70 mt-1">
          Aquí registrarás tu ciclo día a día
        </p>
      </header>

      <div className="tarjeta text-center py-12 space-y-3">
        <CalendarIcon className="w-12 h-12 text-lavanda mx-auto" strokeWidth={1.5} />
        <p className="text-cacao font-medium">Tu calendario llega mañana 🌸</p>
        <p className="text-sm text-cacao/60 max-w-sm mx-auto">
          Vamos paso a paso. Mañana tendrás un calendario completo
          para registrar tu menstruación, síntomas y más.
        </p>
      </div>
    </div>
  );
}
