# 07 - Diseño Visual

Guía de identidad visual de FemBloom: paleta, tipografías, tono y reglas.

---

## Principio rector

**FemBloom no se ve como un dashboard.** Se siente como una **agenda íntima**, un **diario digital cálido**, una **compañera virtual**. Suave, femenino, empoderador.

---

## Paleta de colores

### Colores principales

| Nombre | Hex | Uso |
|---|---|---|
| **Rosa pétalo** | `#F8C9D3` | Color principal, menstruación |
| **Lila bruma** | `#D9C2E9` | Acentos suaves, fase folicular |
| **Verde menta** | `#C5E7D4` | Bienestar, jardín virtual |
| **Crema** | `#FDF6F0` | Fondo principal |
| **Blanco perla** | `#FFFFFF` | Tarjetas, contenedores |

### Colores funcionales

| Nombre | Hex | Uso |
|---|---|---|
| **Rosa coral** | `#F4A6B0` | Menstruación, alertas suaves |
| **Lavanda ovulación** | `#B89DC9` | Ovulación, ventana fértil |
| **Verde fertilidad** | `#9CCFB1` | Ventana fértil destacada |
| **Amarillo durazno** | `#FFD9B3` | Energía, fase folicular |
| **Marrón cacao suave** | `#7D5A4F` | Texto principal |
| **Gris niebla** | `#9B9B9B` | Texto secundario |

### Colores de estado

| Estado | Color |
|---|---|
| Éxito | `#A8D5BA` (verde suave) |
| Información | `#B5D6E8` (azul cielo) |
| Advertencia | `#F5D49E` (durazno) |
| Error | `#F2A4A4` (rosa salmón) |

---

## Tipografías

### Fuente principal: **Quicksand**

- Sans-serif redondeada, cálida, legible
- Para títulos, cuerpo de texto y UI general
- Pesos: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Fuente acento: **Caveat**

- Caligráfica, manuscrita
- Para frases destacadas, saludos, mensajes emocionales
- Ejemplo: el "Hola Daniela" del saludo principal
- Pesos: 400, 700

### Fuente legible alternativa: **Inter** (opcional)

- Para datos densos como reportes PDF
- Solo si Quicksand no funciona en algunos casos

### Configuración Tailwind

```js
// tailwind.config.js
fontFamily: {
  sans: ['Quicksand', 'sans-serif'],
  display: ['Caveat', 'cursive'],
  mono: ['Inter', 'sans-serif'],
}
```

---

## Tipografía: tamaños y jerarquía

| Estilo | Tamaño | Peso | Uso |
|---|---|---|---|
| Display | 36-48px | Caveat 700 | Saludo personal |
| H1 | 28-32px | Quicksand 600 | Títulos de sección |
| H2 | 22-24px | Quicksand 600 | Subtítulos |
| H3 | 18-20px | Quicksand 500 | Encabezados menores |
| Body | 16px | Quicksand 400 | Texto general |
| Small | 14px | Quicksand 400 | Notas, ayudas |
| Caption | 12px | Quicksand 400 | Etiquetas, metadatos |

---

## Estilo de componentes

### Bordes y esquinas

- **Esquinas redondeadas suaves:** `border-radius: 16px` para tarjetas, `24px` para botones grandes, `9999px` para chips
- Nunca esquinas afiladas

### Sombras

- Sombras suaves y difusas, tipo "neumorphism light"
- Ejemplo: `box-shadow: 0 4px 16px rgba(248, 201, 211, 0.15);`
- Nunca sombras duras o muy oscuras

### Espaciado

- Generoso, con aire entre elementos
- Padding mínimo en tarjetas: 20px
- Margen entre secciones: 32px

### Botones

| Tipo | Estilo |
|---|---|
| Primario | Fondo rosa pétalo, texto marrón cacao, redondeado 24px |
| Secundario | Borde rosa pétalo, fondo crema, texto rosa coral |
| Texto | Sin fondo, texto rosa coral con subrayado al hover |
| Destructivo | Rosa salmón suave, no rojo intenso |

---

## Iconografía

- **Estilo:** trazo orgánico, líneas suaves, redondeadas
- **No usar:** íconos planos angulares estilo Material Design clásico
- **Sí usar:** Lucide Icons o Phosphor Icons (variante "duotone" o "regular")
- **Tamaños:** 20px (UI), 24px (navegación), 32px (destacados)

---

## Ilustraciones

### Estilo general

- Acuarela digital
- Bordes suaves, no contornos definidos
- Paleta pastel armoniosa
- Tono femenino sin caer en estereotipos

### Recursos recomendados

- **Storyset** (storyset.com) — Ilustraciones gratis personalizables
- **unDraw** (undraw.co) — Ilustraciones planas suaves
- **Streamline** (streamlinehq.com) — Iconos e ilustraciones premium

### Ilustración corporal (mapa de síntomas)

- Figura femenina estilizada
- Estilo silueta suave, sin detalles anatómicos clínicos
- Inclusiva y respetuosa
- Zonas tappeables: cabeza, abdomen, espalda, pecho, piernas
- Colores neutros, sin sexualización

---

## Animaciones

### Principios

- **Suaves siempre.** Easing tipo `ease-out` o `cubic-bezier(0.4, 0, 0.2, 1)`
- **Lentas pero no aburridas.** Duración 300-600ms
- **Con propósito.** Cada animación comunica algo

### Casos de uso

- **Transiciones de página:** fade + slide suave
- **Aparición de elementos:** fade-in con scale 0.95 → 1
- **Jardín virtual:** crecimiento progresivo con bounce sutil
- **Botones:** scale 1 → 0.97 al click
- **Notificaciones toast:** slide desde arriba con fade

### Librería

- **Framer Motion** para todo lo complejo
- CSS transitions para lo simple

---

## Layout y navegación

### Header

- Altura: 64px
- Fondo crema con sombra muy suave
- Logo a la izquierda, perfil a la derecha
- Sin botones cargados de iconos

### Navegación inferior (móvil)

- 4-5 íconos máximo
- Etiquetas debajo de los íconos
- Ícono activo: relleno con rosa coral
- Ícono inactivo: outline con gris niebla

**Ítems principales:**
1. Agenda (home)
2. Calendario
3. Jardín
4. Conócete
5. Perfil

### Tarjetas

- Fondo blanco perla
- Sombra suave
- Padding interno generoso (20-24px)
- Esquinas redondeadas 16px
- Espaciado entre tarjetas: 16-20px

---

## Tono de voz

### Sí usar

- "Hola Daniela, tu día comienza..."
- "Estás en una fase tranquila de tu ciclo"
- "Hoy podrías sentirte más sensible. Es normal."
- "¡Tu flor está floreciendo!"
- "Cuéntame, ¿cómo te sientes hoy?"

### No usar

- "Procesando datos..." (frío)
- "Error: campo obligatorio" (técnico)
- "Su período comenzará en..." (formal, distante)
- "Riesgo de embarazo alto" (alarmista)

---

## Modo discreto (visual)

Cuando el modo discreto está activado en notificaciones:

- Las notificaciones del navegador muestran solo: **"Tienes una actividad pendiente en FemBloom"**
- Sin íconos representativos de menstruación o salud reproductiva
- Sin emojis temáticos

---

## Accesibilidad visual

- Contraste mínimo de texto: 4.5:1 (WCAG AA)
- Tamaños de elementos táctiles: mínimo 44x44px
- No depender solo del color para transmitir información
- Soporte de navegación por teclado
- Estados de focus visibles y suaves
