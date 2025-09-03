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

export type DocsNavigationCategoryItem = {
  title: string;
  href: string;
  iconSvg?: string | null;
};

export type DocsNavigationCategory = {
  id: string;
  title: string;
  iconSvg?: string | null;
  items: DocsNavigationCategoryItem[];
};

export type DocsNavigationProps = {
  categories: DocsNavigationCategory[];
  currentPath?: string;
};

export const DocsNavigation = ({
  categories,
  currentPath,
}: DocsNavigationProps) => {
  const defaultValue = React.useMemo(() => {
    const activeCategory = categories.find((category) =>
      category.items.some((item) =>
        currentPath ? isPathActive(currentPath, item.href) : false,
      ),
    );
    return activeCategory?.id;
  }, [categories, currentPath]);

  return (
    <nav aria-label="Docs navigation" className="size-full overflow-y-auto">
      <Accordion
        type="single"
        defaultValue={defaultValue}
        collapsible
        className="w-full divide-y md:border-b"
      >
        {categories.map((category) => (
          <AccordionItem
            key={category.id}
            value={category.id}
            className="px-0 md:px-5"
          >
            <AccordionTrigger>
              <span className="flex items-center gap-x-2">
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
              <ul className="flex flex-col gap-y-1 divide-y pt-0 pb-4 pl-4">
                {category.items.map((item) => {
                  const isActive = currentPath
                    ? isPathActive(currentPath, item.href)
                    : false;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className={cn(
                          'text-muted-foreground hover:text-foreground hover:bg-primary/10 flex items-center gap-x-2.5 py-1 pl-1 text-nowrap break-words transition-colors',
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
};
