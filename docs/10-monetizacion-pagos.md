# 10 - Monetización y Pagos

Modelo de suscripción de FemBloom e integración de pagos con Wompi (Colombia).

---

## Modelo de negocio: Freemium con prueba

### Funciones GRATUITAS (siempre disponibles)

| Función | Descripción |
|---|---|
| Registro de usuaria | Cuenta básica |
| Calendario básico | Visualización del mes actual |
| Registro de menstruación | Marcado de días + intensidad |
| Registro de síntomas básicos | Catálogo limitado (10 síntomas) |
| Registro de estados de ánimo | 8 emociones básicas |
| Notas personales | Texto libre por día |
| Predicción de próxima menstruación | Cálculo básico |
| Configuración del perfil | Datos personales |

### Funciones PREMIUM (con suscripción)

| Función | Descripción |
|---|---|
| 🌸 **Jardín virtual** | Sistema de gamificación completo |
| 🤖 **Consejera virtual con IA** | Chat con Gemini |
| 📄 **Reportes médicos PDF** | Generación de documentos |
| 🔮 **Predicciones avanzadas** | Ovulación, ventana fértil, probabilidad de embarazo |
| 🗺️ **Mapa interactivo de síntomas** | Ilustración corporal |
| 🌿 **Mapa de fertilidad visual** | Línea de fases del ciclo |
| 📚 **Sección "Conócete" completa** | Acceso a todos los artículos |
| 💊 **Centro de planificación familiar** | Configuración de método anticonceptivo |
| 🔔 **Recordatorios inteligentes** | Notificaciones personalizadas según método |
| 🤫 **Modo discreto** | Notificaciones privadas |
| 📖 **Diario emocional privado** | Encriptado, ilimitado |
| 🏆 **Sistema de logros** | 10 logros desbloqueables |
| 📊 **Historiales completos** | Acceso al historial extenso |
| 🌗 **Modo "¿Cómo me sentiré hoy?"** | Predicción emocional diaria |

---

## Prueba gratuita de 3 meses

**Toda usuaria nueva recibe acceso completo a todas las funciones premium durante los primeros 3 meses.**

### Características de la prueba

- **Activación automática** al registrarse
- **No requiere tarjeta de crédito**
- **Duración exacta:** 90 días desde el registro
- **No renovable:** solo aplica una vez por cuenta
- **Notificaciones de vencimiento:** 15, 7 y 1 día antes
- **Al vencer:** se restringe el acceso a funciones premium automáticamente

### Lógica de implementación

```typescript
// Al registrarse
const trialEndsAt = new Date();
trialEndsAt.setMonth(trialEndsAt.getMonth() + 3);

await supabase.from('users').insert({
  id: userId,
  subscription_status: 'trial',
  trial_ends_at: trialEndsAt,
});
```

```typescript
// Middleware de verificación
function hasActivePremium(user) {
  if (user.subscription_status === 'active') return true;
  if (user.subscription_status === 'trial' && new Date() < user.trial_ends_at) return true;
  return false;
}
```

---

## Planes de suscripción

### Plan Mensual

- **Precio sugerido:** $12,900 COP/mes
- **Renovación:** automática (configurable por la usuaria)
- **Cancelación:** desde la app sin contactar soporte

### Plan Anual

- **Precio sugerido:** $99,900 COP/año (equivalente a $8,325/mes — ahorro del 35%)
- **Renovación:** automática (configurable)
- **Promoción:** "2 meses gratis al pagar anual"

> Los precios son sugeridos. Pueden ajustarse según pruebas de mercado y feedback inicial.

---

## Pasarela de pago: Wompi (Colombia)

### ¿Por qué Wompi?

- Es de Bancolombia, alta confianza local
- Acepta múltiples métodos:
  - **Nequi** (tu opción inicial)
  - **PSE** (débito bancario)
  - **Tarjetas crédito/débito** (Visa, Mastercard, Amex)
  - **Bancolombia Transfer**
  - **Daviplata**
- Sin mensualidad, solo comisión por transacción exitosa
- Dashboard gratuito para monitoreo
- Soporte en español
- API y SDKs bien documentados

### Comisiones Wompi (aproximadas)

| Método | Comisión |
|---|---|
| Nequi | 1.99% + IVA |
| PSE | 1.99% + IVA |
| Tarjeta crédito | 2.99% + IVA |
| Tarjeta débito | 1.99% + IVA |

### Flujo de pago

1. La usuaria entra a "Suscripción" en la app
2. Selecciona plan (mensual o anual)
3. Selecciona método de pago (Nequi, PSE, tarjeta)
4. Se abre el widget de Wompi
5. Completa el pago en Wompi
6. Wompi envía webhook a `/api/webhooks/wompi`
7. FemBloom actualiza el estado de la suscripción
8. La usuaria ve confirmación y acceso premium inmediato

### Integración técnica básica

```typescript
// Botón de pago
<WompiButton
  publicKey={process.env.NEXT_PUBLIC_WOMPI_KEY}
  currency="COP"
  amountInCents={1290000} // $12,900 COP
  reference={generateReference(userId, 'monthly')}
  redirectUrl="https://fembloom.app/suscripcion/exito"
/>
```

```typescript
// Webhook handler en /api/webhooks/wompi
export async function POST(req) {
  const event = await req.json();

  if (event.event === 'transaction.updated' && event.data.status === 'APPROVED') {
    await updateUserSubscription(event.data.reference);
  }

  return Response.json({ received: true });
}
```

---

## Tablas relacionadas en Supabase

Ya documentadas en [08-modelo-datos-preliminar.md](08-modelo-datos-preliminar.md):

- `users.subscription_status`
- `users.trial_ends_at`
- `subscriptions` (historial de suscripciones)
- `payments` (transacciones)

---

## Notificaciones de vencimiento

### Prueba gratuita

| Días antes | Mensaje |
|---|---|
| 15 días | "Tu prueba gratuita termina en 15 días. ¿Te ha gustado FemBloom?" |
| 7 días | "Quedan 7 días de prueba. Conoce nuestros planes para seguir floreciendo 🌸" |
| 1 día | "Tu prueba termina mañana. Suscríbete para no perder tu jardín 🌿" |
| Día 0 | "Tu prueba terminó. ¡Suscríbete para mantener tu progreso!" |

### Suscripción activa

| Días antes | Mensaje |
|---|---|
| 7 días | "Tu suscripción se renueva en 7 días." |
| 1 día | "Tu suscripción se renovará mañana." |

---

## Pantalla "Suscripción"

Vista que la usuaria ve en su perfil:

```
┌──────────────────────────────────────┐
│      ✨ Mi suscripción               │
│  ────────────────────────────────    │
│                                      │
│  Plan actual: Prueba gratuita        │
│  Vence: 15 de marzo de 2026          │
│  Días restantes: 23                  │
│                                      │
│  ────────────────────────────────    │
│                                      │
│  Continúa floreciendo con            │
│  FemBloom Premium 🌸                 │
│                                      │
│  [ Plan mensual ]                    │
│  $12.900 COP / mes                   │
│  Cancelable en cualquier momento     │
│                                      │
│  [ Plan anual - Recomendado ]        │
│  $99.900 COP / año                   │
│  Equivale a $8.325 / mes             │
│  Ahorras 35%                         │
│                                      │
└──────────────────────────────────────┘
```

---

## Cancelación de suscripción

### Reglas

- La usuaria puede cancelar **en cualquier momento** desde la app
- Al cancelar, **el acceso premium se mantiene hasta la fecha ya pagada**
- Después de esa fecha, vuelve al plan gratuito
- **No hay reembolsos parciales** (políticas de Wompi)
- Confirmación con doble verificación

### Mensaje al cancelar

> "¿Estás segura de cancelar tu suscripción? Tu acceso premium continuará hasta el [fecha] y tu jardín virtual quedará guardado para cuando regreses 🌸"

---

## Restricción de funciones tras vencimiento

Cuando una usuaria pierde el acceso premium:

1. **Funciones básicas siguen funcionando** sin cambios
2. **Datos premium se mantienen guardados** (jardín, diario, historiales)
3. Al intentar acceder a una función premium, se muestra:

```
┌──────────────────────────────────────┐
│        🌷 Función premium            │
│                                      │
│  Tu jardín te espera con 4 flores    │
│  Suscríbete para volver a verlo      │
│                                      │
│  [ Ver planes ]                      │
│  [ Volver ]                          │
│                                      │
└──────────────────────────────────────┘
```

---

## Métricas a monitorear

Para optimizar la monetización, monitorear:

| Métrica | Por qué importa |
|---|---|
| Tasa de conversión trial → premium | % de usuarias que se suscriben tras la prueba |
| Tasa de cancelación mensual (churn) | Cuántas usuarias cancelan cada mes |
| Tiempo promedio hasta primera suscripción | Cuánto tiempo pasa antes de pagar |
| Plan más popular | Mensual vs anual |
| Método de pago más usado | Nequi vs PSE vs tarjeta |

---

## Documentación oficial de Wompi

- Sitio web: [wompi.co](https://wompi.co)
- Documentación: [docs.wompi.co](https://docs.wompi.co)
- Plugin Next.js / React: usar el **Widget Checkout**
- Sandbox para pruebas: gratuito y disponible al registrarse
