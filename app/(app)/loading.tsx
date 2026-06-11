import { Flower2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <div className="relative">
        <div className="absolute inset-0 bg-petalo/40 blur-2xl rounded-full animate-pulse" />
        <Flower2
          className="relative w-12 h-12 text-coral animate-flotar"
          strokeWidth={1.5}
        />
      </div>
      <p className="mt-4 text-sm text-cacao/60 font-display text-xl">
        Floreciendo...
      </p>
    </div>
  );
}
