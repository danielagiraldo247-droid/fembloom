import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import DiarioView from "./diario-view";

export const metadata = { title: "Mi diario — FemBloom" };

export default async function DiarioPage() {
  const { user, supabase } = await requireUserAndOnboarding();

  const { data: entries } = await supabase
    .from("journal_entries")
    .select("id, entry_date, content, created_at")
    .eq("user_id", user.id)
    .order("entry_date", { ascending: false })
    .limit(50);

  return <DiarioView initialEntries={entries || []} />;
}
