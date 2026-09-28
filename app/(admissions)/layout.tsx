import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./school.css";

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
  title: "2027학년도 New York English 입학 설명회",
  description: "아이의 연령과 영어 학습 연차에 맞는 설명회 세션을 확인하고 자리를 예약하세요.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
