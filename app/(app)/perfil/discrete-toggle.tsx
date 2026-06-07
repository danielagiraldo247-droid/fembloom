"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface Props {
  initialValue: boolean;
}

/**
 * Toggle del modo discreto.
 * Cuando esta activado, las notificaciones muestran texto generico
 * para proteger la privacidad de la usuaria.
 */
export default function DiscreteToggle({ initialValue }: Props) {
  const supabase = createClient();
  const [enabled, setEnabled] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    const newValue = !enabled;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ discrete_mode: newValue })
      .eq("id", user.id);

    if (!error) {
      setEnabled(newValue);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="tarjeta w-full flex items-center justify-between disabled:opacity-60"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            enabled ? "bg-cacao/80" : "bg-petalo/40"
          }`}
        >
          {enabled ? (
            <EyeOff className="w-5 h-5 text-white" strokeWidth={1.5} />
          ) : (
            <Eye className="w-5 h-5 text-cacao" strokeWidth={1.5} />
          )}
        </div>
        <div className="text-left">
          <p className="font-medium text-cacao text-sm">Modo discreto</p>
          <p className="text-xs text-cacao/60">
            {enabled
              ? "Las notificaciones no muestran info sensible"
              : "Notificaciones con info completa"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-cacao/60" />}
        <div
          className={`w-12 h-6 rounded-full transition-colors relative ${
            enabled ? "bg-coral" : "bg-cacao/20"
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 bg-perla rounded-full transition-all ${
              enabled ? "right-0.5" : "left-0.5"
            }`}
          />
        </div>
      </div>
    </button>
  );
}
