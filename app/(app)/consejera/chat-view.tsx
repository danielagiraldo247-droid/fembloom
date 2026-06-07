"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, Flower2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  created_at?: string;
}

interface Props {
  initialMessages: Message[];
  userName: string;
}

const SUGGESTED_QUESTIONS = [
  "¿Por qué tengo cólicos tan fuertes?",
  "¿Cómo sé si estoy ovulando?",
  "¿Es normal mi ciclo irregular?",
  "Quiero aprender a leer mi cuerpo",
];

export default function ChatView({ initialMessages, userName }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/consejera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.slice(-10), // ultimos 10 mensajes para contexto
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al consultar");
      }

      const botMsg: Message = { role: "assistant", content: data.message };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-180px)] flex flex-col">
      {/* Header */}
      <header className="px-5 py-4 border-b border-petalo/30 bg-perla/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-petalo to-coral flex items-center justify-center">
            <Flower2 className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="font-semibold text-cacao">Bloom</h1>
            <p className="text-xs text-cacao/60 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-fertil animate-pulse" />
              Consejera virtual con IA
            </p>
          </div>
        </div>
      </header>

      {/* Mensajes */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
      >
        {messages.length === 0 ? (
          <div className="text-center space-y-4 py-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-petalo/40 blur-2xl rounded-full" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-petalo to-coral flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <p className="font-display text-2xl text-cacao">
                Hola {userName} 🌸
              </p>
              <p className="text-sm text-cacao/70 max-w-sm mx-auto mt-1">
                Soy Bloom, tu consejera virtual. Puedo orientarte sobre tu
                ciclo, fertilidad, anticonceptivos y bienestar emocional.
              </p>
            </div>
            <div className="grid gap-2 max-w-sm mx-auto">
              <p className="text-xs text-cacao/60 mb-1">Prueba preguntando:</p>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                  className="text-left text-sm px-3 py-2 rounded-suave bg-petalo/15 hover:bg-petalo/30 text-cacao transition disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-suave px-4 py-2.5 text-sm ${
                  msg.role === "user"
                    ? "bg-coral text-white"
                    : "bg-perla shadow-suave text-cacao"
                }`}
              >
                {msg.role === "assistant" && (
                  <p className="text-[10px] text-coral font-semibold mb-1">
                    Bloom
                  </p>
                )}
                <p className="whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-perla shadow-suave rounded-suave px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-coral" />
              <span className="text-xs text-cacao/60">Bloom está escribiendo...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-error/15 border border-error/30 rounded-suave px-4 py-2 text-sm text-cacao">
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-5 py-3 border-t border-petalo/30 bg-perla/80 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregúntame lo que quieras..."
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-botón border border-petalo/40 bg-perla text-cacao placeholder:text-cacao/40 focus:border-coral focus:outline-none transition text-sm disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-11 h-11 rounded-full bg-coral text-white flex items-center justify-center hover:bg-coral/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Enviar"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-cacao/40 text-center mt-2">
          Bloom es IA. Sus respuestas son orientativas, no diagnósticas.
        </p>
      </form>
    </div>
  );
}
