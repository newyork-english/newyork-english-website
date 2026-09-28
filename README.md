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

The existing repository deployment uses Cloudflare. The Worker needs a D1
binding named `DB` and a secret named `ADMIN_PASSWORD`. Configure them for the
target deployment before accepting reservations. `.openai/hosting.json` retains
this repository's existing project identity; its `d1` declaration enables DB
provisioning when using the Sites hosting pipeline.

Apply `drizzle/0000_initial.sql` and `drizzle/0001_child_gender.sql` to a new D1
database. Existing reservations from the old admissions website are not copied
by moving source code. Migrate them separately if they need to be retained.

Pushing to the configured remote triggers the existing Cloudflare webhook.
Source upload alone does not prove the deployment has the required bindings.
