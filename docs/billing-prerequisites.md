# Billing implementation prerequisites

The billing route remains unavailable until the application can identify a verified staff member, resolve that person's clinic membership on the server, and use a configured development PostgreSQL database.

## Repository findings

- There is no Supabase Auth client/session handling, sign-in flow, or server-side identity resolver.
- There are no clinic, membership, customer, invoice, line item, payment, or audit models and no migrations.
- `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are placeholders in `.env.example`; none are configured in the current process.
- The current app shell displays fictional user and clinic details. Those are presentation data and cannot be used to authorize financial access.
- There is no membership provisioning or permissions source from which to derive clinic scope.

## Why billing operations are gated

An invoice lookup or write must derive the authenticated identity and authorized clinic on the server. The shell's fictional clinic name, route parameters, and browser-supplied clinic identifiers are not trusted authorization inputs. Enabling database operations before the session and membership boundary exists could expose another clinic's financial records. The billing page therefore presents setup requirements without showing fabricated invoices or offering nonfunctional actions.

## Required before enabling the workflow

1. Configure a Supabase project for development and implement cookie-backed server auth. Verify access tokens server-side and handle session refresh in the Next.js `proxy.ts` layer as documented by Supabase.
2. Establish a trusted clinic membership and permission provisioning path. Resolve membership from the verified user on every server action/query; do not accept clinic scope from the browser.
3. Configure separate development pooled and direct PostgreSQL URLs in a local `.env.local`. Use a least-privilege runtime role and verify the role's RLS behavior before relying on it.
4. Define the clinic/customer and immutable invoice/payment schema, scoped unique invoice numbering, indexes, foreign keys, and audit requirements. Review a Prisma 7 migration before applying it to the development database.
5. Add server-only Zod validation and a data-access layer. Payment writes need a database transaction with concurrency control and an idempotency constraint; database integration tests require an isolated test database.
6. Confirm tax configuration and rounding policy with the product owner before enabling tax calculations. Do not infer tax compliance from a default rate.

## Official documentation consulted

- [Next.js authentication guide](https://nextjs.org/docs/app/guides/authentication)
- [Supabase Auth with Next.js server-side rendering](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Prisma ORM v7 transactions](https://www.prisma.io/docs/orm/v7/prisma-client/queries/transactions)
- [Prisma ORM v7 Decimal fields](https://www.prisma.io/docs/orm/v7/prisma-client/special-fields-and-types#working-with-decimal)

No credentials were added, no database was contacted, and no migrations were applied.
