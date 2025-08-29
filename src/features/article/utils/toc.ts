import type { PortableTextProps } from 'astro-portabletext/types';

import type { StepsBlock } from '@/features/article/components/portable-text/steps.astro';

import type { TocItem } from '../types/toc';

type PortableTextBlock = {
  _type: string;
  style?: string;
  children?: Array<{ text?: string }>;
};

export function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function extractTextFromChildren(
  children: Array<{ text?: string }> = [],
): string {
  return children
    .map((child) => child.text || '')
    .join('')
    .trim();
}

export function extractTocFromPortableText(
  content: PortableTextProps['value'],
): TocItem[] {
  if (!Array.isArray(content)) return [];

  const headings: TocItem[] = [];
  const headingLevels = ['h2', 'h3', 'h4', 'h5', 'h6'];

  for (const block of content) {
    const portableBlock = block as PortableTextBlock;

    if (
      portableBlock._type === 'block' &&
      portableBlock.style &&
      headingLevels.includes(portableBlock.style) &&
      portableBlock.children
    ) {
      const text = extractTextFromChildren(portableBlock.children);
      if (text) {
        const level = parseInt(portableBlock.style.substring(1), 10);
        const id = generateId(text);

        headings.push({
          id,
          text,
          level,
          children: [],
        });
      }
    } else if (portableBlock._type === 'steps') {
      const stepsBlock = block as StepsBlock;

      // Process each step title as a regular heading
      for (const item of stepsBlock.items) {
        const stepId = generateId(item.title);
        headings.push({
          id: stepId,
          text: item.title,
          level: stepsBlock.headingLevel,
          children: [],
        });
      }
    }
  }

  return buildHierarchicalToc(headings);
}

function buildHierarchicalToc(flatHeadings: TocItem[]): TocItem[] {
  const result: TocItem[] = [];
  const stack: TocItem[] = [];

  for (const heading of flatHeadings) {
    // Remove items from stack that are at the same level or deeper
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      // This is a top-level heading
      result.push(heading);
    } else {
      // This is a child of the last item in the stack
      stack[stack.length - 1].children.push(heading);
    }

    stack.push(heading);
  }

  return result;
}
