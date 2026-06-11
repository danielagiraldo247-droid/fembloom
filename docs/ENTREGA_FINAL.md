# 🌸 FemBloom — Documento de Entrega Final

**Plataforma web de bienestar menstrual, fertilidad y planificación familiar**

---

## 📋 Información del proyecto

| Dato | Valor |
|---|---|
| **Nombre del proyecto** | FemBloom |
| **Tipo** | Aplicación web (PWA) |
| **Desarrolladora** | Daniela Giraldo |
| **Stack** | Next.js 16 + Supabase + Gemini AI + Tailwind + Wompi |
| **Despliegue público** | https://fembloom.vercel.app |
| **Repositorio** | https://github.com/danielagiraldo247-droid/fembloom |
| **Cumplimiento RF** | 44 / 45 (98%) |
| **Cumplimiento RNF** | 19 / 19 (100%) |

---

## 🎯 Resumen ejecutivo

**FemBloom** es una aplicación web que acompaña a las mujeres durante todas las etapas de su ciclo menstrual con un enfoque humanizado, emocional y visualmente relajante. A diferencia de las apps tipo "dashboard" frías, FemBloom se siente como una **agenda digital personalizada** y una **compañera virtual** para el bienestar femenino.

### Propuesta de valor única

1. **Agenda personalizada** en lugar de dashboard frío
2. **Jardín virtual** que crece con la constancia de uso
3. **Consejera virtual con IA real** (Google Gemini)
4. **Mapa corporal interactivo** para registrar síntomas
5. **Modo discreto** para proteger la privacidad
6. **Reporte médico PDF** para llevar a consultas
7. **Predicciones inteligentes** del ciclo
8. **Modo "¿Cómo me sentiré hoy?"** basado en fase hormonal

---

## ✅ Módulos implementados

| Módulo | Estado | Ubicación |
|---|---|---|
| 1. Autenticación (email + Google OAuth) | ✅ Funcional | `/login`, `/registro` |
| 2. Recuperación de contraseña | ✅ Funcional | `/recuperar` |
| 3. Onboarding inicial | ✅ Funcional | `/onboarding` |
| 4. Página principal "Agenda" | ✅ Funcional | `/agenda` |
| 5. Calendario inteligente | ✅ Funcional | `/calendario` |
| 6. Mapa corporal de síntomas | ✅ Funcional | Modal del calendario |
| 7. Diario emocional privado | ✅ Funcional | `/diario` |
| 8. Jardín virtual con 10 logros | ✅ Funcional | `/jardin` |
| 9. Sección educativa Conócete | ✅ Funcional (15 artículos) | `/conocete` |
| 10. Consejera virtual con IA | ✅ Funcional (Gemini 2.0) | `/consejera` |
| 11. Centro de planificación familiar | ✅ Funcional (6 métodos) | `/planificacion` |
| 12. Reportes médicos PDF | ✅ Funcional | `/reportes` |
| 13. Suscripción y pagos | ✅ Funcional (simulado Wompi) | `/suscripcion` |
| 14. Historiales completos | ✅ Funcional | `/historiales` |
| 15. Perfil y gestión de cuenta | ✅ Funcional | `/perfil` |
| 16. Modo discreto | ✅ Funcional | Perfil |
| 17. Exportación de datos | ✅ Funcional (JSON) | Perfil |
| 18. Eliminación de cuenta | ✅ Funcional | Perfil |

---

## 🛠️ Arquitectura técnica

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Tipografías:** Quicksand + Caveat (Google Fonts)
- **Animaciones:** Framer Motion + CSS keyframes
- **Iconos:** Lucide React
- **PDF:** @react-pdf/renderer

### Backend
- **API Routes:** Next.js (incluido en el mismo proyecto)
- **Base de datos:** PostgreSQL (Supabase)
- **Autenticación:** Supabase Auth (Email + Google OAuth)
- **Seguridad:** Row Level Security (RLS) en TODAS las tablas
- **Sesiones:** Cookies HTTP-only + JWT

### IA
- **Modelo:** Google Gemini 2.0 Flash
- **Endpoint:** `/api/consejera`
- **Personalización:** Contexto con datos de la usuaria

### Pagos
- **Pasarela:** Wompi (Bancolombia)
- **Métodos soportados:** Nequi, PSE, Tarjetas crédito/débito, Daviplata
- **Webhook:** `/api/webhooks/wompi`

### Despliegue
- **Hosting:** Vercel (gratis tier hobby)
- **CDN:** Incluido en Vercel
- **HTTPS:** Automático
- **CI/CD:** Auto-deploy en cada push a `main`

---

## 🗄️ Modelo de datos (15 tablas)

1. `profiles` — Datos extendidos del usuario
2. `cycle_settings` — Configuración del ciclo
3. `cycles` — Historial de ciclos
4. `daily_logs` — Registros diarios
5. `symptoms` — Síntomas por día
6. `moods` — Estados de ánimo
7. `relations` — Relaciones sexuales registradas
8. `contraceptive_methods` — Método anticonceptivo activo
9. `reminders` — Recordatorios programados
10. `journal_entries` — Diario emocional privado
11. `garden_progress` — Progreso del jardín virtual
12. `achievements` — Logros desbloqueados
13. `chat_messages` — Conversaciones con la consejera
14. `subscriptions` — Historial de suscripciones
15. `payments` — Historial de pagos

**Todas tienen Row Level Security activada.** Cada usuaria solo accede a sus propios datos.

---

## 🎨 Identidad visual

### Paleta de colores
- **Rosa pétalo:** `#F8C9D3` (color principal)
- **Lila bruma:** `#D9C2E9` (fase folicular)
- **Verde menta:** `#C5E7D4` (bienestar)
- **Crema:** `#FDF6F0` (fondo)
- **Rosa coral:** `#F4A6B0` (menstruación)
- **Lavanda:** `#B89DC9` (ovulación)
- **Verde fertilidad:** `#9CCFB1` (ventana fértil)
- **Marrón cacao:** `#7D5A4F` (texto principal)

### Filosofía de diseño
- Esquinas redondeadas (16px-24px)
- Sombras suaves (no duras)
- Animaciones lentas y empáticas
- Tono cálido y humanizado
- **NO se ve como dashboard** — se ve como agenda íntima

---

## 🔒 Seguridad y privacidad

### Implementado
- ✅ HTTPS automático (TLS 1.3)
- ✅ Row Level Security en TODAS las tablas
- ✅ Contraseñas con bcrypt (Supabase Auth)
- ✅ JWT tokens con expiración
- ✅ Cookies HTTP-only
- ✅ Variables de entorno separadas (`.env.local` NO en Git)
- ✅ Validación de inputs en frontend y backend
- ✅ Protección CSRF en formularios
- ✅ CORS estricto
- ✅ Datos encriptados en reposo (PostgreSQL Supabase)

### Privacidad
- ✅ Modo discreto en notificaciones
- ✅ Exportación de datos en JSON
- ✅ Eliminación completa de cuenta con doble confirmación
- ✅ Cascade delete en todas las tablas
- ✅ Sin tracking ni anuncios

---

## 📊 Métricas de cumplimiento

### Requerimientos Funcionales: 44/45 (97.8%)

| Categoría | Cumplidos |
|---|---|
| Autenticación (RF-001 a 005) | 5/5 ✅ |
| Ciclo y registros (RF-006 a 015) | 10/10 ✅ |
| Predicciones (RF-016 a 019) | 4/4 ✅ |
| Bienestar (RF-020 a 023) | 4/4 ✅ |
| Planificación (RF-024 a 027) | 4/4 ✅ |
| Notificaciones (RF-028, 029) | 1/2 ⚠️ |
| Educación y emocional (RF-030 a 032) | 3/3 ✅ |
| Reportes (RF-033) | 1/1 ✅ |
| Historiales (RF-034 a 036) | 3/3 ✅ |
| Privacidad (RF-037, 038) | 2/2 ✅ |
| Suscripción (RF-039 a 045) | 7/7 ✅ |

> **Único requerimiento pendiente:** RF-028 (Push notifications PWA) — Documentado como mejora futura por complejidad técnica (Service Workers + suscripciones push del navegador).

### Requerimientos No Funcionales: 19/19 (100%)

Todos cumplidos: seguridad, privacidad, rendimiento, disponibilidad, escalabilidad, compatibilidad, accesibilidad, usabilidad, mantenibilidad, respaldo, tiempo de respuesta, integridad, experiencia visual amigable, diseño responsive, arquitectura tecnológica.

---

## 🚀 Cómo probar la app en vivo

### Opción 1: Visitar la app desplegada

👉 **https://fembloom.vercel.app**

### Opción 2: Correr localmente

```bash
# 1. Clonar el repositorio
git clone https://github.com/danielagiraldo247-droid/fembloom.git
cd fembloom

# 2. Instalar dependencias
npm install

# 3. Crear .env.local con las claves
cp .env.example .env.local
# (llenar con claves reales de Supabase y Gemini)

# 4. Arrancar el servidor
npm run dev

# 5. Abrir en navegador
# http://localhost:3000
```

---

## 📞 Contacto

**Desarrolladora:** Daniela Giraldo
**Email:** danielagiraldo247@gmail.com
**Proyecto:** Académico individual

---

## 📜 Licencia

Proyecto académico — Todos los derechos reservados.

---

_FemBloom — Tu compañera de bienestar menstrual 🌸_
