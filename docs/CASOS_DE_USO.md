# 📋 Casos de Uso — FemBloom

Documento de especificación de casos de uso por módulo del sistema FemBloom.

---

## Índice de módulos

1. [Módulo de Autenticación](#1-módulo-de-autenticación)
2. [Módulo de Onboarding](#2-módulo-de-onboarding)
3. [Módulo de Agenda](#3-módulo-de-agenda)
4. [Módulo de Calendario Inteligente](#4-módulo-de-calendario-inteligente)
5. [Módulo de Registros del Día](#5-módulo-de-registros-del-día)
6. [Módulo de Predicciones del Ciclo](#6-módulo-de-predicciones-del-ciclo)
7. [Módulo del Jardín Virtual](#7-módulo-del-jardín-virtual)
8. [Módulo de Diario Emocional](#8-módulo-de-diario-emocional)
9. [Módulo de Consejera Virtual con IA](#9-módulo-de-consejera-virtual-con-ia)
10. [Módulo de Educación "Conócete"](#10-módulo-de-educación-conócete)
11. [Módulo de Planificación Familiar](#11-módulo-de-planificación-familiar)
12. [Módulo de Reportes Médicos](#12-módulo-de-reportes-médicos)
13. [Módulo de Historiales](#13-módulo-de-historiales)
14. [Módulo de Suscripción y Pagos](#14-módulo-de-suscripción-y-pagos)
15. [Módulo de Perfil y Privacidad](#15-módulo-de-perfil-y-privacidad)

---

## 1. Módulo de Autenticación

### CU-01: Registrar nueva cuenta

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria nueva |
| **Precondición** | La usuaria no tiene cuenta en FemBloom |
| **Disparador** | La usuaria hace clic en "Crear mi cuenta" |

**Flujo principal:**
1. La usuaria accede a `/registro`
2. El sistema muestra el formulario con campos: nombre, correo, contraseña
3. La usuaria llena los datos
4. El sistema valida que el correo no esté en uso
5. El sistema valida que la contraseña tenga mínimo 8 caracteres con letras y números
6. El sistema crea el usuario en `auth.users` (Supabase Auth)
7. Un trigger automático crea la fila en `profiles` y `garden_progress`
8. Se activa la prueba gratuita de 3 meses (`trial_ends_at = now() + 3 months`)
9. Se inicia sesión automáticamente
10. La usuaria es redirigida a `/onboarding`

**Postcondición:** La usuaria tiene cuenta activa con prueba gratuita.

**Requerimientos cubiertos:** RF-001, RF-040

---

### CU-02: Iniciar sesión con correo y contraseña

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria registrada |
| **Precondición** | La usuaria tiene cuenta activa |

**Flujo principal:**
1. La usuaria accede a `/login`
2. Ingresa correo y contraseña
3. El sistema valida credenciales contra Supabase Auth
4. Si son correctas, se crea un token JWT en cookies
5. El sistema verifica si tiene `cycle_settings`:
   - Si NO tiene → redirige a `/onboarding`
   - Si SÍ tiene → redirige a `/agenda`

**Flujo alternativo:** Credenciales incorrectas
- Se muestra mensaje: "El correo o la contraseña no coinciden"
- Tras 5 intentos fallidos, la cuenta se bloquea 15 minutos

**Postcondición:** Sesión activa con token JWT.

**Requerimientos cubiertos:** RF-002

---

### CU-03: Iniciar sesión con Google OAuth

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria con cuenta Google |
| **Precondición** | La usuaria tiene cuenta de Google |

**Flujo principal:**
1. La usuaria hace clic en "Continuar con Google"
2. El sistema redirige al flujo de OAuth 2.0 de Google
3. La usuaria autoriza en Google
4. Google redirige a `/auth/callback` con un código
5. El sistema intercambia el código por una sesión
6. Si es primera vez: se crea cuenta + activa prueba gratuita
7. Si ya existe: se inicia sesión normal
8. Se redirige a `/onboarding` o `/agenda`

**Postcondición:** Sesión activa, usuario autenticado con Google.

**Requerimientos cubiertos:** RF-003

---

### CU-04: Recuperar contraseña

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria que olvidó su contraseña |
| **Precondición** | La usuaria tiene cuenta activa |

**Flujo principal:**
1. En `/login`, la usuaria hace clic en "¿Olvidaste tu contraseña?"
2. Accede a `/recuperar`
3. Ingresa su correo y hace clic en "Enviar enlace"
4. El sistema envía correo con enlace mágico via Supabase Auth
5. La usuaria abre el correo y hace clic en el enlace
6. El enlace lleva a `/auth/callback?next=/actualizar-password`
7. El sistema intercambia el código por una sesión temporal
8. La usuaria es redirigida a `/actualizar-password`
9. Ingresa la nueva contraseña dos veces
10. El sistema actualiza la contraseña
11. La usuaria queda autenticada y va a `/agenda`

**Postcondición:** Contraseña actualizada, sesión activa.

**Requerimientos cubiertos:** RF-004

---

## 2. Módulo de Onboarding

### CU-05: Completar configuración inicial del ciclo

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria nueva |
| **Precondición** | Usuaria autenticada sin `cycle_settings` |

**Flujo principal:**
1. La usuaria llega a `/onboarding` después del registro
2. **Paso 1:** Selecciona la fecha de su último período
3. **Paso 2:** Ajusta la duración promedio del ciclo (21-45 días) y de la menstruación (2-10 días)
4. **Paso 3:** Elige su objetivo: buscar embarazo, evitar embarazo o solo seguimiento
5. Hace clic en "¡Empezar! 🌸"
6. El sistema guarda en `cycle_settings`
7. El sistema actualiza `profiles.objective`
8. El sistema crea el primer ciclo en `cycles`
9. La usuaria es redirigida a `/agenda`

**Postcondición:** Configuración del ciclo completa. La app puede hacer predicciones.

**Requerimientos cubiertos:** RF-006

---

## 3. Módulo de Agenda

### CU-06: Ver agenda personalizada del día

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria autenticada |
| **Precondición** | Usuaria con onboarding completado |

**Flujo principal:**
1. La usuaria accede a `/agenda`
2. El sistema calcula:
   - Día actual del ciclo
   - Fase actual (menstrual, folicular, ovulación, lútea)
   - Si está en ventana fértil
   - Probabilidad de embarazo
   - Días para próximo período y ovulación
3. El sistema obtiene:
   - Última relación registrada
   - Estado del jardín
   - Mensaje de "¿Cómo me sentiré hoy?"
4. Se renderiza la agenda con:
   - Saludo dinámico (Buenos días/tardes/noches según la hora)
   - Mapa visual de fertilidad
   - Tarjeta empática del día
   - Tarjeta de probabilidad de embarazo
   - Próximos eventos
   - Accesos rápidos a otros módulos

**Postcondición:** Usuaria informada del estado actual de su ciclo.

**Requerimientos cubiertos:** RF-018, RF-019, RF-030

---

## 4. Módulo de Calendario Inteligente

### CU-07: Visualizar calendario con fases del ciclo

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria autenticada |

**Flujo principal:**
1. La usuaria accede a `/calendario`
2. El sistema genera la vista del mes actual
3. Para cada día calcula su fase del ciclo
4. Pinta cada día con su color correspondiente:
   - Rosa coral fuerte: menstruación registrada
   - Rosa pétalo: menstruación prevista
   - Verde menta: ventana fértil
   - Lavanda: día de ovulación
   - Durazno: fase folicular
   - Lila bruma: fase lútea
5. Resalta el día actual con un anillo coral
6. Muestra leyenda de colores
7. Muestra tarjeta del próximo período estimado

**Postcondición:** Usuaria visualiza su ciclo completo en formato calendario.

**Requerimientos cubiertos:** RF-007, RF-016, RF-017

---

### CU-08: Navegar entre meses

**Flujo principal:**
1. La usuaria hace clic en `<` o `>` en la cabecera del calendario
2. El sistema recalcula todas las fases para el nuevo mes
3. Re-renderiza la cuadrícula

---

## 5. Módulo de Registros del Día

### CU-09: Registrar menstruación e intensidad del flujo

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria autenticada |

**Flujo principal:**
1. En el calendario, la usuaria toca un día
2. Se abre el modal con 5 tabs
3. En el tab "Período" activa el toggle "Día de menstruación"
4. Aparecen 4 opciones de intensidad (manchado, leve, moderado, intenso) con íconos de gotas
5. La usuaria selecciona una intensidad
6. Hace clic en "Guardar 🌸"
7. El sistema hace UPSERT en `daily_logs`
8. El modal se cierra
9. El día se actualiza en el calendario (color coral fuerte)

**Postcondición:** Día registrado como menstruación con intensidad.

**Requerimientos cubiertos:** RF-008, RF-009

---

### CU-10: Registrar síntomas usando mapa corporal

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria autenticada |

**Flujo principal:**
1. En el modal del día, va al tab "Síntomas"
2. Ve una silueta corporal femenina con zonas tappeables
3. Toca una zona (cabeza, pecho, abdomen, piernas, espalda o general)
4. La zona se resalta
5. Abajo se muestran solo los síntomas asociados a esa zona
6. Selecciona uno o varios síntomas (toggle)
7. Puede tocar otras zonas y agregar más síntomas
8. Hace clic en "Guardar 🌸"
9. El sistema borra los síntomas anteriores del día y guarda los nuevos en `symptoms`

**Postcondición:** Síntomas del día registrados con su zona corporal.

**Requerimientos cubiertos:** RF-010, RF-020

---

### CU-11: Registrar estado de ánimo del día

**Flujo principal:**
1. En el modal del día, tab "Ánimo"
2. Ve 8 emojis grandes (alegre, triste, irritable, ansiosa, tranquila, sensible, energética, cansada)
3. Selecciona uno o varios
4. "Guardar 🌸"
5. El sistema actualiza `moods`

**Requerimientos cubiertos:** RF-011

---

### CU-12: Registrar notas personales del día

**Flujo principal:**
1. En el modal del día, tab "Notas"
2. Escribe texto libre (máximo 500 caracteres)
3. Contador en tiempo real
4. "Guardar 🌸"
5. El sistema actualiza `daily_logs.note`

**Requerimientos cubiertos:** RF-012

---

### CU-13: Registrar relación sexual con o sin protección

**Flujo principal:**
1. En el modal del día, tab "Relación"
2. Activa el toggle "Tuve relación"
3. Selecciona "Con protección 🛡️" o "Sin protección ⚠️"
4. Opcional: hora y observación privada
5. "Guardar 🌸"
6. El sistema actualiza `relations` y calcula si fue en ventana fértil

**Flujo alternativo:** Sin protección + ventana fértil
- Se muestra alerta informativa de mayor probabilidad de embarazo

**Postcondición:** Relación registrada de forma privada.

**Requerimientos cubiertos:** RF-013, RF-014, RF-015

---

## 6. Módulo de Predicciones del Ciclo

### CU-14: Calcular probabilidad de embarazo

| Campo | Detalle |
|---|---|
| **Actor principal** | Sistema (proceso automático) |

**Flujo principal:**
1. El sistema obtiene la fase actual del ciclo
2. Obtiene las relaciones de los últimos 7 días
3. Verifica si hay método anticonceptivo activo confiable
4. Aplica la lógica:
   - Si tiene anticonceptivo confiable → BAJA
   - Si está en ventana fértil + relación sin protección → ALTA
   - Si está en ventana fértil sin relación → MEDIA
   - Si está fuera de ventana fértil → BAJA
5. Devuelve nivel + explicación empática

**Postcondición:** Probabilidad calculada y visible en la agenda.

**Requerimientos cubiertos:** RF-019

---

## 7. Módulo del Jardín Virtual

### CU-15: Visualizar jardín y progreso

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria autenticada |

**Flujo principal:**
1. La usuaria accede a `/jardin`
2. El sistema calcula:
   - Total de ciclos completos
   - Días con registros únicos
   - Racha actual de días seguidos
   - Etapa actual de la planta
3. Genera la lista de flores conseguidas
4. Verifica los 10 logros (cuáles tiene, cuál es el siguiente)
5. Renderiza:
   - Planta principal SVG animada
   - Stats (ciclos, racha, días)
   - Galería de flores
   - Barra del próximo logro
   - Lista de logros con bloqueados/desbloqueados

**Postcondición:** Usuaria visualiza su progreso gamificado.

**Requerimientos cubiertos:** RF-022, RF-023

---

## 8. Módulo de Diario Emocional

### CU-16: Crear entrada en el diario

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria autenticada |

**Flujo principal:**
1. La usuaria accede a `/diario`
2. Hace clic en "Nueva"
3. Se abre el modal con campos: fecha (default hoy) y contenido (max 2000 chars)
4. Escribe lo que siente
5. "Guardar 🌸"
6. El sistema inserta en `journal_entries`
7. La entrada aparece en la lista cronológica

**Flujo alternativo:** Editar entrada existente
- Toca una entrada → abre con datos cargados
- Modifica → guardar

**Flujo alternativo:** Eliminar entrada
- Botón 🗑️ → confirmación → borra

**Postcondición:** Diario actualizado con la entrada privada.

**Requerimientos cubiertos:** RF-021

---

## 9. Módulo de Consejera Virtual con IA

### CU-17: Conversar con Bloom (consejera)

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria autenticada |

**Flujo principal:**
1. La usuaria accede a `/consejera`
2. Si es primera vez: ve avatar de Bloom y 4 preguntas sugeridas
3. Escribe una pregunta en el input
4. Presiona Enter o el botón de enviar
5. El sistema:
   - Llama a `POST /api/consejera`
   - El backend obtiene contexto de la usuaria (nombre, ciclo, objetivo)
   - Construye el prompt con el system prompt + historial reciente + nueva pregunta
   - Llama a Google Gemini 2.5 Flash API
   - Recibe respuesta
   - Guarda la conversación en `chat_messages`
6. Bloom responde con un mensaje empático en el chat

**Flujo alternativo:** API caída o sin cuota
- Sistema detecta el error
- Activa el sistema de respaldo con respuestas pre-armadas según palabras clave
- Devuelve respuesta sin que la usuaria sienta diferencia

**Postcondición:** Conversación guardada en historial.

**Requerimientos cubiertos:** RF-032

---

## 10. Módulo de Educación "Conócete"

### CU-18: Explorar artículos educativos

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria autenticada |

**Flujo principal:**
1. La usuaria accede a `/conocete`
2. Ve artículos organizados en 4 categorías:
   - Ciclo menstrual
   - Fertilidad
   - Anticonceptivos
   - Bienestar emocional
3. Hace clic en un artículo
4. Accede a `/conocete/[slug]`
5. Lee el contenido completo con formato (títulos, párrafos, listas)
6. Al final ve artículos relacionados de la misma categoría
7. Puede volver con el botón "Volver"

**Postcondición:** Usuaria informada sobre su salud.

**Requerimientos cubiertos:** RF-031

---

## 11. Módulo de Planificación Familiar

### CU-19: Configurar método anticonceptivo

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria autenticada |

**Flujo principal:**
1. La usuaria accede a `/planificacion`
2. Ve 6 tarjetas con métodos: pastillas, inyección, DIU, Jadelle, implante, preservativo
3. Selecciona uno
4. Aparece la sección de configuración específica según el método:
   - Pastillas: hora del recordatorio diario
   - Inyección/DIU/Jadelle/Implante: fecha de aplicación y próxima renovación
5. Llena los datos
6. "Guardar método 🌸"
7. El sistema:
   - Desactiva el método anterior (si lo hay)
   - Crea nueva fila en `contraceptive_methods`
   - Programa recordatorios según el tipo

**Postcondición:** Método activo configurado.

**Requerimientos cubiertos:** RF-024, RF-025, RF-026, RF-027

---

## 12. Módulo de Reportes Médicos

### CU-20: Generar y descargar reporte médico PDF

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria autenticada |

**Flujo principal:**
1. La usuaria accede a `/reportes`
2. Selecciona el rango: último mes, 3 meses, 6 meses o personalizado
3. Ve un resumen del rango seleccionado
4. Hace clic en "Descargar mi reporte"
5. El sistema:
   - Consulta a Supabase los datos del rango: ciclos, síntomas, ánimo, relaciones
   - Construye el documento con `@react-pdf/renderer`
   - Genera el PDF en el cliente
   - Inicia la descarga automática
6. El archivo se descarga como `FemBloom_Reporte_YYYYMMDD.pdf`

**Postcondición:** PDF profesional descargado, listo para llevar a consulta médica.

**Requerimientos cubiertos:** RF-033

---

## 13. Módulo de Historiales

### CU-21: Consultar historiales completos

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria autenticada |

**Flujo principal:**
1. La usuaria accede a `/historiales`
2. Ve 4 tabs: Ciclos, Síntomas, Ánimo, Relaciones
3. **Tab Ciclos:** Lista cronológica con duración. Los ciclos irregulares aparecen marcados
4. **Tab Síntomas:** Top de síntomas con frecuencia, barras de progreso
5. **Tab Ánimo:** Distribución visual de emociones registradas
6. **Tab Relaciones:** Stats con/sin protección, alertas en ventana fértil

**Postcondición:** Usuaria visualiza patrones a largo plazo.

**Requerimientos cubiertos:** RF-034, RF-035, RF-036

---

## 14. Módulo de Suscripción y Pagos

### CU-22: Adquirir suscripción premium

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria con prueba vencida o que quiere premium |

**Flujo principal:**
1. La usuaria accede a `/suscripcion`
2. Ve su estado actual (Prueba gratuita con días restantes / Vencida)
3. Ve 2 planes: Mensual ($12.900) y Anual ($99.900 - RECOMENDADO)
4. Selecciona uno
5. Ve las características incluidas
6. Hace clic en "Pagar con Nequi / PSE / Tarjeta"
7. El sistema:
   - Procesa el pago (en producción real, con Wompi widget)
   - Actualiza `profiles.subscription_status = 'active'`
   - Calcula `trial_ends_at` según el plan
   - Crea fila en `subscriptions`
   - Registra el pago en `payments`
8. Mensaje de éxito y plan activado

**Postcondición:** Premium activo, acceso ilimitado a funciones avanzadas.

**Requerimientos cubiertos:** RF-039, RF-042, RF-044

---

### CU-23: Cancelar suscripción

**Flujo principal:**
1. En `/suscripcion`, usuaria con plan activo ve botón "Cancelar"
2. Hace clic → confirmación
3. El sistema cambia `profiles.subscription_status = 'cancelled'`
4. Se mantiene el acceso hasta la fecha pagada
5. Después de esa fecha, vuelve al plan gratuito

**Requerimientos cubiertos:** RF-039

---

## 15. Módulo de Perfil y Privacidad

### CU-24: Activar modo discreto

| Campo | Detalle |
|---|---|
| **Actor principal** | Usuaria autenticada |

**Flujo principal:**
1. La usuaria accede a `/perfil`
2. En la sección "Privacidad" encuentra el toggle "Modo discreto"
3. Lo activa
4. El sistema actualiza `profiles.discrete_mode = true`
5. Las notificaciones futuras mostrarán texto genérico ("Tienes una actividad pendiente")

**Requerimientos cubiertos:** RF-029

---

### CU-25: Exportar mis datos

**Flujo principal:**
1. En `/perfil` → sección Privacidad → "Exportar mis datos"
2. El sistema consulta TODAS las tablas del usuario
3. Construye un JSON con todos sus datos
4. Inicia descarga del archivo `fembloom-mis-datos-YYYY-MM-DD.json`

**Postcondición:** Usuaria tiene una copia portable de sus datos.

**Requerimientos cubiertos:** RF-037

---

### CU-26: Eliminar cuenta

**Flujo principal:**
1. En `/perfil` → "Eliminar mi cuenta"
2. El sistema pide escribir la palabra "ELIMINAR" como confirmación
3. Si la palabra es correcta, segunda confirmación visual
4. El sistema borra el `profiles` (cascade delete elimina todas las tablas relacionadas)
5. Se cierra la sesión
6. Mensaje de despedida y redirección a la home

**Postcondición:** Cuenta y todos los datos eliminados permanentemente.

**Requerimientos cubiertos:** RF-037

---

## 📊 Resumen de casos de uso

| # | Caso de Uso | Módulo | RF cubierto(s) |
|---|---|---|---|
| CU-01 | Registrar nueva cuenta | Autenticación | RF-001, RF-040 |
| CU-02 | Iniciar sesión con correo | Autenticación | RF-002 |
| CU-03 | Iniciar sesión con Google | Autenticación | RF-003 |
| CU-04 | Recuperar contraseña | Autenticación | RF-004 |
| CU-05 | Completar onboarding | Onboarding | RF-006 |
| CU-06 | Ver agenda personalizada | Agenda | RF-018, RF-019, RF-030 |
| CU-07 | Visualizar calendario | Calendario | RF-007, RF-016, RF-017 |
| CU-08 | Navegar entre meses | Calendario | RF-007 |
| CU-09 | Registrar menstruación | Registros | RF-008, RF-009 |
| CU-10 | Registrar síntomas con mapa | Registros | RF-010, RF-020 |
| CU-11 | Registrar ánimo | Registros | RF-011 |
| CU-12 | Registrar notas | Registros | RF-012 |
| CU-13 | Registrar relación | Registros | RF-013, RF-014, RF-015 |
| CU-14 | Calcular probabilidad de embarazo | Predicciones | RF-019 |
| CU-15 | Visualizar jardín | Jardín | RF-022, RF-023 |
| CU-16 | Crear entrada en diario | Diario | RF-021 |
| CU-17 | Conversar con Bloom | Consejera IA | RF-032 |
| CU-18 | Explorar artículos | Conócete | RF-031 |
| CU-19 | Configurar método anticonceptivo | Planificación | RF-024-027 |
| CU-20 | Generar reporte PDF | Reportes | RF-033 |
| CU-21 | Consultar historiales | Historiales | RF-034-036 |
| CU-22 | Adquirir suscripción | Suscripción | RF-039, RF-042, RF-044 |
| CU-23 | Cancelar suscripción | Suscripción | RF-039 |
| CU-24 | Activar modo discreto | Perfil | RF-029 |
| CU-25 | Exportar datos | Perfil | RF-037 |
| CU-26 | Eliminar cuenta | Perfil | RF-037 |

**Total: 26 casos de uso documentados que cubren todos los requerimientos funcionales.**
