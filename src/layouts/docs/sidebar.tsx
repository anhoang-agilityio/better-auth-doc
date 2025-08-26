'use client';

import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { isPathActive } from '@/utils/paths';

export type DocsSidebarItem = {
  title: string;
  href: string;
  iconSvg?: string | null;
};

export type DocsSidebarCategory = {
  id: string;
  title: string;
  iconSvg?: string | null;
  items: DocsSidebarItem[];
};

export type DocsSidebarProps = {
  categories: DocsSidebarCategory[];
  currentPath?: string;
};

export function DocsSidebar({ categories, currentPath }: DocsSidebarProps) {
  const defaultValue = React.useMemo(() => {
    const activeCategory = categories.find((category) =>
      category.items.some((item) =>
        currentPath ? isPathActive(currentPath, item.href) : false,
      ),
    );
    return activeCategory?.id;
  }, [categories, currentPath]);

  return (
    <nav aria-label="Docs navigation">
      <Accordion
        type="single"
        defaultValue={defaultValue}
        collapsible
        className="w-full"
      >
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger>
              <span className="flex items-center gap-x-2.5">
                {category.iconSvg ? (
                  <div
                    className="min-w-4"
                    aria-hidden
                    dangerouslySetInnerHTML={{ __html: category.iconSvg }}
                  />
                ) : null}
                {category.title}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col">
                {category.items.map((item) => {
                  const isActive = currentPath
                    ? isPathActive(currentPath, item.href)
                    : false;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className={cn(
                          'text-muted-foreground hover:text-foreground hover:bg-primary/10 flex items-center gap-x-2.5 px-5 py-1 text-nowrap break-words transition-colors',
                          isActive && 'text-foreground bg-primary/10',
                        )}
                      >
                        {item.iconSvg ? (
                          <div
                            className="min-w-4"
                            aria-hidden
                            dangerouslySetInnerHTML={{ __html: item.iconSvg }}
                          />
                        ) : null}
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </nav>
  );
}
