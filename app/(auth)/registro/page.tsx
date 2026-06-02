import Link from "next/link";
import RegistroForm from "./registro-form";

export const metadata = {
  title: "Crear cuenta — FemBloom",
};

export default function RegistroPage() {
  return (
    <div className="tarjeta space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-cacao">
          Comienza tu viaje 🌸
        </h1>
        <p className="text-sm text-cacao/70">
          Crea tu cuenta y disfruta 3 meses gratis con acceso completo.
        </p>
      </div>

      <RegistroForm />

      <p className="text-center text-sm text-cacao/70">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="text-coral font-semibold hover:underline"
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
