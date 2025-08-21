import type { SomePortableTextComponents } from 'astro-portabletext/types';

import Blockquote from './blocks/blockquote.astro';
import H1 from './blocks/h1.astro';
import H2 from './blocks/h2.astro';
import H3 from './blocks/h3.astro';
import H4 from './blocks/h4.astro';
import H5 from './blocks/h5.astro';
import H6 from './blocks/h6.astro';
import { CodeBlock } from './code-block';
import InfoBox from './info-box.astro';
import ListItem from './list/list-item.astro';
import List from './list/list.astro';
import CodeMark from './marks/code.astro';
import Em from './marks/em.astro';
import ExternalLink from './marks/external-link.astro';
import InternalLink from './marks/internal-link.astro';
import StrikeThrough from './marks/strike-through.astro';
import Strong from './marks/strong.astro';
import Underline from './marks/underline.astro';
import Steps from './steps.astro';

export const portableTextComponents: SomePortableTextComponents = {
  block: {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    blockquote: Blockquote,
  },
  list: {
    bullet: List,
    number: List,
  },
  listItem: {
    bullet: ListItem,
    number: ListItem,
  },
  type: {
    infoBox: InfoBox,
    codeBlock: CodeBlock,
    steps: Steps,
  },
  mark: {
    strong: Strong,
    em: Em,
    underline: Underline,
    'strike-through': StrikeThrough,
    code: CodeMark,
    internalLink: InternalLink,
    externalLink: ExternalLink,
  },
};
