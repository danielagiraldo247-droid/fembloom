# 08 - Modelo de Datos Preliminar

Esquema inicial de base de datos en Supabase (PostgreSQL) para FemBloom.

> Este modelo es preliminar y se irá ajustando durante la Fase 2 del roadmap.

---

## Tablas principales

### 1. `users` (manejada por Supabase Auth + tabla extendida)

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | ID de Supabase Auth |
| email | text | Correo electrónico |
| full_name | text | Nombre completo |
| birth_date | date | Fecha de nacimiento |
| avatar_url | text | URL foto de perfil |
| created_at | timestamp | Fecha de registro |
| trial_ends_at | timestamp | Fin de prueba gratuita (3 meses desde registro) |
| subscription_status | enum | `trial`, `active`, `expired`, `cancelled` |
| discrete_mode | boolean | Modo discreto activado |
| objective | enum | `seeking_pregnancy`, `avoiding_pregnancy`, `tracking_only` |

---

### 2. `cycle_settings` — Configuración del ciclo

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK → users.id) | |
| avg_cycle_length | integer | Duración promedio en días (21-45) |
| avg_period_length | integer | Duración promedio de menstruación (2-10) |
| last_period_start | date | Inicio del último período conocido |
| updated_at | timestamp | |

---

### 3. `cycles` — Historial de ciclos

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| start_date | date | Inicio del período |
| end_date | date | Fin del período |
| cycle_length | integer | Duración del ciclo completo |
| period_length | integer | Duración de la menstruación |
| is_irregular | boolean | Detectado como irregular |
| created_at | timestamp | |

---

### 4. `daily_logs` — Registro diario general

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| log_date | date | Día del registro |
| is_menstruation | boolean | Marcado como día de menstruación |
| flow_intensity | enum | `spotting`, `light`, `moderate`, `heavy` |
| cycle_phase | enum | `menstrual`, `follicular`, `ovulation`, `luteal` |
| note | text | Nota personal (max 500 chars) |
| created_at | timestamp | |
| updated_at | timestamp | |

**Constraint:** unique(user_id, log_date)

---

### 5. `symptoms` — Síntomas registrados

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| daily_log_id | uuid (FK → daily_logs.id) | |
| symptom_type | text | Tipo de síntoma (cólicos, dolor de cabeza, etc.) |
| body_zone | enum | `head`, `abdomen`, `back`, `chest`, `legs`, `other` |
| is_custom | boolean | Si es síntoma personalizado |
| created_at | timestamp | |

---

### 6. `moods` — Estados de ánimo

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| daily_log_id | uuid (FK) | |
| mood_type | enum | `happy`, `sad`, `irritable`, `anxious`, `calm`, `sensitive`, `energetic`, `tired` |
| created_at | timestamp | |

---

### 7. `relations` — Registro de relaciones sexuales

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| relation_date | date | Fecha |
| relation_time | time | Hora opcional |
| with_protection | boolean | Con protección o no |
| protection_type | text | Tipo de protección (opcional) |
| observation | text | Observación privada |
| in_fertile_window | boolean | Calculado: si fue en ventana fértil |
| created_at | timestamp | |

---

### 8. `contraceptive_methods` — Método anticonceptivo activo

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| method_type | enum | `pills`, `injection`, `iud`, `jadelle`, `implant`, `condom`, `none` |
| start_date | date | Fecha de inicio del método |
| next_action_date | date | Próxima dosis/renovación/control |
| daily_reminder_time | time | Para pastillas |
| is_active | boolean | Si está activo |
| notes | text | Notas adicionales |
| created_at | timestamp | |

---

### 9. `reminders` — Recordatorios programados

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| reminder_type | enum | `pill`, `injection`, `iud_check`, `implant_renewal`, `period_predicted`, `ovulation`, `fertile_window`, `custom` |
| title | text | Título del recordatorio |
| message | text | Mensaje completo |
| scheduled_at | timestamp | Cuándo se debe disparar |
| is_sent | boolean | Si ya se envió |
| is_dismissed | boolean | Si la usuaria lo descartó |
| created_at | timestamp | |

---

### 10. `journal_entries` — Diario emocional privado

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| entry_date | date | Fecha de la entrada |
| content | text | Contenido encriptado |
| created_at | timestamp | |
| updated_at | timestamp | |

---

### 11. `garden_progress` — Progreso del jardín virtual

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| current_plant_stage | enum | `seed`, `sprout`, `stem`, `bud`, `flower` |
| completed_cycles | integer | Total de ciclos completos |
| streak_days | integer | Racha actual de días con registro |
| longest_streak | integer | Racha más larga |
| total_flowers | integer | Flores conseguidas (1 por ciclo completo) |
| last_activity_date | date | |
| updated_at | timestamp | |

---

### 12. `achievements` — Logros desbloqueados

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| achievement_code | text | Código del logro (ej. `first_entry`, `7_day_streak`) |
| unlocked_at | timestamp | |

**Constraint:** unique(user_id, achievement_code)

---

### 13. `chat_messages` — Conversaciones con la consejera virtual

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| role | enum | `user`, `assistant` |
| content | text | Mensaje |
| created_at | timestamp | |

---

### 14. `subscriptions` — Histórico de suscripciones

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| plan | enum | `trial`, `monthly`, `annual` |
| starts_at | timestamp | |
| expires_at | timestamp | |
| status | enum | `active`, `cancelled`, `expired` |
| auto_renew | boolean | |
| created_at | timestamp | |

---

### 15. `payments` — Pagos realizados

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| subscription_id | uuid (FK) | |
| amount | numeric | |
| currency | text | `COP` |
| payment_method | enum | `nequi`, `pse`, `card` |
| wompi_transaction_id | text | ID de la transacción en Wompi |
| status | enum | `pending`, `approved`, `declined`, `error` |
| created_at | timestamp | |

---

### 16. `notification_preferences` — Preferencias de notificaciones

| Campo | Tipo | Descripción |
|---|---|---|
| user_id | uuid (PK, FK) | |
| period_alerts | boolean | Notificar inicio de período |
| ovulation_alerts | boolean | Notificar ovulación |
| fertile_window_alerts | boolean | Notificar ventana fértil |
| contraceptive_reminders | boolean | Recordatorios de método |
| discrete_mode_enabled | boolean | Modo discreto activado |
| daily_check_in | boolean | Pregunta diaria de cómo te sientes |
| preferred_time | time | Hora preferida de notificaciones |

---

## Seguridad: Row Level Security (RLS)

Todas las tablas tendrán RLS activado para que cada usuaria **solo pueda ver y modificar sus propios datos**.

Ejemplo de política en Supabase:

```sql
CREATE POLICY "Users see their own data"
ON daily_logs
FOR ALL
USING (auth.uid() = user_id);
```

---

## Encriptación de datos sensibles

Los siguientes campos se almacenan **encriptados a nivel aplicación** antes de guardarse:

- `journal_entries.content`
- `relations.observation`

Se usará una librería como `crypto-js` con clave derivada del usuario o cifrado a nivel Postgres con `pgcrypto`.

---

## Índices recomendados

Para mejorar rendimiento de consultas frecuentes:

```sql
CREATE INDEX idx_daily_logs_user_date ON daily_logs(user_id, log_date DESC);
CREATE INDEX idx_cycles_user_start ON cycles(user_id, start_date DESC);
CREATE INDEX idx_relations_user_date ON relations(user_id, relation_date DESC);
CREATE INDEX idx_symptoms_user_log ON symptoms(user_id, daily_log_id);
CREATE INDEX idx_reminders_scheduled ON reminders(user_id, scheduled_at) WHERE is_sent = false;
```
