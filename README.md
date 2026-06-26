# Cloud Axis — Hero Section

A landing page hero component for **Cloud Axis**, a next-gen cloud infrastructure platform. Built with React, TypeScript, Vite, Tailwind CSS, and TanStack Router.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (build tool)
- **Tailwind CSS 4** (styling)
- **TanStack Router** (file-based routing)
- **ESLint** (linting)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Project Structure

```
src/
├── components/
│   └── Hero.tsx          # Main hero section component
├── routes/
│   ├── __root.tsx        # Root layout
│   └── index.tsx         # Home page (lazy-loads Hero)
├── assets/               # Images and static assets
├── global.css            # Global styles / Tailwind entry
├── main.tsx              # App entry point
└── routeTree.gen.ts      # Auto-generated router tree
```
