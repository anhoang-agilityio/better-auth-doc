export type Metadata = {
  title?: string;
  description?: string;
  generator?: string;
  applicationName?: string;
  referrer?: string;
  keywords?: string[];
  authors?: { name: string; url?: string }[];
  creator?: string;
  publisher?: string;
  formatDetection?: {
    telephone?: boolean;
    date?: boolean;
    address?: boolean;
    email?: boolean;
    url?: boolean;
  };
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
  icons?: {
    icon?: string;
    shortcut?: string;
    apple?: string;
    other?: { rel: string; url: string }[];
  };
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: { url: string; width?: number; height?: number }[];
    type?: string;
    locale?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
  verification?: {
    google?: string;
    yahoo?: string;
    yandex?: string;
    me?: string;
    other?: Record<string, string>;
  };
  appleWebApp?: {
    title?: string;
    statusBarStyle?: 'default' | 'black' | 'black-translucent';
    startupImage?: string[];
  };
  category?: string;
  other?: Record<string, string>;
};
