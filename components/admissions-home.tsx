"use client";

import { useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, ArrowRight, Plus, Menu, X } from 'lucide-react';
import { sessions } from '@/lib/schedule';
function SchoolPhotoSlider({ label, photos }: { label: string; photos: { src: string; alt: string }[] }) {
 const track = useRef<HTMLDivElement>(null);
 const [active, setActive] = useState(0);
 function goTo(index: number) {
  const element = track.current;
  if (!element) return;
  const next = (index + photos.length) % photos.length;
  element.scrollTo({ left: next * element.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
 }
 return <div className="school-photo-slider" role="region" aria-roledescription="슬라이드" aria-label={label}>
  <div className="school-photo-track" ref={track} onScroll={(event) => { const el = event.currentTarget; setActive(Math.round(el.scrollLeft / el.clientWidth)); }}>
   {photos.map((photo, index) => <figure className="school-image" key={photo.src} role="group" aria-roledescription="슬라이드" aria-label={(index + 1) + ' / ' + photos.length}><img src={photo.src} alt={photo.alt} loading="lazy" width={1122} height={1402} /></figure>)}
  </div>
  <div className="school-photo-controls">
   <button type="button" onClick={() => goTo(active - 1)} aria-label="이전 사진"><ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} /></button>
   <div className="school-photo-dots">{photos.map((photo, index) => <button type="button" key={photo.src} aria-label={(index + 1) + '번째 사진 보기'} aria-current={active === index ? 'true' : undefined} onClick={() => goTo(index)}><span /></button>)}</div>
   <button type="button" onClick={() => goTo(active + 1)} aria-label="다음 사진"><ArrowRight size={20} /></button>
  </div>
 </div>;
}

const courses = [
  { phase: 'SOUND', title: 'New York Phonics', text: '소리와 글자를 연결하며 읽기의 첫 기반을 쌓습니다.', modules: [] },
  { phase: 'BUILD', title: 'New York Wonder How', text: '어휘와 읽기를 문장과 언어의 구조로 확장합니다.', modules: ['Wonder How Voca', 'Wonder How Reading', 'Wonder How Grammar'] },
  { phase: 'UNDERSTAND', title: 'Wonders', text: '미국 교과서의 다양한 글을 읽으며 이해와 사고의 폭을 넓힙니다.', modules: [] },
  { phase: 'EXPRESS', title: 'New York Wonder Why', text: '이해한 영어를 자신의 생각과 글로 표현합니다.', modules: ['Wonder Why Voca', 'Wonder Why Reading', 'Wonder Why Grammar', 'Wonder Why Writing'] },
];

const agenda = [
  ['교육 철학', '듣기와 이해, 읽기와 표현을 연결하는 교육. 영어를 경험하는 데서 나아가, 스스로 이해하고 사용하는 힘을 기르는 원칙을 전합니다.'],
  ['연령 · 연차별 교육과정', '같은 연령에도 시작점에 따라 달라지는 학습 목표. 아이의 영어 경험에 맞춘 교육 내용과 단계별 성장 방향을 살펴봅니다.'],
  ['교재와 커리큘럼', '미국 교과서 Wonders와 New York English 자체 교재로 구성한 교육과정. 각 교재의 역할과 영역 간 연결, 단계별 심화 구조를 소개합니다.'],
  ['초등부까지의 성장 로드맵', '유치부의 언어 기초에서 초등부의 독해와 글쓰기까지. 각 단계에서 갖추게 될 핵심 역량과 장기적인 학습 경로를 제시합니다.'],
  ['수업 · 평가 · 생활 관리', '수업 속 성취와 일상 속 변화를 함께 살피는 교육. 학습 과정을 관찰하고 성장을 평가하며, 가정과 공유하는 기준을 안내합니다.'],
  ['충분한 질의응답', '아이의 시작점과 교육 방향에 관한 질문을 나눕니다. 가정마다 다른 고민을 바탕으로, 우리 아이에게 필요한 선택을 함께 살펴봅니다.'],
];
const notices = [
  '이번 입학 설명회는 보호자만 참석 가능합니다.',
  '아버님과 어머님이 함께 참석하시는 경우 2개의 좌석으로 예약됩니다.',
  '각 세션은 아이의 시작점에 맞춘 깊이 있는 상담과 충분한 질의응답을 위해, 한정된 좌석만 운영됩니다.',
  '원활한 진행을 위해 예약 시간 10분 전까지 도착해 주세요.',
];

export function AdmissionsHome({ reservation, onSession }: { reservation: ReactNode; onSession: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="school-site" id="top">
    <a className="skip-link" href="#main-content">본문으로 바로가기</a>
    <header className="school-header">
      <a className="school-logo" href="/" aria-label="New York English 홈"><img src="/new-york-english-logo-transparent.png" alt="New York English 로고" /></a>
      <nav id="school-navigation" className={menuOpen ? 'school-nav is-open' : 'school-nav'} aria-label="주 메뉴">
        {[['교육 철학', '#philosophy'], ['교육과정', '#curriculum'], ['입학 설명회', '#sessions'], ['리뷰 이벤트', '/review-event']].map(([text, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{text}</a>)}
      </nav>
      <a className="school-header-cta" href="#reserve">설명회 예약 <ArrowUpRight size={16} /></a>
      <button className="school-menu" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="school-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main id="main-content">
      <section className="school-hero-banner"><div className="school-hero school-wrap">
        <div className="school-hero-copy">
          <p className="school-label"><span className="school-label-line" />2027 ADMISSIONS</p>
          <p className="school-wordmark">New York<br /><em>English</em></p>
          <h1>2027학년도<br />입학 설명회</h1>
          <a className="school-button" href="#sessions">우리 아이에게 맞는 세션 <ArrowUpRight size={18} /></a>
          <div className="school-hero-note"><span>AGES 5–7</span><span>연령 · 연차별 사전 예약제</span></div>
        </div>
        <div className="school-hero-seal"><img src="/new-york-english-logo-transparent.png" alt="New York English 공식 로고" fetchPriority="high" /></div>
      </div></section>

      <section className="school-philosophy school-section school-wrap" id="philosophy">
        <div className="school-section-heading"><p className="school-label">01 / OUR PHILOSOPHY</p><h2>같은 나이라도,<br /><em>영어를 시작한 시점에 따라</em><br />필요한 교육은 다릅니다.</h2></div>
        <div className="school-philosophy-detail"><SchoolPhotoSlider label="교육 철학 사진" photos={[{"src":"/images/philosophy-learning.png","alt":"선생님과 아이가 그림 카드를 보며 영어를 배우는 모습"},{"src":"/images/philosophy-together.png","alt":"선생님과 두 아이가 함께 영어 활동을 즐기는 모습"}]} /><div className="school-philosophy-text"><p>영어를 처음 시작하는 시점과 지금까지 쌓아온 영어 경험에 따라 아이에게 필요한 교육의 순서와 깊이는 달라집니다.</p><p>New York English는 아이의 연령과 영어 학습 연차에 맞춰 서로 다른 교육과정과 성장 경로를 설계합니다.</p><a className="school-link" href="#curriculum">배움이 연결되는 방식 <ArrowUpRight size={16} /></a></div></div>
      </section>

      <section className="school-programs school-section" id="sessions"><div className="school-wrap">
        <div className="school-heading-row"><div><p className="school-label">02 / FIND THEIR STARTING POINT</p><h2>아이마다 시작점이 다르기에,<br /><em>설명회도 달라야 합니다.</em></h2></div><p>우리 아이의 나이와 영어 경험에 맞는<br />교육의 다음 단계를 확인하세요.</p></div>
        <div className="school-session-grid">{sessions.map((session, index) => <article className="school-session-card" key={session.id}>
          <div className="school-session-top"><span>0{index + 1}</span><span>{session.id.endsWith('-1') ? 'BEGIN' : session.id.endsWith('-2') ? 'GROW' : 'FLOURISH'}</span></div>
          <h3>{session.eyebrow}</h3><p className="school-audience">{session.audience}</p><p>{session.description}</p>
          <a href="#reserve" className="school-link" onClick={() => onSession(session.id)}>세션 일정 보기 <ArrowUpRight size={17} /></a>
        </article>)}</div>
      </div></section>

      <section className="school-section school-wrap" id="curriculum">
        <div className="school-heading-row"><div><p className="school-label">03 / CONNECTED CURRICULUM</p><h2>교재마다 분명한 역할,<br /><em>과정 전체에 일관된 설계.</em></h2></div><p>미국 교과서 Wonders와 New York English 자체 교재.<br />각 교재와 영역이 어떻게 연결되고 확장되는지 소개합니다.</p></div>
        <div className="school-curriculum">
          <ol className="curriculum-flow" aria-label="교재와 학습 영역의 연결 흐름">{courses.map((course, index) => <li className={`curriculum-step curriculum-step-${index + 1}`} key={course.phase}>
            <p className="curriculum-step-label"><span>0{index + 1}</span>{course.phase}</p>
            <h3>{course.title}</h3><p className="curriculum-step-description">{course.text}</p>
            {course.modules.length > 0 && <ul className="curriculum-modules">{course.modules.map(module => <li key={module}>{module}</li>)}</ul>}
            {index < courses.length - 1 && <span className="curriculum-connector" aria-hidden="true"><ArrowRight strokeWidth={1.25} /></span>}
          </li>)}</ol>
          <div className="school-dictionary"><span>CORE FOUNDATION · ALL STAGES</span><h3>New York Dictionary</h3><p>500개 주제 · 약 6,000개 실용 어휘로 쌓는 전 과정 공통 어휘 기반</p></div>
        </div>
        <p className="curriculum-progression" aria-label="학습 흐름: 기초, 확장, 이해, 적용, 표현"><span>FOUNDATION</span><ArrowRight size={16} aria-hidden="true" /><span>EXPANSION</span><ArrowRight size={16} aria-hidden="true" /><span>UNDERSTANDING</span><ArrowRight size={16} aria-hidden="true" /><span>APPLICATION</span><ArrowRight size={16} aria-hidden="true" /><span>EXPRESSION</span></p>
        <div className="school-materials"><SchoolPhotoSlider label="배움과 성장 사진" photos={[{"src":"/images/classroom-confidence.png","alt":"아이들이 학습 성취를 선생님과 함께 기뻐하는 모습"},{"src":"/images/classroom-learning.png","alt":"선생님과 두 아이가 그림 카드로 영어를 배우는 모습"}]} /><div><p className="school-label">BEYOND THE CLASSROOM</p><h3>오늘의 배움이<br />내일의 자신감이 되도록.</h3><p>유치부에서 만들어진 영어의 기반을 초등부의 읽기, 사고, 표현으로 이어갑니다. 아이의 시작점부터 다음 단계까지, 장기적인 영어 성장 로드맵을 함께 그립니다.</p></div></div>
      </section>

      <section className="school-director school-section"><div className="school-wrap school-director-grid"><figure><div className="school-portrait"><img src="/hailey-director.jpg" alt="New York English Hailey 원장" loading="lazy" /></div><figcaption><strong>Hailey</strong><span>Director, New York English</span></figcaption></figure><div><p className="school-label">04 / PRESENTED BY DIRECTOR HAILEY</p><h2>교육의 이유를,<br /><em>직접 이야기합니다.</em></h2><p className="school-director-intro">12년의 영어 교육 경험을 바탕으로,<br />Hailey 원장님이 직접 진행합니다.</p><p>Hailey 원장님은 천안에서 12년째 New York English를 운영하며 현재는 유치부·초등부 교육과정과 자체 커리큘럼을 직접 설계하고 운영하고 있습니다.</p><p>이번 설명회에서는 단순히 어떤 과목과 교재를 사용하는지가 아니라, 다년간 영어교육 현장에서 경험한 노하우를 토대로 <strong>왜 이 시기에 이 교육이 필요한지, 그리고 다음 단계와 어떻게 연결되는지</strong>를 각 연령과 학습 연차에 맞춰 직접 설명드립니다.</p></div></div></section>

      <section className="school-agenda school-section school-wrap" id="program"><div className="school-heading-row"><div><p className="school-label">05 / THE ADMISSIONS BRIEFING</p><h2>이번 설명회에서<br /><em>만나보실 내용</em></h2></div><p>학습부터 생활, 초등부로 이어지는 성장까지.<br />궁금하셨던 이야기를 차분히 나누며,<br />아이가 어떤 역량을 갖추고 어디까지 성장해 나갈지 함께 보여드립니다.</p></div><div className="school-agenda-list">{agenda.map(([title, description], i) => <details key={title} open={i === 0}><summary><span>0{i + 1}</span><h3>{title}</h3><Plus size={20} /></summary><p>{description}</p></details>)}</div></section>

      <section className="school-reservation school-section" id="reserve"><div className="school-wrap"><div className="school-heading-row"><div><p className="school-label">06 / RESERVE YOUR SEAT</p><h2>우리 아이에게 맞는<br /><em>자리를 예약하세요.</em></h2></div><p>각 세션은 정해진 좌석만 운영됩니다.<br />교육과정을 충분히 설명드리고, 질의응답을 위한 여유를 마련합니다.</p></div><div className="school-reservation-grid"><aside className="school-before"><h3>예약 전, 확인해주세요.</h3><ol>{notices.map((x, i) => <li key={x}><span>0{i + 1}</span><p>{x}</p></li>)}</ol><a href="tel:0415620011">문의 <strong>041-562-0011</strong><ArrowUpRight size={17} /></a></aside><div className="school-booking-panel"><p className="school-label">DATE & TIME</p><h3>참석 가능한 일정을 선택해주세요.</h3>{reservation}</div></div></div></section>

      <section className="school-closing school-section"><p className="school-label">Your Child.<br className="school-mobile-break" /> Their Starting Point. Their Roadmap.</p><h2>우리 아이에게 맞는<br /><em>영어 성장의 방향을</em><br />만나 보세요.</h2><a className="school-button school-button-light" href="#reserve">설명회 예약하기 <ArrowUpRight size={18} /></a></section>
    </main>
    <footer className="school-footer school-wrap"><a href="#top" aria-label="맨 위로"><img src="/new-york-english-logo-transparent.png" alt="New York English 로고" /></a><div><strong>New York English</strong><p>2027학년도 New York English 입학 설명회<br /><a href="tel:0415620011">문의 041-562-0011</a></p></div><div className="school-footer-links"><small>© 2026 New York English</small></div></footer>
  </div>;
}
