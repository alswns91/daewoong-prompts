'use client'

import { useState, useEffect } from 'react'
import { guides, guideCategories, getGuideCountByCategory } from '../data/genspark-guide'

// ════════════════════════════════════════════════════════════════
// 실습 전 가이드 섹션 — Genspark 10개 핵심 기능 사용설명서
// ════════════════════════════════════════════════════════════════

export default function GuideSection() {
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredGuides = activeCategory === 'all'
    ? guides
    : guides.filter(g => g.category === activeCategory)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedGuide(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* ── 상단 안내 ───────────────────────────────── */}
      <div className="mb-5 p-3.5 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl flex items-start gap-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm">
          📖
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-orange-900 mb-1">실습 전 가이드</p>
          <p className="text-[11px] text-orange-800 leading-relaxed">
            Genspark의 10개 핵심 기능을 실습에 앞서 한눈에 훑어보세요. 각 카드를 클릭하면 주요 기능, 사용법, 프롬프트 예시, 대웅제약 MR 활용 시나리오까지 한 번에 확인할 수 있습니다.
          </p>
        </div>
      </div>

      {/* ── 카테고리 필터 ───────────────────────────────── */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {guideCategories.map(cat => {
          const isActive = activeCategory === cat.id
          const count = getGuideCountByCategory(cat.id)
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                isActive
                  ? 'text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
              style={isActive ? { backgroundColor: cat.color } : {}}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                isActive ? 'bg-white/25' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── 카드 그리드 ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredGuides.map(guide => (
          <GuideCard
            key={guide.id}
            guide={guide}
            onClick={() => setSelectedGuide(guide)}
          />
        ))}
      </div>

      {/* ── 빈 상태 ───────────────────────────────── */}
      {filteredGuides.length === 0 && (
        <div className="py-16 text-center text-slate-400 text-sm">
          해당 카테고리에 기능이 없습니다.
        </div>
      )}

      {/* ── 상세 모달 ───────────────────────────────── */}
      {selectedGuide && (
        <GuideModal
          guide={selectedGuide}
          onClose={() => setSelectedGuide(null)}
        />
      )}
    </>
  )
}

// ────────────────────────────────────────────────────────────────
// 카드 컴포넌트
// ────────────────────────────────────────────────────────────────
function GuideCard({ guide, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group bg-white border border-slate-200 rounded-xl p-4 text-left hover:shadow-lg hover:border-slate-300 transition-all relative overflow-hidden"
    >
      {/* 상단 데코 그라데이션 바 */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, ${guide.colorFrom}, ${guide.colorTo})` }}
      />

      <div className="flex items-start gap-3 mb-3">
        {/* 아이콘 */}
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-sm"
          style={{
            background: `linear-gradient(135deg, ${guide.colorFrom}, ${guide.colorTo})`,
          }}
        >
          <span style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>{guide.icon}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h3 className="font-bold text-sm text-slate-800 truncate">{guide.title}</h3>
            {guide.badge && (
              <span
                className="px-1.5 py-0.5 rounded text-[9px] font-bold text-white flex-shrink-0"
                style={{ background: guide.colorFrom }}
              >
                {guide.badge}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 truncate">{guide.tagline}</p>
        </div>
      </div>

      <p className="text-[11.5px] text-slate-600 leading-relaxed line-clamp-3 mb-3">
        {guide.shortDesc}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <span>기능 {guide.keyFeatures.length}개</span>
          <span className="text-slate-300">·</span>
          <span>프롬프트 {guide.promptExamples.length}개</span>
        </div>
        <span
          className="text-[11px] font-semibold group-hover:translate-x-0.5 transition-transform"
          style={{ color: guide.colorFrom }}
        >
          자세히 →
        </span>
      </div>
    </button>
  )
}

// ────────────────────────────────────────────────────────────────
// 상세 모달
// ────────────────────────────────────────────────────────────────
function GuideModal({ guide, onClose }) {
  const [copiedPrompt, setCopiedPrompt] = useState(null)

  const handleCopyPrompt = async (prompt, idx) => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopiedPrompt(idx)
      setTimeout(() => setCopiedPrompt(null), 2000)
    } catch {
      alert('복사 실패')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div className="flex min-h-full items-start justify-center p-4 pt-8 pb-8">
      <div
        className="bg-white rounded-2xl w-full max-w-3xl flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── 헤더 ───────────────────────────────── */}
        <div
          className="p-5 rounded-t-2xl text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${guide.colorFrom}, ${guide.colorTo})` }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
              {guide.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-bold text-lg leading-tight">{guide.title}</h2>
                {guide.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-slate-800">
                    {guide.badge}
                  </span>
                )}
              </div>
              <p className="text-[12px] text-white/90">{guide.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── 본문 ───────────────────────────────── */}
        <div className="p-5 space-y-5">

          {/* 개요 */}
          <Section title="개요" icon="📌">
            <p className="text-[13px] text-slate-700 leading-relaxed">{guide.overview}</p>
          </Section>

          {/* 주요 기능 */}
          <Section title="주요 기능" icon="⚡">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {guide.keyFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-50 rounded-lg border border-slate-100"
                >
                  <p className="font-semibold text-[12px] text-slate-800 mb-1">{feat.title}</p>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* 사용법 */}
          <Section title="단계별 사용법" icon="🎯">
            <div className="space-y-2">
              {guide.howToUse.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                    style={{ background: guide.colorFrom }}
                  >
                    {step.step}
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="font-semibold text-[12.5px] text-slate-800 mb-0.5">{step.title}</p>
                    <p className="text-[11.5px] text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 프롬프트 예시 */}
          <Section title="프롬프트 예시" icon="💡">
            <div className="space-y-2.5">
              {guide.promptExamples.map((ex, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-200 overflow-hidden"
                >
                  <div
                    className="px-3 py-2 text-[11px] font-semibold flex items-center justify-between text-white"
                    style={{ background: guide.colorFrom }}
                  >
                    <span>{ex.scenario}</span>
                    <button
                      onClick={() => handleCopyPrompt(ex.prompt, i)}
                      className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[10px] font-medium transition-colors"
                    >
                      {copiedPrompt === i ? '✓ 복사됨' : '복사'}
                    </button>
                  </div>
                  <div className="p-3 bg-white">
                    <p className="text-[12px] text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {ex.prompt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 크롬 확장 프로그램 (데이터에 있는 경우만) */}
          {guide.chromeExtension && (
            <Section title={guide.chromeExtension.title} icon="🔌">
              <div className="mb-3 p-3 rounded-xl border-2 flex items-start gap-2.5"
                style={{ background: `${guide.colorFrom}08`, borderColor: `${guide.colorFrom}30` }}>
                <span className="text-base flex-shrink-0 mt-0.5">💡</span>
                <p className="text-[12px] leading-relaxed" style={{ color: guide.colorFrom }}>
                  {guide.chromeExtension.tip}
                </p>
              </div>
              <div className="space-y-2">
                {guide.chromeExtension.steps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                      style={{ background: guide.colorFrom }}
                    >
                      {step.step}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="font-semibold text-[12.5px] text-slate-800 mb-0.5">{step.title}</p>
                      <p className="text-[11.5px] text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* 대웅제약 MR 활용 */}
          <Section title="대웅제약 MR 실무 활용" icon="💼" highlight>
            <div className="space-y-2">
              {guide.mrUseCase.map((uc, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border-l-4 bg-blue-50/50 border border-blue-100"
                  style={{ borderLeftColor: guide.colorFrom }}
                >
                  <p className="font-semibold text-[12.5px] text-slate-800 mb-1">{uc.title}</p>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* 팁 */}
          <Section title="사용 팁" icon="✨">
            <ul className="space-y-1.5">
              {guide.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-[12px] text-slate-700 leading-relaxed">
                  <span className="flex-shrink-0 mt-1 w-1 h-1 rounded-full" style={{ background: guide.colorFrom }} />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* 주의사항 */}
          {guide.limitations && (
            <Section title="주의사항 · 한계" icon="⚠️">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-[12px] text-amber-900 leading-relaxed">{guide.limitations}</p>
              </div>
            </Section>
          )}

        </div>

        {/* ── 푸터 ───────────────────────────────── */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex items-center justify-between">
          <p className="text-[10px] text-slate-400">
            정보 기준: 2026.04 · Genspark Workspace 4.0
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[11px] font-semibold rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            닫기
          </button>
        </div>

      </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────
// 섹션 래퍼
// ────────────────────────────────────────────────────────────────
function Section({ title, icon, children, highlight }) {
  return (
    <div className={highlight ? 'p-4 rounded-xl bg-blue-50/30 border border-blue-100' : ''}>
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-base">{icon}</span>
        <h3 className="font-bold text-[13px] text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  )
}
