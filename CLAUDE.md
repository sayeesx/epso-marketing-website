# Claude — Agent Notes

See [AGENTS.md](./AGENTS.md) for the full project instructions and rules.

## Claude-specific notes

### Shell environment
- **Windows PowerShell.** Use semicolons (`;`) as command separators, never `&&`.
- Example: `cd "project-dir"; pnpm run build`

### Path aliases
- Configured in `tsconfig.json`. Always use `@components/`, `@lib/`, `@layouts/`, `@types/`.
- Exception: within the same `src/lib/` or `src/types/` directory, relative imports are fine.

### Sanity Studio
- Sanity Studio is a **separate project** in `/sanity/` with its own `package.json`.
- To install Sanity dependencies: `cd sanity; pnpm install`
- To run Sanity Studio locally: `cd sanity; pnpm dev`

### Type safety
- Run `pnpm run type-check` and `pnpm run build` after any significant changes.
- Fix all TypeScript errors before marking a task complete.

### Content integrity
- Do not invent Epso company information, certifications, addresses or contact details.
- Use `[To be updated]` for missing business content.
- Use clearly labelled placeholder blocks for missing images.

### Build verification
- The build may succeed even when `SANITY_PROJECT_ID=placeholder` — Sanity fetches are wrapped in try/catch.
- A successful build with placeholder data is expected and correct.
- After configuring a real Sanity project, the build will fetch and render actual content.

### Performance
- Never add `client:load` to a component that does not require client-side interactivity.
- Prefer CSS animations and transitions over JavaScript.
- Always specify `width` and `height` on images to prevent CLS.

