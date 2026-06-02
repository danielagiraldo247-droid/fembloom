import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Ruta de callback para los enlaces magicos de Supabase.
 *
 * Esta ruta recibe los enlaces que Supabase envia por correo cuando:
 * - Una usuaria pide recuperar contrasena
 * - Una usuaria confirma su correo (si esta activado)
 * - Una usuaria inicia sesion con Google OAuth (proximamente)
 *
 * Pasos:
 * 1. Recibe un "code" en la URL.
 * 2. Lo intercambia con Supabase por una sesion activa.
 * 3. Redirige a la pagina destino (parametro "next").
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/agenda";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Si algo falla, mandar a login con mensaje
  return NextResponse.redirect(
    `${origin}/login?error=callback_failed`
  );
}
