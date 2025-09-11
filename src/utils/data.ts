import { convert } from 'html-to-text';

/**
 * Fetches SVG content from a URL
 * @param url - The URL to fetch SVG content from
 * @returns Raw SVG content as a string, or null if fetch fails
 */
export async function fetchSvg(url: string): Promise<string | null> {
  const res = await fetch(url);
  if (!res.ok) return null;
  const text = await res.text();

  return text;
}

/**
 * Extract text from HTML using html-to-text library
 * @param htmlContent - The HTML content to extract text from
 * @returns Plain text content with HTML tags removed
 */
export function extractTextFromHtml(htmlContent: string): string {
  return convert(htmlContent, {
    wordwrap: false,
    selectors: [
      { selector: 'a', options: { ignoreHref: true } },
      { selector: 'img', format: 'skip' },
    ],
  });
}
