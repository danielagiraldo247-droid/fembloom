"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";

/**
 * Boton para cerrar sesion.
 *
 * 1. Llama a supabase.auth.signOut() para borrar la sesion del navegador.
 * 2. Redirige al inicio publico (/).
 */
export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-sm text-cacao/60 hover:text-cacao inline-flex items-center gap-2 transition disabled:opacity-50"
    >
      <LogOut className="w-4 h-4" />
      {loading ? "Cerrando..." : "Cerrar sesión"}
    </button>
  );
}
