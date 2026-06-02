# 04 - Requerimientos Funcionales

Lista completa de los 45 requerimientos funcionales de FemBloom.

---

## RF-001 — Registro de usuarios

**Descripción:** El sistema debe permitir a nuevas usuarias crear una cuenta proporcionando nombre, correo electrónico y contraseña.

**Historia de usuario:**
- **Como** usuaria nueva
- **Quiero** registrarme en FemBloom con mi nombre, correo y contraseña
- **Para** crear mi cuenta personal y comenzar el seguimiento de mi bienestar menstrual

**Criterios de aceptación:**
- La usuaria puede ingresar nombre completo, correo electrónico y contraseña
- El sistema valida que el correo no esté registrado previamente
- La contraseña requiere mínimo 8 caracteres con letras y números
- El sistema envía un correo de verificación al registrarse
- La cuenta se activa únicamente tras verificar el correo
- Se activa automáticamente la prueba gratuita de 3 meses

**Prioridad:** Alta

---

## RF-002 — Inicio de sesión con correo y contraseña

**Descripción:** Permitir a las usuarias registradas iniciar sesión con correo y contraseña.

**Historia de usuario:**
- **Como** usuaria registrada
- **Quiero** iniciar sesión con mi correo electrónico y contraseña
- **Para** acceder de forma segura a mi cuenta

**Criterios de aceptación:**
- Valida credenciales correctas
- Mensaje claro si las credenciales son incorrectas
- Bloqueo temporal de 15 minutos tras 5 intentos fallidos
- Genera token JWT seguro
- Sesión activa según preferencia de la usuaria

**Prioridad:** Alta

---

## RF-003 — Inicio de sesión con Google OAuth

**Descripción:** Permitir autenticación mediante cuenta de Google.

**Historia de usuario:**
- **Como** usuaria con cuenta de Google
- **Quiero** iniciar sesión en FemBloom usando mi cuenta de Google
- **Para** acceder de forma rápida sin contraseña adicional

**Criterios de aceptación:**
- Botón "Continuar con Google" en pantalla de inicio
- Redirección correcta al flujo OAuth
- Crea o recupera cuenta tras autenticación exitosa
- Obtiene nombre y correo del perfil de Google
- Activa prueba gratuita en primer ingreso

**Prioridad:** Alta

---

## RF-004 — Recuperación de contraseña

**Descripción:** Permitir restablecer la contraseña vía correo electrónico.

**Historia de usuario:**
- **Como** usuaria que olvidó su contraseña
- **Quiero** solicitar un enlace de recuperación
- **Para** restablecer mi contraseña y recuperar acceso

**Criterios de aceptación:**
- Solicitud desde pantalla de inicio de sesión
- Correo con enlace en menos de 2 minutos
- Enlace expira en 24 horas
- Enlace de uso único
- Permite ingresar y confirmar nueva contraseña
- Muestra confirmación tras cambio exitoso

**Prioridad:** Alta

---

## RF-005 — Gestión del perfil de usuaria

**Descripción:** Permitir visualizar y actualizar información personal del perfil.

**Historia de usuario:**
- **Como** usuaria registrada
- **Quiero** editar mi perfil en cualquier momento
- **Para** mantener mi información actualizada

**Criterios de aceptación:**
- Editar nombre, foto y fecha de nacimiento
- Cambios se guardan y reflejan de inmediato
- Foto acepta JPG/PNG hasta 5 MB
- Cambio de contraseña desde el perfil
- Confirmación visual al guardar

**Prioridad:** Media

---

## RF-006 — Registro de datos del ciclo menstrual

**Descripción:** Ingresar datos iniciales: duración promedio del ciclo, duración de menstruación, fecha del último período.

**Criterios de aceptación:**
- Fecha de inicio del último período
- Duración del ciclo (21-45 días)
- Duración de la menstruación (2-10 días)
- Base para todas las predicciones
- Editable desde el perfil

**Prioridad:** Alta

---

## RF-007 — Calendario menstrual inteligente

**Descripción:** Calendario visual interactivo con fases del ciclo, menstruación, ovulación y ventana fértil claramente marcadas.

**Criterios de aceptación:**
- Vista mensual con navegación
- Días de menstruación resaltados
- Ovulación y ventana fértil marcadas
- Tap en día muestra registros
- Diseño visual amigable, NO dashboard

**Prioridad:** Alta

---

## RF-008 — Registro de días de menstruación

**Descripción:** Marcar en el calendario los días de menstruación.

**Criterios de aceptación:**
- Tap para marcar/desmarcar día
- Registra fecha de inicio y fin
- Resaltado visual en calendario
- Recalcula predicciones automáticamente
- Editable

**Prioridad:** Alta

---

## RF-009 — Registro de intensidad del flujo

**Descripción:** Registrar la intensidad del flujo con escala visual.

**Criterios de aceptación:**
- 4 niveles: manchado, leve, moderado, intenso
- Selección con íconos visuales (gotas)
- Vinculado al día específico
- Editable
- Incluido en reporte médico

**Prioridad:** Media

---

## RF-010 — Registro de síntomas

**Descripción:** Registrar síntomas físicos del catálogo o personalizados.

**Criterios de aceptación:**
- Catálogo: cólicos, dolor de cabeza, náuseas, hinchazón, acné, fatiga, etc.
- Selección múltiple por día
- Síntomas personalizados permitidos
- Asociados al día del calendario
- Incluidos en historial y reporte

**Prioridad:** Alta

---

## RF-011 — Registro de estados de ánimo

**Descripción:** Registrar el estado emocional diario.

**Criterios de aceptación:**
- Mínimo 8 estados: alegre, triste, irritable, ansiosa, tranquila, sensible, energética, cansada
- Múltiples estados por día
- Vinculado al día y fase del ciclo
- Privado y editable
- Incluido en historial emocional

**Prioridad:** Media

---

## RF-012 — Registro de notas personales

**Descripción:** Escribir notas de texto libre por día.

**Criterios de aceptación:**
- Añadir, editar y eliminar notas
- Hasta 500 caracteres por entrada
- Vinculadas al día correspondiente
- Completamente privadas
- Visibles en historial y diario

**Prioridad:** Media

---

## RF-013 — Registro de relaciones sexuales

**Descripción:** Registrar fechas de relaciones sexuales de forma privada.

**Criterios de aceptación:**
- Marcado en el calendario
- Discreto y privado
- Vinculado al día específico
- Usado en cálculo de probabilidad de embarazo
- Editable y eliminable

**Prioridad:** Media

---

## RF-014 — Registro de relaciones con protección

**Descripción:** Indicar si la relación fue con método de protección.

**Criterios de aceptación:**
- Opción "con protección" al registrar
- Diferenciación visual en historial
- Considerado en cálculo de embarazo
- Tipo de protección opcional
- Privado

**Prioridad:** Media

---

## RF-015 — Registro de relaciones sin protección

**Descripción:** Indicar relación sin método y mostrar alertas informativas.

**Criterios de aceptación:**
- Opción "sin protección"
- Aviso informativo según fase del ciclo
- Alerta de mayor riesgo si está en ventana fértil
- Mayor peso en cálculo de probabilidad
- Tono empático, no alarmista

**Prioridad:** Media

---

## RF-016 — Predicción de próxima menstruación

**Descripción:** Calcular fecha estimada del próximo período.

**Criterios de aceptación:**
- Visible en calendario y pantalla principal
- Basada en promedio de ciclos pasados
- Actualizada al registrar nuevo período
- Rango probable (+/- 2 días)
- Resaltado visual claro

**Prioridad:** Alta

---

## RF-017 — Predicción de ovulación

**Descripción:** Estimar fecha probable de ovulación.

**Criterios de aceptación:**
- Marcada en el calendario
- Ajustada según duración individual del ciclo
- Ícono o color diferenciado
- Recalculada con nuevos períodos
- Indica nivel de fertilidad

**Prioridad:** Alta

---

## RF-018 — Predicción de ventana fértil

**Descripción:** Visualizar rango de días de mayor fertilidad.

**Criterios de aceptación:**
- Rango de 5-7 días por ciclo
- Visualmente diferenciados
- Incluye días previos a ovulación y el día mismo
- Actualizada por ciclo
- Indicador de nivel (alta, media, baja)

**Prioridad:** Alta

---

## RF-019 — Cálculo estimado de probabilidad de embarazo

**Descripción:** Calcular probabilidad de embarazo según ciclo, ovulación, relaciones y método.

**Criterios de aceptación:**
- Indicador: baja, media, alta
- Considera fase del ciclo, relaciones sin protección en ventana fértil
- Presentación clara y empática
- Nota informativa: es estimativo, no diagnóstico
- Exclusivo de suscripción/prueba activa

**Prioridad:** Media

---

## RF-020 — Mapa interactivo de síntomas

**Descripción:** Ilustración corporal femenina interactiva para registrar síntomas por zona del cuerpo.

**Criterios de aceptación:**
- Ilustración femenina dividida en zonas: cabeza, abdomen, espalda, pecho, piernas
- Tap muestra síntomas asociados a la zona
- Síntomas vinculados al día y zona
- Diseño inclusivo y amigable
- Aparecen también en historial general

**Prioridad:** Media

---

## RF-021 — Diario emocional privado

**Descripción:** Espacio privado de escritura libre para emociones y reflexiones.

**Criterios de aceptación:**
- Entradas vinculadas a fechas
- Texto enriquecido básico (negrita, cursiva, listas)
- Encriptado en almacenamiento
- Editable y eliminable
- Búsqueda por fecha

**Prioridad:** Media

---

## RF-022 — Jardín virtual del ciclo

**Descripción:** Representación visual de un jardín que crece según fase del ciclo y constancia de uso.

**Criterios de aceptación:**
- Plantas/flores en estados según fase
- Crece con días consecutivos de uso
- Interacción muestra mensajes motivadores
- Transiciones suaves
- En pantalla principal

**Prioridad:** Baja

---

## RF-023 — Sistema de logros

**Descripción:** Recompensas visuales por constancia.

**Criterios de aceptación:**
- Mínimo 10 logros desbloqueables
- Animación al desbloquear
- Visibles en el perfil
- Rastreo de rachas diarias
- Íconos atractivos y mensajes motivadores

**Prioridad:** Baja

---

## RF-024 — Centro de planificación familiar

**Descripción:** Sección dedicada a planificación con objetivo configurable.

**Criterios de aceptación:**
- Objetivo: buscar embarazo, evitar embarazo, solo seguimiento
- Recomendaciones adaptadas al objetivo
- Modificable desde configuración
- Recursos educativos relacionados
- Herramientas cambian según objetivo

**Prioridad:** Alta

---

## RF-025 — Configuración de método anticonceptivo

**Descripción:** Configurar método anticonceptivo actual.

**Criterios de aceptación:**
- Selección desde listado predefinido
- Solicita datos específicos por método
- Guardado en perfil, editable
- Adapta recordatorios al cambiar método
- Protegido por privacidad

**Prioridad:** Alta

---

## RF-026 — Gestión de métodos anticonceptivos

**Descripción:** Soporte para: pastillas, inyección, DIU, Jadelle, implante, preservativo.

**Criterios de aceptación:**
- **Pastillas:** recordatorio diario
- **Inyección:** alerta 3 días antes de renovación
- **DIU:** revisión periódica
- **Jadelle/Implante:** alerta de vencimiento 1 mes antes
- **Preservativo:** sin recordatorio periódico
- Información educativa por método

**Prioridad:** Alta

---

## RF-027 — Generación automática de recordatorios

**Descripción:** Recordatorios personalizados según método configurado.

**Criterios de aceptación:**
- Generación automática al configurar método
- Hora y frecuencia personalizables
- Respeta modo discreto
- Pausa/desactivación posible
- Confirmación al atender recordatorio

**Prioridad:** Alta

---

## RF-028 — Notificaciones inteligentes del ciclo

**Descripción:** Alertas proactivas sobre eventos del ciclo.

**Criterios de aceptación:**
- 2 días antes del inicio del período
- Inicio de ventana fértil
- Día estimado de ovulación
- Personalizable: activar/desactivar por tipo
- Tono cálido con nombre de la usuaria

**Prioridad:** Alta

---

## RF-029 — Modo discreto para notificaciones

**Descripción:** Ocultar contenido sensible en notificaciones push.

**Criterios de aceptación:**
- Activación desde configuración de privacidad
- Notificaciones genéricas: "Tienes una actividad pendiente en FemBloom"
- Contenido completo visible al abrir la app
- Aplica a todas las notificaciones
- Confirmación al activar

**Prioridad:** Media

---

## RF-030 — Modo "¿Cómo me sentiré hoy?"

**Descripción:** Predicción diaria emocional/física según fase del ciclo.

**Criterios de aceptación:**
- Predicción diaria basada en fase
- Incluye: estado probable, energía, recomendaciones
- Tono positivo y empoderador
- Actualización automática diaria
- Comparable con registro real de ánimo

**Prioridad:** Media

---

## RF-031 — Sección educativa "Conócete"

**Descripción:** Contenido educativo sobre salud menstrual.

**Criterios de aceptación:**
- Mínimo 20 artículos/guías
- Organizado por categorías
- Lenguaje claro y accesible
- Ilustraciones de apoyo
- Fecha de publicación visible

**Prioridad:** Media

---

## RF-032 — Consejera virtual

**Descripción:** Chat con IA empática para orientación.

**Criterios de aceptación:**
- Responde sobre ciclo, síntomas, fertilidad, métodos
- Personalizada con datos del ciclo
- Tono cálido, no clínico
- Recomienda consulta médica cuando aplique
- Historial privado y accesible

**Prioridad:** Media

---

## RF-033 — Generación de reportes médicos en PDF

**Descripción:** PDF descargable con historial para profesionales de salud.

**Criterios de aceptación:**
- Rango de fechas: 1 mes, 3 meses, 6 meses, personalizado
- Incluye: ciclos, duración, síntomas, ánimo, intensidad
- Descargable desde la app
- Diseño profesional y legible
- Generación en menos de 10 segundos
- Exclusivo de suscripción/prueba activa

**Prioridad:** Alta

---

## RF-034 — Consulta de historial menstrual

**Descripción:** Ver historial completo de ciclos.

**Criterios de aceptación:**
- Lista cronológica de ciclos
- Muestra: inicio, fin, duración, regularidad
- Destaca ciclos irregulares
- Filtra por rango de fechas
- Coincide con calendario

**Prioridad:** Alta

---

## RF-035 — Consulta de historial de síntomas

**Descripción:** Ver historial de síntomas con tendencias.

**Criterios de aceptación:**
- Síntomas ordenados por fecha
- Frecuencia de cada síntoma
- Filtros por tipo y fecha
- Destaca síntomas recurrentes por fase
- Incluido en reporte PDF

**Prioridad:** Media

---

## RF-036 — Consulta de historial emocional

**Descripción:** Ver historial de estados de ánimo y diario.

**Criterios de aceptación:**
- Registros ordenados cronológicamente
- Emociones más frecuentes por fase
- Filtros por estado y fecha
- Diario integrado en vista
- Opcional en reporte PDF

**Prioridad:** Media

---

## RF-037 — Gestión de privacidad

**Descripción:** Panel de control de privacidad y datos.

**Criterios de aceptación:**
- Acceso desde configuración
- Exportación de datos (JSON/CSV)
- Eliminación completa de cuenta
- Modo discreto configurable
- Política accesible y clara
- Eliminación con doble verificación

**Prioridad:** Alta

---

## RF-038 — Respaldo automático en la nube

**Descripción:** Backups automáticos periódicos.

**Criterios de aceptación:**
- Respaldo automático mínimo diario
- Incluye todos los datos de usuaria
- Restauración automática en nuevo dispositivo
- Respaldo manual disponible
- Muestra fecha del último respaldo

**Prioridad:** Alta

---

## RF-039 — Gestión de suscripciones

**Descripción:** Gestión del ciclo completo de suscripción.

**Criterios de aceptación:**
- Vista desde menú de cuenta
- Muestra: plan, vencimiento, beneficios
- Cancelación sin contactar soporte
- Activa hasta fecha pagada
- Notificación 7 y 1 día antes del vencimiento

**Prioridad:** Alta

---

## RF-040 — Activación automática de prueba gratuita (3 meses)

**Descripción:** Activación automática al registrarse.

**Criterios de aceptación:**
- Automática al completar registro
- Acceso completo a premium por 3 meses
- Fecha de vencimiento visible
- Sin requerir tarjeta de crédito
- Notificación al finalizar con opciones

**Prioridad:** Alta

---

## RF-041 — Control de vencimiento de prueba gratuita

**Descripción:** Notificar y restringir tras vencimiento.

**Criterios de aceptación:**
- Notificación 15, 7 y 1 día antes
- Restricción automática al vencer
- Funciones básicas permanecen
- Mensaje amigable de invitación a suscribirse
- No renovable; solo una vez por cuenta

**Prioridad:** Alta

---

## RF-042 — Gestión de membresía premium

**Descripción:** Adquirir, gestionar y renovar membresía.

**Criterios de aceptación:**
- Planes visibles (mensual, anual) con precios
- Compra segura desde plataforma
- Activación inmediata tras pago
- Gestionable desde panel
- Renovación automática opcional

**Prioridad:** Alta

---

## RF-043 — Consulta del estado de suscripción

**Descripción:** Consultar estado actual de suscripción.

**Criterios de aceptación:**
- Muestra: plan, vencimiento, días restantes
- Indica funciones disponibles
- Estado "Vencida" con opción de renovar
- Actualización en tiempo real
- Acceso a gestión de pagos

**Prioridad:** Media

---

## RF-044 — Gestión de pagos

**Descripción:** Módulo seguro de pagos con Wompi.

**Criterios de aceptación:**
- Mínimo 2 métodos: tarjeta y pasarela digital (Nequi, PSE)
- Proceso seguro (HTTPS, tokenización)
- Confirmación por correo y en app
- Comprobante descargable
- Mensajes claros en caso de fallo
- Sin almacenar datos de tarjeta

**Prioridad:** Alta

---

## RF-045 — Restricción de funciones premium

**Descripción:** Bloqueo automático al vencer suscripción.

**Criterios de aceptación:**
- Bloqueo automático sin acción manual
- Funciones básicas permanecen
- Mensaje amigable al intentar usar premium
- Bloqueo inmediato al vencimiento
- Restablecimiento inmediato tras renovación

**Prioridad:** Alta
