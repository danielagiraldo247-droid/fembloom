"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export default function PrivacyActions() {
  const supabase = createClient();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmText = prompt(
      "Para eliminar tu cuenta y TODOS tus datos permanentemente, escribe la palabra: ELIMINAR"
    );
    if (confirmText !== "ELIMINAR") {
      alert("Cancelado. Tu cuenta NO fue eliminada.");
      return;
    }

    if (
      !confirm(
        "Esto es DEFINITIVO. Perderás todo tu historial, tu jardín y tu cuenta. ¿Continuar?"
      )
    )
      return;

    setDeleting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Borrar datos (las tablas tienen ON DELETE CASCADE)
    await supabase.from("profiles").delete().eq("id", user.id);
    // Cerrar sesion
    await supabase.auth.signOut();

    alert("Tu cuenta fue eliminada. Esperamos verte de nuevo algún día 🌸");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="tarjeta w-full flex items-center justify-between hover:bg-error/5 border border-error/20 transition disabled:opacity-60"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center">
            {deleting ? (
              <Loader2 className="w-5 h-5 text-error animate-spin" />
            ) : (
              <Trash2 className="w-5 h-5 text-error" strokeWidth={1.5} />
            )}
          </div>
          <div className="text-left">
            <p className="font-medium text-error text-sm">Eliminar mi cuenta</p>
            <p className="text-xs text-cacao/60">
              Borra tu cuenta y todos tus datos para siempre
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
