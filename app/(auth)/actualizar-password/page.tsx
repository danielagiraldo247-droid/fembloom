import ActualizarForm from "./actualizar-form";

export const metadata = {
  title: "Nueva contraseña — FemBloom",
};

export default function ActualizarPasswordPage() {
  return (
    <div className="tarjeta space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-cacao">
          Crea tu nueva contraseña 🌸
        </h1>
        <p className="text-sm text-cacao/70">
          Elige una que recordarás fácilmente.
        </p>
      </div>

      <ActualizarForm />
    </div>
  );
}
