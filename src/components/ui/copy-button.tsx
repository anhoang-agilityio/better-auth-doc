'use client';

import { Check, Copy } from 'lucide-react';

import { useCopy } from '@/hooks/use-copy';
import { cn } from '@/lib/shadcn';

import { Button } from './button';

type CopyButtonProps = {
  text: string;
  className?: string;
};

export function CopyButton({ text, className }: CopyButtonProps) {
  const { copy, isCopied } = useCopy();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('text-muted-foreground size-7', className)}
      onClick={() => copy(text)}
      aria-label={isCopied ? 'Copied!' : 'Copy to clipboard'}
    >
      <Check
        className={cn(
          'size-3.5 text-green-600 transition-transform',
          !isCopied && 'scale-0',
        )}
      />
      <Copy
        className={cn(
          'absolute size-3.5 transition-transform',
          isCopied && 'scale-0',
        )}
      />
    </Button>
  );
}
