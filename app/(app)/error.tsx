"use client";

import { useEffect } from "react";
import { Flower2 } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center space-y-4">
      <Flower2 className="w-12 h-12 text-coral" strokeWidth={1.5} />
      <div className="space-y-1">
        <h2 className="font-display text-2xl text-cacao">
          Oops, algo no salió como esperábamos
        </h2>
        <p className="text-sm text-cacao/60">
          Pero no te preocupes, podemos intentarlo de nuevo 🌸
        </p>
      </div>
      <button onClick={reset} className="btn-primario">
        Intentar de nuevo
      </button>
    </div>
  );
}
