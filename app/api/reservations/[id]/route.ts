import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { reservations } from "../../../../db/schema";
import { isAdmin } from "@/lib/admin-auth";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) return Response.json({ error: "관리자 인증이 필요합니다." }, { status: 401 });
  const { id } = await params;
  const body = (await request.json()) as { status?: string };
  if (!body.status || !["confirmed", "cancelled"].includes(body.status)) return Response.json({ error: "잘못된 상태입니다." }, { status: 400 });
  try {
    const [reservation] = await getDb().update(reservations).set({ status: body.status }).where(eq(reservations.id, Number(id))).returning();
    return reservation ? Response.json({ reservation }) : Response.json({ error: "예약을 찾을 수 없습니다." }, { status: 404 });
  } catch { return Response.json({ error: "예약 상태를 변경할 수 없습니다." }, { status: 500 }); }
}
