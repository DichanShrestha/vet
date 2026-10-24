VetDesk is a temporary name for a veterinary clinic operations product for independent small-animal clinics in Nepal. The application shell is presentation-only and uses fictional clinic and user details.

## Local development

Use Node.js 20.9 or newer and npm:

```bash
npm run dev
```

The root route offers a short welcome with links to the clinic workspace and design system. Open [http://localhost:3000/design-preview](http://localhost:3000/design-preview) to review the preview.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Configuration boundaries

The design preview uses fictional static examples and needs no credentials. Copy `.env.example` to `.env.local` only when preparing future database or Auth integration; the preview does not contact a database.

## Verification commands

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

The Prisma schema intentionally has no models. `DIRECT_URL` is reserved for Prisma CLI operations and `DATABASE_URL` for pooled application connections. Do not run migrations or use production credentials for routine UI work.

## Billing status

Billing is intentionally gated until server-side Supabase identity, clinic membership authorization, and a development PostgreSQL configuration exist. The current shell's clinic and user are fictional and are not used as authorization. See [billing prerequisites](docs/billing-prerequisites.md) for the required setup and security boundary.
