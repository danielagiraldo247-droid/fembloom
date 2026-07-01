-- ============================================================
-- FemBloom - Esquema COMPLETO (schema public)
-- Generado desde el SQL Editor de Supabase (pg_catalog)
-- Proyecto: tanxndxeuxribpddtvom.supabase.co
-- Contenido: extensiones, tablas, columnas, PK/UNIQUE/CHECK/FK,
--            indices, RLS + policies, funciones y triggers.
-- ============================================================
SET search_path = public;

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TABLE IF NOT EXISTS "public"."achievements" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "achievement_code" text NOT NULL,
    "unlocked_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."chat_messages" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "role" text NOT NULL,
    "content" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."contraceptive_methods" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "method_type" text NOT NULL,
    "start_date" date,
    "next_action_date" date,
    "daily_reminder_time" time without time zone,
    "is_active" boolean DEFAULT true,
    "notes" text,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."cycle_settings" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "avg_cycle_length" integer DEFAULT 28 NOT NULL,
    "avg_period_length" integer DEFAULT 5 NOT NULL,
    "last_period_start" date,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."cycles" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "start_date" date NOT NULL,
    "end_date" date,
    "cycle_length" integer,
    "period_length" integer,
    "is_irregular" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."daily_logs" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "log_date" date NOT NULL,
    "is_menstruation" boolean DEFAULT false,
    "flow_intensity" text,
    "cycle_phase" text,
    "note" text,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."garden_progress" (
    "user_id" uuid NOT NULL,
    "current_plant_stage" text DEFAULT 'seed'::text NOT NULL,
    "completed_cycles" integer DEFAULT 0 NOT NULL,
    "streak_days" integer DEFAULT 0 NOT NULL,
    "longest_streak" integer DEFAULT 0 NOT NULL,
    "total_flowers" integer DEFAULT 0 NOT NULL,
    "last_activity_date" date,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."journal_entries" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "entry_date" date NOT NULL,
    "content" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."moods" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "daily_log_id" uuid,
    "log_date" date NOT NULL,
    "mood_type" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."payments" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "subscription_id" uuid,
    "amount" numeric NOT NULL,
    "currency" text DEFAULT 'COP'::text NOT NULL,
    "payment_method" text NOT NULL,
    "wompi_transaction_id" text,
    "status" text DEFAULT 'pending'::text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" uuid NOT NULL,
    "email" text NOT NULL,
    "full_name" text,
    "avatar_url" text,
    "birth_date" date,
    "subscription_status" text DEFAULT 'trial'::text NOT NULL,
    "trial_ends_at" timestamp with time zone DEFAULT (now() + '3 mons'::interval) NOT NULL,
    "discrete_mode" boolean DEFAULT false NOT NULL,
    "objective" text,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."relations" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "relation_date" date NOT NULL,
    "relation_time" time without time zone,
    "with_protection" boolean DEFAULT false NOT NULL,
    "protection_type" text,
    "observation" text,
    "in_fertile_window" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."reminders" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "reminder_type" text NOT NULL,
    "title" text NOT NULL,
    "message" text,
    "scheduled_at" timestamp with time zone NOT NULL,
    "is_sent" boolean DEFAULT false,
    "is_dismissed" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "plan" text NOT NULL,
    "starts_at" timestamp with time zone DEFAULT now() NOT NULL,
    "expires_at" timestamp with time zone NOT NULL,
    "status" text DEFAULT 'active'::text NOT NULL,
    "auto_renew" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."symptoms" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "daily_log_id" uuid,
    "log_date" date NOT NULL,
    "symptom_type" text NOT NULL,
    "body_zone" text,
    "is_custom" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "public"."achievements" ADD CONSTRAINT "achievements_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."achievements" ADD CONSTRAINT "achievements_user_id_achievement_code_key" UNIQUE (user_id, achievement_code);

ALTER TABLE "public"."chat_messages" ADD CONSTRAINT "chat_messages_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."chat_messages" ADD CONSTRAINT "chat_messages_role_check" CHECK ((role = ANY (ARRAY['user'::text, 'assistant'::text])));

ALTER TABLE "public"."contraceptive_methods" ADD CONSTRAINT "contraceptive_methods_method_type_check" CHECK ((method_type = ANY (ARRAY['pills'::text, 'injection'::text, 'iud'::text, 'jadelle'::text, 'implant'::text, 'condom'::text, 'none'::text])));

ALTER TABLE "public"."contraceptive_methods" ADD CONSTRAINT "contraceptive_methods_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."cycle_settings" ADD CONSTRAINT "cycle_settings_avg_cycle_length_check" CHECK (((avg_cycle_length >= 21) AND (avg_cycle_length <= 45)));

ALTER TABLE "public"."cycle_settings" ADD CONSTRAINT "cycle_settings_avg_period_length_check" CHECK (((avg_period_length >= 2) AND (avg_period_length <= 10)));

ALTER TABLE "public"."cycle_settings" ADD CONSTRAINT "cycle_settings_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."cycle_settings" ADD CONSTRAINT "cycle_settings_user_id_key" UNIQUE (user_id);

ALTER TABLE "public"."cycles" ADD CONSTRAINT "cycles_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."daily_logs" ADD CONSTRAINT "daily_logs_cycle_phase_check" CHECK ((cycle_phase = ANY (ARRAY['menstrual'::text, 'follicular'::text, 'ovulation'::text, 'luteal'::text])));

ALTER TABLE "public"."daily_logs" ADD CONSTRAINT "daily_logs_flow_intensity_check" CHECK ((flow_intensity = ANY (ARRAY['spotting'::text, 'light'::text, 'moderate'::text, 'heavy'::text])));

ALTER TABLE "public"."daily_logs" ADD CONSTRAINT "daily_logs_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."daily_logs" ADD CONSTRAINT "daily_logs_user_id_log_date_key" UNIQUE (user_id, log_date);

ALTER TABLE "public"."garden_progress" ADD CONSTRAINT "garden_progress_current_plant_stage_check" CHECK ((current_plant_stage = ANY (ARRAY['seed'::text, 'sprout'::text, 'stem'::text, 'bud'::text, 'flower'::text])));

ALTER TABLE "public"."garden_progress" ADD CONSTRAINT "garden_progress_pkey" PRIMARY KEY (user_id);

ALTER TABLE "public"."journal_entries" ADD CONSTRAINT "journal_entries_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."moods" ADD CONSTRAINT "moods_mood_type_check" CHECK ((mood_type = ANY (ARRAY['happy'::text, 'sad'::text, 'irritable'::text, 'anxious'::text, 'calm'::text, 'sensitive'::text, 'energetic'::text, 'tired'::text])));

ALTER TABLE "public"."moods" ADD CONSTRAINT "moods_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'declined'::text, 'error'::text])));

ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_email_key" UNIQUE (email);

ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_objective_check" CHECK ((objective = ANY (ARRAY['seeking_pregnancy'::text, 'avoiding_pregnancy'::text, 'tracking_only'::text])));

ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_subscription_status_check" CHECK ((subscription_status = ANY (ARRAY['trial'::text, 'active'::text, 'expired'::text, 'cancelled'::text])));

ALTER TABLE "public"."relations" ADD CONSTRAINT "relations_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."reminders" ADD CONSTRAINT "reminders_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."subscriptions" ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."subscriptions" ADD CONSTRAINT "subscriptions_plan_check" CHECK ((plan = ANY (ARRAY['trial'::text, 'monthly'::text, 'annual'::text])));

ALTER TABLE "public"."subscriptions" ADD CONSTRAINT "subscriptions_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'cancelled'::text, 'expired'::text])));

ALTER TABLE "public"."symptoms" ADD CONSTRAINT "symptoms_body_zone_check" CHECK ((body_zone = ANY (ARRAY['head'::text, 'abdomen'::text, 'back'::text, 'chest'::text, 'legs'::text, 'general'::text])));

ALTER TABLE "public"."symptoms" ADD CONSTRAINT "symptoms_pkey" PRIMARY KEY (id);

ALTER TABLE "public"."achievements" ADD CONSTRAINT "achievements_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."chat_messages" ADD CONSTRAINT "chat_messages_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."contraceptive_methods" ADD CONSTRAINT "contraceptive_methods_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."cycle_settings" ADD CONSTRAINT "cycle_settings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."cycles" ADD CONSTRAINT "cycles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."daily_logs" ADD CONSTRAINT "daily_logs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."garden_progress" ADD CONSTRAINT "garden_progress_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."journal_entries" ADD CONSTRAINT "journal_entries_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."moods" ADD CONSTRAINT "moods_daily_log_id_fkey" FOREIGN KEY (daily_log_id) REFERENCES daily_logs(id) ON DELETE CASCADE;

ALTER TABLE "public"."moods" ADD CONSTRAINT "moods_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_subscription_id_fkey" FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL;

ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."relations" ADD CONSTRAINT "relations_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."reminders" ADD CONSTRAINT "reminders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."symptoms" ADD CONSTRAINT "symptoms_daily_log_id_fkey" FOREIGN KEY (daily_log_id) REFERENCES daily_logs(id) ON DELETE CASCADE;

ALTER TABLE "public"."symptoms" ADD CONSTRAINT "symptoms_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX idx_chat_user_date ON public.chat_messages USING btree (user_id, created_at);

CREATE INDEX idx_cycles_user_date ON public.cycles USING btree (user_id, start_date DESC);

CREATE INDEX idx_daily_logs_user_date ON public.daily_logs USING btree (user_id, log_date DESC);

CREATE INDEX idx_journal_user_date ON public.journal_entries USING btree (user_id, entry_date DESC);

CREATE INDEX idx_moods_user_date ON public.moods USING btree (user_id, log_date DESC);

CREATE INDEX idx_payments_user_date ON public.payments USING btree (user_id, created_at DESC);

CREATE INDEX idx_relations_user_date ON public.relations USING btree (user_id, relation_date DESC);

CREATE INDEX idx_subscriptions_user ON public.subscriptions USING btree (user_id, status);

CREATE INDEX idx_symptoms_user_date ON public.symptoms USING btree (user_id, log_date DESC);

ALTER TABLE "public"."achievements" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chat_messages" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."contraceptive_methods" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."cycle_settings" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."cycles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."daily_logs" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."garden_progress" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."journal_entries" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."moods" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."payments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."relations" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."reminders" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."symptoms" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_own_achievements" ON "public"."achievements" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE POLICY "user_own_chats" ON "public"."chat_messages" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE POLICY "user_own_methods" ON "public"."contraceptive_methods" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE POLICY "user_own_cycle_settings" ON "public"."cycle_settings" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE POLICY "user_own_cycles" ON "public"."cycles" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE POLICY "user_own_daily_logs" ON "public"."daily_logs" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE POLICY "user_own_garden" ON "public"."garden_progress" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE POLICY "user_own_journal" ON "public"."journal_entries" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE POLICY "user_own_moods" ON "public"."moods" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE POLICY "user_own_payments" ON "public"."payments" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE POLICY "Las usuarias actualizan su propio perfil" ON "public"."profiles" AS PERMISSIVE FOR UPDATE TO public
  USING ((auth.uid() = id));

CREATE POLICY "Las usuarias insertan su propio perfil" ON "public"."profiles" AS PERMISSIVE FOR INSERT TO public
  WITH CHECK ((auth.uid() = id));

CREATE POLICY "Las usuarias ven su propio perfil" ON "public"."profiles" AS PERMISSIVE FOR SELECT TO public
  USING ((auth.uid() = id));

CREATE POLICY "user_own_relations" ON "public"."relations" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE POLICY "user_own_reminders" ON "public"."reminders" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE POLICY "user_own_subscriptions" ON "public"."subscriptions" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE POLICY "user_own_symptoms" ON "public"."symptoms" AS PERMISSIVE FOR ALL TO public
  USING ((auth.uid() = user_id));

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      ''
    ),
    new.raw_user_meta_data->>'avatar_url'
  );
  insert into public.garden_progress (user_id) values (new.id);
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.touch_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

CREATE TRIGGER cycle_settings_touch BEFORE UPDATE ON public.cycle_settings FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE TRIGGER daily_logs_touch BEFORE UPDATE ON public.daily_logs FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE TRIGGER garden_progress_touch BEFORE UPDATE ON public.garden_progress FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE TRIGGER journal_entries_touch BEFORE UPDATE ON public.journal_entries FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ============================================================
-- Trigger en auth.users (schema 'auth', gestionado por Supabase)
-- No aparece en el volcado de 'public' porque vive fuera de ese
-- schema, pero es el que dispara public.handle_new_user() al
-- registrarse una usuaria. Reconstruido (patron estandar Supabase).
-- Confirmado en la base de datos (schema auth).
-- ============================================================
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();
