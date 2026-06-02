/**
 * Divider visual con texto en el medio.
 * Usado para separar "Continuar con Google" del formulario de email/contrasena.
 *
 * Ejemplo:
 *   ─────────────  o  ─────────────
 */
export default function Divider({ text = "o" }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <span className="flex-1 h-px bg-petalo/40" />
      <span className="text-xs uppercase tracking-wider text-cacao/50">
        {text}
      </span>
      <span className="flex-1 h-px bg-petalo/40" />
    </div>
  );
}
