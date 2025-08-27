'use client';

import { ChevronRight, Menu } from 'lucide-react';
import type React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { isPathActive } from '@/utils/paths';

import { pages } from './config';

type MobileNavigationProps = {
  currentPath?: string;
  children?: React.ReactNode;
};

const MobileNavigation = ({ currentPath, children }: MobileNavigationProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[80vh] w-dvw border-b px-4 py-5">
        <ul className="flex flex-col divide-y">
          {pages.map((page) => {
            const isActive = currentPath
              ? isPathActive(currentPath, page.path)
              : false;
            return (
              <li key={page.path}>
                <a
                  href={page.path}
                  {...page.attributes}
                  className={cn(
                    'text-muted-foreground hover:text-foreground hover:bg-primary/10 flex items-center gap-x-2.5 py-2 pl-1 text-sm text-nowrap break-words transition-colors',
                    isActive && 'text-foreground bg-primary/10',
                  )}
                >
                  <ChevronRight className="size-4" />
                  {page.title}
                </a>
              </li>
            );
          })}
        </ul>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNavigation;
