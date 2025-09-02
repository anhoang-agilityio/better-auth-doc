import { useState, useEffect } from 'react';

import type { TocItem } from '../types/toc';

const useActiveHeading = (items: TocItem[]) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    const flatItems = items;

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

      if (isAtPageBottom && flatItems.length > 0) {
        // If at page bottom, set the last item as active
        const lastItem = flatItems[flatItems.length - 1];
        setActiveId(lastItem.id);
        setActiveIndex(flatItems.length - 1);
      } else {
        // Find the first visible heading in the TOC order
        const visibleHeading = flatItems.find((item) =>
          intersectingHeadings.has(item.id),
        );

        if (visibleHeading) {
          setActiveId(visibleHeading.id);
          const index = flatItems.findIndex(
            (item) => item.id === visibleHeading.id,
          );
          setActiveIndex(index);
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

  return { activeId, activeIndex };
};

export { useActiveHeading };
