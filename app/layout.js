import './globals.css'

export const metadata = {
  title: '대웅제약 MR AI 프롬프트 라이브러리',
  description: '대웅제약 ETC 로컬본부 AI 중급반 — Genspark 맞춤형 BD/PPT 슬라이드 프롬프트 모음',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
