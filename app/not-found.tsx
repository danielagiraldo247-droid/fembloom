import Link from "next/link";
import { Flower2 } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md text-center space-y-6 animate-florecer">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-petalo/40 blur-2xl rounded-full" />
          <Flower2
            className="relative w-20 h-20 text-coral mx-auto animate-flotar"
            strokeWidth={1.5}
          />
        </div>

        <div className="space-y-2">
          <h1 className="font-display text-6xl text-cacao">Ups</h1>
          <p className="text-cacao/80 leading-relaxed">
            Esta página se perdió en el jardín 🌷
          </p>
          <p className="text-sm text-cacao/60">
            La página que buscas no existe o fue movida.
          </p>
        </div>

        <Link href="/agenda" className="btn-primario inline-block">
          Volver a mi agenda
        </Link>
      </div>
    </main>
  );
}
