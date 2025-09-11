/**
 * Determines if a path is currently active based on the current page path.
 * @param currentPath - The current page path (e.g., "/docs/getting-started")
 * @param itemPath - The path to check against (e.g., "/docs")
 * @returns True if the item path is active, false otherwise
 */

export const isPathActive = (currentPath: string, itemPath: string) => {
  if (itemPath === '/') {
    return currentPath === '/';
  }

  return currentPath.startsWith(itemPath);
};
