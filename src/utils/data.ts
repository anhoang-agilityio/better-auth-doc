import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

/**
 * Sanitizes HTML/SVG/MathML content using DOMPurify
 * @param text - The content to sanitize
 * @returns Sanitized content as a string
 */
export function sanitizeContent(text: string): string {
  // Create a DOM window for server-side DOMPurify
  const window = new JSDOM('').window;
  const purify = DOMPurify(window);

  // Sanitize content
  return purify.sanitize(text);
}

/**
 * Fetches and sanitizes SVG content from a URL
 * @param url - The URL to fetch SVG content from
 * @returns Sanitized SVG content as a string, or null if fetch fails or no URL provided
 */
export async function fetchSvg(url?: string | null): Promise<string | null> {
  if (!url) return null;
  const res = await fetch(url);
  if (!res.ok) return null;
  const text = await res.text();

  return sanitizeContent(text);
}
