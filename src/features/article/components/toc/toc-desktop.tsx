import { Text } from 'lucide-react';

import type { TocItem as TTocItem } from '../../types/toc';

import { TocContent } from './toc-content';

type TocDesktopProps = {
  items: TTocItem[];
};

export function TocDesktop({ items }: TocDesktopProps) {
  return (
    <nav
      className="mt-12 mb-2 flex h-[calc(100dvh-var(--nav-height))] w-[286px] flex-col gap-3 pe-4"
      aria-label="Table of contents"
    >
      <h3 className="text-muted-foreground mt-7 inline-flex items-center gap-1.5 text-sm">
        <Text className="size-4" />
        <span>On This Page</span>
      </h3>
      <TocContent items={items} />
    </nav>
  );
}
