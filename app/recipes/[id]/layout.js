import { recipes } from "../../data/recipes";
import { SITE_URL, personRef, businessRef, absoluteUrl, JsonLd } from "../../lib/site";

const findRecipe = (id) => recipes.find((r) => String(r.id) === String(id));

// "25 min" → "PT25M"
const isoDuration = (text = "") => {
  const minutes = parseInt(text, 10);
  return Number.isFinite(minutes) ? `PT${minutes}M` : undefined;
};

export function generateStaticParams() {
  return recipes.map((r) => ({ id: String(r.id) }));
}

export function generateMetadata({ params }) {
  const recipe = findRecipe(params.id);
  if (!recipe) return { title: "Receta no encontrada", robots: { index: false } };
  const path = `/recipes/${recipe.id}`;
  return {
    title: `${recipe.title} · Receta saludable`,
    description: recipe.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: recipe.title,
      description: recipe.description,
      ...(recipe.imageUrl ? { images: [{ url: recipe.imageUrl }] } : {}),
    },
  };
}

export default function RecipeLayout({ children, params }) {
  const recipe = findRecipe(params.id);
  if (!recipe) return children;
  const data = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    ...(recipe.imageUrl ? { image: [absoluteUrl(recipe.imageUrl)] } : {}),
    author: personRef(),
    recipeCategory: recipe.category,
    recipeCuisine: "Saludable",
    totalTime: isoDuration(recipe.duration),
    keywords: `${recipe.category}, receta saludable, Nutrinuelita`,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: (recipe.instructions || []).map((text) => ({ "@type": "HowToStep", text })),
  };
  return (
    <>
      <JsonLd data={data} />
      {children}
    </>
  );
}
