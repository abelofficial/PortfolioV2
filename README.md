# Portfolio V2

A modern portfolio website built with Next.js 16, React 19, and Tailwind CSS 4.

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Package Manager:** pnpm
- **Linting:** ESLint (Flat Config)
- **Code Formatting:** Prettier

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

Install dependencies using pnpm:

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site. The page auto-updates as you edit files.

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `public/` - Static assets
- `eslint.config.mjs` - ESLint configuration (Flat Config)
- `.prettierrc` - Prettier configuration

## Code Standards

### Components

- Use functional components with arrow functions
- Use `use client` only when necessary for interactive features
- Use the `cn()` utility for Tailwind class merging

### Styling

- Follow Tailwind CSS class ordering (Layout → Box Model → Typography)
- Leverage Tailwind 4 variables and features
- Classes are automatically sorted by Prettier

### TypeScript

- Avoid using `any` type
- Maintain strict type safety throughout the codebase

### Formatting

- Single quotes for strings
- 2-space indentation
- Run `pnpm format` to auto-format code

## Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Format code
pnpm format
```

## Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com), created by the Next.js team.

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Vercel automatically detects Next.js and configures the build

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
