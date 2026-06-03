import { requireUserAndOnboarding } from "@/lib/auth/helpers";
import AppHeader from "@/components/nav/app-header";
import BottomNav from "@/components/nav/bottom-nav";

/**
 * Layout compartido por todas las paginas autenticadas (Agenda, Calendario,
 * Jardin, Conocete, Perfil).
 *
 * Verifica autenticacion y onboarding antes de renderizar.
 * Agrega el header arriba y el bottom-nav abajo.
 */
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, supabase } = await requireUserAndOnboarding();

  // Traer perfil para el header (nombre y avatar)
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .single();

  return (
    <>
      <AppHeader
        fullName={profile?.full_name}
        avatarUrl={profile?.avatar_url}
      />
      <main className="pb-24 min-h-[calc(100vh-200px)]">{children}</main>
      <BottomNav />
    </>
  );
}
