import { SITE_URL } from "./lib/site";
import { events } from "./data/events";
import { posts } from "./data/posts";
import { recipes } from "./data/recipes";

export default function sitemap() {
  const now = new Date();
  const page = (path, priority, changeFrequency = "monthly", lastModified = now) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/eventos", 0.8, "weekly"),
    page("/blog", 0.7, "weekly"),
    page("/recipes", 0.7, "weekly"),
    ...events.map((e) => page(`/eventos/${e.id}`, 0.6, "monthly", new Date(e.end || e.start) < now ? new Date(e.end || e.start) : now)),
    ...posts.map((p) => page(`/blog/${p.id}`, 0.6)),
    ...recipes.map((r) => page(`/recipes/${r.id}`, 0.5)),
  ];
}
