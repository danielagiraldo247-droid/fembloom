# 📋 Casos de Uso por Módulos — FemBloom

Catálogo de casos de uso organizados por módulo, con código identificador, prioridad y actor responsable.

---

## 🎭 Actores del sistema

| Símbolo | Actor | Descripción |
|---|---|---|
| 👤 UNR | **Usuario No Registrado** | Persona que aún no tiene cuenta en FemBloom |
| 👩 UA | **Usuaria Autenticada** | Usuaria con sesión activa (gratuita o premium) |
| 👑 UP | **Usuaria Premium** | Usuaria con suscripción activa o en prueba gratuita |
| ⚙️ S | **Sistema** | Procesos automáticos de FemBloom |
| 🤖 IA | **Sistema de IA (Bloom)** | Google Gemini 2.5 Flash |
| 💳 PG | **Pasarela de Pago** | Wompi (Bancolombia) |

---

## 🎨 Convención de prioridades

| Color | Prioridad | Significado |
|---|---|---|
| 🟢 Verde | **Alta** | Crítico para el funcionamiento del sistema |
| 🔵 Azul | **Media** | Importante pero no bloquea el flujo principal |
| 🟡 Amarillo | **Baja** | Mejora la experiencia pero es opcional |

---

## 📦 «boundary» FemBloom

---

### 1️⃣ Módulo AUTH — Autenticación

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-AUTH-01** | 🟢 Alta | Registrar Usuario Nuevo | 👤 UNR |
| **CU-AUTH-02** | 🟢 Alta | Iniciar Sesión con Correo | 👤 UNR |
| **CU-AUTH-03** | 🟢 Alta | Iniciar Sesión con Google OAuth | 👤 UNR |
| **CU-AUTH-04** | 🟢 Alta | Recuperar Contraseña | 👤 UNR |
| **CU-AUTH-05** | 🔵 Media | Crear Nueva Contraseña tras Recuperación | 👤 UNR |
| **CU-AUTH-06** | 🔵 Media | Cerrar Sesión | 👩 UA |

**RF cubiertos:** RF-001, RF-002, RF-003, RF-004

---

### 2️⃣ Módulo ONBO — Onboarding Inicial

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-ONBO-01** | 🟢 Alta | Configurar Fecha del Último Período | 👩 UA |
| **CU-ONBO-02** | 🟢 Alta | Configurar Duración del Ciclo | 👩 UA |
| **CU-ONBO-03** | 🟢 Alta | Seleccionar Objetivo en la Plataforma | 👩 UA |

**RF cubiertos:** RF-006

---

### 3️⃣ Módulo AGEN — Agenda Personalizada

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-AGEN-01** | 🟢 Alta | Visualizar Saludo Personalizado del Día | 👩 UA |
| **CU-AGEN-02** | 🟢 Alta | Consultar Día Actual del Ciclo | 👩 UA |
| **CU-AGEN-03** | 🟢 Alta | Visualizar Mapa de Fertilidad | 👩 UA |
| **CU-AGEN-04** | 🔵 Media | Consultar Mensaje "Cómo me sentiré hoy" | 👩 UA |
| **CU-AGEN-05** | 🔵 Media | Acceder a Otros Módulos desde Agenda | 👩 UA |

**RF cubiertos:** RF-018, RF-019, RF-030

---

### 4️⃣ Módulo CALE — Calendario Inteligente

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-CALE-01** | 🟢 Alta | Visualizar Calendario Mensual | 👩 UA |
| **CU-CALE-02** | 🟢 Alta | Ver Días por Fase del Ciclo | 👩 UA |
| **CU-CALE-03** | 🔵 Media | Navegar al Mes Anterior | 👩 UA |
| **CU-CALE-04** | 🔵 Media | Navegar al Mes Siguiente | 👩 UA |
| **CU-CALE-05** | 🔵 Media | Seleccionar Día Específico | 👩 UA |
| **CU-CALE-06** | 🟡 Baja | Consultar Leyenda de Colores | 👩 UA |

**RF cubiertos:** RF-007

---

### 5️⃣ Módulo REGI — Registros Diarios

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-REGI-01** | 🟢 Alta | Registrar Día de Menstruación | 👩 UA |
| **CU-REGI-02** | 🟢 Alta | Registrar Intensidad del Flujo | 👩 UA |
| **CU-REGI-03** | 🟢 Alta | Registrar Síntomas con Mapa Corporal | 👩 UA |
| **CU-REGI-04** | 🔵 Media | Seleccionar Zona del Cuerpo | 👩 UA |
| **CU-REGI-05** | 🟢 Alta | Registrar Estado de Ánimo | 👩 UA |
| **CU-REGI-06** | 🔵 Media | Escribir Notas Personales del Día | 👩 UA |
| **CU-REGI-07** | 🔵 Media | Registrar Relación con Protección | 👩 UA |
| **CU-REGI-08** | 🔵 Media | Registrar Relación sin Protección | 👩 UA |
| **CU-REGI-09** | 🟡 Baja | Eliminar Registro de un Día | 👩 UA |

**RF cubiertos:** RF-008, RF-009, RF-010, RF-011, RF-012, RF-013, RF-014, RF-015, RF-020

---

### 6️⃣ Módulo PRED — Predicciones del Ciclo

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-PRED-01** | 🟢 Alta | Calcular Próxima Menstruación | ⚙️ S |
| **CU-PRED-02** | 🟢 Alta | Calcular Día de Ovulación | ⚙️ S |
| **CU-PRED-03** | 🟢 Alta | Calcular Ventana Fértil | ⚙️ S |
| **CU-PRED-04** | 🟢 Alta | Calcular Probabilidad de Embarazo | ⚙️ S |
| **CU-PRED-05** | 🔵 Media | Recalcular Predicciones con Nuevo Registro | ⚙️ S |

**RF cubiertos:** RF-016, RF-017, RF-018, RF-019

---

### 7️⃣ Módulo JARD — Jardín Virtual

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-JARD-01** | 🔵 Media | Visualizar Estado Actual de la Planta | 👑 UP |
| **CU-JARD-02** | 🔵 Media | Consultar Galería de Flores Conseguidas | 👑 UP |
| **CU-JARD-03** | 🔵 Media | Ver Lista de Logros Desbloqueados | 👑 UP |
| **CU-JARD-04** | 🔵 Media | Consultar Próximo Logro a Desbloquear | 👑 UP |
| **CU-JARD-05** | 🟡 Baja | Recibir Notificación al Desbloquear Logro | 👑 UP |
| **CU-JARD-06** | 🟡 Baja | Visualizar Racha de Días Consecutivos | 👑 UP |

**RF cubiertos:** RF-022, RF-023

---

### 8️⃣ Módulo DIAR — Diario Emocional

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-DIAR-01** | 🔵 Media | Crear Nueva Entrada de Diario | 👑 UP |
| **CU-DIAR-02** | 🔵 Media | Editar Entrada Existente | 👑 UP |
| **CU-DIAR-03** | 🔵 Media | Eliminar Entrada con Confirmación | 👑 UP |
| **CU-DIAR-04** | 🔵 Media | Consultar Historial Cronológico | 👑 UP |

**RF cubiertos:** RF-021

---

### 9️⃣ Módulo CONS — Consejera Virtual con IA

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-CONS-01** | 🔵 Media | Iniciar Conversación con Bloom | 👑 UP |
| **CU-CONS-02** | 🔵 Media | Enviar Pregunta a la IA | 👑 UP |
| **CU-CONS-03** | 🔵 Media | Recibir Respuesta Personalizada | 🤖 IA |
| **CU-CONS-04** | 🟡 Baja | Seleccionar Pregunta Sugerida | 👑 UP |
| **CU-CONS-05** | 🟡 Baja | Consultar Historial de Conversación | 👑 UP |

**RF cubiertos:** RF-032

---

### 🔟 Módulo CONO — Educación Conócete

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-CONO-01** | 🔵 Media | Explorar Catálogo de Artículos | 👑 UP |
| **CU-CONO-02** | 🔵 Media | Filtrar Artículos por Categoría | 👑 UP |
| **CU-CONO-03** | 🔵 Media | Leer Artículo Completo | 👑 UP |
| **CU-CONO-04** | 🟡 Baja | Ver Artículos Relacionados | 👑 UP |

**RF cubiertos:** RF-031

---

### 1️⃣1️⃣ Módulo PLAN — Planificación Familiar

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-PLAN-01** | 🟢 Alta | Seleccionar Método Anticonceptivo | 👑 UP |
| **CU-PLAN-02** | 🟢 Alta | Configurar Datos del Método | 👑 UP |
| **CU-PLAN-03** | 🔵 Media | Establecer Hora de Recordatorio Diario | 👑 UP |
| **CU-PLAN-04** | 🔵 Media | Generar Recordatorios Automáticos | ⚙️ S |
| **CU-PLAN-05** | 🔵 Media | Cambiar Método Activo | 👑 UP |
| **CU-PLAN-06** | 🟡 Baja | Consultar Información Educativa del Método | 👑 UP |

**RF cubiertos:** RF-024, RF-025, RF-026, RF-027

---

### 1️⃣2️⃣ Módulo REPO — Reportes Médicos

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-REPO-01** | 🟢 Alta | Generar Reporte Médico PDF | 👑 UP |
| **CU-REPO-02** | 🔵 Media | Seleccionar Rango de Fechas Preset | 👑 UP |
| **CU-REPO-03** | 🔵 Media | Definir Rango Personalizado | 👑 UP |
| **CU-REPO-04** | 🟢 Alta | Descargar Reporte en Dispositivo | 👑 UP |

**RF cubiertos:** RF-033

---

### 1️⃣3️⃣ Módulo HIST — Consulta de Historiales

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-HIST-01** | 🟢 Alta | Consultar Historial de Ciclos Menstruales | 👩 UA |
| **CU-HIST-02** | 🟢 Alta | Consultar Frecuencia de Síntomas | 👩 UA |
| **CU-HIST-03** | 🟢 Alta | Consultar Historial Emocional | 👩 UA |
| **CU-HIST-04** | 🔵 Media | Consultar Historial de Relaciones | 👩 UA |
| **CU-HIST-05** | 🔵 Media | Identificar Ciclos Irregulares | ⚙️ S |
| **CU-HIST-06** | 🟡 Baja | Filtrar Historial por Tipo | 👩 UA |

**RF cubiertos:** RF-034, RF-035, RF-036

---

### 1️⃣4️⃣ Módulo SUSC — Suscripción y Pagos

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-SUSC-01** | 🟢 Alta | Activar Prueba Gratuita Automática | ⚙️ S |
| **CU-SUSC-02** | 🟢 Alta | Visualizar Estado de Suscripción | 👩 UA |
| **CU-SUSC-03** | 🟢 Alta | Seleccionar Plan Premium | 👩 UA |
| **CU-SUSC-04** | 🟢 Alta | Procesar Pago con Wompi | 💳 PG |
| **CU-SUSC-05** | 🟢 Alta | Activar Funciones Premium | ⚙️ S |
| **CU-SUSC-06** | 🔵 Media | Cancelar Suscripción Activa | 👑 UP |
| **CU-SUSC-07** | 🔵 Media | Restringir Acceso al Vencer | ⚙️ S |
| **CU-SUSC-08** | 🟡 Baja | Consultar Historial de Pagos | 👑 UP |

**RF cubiertos:** RF-039, RF-040, RF-041, RF-042, RF-043, RF-044, RF-045

---

### 1️⃣5️⃣ Módulo PERF — Perfil y Privacidad

| Código | Prioridad | Caso de Uso | Actor |
|---|---|---|---|
| **CU-PERF-01** | 🟢 Alta | Visualizar Perfil Personal | 👩 UA |
| **CU-PERF-02** | 🔵 Media | Actualizar Datos del Perfil | 👩 UA |
| **CU-PERF-03** | 🔵 Media | Activar Modo Discreto | 👩 UA |
| **CU-PERF-04** | 🟢 Alta | Exportar Mis Datos en JSON | 👩 UA |
| **CU-PERF-05** | 🟢 Alta | Eliminar Cuenta Permanentemente | 👩 UA |
| **CU-PERF-06** | 🟡 Baja | Modificar Configuración del Ciclo | 👩 UA |

**RF cubiertos:** RF-005, RF-029, RF-037, RF-038

---

## 📊 Resumen de cobertura

| Módulo | Casos de Uso | Prioridad Alta | Prioridad Media | Prioridad Baja |
|---|---|---|---|---|
| AUTH | 6 | 4 | 2 | 0 |
| ONBO | 3 | 3 | 0 | 0 |
| AGEN | 5 | 3 | 2 | 0 |
| CALE | 6 | 2 | 3 | 1 |
| REGI | 9 | 4 | 4 | 1 |
| PRED | 5 | 4 | 1 | 0 |
| JARD | 6 | 0 | 4 | 2 |
| DIAR | 4 | 0 | 4 | 0 |
| CONS | 5 | 0 | 3 | 2 |
| CONO | 4 | 0 | 3 | 1 |
| PLAN | 6 | 2 | 3 | 1 |
| REPO | 4 | 2 | 2 | 0 |
| HIST | 6 | 3 | 2 | 1 |
| SUSC | 8 | 5 | 2 | 1 |
| PERF | 6 | 3 | 2 | 1 |
| **TOTAL** | **83** | **35** | **37** | **11** |

---

## 🎯 Distribución por actor

| Actor | Casos de Uso |
|---|---|
| 👤 Usuario No Registrado (UNR) | 5 |
| 👩 Usuaria Autenticada (UA) | 41 |
| 👑 Usuaria Premium (UP) | 28 |
| ⚙️ Sistema (S) | 10 |
| 🤖 Sistema IA Bloom | 1 |
| 💳 Pasarela de Pago Wompi | 1 |

**Total: 83 casos de uso documentados** cubriendo los 45 requerimientos funcionales del sistema.
