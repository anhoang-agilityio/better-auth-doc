import groq from 'groq';
import { sanityClient } from 'sanity:client';

type AdjacentArticle = {
  id: string;
  title: string;
};

type AdjacentArticles = {
  previous: AdjacentArticle | null;
  next: AdjacentArticle | null;
};

const query = groq`
  *[_type == "article"] | order(category->order asc, coalesce(subgroup->order, -1) asc, order asc) {
    "id": slug.current,
    "title": title,
    "description": description,
    "categoryOrder": category->order,
    "subgroupOrder": subgroup->order,
    "order": order,
    "hasSubgroup": defined(subgroup)
  }
`;

export async function getAdjacentArticles(
  currentSlug: string,
): Promise<AdjacentArticles> {
  const articles = await sanityClient.fetch<
    Array<
      AdjacentArticle & {
        categoryOrder: number;
        subgroupOrder: number | null;
        order: number;
        hasSubgroup: boolean;
      }
    >
  >(query);

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
    previous: previous ? { id: previous.id, title: previous.title } : null,
    next: next ? { id: next.id, title: next.title } : null,
  };
}
