import { paths } from '@/config/paths';

const pages = [
  {
    title: 'home',
    path: paths.home.getHref(),
  },
  {
    title: 'docs',
    path: paths.docs.getHref('introduction'),
  },
  {
    title: 'github',
    path: 'https://github.com/better-auth/better-auth',
    attributes: {
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  },
];

export { pages };
