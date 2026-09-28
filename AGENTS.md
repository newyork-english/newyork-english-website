# Project Instructions

## Design

- Follow `design.md` for all visual changes.
- Shared brand tokens belong in `app/theme.css`; preserve route-specific layout styles.

## Upload and deployment requests

- When the user asks to "업로드해줘" (upload the work), review the current changes, run relevant checks when practical, create an appropriate Git commit, and push it to the configured remote repository.
- When the user asks to "배포해줘" (deploy the work), review the current changes, run relevant checks when practical, commit them, and push them to the configured remote repository. The push triggers deployment through the Cloudflare webhook and completes the requested deployment work. Do not run a separate deployment command or wait for, monitor, or verify the webhook deployment unless the user explicitly asks.
- Preserve unrelated user changes and include only the intended work in the commit whenever practical.
- Report the commit and push result, along with any verification performed.
