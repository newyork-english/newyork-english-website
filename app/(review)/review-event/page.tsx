import { ArrowRight, BookOpenText, ExternalLink } from 'lucide-react';
import { REVIEW_URL } from '@/lib/event';

export default function Home() {
  return (
    <main className="home-shell">
      <div className="home-orbit home-orbit-one" aria-hidden="true" />
      <div className="home-orbit home-orbit-two" aria-hidden="true" />
      <section className="home-card" aria-labelledby="event-title">
        <header className="brand-lockup" aria-label="New York English">
          <img src="/review-event/logo.png" alt="New York English 로고" />
        </header>
        <div className="home-copy">
          <p className="eyebrow">September Review Event</p>
          <h1 id="event-title">우리 아이의 성장 이야기를<br />자랑해주세요</h1>
          <p className="home-intro">New York English와 함께한 소중한 변화를 들려주신 학부모님께 감사의 마음을 전합니다.</p>
        </div>
        <div className="benefit-panel" aria-label="이벤트 혜택">
          <span className="benefit-label">EVENT BENEFIT</span>
          <strong>교육비 <em>5%</em> 할인</strong>
          <span className="benefit-date">2026. 09. 01 — 09. 30</span>
        </div>
        <div className="home-actions">
          <a className="action action-secondary" href="/review-event/guide">
            <BookOpenText aria-hidden="true" /><span><small>자세히 알아보기</small>이벤트 참여 방법</span><ArrowRight aria-hidden="true" />
          </a>
          <a className="action action-primary" href={REVIEW_URL} target="_blank" rel="noreferrer">
            <ExternalLink aria-hidden="true" /><span><small>네이버 플레이스로 이동</small>이벤트 참여하기</span><ArrowRight aria-hidden="true" />
          </a>
        </div>
        <p className="home-note">초등부 재원생 학부모님을 위한 이벤트입니다.</p>
      </section>
    </main>
  );
}
