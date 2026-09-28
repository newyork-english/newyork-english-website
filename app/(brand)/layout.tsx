import type { Metadata, Viewport } from 'next';
import './brand.css';

export const metadata: Metadata = {
  title: 'New York English | 뉴욕잉글리쉬',
  description: '아이의 첫 영어부터, 더 넓은 세상으로. New York English 입학 설명회와 리뷰 이벤트를 만나보세요.',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
