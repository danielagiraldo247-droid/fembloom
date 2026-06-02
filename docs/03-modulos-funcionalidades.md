# 03 - Módulos y Funcionalidades

Detalle completo de cada módulo de FemBloom según la idea original.

---

## 1. Página principal (Agenda personal)

**No es un dashboard.** Es una pantalla cálida tipo agenda con:

- Saludo personalizado con el nombre de la usuaria
- Día actual del ciclo
- Fase actual (menstrual, folicular, ovulatoria, lútea)
- Mención si está en ventana fértil
- Recordatorio del último registro relevante (relación, síntoma, etc.)
- Próximo recordatorio programado
- Vista resumen del calendario
- Acceso al jardín virtual
- Resumen emocional del día
- Próximas actividades

**Ejemplo del saludo:**

> Hola Daniela,
> Día 14 de tu ciclo.
> Te encuentras en tu ventana fértil.
> Registraste una relación sexual hace 2 días.
> Tu próximo recordatorio es mañana a las 8:00 PM.

---

## 2. Calendario inteligente (Corazón de la app)

Cada día permite registrar:

- **Menstruación** (con intensidad: manchado, leve, moderado, intenso)
- **Relaciones sexuales** (con o sin protección)
- **Anticonceptivos** (tomados/aplicados)
- **Estados de ánimo** (8 opciones con íconos)
- **Síntomas** (catálogo + personalizados)
- **Notas** (texto libre hasta 500 caracteres)

**Visualización:**

- Mes actual con navegación a meses anteriores y posteriores
- Días resaltados según fase del ciclo (color suave diferenciado)
- Tap en día muestra resumen de registros
- Día actual destacado

---

## 3. Jardín virtual

Cada ciclo completo hace crecer una flor. La planta evoluciona según:

- Registro constante
- Cumplimiento de recordatorios
- Registro emocional
- Seguimiento de síntomas

**Después de algunos meses de uso, la usuaria tiene su propio jardín virtual personal.**

**Estilo visual confirmado:** Flores tipo acuarela con colores pasteles suaves, estilo minimalista.

Ver [09-jardin-virtual.md](09-jardin-virtual.md) para más detalle.

---

## 4. Registro de relaciones sexuales

Permite registrar:

- Fecha
- Hora
- Con protección / Sin protección
- Observaciones

**Diferenciación adicional:**

- Relación en periodo fértil
- Relación fuera del periodo fértil

**Mapa de fertilidad:**

Línea visual horizontal que muestra las fases del ciclo de forma simple:

- Menstruación
- Recuperación
- Fertilidad
- Ovulación
- Fase premenstrual

Ilustración suave, sin gráficos complejos.

---

## 5. Probabilidad de embarazo

Calcula la probabilidad según:

- Fase del ciclo
- Día de ovulación
- Relaciones sexuales registradas
- Método anticonceptivo usado

**Resultado:** Indicador visual con 3 niveles: **Baja / Media / Alta**.

Incluye una explicación sencilla y empática (no alarmista, no diagnóstica).

---

## 6. Centro de planificación familiar

La usuaria selecciona su método anticonceptivo:

| Método | Recordatorio |
|---|---|
| **Pastillas** | Recordatorio diario |
| **Inyección** | Recordatorio mensual |
| **Jadelle** | Control anual |
| **DIU** | Revisiones periódicas |
| **Implante** | Control de vencimiento |
| **Preservativo** | Sin recordatorio periódico |

Además permite definir el objetivo:

- Buscar embarazo
- Evitar embarazo
- Solo seguimiento

---

## 7. Asistente inteligente / Notificaciones personalizadas

Ejemplos de notificaciones que el sistema enviará:

- "Hoy inicia tu ventana fértil"
- "Recuerda tu anticonceptivo"
- "Tu periodo podría comenzar en 3 días"
- "Registraste una relación durante un periodo fértil"

---

## 8. Modo "¿Cómo me sentiré hoy?"

Predicción diaria basada en la fase del ciclo. Ejemplos:

- **Fase folicular:** "Posiblemente tengas más energía"
- **Fase premenstrual:** "Podrías experimentar sensibilidad emocional"

**Importante:** Es solo orientación, no diagnóstico. Tono empático y positivo.

---

## 9. Mapa interactivo de síntomas

Ilustración femenina interactiva donde la usuaria toca zonas del cuerpo:

- Cabeza
- Abdomen
- Espalda
- Pecho
- Piernas

Al tocar una zona, aparecen los síntomas asociados a esa área para seleccionar. Mucho más visual y moderno que una lista plana.

---

## 10. Diario privado

Cada día la usuaria puede registrar:

- Cómo se sintió
- Qué síntomas tuvo
- Cómo fue su estado emocional
- Notas personales

**Ejemplo de entrada:**

> "Hoy tuve cólicos débiles pero me sentí muy productiva."

**Características:**

- Texto libre con formato básico
- Totalmente privado y encriptado
- Editable y eliminable en cualquier momento
- Organizado cronológicamente

---

## 11. Sección "Conócete"

Educación menstrual personalizada según la fase actual del ciclo.

**Contenidos de ejemplo:**

- ¿Qué está pasando en mi cuerpo?
- ¿Qué es la ovulación?
- ¿Cómo funciona el DIU?
- ¿Qué es el síndrome premenstrual?

Lenguaje claro, accesible, sin tecnicismos excesivos. Con ilustraciones de apoyo.

---

## 12. Consejera virtual (Chat integrado con IA)

Chat que responde dudas sobre:

- Ciclo menstrual
- Fertilidad
- Métodos anticonceptivos
- Síntomas frecuentes
- Funciones de la aplicación

**Características:**

- Tono cálido, empático, no clínico
- Personalizada con datos del ciclo de la usuaria
- Indica cuándo recomendar consulta médica profesional
- Historial guardado y privado

**Tecnología:** Google Gemini 1.5 Flash API (gratis).

---

## 13. Reporte médico PDF

Genera un PDF descargable que incluye:

- Historial menstrual
- Síntomas frecuentes
- Relaciones sexuales registradas
- Método anticonceptivo
- Patrones identificados

Ideal para llevar a consultas ginecológicas.

**Configurable:** rango de fechas (1 mes, 3 meses, 6 meses, personalizado).

---

## 14. Modo discreto

Cuando está activado, las notificaciones no muestran información sensible.

**Ejemplo:**

- **Notificación normal:** "Toma de anticonceptivo"
- **Notificación en modo discreto:** "Tienes una actividad pendiente"

Protege la privacidad de la usuaria en entornos públicos o con personas alrededor.

---

## 15. Suscripción y monetización

- **Prueba gratuita:** 3 meses con acceso completo a funciones premium
- **Plan premium:** Mensual o anual
- **Funciones premium:** Jardín virtual, consejera virtual, reporte PDF, predicciones avanzadas
- **Funciones gratuitas:** Calendario básico, registro de menstruación, síntomas básicos

Ver [10-monetizacion-pagos.md](10-monetizacion-pagos.md) para más detalle.
