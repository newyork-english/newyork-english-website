import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '9월 네이버 리뷰 이벤트 | New York English',
  description: '우리 아이의 성장 이야기를 들려주세요. 초등부 재원생 학부모님을 위한 9월 네이버 리뷰 이벤트입니다.',
  openGraph: {
    title: '우리 아이의 성장 이야기를 자랑해주세요',
    description: 'New York English 초등부 9월 네이버 리뷰 이벤트 · 교육비 5% 할인',
    images: [{ url: '/og.png', width: 1730, height: 907, alt: 'New York English 9월 리뷰 이벤트' }],
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '우리 아이의 성장 이야기를 자랑해주세요',
    description: 'New York English 초등부 9월 네이버 리뷰 이벤트 · 교육비 5% 할인',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
