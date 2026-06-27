"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Clock, X } from "lucide-react";

/**
 * Cierre de sesion por inactividad.
 *
 * Cierra la sesion automaticamente despues de 5 minutos sin actividad.
 * Detecta: mouse, teclado, scroll, toques en pantalla.
 *
 * Muestra advertencia 1 minuto antes del cierre.
 */
const IDLE_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutos
const WARNING_BEFORE_MS = 60 * 1000; // Advertir 1 minuto antes

export default function IdleTimeout() {
  const router = useRouter();
  const supabase = createClient();
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  const lastActivityRef = useRef<number>(Date.now());
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = useCallback(async () => {
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    await supabase.auth.signOut();
    router.push("/login?reason=inactivity");
    router.refresh();
  }, [supabase, router]);

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    setShowWarning(false);
    setSecondsLeft(60);

    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    // Programar advertencia (4 minutos despues)
    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      setSecondsLeft(60);

      // Iniciar countdown visible
      countdownTimerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, IDLE_TIMEOUT_MS - WARNING_BEFORE_MS);
  }, [handleLogout]);

  useEffect(() => {
    // Lista de eventos que indican actividad del usuario
    const events: Array<keyof WindowEventMap> = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    const handleActivity = () => {
      // Si esta mostrando advertencia, no reiniciar (la usuaria debe presionar el boton)
      if (showWarning) return;
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Iniciar timer al montar
    resetTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [resetTimer, showWarning]);

  function handleStayLoggedIn() {
    resetTimer();
  }

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-cacao/40 backdrop-blur-sm animate-florecer">
      <div className="bg-perla rounded-suave shadow-petalo max-w-sm w-full p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-coral" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl text-cacao">
              ¿Sigues ahí?
            </h2>
            <p className="text-sm text-cacao/70 mt-1">
              Tu sesión se cerrará automáticamente por inactividad.
            </p>
          </div>
        </div>

        <div className="text-center bg-petalo/20 rounded-suave p-4">
          <p className="text-xs text-cacao/60 uppercase tracking-wider mb-1">
            Tiempo restante
          </p>
          <p className="font-display text-4xl text-coral">{secondsLeft}s</p>
        </div>

        <div className="flex gap-2">
          <button onClick={handleLogout} className="btn-secundario flex-1">
            <X className="w-4 h-4 inline mr-1" />
            Cerrar sesión
          </button>
          <button onClick={handleStayLoggedIn} className="btn-primario flex-1">
            Seguir conectada 🌸
          </button>
        </div>

        <p className="text-[10px] text-center text-cacao/50">
          Esta función protege tu privacidad si dejaste tu dispositivo sin atender.
        </p>
      </div>
    </div>
  );
}
