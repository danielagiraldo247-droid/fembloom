# 🌸 FemBloom

**Plataforma web de bienestar menstrual, fertilidad y planificación familiar**

FemBloom es una aplicación web que acompaña a la mujer durante todas las etapas de su ciclo menstrual con un enfoque humanizado, emocional y visualmente relajante. A diferencia de las apps tipo "dashboard", FemBloom se siente como una **agenda digital personalizada** y una compañera virtual para el bienestar femenino.

---

## 🚀 Arrancar el proyecto localmente

### Requisitos previos

- Node.js 20 o superior
- Cuenta de Supabase (variables ya configuradas en `.env.local`)

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar el servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# → http://localhost:3000
```

---

## 🛠️ Tecnologías

- **Next.js 15** (App Router) — frontend + backend
- **Supabase** — base de datos PostgreSQL + autenticación
- **Tailwind CSS** — estilos
- **Framer Motion** — animaciones
- **Lucide Icons** — iconografía suave
- **Google Gemini** — consejera virtual con IA
- **Vercel** — despliegue

---

## 📂 Estructura del proyecto

```
fembloom/
├── app/                    # Páginas (Next.js App Router)
│   ├── layout.tsx          # Layout raíz con tipografías
│   ├── page.tsx            # Página de bienvenida
│   └── globals.css         # Estilos globales
├── components/             # Componentes React reutilizables
├── lib/                    # Utilidades y clientes
│   ├── supabase/           # Cliente de Supabase
│   └── utils.ts            # Helpers
├── public/                 # Archivos estáticos
├── docs/                   # Documentación del proyecto
└── .env.local              # Variables secretas (NO subir a Git)
```

---

## 📚 Documentación completa

Toda la documentación del proyecto está en la carpeta `docs/`:

| Documento | Contenido |
|---|---|
| [01 - Idea del proyecto](docs/01-idea-proyecto.md) | Concepto, visión, público objetivo |
| [02 - Stack tecnológico](docs/02-stack-tecnologico.md) | Tecnologías y justificación |
| [03 - Módulos](docs/03-modulos-funcionalidades.md) | Funcionalidades detalladas |
| [04 - Requerimientos funcionales](docs/04-requerimientos-funcionales.md) | 45 RF |
| [05 - Requerimientos no funcionales](docs/05-requerimientos-no-funcionales.md) | 19 RNF |
| [06 - Roadmap](docs/06-roadmap-fases.md) | Plan por fases |
| [07 - Diseño visual](docs/07-diseno-visual.md) | Paleta y tipografías |
| [08 - Modelo de datos](docs/08-modelo-datos-preliminar.md) | Tablas de la base de datos |
| [09 - Jardín virtual](docs/09-jardin-virtual.md) | Mecánica de gamificación |
| [10 - Monetización](docs/10-monetizacion-pagos.md) | Suscripción y pagos |

---

## 🎨 Paleta de colores

| Color | Hex | Uso |
|---|---|---|
| Rosa pétalo | `#F8C9D3` | Principal, menstruación |
| Lila bruma | `#D9C2E9` | Fase folicular |
| Verde menta | `#C5E7D4` | Bienestar |
| Crema | `#FDF6F0` | Fondo |
| Marrón cacao | `#7D5A4F` | Texto |

---

## 👩‍💻 Desarrolladora

**Daniela Giraldo** — Proyecto académico individual

---

_Hecho con cariño 🌸_
