"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { createClient } from "@/lib/supabase/client";
import { Lock, Plus, Loader2, X, Trash2 } from "lucide-react";

interface Entry {
  id: string;
  entry_date: string;
  content: string;
  created_at: string;
}

interface Props {
  initialEntries: Entry[];
}

export default function DiarioView({ initialEntries }: Props) {
  const supabase = createClient();
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [entryDate, setEntryDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openForm(entry?: Entry) {
    if (entry) {
      setEditingEntry(entry);
      setEntryDate(entry.entry_date);
      setContent(entry.content);
    } else {
      setEditingEntry(null);
      setEntryDate(new Date().toISOString().split("T")[0]);
      setContent("");
    }
    setShowForm(true);
    setError(null);
  }

  function closeForm() {
    setShowForm(false);
    setEditingEntry(null);
    setContent("");
    setError(null);
  }

  async function handleSave() {
    if (content.trim().length < 5) {
      setError("Escribe algo más para guardar tu entrada.");
      return;
    }
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("Sesión expirada");
      setLoading(false);
      return;
    }

    if (editingEntry) {
      const { data, error: updateError } = await supabase
        .from("journal_entries")
        .update({ content: content.trim(), entry_date: entryDate })
        .eq("id", editingEntry.id)
        .select()
        .single();

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      setEntries((prev) =>
        prev.map((e) => (e.id === editingEntry.id ? data : e))
      );
    } else {
      const { data, error: insertError } = await supabase
        .from("journal_entries")
        .insert({
          user_id: user.id,
          entry_date: entryDate,
          content: content.trim(),
        })
        .select()
        .single();

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      setEntries((prev) => [data, ...prev]);
    }

    setLoading(false);
    closeForm();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta entrada? No se puede deshacer.")) return;
    await supabase.from("journal_entries").delete().eq("id", id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 space-y-6 animate-florecer">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl text-cacao">Mi diario 📝</h1>
          <p className="text-cacao/70 mt-1 text-sm flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            Solo para tus ojos
          </p>
        </div>
        <button
          onClick={() => openForm()}
          className="btn-primario inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nueva
        </button>
      </header>

      {/* Lista de entradas */}
      {entries.length === 0 ? (
        <div className="tarjeta text-center py-10 space-y-3">
          <div className="text-5xl opacity-30">📓</div>
          <p className="font-medium text-cacao">Tu diario está vacío</p>
          <p className="text-sm text-cacao/60 max-w-sm mx-auto">
            Empieza a escribir tus emociones, pensamientos y reflexiones. Solo
            tú puedes leerlas.
          </p>
          <button
            onClick={() => openForm()}
            className="btn-primario inline-flex items-center gap-2 mt-2"
          >
            <Plus className="w-4 h-4" />
            Escribir mi primera entrada
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="tarjeta space-y-2">
              <div className="flex items-start justify-between">
                <button
                  onClick={() => openForm(entry)}
                  className="text-left flex-1"
                >
                  <p className="font-display text-xl text-cacao capitalize">
                    {format(parseISO(entry.entry_date), "EEEE, d 'de' MMMM", {
                      locale: es,
                    })}
                  </p>
                  <p className="text-[10px] text-cacao/50">
                    Guardado el{" "}
                    {format(parseISO(entry.created_at), "d MMM yyyy 'a las' HH:mm", {
                      locale: es,
                    })}
                  </p>
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-1.5 rounded-full text-error/60 hover:bg-error/10 hover:text-error transition"
                  aria-label="Eliminar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-cacao/80 text-sm leading-relaxed whitespace-pre-wrap">
                {entry.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal de formulario */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <button
            onClick={closeForm}
            className="absolute inset-0 bg-cacao/40 backdrop-blur-sm"
            aria-label="Cerrar"
          />
          <div className="relative w-full sm:max-w-md bg-perla rounded-t-3xl sm:rounded-suave shadow-petalo animate-florecer max-h-[90vh] overflow-y-auto">
            <div className="sm:hidden flex justify-center pt-3">
              <div className="w-12 h-1 bg-petalo/40 rounded-full" />
            </div>
            <button
              onClick={closeForm}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-petalo/30 transition z-10"
            >
              <X className="w-4 h-4 text-cacao/60" />
            </button>
            <div className="p-6 space-y-4">
              <h2 className="font-display text-2xl text-cacao">
                {editingEntry ? "Editar entrada" : "Nueva entrada"}
              </h2>
              <div className="space-y-1">
                <label className="text-sm font-medium text-cacao">Fecha</label>
                <input
                  type="date"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 rounded-suave border border-petalo/40 bg-perla focus:border-coral focus:outline-none transition"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-cacao">
                  ¿Qué quieres recordar de hoy?
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={2000}
                  rows={10}
                  placeholder="Hoy me sentí... Estuve pensando en... Quiero recordar que..."
                  className="w-full px-4 py-3 rounded-suave border border-petalo/40 bg-perla text-cacao placeholder:text-cacao/40 focus:border-coral focus:outline-none transition resize-none text-sm leading-relaxed"
                />
                <p className="text-[10px] text-cacao/50 text-right">
                  {content.length} / 2000
                </p>
              </div>
              {error && (
                <div className="bg-error/15 border border-error/30 rounded-suave px-4 py-3 text-sm text-cacao">
                  {error}
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={closeForm}
                  className="btn-secundario flex-1"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="btn-primario flex-1 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Guardando..." : "Guardar 🌸"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
