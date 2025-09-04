import groq from 'groq';

import { loadQuery } from '@/lib/sanity';

type AdjacentArticle = {
  id: string;
  title: string;
  description: string;
};

type AdjacentArticles = {
  previous: AdjacentArticle | null;
  next: AdjacentArticle | null;
};

const query = groq`
  *[_type == "article"] | order(category->order asc, order asc) {
    "id": slug.current,
    "title": title,
    "description": description,
    "categoryOrder": category->order,
    "order": order
  }
`;

export async function getAdjacentArticles(
  currentSlug: string,
): Promise<AdjacentArticles> {
  const { data: articles } = await loadQuery<
    Array<AdjacentArticle & { categoryOrder: number; order: number }>
  >({ query });

  const currentIndex = articles.findIndex(
    (article) => article.id === currentSlug,
  );

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const previous = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const next =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return {
    previous: previous
      ? {
          id: previous.id,
          title: previous.title,
          description: previous.description,
        }
      : null,
    next: next
      ? { id: next.id, title: next.title, description: next.description }
      : null,
  };
}
