import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Middleware global de Next.js.
 *
 * Se ejecuta antes de cada request para refrescar la sesion
 * de Supabase si es necesario.
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Aplica a todas las rutas EXCEPTO:
     * - Archivos estaticos (_next/static)
     * - Imagenes optimizadas (_next/image)
     * - Favicons e iconos
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
