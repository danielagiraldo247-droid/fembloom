"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Download, Trash2, Loader2 } from "lucide-react";

export default function PrivacyActions() {
  const supabase = createClient();
  const router = useRouter();
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const [
        profile,
        cycleSettings,
        cycles,
        dailyLogs,
        symptoms,
        moods,
        relations,
        contraceptive,
        reminders,
        journalEntries,
        gardenProgress,
        achievements,
      ] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("cycle_settings").select("*").eq("user_id", user.id),
        supabase.from("cycles").select("*").eq("user_id", user.id),
        supabase.from("daily_logs").select("*").eq("user_id", user.id),
        supabase.from("symptoms").select("*").eq("user_id", user.id),
        supabase.from("moods").select("*").eq("user_id", user.id),
        supabase.from("relations").select("*").eq("user_id", user.id),
        supabase.from("contraceptive_methods").select("*").eq("user_id", user.id),
        supabase.from("reminders").select("*").eq("user_id", user.id),
        supabase.from("journal_entries").select("*").eq("user_id", user.id),
        supabase.from("garden_progress").select("*").eq("user_id", user.id),
        supabase.from("achievements").select("*").eq("user_id", user.id),
      ]);

      const data = {
        exported_at: new Date().toISOString(),
        user: {
          id: user.id,
          email: user.email,
        },
        profile: profile.data,
        cycle_settings: cycleSettings.data,
        cycles: cycles.data,
        daily_logs: dailyLogs.data,
        symptoms: symptoms.data,
        moods: moods.data,
        relations: relations.data,
        contraceptive_methods: contraceptive.data,
        reminders: reminders.data,
        journal_entries: journalEntries.data,
        garden_progress: gardenProgress.data,
        achievements: achievements.data,
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `fembloom-mis-datos-${new Date()
        .toISOString()
        .split("T")[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }

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
        onClick={handleExport}
        disabled={exporting}
        className="tarjeta w-full flex items-center justify-between hover:shadow-petalo transition disabled:opacity-60"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-bruma/40 flex items-center justify-center">
            {exporting ? (
              <Loader2 className="w-5 h-5 text-lavanda animate-spin" />
            ) : (
              <Download className="w-5 h-5 text-lavanda" strokeWidth={1.5} />
            )}
          </div>
          <div className="text-left">
            <p className="font-medium text-cacao text-sm">
              Exportar todos mis datos
            </p>
            <p className="text-xs text-cacao/60">
              Descarga un archivo JSON con tu información
            </p>
          </div>
        </div>
      </button>

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
