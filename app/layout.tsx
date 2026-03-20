import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SafePlate | Flutter App Landing',
  description:
    'SafePlate는 기피 재료를 반영해 메뉴를 분석하고 더 안전한 선택을 돕는 Flutter 앱입니다.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
