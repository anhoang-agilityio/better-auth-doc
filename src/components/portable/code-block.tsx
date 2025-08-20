'use client';

import * as React from 'react';
import { codeToHtml } from 'shiki';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type CodeTab = {
  title: string;
  code: {
    code: string;
    language?: string;
    filename?: string;
  };
};

type CodeBlockNode = {
  useTabs?: boolean;
  title?: string;
  code?: {
    code: string;
    language?: string;
    filename?: string;
  };
  tabs?: CodeTab[];
};

type CodeBlockProps = {
  node?: CodeBlockNode;
};

// Helper function to get language display name
const getLanguageDisplayName = (language?: string) => {
  if (!language) return 'Text';
  const languageMap: Record<string, string> = {
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    jsx: 'JSX',
    tsx: 'TSX',
    json: 'JSON',
    bash: 'Bash',
    shell: 'Shell',
    sql: 'SQL',
    html: 'HTML',
    css: 'CSS',
    python: 'Python',
    java: 'Java',
    csharp: 'C#',
    cpp: 'C++',
    c: 'C',
    go: 'Go',
    rust: 'Rust',
    php: 'PHP',
    ruby: 'Ruby',
    swift: 'Swift',
    kotlin: 'Kotlin',
    scala: 'Scala',
    r: 'R',
    matlab: 'MATLAB',
    yaml: 'YAML',
    toml: 'TOML',
    markdown: 'Markdown',
    xml: 'XML',
    dockerfile: 'Dockerfile',
    nginx: 'Nginx',
    apache: 'Apache',
    git: 'Git',
    diff: 'Diff',
    ini: 'INI',
    properties: 'Properties',
    log: 'Log',
    plaintext: 'Text',
    text: 'Text',
  };
  return languageMap[language.toLowerCase()] || language;
};

// Helper function to get language color
const getLanguageColor = (language?: string) => {
  if (!language) return 'bg-gray-500';
  const colorMap: Record<string, string> = {
    typescript: 'bg-blue-500',
    javascript: 'bg-yellow-500',
    jsx: 'bg-yellow-500',
    tsx: 'bg-blue-500',
    json: 'bg-gray-700',
    bash: 'bg-green-500',
    shell: 'bg-green-500',
    sql: 'bg-orange-500',
    html: 'bg-red-500',
    css: 'bg-blue-600',
    python: 'bg-blue-400',
    java: 'bg-red-600',
    csharp: 'bg-purple-600',
    cpp: 'bg-blue-700',
    c: 'bg-blue-700',
    go: 'bg-blue-500',
    rust: 'bg-orange-600',
    php: 'bg-purple-500',
    ruby: 'bg-red-500',
    swift: 'bg-orange-500',
    kotlin: 'bg-purple-500',
    scala: 'bg-red-600',
    yaml: 'bg-blue-500',
    toml: 'bg-blue-600',
    markdown: 'bg-blue-500',
    xml: 'bg-orange-500',
    dockerfile: 'bg-blue-500',
    nginx: 'bg-green-600',
    apache: 'bg-red-600',
    git: 'bg-orange-600',
    diff: 'bg-gray-600',
  };
  return colorMap[language.toLowerCase()] || 'bg-gray-500';
};

export default function CodeBlock({ node }: CodeBlockProps) {
  const useTabs = node?.useTabs ?? false;
  const title = node?.title;
  const code = node?.code;
  const tabs = node?.tabs ?? [];
  const [highlightedCode, setHighlightedCode] = React.useState<
    Record<string, string>
  >({});

  const highlightCode = React.useCallback(
    async (code: string, key: string, language?: string) => {
      if (!language) return code;
      try {
        // const lang = language.toLowerCase();
        const html = await codeToHtml(code, {
          lang: 'typescript',
          theme: 'github-dark',
        });
        setHighlightedCode((prev) => ({ ...prev, [key]: html }));
        return html;
      } catch (error) {
        console.error('Failed to highlight code:', error);
        return code;
      }
    },
    [],
  );

  React.useEffect(() => {
    if (useTabs && tabs.length > 0) {
      tabs.forEach((tab, index) => {
        if (tab.code.code && tab.code.language) {
          highlightCode(tab.code.code, `tab-${index}`, tab.code.language);
        }
      });
    } else if (code?.code && code?.language) {
      highlightCode(code.code, 'single', code.language);
    }
  }, [useTabs, tabs, code, highlightCode]);

  if (useTabs && tabs.length > 0) {
    return (
      <Card className="my-6">
        {title && (
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent className="pt-0">
          <Tabs defaultValue="0" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-fit">
              {tabs.map((tab, index) => (
                <TabsTrigger key={index} value={index.toString()}>
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab, index) => (
              <TabsContent key={index} value={index.toString()}>
                <div className="mt-4">
                  {tab.code.filename && (
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {tab.code.filename}
                      </Badge>
                      <Badge
                        className={`${getLanguageColor(
                          tab.code.language,
                        )} text-white`}
                      >
                        {getLanguageDisplayName(tab.code.language)}
                      </Badge>
                    </div>
                  )}
                  <div className="relative">
                    <div className="absolute top-2 right-2 z-10">
                      <Badge
                        variant="outline"
                        className="border-gray-600 bg-gray-800/50 font-mono text-xs text-gray-300"
                      >
                        {getLanguageDisplayName(tab.code.language)}
                      </Badge>
                    </div>
                    <div
                      className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"
                      dangerouslySetInnerHTML={{
                        __html:
                          highlightedCode[`tab-${index}`] || tab.code.code,
                      }}
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-6">
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="pt-0">
        <div className="mt-4">
          {code?.filename && (
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs">
                {code.filename}
              </Badge>
              <Badge
                className={`${getLanguageColor(code?.language)} text-white`}
              >
                {getLanguageDisplayName(code?.language)}
              </Badge>
            </div>
          )}
          <div className="relative">
            <div className="absolute top-2 right-2 z-10">
              <Badge
                variant="outline"
                className="border-gray-600 bg-gray-800/50 font-mono text-xs text-gray-300"
              >
                {getLanguageDisplayName(code?.language)}
              </Badge>
            </div>
            <div
              className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"
              dangerouslySetInnerHTML={{
                __html: highlightedCode['single'] || code?.code || '',
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
