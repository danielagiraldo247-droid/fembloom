# 🌸 FemBloom

**Plataforma web de bienestar menstrual, fertilidad y planificación familiar**

[![Vercel](https://img.shields.io/badge/Vercel-Live-success)](https://fembloom.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E)](https://supabase.com)
[![Gemini](https://img.shields.io/badge/Google-Gemini%20AI-orange)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-Academic-pink)](#)

> Tu compañera virtual para acompañarte en cada fase de tu ciclo menstrual.

---

## 🚀 Demo en vivo

👉 **https://fembloom.vercel.app**

---

## 💡 ¿Qué es FemBloom?

FemBloom **no es un dashboard**. Es una **agenda íntima** que se siente como una amiga que te acompaña.

A diferencia de las apps frías y clínicas, FemBloom:

- 💕 Te habla con cariño, no con términos médicos
- 🌷 Tiene un jardín virtual que florece con tu constancia
- 💬 Tiene a Bloom, una consejera con IA real
- 📅 Calcula tu ciclo y te avisa
- 🤫 Tiene modo discreto para tu privacidad
- 📝 Tiene un diario emocional solo para ti
- 📄 Genera reportes PDF para tu ginecóloga

---

## ✨ Funcionalidades principales

### 🏠 Agenda personalizada
Tu saludo dinámico: *"Hola Daniela, día 14 de tu ciclo, te encuentras en tu ventana fértil 🌷"*

### 📅 Calendario inteligente
Cuadrícula visual con tu ciclo en colores + modal con 5 secciones para registrar.

### 🤕 Mapa corporal interactivo
Toca la silueta femenina para registrar síntomas por zona del cuerpo.

### 💬 Consejera con IA (Bloom)
Chat real con Google Gemini 2.0 que conoce tu ciclo.

### 🌷 Jardín virtual
Tu planta crece en 5 etapas + 7 tipos de flores únicas por cada ciclo completo.

### 🏆 10 logros desbloqueables
Sistema de gamificación que premia tu constancia.

### 📖 15 artículos educativos
"Conócete" — Contenido sobre ciclo, fertilidad, anticonceptivos y bienestar.

### 📝 Diario emocional privado
Espacio íntimo encriptado con tus reflexiones.

### 💊 Centro de planificación familiar
6 métodos anticonceptivos con recordatorios personalizados.

### 📊 Historiales completos
Ciclos, síntomas, ánimo, relaciones organizados visualmente.

### 📄 Reportes médicos PDF
Genera y descarga tu historial para llevar a consulta.

### 💎 Sistema de suscripción
3 meses gratis + planes mensual y anual con Wompi (Nequi/PSE/Tarjeta).

### 🔒 Privacidad total
- Modo discreto en notificaciones
- Exportación de datos en JSON
- Eliminación completa de cuenta
- Row Level Security en todas las tablas

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|---|---|
| **Frontend** | Next.js 16 + TypeScript + Tailwind CSS |
| **Backend** | Next.js API Routes |
| **Base de datos** | PostgreSQL (Supabase) |
| **Autenticación** | Supabase Auth (Email + Google OAuth) |
| **IA** | Google Gemini 2.0 Flash |
| **PDF** | @react-pdf/renderer |
| **Pagos** | Wompi (Bancolombia) |
| **Despliegue** | Vercel |
| **Animaciones** | Framer Motion |
| **Iconos** | Lucide React |
| **Tipografías** | Quicksand + Caveat (Google Fonts) |

---

## 📊 Cumplimiento de requerimientos

| Tipo | Cumplidos | Total | % |
|---|---|---|---|
| Funcionales | 44 | 45 | 97.8% |
| No Funcionales | 19 | 19 | 100% |
| **TOTAL** | **63** | **64** | **98.4%** |

> Ver detalle en [docs/CHECKLIST_REQUERIMIENTOS.md](docs/CHECKLIST_REQUERIMIENTOS.md)

---

## 📚 Documentación completa

| Documento | Para qué sirve |
|---|---|
| [ENTREGA_FINAL.md](docs/ENTREGA_FINAL.md) | Resumen ejecutivo del proyecto |
| [MANUAL_USUARIA.md](docs/MANUAL_USUARIA.md) | Guía paso a paso de cómo usar la app |
| [CHECKLIST_REQUERIMIENTOS.md](docs/CHECKLIST_REQUERIMIENTOS.md) | Estado de los 64 RF y RNF |
| [GUIA_INSTALACION.md](docs/GUIA_INSTALACION.md) | Cómo replicar el proyecto |
| [01-idea-proyecto.md](docs/01-idea-proyecto.md) | Visión y filosofía de diseño |
| [02-stack-tecnologico.md](docs/02-stack-tecnologico.md) | Justificación del stack |
| [03-modulos-funcionalidades.md](docs/03-modulos-funcionalidades.md) | Detalle de cada módulo |
| [04-requerimientos-funcionales.md](docs/04-requerimientos-funcionales.md) | 45 RF documentados |
| [05-requerimientos-no-funcionales.md](docs/05-requerimientos-no-funcionales.md) | 19 RNF documentados |
| [06-roadmap-fases.md](docs/06-roadmap-fases.md) | Plan de desarrollo |
| [07-diseno-visual.md](docs/07-diseno-visual.md) | Paleta y tipografías |
| [08-modelo-datos-preliminar.md](docs/08-modelo-datos-preliminar.md) | Esquema de base de datos |
| [09-jardin-virtual.md](docs/09-jardin-virtual.md) | Mecánica del jardín |
| [10-monetizacion-pagos.md](docs/10-monetizacion-pagos.md) | Modelo de negocio |

---

## 🚀 Cómo correr el proyecto

### Requisitos
- Node.js 20+
- Cuenta Supabase
- API key de Gemini

### Pasos

```bash
# 1. Clonar
git clone https://github.com/danielagiraldo247-droid/fembloom.git
cd fembloom

# 2. Instalar
npm install

# 3. Configurar variables
cp .env.example .env.local
# (llenar con tus claves reales)

# 4. Correr
npm run dev

# 5. Abrir
# http://localhost:3000
```

> Ver guía completa en [docs/GUIA_INSTALACION.md](docs/GUIA_INSTALACION.md)

---

## 🎨 Identidad visual

### Paleta
| Color | Hex | Uso |
|---|---|---|
| 🌸 Rosa pétalo | `#F8C9D3` | Principal |
| 💜 Lila bruma | `#D9C2E9` | Folicular |
| 🌿 Verde menta | `#C5E7D4` | Bienestar |
| 🍑 Crema | `#FDF6F0` | Fondo |
| 🌹 Rosa coral | `#F4A6B0` | Menstruación |
| 💫 Lavanda | `#B89DC9` | Ovulación |
| 🌱 Verde fértil | `#9CCFB1` | Ventana fértil |
| 🤎 Marrón cacao | `#7D5A4F` | Texto |

### Tipografías
- **Quicksand** — Cuerpo (cálido, redondeado)
- **Caveat** — Acentos caligráficos (saludos, títulos)

---

## 🔒 Seguridad

- ✅ HTTPS/TLS 1.3 obligatorio
- ✅ Row Level Security (RLS) en TODAS las tablas
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Tokens JWT con expiración
- ✅ Cookies HTTP-only
- ✅ OAuth 2.0 con PKCE para Google
- ✅ Validación dual (frontend + backend)
- ✅ Variables de entorno separadas
- ✅ Encriptación en reposo

---

## 👩‍💻 Desarrolladora

**Daniela Giraldo**
📧 danielagiraldo247@gmail.com
🐙 [@danielagiraldo247-droid](https://github.com/danielagiraldo247-droid)

Proyecto académico individual

---

## 📜 Licencia

Proyecto académico — Todos los derechos reservados.

---

_Hecho con cariño 🌸_
