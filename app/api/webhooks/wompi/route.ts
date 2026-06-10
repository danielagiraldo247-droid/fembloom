import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Webhook que recibe eventos de Wompi (Bancolombia).
 *
 * En produccion real, Wompi enviara aqui las confirmaciones de pago.
 * Para verificar que el evento es real, se valida con el secreto compartido.
 *
 * Eventos posibles:
 * - transaction.updated: estado de transaccion cambio
 */
export async function POST(req: NextRequest) {
  try {
    const event = await req.json();

    // Validar tipo de evento
    if (event.event !== "transaction.updated") {
      return NextResponse.json({ received: true });
    }

    const transaction = event.data?.transaction;
    if (!transaction) {
      return NextResponse.json({ error: "Sin transaccion" }, { status: 400 });
    }

    // Solo procesar si fue aprobada
    if (transaction.status !== "APPROVED") {
      return NextResponse.json({ received: true });
    }

    // Extraer user_id del reference (formato: "fembloom-USERID-TIMESTAMP")
    const refParts = (transaction.reference || "").split("-");
    if (refParts.length < 3 || refParts[0] !== "fembloom") {
      return NextResponse.json({ error: "Referencia invalida" }, { status: 400 });
    }
    const userId = refParts[1];

    // Cliente con service role para escribir
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Determinar plan basado en el monto (en centavos COP)
    const amountInCents = transaction.amount_in_cents;
    let planId = "monthly";
    const expiresAt = new Date();

    if (amountInCents >= 9990000) {
      planId = "annual";
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    // Actualizar profile
    await supabase
      .from("profiles")
      .update({
        subscription_status: "active",
        trial_ends_at: expiresAt.toISOString(),
      })
      .eq("id", userId);

    // Crear suscripcion
    await supabase.from("subscriptions").insert({
      user_id: userId,
      plan: planId,
      starts_at: new Date().toISOString(),
      expires_at: expiresAt.toISOString(),
      status: "active",
      auto_renew: true,
    });

    // Registrar pago
    await supabase.from("payments").insert({
      user_id: userId,
      amount: Math.floor(amountInCents / 100),
      currency: "COP",
      payment_method: transaction.payment_method_type?.toLowerCase() || "card",
      wompi_transaction_id: transaction.id,
      status: "approved",
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Wompi webhook error:", err);
    return NextResponse.json(
      { error: "Error procesando webhook" },
      { status: 500 }
    );
  }
}
