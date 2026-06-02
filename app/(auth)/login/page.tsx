import Link from "next/link";
import LoginForm from "./login-form";

export const metadata = {
  title: "Iniciar sesión — FemBloom",
};

export default function LoginPage() {
  return (
    <div className="tarjeta space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-cacao">
          Bienvenida de vuelta 🌸
        </h1>
        <p className="text-sm text-cacao/70">
          Inicia sesión para continuar floreciendo.
        </p>
      </div>

      <LoginForm />

      <p className="text-center text-sm text-cacao/70">
        ¿Aún no tienes cuenta?{" "}
        <Link
          href="/registro"
          className="text-coral font-semibold hover:underline"
        >
          Crea una aquí
        </Link>
      </p>
    </div>
  );
}
