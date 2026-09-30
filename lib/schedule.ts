export type Session = { id: string; eyebrow: string; title: string; audience: string; description: string };
export type Slot = { id: string; date: string; dateLabel: string; weekday: string; time: string; track: "재원생 동생" | "신규생"; capacity: number; sessionId: string };

export const sessions: Session[] = [
  { id: "5-1", eyebrow: "5세 · 1년차", title: "첫 영어를 시작하는 아이", audience: "5세에 영어를 처음 시작하는 아이", description: "영어의 소리와 표현을 경험하며 언어 학습의 기초를 형성합니다. 듣기와 말하기를 중심으로 영어를 이해하고 사용하는 경험을 쌓습니다." },
  { id: "6-1", eyebrow: "6세 · 1년차", title: "처음 시작하는 6세", audience: "6세에 영어를 처음 시작하는 아이", description: "듣기와 말하기를 기반으로 영어 학습의 기초를 다집니다. 언어 경험을 체계적인 학습으로 연결하며 기초 어휘와 표현을 익힙니다." },
  { id: "6-2", eyebrow: "6세 · 2년차", title: "기초를 확장하는 시기", audience: "5세부터 영어 학습을 시작한 아이", description: "1년차에 형성한 기초를 바탕으로 어휘와 말하기, 쓰기를 확장합니다. 익숙한 표현을 활용해 자신의 생각을 영어로 전달하는 힘을 기릅니다." },
  { id: "7-1", eyebrow: "7세 · 1년차", title: "초등 전 마지막 시작점", audience: "7세에 영어를 처음 시작하는 아이", description: "초등 진입 전, 읽기와 말하기, 어휘의 핵심 기초를 집중적으로 다집니다. 이후 학습으로 이어지는 영어의 기본기를 형성합니다." },
  { id: "7-2", eyebrow: "7세 · 2년차", title: "언어의 폭을 넓히는 시기", audience: "6세부터 영어 학습을 시작한 아이", description: "축적된 언어 이해를 바탕으로 문법과 쓰기 역량을 확장합니다. 문장 구조를 익히며 영어 표현의 정확성과 다양성을 높입니다." },
  { id: "7-3", eyebrow: "7세 · 3년차", title: "초등 과정으로 이어지는 시기", audience: "5세부터 영어 학습을 이어온 아이", description: "읽기 이해와 문법, 쓰기를 심화하며 초등 영어 학습의 기반을 다집니다. 유치부에서 쌓은 언어 역량을 독해와 글쓰기로 발전시킵니다." },
];

const weekdays = ["월", "화", "수", "목", "금"];
const iso = (date: Date) => date.toISOString().slice(0, 10);
const dateLabel = (date: Date) => `${date.getUTCMonth() + 1}월 ${date.getUTCDate()}일 (${weekdays[date.getUTCDay() - 1]})`;

export const slots: Slot[] = (() => {
  const result: Slot[] = [];
  const add = (date: Date, time: string, track: Slot["track"], capacity: number, sessionId: string) => result.push({ id: `${iso(date)}-${time.replace(":", "")}`, date: iso(date), dateLabel: dateLabel(date), weekday: weekdays[date.getUTCDay() - 1], time, track, capacity, sessionId });
  for (let day = 0; day < 5; day += 1) {
    const date = new Date(Date.UTC(2026, 10, 30 + day));
    ["09:30", "11:00", "13:00"].forEach((time) => add(date, time, "재원생 동생", 1, "sibling"));
    if (day === 1 || day === 3) add(date, "15:20", "재원생 동생", 1, "sibling");
  }
  const assigned = ["5-1", "5-1", "5-1", "6-1", "7-1", "6-2", "7-1", "7-3", "5-1", "5-1"];
  let weekdayCount = 0;
  for (let dayOffset = 0; weekdayCount < 10; dayOffset += 1) {
    const date = new Date(Date.UTC(2026, 11, 7 + dayOffset));
    if (date.getUTCDay() === 0 || date.getUTCDay() === 6) continue;
    const idForTime = (time: string) => {
      if (date.getUTCDate() === 18) return time === "10:00" ? "5-1" : "7-2";
      if (date.getUTCDate() === 14 && time === "10:00") return "6-1";
      if (date.getUTCDate() === 16 && time === "13:00") return "6-1";
      if (date.getUTCDate() === 15) return time === "13:00" ? "5-1" : "7-1";
      if (date.getUTCDate() === 17) return time === "13:00" ? "5-1" : "6-1";
      if (date.getUTCDate() === 10 && time === "13:00") return "5-1";
      if (date.getUTCDate() === 8 && time === "16:00") return "5-1";
      return assigned[weekdayCount];
    };
    add(date, "10:00", "신규생", 4, idForTime("10:00"));
    add(date, "13:00", "신규생", 4, idForTime("13:00"));
    if (date.getUTCDay() === 2 || date.getUTCDay() === 4) add(date, "16:00", "신규생", 4, idForTime("16:00"));
    weekdayCount += 1;
  }
  return result;
})();

export const getSession = (id: string) => sessions.find((session) => session.id === id);
