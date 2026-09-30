import { ensureProgressColumn } from '@/db/ensure-progress';
import { sql } from "drizzle-orm";
import { reserveSeat, validAttendees } from '@/db/reserve-seat';
import { getDb } from "../../../db";
import { reservations } from "../../../db/schema";
import { getSession, slots } from "../../../lib/schedule";
import { isAdmin } from "@/lib/admin-auth";
async function ensureGenderColumn(db: ReturnType<typeof getDb>) { try { await db.run(sql`ALTER TABLE reservations ADD COLUMN child_gender TEXT`); } catch { /* already exists */ } }

function message(error: unknown) {
  const value = error instanceof Error ? error.message : "예약 처리 중 문제가 발생했습니다.";
  return value.includes("no such table") ? "예약 데이터베이스가 아직 준비되지 않았습니다. 관리자에게 문의해주세요." : value;
}

export async function GET(request: Request) {
  if (!isAdmin(request)) return Response.json({ error: "관리자 인증이 필요합니다." }, { status: 401 });
  try { const db = getDb(); await ensureGenderColumn(db); await ensureProgressColumn(db); return Response.json({ reservations: await db.select().from(reservations).orderBy(reservations.createdAt) }); }
  catch (error) { return Response.json({ error: message(error) }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const slot = slots.find((item) => item.id === String(body.slotId ?? ""));
    if (!slot) return Response.json({ error: "선택한 세션을 찾을 수 없습니다." }, { status: 400 });
    if (!validAttendees(body.attendees, slot.capacity)) return Response.json({ error: "참석 인원을 올바르게 선택해주세요." }, { status: 400 });
    const values = { parentName: String(body.parentName ?? "").trim(), phone: String(body.phone ?? "").trim(), childName: String(body.childName ?? "").trim(), childAge: String(body.childAge ?? "").trim(), childGender: String(body.childGender ?? "").trim(), childYear: String(body.childYear ?? "").trim(), attendees: body.attendees };
    if (Object.values(values).some((value) => value === "")) return Response.json({ error: "모든 항목을 입력해주세요." }, { status: 400 });
    const db = getDb(); await ensureGenderColumn(db); await ensureProgressColumn(db);
    const code = `NYE-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const [reservation] = await reserveSeat(db, { code, slotId: slot.id, track: slot.track, sessionId: slot.sessionId, date: slot.date, time: slot.time, ...values }, slot.capacity);
    if (!reservation) return Response.json({ error: "방금 예약이 마감되었습니다. 다른 시간을 선택해주세요." }, { status: 409 });
    return Response.json({ reservation, session: getSession(slot.sessionId) }, { status: 201 });
  } catch (error) { return Response.json({ error: message(error) }, { status: 500 }); }
}
