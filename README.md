# New York English

Next.js App Router / React application built with Vinext for Cloudflare Workers.

## Routes

- `/`: 2027 admissions briefing and reservations
- `/review-event`: preserved September review event
- `/review-event/guide`: event participation guide
- `/guide`: redirects to `/review-event/guide` for existing links
- `/admin/nyenglish-2027`: password-protected reservation management

Admissions and review event have separate root layouts and stylesheets.

## Development

Node.js 22.13+ and pnpm are required.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

Copy `.dev.vars.example` to `.dev.vars` and set `ADMIN_PASSWORD` locally.
Never commit real credentials or reservation database exports.

## Hosting and database

Cloudflare Workers Builds connects `newyork-english/newyork-english-website`
on GitHub to the existing Worker `newyork-english-website`. Pushes to `main`
automatically build and deploy. Build command: `pnpm run build`. Deploy command:
`npx wrangler deploy`. Root directory: `/`. The Cloudflare Vite plugin writes
`.wrangler/deploy/config.json` so Wrangler uses `dist/server/wrangler.json`.
Vinext and the Cloudflare Vite plugin generate the deployable Worker and assets;
the source configuration is `wrangler.json`.

The existing custom domain `newyorkenglish.co.kr` and workers.dev address are
preserved. The `DB` binding uses the dedicated D1 database
`newyork-english-website-db` (`02605a78-912c-4688-b71a-2f81a5fd6c7e`).
The initial schema and child-gender column were applied on 2026-09-28.
Do not rerun the initial SQL against this database. Production deployment does
not reset, seed, or automatically migrate the database. Review future schema
changes separately. The unrelated `enneagram-d1` database is not used.

Set `ADMIN_PASSWORD` as a production runtime secret in the Worker's Settings
before using reservation administration. Never commit it. Existing runtime
variables and secrets are preserved on deployment. Local development uses
local D1 storage and `.dev.vars`; it does not modify production reservations.

`.openai/hosting.json` retains the original Sites project identity for reference.
The GitHub deployment uses the explicit Cloudflare configuration above.
