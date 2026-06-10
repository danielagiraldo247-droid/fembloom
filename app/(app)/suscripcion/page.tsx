import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import { getSubscriptionInfo } from "@/lib/subscription/access";
import SuscripcionView from "./suscripcion-view";

export const metadata = { title: "Mi suscripción — FemBloom" };

export default async function SuscripcionPage() {
  const { user, supabase } = await requireUserAndOnboarding();

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status, trial_ends_at, full_name")
    .eq("id", user.id)
    .single();

  const { data: paymentHistory } = await supabase
    .from("payments")
    .select("amount, currency, payment_method, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const subscription = getSubscriptionInfo({
    subscription_status: profile?.subscription_status,
    trial_ends_at: profile?.trial_ends_at,
  });

  return (
    <SuscripcionView
      subscription={subscription}
      paymentHistory={paymentHistory || []}
      userName={profile?.full_name || "Usuaria"}
      userEmail={user.email || ""}
    />
  );
}
