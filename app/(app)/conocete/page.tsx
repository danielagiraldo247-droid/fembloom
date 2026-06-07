import Link from "next/link";
import { ARTICLES, CATEGORY_LABELS } from "@/lib/data/articles";
import { BookOpen, Clock, ChevronRight } from "lucide-react";

export const metadata = { title: "Conócete — FemBloom" };

export default function ConocetePage() {
  const categories = Object.keys(CATEGORY_LABELS) as (keyof typeof CATEGORY_LABELS)[];

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 space-y-6 animate-florecer">
      <header>
        <h1 className="font-display text-4xl text-cacao">Conócete 📖</h1>
        <p className="text-cacao/70 mt-1 text-sm">
          Aprende sobre tu ciclo, fertilidad y bienestar
        </p>
      </header>

      {/* Card destacado */}
      <Link
        href={`/conocete/${ARTICLES[0].slug}`}
        className="tarjeta bg-petalo/15 border border-petalo/30 flex items-center gap-3 hover:shadow-petalo transition group"
      >
        <div className="text-4xl">{ARTICLES[0].emoji}</div>
        <div className="flex-1 space-y-1">
          <p className="text-[10px] text-coral uppercase font-semibold">
            Empieza por aquí
          </p>
          <p className="font-semibold text-cacao">{ARTICLES[0].title}</p>
          <p className="text-xs text-cacao/60">{ARTICLES[0].excerpt}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-cacao/40 group-hover:text-coral transition" />
      </Link>

      {/* Por categorias */}
      {categories.map((cat) => {
        const articles = ARTICLES.filter((a) => a.category === cat);
        if (articles.length === 0) return null;

        return (
          <section key={cat} className="space-y-3">
            <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider px-1">
              {CATEGORY_LABELS[cat]}
            </h2>
            <div className="space-y-2">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/conocete/${article.slug}`}
                  className="tarjeta flex items-center gap-3 hover:shadow-petalo transition group"
                >
                  <div className="text-3xl">{article.emoji}</div>
                  <div className="flex-1 space-y-0.5">
                    <p className="font-semibold text-cacao text-sm">
                      {article.title}
                    </p>
                    <p className="text-xs text-cacao/60">{article.excerpt}</p>
                    <p className="text-[10px] text-cacao/50 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-cacao/40 group-hover:text-coral transition flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <div className="tarjeta bg-menta/20 text-center py-4 space-y-1">
        <BookOpen className="w-6 h-6 text-fertil mx-auto" strokeWidth={1.5} />
        <p className="text-sm font-medium text-cacao">{ARTICLES.length} artículos</p>
        <p className="text-xs text-cacao/60">
          Sigue aprendiendo sobre tu cuerpo 🌸
        </p>
      </div>
    </div>
  );
}
