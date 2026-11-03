import { posts } from "../../data/posts";
import { SITE_URL, personRef, businessRef, absoluteUrl, JsonLd } from "../../lib/site";

const MONTHS = { ene: 1, feb: 2, mar: 3, abr: 4, may: 5, jun: 6, jul: 7, ago: 8, sep: 9, oct: 10, nov: 11, dic: 12 };

// "2 Ene 2026" → "2026-01-02"
function isoDate(text = "") {
  const [d, m, y] = text.trim().split(/\s+/);
  const month = MONTHS[m?.toLowerCase().slice(0, 3)];
  if (!d || !month || !y) return undefined;
  return `${y}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

const findPost = (id) => posts.find((p) => String(p.id) === String(id));

export function generateStaticParams() {
  return posts.map((p) => ({ id: String(p.id) }));
}

export function generateMetadata({ params }) {
  const post = findPost(params.id);
  if (!post) return { title: "Artículo no encontrado", robots: { index: false } };
  const path = `/blog/${post.id}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: post.title,
      description: post.excerpt,
      publishedTime: isoDate(post.date),
      authors: ["Manuela Acevedo Álvarez"],
      ...(post.imageUrl ? { images: [{ url: post.imageUrl }] } : {}),
    },
  };
}

export default function PostLayout({ children, params }) {
  const post = findPost(params.id);
  if (!post) return children;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: isoDate(post.date),
    inLanguage: "es-CO",
    articleSection: post.category,
    ...(post.imageUrl ? { image: [post.imageUrl] } : {}),
    author: personRef(),
    publisher: businessRef(),
    mainEntityOfPage: absoluteUrl(`/blog/${post.id}`),
  };
  return (
    <>
      <JsonLd data={data} />
      {children}
    </>
  );
}
