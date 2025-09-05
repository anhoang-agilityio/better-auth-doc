import groq from 'groq';
import { sanityClient } from 'sanity:client';

export type ArticleSlug = {
  slug: string;
};

const query = groq`
  *[_type == "article"] | order(order asc) {
    "slug": slug.current
  }
`;

export async function getAllArticleSlugs(): Promise<ArticleSlug[]> {
  return sanityClient.fetch<ArticleSlug[]>(query);
}
