# Portfolio Project Coding Standards

## General Context

- This is a Next.js 16 project using React 19 and Tailwind CSS 4.
- We use **pnpm** as the package manager.

## Code Style & Linting

- Always follow the existing Prettier configuration (single quotes, 2-space indentation).
- Use **TypeScript** for all files. Avoid `any`.
- Follow the **Flat Config** ESLint rules defined in `eslint.config.mjs`.

## Component Architecture

- Use Functional Components with Arrow Functions.
- Use `use client` only when necessary for hooks or interactivity.
- Use the `cn()` utility for Tailwind class merging.

## Tailwind CSS

- Always sort Tailwind classes using the standard order (Layout -> Box Model -> Typography).
- Use Tailwind 4 variables and features where applicable.
