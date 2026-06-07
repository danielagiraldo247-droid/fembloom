export interface Article {
  slug: string;
  title: string;
  emoji: string;
  category: "ciclo" | "fertilidad" | "anticonceptivos" | "bienestar";
  readTime: string;
  excerpt: string;
  content: string;
}

export const CATEGORY_LABELS = {
  ciclo: "Ciclo menstrual",
  fertilidad: "Fertilidad",
  anticonceptivos: "Anticonceptivos",
  bienestar: "Bienestar emocional",
};

export const ARTICLES: Article[] = [
  {
    slug: "que-es-mi-ciclo",
    title: "¿Qué está pasando en mi cuerpo?",
    emoji: "🌸",
    category: "ciclo",
    readTime: "3 min",
    excerpt: "Un viaje por las 4 fases de tu ciclo menstrual.",
    content: `Tu ciclo menstrual es un proceso natural que tu cuerpo realiza aproximadamente cada 28 días (aunque puede variar entre 21 y 45 días, y todo eso es normal).

## Las 4 fases de tu ciclo

**Fase 1: Menstruación (días 1-5)**
Tu útero libera su revestimiento porque no hubo embarazo. Es normal sentir cólicos, cansancio y emociones más sensibles.

**Fase 2: Folicular (días 6-13)**
Tus ovarios preparan un óvulo. La energía sube, te sientes más creativa y sociable.

**Fase 3: Ovulación (día 14 aprox.)**
El óvulo es liberado. Es tu momento de máxima fertilidad. Te sientes radiante.

**Fase 4: Lútea (días 15-28)**
Tu cuerpo se prepara para un posible embarazo. Si no ocurre, comienza un nuevo ciclo.

Cada cuerpo es único. Escucha el tuyo. 🌷`,
  },
  {
    slug: "que-es-la-ovulacion",
    title: "¿Qué es la ovulación?",
    emoji: "✨",
    category: "fertilidad",
    readTime: "2 min",
    excerpt: "Tu día más fértil del mes y por qué es tan especial.",
    content: `La ovulación es el momento en que tu ovario libera un óvulo, listo para ser fecundado.

## ¿Cuándo ocurre?

Aproximadamente **14 días antes** del próximo período menstrual. Si tu ciclo es de 28 días, la ovulación ocurre el día 14. Si es de 30 días, el día 16.

## ¿Cómo sabes que estás ovulando?

- Aumento del flujo cervical (como clara de huevo)
- Ligero dolor en un costado del abdomen
- Aumento de la libido
- Mayor energía y sociabilidad
- Sensibilidad pectoral

## ¿Por cuánto tiempo eres fértil?

El óvulo vive 12-24 horas, pero los espermatozoides pueden vivir hasta 5 días en tu cuerpo. Por eso tu **ventana fértil dura unos 6-7 días** (5 antes + el día + 1 después).

FemBloom calcula esto automáticamente por ti 🌸`,
  },
  {
    slug: "ventana-fertil",
    title: "¿Qué es la ventana fértil?",
    emoji: "🌷",
    category: "fertilidad",
    readTime: "2 min",
    excerpt: "Los días con mayor probabilidad de embarazo.",
    content: `Tu ventana fértil son los días en los que puedes quedar embarazada si tienes relaciones sin protección.

## ¿Cuántos días dura?

Aproximadamente **6-7 días** por ciclo:
- 5 días antes de la ovulación
- El día de la ovulación
- 1 día después

## ¿Por qué tantos días si solo ovulas un día?

Porque los **espermatozoides pueden vivir hasta 5 días** en el cuerpo. Si tienes relaciones 5 días antes de ovular, podrías quedar embarazada cuando ovules.

## Cómo aprovecharla

**Si buscas embarazo:** son tus días clave. Tener relaciones cada 2 días dentro de esta ventana aumenta tus probabilidades.

**Si quieres evitarlo:** usa protección durante toda esta ventana o evita relaciones esos días.

FemBloom resalta tu ventana fértil en el calendario y en tu agenda diaria 🌸`,
  },
  {
    slug: "sindrome-premenstrual",
    title: "¿Qué es el síndrome premenstrual?",
    emoji: "🍂",
    category: "ciclo",
    readTime: "3 min",
    excerpt: "Cambios físicos y emocionales antes de tu período.",
    content: `El **síndrome premenstrual (SPM)** son los cambios físicos y emocionales que muchas mujeres experimentamos los días previos al período.

## Síntomas comunes

**Físicos:**
- Hinchazón abdominal
- Sensibilidad pectoral
- Dolores de cabeza
- Fatiga
- Antojos de dulces o salados
- Acné

**Emocionales:**
- Irritabilidad
- Ansiedad
- Tristeza
- Cambios de humor
- Sensación de "estar al límite"

## ¿Por qué pasa?

Tus hormonas (estrógeno y progesterona) caen drásticamente justo antes de la menstruación. Eso afecta neurotransmisores como la serotonina.

## ¿Qué ayuda?

- Dormir bien
- Reducir cafeína y azúcar
- Ejercicio suave
- Té de manzanilla o jengibre
- Magnesio (consulta a tu médica)
- Aceptar tus emociones sin juzgarte

Si los síntomas afectan mucho tu vida diaria, consulta a una profesional. Existe el TDPM (Trastorno Disfórico Premenstrual) que necesita atención específica 💕`,
  },
  {
    slug: "como-funciona-pastilla",
    title: "¿Cómo funcionan las pastillas anticonceptivas?",
    emoji: "💊",
    category: "anticonceptivos",
    readTime: "3 min",
    excerpt: "Tu compañera diaria para prevenir el embarazo.",
    content: `Las pastillas anticonceptivas son uno de los métodos más usados. Tienen una efectividad del **91-99%** cuando se toman correctamente.

## ¿Cómo funcionan?

Contienen hormonas (estrógeno y/o progesterona) que:
1. **Evitan la ovulación** (tu ovario no libera óvulo)
2. **Espesan el flujo cervical** (dificulta el paso de espermatozoides)
3. **Adelgazan el endometrio** (dificulta la implantación)

## Cómo tomarlas

- **Una pastilla al día** a la misma hora
- Comenzar el primer día del período o cuando te indique tu médica
- Hay pastillas de 21 días (con 7 de descanso) o de 28 días (con 7 placebo)

## ¿Qué pasa si me olvido?

- **Menos de 12 horas:** tómala apenas recuerdes
- **Más de 12 horas:** tómala pero usa protección adicional por 7 días
- **Más de 2 olvidos seguidos:** consulta a tu médica

## Recordatorio

FemBloom te puede enviar un **recordatorio diario** a la hora que prefieras. Configúralo en Planificación → Pastillas 🌸`,
  },
  {
    slug: "como-funciona-diu",
    title: "¿Cómo funciona el DIU?",
    emoji: "🧷",
    category: "anticonceptivos",
    readTime: "3 min",
    excerpt: "El método de larga duración explicado simple.",
    content: `El **DIU (Dispositivo Intrauterino)** es un pequeño dispositivo que se coloca dentro del útero. Tiene una efectividad del **99%**.

## Tipos de DIU

**1. DIU de cobre (no hormonal)**
- Dura 5-10 años
- El cobre afecta a los espermatozoides
- Puede aumentar el sangrado y los cólicos

**2. DIU hormonal (Mirena, Kyleena, etc.)**
- Dura 3-7 años según el tipo
- Libera progesterona local
- Puede reducir o eliminar el período

## ¿Cómo se coloca?

Lo coloca tu ginecóloga en consulta. Es rápido (5-10 minutos) pero puede ser incómodo. Algunas mujeres sienten dolor; otras, casi nada.

## Cuidados después

- Revisar los hilos cada mes
- Cita de control al mes y a los 6 meses
- Avisar a tu médica si tienes sangrado abundante, dolor fuerte o fiebre

El DIU es **reversible**: una vez retirado, tu fertilidad vuelve rápidamente 🌷`,
  },
  {
    slug: "como-funciona-implante",
    title: "¿Cómo funciona el implante?",
    emoji: "💎",
    category: "anticonceptivos",
    readTime: "2 min",
    excerpt: "Una sola colocación, años de protección.",
    content: `El **implante subdérmico** es una pequeña varilla flexible que se coloca debajo de la piel del brazo. Tiene una efectividad del **99%**.

## ¿Cuánto dura?

Según el tipo:
- **Implanon, Nexplanon:** 3 años
- **Jadelle:** 5 años (son 2 varillas)

## ¿Cómo funciona?

Libera **progesterona** que:
- Evita la ovulación
- Espesa el flujo cervical

## Colocación

- Procedimiento simple en consulta (10-15 minutos)
- Anestesia local en el brazo
- Sin puntos
- Puedes volver a tus actividades normales

## Efectos secundarios comunes

- Cambios en el sangrado (puede desaparecer o ser irregular)
- Acné en algunos casos
- Sensibilidad en el brazo los primeros días

El implante es discreto y muy efectivo. Si te lo retiras, tu fertilidad vuelve en pocas semanas 🌸`,
  },
  {
    slug: "metodos-naturales",
    title: "¿Funcionan los métodos naturales?",
    emoji: "🌿",
    category: "anticonceptivos",
    readTime: "3 min",
    excerpt: "Cuándo sí y cuándo no son una opción confiable.",
    content: `Los **métodos naturales** se basan en identificar tus días fértiles para evitar relaciones sin protección esos días.

## Tipos principales

**1. Calendario o ritmo**
Calcula tus días fértiles basándote en la duración de tus ciclos.
- Efectividad: 75-87%

**2. Temperatura basal**
Mides tu temperatura cada mañana antes de levantarte. Sube ligeramente después de ovular.
- Efectividad: 76-99%

**3. Moco cervical (Billings)**
Observas los cambios en tu flujo vaginal.
- Efectividad: 78-99%

**4. Sintotérmico**
Combinación de temperatura + moco + síntomas.
- Efectividad: 76-99%

## ¿Para quién son?

✅ Si tienes ciclos regulares
✅ Si puedes ser disciplinada con el seguimiento diario
✅ Si tu pareja coopera

❌ Si tus ciclos son irregulares
❌ Si no quieres correr riesgo de embarazo bajo ningún concepto
❌ Recién después del parto o lactancia

## La importancia del seguimiento

Si usas métodos naturales, FemBloom te ayuda enormemente con el cálculo de tu ventana fértil 🌷`,
  },
  {
    slug: "dolor-menstrual",
    title: "¿Por qué tengo cólicos menstruales?",
    emoji: "🤕",
    category: "ciclo",
    readTime: "3 min",
    excerpt: "Causas y qué hacer cuando duele mucho.",
    content: `Los **cólicos menstruales** (dismenorrea) son uno de los síntomas más comunes durante la menstruación.

## ¿Por qué pasa?

Tu útero se contrae para expulsar el revestimiento que no necesita. Estas contracciones causan dolor.

Hay sustancias llamadas **prostaglandinas** que aumentan estas contracciones. Cuanto más prostaglandinas, más dolor.

## Qué ayuda a aliviarlo

**Calor:**
- Bolsa de agua caliente sobre el abdomen
- Baño tibio
- Té caliente de manzanilla o jengibre

**Movimiento:**
- Yoga o estiramientos suaves
- Caminatas
- Algunas posturas específicas (postura del niño)

**Alimentación:**
- Reducir cafeína y azúcar
- Aumentar magnesio (chocolate oscuro, semillas)
- Más agua

**Analgésicos:**
- Ibuprofeno o naproxeno (consulta dosis con tu médica)

## Cuándo consultar

Si el dolor es muy fuerte, interfiere con tu vida diaria o no mejora con analgésicos comunes, podría ser **endometriosis** u otra condición. **Consulta a una ginecóloga** 💕`,
  },
  {
    slug: "ciclos-irregulares",
    title: "¿Es normal tener ciclos irregulares?",
    emoji: "🌀",
    category: "ciclo",
    readTime: "2 min",
    excerpt: "Cuándo preocuparse y cuándo no.",
    content: `Un ciclo se considera **normal** si dura entre **21 y 45 días**. Más corto o más largo se considera irregular.

## Razones comunes de irregularidad

**Normales:**
- Adolescencia (los primeros años)
- Perimenopausia (40+)
- Estrés intenso
- Cambios de peso
- Ejercicio extremo
- Viajes con cambio de zona horaria

**Que requieren consulta:**
- Síndrome de ovario poliquístico (SOP)
- Problemas tiroideos
- Endometriosis
- Pólipos uterinos

## Señales de alerta 🚨

Consulta a tu médica si:
- No tienes período por más de 3 meses sin estar embarazada
- Tienes sangrado entre períodos
- Tus períodos duran más de 7 días
- El sangrado es muy abundante (cambias compresa cada hora)
- Sientes dolor muy fuerte

## ¿Cómo ayuda FemBloom?

Llevar registro detallado en FemBloom te permite **detectar patrones** y compartir un reporte completo con tu médica 🌸`,
  },
  {
    slug: "alimentacion-ciclo",
    title: "Alimentación según tu fase del ciclo",
    emoji: "🥗",
    category: "bienestar",
    readTime: "3 min",
    excerpt: "Comer en sintonía con tu cuerpo.",
    content: `Cada fase de tu ciclo tiene necesidades nutricionales distintas. Comer en sintonía con tu cuerpo te ayuda a sentirte mejor.

## Fase menstrual (días 1-5)

Tu cuerpo pierde hierro y energía. Necesitas:
- **Hierro:** carne roja, lentejas, espinacas
- **Vitamina C:** ayuda a absorber hierro (cítricos, fresas)
- **Magnesio:** chocolate oscuro, almendras (alivia cólicos)
- **Hidratación:** agua, infusiones tibias

## Fase folicular (días 6-13)

Tu energía sube. Aprovecha para:
- **Proteínas magras:** pollo, pescado, huevos
- **Verduras de hoja verde:** energía sostenida
- **Granos enteros:** arroz integral, avena
- **Probióticos:** yogur, kéfir

## Fase ovulatoria (días 12-16)

Te sientes radiante. Comida ligera:
- **Frutas frescas y verduras crudas**
- **Pescado azul:** omega-3 (salmón, sardinas)
- **Antioxidantes:** bayas, granada, té verde
- **Semillas:** lino, chía (apoyo hormonal)

## Fase lútea (días 17-28)

Antojos y hambre aumentan. Necesitas:
- **Carbohidratos complejos:** quinoa, batata (estabiliza ánimo)
- **Proteínas en cada comida:** sacian más
- **Vitamina B6:** plátano, atún (reduce SPM)
- **Reducir sal y cafeína** (menos hinchazón)

Escucha tu cuerpo. No te castigues por antojos: son señales 🌸`,
  },
  {
    slug: "ejercicio-ciclo",
    title: "Ejercicio según tu fase del ciclo",
    emoji: "🧘",
    category: "bienestar",
    readTime: "2 min",
    excerpt: "Cómo entrenar en armonía con tus hormonas.",
    content: `Tu rendimiento físico cambia según la fase de tu ciclo. Entrenar en armonía con tus hormonas te dará mejores resultados.

## Fase menstrual (días 1-5)
**Energía baja**

Ideal:
- Yoga restaurativo
- Caminatas suaves
- Estiramientos
- Pilates suave

Evita: entrenamientos muy intensos.

## Fase folicular (días 6-13)
**Energía subiendo**

Ideal:
- Cardio (correr, bici, baile)
- Entrenamiento con pesas
- Clases grupales
- Nuevas disciplinas (es buen momento para aprender)

## Fase ovulatoria (días 12-16)
**Energía máxima**

Ideal:
- HIIT (alta intensidad)
- Carreras
- Crossfit
- Tus rutinas más intensas

Estás en tu mejor momento físico. Aprovecha.

## Fase lútea (días 17-28)
**Energía bajando**

Ideal:
- Yoga vinyasa
- Pilates
- Pesas con peso moderado
- Trekking, natación

Evita: máxima intensidad al final de esta fase.

## Recordatorio

Cada cuerpo es único. **Si un día no quieres entrenar, no entrenes**. El descanso también es parte del bienestar 💕`,
  },
  {
    slug: "salud-emocional",
    title: "Cuidando tu salud emocional",
    emoji: "💆",
    category: "bienestar",
    readTime: "3 min",
    excerpt: "Tu ciclo influye en tus emociones. Es normal.",
    content: `Las hormonas que regulan tu ciclo también influyen en tu cerebro y emociones. **No estás "exagerando"**: es ciencia.

## Cómo cambian tus emociones

**Menstrual:** Más sensibilidad, introspección, ganas de estar en casa.

**Folicular:** Energía mental, ganas de socializar, claridad.

**Ovulación:** Confianza alta, comunicación fluida, atractiva.

**Lútea:** Sensibilidad emocional, irritabilidad, autocrítica.

## Lo que ayuda

**1. Aceptar tus emociones**
No las juzgues. "Estoy sensible y está bien."

**2. Comunicar tus necesidades**
"Hoy necesito tiempo a solas" es una frase válida.

**3. Cuidar tu sueño**
8 horas no son negociables, especialmente en lútea.

**4. Reducir estresores**
No tomes decisiones importantes los días más sensibles.

**5. Diario emocional**
Escribir tus emociones las procesa. FemBloom tiene un diario privado para ti.

**6. Conexión**
Con amigas, naturaleza, mascotas, lo que sea que te llene.

**7. Profesional si lo necesitas**
La terapia no es solo para crisis. Es autocuidado 🌷

## Cuándo consultar

Si te sientes muy triste, ansiosa o con poca esperanza por más de 2 semanas, busca ayuda profesional. **Pedir ayuda es valentía**, no debilidad 💕`,
  },
  {
    slug: "salud-sexual",
    title: "Salud sexual: lo que necesitas saber",
    emoji: "💕",
    category: "bienestar",
    readTime: "3 min",
    excerpt: "Información clave para una vida sexual saludable.",
    content: `La salud sexual es una parte importante de tu bienestar general. Tener información clara es empoderante.

## Lo básico

**Tu cuerpo es tuyo.** Tienes derecho a:
- Decir sí cuando quieras
- Decir no cuando no quieras
- Cambiar de opinión a mitad de camino
- Conocer tu cuerpo y disfrutarlo

## Consentimiento

El consentimiento debe ser:
- **Entusiasta** (no es "bueno, dale")
- **Informado** (sabes qué va a pasar)
- **Específico** (sí a una cosa no es sí a todo)
- **Reversible** (puedes cambiar de opinión)
- **Consciente** (no bajo influencia)

## Protección dual

Los métodos anticonceptivos hormonales (pastilla, DIU, implante) NO protegen contra ITS.

**Solo el preservativo** protege contra infecciones de transmisión sexual.

Si tienes pareja nueva o relaciones casuales: usa preservativo + tu método anticonceptivo si quieres protección total.

## Chequeos importantes

Cada año (mínimo):
- Examen ginecológico
- Citología (Papanicolaou)
- Test de ITS si tienes nuevas parejas

## Después del sexo

- Ir al baño a orinar (reduce infecciones urinarias)
- Lavarte con agua tibia (no jabón fuerte en zona íntima)
- Estar atenta a cambios (flujo, dolor, picor)

## Disfrutar es válido

Tu placer es importante. Mereces relaciones donde te sientas segura, respetada y satisfecha 💕`,
  },
  {
    slug: "embarazo-temprano",
    title: "¿Cómo saber si estoy embarazada?",
    emoji: "🤰",
    category: "fertilidad",
    readTime: "2 min",
    excerpt: "Señales tempranas y cuándo hacer test.",
    content: `Si tuviste relaciones sin protección durante tu ventana fértil y tu período se atrasa, podrías estar embarazada.

## Señales tempranas (primeras semanas)

**Las más comunes:**
- Falta de menstruación (la principal)
- Senos hinchados y sensibles
- Cansancio extremo
- Náuseas (con o sin vómito)
- Orinar más de lo normal
- Cambios de humor intensos
- Antojos o aversiones a comidas
- Manchado leve (implantación)

## ¿Cuándo hacer test de embarazo?

**Test de orina:**
- A partir del primer día de retraso menstrual
- Mejor con la primera orina de la mañana (más concentrada)
- Los más sensibles pueden detectar 7-10 días post-concepción

**Test de sangre (en laboratorio):**
- Más sensible y temprano
- Mide niveles exactos de hCG
- Indica edad gestacional aproximada

## Si el test sale positivo

1. **Respira.** Es una noticia grande, sea cual sea tu reacción.
2. Confirma con test de sangre.
3. **Agenda consulta** con ginecóloga lo antes posible.
4. Empieza a tomar **ácido fólico** (400 mcg/día).
5. Evita alcohol, cigarrillo y medicamentos sin consultar.

## Si el test sale negativo pero no llega tu período

Espera 1 semana y repite. Si sigue sin llegar, consulta. Hay muchas causas de retrasos (estrés, cambios de peso, ovarios poliquísticos).

Sea cual sea el resultado, **no estás sola**. Hay apoyo para todas las decisiones 💕`,
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return ARTICLES.filter((a) => a.category === category);
}
