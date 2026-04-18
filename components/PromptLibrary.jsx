'use client'

import { useState, useEffect } from 'react'
import { prompts, categories, categoryMeta } from '../data/prompts'

export default function PromptLibrary() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [copiedId, setCopiedId] = useState(null)
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [modalCopied, setModalCopied] = useState(false)

  const readyCount = prompts.filter((p) => p.status === 'ready').length

  const filteredPrompts = prompts.filter((p) => {
    const matchesCategory = activeCategory === '전체' || p.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      p.title.includes(searchQuery) ||
      p.description.includes(searchQuery)
    return matchesCategory && matchesSearch
  })

  const handleCardClick = (prompt) => {
    if (prompt.status === 'coming-soon') return
    setSelectedPrompt(prompt)
    setModalCopied(false)
  }

  const handleCopy = async (promptText, id) => {
    try {
      await navigator.clipboard.writeText(promptText)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      alert('복사에 실패했습니다. 브라우저 설정을 확인해주세요.')
    }
  }

  const handleModalCopy = async () => {
    if (!selectedPrompt) return
    try {
      await navigator.clipboard.writeText(selectedPrompt.promptText)
      setModalCopied(true)
      setTimeout(() => setModalCopied(false), 2500)
    } catch {
      alert('복사에 실패했습니다.')
    }
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedPrompt(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── 헤더 ── */}
      <header
        className="text-white py-12 px-6"
        style={{ background: 'linear-gradient(135deg, #1A2E5A 0%, #0057A8 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/20">
              대웅제약 ETC 로컬본부
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/20">
              AI 중급반 · 실습 1
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            Genspark AI 슬라이드
            <br className="md:hidden" /> 프롬프트 라이브러리
          </h1>
          <p className="text-blue-200 text-base md:text-lg mb-8">
            원하는 프롬프트를 선택 → 복사 → 젠스파크에 붙여넣기
          </p>

          {/* 통계 */}
          <div className="flex flex-wrap gap-6">
            {[
              { label: '전체 프롬프트', value: '30' },
              { label: '카테고리', value: '7' },
              { label: '사용 가능', value: `${readyCount}` },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
                <div className="w-px h-10 bg-white/20 last:hidden" />
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── 사용 방법 배너 ── */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4 text-sm text-amber-800">
          <span className="font-bold">📋 사용 방법</span>
          <span className="flex items-center gap-1">
            <span className="bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full text-xs font-bold">1</span>
            프롬프트 카드 클릭
          </span>
          <span>→</span>
          <span className="flex items-center gap-1">
            <span className="bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full text-xs font-bold">2</span>
            내용 확인 후 <strong>[전체 복사]</strong> 클릭
          </span>
          <span>→</span>
          <span className="flex items-center gap-1">
            <span className="bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full text-xs font-bold">3</span>
            젠스파크에 붙여넣기
          </span>
          <span>→</span>
          <span className="flex items-center gap-1">
            <span className="bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full text-xs font-bold">4</span>
            <strong>[대괄호]</strong> 부분만 내 정보로 교체
          </span>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* ── 검색 ── */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="프롬프트 검색..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* ── 카테고리 탭 ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat.id
                  ? 'bg-[#0057A8] text-white border-[#0057A8] shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── 카드 그리드 ── */}
        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPrompts.map((prompt) => {
              const meta = categoryMeta[prompt.category]
              const isReady = prompt.status === 'ready'
              return (
                <div
                  key={prompt.id}
                  onClick={() => handleCardClick(prompt)}
                  className={`bg-white rounded-2xl border border-slate-100 p-6 flex flex-col transition-all relative overflow-hidden ${
                    isReady
                      ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5'
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  style={{
                    boxShadow: isReady ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  {/* 상단 색상 바 */}
                  {isReady && (
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                      style={{ backgroundColor: meta.color }}
                    />
                  )}

                  {/* 카테고리 + 슬라이드 수 */}
                  <div className="flex items-center justify-between mb-3 mt-1">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: meta.color + '18',
                        color: meta.color,
                      }}
                    >
                      {meta.name}
                    </span>
                    <span className="text-xs text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
                      {prompt.slides}슬라이드
                    </span>
                  </div>

                  {/* 번호 + 제목 */}
                  <div className="flex items-start gap-2 mb-2">
                    <span
                      className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        backgroundColor: meta.color + '18',
                        color: meta.color,
                      }}
                    >
                      {prompt.id}
                    </span>
                    <h3 className="text-[#1A2E5A] font-bold text-base leading-snug">
                      {prompt.title}
                    </h3>
                  </div>

                  {/* 설명 */}
                  <p className="text-slate-500 text-sm flex-1 mb-4 leading-relaxed">
                    {prompt.description}
                  </p>

                  {/* 하단 버튼 영역 */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                    {isReady ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCopy(prompt.promptText, prompt.id)
                          }}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                            copiedId === prompt.id
                              ? 'bg-green-500 text-white'
                              : 'text-white hover:opacity-90'
                          }`}
                          style={{
                            backgroundColor:
                              copiedId === prompt.id ? undefined : meta.color,
                          }}
                        >
                          {copiedId === prompt.id ? '✓ 복사됨!' : '📋 바로 복사'}
                        </button>
                        <span className="text-xs text-slate-400">클릭 시 미리보기</span>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg">
                        🔒 준비 중
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-24 text-slate-400">
            <div className="text-4xl mb-4">🔍</div>
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </main>

      {/* ── 푸터 ── */}
      <footer className="border-t border-slate-200 mt-16 py-10 text-center text-slate-400 text-sm bg-white">
        <p className="font-medium text-slate-600 mb-1">
          대웅제약 ETC 로컬본부 AI 중급반
        </p>
        <p>Powered by Genspark · 프롬프트는 순차적으로 업데이트됩니다</p>
      </footer>

      {/* ── 모달 ── */}
      {selectedPrompt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSelectedPrompt(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div
              className="flex items-center justify-between px-6 py-4 rounded-t-2xl"
              style={{
                background: `linear-gradient(135deg, #1A2E5A, ${categoryMeta[selectedPrompt.category].color})`,
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-white/70">
                    {categoryMeta[selectedPrompt.category].name}
                  </span>
                  <span className="text-white/40 text-xs">·</span>
                  <span className="text-xs font-medium text-white/70">
                    {selectedPrompt.slides}슬라이드
                  </span>
                </div>
                <h2 className="text-white font-bold text-xl">{selectedPrompt.title}</h2>
              </div>
              <button
                onClick={() => setSelectedPrompt(null)}
                className="text-white/60 hover:text-white text-2xl leading-none ml-4"
              >
                ✕
              </button>
            </div>

            {/* 안내 배너 */}
            <div className="bg-blue-50 border-b border-blue-100 px-6 py-2.5 text-sm text-blue-700 flex items-center gap-2">
              <span>💡</span>
              <span>
                아래 프롬프트를 복사한 후, <strong>[대괄호]</strong> 부분만 내 거래처 정보로 교체하세요.
              </span>
            </div>

            {/* 프롬프트 텍스트 */}
            <div className="flex-1 overflow-y-auto prompt-scroll">
              <pre className="px-6 py-5 text-xs text-slate-700 whitespace-pre-wrap leading-relaxed font-mono bg-slate-50">
                {selectedPrompt.promptText}
              </pre>
            </div>

            {/* 모달 하단 버튼 */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl">
              <span className="text-xs text-slate-400">
                ESC 키를 눌러 닫을 수 있습니다
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedPrompt(null)}
                  className="px-4 py-2 text-sm text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  닫기
                </button>
                <button
                  onClick={handleModalCopy}
                  className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${
                    modalCopied
                      ? 'bg-green-500 text-white'
                      : 'text-white hover:opacity-90'
                  }`}
                  style={{
                    backgroundColor: modalCopied
                      ? undefined
                      : categoryMeta[selectedPrompt.category].color,
                  }}
                >
                  {modalCopied ? '✓ 복사 완료!' : '📋 전체 복사하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
