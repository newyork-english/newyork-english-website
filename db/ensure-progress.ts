import { sql } from 'drizzle-orm';
import type { getDb } from './index';

export async function ensureProgressColumn(db: ReturnType<typeof getDb>) {
  const columns = await db.all<{ name: string }>(sql`PRAGMA table_info(reservations)`);
  if (columns.some((column) => column.name === 'progress')) return;
  try {
    await db.run(sql`ALTER TABLE reservations ADD COLUMN progress TEXT NOT NULL DEFAULT 'reserved'`);
  } catch (error) {
    const updated = await db.all<{ name: string }>(sql`PRAGMA table_info(reservations)`);
    if (!updated.some((column) => column.name === 'progress')) throw error;
  }
}
