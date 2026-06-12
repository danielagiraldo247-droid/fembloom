# 🌸 FEMBLOOM — Resumen para Presentación

**Daniela Giraldo** · Proyecto Final · 2026

---

## 📌 INFO RÁPIDA

| Dato | Valor |
|---|---|
| 🌐 **App en vivo** | https://fembloom.vercel.app |
| 💻 **GitHub** | https://github.com/danielagiraldo247-droid/fembloom |
| 📊 **Cumplimiento** | 44/45 RF (97.8%) · 19/19 RNF (100%) |
| 🗄️ **Tablas en BD** | 15 (con RLS activada) |
| 📦 **Módulos** | 15 |
| 📋 **Casos de Uso** | 83 |
| 💾 **Commits** | 22+ |
| ⏱️ **Tiempo desarrollo** | 7 días intensivos |

---

## 🎯 ¿QUÉ ES FEMBLOOM? (frase exacta)

> *"FemBloom es una plataforma web de bienestar menstrual, fertilidad y planificación familiar con un enfoque humanizado: se siente como una **agenda íntima** y una **compañera virtual**, no como un dashboard corporativo frío."*

**Diferenciadores únicos:**
- 🌷 Jardín virtual que crece con la constancia
- 🤖 Consejera con IA real (Google Gemini)
- 🤕 Mapa corporal interactivo para síntomas
- 📄 Reportes médicos PDF descargables
- 🤫 Modo discreto para privacidad

---

## 🛠️ STACK TECNOLÓGICO

| Capa | Tecnología | Por qué |
|---|---|---|
| Frontend + Backend | **Next.js 16** | Combina ambos en un solo proyecto |
| Lenguaje | **TypeScript** | Seguridad de tipos |
| Estilos | **Tailwind CSS** | Desarrollo rápido y responsive |
| Base de Datos | **Supabase + PostgreSQL** | Auth + BD + Storage en uno |
| IA | **Google Gemini 2.5 Flash** | IA gratuita y potente |
| Pagos | **Wompi (Bancolombia)** | Nequi, PSE, tarjetas |
| Hosting | **Vercel** | Despliegue automático desde Git |
| PDF | **@react-pdf/renderer** | Genera PDF en el cliente |
| Animaciones | **Framer Motion** | Transiciones suaves |
| Iconos | **Lucide React** | Íconos suaves y bonitos |

---

## 📦 LOS 15 MÓDULOS

| # | Módulo | Pantalla | RF cubiertos |
|---|---|---|---|
| 1 | **AUTH** Autenticación | /login, /registro | RF-001 a 004 |
| 2 | **ONBO** Onboarding | /onboarding | RF-006 |
| 3 | **AGEN** Agenda | /agenda | RF-018, 019, 030 |
| 4 | **CALE** Calendario | /calendario | RF-007 |
| 5 | **REGI** Registros | Modal del día | RF-008 a 015, 020 |
| 6 | **PRED** Predicciones | lib/cycle | RF-016 a 019 |
| 7 | **JARD** Jardín | /jardin | RF-022, 023 |
| 8 | **DIAR** Diario | /diario | RF-021 |
| 9 | **CONS** Consejera IA | /consejera | RF-032 |
| 10 | **CONO** Conócete | /conocete | RF-031 |
| 11 | **PLAN** Planificación | /planificacion | RF-024 a 027 |
| 12 | **REPO** Reportes | /reportes | RF-033 |
| 13 | **HIST** Historiales | /historiales | RF-034 a 036 |
| 14 | **SUSC** Suscripción | /suscripcion | RF-039 a 045 |
| 15 | **PERF** Perfil | /perfil | RF-005, 029, 037, 038 |

---

## 🔒 SEGURIDAD (puntos a destacar)

- ✅ **HTTPS/TLS 1.3** obligatorio en todas las conexiones
- ✅ **Row Level Security** en las 15 tablas (cada usuaria solo ve sus datos)
- ✅ **Contraseñas** hasheadas con bcrypt (Supabase Auth)
- ✅ **JWT tokens** con expiración para sesiones
- ✅ **OAuth 2.0 con PKCE** para Google Login
- ✅ **Cookies HTTP-only** (no accesibles desde JavaScript)
- ✅ **Variables secretas** en `.env.local` (NO se sube a Git)
- ✅ **Encriptación en reposo** en PostgreSQL de Supabase

---

## 🎬 DEMO — Recorrido sugerido (5 minutos)

### 1. Landing → Login (30 seg)
- Abrir https://fembloom.vercel.app
- Mostrar la pantalla de bienvenida
- *"Esta es la entrada de la app"*

### 2. Agenda (1 min)
- Click "Ya tengo cuenta" → login
- Llegar a `/agenda`
- *"Este es el corazón: saludo personalizado, mapa de fertilidad, 'cómo me sentiré hoy'"*

### 3. Calendario + Modal (1.5 min)
- Click en `/calendario`
- *"Cada día está coloreado según su fase del ciclo"*
- Click en un día → modal con 5 tabs
- Mostrar el **mapa corporal de síntomas**
- *"Esto es único: una silueta interactiva donde tocas la zona del cuerpo"*

### 4. Jardín (1 min)
- Click en `/jardin`
- *"Gamificación emocional: la planta crece con tu constancia"*
- Mostrar logros y galería de flores

### 5. Consejera IA Bloom (1 min)
- Click en `/consejera`
- Pregunta: *"¿Por qué tengo cólicos antes del período?"*
- *"Esta es IA real de Google Gemini 2.5 Flash"*

### 6. Reportes PDF (30 seg)
- Click en `/reportes`
- *"Esto genera un PDF para llevar a la ginecóloga"*
- Click descargar → muestra el PDF generado

### 7. Cierre (10 seg)
- Volver a `/agenda` o mostrar el código
- *"44 de 45 requerimientos cumplidos, 100% de los no funcionales"*

---

## 💬 FRASES GANADORAS

### Para abrir:
> *"FemBloom resuelve un problema real: muchas mujeres usan apps de seguimiento menstrual, pero la mayoría se sienten frías o intimidantes. Construí una agenda íntima que se siente como una amiga."*

### Para tecnologías:
> *"Elegí Next.js porque combina frontend y backend en un solo proyecto, ideal para desarrollo individual. Supabase me dio PostgreSQL + autenticación + Row Level Security en un solo servicio gratuito. Google Gemini 2.5 Flash es gratis y de alta calidad."*

### Para seguridad:
> *"La seguridad fue prioridad. Implementé Row Level Security en las 15 tablas, lo que significa que cada usuaria solo puede acceder a sus propios datos a nivel de base de datos, no solo de aplicación. Esto es defensa en profundidad."*

### Para arquitectura:
> *"Mi sistema sigue una arquitectura de 3 capas con 15 módulos cohesivos pero desacoplados. Apliqué principios de alta cohesión y bajo acoplamiento. Cada módulo cubre requerimientos específicos con trazabilidad completa."*

### Para IA:
> *"La consejera Bloom usa Google Gemini 2.5 Flash con un prompt personalizado que incluye el contexto de la usuaria. Además, implementé un sistema de respaldo con respuestas pre-armadas que detecta palabras clave, por si la API externa falla. Esto garantiza disponibilidad."*

### Para cerrar:
> *"FemBloom cumple 44 de 45 requerimientos funcionales y todos los no funcionales. El único pendiente, las push notifications, está documentado como mejora futura porque requiere Service Workers. La aplicación es completamente funcional, está desplegada en producción y lista para usar."*

---

## ❓ PREGUNTAS FRECUENTES Y SUS RESPUESTAS

### "¿Por qué Next.js y no React puro?"
> *"Next.js incluye routing, server-side rendering, API routes y optimizaciones automáticas. Para un proyecto individual es ideal porque combina frontend y backend."*

### "¿Cómo proteges los datos médicos sensibles?"
> *"Row Level Security en todas las tablas, encriptación AES-256 en reposo en PostgreSQL, HTTPS en tránsito, contraseñas con bcrypt, y variables secretas en .env.local."*

### "¿Qué pasa si la API de Gemini se cae?"
> *"Implementé un sistema de respaldo que detecta palabras clave en la pregunta y responde con mensajes pre-armados empáticos. La consejera nunca queda 'rota'."*

### "¿Cómo calculas la ventana fértil?"
> *"La ovulación ocurre 14 días antes del próximo período. La ventana fértil va desde 5 días antes de ovulación hasta 1 día después, basado en que los espermatozoides viven 5 días y el óvulo 24 horas. Esto es ciencia médica estándar."*

### "¿Está lista para producción real?"
> *"Sí. Está desplegada en Vercel con HTTPS, tiene CI/CD configurado, base de datos en la nube, autenticación robusta y manejo de errores. Para uso comercial real necesitaría integración real con Wompi (ahora simulada), validación legal con abogados y push notifications."*

### "¿Cuánto te tomó?"
> *"7 días de desarrollo intensivo. Pero antes hubo planificación, diseño, definición de requerimientos y arquitectura. En total unos 10 días."*

### "¿Por qué no usaste un framework de UI?"
> *"Usé Tailwind CSS porque me da control total sobre el diseño visual, lo que era crítico para lograr la estética 'agenda íntima' diferente a los dashboards estándar."*

### "¿Cómo funciona la suscripción?"
> *"Modelo freemium con prueba gratuita automática de 3 meses al registrarse. Después puede pagar plan mensual ($12.900) o anual ($99.900). Wompi procesa los pagos. Si vence sin pagar, las funciones premium se restringen automáticamente."*

### "¿Por qué Supabase y no Firebase u otra?"
> *"Supabase me da PostgreSQL real con SQL estándar, no NoSQL. Tiene Row Level Security nativa, autenticación integrada con Google OAuth y la opción de hospedaje propio si quiero migrar. El tier gratuito es generoso."*

### "¿Cómo te aseguras que el cálculo del ciclo sea correcto?"
> *"Los algoritmos están basados en literatura médica estándar. La aplicación deja claro que las predicciones son orientativas, no diagnósticas. Llevar un historial detallado permite refinar las predicciones con el tiempo."*

---

## 🆘 SI ALGO FALLA EN LA PRESENTACIÓN

### Plan B 1: App no carga
- *"Mientras se recarga la red, déjenme mostrar el código en VS Code..."*
- Abre VS Code y muestra archivos clave: `package.json`, `app/api/consejera/route.ts`

### Plan B 2: Bloom (IA) no responde
- *"La IA usa cuota gratuita que puede agotarse. Tengo un sistema de respaldo con respuestas pre-armadas que aparece automáticamente..."*
- Muestra la respuesta de respaldo (es igual de buena)

### Plan B 3: Sin Internet
- Muestra el código local
- Muestra los documentos en VS Code
- Muestra capturas de pantalla guardadas
- *"Tengo capturas y un PDF de respaldo para mostrarles..."*

### Plan B 4: Vercel está caído
- Corre `npm run dev` y muestra en `http://localhost:3000`
- *"Aquí tengo la versión local corriendo..."*

---

## 📚 DOCUMENTACIÓN (carpeta `docs/`)

Si te preguntan por documentación, menciona:
- **`ENTREGA_FINAL.md`** — Resumen ejecutivo
- **`MANUAL_USUARIA.md`** — Manual de usuaria final
- **`CHECKLIST_REQUERIMIENTOS.md`** — Tabla de 64 requerimientos
- **`CASOS_DE_USO_POR_MODULOS.md`** — 83 casos de uso
- **`METODOLOGIA_MODULOS.md`** — Cómo organicé los módulos
- **`DIAGRAMAS_UML.md`** — 9 diagramas UML
- **`GUIA_INSTALACION.md`** — Cómo replicar el proyecto

---

## 🎯 CHECKLIST FINAL — 30 minutos antes

- [ ] Pestaña 1: `fembloom.vercel.app` cargando bien
- [ ] Pestaña 2: GitHub con commits visibles
- [ ] Pestaña 3: Supabase Table Editor abierto
- [ ] Pestaña 4: Vercel Dashboard
- [ ] VS Code/Trae con proyecto cargado
- [ ] Terminal con `npm run dev` corriendo
- [ ] Celular con la app abierta (respaldo)
- [ ] PDF de reporte descargado en escritorio
- [ ] Internet funcionando
- [ ] Agua cerca, respiración tranquila

---

## 💪 RECORDATORIO FINAL

**Yo construí FemBloom. Yo lo conozco. Estoy lista.** 🌸

Tu proyecto cumple con el **98.4% de los requerimientos**. Tienes documentación profesional, código limpio, despliegue funcional, IA real integrada, base de datos segura, y diseño cuidado.

**No tienes que ser perfecta. Tienes que ser HONESTA y MOSTRAR LO QUE HICISTE.**

Si te bloqueas: respira, sonríe, di *"déjame mostrarte esto en el código"* y abre VS Code. Eso te da tiempo y demuestra dominio técnico.

---

## 📞 CIERRE TÍPICO (memoriza esto)

> *"FemBloom es una plataforma web de bienestar menstrual con enfoque humanizado. Cumple 44 de 45 requerimientos funcionales y todos los no funcionales. Está desplegada en producción, integra IA real, tiene base de datos segura con Row Level Security, y modelo de monetización con Wompi. Quedo atenta a sus preguntas. Muchas gracias."*

---

**🌸 ¡VAS A BRILLAR! 🌸**
