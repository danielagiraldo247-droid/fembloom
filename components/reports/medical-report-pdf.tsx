"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#7D5A4F",
    backgroundColor: "#FDF6F0",
  },
  header: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#F4A6B0",
  },
  brandName: {
    fontSize: 28,
    color: "#F4A6B0",
    marginBottom: 4,
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#9B9B9B",
  },
  patientInfo: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoBlock: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 9,
    color: "#9B9B9B",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
    color: "#7D5A4F",
    fontFamily: "Helvetica-Bold",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#7D5A4F",
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#D9C2E9",
  },
  table: {
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F8C9D3",
  },
  tableHeader: {
    backgroundColor: "#F8C9D3",
    paddingVertical: 6,
    paddingHorizontal: 4,
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  tableCell: {
    paddingHorizontal: 4,
    fontSize: 10,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 6,
    color: "#7D5A4F",
  },
  bullet: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 3,
  },
  summary: {
    backgroundColor: "#C5E7D4",
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  summaryTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    bottom: 25,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#9B9B9B",
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: "#D9C2E9",
  },
});

export interface ReportData {
  patientName: string;
  email: string;
  reportDate: string;
  rangeStart: string;
  rangeEnd: string;
  cycleLength: number;
  periodLength: number;
  lastPeriodStart: string;
  cycles: { start_date: string; end_date?: string | null }[];
  symptoms: { log_date: string; symptom_type: string }[];
  moods: { log_date: string; mood_type: string }[];
  relations: {
    relation_date: string;
    with_protection: boolean;
  }[];
  contraceptiveMethod?: string | null;
  objective?: string | null;
}

const SYMPTOM_LABELS: Record<string, string> = {
  headache: "Dolor de cabeza",
  migraine: "Migraña",
  dizziness: "Mareo",
  breast_tenderness: "Sensibilidad pectoral",
  breast_swelling: "Hinchazon pectoral",
  cramps: "Colicos",
  bloating: "Hinchazon abdominal",
  nausea: "Nauseas",
  constipation: "Estrenimiento",
  diarrhea: "Diarrea",
  back_pain: "Dolor lumbar",
  upper_back_pain: "Dolor de espalda alta",
  leg_cramps: "Calambres en piernas",
  heaviness: "Pesadez en piernas",
  fatigue: "Fatiga",
  insomnia: "Insomnio",
  acne: "Acne",
  cravings: "Antojos",
  mood_swings: "Cambios emocionales",
  anxiety: "Ansiedad",
};

const MOOD_LABELS: Record<string, string> = {
  happy: "Alegre",
  sad: "Triste",
  irritable: "Irritable",
  anxious: "Ansiosa",
  calm: "Tranquila",
  sensitive: "Sensible",
  energetic: "Energetica",
  tired: "Cansada",
};

const OBJECTIVE_LABELS: Record<string, string> = {
  seeking_pregnancy: "Buscar embarazo",
  avoiding_pregnancy: "Evitar embarazo",
  tracking_only: "Solo seguimiento",
};

function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "d MMM yyyy", { locale: es });
  } catch {
    return dateStr;
  }
}

function countOccurrences<T extends string>(arr: { type: T }[]): Map<T, number> {
  const map = new Map<T, number>();
  arr.forEach((item) => {
    map.set(item.type, (map.get(item.type) || 0) + 1);
  });
  return map;
}

export default function MedicalReportPDF({ data }: { data: ReportData }) {
  // Estadisticas de sintomas
  const symptomCounts = countOccurrences(
    data.symptoms.map((s) => ({ type: s.symptom_type }))
  );
  const topSymptoms = Array.from(symptomCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Estadisticas de animos
  const moodCounts = countOccurrences(
    data.moods.map((m) => ({ type: m.mood_type }))
  );
  const topMoods = Array.from(moodCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalRelations = data.relations.length;
  const protectedRelations = data.relations.filter(
    (r) => r.with_protection
  ).length;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.brandName}>FemBloom</Text>
          <Text style={styles.subtitle}>Reporte Medico de Bienestar Menstrual</Text>

          <View style={styles.patientInfo}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Paciente</Text>
              <Text style={styles.infoValue}>{data.patientName}</Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Periodo del reporte</Text>
              <Text style={styles.infoValue}>
                {formatDate(data.rangeStart)} - {formatDate(data.rangeEnd)}
              </Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Generado el</Text>
              <Text style={styles.infoValue}>{formatDate(data.reportDate)}</Text>
            </View>
          </View>
        </View>

        {/* CONFIGURACION DEL CICLO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuracion del ciclo</Text>
          <Text style={styles.paragraph}>
            Duracion promedio del ciclo: {data.cycleLength} dias{"\n"}
            Duracion promedio de la menstruacion: {data.periodLength} dias{"\n"}
            Fecha del ultimo periodo conocido: {formatDate(data.lastPeriodStart)}{"\n"}
            {data.objective &&
              `Objetivo en la plataforma: ${OBJECTIVE_LABELS[data.objective] || data.objective}\n`}
            {data.contraceptiveMethod &&
              `Metodo anticonceptivo activo: ${data.contraceptiveMethod}`}
          </Text>
        </View>

        {/* HISTORIAL MENSTRUAL */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historial menstrual</Text>
          {data.cycles.length === 0 ? (
            <Text style={styles.paragraph}>
              Sin ciclos completos registrados en este periodo.
            </Text>
          ) : (
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, { flex: 2 }]}>Inicio</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>Fin</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>Duracion</Text>
              </View>
              {data.cycles.map((cycle, i) => (
                <View key={i} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 2 }]}>
                    {formatDate(cycle.start_date)}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 2 }]}>
                    {cycle.end_date ? formatDate(cycle.end_date) : "En curso"}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {cycle.end_date
                      ? `${Math.abs(
                          Math.round(
                            (new Date(cycle.end_date).getTime() -
                              new Date(cycle.start_date).getTime()) /
                              86400000
                          )
                        )} dias`
                      : "-"}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* SINTOMAS MAS FRECUENTES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sintomas mas frecuentes</Text>
          {topSymptoms.length === 0 ? (
            <Text style={styles.paragraph}>
              No se registraron sintomas en este periodo.
            </Text>
          ) : (
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, { flex: 3 }]}>Sintoma</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>Veces</Text>
              </View>
              {topSymptoms.map(([symptom, count]) => (
                <View key={symptom} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 3 }]}>
                    {SYMPTOM_LABELS[symptom] || symptom}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{count}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ESTADOS DE ANIMO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estados de animo registrados</Text>
          {topMoods.length === 0 ? (
            <Text style={styles.paragraph}>
              No se registraron estados de animo en este periodo.
            </Text>
          ) : (
            topMoods.map(([mood, count]) => (
              <Text key={mood} style={styles.bullet}>
                - {MOOD_LABELS[mood] || mood}: {count} veces
              </Text>
            ))
          )}
        </View>

        {/* RELACIONES (resumen, no detalles) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen de actividad sexual</Text>
          <Text style={styles.paragraph}>
            Total de relaciones registradas: {totalRelations}{"\n"}
            Con proteccion: {protectedRelations}{"\n"}
            Sin proteccion: {totalRelations - protectedRelations}
          </Text>
        </View>

        {/* RESUMEN */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Resumen del periodo</Text>
          <Text style={{ fontSize: 10 }}>
            {data.cycles.length} ciclo(s) registrado(s) - {data.symptoms.length}{" "}
            sintoma(s) - {data.moods.length} animo(s) - {totalRelations}{" "}
            relacion(es)
          </Text>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer} fixed>
          FemBloom - Reporte generado para uso medico - Este reporte es
          informativo y no reemplaza diagnostico profesional.
        </Text>
      </Page>
    </Document>
  );
}
