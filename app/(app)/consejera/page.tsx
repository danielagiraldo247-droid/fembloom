import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import ChatView from "./chat-view";

export const metadata = { title: "Consejera Virtual — FemBloom" };

export default async function ConsejeraPage() {
  const { user, supabase } = await requireUserAndOnboarding();

  // Cargar historial reciente (ultimos 20 mensajes)
  const { data: history } = await supabase
    .from("chat_messages")
    .select("role, content, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(20);

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const nombre = profile?.full_name?.split(" ")[0] || "amiga";

  return <ChatView initialMessages={history || []} userName={nombre} />;
}
