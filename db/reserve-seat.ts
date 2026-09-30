import { sql } from 'drizzle-orm';
import { reservations } from './schema.ts';
import type { getDb } from './index';

export function validAttendees(value: unknown, capacity: number): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 1 && value <= capacity;
}

export function reserveSeat(db: ReturnType<typeof getDb>, values: typeof reservations.$inferInsert, capacity: number) {
  // One conditional INSERT keeps the capacity check and write atomic in D1.
  return db.insert(reservations).select(db.select({
    id: sql`NULL`,
    code: sql`${values.code}`,
    slotId: sql`${values.slotId}`,
    track: sql`${values.track}`,
    sessionId: sql`${values.sessionId}`,
    date: sql`${values.date}`,
    time: sql`${values.time}`,
    parentName: sql`${values.parentName}`,
    phone: sql`${values.phone}`,
    childName: sql`${values.childName}`,
    childAge: sql`${values.childAge}`,
    childGender: sql`${values.childGender}`,
    childYear: sql`${values.childYear}`,
    attendees: sql`${values.attendees}`,
    status: sql`'confirmed'`,
    progress: sql`'reserved'`,
    createdAt: sql`CURRENT_TIMESTAMP`,
  }).from(sql`(SELECT 1)`).where(sql`COALESCE((SELECT SUM(attendees) FROM reservations WHERE slot_id = ${values.slotId} AND status = 'confirmed'), 0) + ${values.attendees} <= ${capacity}`).getSQL()).returning();
}
