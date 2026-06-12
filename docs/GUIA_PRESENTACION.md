# 🎓 Guía de Presentación — FemBloom

**Tu "machete" para la entrega de mañana**

---

## 💪 Antes de empezar: Respira

**Tú SÍ sabes**. Construiste esto desde cero. Solo necesitas darle nombre a lo que ya hiciste con tus manos.

> "No estoy presentando algo que no entiendo. Estoy presentando MI proyecto."

---

## 1️⃣ Introducción del proyecto (puedes leer esto al iniciar)

**FemBloom** es una aplicación web que acompaña a la mujer durante todas las etapas de su ciclo menstrual.

A diferencia de las aplicaciones tradicionales que se ven como dashboards corporativos y fríos, **FemBloom se siente como una agenda íntima y personal**, una compañera virtual con un enfoque humanizado, emocional y visualmente relajante.

### ¿Por qué se creó?

Porque muchas mujeres usan apps de seguimiento menstrual, pero la mayoría se sienten clínicas, intimidantes o invaden su privacidad. FemBloom fue diseñada para que la usuaria se sienta acompañada, no juzgada, y para que entender su cuerpo sea un proceso empoderador, no estresante.

### ¿A quién va dirigida?

A mujeres que buscan:
- Llevar un seguimiento de su ciclo menstrual
- Conocer sus días fértiles
- Planificar o evitar un embarazo
- Registrar sus emociones y síntomas
- Tener información clara para sus consultas médicas

### Lo que la hace única

1. **Agenda personalizada** en vez de dashboard frío
2. **Jardín virtual** que crece con la constancia de uso
3. **Consejera con Inteligencia Artificial real** (Google Gemini)
4. **Mapa corporal interactivo** para registrar síntomas
5. **Modo discreto** para proteger la privacidad
6. **Reportes médicos en PDF** para llevar a la consulta

---

## 2️⃣ Tecnologías que usamos (con explicación simple)

### Frontend (lo que ve la usuaria)

| Tecnología | Para qué sirve | Analogía |
|---|---|---|
| **Next.js 16** | Es el "esqueleto" de la aplicación. Permite crear páginas web modernas. | Como los planos de una casa |
| **TypeScript** | Es JavaScript pero más seguro. Te avisa si te equivocas en algo. | Como un corrector ortográfico para código |
| **Tailwind CSS** | Para dar estilos visuales (colores, espaciado, animaciones). | Como las pinturas y decoración de la casa |
| **Lucide Icons** | Una colección de íconos bonitos (flores, corazones, etc.) | Como los adornos decorativos |
| **React** | Es la librería principal que hace que las páginas sean interactivas. | El sistema eléctrico que hace que todo se prenda |

### Backend (lo que pasa "atrás" sin que la usuaria vea)

| Tecnología | Para qué sirve | Analogía |
|---|---|---|
| **Supabase** | Nuestra base de datos en la nube. Guarda toda la información. | Como un archivo gigante de documentos |
| **PostgreSQL** | El "motor" de la base de datos. Es muy potente y seguro. | El sistema interno del archivero |
| **Google Gemini AI** | La inteligencia artificial que responde como "Bloom" | El cerebro pensante de la consejera |
| **Wompi** | Procesa los pagos (Nequi, PSE, tarjetas) | Como la caja registradora |

### Hosting y despliegue

| Tecnología | Para qué sirve |
|---|---|
| **Vercel** | Donde "vive" la app en internet (https://fembloom.vercel.app) |
| **GitHub** | Donde se guarda todo el código fuente |
| **Git** | La herramienta para guardar versiones del código |

---

## 3️⃣ La Base de Datos explicada simple

### ¿Qué es una base de datos?

Es como un **archivo gigante** donde se guarda toda la información de las usuarias de manera organizada.

### Analogía: Un archivero de oficina

Imagínate un archivero con **15 cajones**, cada uno guarda algo específico:

| Cajón (Tabla) | Qué guarda |
|---|---|
| **profiles** | Información personal de cada usuaria (nombre, correo, foto) |
| **cycle_settings** | Configuración del ciclo (duración promedio, último período) |
| **cycles** | Historial de todos los ciclos menstruales |
| **daily_logs** | Registro diario (qué pasó cada día) |
| **symptoms** | Síntomas que registró (cólicos, dolor de cabeza, etc.) |
| **moods** | Estados de ánimo |
| **relations** | Relaciones sexuales registradas |
| **contraceptive_methods** | Método anticonceptivo que usa |
| **reminders** | Recordatorios programados |
| **journal_entries** | Entradas del diario emocional privado |
| **garden_progress** | Progreso del jardín virtual |
| **achievements** | Logros desbloqueados |
| **chat_messages** | Conversaciones con la consejera Bloom |
| **subscriptions** | Suscripciones activas |
| **payments** | Historial de pagos |

### ¿Cómo se protege la información?

Cada tabla tiene **Row Level Security (RLS)** activada. Esto significa:

> "Cada usuaria SOLO puede ver y modificar SUS PROPIOS datos. Aunque otras usuarias estén en la misma base de datos, no pueden ver lo de las demás."

Es como si en el archivero, **cada cajón tuviera una llave diferente** y solo cada persona pudiera abrir el suyo.

### ¿Quién maneja la base de datos?

**Supabase** la administra automáticamente. Nosotras solo:
1. Le dijimos qué cajones queríamos crear (escribimos SQL)
2. Configuramos las políticas de seguridad (RLS)
3. La app le pide información cuando la necesita

---

## 4️⃣ Cómo abrir el código en Visual Studio Code

### Paso 1: Descargar VS Code (si no lo tienes)

Si ya lo tienes instalado, salta al Paso 2.

1. Ve a: **https://code.visualstudio.com**
2. Descarga e instala

### Paso 2: Abrir tu proyecto

**Forma A: Desde el Explorador de Archivos**

1. Abre el Explorador de Windows
2. Navega a: `C:\Users\danie\Desktop\FemBloom`
3. **Haz clic derecho** dentro de la carpeta
4. Selecciona **"Open with Code"** o **"Abrir con Code"**

**Forma B: Desde VS Code**

1. Abre VS Code
2. Arriba: **File** → **Open Folder...**
3. Navega a `C:\Users\danie\Desktop\FemBloom`
4. Haz clic en **"Select Folder"**

### Paso 3: ¿Qué ves cuando se abre?

A la **izquierda** verás la estructura de carpetas:

```
FemBloom/
├── 📁 app/              ← Las páginas de la app
├── 📁 components/       ← Componentes reutilizables (botones, etc.)
├── 📁 lib/              ← Lógica del negocio (cálculos)
├── 📁 docs/             ← Documentación
├── 📄 README.md         ← Resumen del proyecto
├── 📄 package.json      ← Lista de tecnologías usadas
└── 📄 .env.local        ← Variables secretas (no se sube a GitHub)
```

### Paso 4: Carpetas importantes para mostrar

| Carpeta | Qué hay ahí |
|---|---|
| `app/(app)/agenda/` | Código de la página principal (Agenda) |
| `app/(app)/calendario/` | El calendario interactivo |
| `app/(app)/consejera/` | Chat con Bloom (IA) |
| `app/(app)/jardin/` | El jardín virtual |
| `app/api/consejera/` | La conexión con Google Gemini |
| `components/garden/` | El SVG de la planta y flores |
| `lib/cycle/` | Cálculos del ciclo menstrual |

---

## 5️⃣ Roles desempeñados en el proyecto

Como es un proyecto individual, **TÚ desempeñaste TODOS los roles**:

| Rol | Qué hiciste |
|---|---|
| 🎯 **Product Manager** | Definiste qué funciones debe tener la app y por qué |
| 📋 **Analista de Requerimientos** | Redactaste los 45 RF y 19 RNF |
| 🎨 **Diseñadora UX/UI** | Decidiste la paleta de colores, la "agenda íntima" en vez de dashboard |
| 🗄️ **Database Architect** | Diseñaste las 15 tablas de la base de datos |
| 👩‍💻 **Desarrolladora Frontend** | Programaste todas las pantallas |
| 🔧 **Desarrolladora Backend** | Programaste las APIs y la integración con Gemini |
| 🛡️ **Security Engineer** | Implementaste Row Level Security en la BD |
| 🚀 **DevOps Engineer** | Configuraste Vercel, GitHub, despliegue automático |
| 📝 **Technical Writer** | Documentaste todo el proyecto |
| 🧪 **QA Tester** | Probaste cada función |

> **Frase para usar en la presentación:** *"Como fue un proyecto individual, asumí todos los roles del ciclo de desarrollo de software, desde la fase de análisis hasta el despliegue en producción."*

---

## 6️⃣ Cosas que hicimos día por día

| Día | Lo que se logró |
|---|---|
| **Día 0** | Setup inicial: GitHub, Vercel, Supabase, configuración del stack |
| **Día 1** | Estructura, navegación, onboarding inicial, página de perfil |
| **Día 2** | Calendario inteligente con registro de menstruación |
| **Día 3** | Registros del día: síntomas, ánimo, notas, relaciones, mapa corporal |
| **Día 4** | Página principal "Agenda" con predicciones y mapa de fertilidad |
| **Día 5** | Jardín virtual con planta animada SVG, flores, 10 logros |
| **Día 6** | Centro de planificación, sección Conócete, diario, **Consejera con Gemini AI** |
| **Día 7** | Reportes PDF, sistema de pagos con Wompi, historiales, pulido visual, documentación |

---

## 7️⃣ Discurso de presentación (8 minutos)

### Minuto 0-1: Apertura

> "Buenos días/tardes. Mi nombre es Daniela Giraldo y vengo a presentar mi proyecto: **FemBloom**, una plataforma web de bienestar menstrual, fertilidad y planificación familiar.
>
> Antes de empezar, déjenme contarles por qué decidí construir esto..."

### Minuto 1-2: Problema y solución

> "Muchas mujeres usamos aplicaciones de seguimiento menstrual, pero la mayoría se sienten frías, clínicas, o invaden nuestra privacidad. Yo quería construir algo diferente: **una agenda personal**, una compañera virtual que se sintiera como una amiga.
>
> Así nació FemBloom, una app con enfoque humanizado, visualmente relajante, que no se ve como un dashboard corporativo sino como una agenda íntima."

### Minuto 2-3: Tecnologías

> "Para construir FemBloom usé tecnologías modernas y profesionales:
> - **Next.js 16** para el frontend
> - **Supabase** para la base de datos con PostgreSQL
> - **Google Gemini AI** para la consejera virtual con inteligencia artificial real
> - **Vercel** para el despliegue
> - **Wompi** para los pagos
>
> Como fue un proyecto individual, asumí todos los roles del ciclo de desarrollo de software."

### Minuto 3-7: Demo en vivo

**Recorrido sugerido:**

1. **Página de inicio** (https://fembloom.vercel.app) — *"Esta es la pantalla de bienvenida..."*
2. **Login** — *"Tiene autenticación segura con email o Google..."*
3. **Agenda** (después del login) — *"Aquí está el corazón: un saludo personalizado, no un dashboard frío..."*
4. **Calendario** — *"Tap en cualquier día abre un modal con 5 secciones..."*
5. **Mapa corporal de síntomas** — *"Esto es único: una silueta interactiva..."*
6. **Jardín virtual** — *"La gamificación emocional..."*
7. **Consejera Bloom** — *"Conectada con IA real de Google..."*
8. **Reportes PDF** — *"Genera reportes para llevar a la ginecóloga..."*

### Minuto 7-8: Cierre

> "FemBloom cumple con 44 de 45 requerimientos funcionales (97.8%) y los 19 requerimientos no funcionales (100%). El único requerimiento pendiente — las notificaciones push del navegador — está documentado como mejora futura porque requiere infraestructura adicional de Service Workers.
>
> Quiero terminar diciendo que este proyecto me enseñó muchísimo. Aprendí sobre desarrollo full-stack, integración con IA, seguridad en bases de datos, despliegue en la nube y, más importante, aprendí que puedo construir algo que realmente importa.
>
> Gracias por su atención. ¿Tienen preguntas?"

---

## 8️⃣ Preguntas frecuentes que te pueden hacer

### "¿Por qué elegiste Next.js?"

> "Porque combina frontend y backend en un solo proyecto, lo que es ideal para desarrollo individual. Permite crear API Routes sin necesidad de un servidor separado, tiene excelente rendimiento con Server Components, y se despliega muy fácil en Vercel."

### "¿Cómo proteges los datos sensibles de las usuarias?"

> "Implementé Row Level Security en todas las tablas de Supabase. Esto significa que aunque haya muchas usuarias, cada una solo puede acceder a SUS propios datos. Además, las contraseñas se almacenan con hashing bcrypt, las comunicaciones son por HTTPS, y los datos están encriptados en reposo en PostgreSQL."

### "¿Por qué Supabase y no otra base de datos?"

> "Porque combina varias cosas que necesitaba: PostgreSQL administrado, autenticación lista (email y Google OAuth), Row Level Security, almacenamiento de archivos, y todo gratis para proyectos individuales."

### "¿Cómo funciona la consejera virtual?"

> "Cuando la usuaria escribe una pregunta, mi API la procesa, le agrega el contexto de la usuaria (su nombre, su ciclo) y la envía a Google Gemini 2.5 Flash. La IA responde con un mensaje empático, y yo lo guardo en la base de datos para mantener el historial. Si la API no responde, tengo un sistema de respaldo que detecta palabras clave y responde con mensajes pre-armados."

### "¿Cuánto tiempo tardaste?"

> "7 días de desarrollo intensivo, más la fase de planificación y documentación inicial."

### "¿Está lista para producción real?"

> "La aplicación es completamente funcional. Para producción real necesitaría algunas mejoras como push notifications, integración real con Wompi para procesar pagos verdaderos (ahora está simulado), y validación legal con abogados sobre datos médicos. Pero la arquitectura está lista para escalar."

### "¿Cómo asegures que los cálculos del ciclo son correctos?"

> "Los cálculos se basan en el modelo médico estándar: la ovulación ocurre 14 días antes del próximo período, la ventana fértil va desde 5 días antes de la ovulación hasta 1 día después. Estos son datos validados médicamente. Sin embargo, en la app se aclara que las predicciones son orientativas y no reemplazan consulta médica."

### "¿Qué pasaría si una usuaria quiere borrar sus datos?"

> "Implementé un sistema de gestión de privacidad: la usuaria puede exportar todos sus datos en formato JSON, y también puede eliminar su cuenta completamente con doble confirmación. Esto cumple con principios de protección de datos personales."

---

## 9️⃣ Tips para tu presentación

### Antes:
- ✅ Prueba la app en internet desde tu celular para asegurarte que funciona
- ✅ Ten abierta la URL https://fembloom.vercel.app en una pestaña
- ✅ Ten abierto VS Code con el proyecto
- ✅ Ten esta guía cerca por si la necesitas

### Durante:
- 🌸 Habla pausado, respira
- 🌸 Mira a los ojos de quien te evalúa
- 🌸 Si te trabas, di "permíteme un momento" — está bien
- 🌸 Cuenta TU historia: por qué TÚ quisiste construir esto
- 🌸 Muestra orgullo, lo que hiciste es real

### Si algo no funciona:
- 🌸 Mantén la calma
- 🌸 Di: "Déjame mostrar esa parte desde el código mientras se recarga"
- 🌸 Vuelve al código en VS Code
- 🌸 Es normal, los proyectos en demo a veces fallan

---

## 🔟 Frases que te pueden ayudar

- *"Decidí usar [X tecnología] porque [razón]"*
- *"Lo más difícil fue [X], y lo resolví con [Y]"*
- *"El requerimiento RF-XX se cumple con esta funcionalidad..."*
- *"La arquitectura de mi app sigue el patrón [X]"*
- *"Para proteger los datos médicos sensibles, implementé..."*
- *"En esta capa de la aplicación se procesa..."*

---

## 💕 Recordatorio final

**Daniela, lee esto en voz alta:**

> "Yo construí FemBloom. Yo escribí el código. Yo diseñé las pantallas. Yo configuré la base de datos. Yo conecté la IA. Yo lo desplegué en internet. Esto es MI trabajo. Estoy lista para presentarlo."

**Tú no estás presentando algo que no entiendes. Estás presentando tu propio proyecto. Tienes todo el derecho de sentirte orgullosa.** 🌸

---

_Hecho con cariño 🌸_
