import type { PortableTextProps } from 'astro-portabletext/types';
import groq from 'groq';

import { loadQuery } from '@/lib/sanity';

export type Article = {
  id: string;
  title: string;
  description: string;
  content: PortableTextProps['value'];
  category: {
    id: string;
    name: string;
  };
  order: number;
};

const query = groq`
  *[_type == "article" && slug.current == $slug][0] {
    "id": slug.current,
    "title": title,
    "description": description,
    "content": content,
    "category": category-> {
      "id": slug.current,
      "name": name
    },
    "order": order
  }
`;

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data: article } = await loadQuery<Article | null>({
    query,
    params: { slug },
  });

  return article;
}
