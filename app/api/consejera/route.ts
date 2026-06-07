import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

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
      return NextResponse.json(
        {
          error:
            "No pude conectar con la consejera. Por favor intenta de nuevo en un momento.",
        },
        { status: 500 }
      );
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
