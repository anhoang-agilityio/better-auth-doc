# Better Auth Documentation

A comprehensive documentation website for Better Auth - the most comprehensive authentication framework for TypeScript.

🌐 **Live Demo:** [https://better-auth-doc.vercel.app/](https://better-auth-doc.vercel.app/)

## 🚀 Tech Stack

- **[Astro](https://astro.build)**
- **[React](https://react.dev)**
- **[Sanity CMS](https://sanity.io)**
- **[TypeScript](https://typescriptlang.org)**
- **[Tailwind CSS](https://tailwindcss.com)**
- **[Shiki](https://shiki.style)**
- **[Shadcn UI](https://ui.shadcn.com/)**

## 📋 Prerequisites

- **Node.js** >= 22.0.0
- **pnpm** (recommended package manager)

## 🛠️ Installation

### 1. Clone the repository

### 2. Set up environment variables:

Create a `.env` file in the studio directory with the following variables:

```env
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=
```

### 3. Install dependencies:
```bash
pnpm install
```

### 4. Development

Start the development server:

```bash
pnpm dev
```

## 🧞 Commands

All commands should be run from the `/web` directory:

| Command | Action |
|:--------|:-------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start development server |
| `pnpm build` | Build production site |
| `pnpm preview` | Preview production build locally |

## 📁 Project Structure

```
web/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── themes/          # Dark/light theme components
│   │   ├── ui/              # Reusable UI components (Radix-based)
│   │   └── utils/           # Utility components
│   ├── features/
│   │   ├── article/         # Article rendering and TOC
│   │   │   ├── api/         # Article data fetching
│   │   │   ├── components/  # Article-specific components
│   │   │   └── utils/       # Article utilities
│   │   └── category/        # Category management
│   ├── layouts/
│   │   ├── base/            # Base layout with header/navigation
│   │   └── docs/            # Documentation layout with sidebar
│   ├── lib/                 # Third-party library configurations
│   ├── pages/               # Astro pages and routes
│   ├── styles/              # Global CSS styles
│   └── utils/               # Shared utilities
├── astro.config.mjs         # Astro configuration
└── package.json
```

## 🎨 Key Features

### Content Management
- **Sanity CMS Integration**: Headless CMS for managing documentation content
- **Portable Text Rendering**: Rich text content with custom blocks and components
- **Dynamic Content**: Articles, categories, and navigation fetched from Sanity

### User Experience  
- **Dark/Light Mode**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Client Router**: Smooth transition when navigating between routes
- **Table of Contents**: Auto-generated navigation for articles
- **Syntax Highlighting**: Shiki-powered code blocks with GitHub themes
- **Copy to Clipboard**: One-click code copying functionality

### Performance
- **Static Site Generation**: Pre-built pages for optimal performance
- **Incremental Static Regeneration**: 10-minute cache with Vercel ISR
- **Prefetching**: Viewport-based prefetching for smooth navigation

## 🔧 Sanity Integration

### Configuration:
- Project ID: Configured via environment variables
- Dataset: Configured via environment variables
- API Version: `2025-08-18`

### Content Types:
- Articles with portable text content
- Categories for organization

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Sanity Documentation](https://sanity.io/docs)
- [Better Auth Documentation](https://better-auth.com)
