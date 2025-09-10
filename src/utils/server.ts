import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
/**
 * Sanitize content using JSDOM window object
 * Only works in server environment
 * @param text - The content to sanitize
 * @returns Sanitized content as a string
 */
export function sanitizeContent(text: string): string {
  const jsdomWindow = new JSDOM('').window;
  const purify = DOMPurify(jsdomWindow);
  return purify.sanitize(text);
}
