import { ScrollArea } from '@/components/ui/scroll-area';

import { useActiveHeading } from '../../hooks/toc';
import type { TocItem as TTocItem } from '../../types/toc';

import { TocItem } from './toc-item';

type TocContentProps = {
  items: TTocItem[];
};

export function TocContent({ items }: TocContentProps) {
  const { activeId, activeIndex } = useActiveHeading(items);

  return (
    <ScrollArea className="mx-4 mt-2 mb-4 ps-px md:mx-6 xl:m-0">
      {items.length > 0 ? (
        <>
          {/* Progress line */}
          <div className="bg-foreground/10 absolute top-0 left-4 h-full w-px" />
          {/* Active highlight */}
          {activeIndex >= 0 && (
            <div
              className="bg-foreground absolute left-4 w-px transition-all duration-300 ease-out"
              style={{
                top: `calc(${activeIndex} * (var(--toc-item-height) + var(--toc-item-gap)))`,
                height: 'var(--toc-item-height)',
              }}
            />
          )}
          <ul className="flex flex-col gap-[var(--toc-item-gap)]">
            {items.map((item) => (
              <TocItem
                key={item.id}
                item={item}
                activeId={activeId}
                level={item.level}
              />
            ))}
          </ul>
        </>
      ) : (
        <div className="bg-card text-muted-foreground rounded-lg border p-3 text-xs">
          No Headings
        </div>
      )}
    </ScrollArea>
  );
}
