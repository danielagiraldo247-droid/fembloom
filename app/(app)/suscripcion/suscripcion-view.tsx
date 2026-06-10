"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Heart,
  Check,
  Crown,
  Loader2,
  AlertCircle,
  CreditCard,
  Calendar,
} from "lucide-react";
import { PLANS, PREMIUM_FEATURES, formatPrice, type PlanId } from "@/lib/data/subscription-plans";
import type { SubscriptionInfo } from "@/lib/subscription/access";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";

interface Props {
  subscription: SubscriptionInfo;
  paymentHistory: {
    amount: number;
    currency: string;
    payment_method: string;
    status: string;
    created_at: string;
  }[];
  userName: string;
  userEmail: string;
}

export default function SuscripcionView({
  subscription,
  paymentHistory,
  userName,
  userEmail,
}: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("annual");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  /**
   * Simulacion de pago con Wompi.
   * En produccion real, esto abriria el widget de Wompi.
   * Para el proyecto academico, lo simulamos como aprobado.
   */
  async function handlePay() {
    setProcessing(true);
    setMessage(null);

    const plan = PLANS.find((p) => p.id === selectedPlan);
    if (!plan) {
      setMessage("Plan no encontrado");
      setProcessing(false);
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Sesion expirada");

      // === En PRODUCCION REAL, aqui se abriria el widget de Wompi ===
      // window.WidgetCheckout.open({
      //   currency: "COP",
      //   amountInCents: plan.price * 100,
      //   reference: `fembloom-${user.id}-${Date.now()}`,
      //   publicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
      //   redirectUrl: `${window.location.origin}/suscripcion/exito`,
      // });

      // === Para el proyecto academico, simulamos pago aprobado ===
      const expiresAt = new Date();
      if (plan.id === "monthly") {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      } else {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      }

      // 1. Actualizar el profile a premium
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          subscription_status: "active",
          trial_ends_at: expiresAt.toISOString(),
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // 2. Crear registro de suscripcion
      await supabase.from("subscriptions").insert({
        user_id: user.id,
        plan: plan.id,
        starts_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
        status: "active",
        auto_renew: true,
      });

      // 3. Crear registro de pago
      await supabase.from("payments").insert({
        user_id: user.id,
        amount: plan.price,
        currency: "COP",
        payment_method: "nequi",
        status: "approved",
      });

      setMessage(`¡Plan ${plan.name} activado! 🌸 Disfruta de todas las funciones premium.`);
      setTimeout(() => router.refresh(), 2000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al procesar el pago";
      setMessage(`Error: ${msg}`);
    } finally {
      setProcessing(false);
    }
  }

  async function handleCancel() {
    if (
      !confirm(
        "¿Estás segura? Tu acceso premium continuará hasta tu fecha de vencimiento."
      )
    )
      return;

    setProcessing(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("profiles")
      .update({ subscription_status: "cancelled" })
      .eq("id", user.id);

    setMessage("Tu suscripción fue cancelada. Tu acceso continúa hasta la fecha de vencimiento.");
    setTimeout(() => router.refresh(), 2000);
  }

  const isActive = subscription.status === "active";

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 space-y-6 animate-florecer">
      <header>
        <h1 className="font-display text-4xl text-cacao">Mi suscripción 💎</h1>
        <p className="text-cacao/70 mt-1 text-sm">
          Gestiona tu plan y disfruta sin límites
        </p>
      </header>

      {/* Estado actual */}
      <div
        className={`tarjeta space-y-3 ${
          subscription.hasAccess
            ? "bg-petalo/15 border border-petalo/30"
            : "bg-error/10 border border-error/30"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                subscription.hasAccess
                  ? "bg-gradient-to-br from-petalo to-coral"
                  : "bg-cacao/20"
              }`}
            >
              {subscription.hasAccess ? (
                <Crown className="w-6 h-6 text-white" strokeWidth={1.5} />
              ) : (
                <AlertCircle className="w-6 h-6 text-cacao" strokeWidth={1.5} />
              )}
            </div>
            <div>
              <p className="text-xs text-cacao/60 uppercase tracking-wider font-medium">
                Plan actual
              </p>
              <p className="font-display text-xl text-cacao">
                {subscription.label}
              </p>
            </div>
          </div>
        </div>

        {subscription.daysLeft !== null && subscription.daysLeft > 0 && (
          <div className="flex items-center gap-2 text-sm text-cacao/70">
            <Calendar className="w-4 h-4 text-coral" />
            <span>
              {subscription.daysLeft} días restantes de acceso completo
            </span>
          </div>
        )}

        {!subscription.hasAccess && (
          <p className="text-sm text-cacao/70 leading-relaxed">
            Tu acceso a funciones premium ha terminado. Suscríbete para
            continuar disfrutando de toda la app 🌸
          </p>
        )}
      </div>

      {/* Mensaje de feedback */}
      {message && (
        <div
          className={`rounded-suave px-4 py-3 text-sm animate-florecer ${
            message.startsWith("Error")
              ? "bg-error/15 border border-error/30 text-cacao"
              : "bg-menta/30 border border-fertil/40 text-cacao"
          }`}
        >
          {message}
        </div>
      )}

      {/* Planes (solo si NO tiene activo) */}
      {!isActive && (
        <>
          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider px-1">
              Elige tu plan
            </h2>
            <div className="space-y-3">
              {PLANS.map((plan) => {
                const selected = selectedPlan === plan.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full text-left tarjeta space-y-3 transition relative ${
                      selected
                        ? "ring-2 ring-coral bg-petalo/10"
                        : "hover:shadow-petalo"
                    }`}
                  >
                    {plan.recommended && (
                      <span className="absolute -top-2 left-4 bg-coral text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        RECOMENDADO
                      </span>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-cacao">{plan.name}</p>
                        <p className="text-xs text-cacao/60">{plan.duration}</p>
                      </div>
                      {selected && (
                        <div className="w-6 h-6 rounded-full bg-coral flex items-center justify-center">
                          <Check
                            className="w-3.5 h-3.5 text-white"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-display text-3xl text-coral">
                        {plan.priceLabel}
                      </p>
                      <p className="text-xs text-cacao/60">
                        {plan.pricePerMonth}
                        {plan.savings && (
                          <span className="ml-2 text-fertil font-semibold">
                            · {plan.savings}
                          </span>
                        )}
                      </p>
                    </div>
                    <ul className="space-y-1 pt-2 border-t border-petalo/30">
                      {plan.features.map((f, i) => (
                        <li
                          key={i}
                          className="text-xs text-cacao/80 flex items-center gap-1.5"
                        >
                          <Check className="w-3 h-3 text-fertil flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Boton de pago */}
          <button
            onClick={handlePay}
            disabled={processing}
            className="btn-primario w-full flex items-center justify-center gap-2 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {processing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Pagar con Nequi / PSE / Tarjeta
              </>
            )}
          </button>

          <p className="text-[10px] text-cacao/50 text-center">
            Pago seguro procesado por Wompi (Bancolombia). Aceptamos Nequi, PSE,
            Daviplata y tarjetas crédito/débito.
          </p>
        </>
      )}

      {/* Si esta activa: opcion de cancelar */}
      {isActive && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider px-1">
            Tu plan
          </h2>
          <div className="tarjeta space-y-3">
            <p className="text-sm text-cacao/80">
              Disfrutas de todas las funciones premium. Tu suscripción se
              renueva automáticamente.
            </p>
            <button
              onClick={handleCancel}
              disabled={processing}
              className="btn-secundario w-full disabled:opacity-50"
            >
              Cancelar suscripción
            </button>
          </div>
        </section>
      )}

      {/* Que incluye premium */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider px-1">
          ¿Qué incluye premium?
        </h2>
        <div className="tarjeta space-y-2">
          {PREMIUM_FEATURES.map((feature, i) => (
            <p key={i} className="text-sm text-cacao/80">
              {feature}
            </p>
          ))}
        </div>
      </section>

      {/* Historial de pagos */}
      {paymentHistory.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider px-1">
            Historial de pagos
          </h2>
          <div className="tarjeta space-y-2">
            {paymentHistory.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-petalo/20 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-cacao">
                    {formatPrice(p.amount)}
                  </p>
                  <p className="text-[10px] text-cacao/60 capitalize">
                    {p.payment_method} ·{" "}
                    {format(parseISO(p.created_at), "d MMM yyyy", {
                      locale: es,
                    })}
                  </p>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    p.status === "approved"
                      ? "bg-menta/40 text-fertil"
                      : "bg-cacao/10 text-cacao/60"
                  }`}
                >
                  {p.status === "approved" ? "Aprobado" : p.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer info */}
      <div className="tarjeta bg-bruma/15 text-center space-y-1">
        <Heart className="w-4 h-4 text-coral mx-auto" />
        <p className="text-xs text-cacao/70">
          Cancela cuando quieras · Sin compromisos · Acceso inmediato
        </p>
      </div>
    </div>
  );
}
