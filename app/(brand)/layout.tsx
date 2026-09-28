import type { Metadata, Viewport } from 'next';
import './brand.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://newyorkenglish.co.kr'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'New York English',
    images: [{ url: '/images/classroom-confidence.png', width: 1122, height: 1402, alt: '아이들이 학습 성취를 선생님과 함께 기뻐하는 모습' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/classroom-confidence.png'],
  },
  title: 'New York English | 뉴욕잉글리쉬',
  description: '아이의 첫 영어부터, 더 넓은 세상으로. New York English 입학 설명회와 리뷰 이벤트를 만나보세요.',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
