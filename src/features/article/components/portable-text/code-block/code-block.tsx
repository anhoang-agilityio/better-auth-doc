'use client';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Tab = {
  value: string;
  label: string;
  content: string; // HTML string from shiki
  filename?: string;
};

type CodeBlockProps = {
  tabs: Tab[];
  defaultTab?: string;
  useTabs?: boolean;
};

export default function CodeBlock({
  tabs,
  defaultTab,
  useTabs,
}: CodeBlockProps) {
  const hasTabs = Boolean(useTabs);
  const defaultValue = defaultTab || (tabs.length > 0 ? tabs[0].value : '');

  if (!hasTabs) {
    const only = tabs[0];
    if (!only) return null;
    return (
      <Card className="bg-secondary/50 my-6 text-sm">
        {only.filename && (
          <div className="bg-muted border-b px-4 py-1.5">
            <span className="text-muted-foreground truncate">
              {only.filename}
            </span>
          </div>
        )}
        <div
          className="max-h-[600px] overflow-y-auto p-4"
          dangerouslySetInnerHTML={{ __html: only.content }}
        />
      </Card>
    );
  }

  return (
    <Card className="bg-secondary/50 my-6 text-sm">
      <Tabs className="gap-0" defaultValue={defaultValue}>
        <TabsList className="bg-secondary">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.filename && (
              <div className="bg-muted border-y px-4 py-1.5">
                <span className="text-muted-foreground truncate">
                  {tab.filename}
                </span>
              </div>
            )}
            <div
              className="max-h-[600px] overflow-y-auto p-4"
              dangerouslySetInnerHTML={{ __html: tab.content }}
            />
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
