import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Modelo estable y gratuito disponible en todos los tiers
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

/**
 * Respuestas de respaldo cuando la API de Gemini no responde.
 * Detecta palabras clave y devuelve respuestas empaticas pre-armadas.
 */
function generateFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("colico") || lower.includes("cólico") || lower.includes("dolor")) {
    return "Los cólicos menstruales son muy comunes 🌸. Pasan porque tu útero se contrae para expulsar el revestimiento. Te ayudan: una bolsa caliente sobre el abdomen, té de manzanilla o jengibre, ejercicio suave como yoga, y dormir bien. Si el dolor es muy fuerte o interfiere con tu vida diaria, consulta a tu ginecóloga — podría ser endometriosis.";
  }

  if (lower.includes("ovular") || lower.includes("ovulación") || lower.includes("ovulacion") || lower.includes("ovulo") || lower.includes("óvulo")) {
    return "La ovulación ocurre aproximadamente 14 días antes de tu próximo período. Puedes notar: flujo cervical tipo clara de huevo, leve dolor en un costado, más energía y libido. En FemBloom puedes ver tu ovulación estimada en el calendario 🌷.";
  }

  if (lower.includes("embarazo") || lower.includes("embarazada")) {
    return "Las señales tempranas de embarazo incluyen: retraso menstrual, senos sensibles, cansancio, náuseas y orinar más. Si tu período se atrasa, hazte un test de embarazo (mejor con la primera orina de la mañana). Si sale positivo, agenda consulta con tu ginecóloga 💕.";
  }

  if (lower.includes("pastilla") || lower.includes("anticonceptiv")) {
    return "Las pastillas anticonceptivas tienen 91-99% de efectividad si las tomas todos los días a la misma hora. Funcionan evitando la ovulación. Si olvidas una: si fue hace menos de 12 horas, tómala apenas recuerdes; si fue más, usa protección adicional 7 días. En el centro de planificación de FemBloom puedes configurar recordatorios diarios 💊.";
  }

  if (lower.includes("ciclo") || lower.includes("regular")) {
    return "Tu ciclo se considera normal entre 21-45 días. Los ciclos irregulares pueden ser por estrés, cambios de peso, ejercicio extremo, o condiciones como SOP. Llevar registro en FemBloom te ayuda a detectar patrones. Si tienes ciclos muy irregulares por mucho tiempo, consulta a tu médica 🌸.";
  }

  if (lower.includes("triste") || lower.includes("sensible") || lower.includes("animo") || lower.includes("ánimo") || lower.includes("ansiedad")) {
    return "Las hormonas que regulan tu ciclo también afectan tu cerebro. Sentirte sensible, triste o ansiosa antes del período es completamente normal — no estás 'exagerando'. Te ayudan: aceptar tus emociones sin juzgarte, dormir bien, reducir cafeína y azúcar, ejercicio suave. Si los síntomas son muy intensos consistentemente, podría ser TDPM y vale la pena consultar 💕.";
  }

  if (lower.includes("flujo") || lower.includes("vagina") || lower.includes("descarga")) {
    return "El flujo vaginal cambia durante tu ciclo. Después del período es escaso, antes de ovular es como clara de huevo (más fértil), después de ovular es cremoso. Si notas mal olor, picor, color amarillo/verde o textura grumosa, podría ser una infección — consulta a tu médica 🌷.";
  }

  if (lower.includes("sintoma") || lower.includes("síntoma")) {
    return "Los síntomas más comunes durante el ciclo son: cólicos, dolor de cabeza, sensibilidad pectoral, cambios de humor, antojos, fatiga, hinchazón. En FemBloom puedes registrar tus síntomas en el calendario y ver patrones. Esto es muy útil para llevar a tu ginecóloga 🌸.";
  }

  if (lower.includes("hola") || lower.includes("bloom") || lower.length < 15) {
    return "¡Hola! Soy Bloom, tu consejera virtual 🌸. Puedo orientarte sobre tu ciclo menstrual, fertilidad, métodos anticonceptivos y bienestar emocional. Cuéntame, ¿qué te gustaría saber?";
  }

  return "Esa es una buena pregunta. Te recomiendo explorar la sección 'Conócete' donde hay 15 artículos sobre tu ciclo, fertilidad, anticonceptivos y bienestar. Si tu pregunta es muy específica o preocupante, consulta a tu ginecóloga para una respuesta personalizada 💕.";
}

const SYSTEM_PROMPT = `Eres Bloom, la consejera virtual de FemBloom. Eres calida, empatica y cercana, como una amiga que entiende.

REGLAS DE COMUNICACION:
- Responde SIEMPRE en espanol latinoamericano.
- Tono carinoso pero no infantil. No uses muchos emojis (max 1-2 por respuesta).
- Llama a la usuaria por su nombre cuando lo tengas.
- Respuestas concisas (max 4 parrafos cortos).
- No uses lenguaje clinico fr io. Habla como una amiga con conocimiento.

TEMAS QUE PUEDES TRATAR:
- Ciclo menstrual y sus fases
- Fertilidad y ovulacion
- Sintomas comunes y como aliviarlos
- Metodos anticonceptivos (informacion general)
- Bienestar emocional y SPM
- Salud sexual
- Funciones de FemBloom

LIMITES IMPORTANTES:
- NO das diagnosticos medicos. Si la usuaria describe sintomas preocupantes, recomiendale consultar a su ginecologa.
- NO recetas medicamentos.
- NO juzgas decisiones sobre embarazo, anticoncepcion o vida sexual.
- Si te preguntan algo fuera de tu area, ofrece redirigirla al tema o sugiere consulta profesional.

INFO DE LA USUARIA (puede o no haber):
{userContext}`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mensaje invalido" },
        { status: 400 }
      );
    }

    // Obtener contexto de la usuaria
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let userContext = "Sin contexto adicional.";
    if (user) {
      const [profileRes, cycleRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("full_name, objective")
          .eq("id", user.id)
          .single(),
        supabase
          .from("cycle_settings")
          .select("avg_cycle_length, last_period_start")
          .eq("user_id", user.id)
          .single(),
      ]);

      const profile = profileRes.data;
      const cycle = cycleRes.data;
      const nombre = profile?.full_name?.split(" ")[0] || "amiga";

      userContext = `Nombre: ${nombre}. `;
      if (profile?.objective) {
        const obj =
          profile.objective === "seeking_pregnancy"
            ? "buscando embarazo"
            : profile.objective === "avoiding_pregnancy"
            ? "evitando embarazo"
            : "solo seguimiento";
        userContext += `Objetivo: ${obj}. `;
      }
      if (cycle?.avg_cycle_length) {
        userContext += `Ciclo de ${cycle.avg_cycle_length} dias. `;
      }
    }

    const systemPromptFinal = SYSTEM_PROMPT.replace("{userContext}", userContext);

    // Armar mensajes
    const contents = [
      { role: "user", parts: [{ text: systemPromptFinal }] },
      {
        role: "model",
        parts: [
          {
            text: "Entendido. Estoy lista para acompanar con calidez a la usuaria de FemBloom.",
          },
        ],
      },
      ...(history || []).map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await fetch(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.85,
            topP: 0.9,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_ONLY_HIGH",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_ONLY_HIGH",
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini error:", errorText);

      // Fallback empatico cuando la API no esta disponible
      const fallbackMessage = generateFallbackResponse(message);
      return NextResponse.json({ message: fallbackMessage });
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Disculpa, no pude generar una respuesta. ¿Podrias preguntarmelo de otra forma?";

    // Guardar mensajes en historial
    if (user) {
      await supabase.from("chat_messages").insert([
        { user_id: user.id, role: "user", content: message },
        { user_id: user.id, role: "assistant", content: text },
      ]);
    }

    return NextResponse.json({ message: text });
  } catch (err) {
    console.error("Error in consejera route:", err);
    return NextResponse.json(
      { error: "Error inesperado. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
