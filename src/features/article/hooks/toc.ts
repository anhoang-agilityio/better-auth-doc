import { useState, useEffect } from 'react';

import type { TocItem } from '../types/toc';

const useActiveHeading = (items: TocItem[]) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // Track which headings are currently intersecting
    const intersectingHeadings = new Set<string>();

    // Get nav height from CSS variable
    const navHeight =
      getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height')
        .trim() || '0px';

    const observer = new IntersectionObserver(
      (entries) => {
        // Update the set of intersecting headings
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingHeadings.add(entry.target.id);
          } else {
            intersectingHeadings.delete(entry.target.id);
          }
        });

        // Find the active heading based on current viewport
        updateActiveHeading();
      },
      {
        root: null,
        rootMargin: `${navHeight} 0px 0px 0px`,
        threshold: 0,
      },
    );

    const updateActiveHeading = () => {
      // Check if we've reached the end of the page
      const isAtPageBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

      if (isAtPageBottom && items.length > 0) {
        // If at page bottom, set the last item as active
        const lastItem = items[items.length - 1];
        setActiveId(lastItem.id);
      } else {
        // Find the first visible heading in the TOC order
        const visibleHeading = items.find((item) =>
          intersectingHeadings.has(item.id),
        );

        if (visibleHeading) {
          setActiveId(visibleHeading.id);
        }
      }
    };

    const articleElement = document.getElementById('article-content');
    const headings =
      articleElement?.querySelectorAll('h2, h3, h4, h5, h6') ?? [];
    headings.forEach((heading) => observer.observe(heading));
    window.addEventListener('scroll', updateActiveHeading);

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
      window.removeEventListener('scroll', updateActiveHeading);
    };
  }, [items]);

  // Get active item information
  const activeItem = items.find((item) => item.id === activeId);
  const activeText = activeItem?.text || '';
  const activeIndex = activeId
    ? items.findIndex((item) => item.id === activeId)
    : -1;

  return { activeId, activeIndex, activeItem, activeText };
};

export { useActiveHeading };
