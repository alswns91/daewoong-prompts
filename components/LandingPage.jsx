'use client'

import { useState, useEffect, useRef } from 'react'

const LECTURE_DATE = new Date('2026-04-21T08:30:00+09:00')

const CURRICULUM = [
  {
    type: 'session',
    time: '50분',
    icon: '🎯',
    color: '#1A2E5A',
    accent: '#2563EB',
    label: '도입',
    title: 'AI 툴 원리 이해 + 좋은 프롬프트 작성법',
    items: [
      '생성형 AI가 현업에서 작동하는 방식 이해',
      '프롬프트 잘 쓰는 법 실습 (역할 부여 / 맥락 제공 / 구체적 출력 요청)',
      '나쁜 프롬프트 vs 좋은 프롬프트 비교 체험',
    ],
    badge: null,
    preparedBy: '강사 준비',
    prepIcon: '👨‍🏫',
  },
  { type: 'break', label: '휴식', time: '10분' },
  {
    type: 'session',
    time: '50분',
    icon: '📊',
    color: '#E8620A',
    accent: '#F97316',
    label: '실습 1',
    title: 'Genspark으로 거래처 맞춤 BD/PPT 제작',
    items: [
      'Genspark 기본 사용법 (유료 툴 활용)',
      '실제 거래처 정보를 바탕으로 맞춤형 BD 자료 작성',
      'PPT 슬라이드 자동 생성 및 수정',
    ],
    supply: '📎 준비물: 본인 거래처 정보 1~2곳 (병원명, 주력 품목, 담당 의사 특성 등)',
    badge: 'session1',
    preparedBy: '강사 + 수업생 준비',
    prepIcon: '🤝',
  },
  { type: 'break', label: '휴식', time: '10분' },
  {
    type: 'session',
    time: '50분',
    icon: '⚙️',
    color: '#7C3AED',
    accent: '#8B5CF6',
    label: '실습 2',
    title: '바이브코딩으로 구글 앱스스크립트 자동화 툴 만들기',
    items: [
      'AI(Claude)와 대화하며 코드 한 줄 없이 업무 자동화 툴 제작',
      '소장용: 전체 MR 성과 대시보드 + 주간 보고서 자동 생성',
      'MR용: 내 담당 고객 관리 + 활동 현황 + 고객관리 웹앱',
    ],
    supply: '📎 준비물: 구글 계정 필수 / 고객 데이터 파일 (강사 제공 샘플 사용 가능)',
    badge: 'session2',
    preparedBy: '강사 준비',
    prepIcon: '👨‍🏫',
  },
]

function CountdownUnit({ value, label }) {
  const [display, setDisplay] = useState(value)
  const [flip, setFlip] = useState(false)
  const prevRef = useRef(value)

  useEffect(() => {
    if (prevRef.current !== value) {
      setFlip(true)
      setTimeout(() => {
        setDisplay(value)
        setFlip(false)
      }, 150)
      prevRef.current = value
    }
  }, [value])

  const str = String(display).padStart(2, '0')

  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(8px)',
          transform: flip ? 'scaleY(0.85)' : 'scaleY(1)',
          transition: 'transform 0.15s ease',
        }}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center"
      >
        <span className="text-white font-bold text-2xl sm:text-3xl tracking-tight tabular-nums">
          {str}
        </span>
      </div>
      <span className="text-white/60 text-[11px] sm:text-xs mt-1.5 font-medium">{label}</span>
    </div>
  )
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const calc = () => {
      const now = new Date()
      const diff = LECTURE_DATE - now
      if (diff <= 0) {
        setTimeLeft(null)
        return
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ days, hours, minutes, seconds })
    }
    calc()
    setStarted(true)
    const timer = setInterval(calc, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!started) return null

  if (!timeLeft) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="text-white text-2xl font-bold animate-pulse">🎉 강의 시작!</div>
        <div className="text-white/70 text-sm">대웅제약 AI 중급반이 시작되었습니다</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-white/70 text-xs sm:text-sm font-medium tracking-widest uppercase">
        강의까지 남은 시간
      </div>
      <div className="flex items-end gap-2 sm:gap-3">
        <CountdownUnit value={timeLeft.days} label="일" />
        <span className="text-white/50 text-2xl font-light mb-4">:</span>
        <CountdownUnit value={timeLeft.hours} label="시간" />
        <span className="text-white/50 text-2xl font-light mb-4">:</span>
        <CountdownUnit value={timeLeft.minutes} label="분" />
        <span className="text-white/50 text-2xl font-light mb-4">:</span>
        <CountdownUnit value={timeLeft.seconds} label="초" />
      </div>
    </div>
  )
}

function SessionCard({ item, onGo }) {
  if (item.type === 'break') {
    return (
      <div className="flex items-center gap-3 py-2">
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-slate-400 text-sm"
          style={{ background: '#F1F5F9' }}>
          ☕
        </div>
        <div className="flex-1 h-px" style={{ background: 'repeating-linear-gradient(90deg, #CBD5E1 0, #CBD5E1 6px, transparent 6px, transparent 12px)' }} />
        <div className="text-slate-400 text-xs font-medium whitespace-nowrap">{item.label} {item.time}</div>
        <div className="flex-1 h-px" style={{ background: 'repeating-linear-gradient(90deg, #CBD5E1 0, #CBD5E1 6px, transparent 6px, transparent 12px)' }} />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex items-stretch">
        {/* 컬러 사이드바 */}
        <div className="w-1.5 flex-shrink-0 rounded-l-2xl" style={{ background: item.color }} />

        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: item.color + '15' }}>
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ background: item.color }}>
                    {item.label}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{item.time}</span>
                </div>
                <h3 className="text-slate-800 font-semibold text-sm sm:text-base leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>

            {item.badge && (
              <button
                onClick={() => onGo(item.badge)}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: `linear-gradient(135deg, ${item.color}, ${item.accent})` }}
              >
                🔒 실습 자료
              </button>
            )}
          </div>

          <ul className="space-y-1.5 mb-3">
            {item.items.map((it, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-500 text-xs sm:text-sm">
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                  style={{ background: item.accent }}>
                  {i + 1}
                </span>
                {it}
              </li>
            ))}
          </ul>

          {item.supply && (
            <div className="flex items-start gap-2 p-3 rounded-xl text-xs text-slate-500"
              style={{ background: item.color + '08', border: `1px solid ${item.color}20` }}>
              {item.supply}
            </div>
          )}

          <div className="flex items-center gap-1.5 mt-3">
            <span className="text-base">{item.prepIcon}</span>
            <span className="text-[11px] text-slate-400">{item.preparedBy}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LandingPage({ onGoSession1, onGoSession2 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  const handleGo = (badge) => {
    if (badge === 'session1') onGoSession1()
    if (badge === 'session2') onGoSession2()
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── 히어로 헤더 ─────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0D1B3E 0%, #1A2E5A 45%, #1e3a6e 100%)',
          minHeight: 340,
        }}
      >
        {/* 배경 장식 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
            style={{ background: '#E8620A', filter: 'blur(60px)' }} />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-10"
            style={{ background: '#2563EB', filter: 'blur(50px)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-5" style={{ fill: 'none', stroke: 'white', strokeWidth: 0.5 }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-5 py-10 sm:py-14 flex flex-col items-center text-center">
          {/* 로고 + 타이틀 */}
          <div
            className="flex items-center gap-2 mb-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-16px)',
              transition: 'all 0.6s ease',
            }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0"
              style={{ background: '#E8620A' }}>
              DW
            </div>
            <span className="text-white/70 text-sm font-medium">대웅제약 ETC 로컬본부</span>
          </div>

          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-12px)',
              transition: 'all 0.7s ease 0.1s',
            }}
          >
            <h1 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight mb-2 tracking-tight">
              AI 중급반 실습 워크북
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-white/60 text-sm">📅</span>
              <span className="text-white/80 text-sm font-medium">2026년 4월 21일(화)</span>
              <span className="text-white/40 text-sm">·</span>
              <span className="text-white/60 text-sm">총 3시간 · 실습 중심 워크숍</span>
            </div>
          </div>

          {/* 카운트다운 */}
          <div
            className="mt-8 sm:mt-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            <Countdown />
          </div>
        </div>
      </div>

      {/* ── 빠른 이동 버튼 ─────────────── */}
      <div className="max-w-3xl mx-auto px-5 -mt-5 relative z-20">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onGoSession1()}
            className="group flex flex-col items-center gap-2 p-4 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #E8620A, #F97316)' }}
          >
            <span className="text-2xl">📊</span>
            <div className="text-center">
              <div className="text-sm font-extrabold">실습 1</div>
              <div className="text-white/80 text-[11px] font-normal">Genspark PPT 제작</div>
            </div>
            <span className="text-white/60 text-[10px]">🔒 비밀번호 필요</span>
          </button>

          <button
            onClick={() => onGoSession2()}
            className="group flex flex-col items-center gap-2 p-4 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)' }}
          >
            <span className="text-2xl">⚙️</span>
            <div className="text-center">
              <div className="text-sm font-extrabold">실습 2</div>
              <div className="text-white/80 text-[11px] font-normal">바이브코딩 자동화</div>
            </div>
            <span className="text-white/60 text-[10px]">🔒 비밀번호 필요</span>
          </button>
        </div>
      </div>

      {/* ── 커리큘럼 ──────────────────── */}
      <div className="max-w-3xl mx-auto px-5 py-8">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-slate-700 font-bold text-base sm:text-lg">📋 오늘의 커리큘럼</h2>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">쉬는 시간 제외 순수 강의 기준</span>
        </div>

        <div className="space-y-3">
          {CURRICULUM.map((item, i) => (
            <SessionCard key={i} item={item} onGo={handleGo} />
          ))}
        </div>

        {/* 안내 */}
        <div className="mt-5 p-4 rounded-2xl border border-slate-200 bg-white">
          <div className="text-xs text-slate-500 font-semibold mb-2">💡 준비물 안내</div>
          <div className="space-y-1.5">
            <div className="flex items-start gap-2 text-xs text-slate-500">
              <span className="flex-shrink-0 text-slate-300">•</span>
              <span><strong className="text-slate-600">Genspark PPT 강의자료</strong> — 수업생 본인이 준비 또는 인터넷 웹서치로 진행</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-500">
              <span className="flex-shrink-0 text-slate-300">•</span>
              <span><strong className="text-slate-600">실습1 · 실습2 실습 자료</strong> — 강사가 준비 (비밀번호로 접근)</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-500">
              <span className="flex-shrink-0 text-slate-300">•</span>
              <span>현장 상황에 따라 쉬는 시간 포함 시 종료 시간이 변동될 수 있습니다</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
