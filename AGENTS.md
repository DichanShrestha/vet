# Engineering standards

- Keep strict TypeScript. Avoid `any` and explain any non-obvious assertion.
- Separate presentation (`src/components`, `src/app`), business logic (`src/lib`), and data access (a future `src/server` boundary). Keep credentials and database calls on the server.
- Build reusable components with explicit props. Prefer existing primitives and tokens over duplicated patterns or new dependencies.
- Do not commit secrets. Validate and authorize all server inputs; never trust client-supplied identity or clinic scope. Use least-privilege access and avoid logging personal or clinical data.
- Use semantic HTML, keyboard-accessible controls, visible focus, readable contrast, and responsive layouts. Give async screens loading, empty, error, success, and validation states as relevant.
- Follow `docs/design-principles.md` for product UI. Keep screens operational, calm, and focused; do not add decorative metrics or cards without a task need.
- Do not add business models, workflows, migrations, or integrations without an explicit product requirement.

## Verification

- Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` for a complete change when dependencies are installed.
- For visual changes, run the app and inspect `/design-preview` at narrow and wide viewport sizes, including keyboard focus and reduced-motion settings.
- Do not run migrations or connect to a production database as part of routine checks. Report any command that could not run and its environment reason.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
