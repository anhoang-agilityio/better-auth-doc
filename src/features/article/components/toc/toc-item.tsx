import React from 'react';

import { cn } from '@/lib/utils';

import type { TocItem as TTocItem } from '../../types/toc';

type TocItemProps = {
  item: TTocItem;
  activeId: string | null;
  level: number;
};

export function TocItem({ item, activeId, level }: TocItemProps) {
  const isActive = activeId === item.id;

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
    <li className="flex">
      <a
        href={`#${item.id}`}
        onClick={(e) => handleClick(e, item.id)}
        className={cn(
          'text-muted-foreground hover:text-primary text-sm/[var(--toc-item-height)] [overflow-wrap:anywhere] transition-colors',
          isActive && 'text-primary',
          level === 1 && 'pl-3.5',
          level === 2 && 'pl-6.5',
          level === 3 && 'pl-9.5',
          level === 4 && 'pl-12.5',
          level === 5 && 'pl-15.5',
          level === 6 && 'pl-18.5',
        )}
      >
        {item.text}
      </a>
    </li>
  );
}
