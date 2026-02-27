# Portfolio V2

A modern, multilingual portfolio website built with Next.js 16, React 19, and Tailwind CSS 4. Content is managed via DatoCMS, AI-powered features use OpenAI, and data is cached/stored with Upstash Redis and Upstash Vector.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Package Manager:** pnpm 10
- **Linting:** ESLint (Flat Config)
- **Code Formatting:** Prettier
- **CMS:** DatoCMS
- **AI:** OpenAI via AI SDK
- **Cache / Rate Limiting:** Upstash Redis
- **Vector Search:** Upstash Vector
- **Analytics:** Vercel Analytics & Speed Insights
- **Git Hooks:** Husky + commitlint + lint-staged

## Prerequisites

- **Node.js** 20+
- **pnpm** 10+
- Accounts / API keys for the external services listed in [Environment Variables](#environment-variables)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/abelofficial/PortfolioV2.git
cd PortfolioV2
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env.local
```

See the [Environment Variables](#environment-variables) section for a description of each key.

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page auto-updates as you edit files.

## Environment Variables

All variables are described in [`.env.example`](.env.example). Create a `.env.local` file at the root of the project and provide values for:

| Variable | Description |
|---|---|
| `BASE_URL` | Public base URL of the site (e.g. `http://localhost:3000`) |
| `ACCOUNT_GITHUB_TOKEN` | GitHub personal access token for fetching profile data |
| `ACCOUNT_GITHUB_COMMIT_STATUES_TOKEN` | GitHub token scoped to reading commit statuses |
| `ACCOUNT_DATOCMS_API_TOKEN` | DatoCMS read API token |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST auth token |
| `UPSTASH_VECTOR_REST_URL` | Upstash Vector REST endpoint URL |
| `UPSTASH_VECTOR_REST_TOKEN` | Upstash Vector REST auth token (read/write) |
| `UPSTASH_VECTOR_REST_TOKEN_READ_ONLY` | Upstash Vector REST read-only auth token |
| `OPENAI_API_KEY` | OpenAI API key for AI-powered chat and embeddings |

## Project Architecture

```
.
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── [locale]/          # Internationalised routes (en / sv_SE)
│   │   │   ├── layout.tsx     # Root layout for all locale pages
│   │   │   ├── page.tsx       # Home page
│   │   │   └── technical-ledgers/  # Technical ledgers section
│   │   ├── api/               # API route handlers
│   │   ├── globals.css        # Global styles
│   │   └── robots.ts          # robots.txt generation
│   ├── components/            # Feature-based reusable UI components
│   │   ├── chatAI/            # AI chat assistant
│   │   ├── codeBlock/         # Syntax-highlighted code blocks
│   │   ├── experienceTimeline/# Work experience timeline
│   │   ├── footer/
│   │   ├── languageSwitcher/  # EN / SV language toggle
│   │   ├── profile/           # Profile / hero section
│   │   ├── techStack/         # Technology stack display
│   │   ├── technicalLedger/   # Individual technical ledger entry
│   │   ├── technicalLedgersList/
│   │   ├── testimonials/
│   │   ├── toolbar/           # Site navigation toolbar
│   │   └── ui/                # Shared low-level UI primitives
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # GraphQL queries and shared utilities
│   ├── scripts/               # One-off data seeding scripts
│   │   ├── seedLedgers.ts     # Seed technical ledger embeddings into Upstash Vector
│   │   └── seedProfile.ts     # Seed profile data into Upstash Vector
│   ├── services/              # External service integrations
│   │   ├── datoCMS.ts         # DatoCMS GraphQL client
│   │   └── githubFetch.ts     # GitHub API client
│   ├── utils/                 # Utility/helper functions
│   └── types.ts               # Shared TypeScript types
├── public/                    # Static assets
├── .env.example               # Environment variable template
├── .github/                   # GitHub configuration
│   ├── workflows/             # GitHub Actions workflows
│   └── dependabot.yml         # Automated dependency updates
├── commitlint.config.js       # Commit message linting rules
├── eslint.config.mjs          # ESLint flat config
├── next.config.ts             # Next.js configuration
├── postcss.config.mjs         # PostCSS / Tailwind configuration
└── .prettierrc                # Prettier configuration
```

## Internationalisation (i18n)

The site supports two locales, driven by the `[locale]` dynamic route segment:

| Code | Language |
|------|----------|
| `en` | English |
| `sv_SE` | Svenska (Swedish) |

Content translations are managed in DatoCMS and fetched at request time.

## GitHub Actions

### CI (`ci.yml`)

Triggered on every **pull request** targeting `main`. Runs on `ubuntu-latest` inside the `production` environment.

Steps:
1. Install pnpm 10 and Node.js 20
2. Install dependencies (`--frozen-lockfile`)
3. Run `pnpm lint`
4. Run `pnpm build` (requires all production secrets)

Required secrets: `ACCOUNT_GITHUB_COMMIT_STATUES_TOKEN`, `ACCOUNT_GITHUB_TOKEN`, `ACCOUNT_DATOCMS_API_TOKEN`, `UPSTASH_VECTOR_REST_URL`, `UPSTASH_VECTOR_REST_TOKEN`, `UPSTASH_VECTOR_REST_TOKEN_READ_ONLY`, `OPENAI_API_KEY`.

### Seed Technical Ledgers (`seed-ledgers.yml`)

**Manually triggered** via the GitHub Actions tab (`workflow_dispatch`). Generates vector embeddings for all technical ledger entries and upserts them into Upstash Vector.

```bash
# Equivalent local command
pnpm seedLedgers
```

Required secrets: `ACCOUNT_DATOCMS_API_TOKEN`, `UPSTASH_VECTOR_REST_URL`, `UPSTASH_VECTOR_REST_TOKEN`, `OPENAI_API_KEY`, `BASE_URL`.

### Seed Profile Data (`seed-profile.yml`)

**Manually triggered** via the GitHub Actions tab (`workflow_dispatch`). Generates vector embeddings for profile/about data and upserts them into Upstash Vector.

```bash
# Equivalent local command
pnpm seedProfile
```

Required secrets: `ACCOUNT_DATOCMS_API_TOKEN`, `UPSTASH_VECTOR_REST_URL`, `UPSTASH_VECTOR_REST_TOKEN`, `OPENAI_API_KEY`.

## Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint the codebase
pnpm lint

# Seed technical ledger embeddings into Upstash Vector
pnpm seedLedgers

# Seed profile embeddings into Upstash Vector
pnpm seedProfile
```

## Commit Conventions

Commit messages are enforced by [commitlint](https://commitlint.js.org/) using the [Conventional Commits](https://www.conventionalcommits.org/) specification. [Husky](https://typicode.github.io/husky/) runs the following hooks automatically:

- **pre-commit** — runs `lint-staged` (ESLint + Prettier on staged files)
- **commit-msg** — validates the commit message format via commitlint

Example valid commit messages:

```
feat: add dark mode toggle
fix: correct profile image aspect ratio
chore: update dependencies
```

## Code Standards

### Components

- Use functional components with arrow functions
- Use `use client` only when necessary for interactive features
- Use the `cn()` utility for Tailwind class merging

### Styling

- Follow Tailwind CSS class ordering (Layout → Box Model → Typography)
- Leverage Tailwind 4 variables and features
- Classes are automatically sorted by Prettier on commit

### TypeScript

- Avoid using `any` type
- Maintain strict type safety throughout the codebase

### Formatting

- Single quotes for strings
- 2-space indentation
- Formatting is applied automatically on commit via lint-staged

## Dependency Management

[Dependabot](https://docs.github.com/en/code-security/dependabot) is configured to open weekly pull requests for both regular and development dependencies (patch and minor updates are grouped).

## Deployment

The recommended platform is [Vercel](https://vercel.com):

1. Push the repository to GitHub
2. Import the project in Vercel
3. Add all environment variables (see [Environment Variables](#environment-variables))
4. Vercel automatically detects Next.js and handles builds on every push

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [DatoCMS Documentation](https://www.datocms.com/docs)
- [Upstash Documentation](https://upstash.com/docs)
- [AI SDK Documentation](https://sdk.vercel.ai/docs)
