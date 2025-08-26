import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Story Weaver - AI 인터랙티브 웹툰 스토리',
  description: 'AI와 함께 만들어가는 당신만의 웹툰 스토리. 캐릭터와 대화하며 스토리를 직접 만들어보세요.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}