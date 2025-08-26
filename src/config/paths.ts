export const paths = {
  home: {
    getHref: () => '/',
  },
  docs: {
    getHref: (articleSlug: string) => `/docs/${articleSlug}`,
  },
};
