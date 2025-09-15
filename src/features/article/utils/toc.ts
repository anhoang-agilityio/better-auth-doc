import type { PortableTextProps } from 'astro-portabletext/types';

import type { StepsBlock } from '../components/portable-text/steps.astro';
import type { TocItem } from '../types/toc';

type PortableTextBlock = {
  _type: string;
  style?: string;
  children?: Array<{ text?: string }>;
};

/**
 * Converts text into a URL-safe ID suitable for table of contents anchors.
 *
 * Transforms the input by:
 * 1. Converting to lowercase
 * 2. Removing non-alphanumeric characters (except spaces and hyphens)
 * 3. Converting spaces to hyphens
 * 4. Normalizing multiple consecutive hyphens to single hyphens
 * 5. Removing leading/trailing hyphens
 *
 * Used for generating navigation IDs from heading text and step titles.
 *
 * @param text - The text to convert to an ID
 * @returns URL-safe ID string
 * @example generateId("Getting Started with Auth") // returns "getting-started-with-auth"
 */
export function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Extracts concatenated plain text from Portable Text children nodes.
 *
 * @param children - Array of children nodes with optional text properties
 * @returns Concatenated and trimmed text string
 */
export function extractTextFromChildren(
  children: Array<{ text?: string }> = [],
): string {
  return children
    .map((child) => child.text || '')
    .join('')
    .trim();
}

/**
 * Parses Portable Text content to build a table of contents structure.
 *
 * Extracts headings (h2-h6) and step block titles to create navigation items.
 * Each item includes an auto-generated URL-safe ID, display text, and heading level.
 *
 * @param content - Portable Text content array to parse
 * @returns Array of table of contents items with id, text, and level properties
 */
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
        });
      }
    }
  }

  return headings;
}
