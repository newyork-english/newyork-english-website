import { env } from 'cloudflare:workers';

export function isAdmin(request: Request): boolean {
  const password = (env as unknown as { ADMIN_PASSWORD?: string }).ADMIN_PASSWORD;
  return Boolean(password && request.headers.get('x-admin-password') === password);
}
