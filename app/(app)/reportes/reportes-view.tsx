"use client";

import { useState } from "react";
import { format, subMonths, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { createClient } from "@/lib/supabase/client";
import { FileText, Download, Calendar, Loader2, FileCheck } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import MedicalReportPDF, { type ReportData } from "@/components/reports/medical-report-pdf";

interface Props {
  patientName: string;
  email: string;
  objective?: string | null;
  cycleLength: number;
  periodLength: number;
  lastPeriodStart: string;
  contraceptiveMethod?: string | null;
}

type RangePreset = "1m" | "3m" | "6m" | "custom";

const PRESETS: { id: RangePreset; label: string; months: number }[] = [
  { id: "1m", label: "Último mes", months: 1 },
  { id: "3m", label: "Últimos 3 meses", months: 3 },
  { id: "6m", label: "Últimos 6 meses", months: 6 },
];

export default function ReportesView({
  patientName,
  email,
  objective,
  cycleLength,
  periodLength,
  lastPeriodStart,
  contraceptiveMethod,
}: Props) {
  const supabase = createClient();
  const [preset, setPreset] = useState<RangePreset>("3m");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function getRange(): { start: string; end: string } {
    const end = new Date().toISOString().split("T")[0];

    if (preset === "custom") {
      return { start: customStart, end: customEnd };
    }

    const monthsBack = PRESETS.find((p) => p.id === preset)?.months || 3;
    const start = subMonths(new Date(), monthsBack)
      .toISOString()
      .split("T")[0];

    return { start, end };
  }

  async function handleDownload() {
    setGenerating(true);
    setError(null);
    setSuccess(false);

    const { start, end } = getRange();

    if (!start) {
      setError("Por favor elige una fecha de inicio");
      setGenerating(false);
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Sesion expirada");

      // Traer todos los datos del rango
      const [cyclesRes, symptomsRes, moodsRes, relationsRes] = await Promise.all([
        supabase
          .from("cycles")
          .select("start_date, end_date")
          .eq("user_id", user.id)
          .gte("start_date", start)
          .lte("start_date", end)
          .order("start_date", { ascending: false }),
        supabase
          .from("symptoms")
          .select("log_date, symptom_type")
          .eq("user_id", user.id)
          .gte("log_date", start)
          .lte("log_date", end),
        supabase
          .from("moods")
          .select("log_date, mood_type")
          .eq("user_id", user.id)
          .gte("log_date", start)
          .lte("log_date", end),
        supabase
          .from("relations")
          .select("relation_date, with_protection")
          .eq("user_id", user.id)
          .gte("relation_date", start)
          .lte("relation_date", end),
      ]);

      const reportData: ReportData = {
        patientName,
        email,
        objective,
        reportDate: new Date().toISOString().split("T")[0],
        rangeStart: start,
        rangeEnd: end,
        cycleLength,
        periodLength,
        lastPeriodStart,
        contraceptiveMethod,
        cycles: cyclesRes.data || [],
        symptoms: symptomsRes.data || [],
        moods: moodsRes.data || [],
        relations: relationsRes.data || [],
      };

      // Generar el PDF
      const blob = await pdf(<MedicalReportPDF data={reportData} />).toBlob();

      // Descargarlo
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `FemBloom_Reporte_${format(new Date(), "yyyyMMdd")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al generar PDF";
      setError(msg);
    } finally {
      setGenerating(false);
    }
  }

  const { start, end } = getRange();

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 space-y-6 animate-florecer">
      <header>
        <h1 className="font-display text-4xl text-cacao">Reportes 📄</h1>
        <p className="text-cacao/70 mt-1 text-sm">
          Descarga tu historial para llevar a tu médica
        </p>
      </header>

      {/* Que incluye */}
      <div className="tarjeta bg-menta/20 border border-fertil/30 space-y-2">
        <p className="text-xs font-semibold text-cacao/80 uppercase tracking-wider flex items-center gap-1.5">
          <FileCheck className="w-3.5 h-3.5 text-fertil" />
          Tu reporte incluirá
        </p>
        <ul className="space-y-1 text-xs text-cacao/70 pl-2">
          <li>• Configuración de tu ciclo (duración promedio)</li>
          <li>• Historial de ciclos del rango seleccionado</li>
          <li>• Síntomas más frecuentes con cantidad</li>
          <li>• Estados de ánimo registrados</li>
          <li>• Resumen de actividad sexual</li>
          <li>• Método anticonceptivo actual</li>
        </ul>
      </div>

      {/* Selector de rango */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider px-1 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          Rango del reporte
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPreset(p.id)}
              className={`tarjeta py-3 text-sm font-medium transition ${
                preset === p.id
                  ? "ring-2 ring-coral bg-petalo/15 text-cacao"
                  : "text-cacao/70 hover:shadow-petalo"
              }`}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={() => setPreset("custom")}
            className={`tarjeta py-3 text-sm font-medium transition col-span-2 ${
              preset === "custom"
                ? "ring-2 ring-coral bg-petalo/15 text-cacao"
                : "text-cacao/70 hover:shadow-petalo"
            }`}
          >
            Rango personalizado
          </button>
        </div>

        {/* Inputs para rango personalizado */}
        {preset === "custom" && (
          <div className="grid grid-cols-2 gap-3 animate-florecer">
            <div className="space-y-1">
              <label className="text-xs text-cacao/70">Desde</label>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                max={customEnd}
                className="w-full px-3 py-2 rounded-suave border border-petalo/40 bg-perla text-cacao focus:border-coral focus:outline-none text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cacao/70">Hasta</label>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 rounded-suave border border-petalo/40 bg-perla text-cacao focus:border-coral focus:outline-none text-sm"
              />
            </div>
          </div>
        )}

        {/* Resumen del rango */}
        {start && end && (
          <p className="text-xs text-cacao/60 text-center px-1">
            Del{" "}
            <span className="font-semibold text-coral capitalize">
              {format(parseISO(start), "d 'de' MMMM yyyy", { locale: es })}
            </span>{" "}
            al{" "}
            <span className="font-semibold text-coral capitalize">
              {format(parseISO(end), "d 'de' MMMM yyyy", { locale: es })}
            </span>
          </p>
        )}
      </section>

      {/* Boton de descarga */}
      <button
        onClick={handleDownload}
        disabled={generating || (preset === "custom" && !customStart)}
        className="btn-primario w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed py-4"
      >
        {generating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generando PDF...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Descargar mi reporte
          </>
        )}
      </button>

      {success && (
        <div className="bg-menta/30 border border-fertil/40 rounded-suave px-4 py-3 text-sm text-cacao flex items-center gap-2 animate-florecer">
          <FileCheck className="w-4 h-4 text-fertil" />
          ¡Listo! Tu reporte se descargó correctamente 🌸
        </div>
      )}

      {error && (
        <div className="bg-error/15 border border-error/30 rounded-suave px-4 py-3 text-sm text-cacao">
          {error}
        </div>
      )}

      {/* Nota legal */}
      <div className="tarjeta bg-bruma/15 space-y-1">
        <p className="text-xs text-cacao/70 leading-relaxed">
          <FileText className="w-3.5 h-3.5 inline mr-1 text-lavanda" />
          Este reporte es informativo y se basa en los datos que has
          registrado en FemBloom. No reemplaza una consulta o diagnóstico
          médico profesional.
        </p>
      </div>
    </div>
  );
}
