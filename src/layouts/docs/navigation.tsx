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

type DocsNavigationCategoryItem = {
  title: string;
  href: string;
  iconSvg?: string | null;
};

type DocsNavigationSubgroup = {
  id: string;
  title: string;
  articles: DocsNavigationCategoryItem[];
};

export type DocsNavigationCategory = {
  id: string;
  title: string;
  iconSvg?: string | null;
  subgroups: DocsNavigationSubgroup[];
  articles: DocsNavigationCategoryItem[]; // Articles without subgroup
};

type DocsNavigationProps = {
  categories: DocsNavigationCategory[];
  currentPath?: string;
};

type ArticleListItemProps = {
  article: DocsNavigationCategoryItem;
  isActive: boolean;
};

const ArticleListItem = ({ article, isActive }: ArticleListItemProps) => {
  return (
    <li>
      <a
        href={article.href}
        className={cn(
          'text-muted-foreground hover:text-foreground hover:bg-primary/10 flex items-center gap-x-2.5 py-1 pl-1 text-nowrap break-words transition-colors',
          isActive && 'text-foreground bg-primary/10',
        )}
      >
        {article.iconSvg ? (
          <div
            className="w-4"
            aria-hidden
            dangerouslySetInnerHTML={{
              __html: article.iconSvg,
            }}
          />
        ) : null}
        {article.title}
      </a>
    </li>
  );
};

export const DocsNavigation = ({
  categories,
  currentPath,
}: DocsNavigationProps) => {
  const defaultValue = React.useMemo(() => {
    const activeCategory = categories.find((category) => {
      // Check direct articles
      const hasActiveDirectArticle = category.articles.some((item) =>
        currentPath ? isPathActive(currentPath, item.href) : false,
      );

      // Check articles within subgroups
      const hasActiveSubgroupArticle = category.subgroups.some((subgroup) =>
        subgroup.articles.some((item) =>
          currentPath ? isPathActive(currentPath, item.href) : false,
        ),
      );

      return hasActiveDirectArticle || hasActiveSubgroupArticle;
    });
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
              <div className="flex flex-col gap-y-1 pt-0 pb-4 pl-2">
                {/* Direct articles (without subgroup) */}
                {category.articles.length > 0 && (
                  <ul className="flex flex-col gap-y-1">
                    {category.articles.map((article) => (
                      <ArticleListItem
                        key={article.href}
                        article={article}
                        isActive={
                          currentPath
                            ? isPathActive(currentPath, article.href)
                            : false
                        }
                      />
                    ))}
                  </ul>
                )}

                {/* Subgroups with their articles */}
                {category.subgroups.map((subgroup) => (
                  <div key={subgroup.id} className="flex flex-col gap-y-1">
                    <div className="flex flex-row items-center gap-2 py-1 pl-1">
                      <p className="text-foreground text-nowrap break-words">
                        {subgroup.title}
                      </p>
                      <div className="bg-foreground h-px flex-1"></div>
                    </div>
                    <ul className="flex flex-col gap-y-1 pl-2">
                      {subgroup.articles.map((article) => (
                        <ArticleListItem
                          key={article.href}
                          article={article}
                          isActive={
                            currentPath
                              ? isPathActive(currentPath, article.href)
                              : false
                          }
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </nav>
  );
};
