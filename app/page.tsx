import Link from "next/link";
import { Flower2, Heart, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Hero */}
      <section className="max-w-2xl text-center space-y-6 animate-florecer">
        {/* Logo decorativo */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-petalo/40 blur-2xl rounded-full" />
            <Flower2
              className="relative w-20 h-20 text-coral animate-flotar"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Título */}
        <h1 className="font-display text-6xl md:text-7xl text-cacao leading-tight">
          FemBloom
        </h1>

        <p className="text-lg md:text-xl text-cacao/80 font-light max-w-xl mx-auto">
          Tu compañera de bienestar menstrual. Una agenda íntima para
          acompañarte en cada fase de tu ciclo.
        </p>

        {/* Tarjeta de saludo de ejemplo */}
        <div className="tarjeta max-w-md mx-auto mt-8 text-left space-y-3">
          <p className="font-display text-3xl text-cacao">Hola Daniela,</p>
          <div className="space-y-2 text-cacao/75">
            <p className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-lavanda" />
              Día 14 de tu ciclo
            </p>
            <p className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-coral" />
              Te encuentras en tu ventana fértil
            </p>
            <p className="flex items-center gap-2">
              <Flower2 className="w-4 h-4 text-fertil" />
              Tu jardín tiene 4 flores creciendo
            </p>
          </div>
        </div>

        {/* Botones de accion */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link href="/registro" className="btn-primario inline-block">
            Crear mi cuenta
          </Link>
          <Link href="/login" className="btn-secundario inline-block">
            Ya tengo cuenta
          </Link>
        </div>

        <p className="text-xs text-cacao/60 mt-2">
          3 meses gratis. Sin tarjeta de crédito.
        </p>

        {/* Pie */}
        <footer className="mt-16 text-xs text-niebla">
          Hecho con cariño por Daniela ✨
        </footer>
      </section>
    </main>
  );
}
