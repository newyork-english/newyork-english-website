"use client";

import { useState, type ReactNode } from 'react';
import { ArrowUpRight, ArrowDown, Plus, Menu, X } from 'lucide-react';
import { sessions } from '@/lib/schedule';
import { siteImages } from '@/lib/site-images';

function SchoolImage({ name, className = '' }: { name: keyof typeof siteImages; className?: string }) {
  const item = siteImages[name];
  return <figure className={`school-image ${className}`}>
    {item.src ? <img src={item.src} alt={item.label} /> :
      <div className={`photo-mock photo-mock-${name}`} role="img" aria-label={`${item.label} 사진 자리 — 교체 예정`}>
        <span className="mock-top">NEW YORK ENGLISH <span>IMAGE {item.number}</span></span>
        <div className="mock-center"><Plus strokeWidth={1} /><span>{item.label}</span><small>사진 준비 중 · {item.ratio}</small></div>
        <span className="mock-bottom">{item.title}<span>PHOTO PLACEHOLDER</span></span>
      </div>}
  </figure>;
}

const agenda = [
  ['교육 철학', '단순히 영어 100% 환경에 노출되는 것을 넘어, 듣고 이해하고 읽고 말하고 쓰는 힘을 어떻게 연결하는지 설명드립니다.'],
  ['연령 · 연차별 교육과정', '아이의 시작 시점과 학습 연차에 따라 무엇을 배우고 어떻게 성장하는지 안내드립니다.'],
  ['교재와 커리큘럼', '미국교과서인 Wonders와 뉴욕잉글리쉬의 자체 교재인 New York Dictionary · New York Phonics · New York Wonder How · New York Wonder Why를 기반으로 한 체계적이고 탄탄한 커리큘럼을 소개합니다.'],
  ['초등부까지의 성장 로드맵', '영어유치부에서 끝나지 않고 초등부까지 이어지는 장기적인 영어 성장 로드맵을 그려드립니다.'],
  ['수업 · 평가 · 생활 관리', 'Speaking, Reading, Writing, Vocabulary의 학습 과정과 일상 속 성장을 어떻게 관찰하고 학부모님께 전달하는지 안내드립니다.'],
  ['충분한 질의응답', '설명 후에는 각 가정에서 궁금하셨던 내용을 충분히 질문하실 수 있는 시간을 마련합니다.'],
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
      <a className="school-logo" href="#top" aria-label="New York English 홈"><img src="/new-york-english-logo-transparent.png" alt="New York English 로고" /></a>
      <nav id="school-navigation" className={menuOpen ? 'school-nav is-open' : 'school-nav'} aria-label="주 메뉴">
        {[['교육 철학', '#philosophy'], ['교육과정', '#curriculum'], ['입학 설명회', '#sessions'], ['리뷰 이벤트', '/review-event']].map(([text, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{text}</a>)}
      </nav>
      <a className="school-header-cta" href="#reserve">설명회 예약 <ArrowUpRight size={16} /></a>
      <button className="school-menu" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="school-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main id="main-content">
      <section className="school-hero school-wrap">
        <div className="school-hero-copy">
          <p className="school-label"><span className="school-label-line" />2027 ADMISSIONS</p>
          <p className="school-wordmark">New York<br /><em>English.</em></p>
          <h1>2027학년도<br />입학 설명회</h1>
          <p className="school-lead">아이의 첫 영어부터,<br />스스로 읽고 생각하고 표현하는 힘까지.</p>
          <a className="school-button" href="#sessions">우리 아이에게 맞는 세션 <ArrowUpRight size={18} /></a>
          <div className="school-hero-note"><span>AGES 5–7</span><span>연령 · 연차별 사전 예약제</span></div>
        </div>
        <div className="school-hero-visual"><SchoolImage name="classroom" /><div className="school-image-caption"><span>A PLACE TO BEGIN.</span><span>A WORLD TO GROW.</span></div></div>
      </section>

      <div className="school-facts school-wrap" aria-label="교육의 기준"><p><strong>12</strong><span>년의 영어교육 경험</span></p><p><strong>6</strong><span>개의 연령·연차별 세션</span></p><p><strong>One journey.</strong><span>유치부에서 초등부까지</span></p><a href="#philosophy" aria-label="교육 철학 보기"><ArrowDown size={22} /></a></div>

      <section className="school-philosophy school-section school-wrap" id="philosophy">
        <div className="school-section-heading"><p className="school-label">01 / OUR PHILOSOPHY</p><h2>같은 나이라도,<br /><em>영어를 시작한 시점에 따라</em><br />필요한 교육은 다릅니다.</h2></div>
        <div className="school-philosophy-detail"><SchoolImage name="reading" /><div className="school-philosophy-text"><p>영어를 처음 시작하는 시점과 지금까지 쌓아온 영어 경험에 따라 아이에게 필요한 교육의 순서와 깊이는 달라집니다.</p><p>New York English는 아이의 연령과 영어 학습 연차에 맞춰 서로 다른 교육과정과 성장 경로를 설계합니다.</p><a className="school-link" href="#curriculum">배움이 연결되는 방식 <ArrowUpRight size={16} /></a></div></div>
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
        <div className="school-heading-row"><div><p className="school-label">03 / CONNECTED CURRICULUM</p><h2>차곡차곡 쌓이고,<br /><em>다음 배움으로 이어지는 영어.</em></h2></div><p>미국 교과서 Wonders와 자체 교재.<br />각 교재와 영역이 어떻게 연결되고 확장되는지 소개합니다.</p></div>
        <div className="school-curriculum">
          <div className="school-course"><div className="school-course-heading"><span>01 / SOUND & LANGUAGE</span><h3>New York Phonics<br />& Wonder How</h3><p>소리와 읽기의 기반에서 언어의 구조로.</p></div><ul>{['Wonder How Voca', 'Wonder How Reading', 'Wonder How Grammar'].map((x, i) => <li key={x}><span>0{i + 1}</span>{x}</li>)}</ul></div>
          <div className="school-course"><div className="school-course-heading"><span>02 / UNDERSTANDING & EXPRESSION</span><h3>Wonders<br />& Wonder Why</h3><p>미국 교과서 기반의 이해에서 사고와 표현으로.</p></div><ul>{['Wonder Why Voca', 'Wonder Why Reading', 'Wonder Why Grammar', 'Wonder Why Writing'].map((x, i) => <li key={x}><span>0{i + 1}</span>{x}</li>)}</ul></div>
          <div className="school-dictionary"><span>CORE FOUNDATION · ALL STAGES</span><h3>New York Dictionary</h3><p>500개 주제 · 약 6,000개 실용 어휘로 쌓는 전 과정 공통 어휘 기반</p></div>
        </div>
        <ol className="school-stages">{[['FOUNDATION','어휘 · 소리'],['STRUCTURE','문장 · 문법'],['EXPANSION','읽기 · 이해'],['APPLICATION','사고 · 표현'],['EXPRESSION','쓰기 · 완성']].map(([name, desc], i) => <li key={name}><span>0{i + 1}</span><strong>{name}</strong><small>{desc}</small></li>)}</ol>
        <div className="school-materials"><SchoolImage name="materials" /><div><p className="school-label">BEYOND THE CLASSROOM</p><h3>오늘의 배움이<br />내일의 자신감이 되도록.</h3><p>유치부에서 만들어진 영어의 기반을 초등부의 읽기, 사고, 표현으로 이어갑니다. 아이의 시작점부터 다음 단계까지, 장기적인 영어 성장 로드맵을 함께 그립니다.</p></div></div>
      </section>

      <section className="school-director school-section"><div className="school-wrap school-director-grid"><figure><div className="school-portrait"><img src="/hailey-director.jpg" alt="New York English Hailey 원장" loading="lazy" /></div><figcaption><strong>Hailey</strong><span>Director, New York English</span></figcaption></figure><div><p className="school-label">04 / A NOTE FROM OUR DIRECTOR</p><h2>교육의 이유를,<br /><em>직접 이야기합니다.</em></h2><p className="school-director-intro">12년의 영어 교육 경험을 바탕으로,<br />Hailey 원장이 직접 진행합니다.</p><p>Hailey 원장님은 천안에서 12년째 New York English를 운영하며 유치부·초등부 교육과정과 자체 커리큘럼을 직접 설계하고 운영하고 있습니다.</p><p>이번 설명회에서는 단순히 어떤 과목과 교재를 사용하는지가 아니라, 다년간 영어교육 현장에서 경험한 노하우를 토대로 <strong>왜 이 시기에 이 교육이 필요한지, 그리고 다음 단계와 어떻게 연결되는지</strong>를 각 연령과 학습 연차에 맞춰 직접 설명드립니다.</p></div></div></section>

      <section className="school-agenda school-section school-wrap" id="program"><div className="school-heading-row"><div><p className="school-label">05 / THE ADMISSIONS BRIEFING</p><h2>이번 설명회에서<br /><em>만나보실 내용</em></h2></div><p>학습부터 생활, 초등부로 이어지는 성장까지.<br />궁금하셨던 이야기를 차분히 나눕니다.</p></div><div className="school-agenda-list">{agenda.map(([title, description], i) => <details key={title} open={i === 0}><summary><span>0{i + 1}</span><h3>{title}</h3><Plus size={20} /></summary><p>{description}</p></details>)}</div></section>

      <section className="school-reservation school-section" id="reserve"><div className="school-wrap"><div className="school-heading-row"><div><p className="school-label">06 / RESERVE YOUR SEAT</p><h2>우리 아이에게 맞는<br /><em>자리를 예약하세요.</em></h2></div><p>각 세션은 정해진 좌석만 운영됩니다.<br />교육과정을 충분히 설명드리고, 질의응답을 위한 여유를 마련합니다.</p></div><div className="school-reservation-grid"><aside className="school-before"><h3>예약 전, 확인해주세요.</h3><ol>{notices.map((x, i) => <li key={x}><span>0{i + 1}</span><p>{x}</p></li>)}</ol><a href="tel:0415620011">문의 <strong>041-562-0011</strong><ArrowUpRight size={17} /></a></aside><div className="school-booking-panel"><p className="school-label">DATE & TIME</p><h3>참석 가능한 일정을 선택해주세요.</h3>{reservation}</div></div></div></section>

      <section className="school-closing school-section"><p className="school-label">Your Child.<br className="school-mobile-break" /> Their Starting Point. Their Roadmap.</p><h2>우리 아이에게 맞는<br /><em>영어 성장의 방향을</em><br />만나 보세요.</h2><a className="school-button school-button-light" href="#reserve">설명회 예약하기 <ArrowUpRight size={18} /></a></section>
    </main>
    <footer className="school-footer school-wrap"><a href="#top" aria-label="맨 위로"><img src="/new-york-english-logo-transparent.png" alt="New York English 로고" /></a><div><strong>New York English</strong><p>2027학년도 New York English 입학 설명회<br /><a href="tel:0415620011">문의 041-562-0011</a></p></div><div className="school-footer-links"><a href="/review-event">리뷰 이벤트 <ArrowUpRight size={14} /></a><small>© 2026 New York English</small></div></footer>
  </div>;
}
