import groq from 'groq';
import { sanityClient } from 'sanity:client';

type ArticleItem = {
  title: string;
  slug: string;
  icon: string | null;
};

type SubgroupItem = {
  id: string;
  title: string;
  articles: ArticleItem[];
};

type CategoryWithArticles = {
  id: string;
  title: string;
  icon: string;
  subgroups: SubgroupItem[];
  articles: ArticleItem[]; // Articles without subgroup
};

const query = groq`
  *[_type == "category"] | order(order asc) {
    "id": slug.current,
    "title": name,
    "icon": icon.asset->url,
    "subgroups": *[_type == "subgroup" && references(^._id)] | order(order asc) {
      "id": slug.current,
      "title": name,
      "articles": *[_type == "article" && references(^._id)] | order(order asc) {
        "title": title,
        "slug": slug.current,
        "icon": icon.asset->url
      }
    },
    "articles": *[_type == "article" && references(^._id) && !defined(subgroup)] | order(order asc) {
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
