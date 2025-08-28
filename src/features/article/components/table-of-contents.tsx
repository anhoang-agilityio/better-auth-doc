import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import type { TocItem } from '../utils/toc';

type TableOfContentsProps = {
  items: TocItem[];
  className?: string;
};

type TocItemComponentProps = {
  item: TocItem;
  activeId: string | null;
  level: number;
};

function useActiveHeading(items: TocItem[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        if (visibleHeadings.length > 0) {
          const newActiveId = visibleHeadings[0];
          setActiveId(newActiveId);

          // Find the index of the active item in the flattened TOC
          const flattenItems = (tocItems: TocItem[]): TocItem[] => {
            return tocItems.reduce((acc: TocItem[], item) => {
              acc.push(item);
              if (item.children.length > 0) {
                acc.push(...flattenItems(item.children));
              }
              return acc;
            }, []);
          };

          const flatItems = flattenItems(items);
          const index = flatItems.findIndex((item) => item.id === newActiveId);
          setActiveIndex(index);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0,
      },
    );

    const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [items]);

  return { activeId, activeIndex };
}

function TocItemComponent({ item, activeId, level }: TocItemComponentProps) {
  const isActive = activeId === item.id;
  const hasChildren = item.children.length > 0;

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <li className={cn('list-none')}>
      <a
        href={`#${item.id}`}
        onClick={(e) => handleClick(e, item.id)}
        className={cn(
          'block py-1 text-sm transition-colors duration-200 hover:text-blue-600',
          isActive ? 'font-medium text-blue-600' : 'text-gray-600',
          level === 2 && 'font-medium',
          level === 3 && 'pl-3',
          level === 4 && 'pl-6',
          level === 5 && 'pl-9',
          level === 6 && 'pl-12',
        )}
      >
        {item.text}
      </a>
      {hasChildren && (
        <ul className={cn('mt-1')}>
          {item.children.map((child) => (
            <TocItemComponent
              key={child.id}
              item={child}
              activeId={activeId}
              level={child.level}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { activeId, activeIndex } = useActiveHeading(items);

  // Calculate total height needed for the progress line
  const calculateTotalItems = (tocItems: TocItem[]): number => {
    return tocItems.reduce((count, item) => {
      return count + 1 + calculateTotalItems(item.children);
    }, 0);
  };

  const totalItems = calculateTotalItems(items);

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile toggle button */}
      <div className={cn('sticky top-16 z-10 mb-4 md:hidden')}>
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className={cn(
            'flex w-full items-center justify-between rounded-lg border bg-white p-3 shadow-sm',
          )}
        >
          <span className={cn('font-medium text-gray-900')}>
            Table of Contents
          </span>
          {isVisible ? (
            <ChevronDown className={cn('h-4 w-4')} />
          ) : (
            <ChevronRight className={cn('h-4 w-4')} />
          )}
        </button>
      </div>

      {/* Table of contents */}
      <nav
        className={cn(isVisible ? 'block' : 'hidden md:block')}
        aria-label="Table of contents"
      >
        <div className={cn('sticky top-20')}>
          <h2 className={cn('mb-4 text-sm font-semibold text-gray-900')}>
            On This Page
          </h2>
          <div className={cn('relative')}>
            {/* Progress line */}
            <div
              className={cn(
                'absolute top-0 left-0 w-px bg-gray-200',
                'hidden md:block',
              )}
              style={{ height: `${totalItems * 32}px` }}
            />
            {/* Active highlight */}
            {activeIndex >= 0 && (
              <div
                className={cn(
                  'absolute left-0 w-px bg-blue-600 transition-all duration-300 ease-out',
                  'hidden md:block',
                )}
                style={{
                  top: `${activeIndex * 32}px`,
                  height: '32px',
                }}
              />
            )}
            <ul className={cn('space-y-1 pl-4 md:pl-4')}>
              {items.map((item) => (
                <TocItemComponent
                  key={item.id}
                  item={item}
                  activeId={activeId}
                  level={item.level}
                />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
