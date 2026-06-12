# 📐 Diagramas UML — FemBloom

Diagramas de casos de uso, arquitectura y relaciones del sistema FemBloom.

> Estos diagramas están en formato ASCII para que se puedan visualizar directamente en VS Code, GitHub o cualquier editor de texto sin necesidad de imágenes externas.

---

## 🎭 1. Diagrama General de Actores

```
                                  FemBloom
                                  ════════

       ┌─────────────────────────────────────────────────────────┐
       │                                                         │
       │              ╔═══════════════════════════╗               │
       │              ║   SISTEMA FEMBLOOM        ║               │
       │              ╚═══════════════════════════╝               │
       │                                                         │
       │                                                         │
   ────┤   ┌──────────┐                       ┌──────────┐    ├──
       │   │   AUTH   │                       │   AGEN   │    │
   o   ├──>│ Módulo   │                  ┌───>│ Módulo   │<───┤   o
  /|\  │   └──────────┘                  │    └──────────┘    │  /|\
  / \  │                                 │                    │  / \
       │   ┌──────────┐                  │    ┌──────────┐    │
   UNR ├──>│   ONBO   │──────────────────┘    │   CALE   │<───┤   UA
       │   │ Módulo   │                       │ Módulo   │    │
       │   └──────────┘                       └──────────┘    │
       │                                                         │
       └─────────────────────────────────────────────────────────┘

         UNR = Usuario No Registrado
         UA  = Usuaria Autenticada
```

---

## 🌸 2. Diagrama de Casos de Uso — Sistema Completo

```
╔════════════════════════════════════════════════════════════════════╗
║                       «boundary» FemBloom                          ║
║                                                                    ║
║   ┌──────────────────────────────────────────────────────────────┐ ║
║   │                  MÓDULO AUTH (Autenticación)                 │ ║
║   │                                                              │ ║
║   │   ╭──────────────────╮      ╭──────────────────╮             │ ║
║   │   │ CU-AUTH-01 Alta  │      │ CU-AUTH-02 Alta  │             │ ║
║   │   │ Registrar        │      │ Iniciar Sesión   │             │ ║
║   │   │ Usuario          │      │ Email            │             │ ║
║   │   ╰──────────────────╯      ╰──────────────────╯             │ ║
║   │                                                              │ ║
║   │   ╭──────────────────╮      ╭──────────────────╮             │ ║
║   │   │ CU-AUTH-03 Alta  │      │ CU-AUTH-04 Alta  │             │ ║
║   │   │ Login Google     │      │ Recuperar        │             │ ║
║   │   │ OAuth            │      │ Contraseña       │             │ ║
║   │   ╰──────────────────╯      ╰──────────────────╯             │ ║
║   └──────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║   ┌──────────────────────────────────────────────────────────────┐ ║
║   │                  MÓDULO ONBO (Onboarding)                    │ ║
║   │                                                              │ ║
║   │   ╭──────────────────╮  ╭──────────────────╮  ╭───────────╮  │ ║
║   │   │ CU-ONBO-01 Alta  │  │ CU-ONBO-02 Alta  │  │ CU-ONBO-03│  │ ║
║   │   │ Configurar Ciclo │  │ Configurar Días  │  │ Objetivo  │  │ ║
║   │   ╰──────────────────╯  ╰──────────────────╯  ╰───────────╯  │ ║
║   └──────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║   ┌──────────────────────────────────────────────────────────────┐ ║
║   │                  MÓDULO AGEN (Agenda)                        │ ║
║   │                                                              │ ║
║   │   ╭──────────────────╮      ╭──────────────────╮             │ ║
║   │   │ CU-AGEN-01 Alta  │      │ CU-AGEN-02 Alta  │             │ ║
║   │   │ Ver Saludo       │      │ Día del Ciclo    │             │ ║
║   │   ╰──────────────────╯      ╰──────────────────╯             │ ║
║   │                                                              │ ║
║   │   ╭──────────────────╮      ╭──────────────────╮             │ ║
║   │   │ CU-AGEN-04 Media │      │ CU-AGEN-05 Media │             │ ║
║   │   │ Mensaje Empático │      │ Accesos Rápidos  │             │ ║
║   │   ╰──────────────────╯      ╰──────────────────╯             │ ║
║   └──────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║   ┌──────────────────────────────────────────────────────────────┐ ║
║   │                  MÓDULO CALE (Calendario)                    │ ║
║   │                                                              │ ║
║   │   ╭──────────────────╮      ╭──────────────────╮             │ ║
║   │   │ CU-CALE-01 Alta  │      │ CU-CALE-02 Alta  │             │ ║
║   │   │ Ver Calendario   │      │ Fases del Ciclo  │             │ ║
║   │   ╰──────────────────╯      ╰──────────────────╯             │ ║
║   │                                                              │ ║
║   │   ╭──────────────────╮      ╭──────────────────╮             │ ║
║   │   │ CU-CALE-03 Media │      │ CU-CALE-05 Media │             │ ║
║   │   │ Navegar Meses    │      │ Seleccionar Día  │             │ ║
║   │   ╰──────────────────╯      ╰──────────────────╯             │ ║
║   └──────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║   ┌──────────────────────────────────────────────────────────────┐ ║
║   │                  MÓDULO REGI (Registros)                     │ ║
║   │                                                              │ ║
║   │   ╭──────────────────╮      ╭──────────────────╮             │ ║
║   │   │ CU-REGI-01 Alta  │      │ CU-REGI-03 Alta  │             │ ║
║   │   │ Menstruación     │      │ Síntomas + Mapa  │             │ ║
║   │   ╰──────────────────╯      ╰──────────────────╯             │ ║
║   │                                                              │ ║
║   │   ╭──────────────────╮      ╭──────────────────╮             │ ║
║   │   │ CU-REGI-05 Alta  │      │ CU-REGI-07 Media │             │ ║
║   │   │ Estado Ánimo     │      │ Relación         │             │ ║
║   │   ╰──────────────────╯      ╰──────────────────╯             │ ║
║   └──────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║                       ... 10 módulos más ...                       ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝

       o                                                  o
      /|\          ────────────────────────────►         /|\
      / \                                                / \
       │                                                  │
     UNR                                                 UA
   Usuario No                                         Usuaria
   Registrado                                       Autenticada

  🟢 Prioridad Alta    🔵 Prioridad Media    🟡 Prioridad Baja
```

---

## 🏗️ 3. Diagrama de Arquitectura por Capas

```
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║                    ARQUITECTURA FEMBLOOM                           ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝

  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │   👩 USUARIA FINAL (Navegador o PWA en celular)                   │
  │                                                                  │
  └──────────────────────────────┬───────────────────────────────────┘
                                 │ HTTPS
                                 ▼
  ┌──────────────────────────────────────────────────────────────────┐
  │                    CAPA DE PRESENTACIÓN (Frontend)               │
  │                  Next.js 16 + React 19 + Tailwind                │
  │                                                                  │
  │   ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐           │
  │   │ Agenda  │  │Calendario│  │ Jardín  │  │ Conócete │           │
  │   └─────────┘  └──────────┘  └─────────┘  └──────────┘           │
  │   ┌──────────┐ ┌───────────┐ ┌──────────┐ ┌─────────┐            │
  │   │Consejera │ │   Diario  │ │Reportes  │ │ Perfil  │            │
  │   └──────────┘ └───────────┘ └──────────┘ └─────────┘            │
  │                                                                  │
  └──────────────────────────────┬───────────────────────────────────┘
                                 │
                                 ▼
  ┌──────────────────────────────────────────────────────────────────┐
  │                  CAPA DE LÓGICA DE NEGOCIO                       │
  │                       (lib/ y app/api/)                          │
  │                                                                  │
  │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
  │   │ Cálculos │  │  Jardín  │  │ Suscrip- │  │ Datos    │         │
  │   │  Ciclo   │  │  Logros  │  │  ción    │  │ Estáticos│         │
  │   └──────────┘  └──────────┘  └──────────┘  └──────────┘         │
  │                                                                  │
  │   ┌──────────────────────────────────────────────────────┐       │
  │   │             API Routes (Backend Next.js)             │       │
  │   │   /api/consejera        /api/webhooks/wompi         │       │
  │   └──────────────────────────────────────────────────────┘       │
  │                                                                  │
  └──────────────────────────────┬───────────────────────────────────┘
                                 │
       ┌─────────────────────────┼─────────────────────────┐
       ▼                         ▼                         ▼
  ┌──────────┐           ┌──────────────┐           ┌─────────────┐
  │ SUPABASE │           │ GOOGLE GEMINI│           │   WOMPI     │
  │          │           │              │           │             │
  │  Auth +  │           │   IA 2.5     │           │  Pasarela   │
  │PostgreSQL│           │   Flash      │           │  de Pago    │
  │  15 tablas│          │              │           │             │
  └──────────┘           └──────────────┘           └─────────────┘
```

---

## 🔗 4. Diagrama de Relación entre Módulos

```
                          ┌──────────┐
                          │   AUTH   │
                          └────┬─────┘
                               │ (precede a)
                               ▼
                          ┌──────────┐
                          │   ONBO   │
                          └────┬─────┘
                               │ (precede a)
                               ▼
        ┌────────────┐    ┌──────────┐    ┌──────────┐
        │   PERF     │◄───┤   AGEN   ├───►│  HIST    │
        │ (Perfil)   │    │ (Hub     │    │(Histor.) │
        └────────────┘    │  central)│    └──────────┘
                          └────┬─────┘
                               │
            ┌──────────────────┼──────────────────┐
            ▼                  ▼                  ▼
       ┌─────────┐       ┌──────────┐       ┌─────────┐
       │  CALE   │       │   CONS   │       │  JARD   │
       │(Calend.)│       │(Conseje- │       │(Jardín) │
       └────┬────┘       │  ra IA)  │       └─────────┘
            │            └──────────┘
            │ (contiene)         
            ▼                    
       ┌─────────┐               
       │  REGI   │      ┌──────────┐
       │(Registr.│─────►│  PRED    │
       │ del día)│      │(Cálculos)│
       └────┬────┘      └──────────┘
            │ (alimenta)
            ▼
       ┌─────────┐       ┌──────────┐       ┌─────────┐
       │  DIAR   │       │  CONO    │       │  PLAN   │
       │(Diario) │       │(Conócete)│       │ (Plan.) │
       └─────────┘       └──────────┘       └─────────┘

       ┌──────────────────────────────────────────────┐
       │              MÓDULO SUSC                     │
       │   (Atraviesa todos los demás como filtro de  │
       │    acceso a funciones premium)               │
       └──────────────────────────────────────────────┘

       ┌──────────────────────────────────────────────┐
       │              MÓDULO REPO                     │
       │   (Consume datos de REGI, PRED, HIST para    │
       │    generar el PDF)                           │
       └──────────────────────────────────────────────┘
```

---

## 📋 5. Diagrama Detallado — Módulo AUTH

```
╔═══════════════════════════════════════════════════════════════════╗
║                  «boundary» MÓDULO AUTH                           ║
║                                                                   ║
║                                                                   ║
║                      ╭────────────────────╮                       ║
║          ┌───────────│ CU-AUTH-01  Alta   │                       ║
║          │           │ Registrar Usuario  │                       ║
║          │           ╰────────────────────╯                       ║
║          │                    │                                   ║
║          │           «extends»│                                   ║
║          │                    ▼                                   ║
║          │           ╭────────────────────╮                       ║
║          │           │ Activar Prueba     │                       ║
║          │           │ Gratuita 3 meses   │                       ║
║          │           ╰────────────────────╯                       ║
║          │                                                        ║
║          │           ╭────────────────────╮                       ║
║          ├───────────│ CU-AUTH-02  Alta   │                       ║
║          │           │ Login con Email    │                       ║
║          │           ╰────────────────────╯                       ║
║          │                                                        ║
║          │           ╭────────────────────╮                       ║
║          ├───────────│ CU-AUTH-03  Alta   │◄──── «include»         ║
║          │           │ Login con Google   │            │          ║
║          │           ╰────────────────────╯            │          ║
║          │                                              │          ║
║          │                              ╭──────────────────╮      ║
║          │                              │ OAuth 2.0 + PKCE │      ║
║          │                              ╰──────────────────╯      ║
║          │                                                        ║
║          │           ╭────────────────────╮                       ║
║          └───────────│ CU-AUTH-04  Alta   │                       ║
║                      │ Recuperar          │                       ║
║                      │ Contraseña         │                       ║
║                      ╰────────────────────╯                       ║
║                              │                                    ║
║                  «extends»   │                                    ║
║                              ▼                                    ║
║                      ╭────────────────────╮                       ║
║                      │ CU-AUTH-05  Media  │                       ║
║                      │ Crear Nueva        │                       ║
║                      │ Contraseña         │                       ║
║                      ╰────────────────────╯                       ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝

      o
     /|\        Usuario No Registrado (UNR)
     / \
```

---

## 📋 6. Diagrama Detallado — Módulo CALE + REGI

```
╔═══════════════════════════════════════════════════════════════════╗
║                «boundary» CALENDARIO + REGISTROS                  ║
║                                                                   ║
║                                                                   ║
║                  ╭────────────────────╮                           ║
║      ┌───────────│ CU-CALE-01  Alta   │                           ║
║      │           │ Visualizar         │                           ║
║      │           │ Calendario         │                           ║
║      │           ╰────────────────────╯                           ║
║      │                    │                                       ║
║      │           «include»│                                       ║
║      │                    ▼                                       ║
║      │           ╭────────────────────╮                           ║
║      │           │ CU-PRED-01...04    │                           ║
║      │           │ Calcular Fases     │ (Módulo PRED)             ║
║      │           ╰────────────────────╯                           ║
║      │                                                            ║
║      │           ╭────────────────────╮                           ║
║      ├───────────│ CU-CALE-05  Media  │                           ║
║      │           │ Seleccionar Día    │                           ║
║      │           ╰────────────────────╯                           ║
║      │                    │                                       ║
║      │           «include»│                                       ║
║      │                    ▼                                       ║
║      │   ┌────────────────────────────────────────┐               ║
║      │   │   MODAL DEL DÍA (5 tabs)              │               ║
║      │   │                                        │               ║
║      │   │   ╭──────────────────╮                 │               ║
║      └──►│   │ CU-REGI-01 Alta  │ ◄── Periodo     │               ║
║          │   │ Menstruación     │                 │               ║
║          │   ╰──────────────────╯                 │               ║
║          │                                        │               ║
║          │   ╭──────────────────╮                 │               ║
║          │   │ CU-REGI-03 Alta  │ ◄── Síntomas    │               ║
║          │   │ Mapa Corporal    │                 │               ║
║          │   ╰──────────────────╯                 │               ║
║          │                                        │               ║
║          │   ╭──────────────────╮                 │               ║
║          │   │ CU-REGI-05 Alta  │ ◄── Ánimo       │               ║
║          │   │ Estado Ánimo     │                 │               ║
║          │   ╰──────────────────╯                 │               ║
║          │                                        │               ║
║          │   ╭──────────────────╮                 │               ║
║          │   │ CU-REGI-06 Media │ ◄── Notas       │               ║
║          │   │ Notas            │                 │               ║
║          │   ╰──────────────────╯                 │               ║
║          │                                        │               ║
║          │   ╭──────────────────╮                 │               ║
║          │   │ CU-REGI-07/08    │ ◄── Relación    │               ║
║          │   │ Relación Sexual  │                 │               ║
║          │   ╰──────────────────╯                 │               ║
║          │                                        │               ║
║          └────────────────────────────────────────┘               ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝

      o
     /|\        Usuaria Autenticada (UA)
     / \
```

---

## 📋 7. Diagrama Detallado — Módulo SUSC

```
╔═══════════════════════════════════════════════════════════════════╗
║                  «boundary» MÓDULO SUSC                           ║
║                                                                   ║
║                                                                   ║
║                  ╭────────────────────╮                           ║
║      ┌───────────│ CU-SUSC-02  Alta   │                           ║
║      │           │ Visualizar Estado  │                           ║
║      │           │ de Suscripción     │                           ║
║      │           ╰────────────────────╯                           ║
║      │                                                            ║
║      │           ╭────────────────────╮                           ║
║      ├───────────│ CU-SUSC-03  Alta   │                           ║
║      │           │ Seleccionar Plan   │                           ║
║      │           │ (Mensual/Anual)    │                           ║
║      │           ╰────────────────────╯                           ║
║      │                    │                                       ║
║      │           «include»│                                       ║
║      │                    ▼                                       ║
║      │           ╭────────────────────╮       ┌──────────┐        ║
║      │           │ CU-SUSC-04  Alta   │──────►│  WOMPI   │        ║
║      │           │ Procesar Pago      │       │ (Externo)│        ║
║      │           ╰────────────────────╯       └──────────┘        ║
║      │                    │                                       ║
║      │           «extends»│                                       ║
║      │                    ▼                                       ║
║      │           ╭────────────────────╮                           ║
║      │           │ CU-SUSC-05  Alta   │                           ║
║      │           │ Activar Premium    │                           ║
║      │           ╰────────────────────╯                           ║
║      │                                                            ║
║      │           ╭────────────────────╮                           ║
║      ├───────────│ CU-SUSC-06  Media  │                           ║
║      │           │ Cancelar           │                           ║
║      │           │ Suscripción        │                           ║
║      │           ╰────────────────────╯                           ║
║      │                                                            ║
║      │           ╭────────────────────╮                           ║
║      └───────────│ CU-SUSC-08  Baja   │                           ║
║                  │ Ver Historial      │                           ║
║                  │ Pagos              │                           ║
║                  ╰────────────────────╯                           ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝

      o
     /|\        Usuaria Autenticada (UA)
     / \
```

---

## 🗄️ 8. Diagrama de Tablas (Modelo de Datos)

```
╔═══════════════════════════════════════════════════════════════════╗
║                   MODELO DE BASE DE DATOS                         ║
║                  Supabase + PostgreSQL                            ║
╚═══════════════════════════════════════════════════════════════════╝

┌─────────────────────┐
│   auth.users        │ ◄────── Gestionado por Supabase Auth
│  (Supabase)         │
├─────────────────────┤
│ • id (uuid) PK      │────┐
│ • email             │    │
│ • encrypted_password│    │
└─────────────────────┘    │
                           │
                           │  1:1
                           ▼
┌─────────────────────┐
│     profiles        │ ◄── Datos extendidos del usuario
├─────────────────────┤
│ • id (uuid) PK,FK   │
│ • full_name         │
│ • avatar_url        │
│ • subscription_status│
│ • trial_ends_at     │
│ • discrete_mode     │
│ • objective         │
└──────────┬──────────┘
           │
           │ 1:N
           │
   ┌───────┴────────┬───────────┬──────────┬──────────┬──────────┐
   ▼                ▼           ▼          ▼          ▼          ▼
┌────────┐  ┌────────┐  ┌─────────┐  ┌────────┐  ┌────────┐ ┌────────┐
│cycle_  │  │ cycles │  │daily_   │  │symptoms│  │ moods  │ │relations│
│settings│  │        │  │ logs    │  │        │  │        │ │        │
└────────┘  └────────┘  └─────────┘  └────────┘  └────────┘ └────────┘

           ┌──────────────┬──────────────┬──────────────┐
           ▼              ▼              ▼              ▼
      ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
      │contracep-│  │reminders │  │journal_  │  │garden_   │
      │tive_     │  │          │  │entries   │  │progress  │
      │methods   │  │          │  │          │  │          │
      └──────────┘  └──────────┘  └──────────┘  └──────────┘

           ┌──────────────┬──────────────┬──────────────┐
           ▼              ▼              ▼              ▼
      ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
      │achieve-  │  │ chat_    │  │subscrip- │  │ payments │
      │ments     │  │messages  │  │tions     │  │          │
      └──────────┘  └──────────┘  └──────────┘  └──────────┘

  Total: 15 tablas con Row Level Security (RLS) activada
  Cada usuaria solo accede a sus propios registros
```

---

## 🌐 9. Diagrama de Despliegue

```
╔═══════════════════════════════════════════════════════════════════╗
║                    ARQUITECTURA DE DESPLIEGUE                     ║
╚═══════════════════════════════════════════════════════════════════╝

       👩 USUARIA
           │
           │ HTTPS / TLS 1.3
           ▼
  ┌────────────────────┐
  │   Navegador Web    │
  │  (Chrome, Firefox, │
  │   Safari, Edge)    │
  └─────────┬──────────┘
            │
            │ Internet
            ▼
  ╔════════════════════════════════════════════════════════╗
  ║                    VERCEL CDN                          ║
  ║              (Distribución global)                     ║
  ╚═══════════════════════╤════════════════════════════════╝
                          │
                          ▼
  ╔════════════════════════════════════════════════════════╗
  ║              VERCEL EDGE / SERVERLESS                  ║
  ║                                                        ║
  ║    ┌──────────────────────────────────────┐            ║
  ║    │   Next.js 16 (SSR + Static)          │            ║
  ║    │   ┌─────────┐  ┌─────────┐           │            ║
  ║    │   │Frontend │  │API Routes│           │            ║
  ║    │   │ React   │  │ Backend │           │            ║
  ║    │   └─────────┘  └─────────┘           │            ║
  ║    └──────────────────┬───────────────────┘            ║
  ╚═══════════════════════╪════════════════════════════════╝
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
  ┌──────────┐      ┌──────────┐      ┌──────────┐
  │ SUPABASE │      │  GOOGLE  │      │  WOMPI   │
  │          │      │  GEMINI  │      │          │
  │ Brasil   │      │  Cloud   │      │ Colombia │
  │ São Paulo│      │  USA     │      │          │
  └──────────┘      └──────────┘      └──────────┘
```

---

## 🎯 Cómo usar estos diagramas en tu presentación

### Opción 1: Mostrarlos directamente desde VS Code

1. Abre el archivo `docs/DIAGRAMAS_UML.md` en VS Code/Trae
2. Presiona **Ctrl + Shift + V** para activar la vista previa
3. Los diagramas se ven bien formateados

### Opción 2: Generarlos como imagen

Puedes copiar cualquier diagrama y:
1. Pegarlo en una página de Word con fuente **Consolas** o **Courier New**
2. Tomar captura de pantalla y guardarla como imagen

### Opción 3: Para tu informe escrito

Estos diagramas en formato ASCII son **perfectos para incluir directamente en tu documento académico** porque:
- ✅ No requieren imágenes externas
- ✅ Se ven igual en cualquier dispositivo
- ✅ Son legibles en blanco y negro (si imprimes)
- ✅ Demuestran rigor técnico

---

## 📊 Resumen de diagramas incluidos

| # | Diagrama | Para qué sirve |
|---|---|---|
| 1 | Diagrama de Actores | Mostrar quiénes usan el sistema |
| 2 | Casos de Uso General | Vista panorámica de toda la app |
| 3 | Arquitectura por Capas | Mostrar la organización técnica |
| 4 | Relación entre Módulos | Cómo se comunican entre sí |
| 5 | Detalle Módulo AUTH | Foco en autenticación |
| 6 | Detalle CALE + REGI | El flujo principal de uso |
| 7 | Detalle Módulo SUSC | El modelo de monetización |
| 8 | Modelo de Datos | Las 15 tablas y sus relaciones |
| 9 | Diagrama de Despliegue | Dónde vive cada componente |

---

## 🎤 Frase para tu presentación

> *"Para documentar la arquitectura del sistema construí varios diagramas UML que ilustran desde la vista de actores y casos de uso hasta el modelo de datos y la arquitectura de despliegue. Cada diagrama responde a una pregunta diferente: quién usa el sistema, qué hace cada actor, cómo se comunican los componentes, dónde se guardan los datos y cómo se despliega en la nube."*

¡Listo para impresionar! 🌸✨
