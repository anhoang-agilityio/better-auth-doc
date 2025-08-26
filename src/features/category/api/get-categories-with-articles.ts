import groq from 'groq';
import { sanityClient } from 'sanity:client';

type ArticleItem = {
  title: string;
  slug: string;
  icon: string | null;
};

export type CategoryWithArticles = {
  id: string;
  title: string;
  icon: string;
  items: ArticleItem[];
};

const query = groq`
  *[_type == "category"] | order(order asc) {
    "id": slug.current,
    "title": name,
    "icon": icon.asset->url,
    "items": *[_type == "article" && references(^._id)] | order(order asc) {
      "title": title,
      "slug": slug.current,
      "icon": icon.asset->url
    }
  }
`;

export async function getCategoriesWithArticles(): Promise<
  CategoryWithArticles[]
> {
  return sanityClient.fetch<CategoryWithArticles[]>(query);
}
