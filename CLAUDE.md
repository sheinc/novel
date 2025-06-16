# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Novel is a Notion-style WYSIWYG editor with AI-powered autocompletions. This is a monorepo containing:
- `packages/core/` - Main @sheinc/novel NPM package (published to GitHub Packages)
- `apps/web/` - Next.js demo application
- `packages/{tailwind-config,tsconfig}/` - Shared configurations

Tech stack: Next.js 13 (App Router), TypeScript, Tiptap 2.x, TailwindCSS, Vercel AI SDK, Turbo monorepo.

## Essential Commands

**Development:**
```bash
pnpm dev              # Start all development servers
pnpm build            # Build all packages and apps
pnpm lint             # Lint all packages
pnpm format:write     # Format code with Prettier
```

**Package-specific:**
```bash
# Core package (packages/core/)
pnpm build            # Build NPM package with tsup
pnpm dev              # Watch mode development
pnpm check-types      # TypeScript type checking

# Web app (apps/web/)
pnpm dev              # Next.js development server
pnpm build            # Production build
```

**Publishing:**
```bash
pnpm release          # Build and publish core package to GitHub Packages
```

## Architecture

### Monorepo Structure
- **Core Package**: Tiptap-based editor with custom extensions for AI completions, slash commands, image upload, and rich text features
- **Web App**: Demo application showcasing the editor with OpenAI integration
- **Build Pipeline**: Turbo orchestrates builds, tsup bundles core package as CJS/ESM

### Key Extensions (packages/core/src/ui/editor/extensions/)
- AI completions powered by OpenAI should not be used and is deprecated.
- Slash commands for quick block insertion
- Image upload with drag & drop
- Rich text formatting, tables, task lists
- Video embeds and callout blocks

### Branch Strategy
- `she-main` - Primary development branch (NOT main)
- `release` - Production branch for package publishing
- `main` - Read-only fork from original steven-tey/novel
- Always create PRs to `she-main`, not main

## Environment Setup

Required environment variables:
- `OPENAI_API_KEY` - For AI completions. But this feature is deprecated.
- `BLOB_READ_WRITE_TOKEN` - For Vercel Blob storage
- `GITHUB_TOKEN` - For package publishing

## Development Notes

- Uses pnpm v8 and Node.js 18+
- Core package published to GitHub Packages Registry as `@sheinc/novel`
- CSS classes prefixed with `novel-` to avoid conflicts
- No formal test suite - focus on manual testing via web app
- AI features require proper OpenAI API setup in web app