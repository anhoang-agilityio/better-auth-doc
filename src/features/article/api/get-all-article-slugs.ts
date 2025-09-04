import groq from 'groq';

import { loadQuery } from '@/lib/sanity';

export type ArticleSlug = {
  slug: string;
};

const query = groq`
  *[_type == "article"] | order(order asc) {
    "slug": slug.current
  }
`;

export async function getAllArticleSlugs(): Promise<ArticleSlug[]> {
  const { data: articleSlugs } = await loadQuery<ArticleSlug[]>({ query });
  return articleSlugs;
}
