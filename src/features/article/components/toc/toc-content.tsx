import { useRef, useState, useEffect } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';

import { useActiveHeading } from '../../hooks/toc';
import type { TocItem as TTocItem } from '../../types/toc';

import { TocItem } from './toc-item';

type TocContentProps = {
  items: TTocItem[];
};

type HighlightPosition = {
  top: number;
  height: number;
};

export function TocContent({ items }: TocContentProps) {
  const { activeId, activeIndex } = useActiveHeading(items);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [highlightPosition, setHighlightPosition] =
    useState<HighlightPosition | null>(null);

  // Set highlight position based on active index
  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      const element = itemRefs.current[activeIndex];
      if (element) {
        const measurement = {
          top: element.offsetTop,
          height: element.offsetHeight,
        };
        setHighlightPosition(measurement);
      }
    } else if (activeIndex < 0) {
      // Clear highlight when no active item
      setHighlightPosition(null);
    }
  }, [activeIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (
      activeIndex >= 0 &&
      itemRefs.current[activeIndex] &&
      scrollAreaRef.current
    ) {
      const activeElement = itemRefs.current[activeIndex];
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-slot="scroll-area-viewport"]',
      );

      if (activeElement && scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();

        // Check if element is outside the visible area
        const isAboveView = elementRect.top < containerRect.top;
        const isBelowView = elementRect.bottom > containerRect.bottom;

        if (isAboveView || isBelowView) {
          activeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }
      }
    }
  }, [activeIndex]);

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className="mx-4 mt-2 mb-4 w-full ps-px md:mx-6 xl:m-0"
    >
      {items.length > 0 ? (
        <div className="relative">
          {/* Progress line */}
          <div className="bg-foreground/10 absolute top-0 left-4 h-full w-px" />
          {/* Active highlight */}
          {activeIndex >= 0 && highlightPosition && (
            <div
              className="bg-foreground absolute left-4 w-px transition-all duration-300 ease-out"
              style={{
                top: `${highlightPosition.top}px`,
                height: `${highlightPosition.height}px`,
              }}
            />
          )}
          <ul className="flex flex-col gap-[var(--toc-item-gap)]">
            {items.map((item, index) => (
              <TocItem
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                item={item}
                activeId={activeId}
                level={item.level}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-card text-muted-foreground rounded-lg border p-3 text-xs">
          No Headings
        </div>
      )}
    </ScrollArea>
  );
}
