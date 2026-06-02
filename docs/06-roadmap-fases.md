# 06 - Roadmap por Fases

Plan de desarrollo para FemBloom organizado por fases, priorizando lo que da resultado visible primero.

## Estrategia

**Construir en capas visibles:** primero algo que se vea funcionando, después se añade lógica. Esto evita bloqueos largos sin ver progreso.

**Orden de prioridad:**
1. Autenticación + base (prueba que la app funciona)
2. Calendario + registros (corazón funcional)
3. Jardín + agenda (lo que la hace especial)
4. Predicciones + recordatorios (lo inteligente)
5. IA + PDF + pagos (lo premium)
6. Pulido visual final

---

## FASE 0 — Preparación (1 día)

| Tarea | Acción |
|---|---|
| Cuenta Supabase | supabase.com → proyecto "fembloom" |
| Cuenta Vercel | vercel.com → conectar con GitHub |
| Google AI Studio | aistudio.google.com → obtener API key Gemini |
| Node.js 20+ | Instalar desde nodejs.org |
| Crear proyecto Next.js | `npx create-next-app@latest fembloom` |
| Subir a GitHub | Repo privado |

---

## FASE 1 — Fundación visual y autenticación (3-4 días)

**Meta:** registrarse, iniciar sesión y ver una página principal vacía bonita.

| Módulo | Construir |
|---|---|
| Paleta de colores | Configurar en Tailwind |
| Tipografías | Google Fonts: Quicksand + Caveat |
| Layout base | Header suave + navegación inferior |
| Pantalla bienvenida | Login/Registro cálido |
| Auth con Supabase | Email/contraseña + Google |
| Página principal vacía | Saludo "Hola [nombre]" |

**Aprendes:** Next.js App Router, Tailwind, Supabase Auth.

**Requerimientos cubiertos:** RF-001, RF-002, RF-003, RF-004

---

## FASE 2 — Calendario inteligente (5-7 días)

**Meta:** registrar cualquier dato y verlo en un calendario bonito.

| Módulo | Construir |
|---|---|
| Modelo de datos | Tablas: users, cycles, daily_logs, symptoms, moods, relations |
| Vista de calendario | Componente mensual (react-day-picker custom) |
| Onboarding | Último período, duración promedio, objetivo |
| Registro menstruación | Tap día + intensidad (4 niveles con gotas) |
| Registro síntomas | Lista con íconos suaves |
| Registro ánimo | 8 emojis pasteles |
| Registro notas | Texto libre 500 chars |
| Registro relaciones | Modal: fecha, hora, protección, observación |
| Vista detalle día | Resumen al tocar día |

**Aprendes:** modelado de datos, formularios, queries Supabase.

**Requerimientos cubiertos:** RF-005, RF-006, RF-007, RF-008, RF-009, RF-010, RF-011, RF-012, RF-013, RF-014, RF-015

---

## FASE 3 — Predicciones y agenda principal (4-5 días)

**Meta:** que la app se sienta inteligente.

| Módulo | Construir |
|---|---|
| Cálculo de fases | Función: fase + día actual del ciclo |
| Predicción menstruación | Promedio de ciclos pasados |
| Predicción ovulación + fértil | Basado en duración |
| Probabilidad embarazo | 3 niveles según fase + relaciones |
| Marcado en calendario | Colores suaves por fase |
| Página principal Agenda | Saludo personalizado completo |
| Mapa de fertilidad | Línea SVG suave |

**Aprendes:** lógica de fechas, SVG simple, componentes dinámicos.

**Requerimientos cubiertos:** RF-016, RF-017, RF-018, RF-019

---

## FASE 4 — Jardín virtual (3-4 días)

**Meta:** la característica diferenciadora visual.

| Módulo | Construir |
|---|---|
| Diseño 5 flores SVG | Acuarela minimalista pastel |
| Sistema de progreso | Tabla garden_progress |
| Niveles de planta | Semilla → brote → tallo → botón → flor |
| Animaciones | Framer Motion |
| Página Mi Jardín | Galería + planta creciendo |
| Mensajes motivadores | Al subir de nivel |

**Aprendes:** SVG, Framer Motion, gamificación.

**Requerimientos cubiertos:** RF-022, RF-023

---

## FASE 5 — Bienestar emocional y educación (3-4 días)

| Módulo | Construir |
|---|---|
| Diario privado | Vista tipo cuaderno por día |
| Mapa corporal | SVG femenino con zonas tappeables |
| Modo "Cómo me sentiré" | Mensaje diario según fase |
| Sección Conócete | 15-20 artículos en markdown |
| Sistema de logros | 10 logros |

**Aprendes:** SVG interactivo, contenido estático.

**Requerimientos cubiertos:** RF-020, RF-021, RF-030, RF-031, RF-034, RF-035, RF-036

---

## FASE 6 — Planificación familiar (3-4 días)

| Módulo | Construir |
|---|---|
| Configuración método | 6 opciones ilustradas |
| Datos específicos | Por tipo de método |
| Recordatorios automáticos | Tabla reminders |
| Centro planificación | Selector de objetivo |

**Aprendes:** lógica condicional, fechas calculadas.

**Requerimientos cubiertos:** RF-024, RF-025, RF-026, RF-027

---

## FASE 7 — Notificaciones y modo discreto (2-3 días)

| Módulo | Construir |
|---|---|
| PWA setup | App instalable |
| Service Worker | Para push |
| Notificaciones inteligentes | Eventos del ciclo |
| Modo discreto | "Tienes una actividad pendiente" |
| Centro de notificaciones | Historial en app |

**Aprendes:** PWA, Service Workers, Web Push.

**Requerimientos cubiertos:** RF-028, RF-029

---

## FASE 8 — Consejera virtual con Gemini (2 días)

| Módulo | Construir |
|---|---|
| API Route | /api/consejera → Gemini |
| Prompt del sistema | Personalidad empática |
| Interfaz chat | Burbujas suaves |
| Contexto del ciclo | Pasar fase actual al modelo |
| Historial | Guardado en Supabase |

**Aprendes:** APIs externas, prompting, streaming.

**Requerimientos cubiertos:** RF-032

---

## FASE 9 — Reporte médico PDF (2 días)

| Módulo | Construir |
|---|---|
| Selector de rango | 1m, 3m, 6m, personalizado |
| Plantilla PDF | React-PDF con secciones |
| Botón descarga | Generación y descarga |

**Aprendes:** React-PDF, generación de documentos.

**Requerimientos cubiertos:** RF-033

---

## FASE 10 — Suscripción y pagos (2-3 días)

| Módulo | Construir |
|---|---|
| Activación prueba 3 meses | `trial_ends_at = now() + 3 months` |
| Restricción premium | Middleware de validación |
| Funciones premium | Jardín, consejera, PDF, predicciones avanzadas |
| Pantalla planes | Mensual / Anual |
| Integración Wompi | SDK Wompi |
| Panel suscripción | Estado, vencimiento, cancelar |

**Aprendes:** pasarelas de pago, lógica de suscripción.

**Requerimientos cubiertos:** RF-037, RF-038, RF-039, RF-040, RF-041, RF-042, RF-043, RF-044, RF-045

---

## FASE 11 — Pulido visual y testing final (3-4 días)

| Tarea | Acción |
|---|---|
| Responsive | Probar en móvil, tablet, escritorio |
| Microinteracciones | Transiciones, hover, loading |
| Mensajes de error | "Oops, algo no salió como esperábamos" |
| Modo discreto en pantallas | Toggle global |
| Accesibilidad | Contraste, teclado |
| Despliegue final Vercel | URL pública |
| Documentación entrega | README, manual usuaria, capturas |

---

## Tiempo total estimado

| Dedicación | Tiempo total |
|---|---|
| Tiempo completo | 8-10 semanas (2-2.5 meses) |
| Medio tiempo | 14-18 semanas (~4 meses) |

---

## MVP urgente (si la fecha es muy próxima)

Fases obligatorias para una entrega presentable:

**Fase 0 + 1 + 2 + 3 + 4 = 3 semanas de trabajo intensivo**

Esto entrega:
- Login funcional
- Calendario completo con registros
- Predicciones del ciclo
- Agenda principal con saludo
- Jardín virtual básico

Las fases 5-10 pueden documentarse como "próximas funcionalidades" en la entrega.

---

## Recomendación de flujo de trabajo

1. **Una rama por fase** en Git (`feature/fase-1-auth`, `feature/fase-2-calendario`, etc.)
2. **Commits frecuentes** describiendo lo que cambias
3. **Pruebas manuales** al final de cada módulo
4. **Deploy en Vercel después de cada fase** para ver el progreso live
5. **Documentar bloqueos** en este mismo repo para no perderlos
