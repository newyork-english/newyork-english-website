import { eq, sum } from "drizzle-orm";
import { getDb } from "../../../db";
import { reservations } from "../../../db/schema";

export async function GET() {
  try {
    const rows = await getDb().select({ slotId: reservations.slotId, booked: sum(reservations.attendees) }).from(reservations).where(eq(reservations.status, "confirmed")).groupBy(reservations.slotId);
    return Response.json({ availability: Object.fromEntries(rows.map((row) => [row.slotId, Number(row.booked)])) });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "잔여 좌석을 불러오지 못했습니다." }, { status: 500 });
  }
}
