# 02 - Stack Tecnológico

## Stack final elegido

| Capa | Tecnología | Costo |
|---|---|---|
| Frontend + Backend | **Next.js 14** (App Router) | Gratis |
| Base de datos + Auth | **Supabase** | Gratis (tier free) |
| IA Consejera Virtual | **Google Gemini 1.5 Flash API** | Gratis (1,500 req/día) |
| Estilos | **Tailwind CSS + shadcn/ui** | Gratis |
| Animaciones | **Framer Motion + SVG** | Gratis |
| PDF | **React-PDF** | Gratis |
| Despliegue | **Vercel** | Gratis |
| Pagos | **Wompi** (Colombia) | Comisión por transacción |
| Notificaciones | **Web Push API + Service Workers** (PWA) | Gratis |

## Justificación de cada elección

### Next.js 14 (en lugar de Next.js + NestJS)

- Maneja **frontend y backend en un solo proyecto**
- Reduce complejidad para una desarrolladora individual
- Las **API Routes** reemplazan la necesidad de un backend NestJS separado
- App Router permite SSR, SSG y rutas dinámicas con facilidad
- Deploy con un solo clic en Vercel

### Supabase (en lugar de PostgreSQL puro)

- **PostgreSQL incluido** y administrado en la nube
- **Autenticación lista** (email/password y Google OAuth)
- **Storage de archivos** (fotos de perfil, etc.)
- **Realtime** para actualizaciones en vivo si se necesitan
- **Row Level Security** para proteger datos sensibles automáticamente
- **Cero configuración de servidores**
- Plan gratuito generoso: 500 MB de base de datos y 1 GB de almacenamiento

### Google Gemini API (en lugar de IA local)

- **Completamente gratis** hasta 1,500 solicitudes diarias
- 15 solicitudes por minuto
- No requiere infraestructura propia
- Calidad de respuesta excelente
- Integración en 5 líneas de código
- La IA local (Ollama, LM Studio) **no es viable** para una web app porque cada usuaria tendría que correrla en su computador

### Tailwind CSS + shadcn/ui

- Desarrollo de UI ultra rápido
- Componentes pre-construidos accesibles
- Personalizables completamente con la paleta de FemBloom
- Diseño responsive con utilidades

### Framer Motion

- Animaciones suaves y profesionales
- Ideal para el crecimiento del jardín virtual
- API declarativa fácil de aprender

### Wompi (Colombia)

- Acepta **Nequi, PSE, tarjetas débito y crédito**
- Es el estándar colombiano para startups
- Sin mensualidad, solo comisión por transacción exitosa
- Dashboard gratuito para ver cobros
- Integración sencilla en JavaScript

### Vercel

- Despliegue automático conectado a GitHub
- Optimizado para Next.js (es del mismo equipo)
- HTTPS automático
- CDN global incluido
- Plan gratuito generoso

## Estructura del proyecto

```
fembloom/
├── app/                    # Páginas (App Router de Next.js)
│   ├── (auth)/             # Login, registro, recuperar contraseña
│   ├── (app)/              # Páginas internas autenticadas
│   │   ├── agenda/         # Página principal tipo agenda
│   │   ├── calendario/     # Calendario inteligente
│   │   ├── jardin/         # Jardín virtual
│   │   ├── diario/         # Diario emocional
│   │   ├── conocete/       # Sección educativa
│   │   ├── consejera/      # Chat con IA
│   │   ├── perfil/         # Gestión de perfil
│   │   └── suscripcion/    # Planes y pagos
│   └── api/                # Backend (API Routes)
│       ├── consejera/      # Endpoint para Gemini
│       ├── reportes/       # Generación de PDF
│       └── webhooks/       # Webhooks de Wompi
├── components/             # Componentes React reutilizables
│   ├── ui/                 # Componentes de shadcn/ui
│   ├── calendario/         # Componentes del calendario
│   ├── jardin/             # Componentes del jardín virtual
│   └── shared/             # Componentes compartidos
├── lib/                    # Funciones y utilidades
│   ├── supabase/           # Cliente Supabase
│   ├── ciclo/              # Lógica de cálculo del ciclo
│   ├── gemini/             # Cliente Gemini
│   └── utils/              # Helpers
├── public/                 # Archivos estáticos
│   ├── flores/             # SVG del jardín
│   ├── iconos/             # Iconos personalizados
│   └── ilustraciones/      # Ilustraciones de la app
├── styles/                 # Estilos globales
└── types/                  # Tipos TypeScript
```

## Cuentas que necesitas crear

1. **GitHub** — Para el código (gratis)
2. **Supabase** — supabase.com (gratis)
3. **Vercel** — vercel.com (gratis)
4. **Google AI Studio** — aistudio.google.com (gratis, obtener API key de Gemini)
5. **Wompi** — wompi.co (gratis registrarse, comisión por venta)

## Herramientas locales

- **Node.js 20+** — nodejs.org
- **VS Code** — code.visualstudio.com (editor recomendado)
- **Git** — git-scm.com (control de versiones)
