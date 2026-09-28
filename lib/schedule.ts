export type Session = { id: string; eyebrow: string; title: string; audience: string; description: string };
export type Slot = { id: string; date: string; dateLabel: string; weekday: string; time: string; track: "재원생 동생" | "신규생"; capacity: number; sessionId: string };

export const sessions: Session[] = [
  { id: "5-1", eyebrow: "5세 · 1년차", title: "첫 영어를 시작하는 아이", audience: "5세에 영어를 처음 시작하는 아이", description: "5세는 영어를 ‘공부’로 느끼기보다 하나의 언어로 자연스럽게 받아들이기 시작하기에 가장 좋은 시기. 영어의 소리와 표현을 충분히 경험하며 영어학습여정의 첫 기반을 설계합니다." },
  { id: "6-1", eyebrow: "6세 · 1년차", title: "처음 시작하는 6세", audience: "6세에 영어를 처음 시작하는 아이", description: "유아기의 자연스러운 언어 경험에서 한 단계 나아가 영어를 본격적인 학습으로 확장하는 시기. 듣고 말하는 힘을 바탕으로 영어 기초를 빠르게 연결합니다." },
  { id: "6-2", eyebrow: "6세 · 2년차", title: "기초를 확장하는 시기", audience: "5세부터 영어 학습을 시작한 아이", description: "5세 1년차에 쌓은 영어의 소리와 기초를 바탕으로 Speaking, Vocabulary, Writing을 넓혀가는 시기. 익숙해진 언어를 자기 표현으로 연결해갑니다." },
  { id: "7-1", eyebrow: "7세 · 1년차", title: "초등 전 마지막 시작점", audience: "7세에 영어를 처음 시작하는 아이", description: "초등학생이 되기 전, 유아 언어 학습의 황금기를 온전히 활용할 수 있는 소중한 1년. Reading, Speaking, Vocabulary를 중심으로 영어의 핵심 기반을 집중적으로 쌓습니다." },
  { id: "7-2", eyebrow: "7세 · 2년차", title: "언어의 폭을 넓히는 시기", audience: "6세부터 영어 학습을 시작한 아이", description: "6세 1년차에 배운 언어 이해를 바탕으로 Grammar, Writing을 확장하는 시기. 이해한 영어를 더 정확하고 풍부하게 사용하는 단계입니다." },
  { id: "7-3", eyebrow: "7세 · 3년차", title: "초등 과정으로 이어지는 시기", audience: "5세부터 영어 학습을 이어온 아이", description: "1·2년차 동안 차곡차곡 쌓아온 영어 기반이 꽃을 피우는 시기입니다. Reading Comprehension, Grammar, Writing을 심화하며 유치부의 성장을 초등 과정의 힘으로 연결합니다." },
];

const weekdays = ["월", "화", "수", "목", "금"];
const iso = (date: Date) => date.toISOString().slice(0, 10);
const dateLabel = (date: Date) => `${date.getMonth() + 1}월 ${date.getDate()}일 (${weekdays[date.getDay() - 1]})`;

export const slots: Slot[] = (() => {
  const result: Slot[] = [];
  const add = (date: Date, time: string, track: Slot["track"], capacity: number, sessionId: string) => result.push({ id: `${iso(date)}-${time.replace(":", "")}`, date: iso(date), dateLabel: dateLabel(date), weekday: weekdays[date.getDay() - 1], time, track, capacity, sessionId });
  for (let day = 0; day < 5; day += 1) {
    const date = new Date(2026, 10, 30 + day);
    ["09:30", "11:00", "13:00"].forEach((time) => add(date, time, "재원생 동생", 1, "sibling"));
    if (day === 1 || day === 3) add(date, "15:20", "재원생 동생", 1, "sibling");
  }
  const assigned = ["5-1", "5-1", "5-1", "6-1", "7-1", "6-2", "7-1", "7-3", "5-1", "5-1"];
  let weekdayCount = 0;
  for (let dayOffset = 0; weekdayCount < 10; dayOffset += 1) {
    const date = new Date(2026, 11, 7 + dayOffset);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    const idForTime = (time: string) => {
      if (date.getDate() === 18) return "7-2";
      if (date.getDate() === 15) return time === "13:00" ? "5-1" : "7-1";
      if (date.getDate() === 17) return time === "13:00" ? "5-1" : "6-1";
      if (date.getDate() === 10 && time === "13:00") return "5-1";
      if (date.getDate() === 8 && time === "16:00") return "5-1";
      return assigned[weekdayCount];
    };
    add(date, "10:00", "신규생", 4, idForTime("10:00"));
    add(date, "13:00", "신규생", 4, idForTime("13:00"));
    if (date.getDay() === 2 || date.getDay() === 4) add(date, "16:00", "신규생", 4, idForTime("16:00"));
    weekdayCount += 1;
  }
  return result;
})();

export const getSession = (id: string) => sessions.find((session) => session.id === id);
