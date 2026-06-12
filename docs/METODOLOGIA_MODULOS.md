# 🧩 Metodología de Conformación de Módulos — FemBloom

Documento explicativo de cómo se agruparon los 45 Requerimientos Funcionales en 15 Módulos del Sistema.

---

## 📐 Principios de diseño aplicados

Para conformar los módulos del sistema FemBloom, apliqué **4 principios de ingeniería de software** ampliamente reconocidos:

### Principio 1: Alta cohesión
> Todos los requerimientos dentro de un módulo deben **trabajar juntos** hacia un mismo objetivo funcional.

**Ejemplo:** El módulo AUTH agrupa RF-001 (Registro), RF-002 (Login con correo), RF-003 (Login con Google) y RF-004 (Recuperar contraseña). Todos comparten el objetivo común de **gestionar el acceso del usuario al sistema**.

### Principio 2: Bajo acoplamiento
> Los módulos deben **funcionar independientemente** entre sí, comunicándose solo por interfaces bien definidas.

**Ejemplo:** El módulo JARD (Jardín Virtual) consulta datos del módulo REGI (Registros) pero no depende de su implementación interna. Solo lee la tabla `daily_logs` para calcular la racha.

### Principio 3: Separación de responsabilidades
> Cada módulo debe tener una **única razón para cambiar**.

**Ejemplo:** El módulo PRED (Predicciones) contiene SOLO lógica matemática del ciclo. Si en el futuro se cambia el algoritmo de predicción, **solo se modifica este módulo**, sin afectar a los demás.

### Principio 4: Principio de abstracción por dominio
> Los módulos se organizan según el **dominio de negocio**, no según la tecnología.

**Ejemplo:** Aunque internamente el módulo CONS (Consejera) usa Gemini AI, una API REST y la base de datos, externamente se presenta como **un solo módulo** porque ese es su rol en el dominio del negocio.

---

## 🔍 Criterios de agrupación aplicados

Apliqué **5 criterios secuenciales** para decidir qué requerimientos van en cada módulo:

### Criterio 1: Afinidad funcional
**Pregunta:** *¿Estos requerimientos resuelven un mismo problema del usuario?*

| Requerimientos agrupados | Razón |
|---|---|
| RF-001, RF-002, RF-003, RF-004 | Todos resuelven el problema de "cómo accedo al sistema" |
| RF-016, RF-017, RF-018, RF-019 | Todos son **predicciones** del ciclo |
| RF-024, RF-025, RF-026, RF-027 | Todos gestionan el **método anticonceptivo** |

### Criterio 2: Compartir la misma entidad de datos
**Pregunta:** *¿Estos requerimientos manipulan las mismas tablas?*

| Módulo | Tablas que manipula |
|---|---|
| AUTH | `auth.users`, `profiles` |
| REGI | `daily_logs`, `symptoms`, `moods`, `relations` |
| JARD | `garden_progress`, `achievements`, `cycles` |
| SUSC | `subscriptions`, `payments`, `profiles.subscription_status` |

### Criterio 3: Compartir la misma pantalla o interfaz
**Pregunta:** *¿Estos requerimientos se cumplen en una misma vista de la app?*

| Pantalla | Módulo | Requerimientos |
|---|---|---|
| `/calendario` | CALE | RF-007 (visualizar calendario) |
| Modal del día | REGI | RF-008 a RF-015, RF-020 (todos los registros) |
| `/agenda` | AGEN | RF-018, RF-019, RF-030 |

### Criterio 4: Compartir el mismo flujo de usuario
**Pregunta:** *¿Estos requerimientos se ejecutan en una misma secuencia lógica?*

**Ejemplo del flujo de registro:**
1. RF-001 (Registro de usuario)
2. RF-006 (Configuración del ciclo) — **es el siguiente paso natural**
3. RF-040 (Activación de prueba gratuita) — **se dispara automáticamente al registrarse**

Sin embargo, RF-006 lo separé en el módulo ONBO porque la **pantalla** y el **propósito** son distintos al registro.

### Criterio 5: Compartir la misma tecnología o servicio externo
**Pregunta:** *¿Estos requerimientos dependen de un mismo servicio externo?*

| Servicio externo | Módulo |
|---|---|
| Supabase Auth | AUTH |
| Google Gemini API | CONS |
| Wompi (pasarela) | SUSC |
| React-PDF (librería) | REPO |

---

## 📊 Tabla de decisión usada

Para cada uno de los 45 RF, apliqué esta **matriz de decisión**:

| Pregunta | Si SÍ → | Si NO → |
|---|---|---|
| 1. ¿Es de acceso/seguridad? | Módulo AUTH | Sigue a 2 |
| 2. ¿Es configuración inicial? | Módulo ONBO | Sigue a 3 |
| 3. ¿Está en la pantalla principal? | Módulo AGEN | Sigue a 4 |
| 4. ¿Se visualiza en calendario? | Módulo CALE | Sigue a 5 |
| 5. ¿Es un registro diario? | Módulo REGI | Sigue a 6 |
| 6. ¿Es cálculo automático? | Módulo PRED | Sigue a 7 |
| 7. ¿Es gamificación? | Módulo JARD | Sigue a 8 |
| 8. ¿Es escritura libre? | Módulo DIAR | Sigue a 9 |
| 9. ¿Involucra IA? | Módulo CONS | Sigue a 10 |
| 10. ¿Es contenido educativo? | Módulo CONO | Sigue a 11 |
| 11. ¿Es sobre anticonceptivos? | Módulo PLAN | Sigue a 12 |
| 12. ¿Genera documento? | Módulo REPO | Sigue a 13 |
| 13. ¿Es consulta histórica? | Módulo HIST | Sigue a 14 |
| 14. ¿Involucra pagos? | Módulo SUSC | Sigue a 15 |
| 15. Resto | Módulo PERF | — |

---

## 🗂️ Justificación de cada módulo

### 1. AUTH (Autenticación) — 4 RF
**Justificación:** Todos los requerimientos sobre **identificación y acceso** del usuario. Comparten Supabase Auth como servicio backend, tokens JWT, y todos preceden al acceso a la app.

### 2. ONBO (Onboarding) — 1 RF
**Justificación:** Separado de AUTH porque ocurre **después del login** y tiene una pantalla dedicada. Es la transición entre "tener cuenta" y "tener cuenta lista para usar".

### 3. AGEN (Agenda Personalizada) — 3 RF
**Justificación:** Todos los requerimientos que conforman la **pantalla principal del usuario**. Es la cara visible de la app y agrupa información sintetizada de otros módulos.

### 4. CALE (Calendario) — 1 RF
**Justificación:** El requerimiento del calendario es complejo y tiene su propia pantalla. Aunque interactúa con REGI, su responsabilidad única es **visualizar el ciclo en cuadrícula mensual**.

### 5. REGI (Registros del Día) — 9 RF
**Justificación:** El módulo más grande. Agrupa todos los requerimientos de **captura de información diaria**. Comparten una misma pantalla (modal del día) con tabs.

### 6. PRED (Predicciones) — 4 RF
**Justificación:** Todos los requerimientos de **cálculo automático** del ciclo. Son funciones puras (sin estado) ejecutadas por el sistema. Se separaron de CALE para tener bajo acoplamiento.

### 7. JARD (Jardín Virtual) — 2 RF
**Justificación:** El jardín y los logros forman una **mecánica de gamificación independiente**. Tiene su propia pantalla y depende solo de lectura de datos de REGI y SUSC.

### 8. DIAR (Diario Emocional) — 1 RF
**Justificación:** Aunque tiene 1 solo RF, su importancia funcional (escritura libre privada) y su pantalla dedicada justifican un módulo separado.

### 9. CONS (Consejera Virtual) — 1 RF
**Justificación:** Único módulo con **integración a IA externa** (Google Gemini). Su separación facilita su mantenimiento (si cambia el modelo o el proveedor de IA).

### 10. CONO (Educación) — 1 RF
**Justificación:** Contenido estático organizado por categorías. Es un módulo de **consulta de información** sin escritura ni cálculos.

### 11. PLAN (Planificación Familiar) — 4 RF
**Justificación:** Todos los requerimientos sobre **gestión del método anticonceptivo**. Comparten una pantalla y datos de la tabla `contraceptive_methods`.

### 12. REPO (Reportes) — 1 RF
**Justificación:** Aunque es 1 solo RF, su complejidad técnica (generación de PDF en cliente) y su pantalla dedicada justifican el módulo.

### 13. HIST (Historiales) — 3 RF
**Justificación:** Todos son requerimientos de **consulta histórica** con vista cronológica. Comparten una pantalla con tabs.

### 14. SUSC (Suscripción y Pagos) — 7 RF
**Justificación:** Todos los requerimientos sobre el **modelo de negocio**. Comparten las tablas `subscriptions` y `payments`, y la integración con Wompi.

### 15. PERF (Perfil y Privacidad) — 4 RF
**Justificación:** Gestión personal del usuario: visualización del perfil + controles de privacidad. Agrupados porque están en una misma pantalla y comparten la tabla `profiles`.

---

## 🎯 Resumen visual de la metodología

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   45 Requerimientos Funcionales                                 │
│                       ▼                                         │
│   Aplicar 5 criterios de agrupación                             │
│   1. Afinidad funcional                                         │
│   2. Compartir entidad de datos                                 │
│   3. Compartir pantalla/interfaz                                │
│   4. Compartir flujo de usuario                                 │
│   5. Compartir servicio externo                                 │
│                       ▼                                         │
│   Validar con 4 principios SOLID                                │
│   ✓ Alta cohesión                                               │
│   ✓ Bajo acoplamiento                                           │
│   ✓ Separación de responsabilidades                             │
│   ✓ Abstracción por dominio                                     │
│                       ▼                                         │
│   15 Módulos del Sistema FemBloom                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📈 Beneficios de esta organización

### Para el desarrollo
- ✅ Cada módulo se puede **desarrollar en paralelo**
- ✅ Los cambios en un módulo **no afectan a los demás**
- ✅ Más fácil de **debuggear** (problema localizado)
- ✅ Más fácil de **testear** (pruebas unitarias por módulo)

### Para el mantenimiento
- ✅ Si cambia un requerimiento, sé **exactamente qué módulo modificar**
- ✅ Si entra un desarrollador nuevo, puede **enfocarse en un módulo** a la vez
- ✅ Documentación más clara

### Para la escalabilidad
- ✅ Se pueden **agregar nuevos módulos** sin reestructurar el código
- ✅ Cada módulo puede **escalarse independientemente** si fuera necesario
- ✅ Posibilidad de **separar módulos en microservicios** en el futuro

### Para la presentación académica
- ✅ Clara **trazabilidad RF → Módulo → Pantalla → Código**
- ✅ Cumplimiento documentado y demostrable
- ✅ Estructura profesional reconocible

---

## 🎓 Trazabilidad completa

Para CUALQUIER requerimiento del sistema, puedes seguir esta trazabilidad:

```
RF-XXX (Requerimiento Funcional)
   ↓
Módulo M-XX (uno de los 15)
   ↓
CU-XXXX-NN (uno de los 83 casos de uso)
   ↓
/ruta/de/la/pantalla (en la app)
   ↓
archivo/de/codigo.tsx (en el código fuente)
```

### Ejemplo de trazabilidad:

```
RF-019 (Probabilidad de Embarazo)
   ↓
Módulo AGEN + Módulo PRED
   ↓
CU-AGEN-04 (Consultar probabilidad)
CU-PRED-04 (Calcular probabilidad)
   ↓
/agenda (pantalla)
   ↓
app/(app)/agenda/page.tsx (vista)
lib/cycle/predictions.ts (lógica)
```

---

## ✅ Conclusión

La organización modular de FemBloom **no es arbitraria**, sigue una metodología basada en principios reconocidos de ingeniería de software:

1. ✅ **5 criterios objetivos** de agrupación
2. ✅ **4 principios SOLID** de diseño
3. ✅ **Matriz de decisión** documentada
4. ✅ **Trazabilidad completa** entre RF, Módulos, Casos de Uso, Pantallas y Código

Esta estructura garantiza que el proyecto sea **mantenible, escalable y comprensible**, no solo para mí, sino para cualquier desarrollador o auditor que necesite trabajar con el sistema en el futuro. 🌸
