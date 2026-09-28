import { ArrowUpRight } from 'lucide-react';

export default function BrandHome() {
  return <main className="brand-home">
    <div className="brand-home-content">
      <img className="brand-home-logo" src="/new-york-english-logo-transparent.png" alt="New York English 공식 로고" width={148} height={148} fetchPriority="high" />
      <h1><span>New York</span>{' '}<span>English</span></h1>
      <p>아이의 첫 영어부터, 더 넓은 세상으로.</p>
      <nav className="brand-home-links" aria-label="New York English 안내">
        <a className="brand-home-primary" href="/admissions">2027 입학설명회<ArrowUpRight size={18} aria-hidden="true" /></a>
        <a href="/review-event">리뷰 이벤트<ArrowUpRight size={18} aria-hidden="true" /></a>
      </nav>
    </div>
  </main>;
}
