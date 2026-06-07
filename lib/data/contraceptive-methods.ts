export type MethodType = "pills" | "injection" | "iud" | "jadelle" | "implant" | "condom" | "none";

export interface ContraceptiveMethod {
  id: MethodType;
  name: string;
  emoji: string;
  description: string;
  reminderType: "daily" | "monthly" | "annual" | "periodic" | "no-reminder";
  reminderLabel: string;
  effectiveness: string;
  needsDateField: boolean;
  needsTimeField: boolean;
  needsRenewalField: boolean;
  info: string;
}

export const METHODS: ContraceptiveMethod[] = [
  {
    id: "pills",
    name: "Pastillas anticonceptivas",
    emoji: "💊",
    description: "Toma diaria a la misma hora",
    reminderType: "daily",
    reminderLabel: "Recordatorio diario",
    effectiveness: "91-99%",
    needsDateField: false,
    needsTimeField: true,
    needsRenewalField: false,
    info: "Las pastillas anticonceptivas requieren toma diaria a la misma hora. Te enviaremos un recordatorio cada día para que no lo olvides.",
  },
  {
    id: "injection",
    name: "Inyección",
    emoji: "💉",
    description: "Renovación cada 1 o 3 meses",
    reminderType: "monthly",
    reminderLabel: "Próxima renovación",
    effectiveness: "94-99%",
    needsDateField: true,
    needsTimeField: false,
    needsRenewalField: true,
    info: "Las inyecciones se aplican cada 1 o 3 meses según el tipo. Te avisaremos 3 días antes de tu próxima fecha de renovación.",
  },
  {
    id: "iud",
    name: "DIU (Dispositivo intrauterino)",
    emoji: "🧷",
    description: "Revisiones periódicas",
    reminderType: "periodic",
    reminderLabel: "Próxima revisión",
    effectiveness: "99%",
    needsDateField: true,
    needsTimeField: false,
    needsRenewalField: true,
    info: "El DIU puede durar entre 3 y 10 años según el tipo. Recomendamos revisiones anuales con tu ginecóloga.",
  },
  {
    id: "jadelle",
    name: "Jadelle",
    emoji: "🔬",
    description: "Implante hormonal de 5 años",
    reminderType: "annual",
    reminderLabel: "Vencimiento",
    effectiveness: "99%",
    needsDateField: true,
    needsTimeField: false,
    needsRenewalField: true,
    info: "Jadelle es un implante de 2 varillas que dura 5 años. Te avisaremos 1 mes antes de su vencimiento.",
  },
  {
    id: "implant",
    name: "Implante subdérmico",
    emoji: "💎",
    description: "Implante hormonal de 3 años",
    reminderType: "annual",
    reminderLabel: "Vencimiento",
    effectiveness: "99%",
    needsDateField: true,
    needsTimeField: false,
    needsRenewalField: true,
    info: "El implante subdérmico es una varilla pequeña que dura 3 años. Te avisaremos cerca de su vencimiento.",
  },
  {
    id: "condom",
    name: "Preservativo",
    emoji: "🛡️",
    description: "Sin recordatorios periódicos",
    reminderType: "no-reminder",
    reminderLabel: "No requiere recordatorio",
    effectiveness: "82-98%",
    needsDateField: false,
    needsTimeField: false,
    needsRenewalField: false,
    info: "El preservativo es el único método que también protege contra ITS. No requiere recordatorios programados.",
  },
  {
    id: "none",
    name: "Sin método",
    emoji: "🌷",
    description: "No uso ningún método",
    reminderType: "no-reminder",
    reminderLabel: "Sin recordatorios",
    effectiveness: "—",
    needsDateField: false,
    needsTimeField: false,
    needsRenewalField: false,
    info: "Si no usas ningún método, FemBloom puede ayudarte con seguimiento de tu ventana fértil y predicciones.",
  },
];

export function getMethod(id: string): ContraceptiveMethod | undefined {
  return METHODS.find((m) => m.id === id);
}
