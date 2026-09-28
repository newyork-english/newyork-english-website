import { and, eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { reservations } from "../../../../db/schema";
import { isAdmin } from "@/lib/admin-auth";
import { ensureProgressColumn } from "@/db/ensure-progress";
import { reservationProgressOptions } from "@/lib/reservation-progress";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) return Response.json({ error: "관리자 인증이 필요합니다." }, { status: 401 });
  const { id } = await params;
  if (!Number.isSafeInteger(Number(id)) || Number(id) <= 0) return Response.json({ error: "잘못된 예약입니다." }, { status: 400 });
  let body: { status?: string; progress?: string };
  try { body = await request.json(); } catch { return Response.json({ error: "잘못된 요청입니다." }, { status: 400 }); }
  if (!body || typeof body !== 'object') return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  const cancelling = body.status === 'cancelled' && body.progress === undefined;
  const changingProgress = body.status === undefined && reservationProgressOptions.some((option) => option.value === body.progress);
  if (!cancelling && !changingProgress) return Response.json({ error: "잘못된 상태입니다." }, { status: 400 });
  try {
    const db = getDb();
    await ensureProgressColumn(db);
    const [reservation] = await db.update(reservations)
      .set(cancelling ? { status: 'cancelled' } : { progress: body.progress })
      .where(and(eq(reservations.id, Number(id)), eq(reservations.status, 'confirmed'))).returning();
    return reservation ? Response.json({ reservation }) : Response.json({ error: "예약이 없거나 이미 취소되었습니다. 목록을 새로고침해주세요." }, { status: 409 });
  } catch { return Response.json({ error: "예약 상태를 변경할 수 없습니다." }, { status: 500 }); }
}
