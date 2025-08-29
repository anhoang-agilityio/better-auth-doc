import { ChevronRight, Text } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

import type { TocItem as TTocItem } from '../../types/toc';

import { TocContent } from './toc-content';

type TocMobileProps = {
  items: TTocItem[];
};

export function TocMobile({ items }: TocMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const collapsibleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        collapsibleRef.current &&
        !collapsibleRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Collapsible
      ref={collapsibleRef}
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        'border-foreground/10 bg-background/80 border-b backdrop-blur-md transition-colors',
        isOpen && 'shadow-lg',
      )}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-nowrap focus-visible:outline-none md:px-6"
        >
          <Text />
          <span>On This Page</span>
          <ChevronRight
            className={cn(
              'text-muted-foreground size-4 shrink-0 transition-all',
              isOpen ? 'rotate-90' : '-ms-1.5',
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex max-h-[50vh] flex-col">
        <TocContent items={items} />
      </CollapsibleContent>
    </Collapsible>
  );
}
