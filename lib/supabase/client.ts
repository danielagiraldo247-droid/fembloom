import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente de Supabase para usar en componentes del NAVEGADOR (Client Components).
 *
 * Uso:
 *   import { createClient } from "@/lib/supabase/client";
 *   const supabase = createClient();
 *   const { data } = await supabase.from("users").select("*");
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
