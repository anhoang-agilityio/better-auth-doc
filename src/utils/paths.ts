export const isPathActive = (currentPath: string, itemPath: string) => {
  if (itemPath === '/') {
    return currentPath === '/';
  }

  return currentPath.startsWith(itemPath);
};
