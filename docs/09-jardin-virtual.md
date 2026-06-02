# 09 - Jardín Virtual

Mecánica completa del jardín virtual de FemBloom y el sistema de logros.

---

## Concepto

El jardín virtual es la **característica diferenciadora visual** de FemBloom. Es una metáfora del ciclo menstrual: cada ciclo completo hace florecer una nueva flor, y la constancia de uso hace crecer toda la planta.

A diferencia de las estadísticas frías, el jardín conecta emocionalmente a la usuaria con su cuerpo y su progreso.

---

## Estilo visual confirmado

**Acuarela digital + colores pasteles suaves + estilo minimalista.**

- Bordes orgánicos, no contornos definidos
- Paleta: rosa pétalo, lila bruma, verde menta, durazno suave
- Flores estilizadas, no realistas
- Animaciones suaves de crecimiento

---

## Mecánica de crecimiento

### Estados de la planta principal

La planta evoluciona en 5 estados visuales:

| Estado | Cuándo se alcanza |
|---|---|
| 🌱 **Semilla** | Estado inicial al registrarse |
| 🌿 **Brote** | Después de 7 días consecutivos de uso |
| 🌾 **Tallo** | Después de 14 días consecutivos o 2 semanas registrando |
| 🌷 **Botón** | A los 21 días o cerca de completar el primer ciclo |
| 🌸 **Flor** | Al completar el primer ciclo menstrual completo |

### Crecimiento por ciclos completos

Cada ciclo completo (de menstruación a menstruación) hace nacer una **nueva flor en el jardín**:

- **Ciclo 1 completo** → primera flor (rosa pétalo)
- **Ciclo 2 completo** → segunda flor (lila bruma)
- **Ciclo 3 completo** → tercera flor (durazno suave)
- **Y así sucesivamente** con paleta variada

Después de 6 meses de uso, la usuaria tiene un jardín lleno de flores únicas.

---

## Factores que influyen en el crecimiento

| Acción | Impacto |
|---|---|
| Registro diario | +1 punto de constancia |
| Cumplimiento de recordatorios | +2 puntos |
| Registro emocional | +1 punto |
| Seguimiento de síntomas | +1 punto |
| Completar un ciclo | +10 puntos + nueva flor |
| Romper racha | Pausa de crecimiento (no retrocede) |

**Importante:** El jardín nunca retrocede. Si la usuaria deja de usar la app, la planta se queda quieta, pero no muere. Esto evita generar culpa.

---

## Tipos de flores

Diseñar **5-7 variantes** de flores en acuarela para variedad visual:

| # | Flor | Color principal | Significado emocional |
|---|---|---|---|
| 1 | Rosa silvestre | Rosa pétalo | Inicio, comienzo |
| 2 | Lavanda | Lila bruma | Calma, fase folicular |
| 3 | Margarita | Crema con amarillo | Energía, ovulación |
| 4 | Tulipán | Durazno | Vitalidad |
| 5 | Anémona | Lila intenso | Sensibilidad, fase lútea |
| 6 | Hortensia | Azul cielo suave | Tranquilidad |
| 7 | Peonía | Rosa coral | Florecimiento completo |

Las flores se asignan **aleatoriamente o por orden** al completar cada ciclo. La usuaria descubre cuál le tocará.

---

## Sistema de logros

10 logros desbloqueables para motivar el uso constante:

| # | Logro | Condición | Ícono |
|---|---|---|---|
| 1 | **Primera semilla** | Te registraste en FemBloom | 🌱 |
| 2 | **Primer brote** | 7 días de registro consecutivo | 🌿 |
| 3 | **Floreciste** | Completaste tu primer ciclo | 🌸 |
| 4 | **Constante** | 30 días consecutivos de registro | 📅 |
| 5 | **Conociéndote** | Leíste 5 artículos de "Conócete" | 📖 |
| 6 | **Auto-conocimiento** | 50 entradas en el diario emocional | 📝 |
| 7 | **Jardinera** | 3 ciclos completos registrados | 🌷 |
| 8 | **Maestra del ciclo** | 6 ciclos completos registrados | 🌺 |
| 9 | **Año florecido** | 12 ciclos completos | 🌼 |
| 10 | **Sabiduría plena** | Usaste todos los módulos de la app | ✨ |

### Comportamiento al desbloquear

- Animación de "destello" en pantalla
- Notificación celebratoria: "¡Desbloqueaste un nuevo logro!"
- Logro queda visible permanentemente en el perfil
- Mensaje motivador específico al logro

---

## Página "Mi Jardín"

Diseño de la página principal del jardín virtual:

```
┌──────────────────────────────────────┐
│         🌸 Mi Jardín                 │
│  ────────────────────────────────    │
│                                      │
│          [Planta principal]          │
│       (animación de crecimiento)     │
│                                      │
│   Estado actual: Florecimiento       │
│   Racha: 23 días                     │
│   Ciclos completos: 4                │
│                                      │
│  ────────────────────────────────    │
│  Tu jardín de flores                 │
│                                      │
│   🌸  🌷  🌺  🌼                     │
│   (cada flor con su nombre y fecha)  │
│                                      │
│  ────────────────────────────────    │
│  Próximo logro:                      │
│  📅 "Constante" - faltan 7 días      │
│                                      │
└──────────────────────────────────────┘
```

---

## Implementación técnica

### Componentes React

```
components/jardin/
├── PlantaPrincipal.tsx       (planta animada actual)
├── Flor.tsx                  (flor individual del jardín)
├── JardinGrid.tsx            (galería de flores)
├── EstadoActual.tsx          (info: racha, ciclos)
├── ProximoLogro.tsx          (siguiente logro a desbloquear)
└── AnimacionCrecimiento.tsx  (transición entre estados)
```

### Lógica de cálculo

Función `calcularEstadoJardin(userId)` que retorna:

```typescript
{
  plantStage: 'seed' | 'sprout' | 'stem' | 'bud' | 'flower',
  streakDays: number,
  completedCycles: number,
  flowers: Array<{ type: string, unlockedAt: Date }>,
  nextAchievement: { code: string, progress: number, target: number }
}
```

### Trigger de actualización

Se actualiza cada vez que:

1. La usuaria abre la app (verifica racha)
2. Registra cualquier dato del día
3. Completa un ciclo (al iniciar nueva menstruación)

---

## Recursos visuales (SVG)

### Cómo conseguir las flores

**Opción 1: Diseñar en Figma o Procreate**
- Más control creativo
- Tiempo: ~2 horas por flor

**Opción 2: Adaptar de bancos gratuitos**
- Sitios: Storyset, Lukasz Adam Illustrations, Drawkit
- Adaptar colores a la paleta de FemBloom

**Opción 3: Generar con IA**
- Usar Midjourney o DALL-E con prompts específicos
- Ejemplo de prompt: "minimalist watercolor flower, soft pastel pink, transparent background, hand-drawn style"

**Opción 4: Contratar ilustradora freelance** (si hay presupuesto)
- Plataformas: Fiverr, Workana
- Costo: $5-20 por flor

---

## Modelo de progresión visual

Para que la planta crezca de forma fluida, cada estado tiene un **SVG independiente**:

```
public/jardin/
├── planta/
│   ├── seed.svg          (semilla pequeña en tierra)
│   ├── sprout.svg        (pequeño brote verde)
│   ├── stem.svg          (tallo con hojas)
│   ├── bud.svg           (con botón cerrado)
│   └── flower.svg        (flor abierta)
├── flores/
│   ├── rosa.svg
│   ├── lavanda.svg
│   ├── margarita.svg
│   ├── tulipan.svg
│   ├── anemona.svg
│   ├── hortensia.svg
│   └── peonia.svg
└── fondo/
    ├── jardin-bg.svg     (fondo de jardín con tierra y cielo suave)
    └── particulas.svg    (pétalos cayendo, mariposas)
```

---

## Animaciones recomendadas (Framer Motion)

```jsx
// Ejemplo de transición entre estados
<motion.div
  key={plantStage}
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <PlantaSVG stage={plantStage} />
</motion.div>

// Pétalos cayendo en el fondo
<motion.div
  animate={{ y: [0, 100], opacity: [1, 0] }}
  transition={{ duration: 4, repeat: Infinity }}
/>
```

---

## Mensajes motivadores

Mensajes que aparecen al subir de estado:

- **Brote:** "Tu planta está despertando. Una semana de constancia 🌿"
- **Tallo:** "Vas creciendo junto con tu ciclo 🌾"
- **Botón:** "Estás a punto de florecer 🌷"
- **Flor:** "¡Floreciste! Tu primera flor está en el jardín 🌸"
- **Nueva flor:** "Una nueva flor en tu jardín. ¡Felicidades por completar tu ciclo!"

---

## Nota sobre suscripción

El jardín virtual es una **función premium**, pero la prueba gratuita de 3 meses permite que toda usuaria nueva la experimente desde el inicio. Esto es estratégico: el apego emocional al jardín es lo que motivará a renovar la suscripción.
