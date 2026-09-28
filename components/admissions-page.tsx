"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { AdmissionsHome } from "@/components/admissions-home";
import { sessions, slots, type Slot } from "@/lib/schedule";

import { reservationProgressOptions } from '@/lib/reservation-progress';

type Reservation = { id?: number; code: string; slotId: string; parentName: string; phone: string; childName: string; childAge: string; childGender?: string; childYear: string; attendees: number; status: string; date?: string; time?: string; track?: string; sessionId?: string; createdAt?: string; progress?: string };
function formatRequestedAt(value?: string) {
  if (!value) return '기록 없음';
  const normalized = value.replace(' ', 'T');
  const timestamp = new Date(/(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized) ? normalized : normalized + 'Z');
  if (Number.isNaN(timestamp.getTime())) return '기록 없음';
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(timestamp);
}

const logo = <img className="header-logo" src="/new-york-english-logo-transparent.png" alt="New York English" />;

function SlotPicker({ value, onChange, requestedSession }: { value: Slot | null; onChange: (slot: Slot | null) => void; requestedSession: string }) {
  const [track, setTrack] = useState<Slot["track"]>("신규생");
  const [sessionFilter, setSessionFilter] = useState("all");
  const [booked, setBooked] = useState<Record<string, number>>({});
  const [availabilityState, setAvailabilityState] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        const response = await fetch("/api/availability", { cache: "no-store" });
        if (!response.ok) throw new Error("unavailable");
        const payload = await response.json() as { availability: Record<string, number> };
        if (active) { setBooked(payload.availability); setAvailabilityState("ready"); }
      } catch { if (active) setAvailabilityState("error"); }
    };
    void refresh();
    const timer = window.setInterval(refresh, 15000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);
  useEffect(() => { setSessionFilter(requestedSession); setTrack("신규생"); }, [requestedSession]);
  const visible = slots.filter((slot) => slot.track === track && (sessionFilter === "all" || slot.sessionId === sessionFilter));
  const groups = useMemo(() => Array.from(new Set(visible.map((slot) => slot.date))), [visible]);
  return <div className="picker-stack"><div className="track-toggle" role="tablist" aria-label="예약 대상 선택">{(["신규생", "재원생 동생"] as const).map((item) => <button key={item} className={track === item ? "active" : ""} onClick={() => { setTrack(item); setSessionFilter("all"); onChange(null); }} role="tab" aria-selected={track === item}>{item}</button>)}</div>{track === "재원생 동생" && <p className="track-note">재원생 동생을 위해 조금 더 특별하게 준비했습니다. 한 타임에 한 가족만 모시는 1:1 맞춤 상담으로 진행합니다.</p>}{track === "신규생" && <div className="session-filter"><button className={sessionFilter === "all" ? "active" : ""} onClick={() => { setSessionFilter("all"); onChange(null); }}>전체 세션</button>{sessions.map((session) => <button key={session.id} className={sessionFilter === session.id ? "active" : ""} onClick={() => { setSessionFilter(session.id); onChange(null); }}>{session.id}</button>)}</div>}{availabilityState !== "ready" && <p className="availability-message" role="status">{availabilityState === "loading" ? "잔여 좌석을 확인하고 있습니다." : "잔여 좌석을 불러오지 못했습니다. 잠시 후 다시 확인하거나 041-562-0011로 문의해주세요."}</p>}<div className="date-grid">{groups.map((date) => <div className="date-group" key={date}><p>{visible.find((slot) => slot.date === date)?.dateLabel}</p><div className="time-row">{visible.filter((slot) => slot.date === date).map((slot) => { const remaining = Math.max(0, slot.capacity - (booked[slot.id] ?? 0)); return <button key={slot.id} disabled={availabilityState !== "ready" || remaining === 0} className={`time-chip ${value?.id === slot.id ? "selected" : ""}`} onClick={() => onChange(slot)}><strong>{slot.time}</strong><span>{slot.sessionId === "sibling" ? "재원생 동생 전용" : `${slot.sessionId} 세션`}</span><small>{availabilityState !== "ready" ? "확인 중" : remaining ? `잔여 ${remaining}석` : "예약 마감"}</small></button>; })}</div></div>)}</div></div>;
}

function BookingDialog({ slot, close }: { slot: Slot; close: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalRef.current?.querySelector<HTMLElement>("button")?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
      if (event.key !== "Tab") return;
      const controls = Array.from(modalRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input, select, a[href]') ?? []);
      const first = controls[0]; const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = overflow; document.removeEventListener("keydown", handleKey); previous?.focus(); };
  }, []);
  const [done, setDone] = useState<Reservation | null>(null); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ parentName: "", phone: "", childName: "", childAge: slot.sessionId === "sibling" ? "" : slot.sessionId.split("-")[0] + "세", childGender: "", childYear: slot.sessionId === "sibling" ? "재원생 동생" : slot.sessionId, attendees: 1, consent: false });
  const field = (key: keyof typeof form, value: string | number | boolean) => setForm((current) => ({ ...current, [key]: value }));
  const returnToProgram = () => { close(); window.setTimeout(() => document.getElementById("program")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80); };
  async function submit(event: React.FormEvent) { event.preventDefault(); setError(""); if (!form.consent) return setError("개인정보 수집 및 이용에 동의해주세요."); setBusy(true); try { const response = await fetch("/api/reservations", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slotId: slot.id, ...form }) }); const payload = await response.json() as { error?: string; reservation: Reservation; reservations: Reservation[] }; if (!response.ok) throw new Error(payload.error || "예약을 완료하지 못했습니다."); setDone(payload.reservation); } catch (cause) { setError(cause instanceof Error ? cause.message : "예약을 완료하지 못했습니다."); } finally { setBusy(false); } }
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && close()}><div ref={modalRef} className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="icon-button modal-close" onClick={close} aria-label="닫기"><X size={20} /></button>{done ? <div className="success-state"><span className="success-icon"><Check size={28} /></span><p className="kicker">Reservation confirmed</p><h2 id="booking-title">예약이 완료되었습니다.</h2><p>아이의 시작점에 맞는 설명회 자리를 준비해두겠습니다.</p><div className="confirmation-card"><span>예약번호</span><strong>{done.code}</strong><span>날짜 · {slot.dateLabel}</span><span>시간 · {slot.time}</span><span>세션 · {slot.track} · {slot.sessionId === "sibling" ? "재원생 동생" : `${slot.sessionId} 세션`}</span><span>참석 인원 · {done.attendees}명</span></div><button className="primary-button full" onClick={returnToProgram}>확인</button></div> : <><p className="kicker">Reserve your seat</p><h2 id="booking-title">{slot.dateLabel}<br /><em>{slot.time}</em>에 만나요.</h2><p className="modal-lede">{slot.track} · {slot.sessionId === "sibling" ? "재원생 동생" : `${slot.sessionId} 세션`} · 최대 {slot.capacity}명</p><form onSubmit={submit} className="booking-form"><div className="form-grid"><label>보호자명<input required value={form.parentName} onChange={(e) => field("parentName", e.target.value)} placeholder="성함을 입력해주세요" /></label><label>연락처<input required value={form.phone} onChange={(e) => field("phone", e.target.value)} placeholder="010-0000-0000" inputMode="tel" /></label><label>자녀명<input required value={form.childName} onChange={(e) => field("childName", e.target.value)} placeholder="아이 이름을 입력해주세요" /></label><label>자녀 연령<select aria-label="자녀 연령" required value={form.childAge} onChange={(e) => field("childAge", e.target.value)}><option value="">선택해주세요</option>{["5세", "6세", "7세"].map(age => <option key={age} value={age}>{age}</option>)}</select></label><label>자녀 성별<select aria-label="자녀 성별" required value={form.childGender} onChange={(e) => field("childGender", e.target.value)}><option value="">선택해주세요</option><option value="남아">남아</option><option value="여아">여아</option></select></label><label>영어 학습 연차<input readOnly value={slot.sessionId === "sibling" ? "재원생 동생" : `${slot.sessionId.split("-")[1]}년차 · 선택한 세션 기준`} /></label><label>참석 인원<select aria-label="참석 인원" value={form.attendees} onChange={(e) => field("attendees", Number(e.target.value))}>{Array.from({ length: Math.min(slot.capacity, 2) }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}명</option>)}</select></label></div><label className="consent"><input type="checkbox" checked={form.consent} onChange={(e) => field("consent", e.target.checked)} /><span>예약 확인을 위해 입력한 개인정보를 수집·이용하는 데 동의합니다.</span></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button full" disabled={busy}>{busy ? "예약 처리 중…" : "이 자리 예약하기"}<ArrowUpRight size={17} /></button></form></>}</div></div>;
}

export function HomePage() {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookingSlot, setBookingSlot] = useState<Slot | null>(null);
  const [requestedSession, setRequestedSession] = useState("all");
  const [pickerKey, setPickerKey] = useState(0);
  return <>
    <AdmissionsHome onSession={(id) => { setRequestedSession(id); setSelectedSlot(null); setPickerKey(key => key + 1); }}
      reservation={<><SlotPicker key={pickerKey} value={selectedSlot} onChange={setSelectedSlot} requestedSession={requestedSession} />
        <button className="primary-button reserve-submit" disabled={!selectedSlot} onClick={() => selectedSlot && setBookingSlot(selectedSlot)}>
          {selectedSlot ? `${selectedSlot.dateLabel} · ${selectedSlot.time} 예약하기` : "먼저 일정을 선택해주세요"}<ArrowUpRight size={17} />
        </button></>} />
    {bookingSlot && <BookingDialog slot={bookingSlot} close={() => { setBookingSlot(null); setSelectedSlot(null); setPickerKey(key => key + 1); }} />}
  </>;
}

export function AdminPage() {
  const [savingId, setSavingId] = useState<number | null>(null);
  async function changeProgress(id: number | undefined, progress: string) {
    if (!id) return;
    setSavingId(id); setError("");
    try {
      const response = await fetch(`/api/reservations/${id}`, { method: "PATCH", headers: { "content-type": "application/json", "x-admin-password": password }, body: JSON.stringify({ progress }) });
      const payload = await response.json() as { error?: string; reservation: Reservation };
      if (!response.ok) throw new Error(payload.error || "상태 저장에 실패했습니다.");
      setRows((current) => current.map((row) => row.id === id ? payload.reservation : row));
    } catch (cause) { setError(cause instanceof Error ? cause.message : "상태 저장에 실패했습니다."); } finally { setSavingId(null); }
  }
  const [password, setPassword] = useState(""); const [authorized, setAuthorized] = useState(false); const [rows, setRows] = useState<Reservation[]>([]); const [error, setError] = useState(""); const [loaded, setLoaded] = useState(false); const [sessionFilter, setSessionFilter] = useState("all"); const [dateFilter, setDateFilter] = useState("all");
  async function load() { try { const response = await fetch("/api/reservations", { headers: { "x-admin-password": password } }); const payload = await response.json() as { error?: string; reservation: Reservation; reservations: Reservation[] }; if (!response.ok) throw new Error(payload.error); setRows(payload.reservations); setLoaded(true); setAuthorized(true); setError(""); } catch (cause) { setError(cause instanceof Error ? cause.message : "예약 목록을 불러오지 못했습니다."); } }
  async function unlock(event: React.FormEvent) { event.preventDefault(); await load(); }
  async function cancel(id?: number) { if (!id || !confirm("이 예약을 취소할까요?")) return; try { const response = await fetch(`/api/reservations/${id}`, { method: "PATCH", headers: { "content-type": "application/json", "x-admin-password": password }, body: JSON.stringify({ status: "cancelled" }) }); const payload = await response.json() as { error?: string; reservation: Reservation; reservations: Reservation[] }; if (!response.ok) throw new Error(payload.error); await load(); } catch (cause) { setError(cause instanceof Error ? cause.message : "취소 처리에 실패했습니다."); } }
  const confirmedRows = rows.filter((row) => row.status === "confirmed");
  const filteredRows = rows.filter((row) => (sessionFilter === "all" || row.sessionId === sessionFilter) && (dateFilter === "all" || row.date === dateFilter));
  const totalAttendees = confirmedRows.reduce((total, row) => total + Number(row.attendees || 0), 0);
  const dateSummary = Array.from(new Set(rows.map((row) => row.date).filter(Boolean))).map((date) => { const dateRows = confirmedRows.filter((row) => row.date === date); return { date, reservations: dateRows.length, attendees: dateRows.reduce((total, row) => total + Number(row.attendees || 0), 0) }; });
  if (!authorized) return <main className="admin-page"><header className="admin-header">{logo}<span>예약 관리</span></header><section className="admin-shell admin-login"><div className="section-label">Private admin</div><h1>관리자 확인</h1><p>예약 정보를 확인하려면 관리자 비밀번호를 입력해주세요.</p><form onSubmit={unlock} className="admin-login-form"><label htmlFor="admin-password">비밀번호<input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoFocus /></label><button className="primary-button" type="submit">관리자 페이지 열기</button></form>{error && <p className="form-error">{error}</p>}</section></main>;
  return <main className="admin-page"><header className="admin-header">{logo}<span>예약 관리</span></header><section className="admin-shell"><div className="section-label">Private admin</div><h1>입학 설명회 예약 목록</h1><p>비공개 관리자 화면입니다. 운영팀에서 예약 상태와 참석 인원을 확인하세요.</p><button className="primary-button" onClick={load}>{loaded ? "새로고침" : "예약 목록 불러오기"}</button>{error && <p className="form-error">{error}</p>}{loaded && <><div className="admin-stats"><div><span>확정 예약</span><strong>{confirmedRows.length}건</strong></div><div><span>총 신청 인원</span><strong>{totalAttendees}명</strong></div><div><span>취소 예약</span><strong>{rows.filter((row) => row.status === "cancelled").length}건</strong></div></div><div className="admin-filters"><label>연차별 보기<select value={sessionFilter} onChange={(event) => setSessionFilter(event.target.value)}><option value="all">전체 연차</option><option value="5-1">5세 · 1년차</option><option value="6-1">6세 · 1년차</option><option value="7-1">7세 · 1년차</option><option value="6-2">6세 · 2년차</option><option value="7-2">7세 · 2년차</option><option value="7-3">7세 · 3년차</option><option value="sibling">재원생 동생</option></select></label><label>날짜별 보기<select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}><option value="all">전체 날짜</option>{Array.from(new Set(rows.map((row) => row.date).filter(Boolean))).map((date) => <option key={date} value={date}>{date}</option>)}</select></label></div><div className="admin-date-summary"><h2>날짜별 예약 현황</h2><div>{dateSummary.map((item) => <span key={item.date}>{item.date}<strong>{item.reservations}건 · {item.attendees}명</strong></span>)}</div></div><div className="admin-table-wrap"><table><thead><tr><th>신청 일시 (한국 시간)</th><th>일정</th><th>세션</th><th>보호자 / 자녀</th><th>연락처</th><th>인원</th><th>상태</th><th /></tr></thead><tbody>{filteredRows.map((row) => <tr key={row.id}><td>{formatRequestedAt(row.createdAt)}</td><td>{row.date}<br />{row.time}</td><td>{row.track}<br /><strong>{row.sessionId}</strong></td><td>{row.parentName}<br />{row.childName} · {row.childAge} · {row.childGender || '성별 미입력'}</td><td>{row.phone}</td><td>{row.attendees}명</td><td>{row.status === 'cancelled' ? <span className="status cancelled">취소완료</span> : <select aria-label={row.childName + ' 예약 진행 상태'} value={row.progress || 'reserved'} disabled={savingId !== null} onChange={(event) => changeProgress(row.id, event.target.value)}>{reservationProgressOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>}</td><td>{row.status === "confirmed" && <button className="small-button" disabled={savingId !== null} onClick={() => cancel(row.id)}>취소 처리</button>}</td></tr>)}</tbody></table>{filteredRows.length === 0 && <p className="empty-state">조건에 맞는 예약이 없습니다.</p>}</div></>}</section></main>;
}

export default HomePage;
