import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, CATEGORY_LABELS, ARTICLES } from "@/lib/data/articles";
import { ChevronLeft, Clock } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  return {
    title: article ? `${article.title} — FemBloom` : "Artículo no encontrado",
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  // Articulos relacionados (misma categoria, distinto slug)
  const related = ARTICLES.filter(
    (a) => a.category === article.category && a.slug !== article.slug
  ).slice(0, 3);

  // Convertir markdown simple a HTML
  const paragraphs = article.content.split("\n\n");

  return (
    <article className="max-w-2xl mx-auto px-5 py-6 space-y-6 animate-florecer">
      {/* Volver */}
      <Link
        href="/conocete"
        className="inline-flex items-center gap-1 text-sm text-coral hover:underline"
      >
        <ChevronLeft className="w-4 h-4" />
        Volver
      </Link>

      {/* Header */}
      <header className="space-y-3">
        <div className="text-6xl">{article.emoji}</div>
        <p className="text-xs text-coral uppercase tracking-wider font-semibold">
          {CATEGORY_LABELS[article.category]}
        </p>
        <h1 className="font-display text-4xl text-cacao leading-tight">
          {article.title}
        </h1>
        <p className="text-cacao/70 leading-relaxed">{article.excerpt}</p>
        <p className="text-xs text-cacao/50 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {article.readTime} de lectura
        </p>
      </header>

      {/* Contenido */}
      <div className="prose prose-pink max-w-none">
        {paragraphs.map((para, idx) => {
          if (para.startsWith("## ")) {
            return (
              <h2
                key={idx}
                className="font-display text-2xl text-cacao mt-6 mb-2"
              >
                {para.replace("## ", "")}
              </h2>
            );
          }
          if (para.startsWith("- ")) {
            const items = para.split("\n").map((line) => line.replace(/^- /, ""));
            return (
              <ul key={idx} className="space-y-1 my-3 ml-2">
                {items.map((item, i) => (
                  <li key={i} className="text-cacao/80 flex gap-2 text-sm">
                    <span className="text-coral">•</span>
                    <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p
              key={idx}
              className="text-cacao/80 leading-relaxed my-3 text-[15px]"
              dangerouslySetInnerHTML={{ __html: formatInline(para) }}
            />
          );
        })}
      </div>

      {/* Articulos relacionados */}
      {related.length > 0 && (
        <section className="space-y-3 pt-4 border-t border-petalo/30">
          <h2 className="text-xs font-semibold text-cacao/80 uppercase tracking-wider">
            También te puede interesar
          </h2>
          <div className="space-y-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/conocete/${r.slug}`}
                className="tarjeta flex items-center gap-3 hover:shadow-petalo transition"
              >
                <div className="text-2xl">{r.emoji}</div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-cacao">{r.title}</p>
                  <p className="text-xs text-cacao/60">{r.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

/** Formatea **negritas** dentro de un texto */
function formatInline(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-cacao">$1</strong>');
}
