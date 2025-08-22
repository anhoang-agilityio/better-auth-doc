'use client';

import { Card, CardContent } from '@/components/ui/card';
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
      <Card className="my-6">
        <CardContent className="pt-6">
          <div className="mt-4">
            {only.filename && (
              <div className="mb-3">
                <span className="inline-block rounded bg-gray-700 px-2 py-1 font-mono text-xs text-gray-300">
                  {only.filename}
                </span>
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: only.content }} />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-6">
      <CardContent className="pt-6">
        <Tabs defaultValue={defaultValue} className="w-full">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="mt-4">
                {tab.filename && (
                  <div className="mb-3">
                    <span className="inline-block rounded bg-gray-700 px-2 py-1 font-mono text-xs text-gray-300">
                      {tab.filename}
                    </span>
                  </div>
                )}
                <div dangerouslySetInnerHTML={{ __html: tab.content }} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
