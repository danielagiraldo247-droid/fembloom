# 🛠️ Guía de Instalación — FemBloom

Cómo replicar el proyecto FemBloom en otra máquina o servidor.

---

## 📋 Requisitos previos

| Software | Versión mínima | Dónde descargar |
|---|---|---|
| Node.js | 20.x | https://nodejs.org |
| Git | 2.x | https://git-scm.com |
| Cuenta GitHub | — | https://github.com |
| Cuenta Supabase | — | https://supabase.com |
| Cuenta Vercel | — | https://vercel.com |
| Cuenta Google Cloud | — | https://console.cloud.google.com |
| API Key Gemini | — | https://aistudio.google.com/apikey |
| Cuenta Wompi (opcional) | — | https://wompi.co |

---

## 🚀 Instalación local en 7 pasos

### 1. Clonar el repositorio

```bash
git clone https://github.com/danielagiraldo247-droid/fembloom.git
cd fembloom
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Supabase

1. Crea un proyecto nuevo en https://supabase.com
2. Espera 2 minutos a que se aprovisione
3. Ve a **Settings → API** y copia:
   - `Project URL`
   - `anon public` key
   - `service_role` key (mantenla secreta)

### 4. Crear las tablas en Supabase

Ve a **SQL Editor → New query** y ejecuta el SQL de:

- `docs/sql/01-profiles-trigger.sql` (perfil + trigger inicial)
- `docs/sql/02-cycle-tables.sql` (ciclo + registros + jardín + logros)
- `docs/sql/03-subscriptions.sql` (suscripciones + pagos)

### 5. Configurar Google OAuth en Supabase

1. En Google Cloud Console crea credenciales OAuth 2.0
2. Pasos detallados: https://supabase.com/docs/guides/auth/social-login/auth-google
3. En Supabase → Authentication → Providers → Google: pega Client ID y Secret
4. Activa el toggle

### 6. Crear `.env.local`

Copia el archivo de ejemplo:

```bash
cp .env.example .env.local
```

Y completa con tus valores:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
GEMINI_API_KEY=AIza...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 7. Arrancar el servidor

```bash
npm run dev
```

Abre **http://localhost:3000** y listo. 🌸

---

## ☁️ Despliegue en Vercel

### Opción A: Conectar repo (recomendado)

1. Ve a https://vercel.com/new
2. Importa tu repo de GitHub
3. Vercel detecta Next.js automáticamente
4. En **Environment Variables** agrega las mismas que tu `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY`
5. Click **Deploy**

A partir de ahora, cada `git push` despliega automáticamente.

### Opción B: Con Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

---

## 🔑 Configurar Wompi (pagos)

1. Crea cuenta en https://wompi.co
2. Obtén:
   - **Llave pública** (`pub_test_...`)
   - **Llave privada** (`prv_test_...`)
   - **Secreto de integridad**
3. Agrega en Vercel:
   ```
   NEXT_PUBLIC_WOMPI_PUBLIC_KEY=pub_test_...
   WOMPI_PRIVATE_KEY=prv_test_...
   WOMPI_INTEGRITY_SECRET=...
   ```
4. Configura el webhook URL en Wompi:
   ```
   https://TU_DOMINIO.vercel.app/api/webhooks/wompi
   ```

---

## 📂 Estructura del proyecto

```
fembloom/
├── app/                          # Rutas de Next.js (App Router)
│   ├── (auth)/                   # Páginas de auth (login, registro)
│   ├── (app)/                    # Páginas autenticadas
│   │   ├── agenda/               # Página principal
│   │   ├── calendario/           # Calendario con modal
│   │   ├── jardin/               # Jardín virtual
│   │   ├── conocete/             # Artículos educativos
│   │   ├── consejera/            # Chat con IA
│   │   ├── diario/               # Diario emocional
│   │   ├── planificacion/        # Centro de planificación
│   │   ├── reportes/             # PDF reportes
│   │   ├── suscripcion/          # Planes y pagos
│   │   ├── historiales/          # Historiales completos
│   │   └── perfil/               # Perfil de usuaria
│   ├── api/                      # API endpoints
│   │   ├── consejera/            # Gemini AI
│   │   └── webhooks/wompi/       # Webhook de Wompi
│   ├── auth/callback/            # Callback de email/OAuth
│   ├── onboarding/               # Setup inicial
│   ├── layout.tsx                # Layout raíz
│   ├── page.tsx                  # Landing
│   ├── not-found.tsx             # 404
│   ├── error.tsx                 # Error boundary
│   └── globals.css               # Estilos globales
├── components/                   # Componentes reutilizables
│   ├── auth/                     # Botón Google + divider
│   ├── body-map/                 # Silueta corporal SVG
│   ├── fertility-map/            # Línea de fertilidad
│   ├── garden/                   # Planta y flores SVG
│   ├── nav/                      # Bottom nav + header
│   └── reports/                  # Componente PDF
├── lib/                          # Lógica de negocio
│   ├── auth/                     # Helpers de autenticación
│   ├── cycle/                    # Cálculos del ciclo
│   ├── garden/                   # Lógica del jardín
│   ├── subscription/             # Gestión de suscripción
│   ├── data/                     # Catálogos (síntomas, etc)
│   └── supabase/                 # Clientes Supabase
├── docs/                         # Documentación
├── public/                       # Archivos estáticos
└── middleware.ts                 # Refresh de sesión
```

---

## 🐛 Solución de problemas comunes

### "API key not valid" en consejera
- Verifica que tu `GEMINI_API_KEY` empiece con `AIza`
- Regenera la key en https://aistudio.google.com/apikey

### "Provider is not enabled" en Google login
- Activa Google en Supabase → Authentication → Providers

### Build falla en Vercel
- Verifica las variables de entorno en Vercel
- Revisa que el SQL de tablas se haya ejecutado

### "Could not find the table" en Supabase
- Ejecuta los scripts SQL en orden
- Verifica que estés en el proyecto correcto

### Tablas vacías pero la app funciona
- Es normal hasta que registres datos
- Las tablas se llenan al usar la app

---

## 📞 Recursos adicionales

- **Documentación Next.js:** https://nextjs.org/docs
- **Documentación Supabase:** https://supabase.com/docs
- **Documentación Gemini:** https://ai.google.dev/docs
- **Documentación Wompi:** https://docs.wompi.co

---

**¿Necesitas ayuda?** Abre un issue en https://github.com/danielagiraldo247-droid/fembloom/issues
