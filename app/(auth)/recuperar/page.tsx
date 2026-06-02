import Link from "next/link";
import RecuperarForm from "./recuperar-form";

export const metadata = {
  title: "Recuperar contraseña — FemBloom",
};

export default function RecuperarPage() {
  return (
    <div className="tarjeta space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-cacao">
          ¿Olvidaste tu contraseña? 🌷
        </h1>
        <p className="text-sm text-cacao/70">
          No te preocupes. Ingresa tu correo y te enviaremos un enlace para
          crear una nueva.
        </p>
      </div>

      <RecuperarForm />

      <p className="text-center text-sm text-cacao/70">
        <Link
          href="/login"
          className="text-coral font-semibold hover:underline"
        >
          Volver a iniciar sesión
        </Link>
      </p>
    </div>
  );
}
