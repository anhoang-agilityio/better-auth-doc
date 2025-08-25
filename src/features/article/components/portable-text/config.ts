import type { SomePortableTextComponents } from 'astro-portabletext/types';

import Blockquote from './block/blockquote.astro';
import H1 from './block/h1.astro';
import H2 from './block/h2.astro';
import H3 from './block/h3.astro';
import H4 from './block/h4.astro';
import H5 from './block/h5.astro';
import H6 from './block/h6.astro';
import Normal from './block/normal.astro';
import { CodeBlock } from './code-block';
import InfoBox from './info-box.astro';
import BulletListItem from './list/bullet-list-item.astro';
import BulletList from './list/bullet-list.astro';
import NumberListItem from './list/number-list-item.astro';
import NumberList from './list/number-list.astro';
import CodeMark from './mark/code.astro';
import Em from './mark/em.astro';
import ExternalLink from './mark/external-link.astro';
import InternalLink from './mark/internal-link.astro';
import StrikeThrough from './mark/strike-through.astro';
import Strong from './mark/strong.astro';
import Underline from './mark/underline.astro';
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
    normal: Normal,
  },
  list: {
    bullet: BulletList,
    number: NumberList,
  },
  listItem: {
    bullet: BulletListItem,
    number: NumberListItem,
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
