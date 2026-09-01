import { ArrowLeft, ArrowRight, BookOpen, Camera, Check, ExternalLink, Heart, MessageSquareText, ReceiptText, Sparkles } from 'lucide-react';
import { REVIEW_URL } from '@/lib/event';

const photoIdeas = ['집에서 숙제하는 모습', '완료한 숙제 또는 워크북', '영어책을 읽는 모습', 'Writing 결과물', '시험지 또는 학습 결과물', '현재 사용 중인 교재', '학원 가방이나 학습 준비물', '상장이나 학습 리포트'];
const storyIdeas = ['처음 다니기 시작했을 때와 비교해 달라진 점', '아이가 좋아하는 수업이나 교재', 'Reading · Speaking · Writing · Grammar에서 느낀 변화', '영어책이나 숙제를 대하는 태도의 변화', '공부 습관이나 자신감의 변화', '기억에 남는 선생님 또는 수업 이야기', 'New York English를 계속 다니고 있는 이유'];
const reviewSteps = ['네이버 앱에서 ‘뉴욕잉글리쉬’를 검색해주세요.', '‘뉴욕 잉글리쉬 어학원’ 플레이스에서 ‘리뷰’를 눌러주세요.', '‘리뷰 쓰기’를 선택해주세요.', '영수증 또는 결제내역을 통해 방문 인증을 진행해주세요.', '결제내역 이용 시 ‘뉴욕잉글리쉬 어학원’을 선택해주세요.', '방문 장소가 정확히 표시되는지 확인해주세요.', '사진 2장 이상과 본문 4문장 이상의 리뷰를 작성해주세요.', '별점과 키워드를 자유롭게 선택한 뒤 등록해주세요.'];

export default function GuidePage() {
  return (
    <main className="guide-shell">
      <div className="guide-topbar">
        <a href="/" className="back-link" aria-label="이벤트 홈으로 돌아가기"><ArrowLeft aria-hidden="true" />돌아가기</a>
        <img className="guide-brand" src="/new-york-english-logo.png" alt="New York English 로고" />
      </div>
      <article className="guide-article">
        <header className="guide-hero">
          <p className="eyebrow">September Review Event</p><h1>이벤트 참여 방법</h1>
          <p>우리 아이가 보여준 작은 변화도 작은 성장입니다.<br />실제로 경험하신 이야기를 편안하게 들려주세요.</p>
          <div className="guide-period"><span>이벤트 기간</span><strong>2026년 9월 1일 — 9월 30일</strong></div>
          <p className="guide-target"><span>이벤트 대상</span>초등부 재원생 학부모</p>
        </header>
        <section className="benefit-card" aria-labelledby="benefit-title">
          <div className="section-icon"><Sparkles aria-hidden="true" /></div>
          <div><p className="section-kicker">Thank You Benefit</p><h2 id="benefit-title">교육비 5% 할인</h2>
            <div className="benefit-rows"><p><span>9월 교육비 결제 전</span><strong>9월 교육비 5% 할인</strong></p><p><span>9월 교육비 결제 완료</span><strong>10월 교육비 5% 할인</strong></p></div>
          </div>
        </section>
        <section className="guide-section" aria-labelledby="requirements-title">
          <Heading number="01" eyebrow="Before You Write" title="참여 조건" id="requirements-title" />
          <div className="requirement-grid">
            <div className="requirement-card"><Camera /><strong>사진 2장 이상</strong><span>아이의 실제 학습 모습이나 결과물</span></div>
            <div className="requirement-card"><MessageSquareText /><strong>본문 4문장 이상</strong><span>부모님이 직접 경험하신 이야기</span></div>
            <div className="requirement-card"><Heart /><strong>성장 경험 1가지</strong><span>아이에게 생긴 변화 또는 느낀 점</span></div>
          </div>
          <div className="notice-box"><strong>사진에는 얼굴이 나오지 않아도 괜찮습니다.</strong>이름이나 개인정보가 보이는 경우 가려서 첨부해주세요.</div>
        </section>
        <section className="guide-section" aria-labelledby="photo-title">
          <Heading number="02" eyebrow="Photo Ideas" title="이런 사진이 좋아요" id="photo-title" />
          <ul className="idea-list">{photoIdeas.map((idea) => <li key={idea}><Check aria-hidden="true" />{idea}</li>)}</ul>
        </section>
        <section className="guide-section" aria-labelledby="story-title">
          <Heading number="03" eyebrow="Story Ideas" title="어떤 이야기를 적을까요?" id="story-title" />
          <p className="section-intro">어떤 내용을 적어야 할지 고민된다면 아래 내용을 참고해주세요.</p>
          <ul className="story-list">{storyIdeas.map((idea) => <li key={idea}>{idea}</li>)}</ul>
          <div className="freedom-note"><BookOpen aria-hidden="true" /><p><strong>별점과 리뷰 내용은 자유롭게 작성해주세요.</strong>좋은 이야기만 쓰실 필요 없이 실제로 느끼신 내용을 솔직하게 남겨주시면 됩니다.</p></div>
        </section>
        <section className="guide-section" aria-labelledby="steps-title">
          <Heading number="04" eyebrow="How To Join" title="네이버 리뷰 작성 방법" id="steps-title" />
          <ol className="step-list">{reviewSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol>
          <div className="receipt-note"><ReceiptText aria-hidden="true" /><p><strong>영수증이 필요하신가요?</strong>키즈노트로 요청하시거나 데스크에 문의하시면 재발행해드립니다.</p></div>
        </section>
        <section className="submit-card" aria-labelledby="submit-title">
          <p className="section-kicker">One Last Step</p><h2 id="submit-title">리뷰 화면을 캡처해<br />키즈노트로 보내주세요</h2>
          <p>참여 확인 후 교육비 할인 혜택을 적용해드리겠습니다.</p>
          <a href={REVIEW_URL} target="_blank" rel="noreferrer">네이버 리뷰 작성하러 가기 <ExternalLink aria-hidden="true" /></a>
        </section>
        <footer className="guide-footer"><Heart aria-hidden="true" /><p>우리 아이에게 있었던 성장의 경험이<br />또 다른 아이와 가족에게 좋은 길잡이가 됩니다.</p><strong>New York English</strong></footer>
      </article>
      <div className="sticky-action"><a href={REVIEW_URL} target="_blank" rel="noreferrer">이벤트 참여하기 <ArrowRight aria-hidden="true" /></a></div>
    </main>
  );
}

function Heading({ number, eyebrow, title, id }: { number: string; eyebrow: string; title: string; id: string }) {
  return <div className="section-heading"><span>{number}</span><div><p>{eyebrow}</p><h2 id={id}>{title}</h2></div></div>;
}
