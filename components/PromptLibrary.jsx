'use client'

import { useState, useEffect } from 'react'
import { prompts, session2Prompts, categories, categoryMeta, sections, session2Categories, session2CategoryMeta, nlmCategories, nlmCategoryMeta } from '../data/prompts'
import { scenarios, designPresets, buildStep1Prompt, buildStep2Prompt } from '../data/genspark-v2'

// 젠스파크 지원 폰트
const FONTS = [
  { value: 'Pretendard',         label: 'Pretendard',         desc: '기본 추천 · 모던 한글' },
  { value: 'Noto Sans KR',       label: 'Noto Sans KR',       desc: '깔끔한 한글 고딕' },
  { value: 'Nanum Gothic',       label: '나눔고딕',             desc: '부드러운 한글 고딕' },
  { value: 'Nanum Myeongjo',     label: '나눔명조',             desc: '전통적 한글 명조' },
  { value: 'IBM Plex Sans KR',   label: 'IBM Plex Sans KR',   desc: '테크 · 심플' },
  { value: 'Spoqa Han Sans Neo', label: 'Spoqa Han Sans Neo', desc: '가독성 최적화' },
  { value: 'Gothic A1',          label: 'Gothic A1',          desc: '경쾌한 고딕' },
  { value: 'Noto Serif KR',      label: 'Noto Serif KR',      desc: '격식체 명조' },
  { value: 'Inter',              label: 'Inter',              desc: '영문 비즈니스' },
  { value: 'Roboto',             label: 'Roboto',             desc: '영문 모던' },
]

const SLIDE_OPTIONS = [5, 6, 7, 8, 10, 12, 15, 20, 25, 30]

// 카테고리별 카드 배경 스타일
const PREVIEW_STYLES = {
  A: { bg: '#1A2E5A', bar: '#3B82F6' },
  B: { bg: '#4C1D95', bar: '#A78BFA' },
  C: { bg: '#064E3B', bar: '#34D399' },
  D: { bg: '#7F1D1D', bar: '#F87171' },
  E: { bg: '#78350F', bar: '#FCD34D' },
  F: { bg: '#0C4A6E', bar: '#38BDF8' },
  G: { bg: '#831843', bar: '#F472B6' },
}

function SlidePreview({ category }) {
  const s = PREVIEW_STYLES[category] || PREVIEW_STYLES.A
  return (
    <div className="w-full h-28 rounded-lg relative overflow-hidden flex-shrink-0" style={{ background: s.bg }}>
      <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(ellipse at 80% 20%, ${s.bar}, transparent 60%)` }} />
      <div className="absolute top-4 left-4 right-4">
        <div className="h-1.5 w-12 rounded-full mb-2 opacity-50" style={{ background: s.bar }} />
        <div className="h-2.5 w-24 rounded-full mb-3" style={{ background: '#ffffff', opacity: 0.85 }} />
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded-full opacity-30" style={{ background: s.bar }} />
          <div className="h-1.5 w-4/5 rounded-full opacity-20" style={{ background: s.bar }} />
          <div className="h-1.5 w-2/3 rounded-full opacity-15" style={{ background: s.bar }} />
        </div>
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] font-bold px-1.5 py-0.5 rounded"
        style={{ background: s.bar + 'cc', color: '#fff' }}>PPT</div>
    </div>
  )
}

function PromptCard({ prompt, meta, copiedId, onCopy, onOpen }) {
  const isReady = prompt.status === 'ready'
  const isNLM = prompt.tool === 'notebooklm'
  const isV2 = prompt.version === 'v2'

  return (
    <div
      onClick={() => isReady && onOpen(prompt)}
      className={`bg-white rounded-xl border border-slate-100 overflow-hidden flex flex-col transition-all ${
        isReady ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : 'opacity-50 cursor-not-allowed'
      }`}>
      <div className="p-3 pb-0">
        {isNLM ? (
          <div className="w-full h-28 rounded-lg flex items-center justify-center" style={{ background: '#EEF6FF' }}>
            <span className="text-3xl">📓</span>
          </div>
        ) : (
          <SlidePreview category={prompt.category} />
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: meta.color + '15', color: meta.color }}>
            {meta.name}
          </span>
          {isV2 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              2단계
            </span>
          )}
          {prompt.slides && <span className="ml-auto text-[10px] text-slate-400">{prompt.slides}장</span>}
        </div>
        <h3 className="text-slate-800 font-semibold text-sm mb-1 leading-snug">{prompt.title}</h3>
        <p className="text-slate-400 text-[11px] flex-1 mb-3 leading-relaxed line-clamp-2">{prompt.description}</p>
        <div className="border-t border-slate-50 pt-2">
          {isReady ? (
            <div className="flex gap-1.5">
              <button
                onClick={e => onCopy(e, prompt)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-white transition-all"
                style={{ backgroundColor: copiedId === prompt.id ? '#10B981' : meta.color }}>
                {copiedId === prompt.id ? '✓ 복사됨' : '복사'}
              </button>
              <button onClick={e => { e.stopPropagation(); onOpen(prompt) }}
                className="px-3 py-2 rounded-lg text-xs font-medium bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors">
                편집
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center py-1.5 text-[11px] text-slate-400">
              🔒 준비 중
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 최종 프롬프트 빌드 함수 (V1 기존 방식)
function buildFinalPrompt(basePrompt, slideCount, userContent, font) {
  let prompt = basePrompt.replace(/FONT: \S+/g, `FONT: ${font}`)
  const origMatch = prompt.match(/TOTAL SLIDES: (\d+)/)
  const origSlides = origMatch ? parseInt(origMatch[1]) : slideCount
  prompt = prompt.replace(/TOTAL SLIDES: \d+/, `TOTAL SLIDES: ${slideCount}`)

  if (userContent.trim()) {
    const slideSpecMarker = '[SLIDE SPECIFICATIONS]'
    const insertBlock = `════════════════════════════════════════
⚡ PRE-PROCESSING STEP — EXECUTE FIRST ⚡
════════════════════════════════════════

[MANDATORY] Read user content → Fill all [대괄호] placeholders → Then generate slides.

RULES:
• Slide title       → max 20 Korean characters
• Bullet point      → max 40 Korean characters
• Stat number       → exact numbers from content (e.g. "92.9%", "901억")
• Missing data      → keep [대괄호] as-is, do NOT invent data

════════════════════════════════════════
[USER PROVIDED CONTENT]
════════════════════════════════════════

${userContent.trim()}

════════════════════════════════════════
END — Now fill all [CONTENT] fields below
════════════════════════════════════════

`
    if (prompt.includes(slideSpecMarker)) {
      prompt = prompt.replace(slideSpecMarker, insertBlock + slideSpecMarker)
    } else {
      prompt += '\n\n' + insertBlock
    }
  }

  if (slideCount !== origSlides) {
    const diff = slideCount - origSlides
    prompt += `\n\n[SLIDE COUNT] Generate exactly ${slideCount} slides. Slide ${slideCount} = closing.${
      diff > 0
        ? ` Add ${diff} content slides before closing based on user content.`
        : ` Remove ${Math.abs(diff)} slides by merging least critical content.`
    }`
  }

  return prompt
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────
export default function PromptLibrary() {
  const [activeSection, setActiveSection]   = useState('session1')
  const [activeTool, setActiveTool]         = useState('genspark')
  const [activeCategory, setActiveCategory] = useState('전체')
  const [searchQuery, setSearchQuery]       = useState('')
  const [copiedId, setCopiedId]             = useState(null)
  const [selectedFont, setSelectedFont]     = useState('Pretendard')
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false)

  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [slideCount, setSlideCount]         = useState(10)
  const [userContent, setUserContent]       = useState('')
  const [showPreview, setShowPreview]       = useState(false)
  const [modalCopied, setModalCopied]       = useState(false)

  const [nlmCategory, setNlmCategory]   = useState('nlm-all')
  const [nlmFormat, setNlmFormat]       = useState('발표자 슬라이드')
  const [nlmLength, setNlmLength]       = useState('기본값')
  const [nlmSearch, setNlmSearch]       = useState('')
  const [nlmCopiedId, setNlmCopiedId]   = useState(null)
  const [nlmPreviewPrompt, setNlmPreviewPrompt] = useState(null)

  const gsPrompts = prompts.filter(p => p.tool === 'genspark')
  const allNlmPrompts = prompts.filter(p => p.tool === 'notebooklm')

  const filteredPrompts = gsPrompts.filter(p => {
    const matchCat    = activeCategory === '전체' || p.category === activeCategory
    const matchSearch = !searchQuery || p.title.includes(searchQuery) || p.description.includes(searchQuery)
    return matchCat && matchSearch
  })

  const filteredNlmPrompts = allNlmPrompts.filter(p => {
    const matchCat    = nlmCategory === 'nlm-all' || p.category === nlmCategory
    const matchSearch = !nlmSearch || p.title.includes(nlmSearch) || p.description.includes(nlmSearch)
    return matchCat && matchSearch
  })

  const openModal = (prompt) => {
    if (prompt.status !== 'ready') return
    setSelectedPrompt(prompt)
    setSlideCount(prompt.slides || 10)
    setUserContent('')
    setShowPreview(false)
    setModalCopied(false)
  }

  const handleCardCopy = async (e, prompt) => {
    e.stopPropagation()
    try {
      const text = buildFinalPrompt(prompt.promptText, prompt.slides, '', selectedFont)
      await navigator.clipboard.writeText(text)
      setCopiedId(prompt.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch { alert('복사에 실패했습니다.') }
  }

  const handleModalCopy = async () => {
    if (!selectedPrompt) return
    try {
      const text = buildFinalPrompt(selectedPrompt.promptText, slideCount, userContent, selectedFont)
      await navigator.clipboard.writeText(text)
      setModalCopied(true)
      setTimeout(() => setModalCopied(false), 2500)
    } catch { alert('복사에 실패했습니다.') }
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setSelectedPrompt(null); setFontDropdownOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const currentFont = FONTS.find(f => f.value === selectedFont)

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── 헤더 ─────────────────────────────────── */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          {/* 로고 */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #1A2E5A, #2563EB)' }}>
              DW
            </div>
            <div>
              <div className="font-semibold text-slate-800 text-sm leading-tight">AI 중급반 실습 워크북</div>
              <div className="text-[10px] text-slate-400 hidden sm:block">대웅제약 ETC 로컬본부</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 폰트 선택 — Genspark 전용 */}
            <div className="relative">
              <button onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <span>폰트: {currentFont?.label}</span>
                <svg className={`w-3 h-3 text-slate-400 transition-transform ${fontDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {fontDropdownOpen && (
                <div className="absolute right-0 top-10 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-3 py-2 bg-slate-50 border-b border-slate-100">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Genspark 전용 폰트 설정</p>
                  </div>
                  <div className="py-1 max-h-64 overflow-y-auto">
                    {FONTS.map(font => (
                      <button key={font.value}
                        onClick={() => { setSelectedFont(font.value); setFontDropdownOpen(false) }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 transition-colors ${selectedFont === font.value ? 'bg-blue-50' : ''}`}>
                        <div>
                          <div className={`text-xs font-medium ${selectedFont === font.value ? 'text-blue-600' : 'text-slate-700'}`}>{font.label}</div>
                          <div className="text-[10px] text-slate-400">{font.desc}</div>
                        </div>
                        {selectedFont === font.value && (
                          <svg className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── 메인 탭: 실습1 / 실습2 ── */}
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex gap-0">
            {sections.map(sec => (
              <button key={sec.id}
                onClick={() => { setActiveSection(sec.id); setActiveCategory('전체'); setSearchQuery('') }}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                  activeSection === sec.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}>
                <span>{sec.icon}</span>
                <span>{sec.label}</span>
                <span className="hidden sm:inline text-[10px] text-slate-400 font-normal">{sec.sublabel}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── 실습1 ─────────────────────────────────── */}
      {activeSection === 'session1' && (
        <>
          {/* 서브 탭 + 폰트 안내 */}
          <div className="bg-white border-b border-slate-100">
            <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
              <div className="flex gap-0">
                {[
                  { id: 'genspark',    label: 'Genspark AI 슬라이드', count: `${gsPrompts.length}개` },
                  { id: 'notebooklm', label: 'NotebookLM AI 슬라이드', count: '30개' },
                ].map(tab => (
                  <button key={tab.id}
                    onClick={() => { setActiveTool(tab.id); setActiveCategory('전체'); setSearchQuery('') }}
                    className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-all ${
                      activeTool === tab.id
                        ? 'border-blue-600 text-blue-600 font-semibold'
                        : 'border-transparent text-slate-500 hover:text-slate-700 font-medium'
                    }`}>
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      activeTool === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                    }`}>{tab.count}</span>
                  </button>
                ))}
              </div>
              {activeTool === 'genspark' && (
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span>폰트 적용:</span>
                  <span className="font-medium text-slate-600">{currentFont?.label}</span>
                  <span className="text-slate-300">· Genspark 전용</span>
                </div>
              )}
            </div>
          </div>

          <main className="max-w-6xl mx-auto px-5 py-6">

            {/* ── Genspark 탭 ── */}
            {activeTool === 'genspark' && (
              <>
                {/* 사용 안내 — 접을 수 있는 작은 배너 */}
                <div className="mb-5 p-3.5 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">?</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-blue-800 mb-1">2단계 워크플로우 안내</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-blue-700">
                      <span>① 카드 클릭 → 편집</span>
                      <span className="text-blue-300">›</span>
                      <span>② <strong>Step 1</strong> 복사 → ChatGPT/Claude에 내 자료 붙여넣기</span>
                      <span className="text-blue-300">›</span>
                      <span>③ AI 원고 받기 → <strong>Step 2</strong> 프롬프트를 젠스파크에 붙여넣기</span>
                    </div>
                  </div>
                </div>

                {/* 검색 + 카테고리 필터 */}
                <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 flex-shrink-0 w-48">
                    <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" placeholder="검색..."
                      className="flex-1 bg-transparent focus:outline-none text-xs text-slate-700 placeholder-slate-400"
                      value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-slate-300 hover:text-slate-500 text-xs">✕</button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map(cat => (
                      <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                          activeCategory === cat.id
                            ? 'bg-slate-800 text-white border-slate-800'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                        }`}>
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {searchQuery && (
                  <p className="text-xs text-slate-500 mb-3">
                    &quot;{searchQuery}&quot; 검색 결과 — <strong>{filteredPrompts.length}개</strong>
                  </p>
                )}

                {filteredPrompts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {filteredPrompts.map(prompt => (
                      <PromptCard key={prompt.id} prompt={prompt} meta={categoryMeta[prompt.category]}
                        copiedId={copiedId} onCopy={handleCardCopy} onOpen={openModal} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-400">
                    <div className="text-3xl mb-2">🔍</div>
                    <p className="text-sm font-medium text-slate-500">검색 결과가 없습니다</p>
                  </div>
                )}
              </>
            )}

            {/* ── NotebookLM 탭 ── */}
            {activeTool === 'notebooklm' && (
              <>
                {/* 사용 안내 */}
                <div className="mb-5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">N</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    NotebookLM에서 자료 업로드 → 슬라이드 생성 클릭 → 아래 프롬프트 복사 →
                    <strong className="text-slate-800"> &quot;만들려는 슬라이드 자료에 대한 설명&quot;</strong> 칸에 붙여넣기
                  </p>
                </div>

                {/* 형식 & 길이 설정 */}
                <div className="mb-5 p-4 bg-white border border-slate-200 rounded-xl">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-3">슬라이드 설정 (복사 시 자동 반영)</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 mb-2">형식</p>
                      <div className="flex gap-2">
                        {['자세한 자료', '발표자 슬라이드'].map(opt => (
                          <button key={opt} onClick={() => setNlmFormat(opt)}
                            className={`flex-1 py-2.5 px-3 rounded-lg border text-xs font-medium transition-all ${
                              nlmFormat === opt
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                            }`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="sm:w-40">
                      <p className="text-xs text-slate-500 mb-2">길이</p>
                      <div className="flex gap-2">
                        {['짧게', '기본값'].map(opt => (
                          <button key={opt} onClick={() => setNlmLength(opt)}
                            className={`flex-1 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                              nlmLength === opt
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                            }`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 카테고리 + 검색 */}
                <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 flex-shrink-0 w-48">
                    <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" placeholder="검색..."
                      className="flex-1 bg-transparent focus:outline-none text-xs text-slate-700 placeholder-slate-400"
                      value={nlmSearch} onChange={e => setNlmSearch(e.target.value)} />
                    {nlmSearch && <button onClick={() => setNlmSearch('')} className="text-slate-300 hover:text-slate-500 text-xs">✕</button>}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {nlmCategories.map(cat => (
                      <button key={cat.id} onClick={() => setNlmCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                          nlmCategory === cat.id
                            ? 'text-white border-transparent'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                        }`}
                        style={nlmCategory === cat.id ? { backgroundColor: cat.color } : {}}>
                        {cat.label}
                        {cat.id !== 'nlm-all' && (
                          <span className={`ml-1 text-[10px] ${nlmCategory === cat.id ? 'opacity-75' : 'text-slate-400'}`}>
                            {allNlmPrompts.filter(p => p.category === cat.id).length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* NLM 카드 그리드 */}
                {filteredNlmPrompts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {filteredNlmPrompts.map(prompt => {
                      const meta = nlmCategoryMeta[prompt.category]
                      const copied = nlmCopiedId === prompt.id
                      return (
                        <div key={prompt.id}
                          className="bg-white rounded-xl border border-slate-100 overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
                          <div className="h-24 m-3 rounded-lg relative overflow-hidden flex items-end p-2.5"
                            style={{ background: prompt.design?.bg || meta?.bg || '#F1F5F9' }}>
                            <div className="absolute inset-0 opacity-25"
                              style={{ background: `radial-gradient(circle at 70% 30%, ${meta?.accent || '#94A3B8'}, transparent 60%)` }} />
                            <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-md flex items-center justify-center"
                              style={{ background: meta?.accent || '#94A3B8' }}>
                              <span className="text-white text-[10px] font-bold">N</span>
                            </div>
                            <div className="relative z-10">
                              <div className="h-1.5 w-16 rounded-full mb-1 opacity-50"
                                style={{ background: meta?.accent || '#94A3B8' }} />
                              <div className="h-2 w-20 rounded-full opacity-70"
                                style={{ background: meta?.accent || '#94A3B8' }} />
                            </div>
                          </div>
                          <div className="px-3 pb-3 flex flex-col flex-1">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                style={{ background: meta?.bg || '#F1F5F9', color: meta?.color || '#475569' }}>
                                {meta?.name || '심플'}
                              </span>
                              <span className="text-[10px] text-slate-400">{prompt.design?.type}</span>
                            </div>
                            <h3 className="text-slate-800 font-semibold text-xs mb-1 leading-snug">{prompt.title}</h3>
                            <p className="text-slate-400 text-[10px] flex-1 mb-2.5 leading-relaxed line-clamp-2">{prompt.description}</p>
                            <div className="flex gap-1.5">
                              <button
                                onClick={async () => {
                                  try {
                                    const formatNote = nlmFormat === '발표자 슬라이드'
                                      ? '\n[출력 형식] 발표자 슬라이드용: 각 슬라이드 텍스트 최소화, 시각 요소와 핵심 키워드 중심으로 구성해.'
                                      : '\n[출력 형식] 자세한 자료용: 세부 설명과 데이터를 충분히 포함해 단독으로 읽어도 이해되게 만들어 줘.'
                                    const lengthNote = nlmLength === '짧게'
                                      ? '\n[분량] 슬라이드 수를 최소화하고 각 슬라이드는 간결하게.'
                                      : ''
                                    await navigator.clipboard.writeText(prompt.promptText + formatNote + lengthNote)
                                    setNlmCopiedId(prompt.id)
                                    setTimeout(() => setNlmCopiedId(null), 2000)
                                  } catch { alert('복사 실패') }
                                }}
                                className="flex-1 py-2 rounded-lg text-[11px] font-semibold text-white transition-all"
                                style={{ backgroundColor: copied ? '#10B981' : (meta?.color || '#1A73E8') }}>
                                {copied ? '✓ 복사됨' : '복사'}
                              </button>
                              <button
                                onClick={() => setNlmPreviewPrompt(prompt)}
                                className="px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                                title="프롬프트 미리보기">
                                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-400">
                    <div className="text-3xl mb-2">🔍</div>
                    <p className="text-sm">검색 결과가 없습니다</p>
                  </div>
                )}
              </>
            )}
          </main>
        </>
      )}

      {/* ── 실습2 ─────────────────────────────────── */}
      {activeSection === 'session2' && (
        <Session2View prompts={session2Prompts} meta={session2CategoryMeta} />
      )}

      {/* ── 푸터 ── */}
      <footer className="border-t border-slate-100 mt-12 py-6 text-center bg-white">
        <p className="text-xs text-slate-400">대웅제약 ETC 로컬본부 AI 중급반 실습 워크북 · Powered by Genspark & NotebookLM</p>
      </footer>

      {/* ── 모달 ── */}
      {selectedPrompt && (
        selectedPrompt.version === 'v2'
          ? <TwoStepModal
              prompt={selectedPrompt}
              categoryColor={categoryMeta[selectedPrompt.category].color}
              categoryName={categoryMeta[selectedPrompt.category].name}
              selectedFont={selectedFont}
              onClose={() => setSelectedPrompt(null)}
            />
          : <LegacyModal
              prompt={selectedPrompt}
              slideCount={slideCount}
              setSlideCount={setSlideCount}
              userContent={userContent}
              setUserContent={setUserContent}
              selectedFont={selectedFont}
              modalCopied={modalCopied}
              onCopy={handleModalCopy}
              onClose={() => setSelectedPrompt(null)}
              categoryMeta={categoryMeta}
            />
      )}

      {fontDropdownOpen && (
        <div className="fixed inset-0 z-20" onClick={() => setFontDropdownOpen(false)} />
      )}

      {/* ── NotebookLM 프롬프트 미리보기 모달 ── */}
      {nlmPreviewPrompt && (
        <NlmPreviewModal
          prompt={nlmPreviewPrompt}
          nlmFormat={nlmFormat}
          nlmLength={nlmLength}
          onClose={() => setNlmPreviewPrompt(null)}
        />
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// Legacy 모달 — V1용
// ══════════════════════════════════════════════════════════════
function LegacyModal({ prompt, slideCount, setSlideCount, userContent, setUserContent, selectedFont, modalCopied, onCopy, onClose, categoryMeta }) {
  const accentColor = categoryMeta[prompt.category].color
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1 inline-block"
              style={{ background: accentColor + '15', color: accentColor }}>
              {categoryMeta[prompt.category].name}
            </span>
            <h2 className="text-slate-800 font-bold text-base leading-tight">{prompt.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 ml-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* 슬라이드 장수 */}
          <div className="px-5 pt-4 pb-3 border-b border-slate-50">
            <p className="text-xs font-semibold text-slate-600 mb-2">슬라이드 장수
              <span className="font-normal text-slate-400 ml-1">(기본 {prompt.slides}장)</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SLIDE_OPTIONS.map(n => (
                <button key={n} onClick={() => setSlideCount(n)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    slideCount === n
                      ? 'text-white border-transparent'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                  }`}
                  style={slideCount === n ? { backgroundColor: accentColor } : {}}>
                  {n}장{n === prompt.slides && <span className="opacity-60 ml-0.5 font-normal">(원본)</span>}
                </button>
              ))}
            </div>
          </div>

          {/* 내 자료 */}
          <div className="px-5 pt-4 pb-4">
            <p className="text-xs font-semibold text-slate-600 mb-2">내 자료 붙여넣기
              <span className="font-normal text-slate-400 ml-1">— ChatGPT/NotebookLM 요약본</span>
            </p>
            <textarea value={userContent} onChange={e => setUserContent(e.target.value)}
              placeholder="여기에 내 자료를 붙여넣으세요.&#10;(논문 요약, 거래처 정보, 제품 데이터 등)"
              className="w-full h-36 px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none text-xs text-slate-700 resize-none leading-relaxed placeholder-slate-300 bg-slate-50" />
            {userContent.trim() && (
              <p className="mt-1.5 text-[11px] text-green-600 font-medium">✓ 자료 입력 완료 — 복사 시 프롬프트에 자동으로 합쳐집니다</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
          <p className="text-[11px] text-slate-400">{slideCount}장 · {selectedFont}</p>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-3 py-2 text-xs text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50">닫기</button>
            <button onClick={onCopy}
              className="px-4 py-2 text-xs font-bold rounded-lg text-white transition-all"
              style={{ backgroundColor: modalCopied ? '#10B981' : accentColor }}>
              {modalCopied ? '✓ 복사 완료! 젠스파크에 붙여넣기' : '젠스파크로 복사'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// TwoStep 모달 — V2용 (Step1 + Step2 탭)
// ══════════════════════════════════════════════════════════════
function TwoStepModal({ prompt, categoryColor, categoryName, selectedFont, onClose }) {
  const [activeStep, setActiveStep] = useState(1)
  const [step1Copied, setStep1Copied] = useState(false)
  const [step2Copied, setStep2Copied] = useState(false)
  const [step1Output, setStep1Output] = useState('')

  const scenario = scenarios.find(s => s.id === prompt.id)
  if (!scenario) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
        <div className="bg-white rounded-xl p-5 max-w-sm" onClick={e => e.stopPropagation()}>
          <p className="text-sm text-slate-600">V2 시나리오 데이터를 찾을 수 없습니다.</p>
          <button onClick={onClose} className="mt-3 px-4 py-2 bg-slate-100 rounded-lg text-xs">닫기</button>
        </div>
      </div>
    )
  }

  const preset = designPresets[scenario.preset]
  const step1Text = buildStep1Prompt(scenario)
  const step2TextRaw = buildStep2Prompt(scenario)
  // 폰트를 Step2 프롬프트에 삽입
  const step2TextWithFont = step2TextRaw.replace('한국어 폰트: Pretendard 또는 Noto Sans KR', `한국어 폰트: ${selectedFont}`)
  const step2Text = step1Output.trim()
    ? step2TextWithFont.replace('[여기에 Step 1 원고 붙여넣기]', step1Output.trim())
    : step2TextWithFont

  const copy = async (text, setCopied) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch { alert('복사 실패') }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex-shrink-0">2단계</span>
            <div className="min-w-0">
              <p className="text-[10px] text-slate-400">{categoryName} · {scenario.slides.length}장 · {preset.name}</p>
              <h2 className="text-slate-800 font-bold text-sm leading-tight truncate">{prompt.title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 flex-shrink-0 ml-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step 탭 */}
        <div className="flex border-b border-slate-100">
          {[
            { n: 1, label: 'Step 1', sub: 'ChatGPT / Claude 원고 정제' },
            { n: 2, label: 'Step 2', sub: 'Genspark 디자인 렌더링' },
          ].map(t => (
            <button key={t.n} onClick={() => setActiveStep(t.n)}
              className={`flex-1 flex items-center gap-2 px-5 py-3 border-b-2 transition-all ${
                activeStep === t.n ? 'border-blue-600 bg-blue-50/50' : 'border-transparent hover:bg-slate-50'
              }`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                activeStep === t.n ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>{t.n}</span>
              <div className="text-left">
                <div className={`text-xs font-semibold ${activeStep === t.n ? 'text-blue-600' : 'text-slate-600'}`}>{t.label}: {t.sub}</div>
              </div>
            </button>
          ))}
        </div>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto">

          {/* Step 1 */}
          {activeStep === 1 && (
            <div className="p-5 space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 leading-relaxed">
                <strong>사용법:</strong> 아래 프롬프트 복사 → ChatGPT/Claude에 붙여넣기 →
                <span className="bg-amber-200 px-1 rounded mx-1">[여기에 내 자료를 붙여넣으세요]</span>
                자리에 내 자료 넣기 → AI 원고 받기 → Step 2 탭으로 이동
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium">Step 1 프롬프트 — ChatGPT / Claude / NotebookLM</span>
                  <button onClick={() => copy(step1Text, setStep1Copied)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white transition-colors ${step1Copied ? 'bg-green-500' : 'bg-blue-600'}`}>
                    {step1Copied ? '✓ 복사됨' : '복사'}
                  </button>
                </div>
                <pre className="px-4 py-3 text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed font-mono max-h-80 overflow-y-auto bg-white">
                  {step1Text}
                </pre>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Step 1 결과 저장 <span className="font-normal text-slate-400">— 붙여넣으면 Step 2에 자동 삽입</span>
                </label>
                <textarea value={step1Output} onChange={e => setStep1Output(e.target.value)}
                  placeholder="ChatGPT/Claude에서 받은 정제 원고를 여기에 붙여넣으세요 (선택)"
                  className="w-full h-28 px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none text-[11px] text-slate-700 resize-none leading-relaxed placeholder-slate-300 bg-slate-50" />
                {step1Output.trim() && (
                  <p className="mt-1 text-[11px] text-green-600 font-medium">✓ 저장됨 — Step 2 탭의 프롬프트에 자동 삽입됩니다</p>
                )}
              </div>

              <button onClick={() => setActiveStep(2)}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors">
                Step 2로 이동 →
              </button>
            </div>
          )}

          {/* Step 2 */}
          {activeStep === 2 && (
            <div className="p-5 space-y-4">
              {/* 디자인 미리보기 */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-lg flex-shrink-0"
                  style={{ background: preset.colors.bg, border: `2px solid ${preset.colors.accent}` }} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-700">{preset.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{preset.mood} · 폰트: {selectedFont}</p>
                </div>
                <div className="flex gap-1 ml-auto">
                  {Object.values(preset.colors).slice(0, 5).map((v, i) => (
                    <div key={i} className="w-4 h-4 rounded-sm border border-white/50" style={{ background: v }} />
                  ))}
                </div>
              </div>

              {step1Output.trim() ? (
                <div className="flex items-center gap-1.5 text-[11px] text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Step 1 원고 자동 삽입됨 — 아래 프롬프트를 그대로 젠스파크에 붙여넣으세요
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  Step 1 결과가 없습니다 — 복사 후
                  <span className="bg-amber-200 px-1 rounded">[여기에 Step 1 원고 붙여넣기]</span>
                  자리에 직접 붙여넣어도 됩니다
                </div>
              )}

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Step 2 프롬프트 — Genspark
                    {step1Output.trim() && <span className="text-green-600 ml-1.5">+ 원고 포함</span>}
                  </span>
                  <button onClick={() => copy(step2Text, setStep2Copied)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white transition-colors"
                    style={{ backgroundColor: step2Copied ? '#10B981' : categoryColor }}>
                    {step2Copied ? '✓ 복사됨' : '젠스파크로 복사'}
                  </button>
                </div>
                <pre className="px-4 py-3 text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed font-mono max-h-80 overflow-y-auto bg-white">
                  {step2Text}
                </pre>
              </div>

              <button onClick={() => setActiveStep(1)}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-200 transition-colors">
                ← Step 1로 돌아가기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// 실습2 — 바이브코딩 뷰
// ══════════════════════════════════════════════════════════════
const STEPS_DETAIL = [
  {
    n: 1,
    title: '구글 시트 준비',
    shortDesc: '강사 제공 Excel 파일을 구글 스프레드시트로 변환합니다.',
    color: '#7C3AED',
    detail: [
      {
        step: '① 실습 데이터 파일 다운로드',
        desc: '아래 버튼을 클릭해서 실습 데이터 파일을 다운로드하세요.',
        downloadLink: 'https://docs.google.com/spreadsheets/d/1imzIcjPObm2U7qJr3ext_AOGm2NDg-jR/edit?usp=drive_link&ouid=109854486906703700047&rtpof=true&sd=true',
      },
      {
        step: '② Google Drive 열기',
        desc: 'drive.google.com 접속 → 로그인',
      },
      {
        step: '③ Excel 파일 업로드',
        desc: '내 드라이브 → 새로 만들기 → 파일 업로드 → 다운로드한 「대웅제약 실습 데이터.xlsx」 선택',
      },
      {
        step: '④ 구글 스프레드시트로 열기',
        desc: '업로드된 파일 우클릭 → 연결 앱 → Google Sheets 클릭',
      },
      {
        step: '④-1 반드시! Google Sheets 형식으로 저장',
        desc: '파일이 열리면 상단 메뉴 「파일」→ 「Google Sheets로 저장」 클릭 → 새 탭에 구글 시트 파일이 생성됨',
        warning: true,
        warningMsg: '이 단계를 건너뛰면 「확장 프로그램」 메뉴가 보이지 않아 Apps Script를 사용할 수 없습니다!',
      },
      {
        step: '⑤ 시트명 반드시 확인!',
        desc: '하단 탭에서 아래 3개 시트명이 정확한지 확인하세요.',
        warning: true,
        sheetNames: ['조직도및MR', '고객마스터', '활동로그'],
      },
      {
        step: '⑥ 스프레드시트 ID 복사',
        desc: '주소창의 URL에서 ID 부분을 복사해 메모장에 저장해두세요.',
        urlExample: 'https://docs.google.com/spreadsheets/d/【여기가 ID입니다】/edit',
      },
    ],
  },
  {
    n: 2,
    title: 'Claude에 프롬프트 붙여넣기',
    shortDesc: '아래 카드의 프롬프트를 복사 → claude.ai에 붙여넣기합니다.',
    color: '#7C3AED',
    detail: [
      { step: '① claude.ai 접속 후 로그인', desc: 'claude.ai → 로그인 (Google 계정 사용 가능)' },
      { step: '② 아래 카드에서 프롬프트 복사', desc: '만들고 싶은 툴의 카드에서 「Claude에 복사」 버튼 클릭' },
      { step: '③ Claude 채팅창에 붙여넣기', desc: 'Ctrl+V → 전송 (생성까지 1~2분 소요)' },
      { step: '④ 코드 블록 전체 복사', desc: '```javascript ... ``` 코드 블록 우측 상단 복사 버튼 클릭' },
    ],
  },
  {
    n: 3,
    title: '스프레드시트 ID 넣기',
    shortDesc: '코드 첫 줄 SPREADSHEET_ID에 1단계에서 복사한 ID를 붙여넣습니다.',
    color: '#7C3AED',
    detail: [
      { step: 'Claude 코드 최상단에서 찾기', desc: "const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';" },
      { step: 'ID 교체', desc: "YOUR_SPREADSHEET_ID_HERE 부분을 삭제하고 1단계에서 복사한 내 시트 ID를 붙여넣기", code: "const SPREADSHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms';" },
    ],
  },
  {
    n: 4,
    title: 'Apps Script에 코드 붙여넣기',
    shortDesc: '구글 시트에서 Apps Script 편집기를 열고 코드를 붙여넣습니다.',
    color: '#7C3AED',
    detail: [
      { step: '① 구글 시트 상단 메뉴', desc: '확장 프로그램 → Apps Script 클릭 → 새 탭으로 편집기 열림' },
      { step: '② 기존 코드 전체 삭제', desc: '편집기의 function myFunction() {...} 전체를 Ctrl+A → Delete로 삭제' },
      { step: '③ 복사한 코드 붙여넣기', desc: 'Ctrl+V → 저장(💾 아이콘 또는 Ctrl+S)' },
    ],
  },
  {
    n: 5,
    title: '웹앱 배포 & URL 공유',
    shortDesc: '배포하면 PC·모바일 어디서든 접속 가능한 URL이 생성됩니다.',
    color: '#7C3AED',
    detail: [
      { step: '① 배포 버튼 클릭', desc: 'Apps Script 편집기 우측 상단 「배포」 → 「새 배포」 클릭' },
      { step: '② 배포 유형 설정', desc: '유형: 웹 앱 선택 → 설명: 아무거나 입력 → 액세스 권한: 「모든 사용자」 선택' },
      { step: '③ 배포 완료 & URL 복사', desc: '「배포」 클릭 → 권한 허용 → 웹 앱 URL 복사 → 브라우저에서 열어 확인' },
    ],
  },
]

function StepGuide() {
  const [openStep, setOpenStep] = useState(1)
  return (
    <div className="mb-6 bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">실습 단계별 상세 가이드</span>
        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">클릭하면 상세 안내 펼쳐집니다</span>
      </div>
      {STEPS_DETAIL.map((s, i) => (
        <div key={s.n} className={`border-b border-slate-100 last:border-0 ${openStep === s.n ? 'bg-violet-50/40' : ''}`}>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
            onClick={() => setOpenStep(openStep === s.n ? null : s.n)}>
            <span className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0">{s.n}</span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-slate-800">{s.title}</span>
              <span className="text-[11px] text-slate-400 ml-2 hidden sm:inline">{s.shortDesc}</span>
            </div>
            <svg className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${openStep === s.n ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openStep === s.n && (
            <div className="px-4 pb-4 space-y-3">
              {s.detail.map((d, di) => (
                <div key={di} className={`rounded-lg p-3 ${d.warning ? 'bg-red-50 border border-red-200' : 'bg-white border border-slate-200'}`}>
                  <div className="flex items-start gap-2 mb-1">
                    <span className={`text-xs font-bold flex-shrink-0 ${d.warning ? 'text-red-700' : 'text-violet-700'}`}>{d.step}</span>
                    {d.warning && <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded flex-shrink-0">중요</span>}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{d.desc}</p>
                  {d.warningMsg && (
                    <div className="mt-2 flex items-start gap-1.5 bg-red-100 border border-red-300 rounded-lg px-3 py-2">
                      <span className="text-red-500 text-sm flex-shrink-0">⚠</span>
                      <p className="text-[11px] text-red-700 font-semibold leading-relaxed">{d.warningMsg}</p>
                    </div>
                  )}
                  {d.downloadLink && (
                    <div className="mt-2">
                      <a href={d.downloadLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-lg transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        실습 데이터 파일 다운로드
                      </a>
                      <p className="text-[10px] text-slate-400 mt-1">대웅제약 실습 데이터.xlsx (Google Drive)</p>
                    </div>
                  )}
                  {d.sheetNames && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {d.sheetNames.map(name => (
                        <span key={name} className="text-xs font-bold px-3 py-1 bg-red-100 text-red-700 rounded-lg border border-red-300 font-mono">{name}</span>
                      ))}
                      <p className="w-full text-[10px] text-red-600 mt-1">⚠ 시트명이 다르면 코드가 작동하지 않습니다. 띄어쓰기·대소문자까지 정확히 일치해야 합니다.</p>
                    </div>
                  )}
                  {d.urlExample && (
                    <div className="mt-2 bg-slate-100 rounded px-2 py-1.5">
                      <p className="text-[10px] font-mono text-slate-500 break-all">{d.urlExample}</p>
                    </div>
                  )}
                  {d.code && (
                    <div className="mt-2 bg-slate-900 rounded px-3 py-2">
                      <p className="text-[11px] font-mono text-green-400 break-all">{d.code}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function Session2View({ prompts, meta }) {
  const [selected, setSelected] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [completeCodeCopied, setCompleteCodeCopied] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(false)

  const handleCopy = async (e, prompt) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(prompt.promptText)
      setCopiedId(prompt.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch { alert('복사 실패') }
  }

  const [completeCodeCopied202, setCompleteCodeCopied202] = useState(false)
  const [loadingComplete202, setLoadingComplete202] = useState(false)

  const handleCopyCompleteCode = async (e) => {
    e.stopPropagation()
    setLoadingComplete(true)
    try {
      const res = await fetch('/dashboard-complete.gs.txt')
      const code = await res.text()
      await navigator.clipboard.writeText(code)
      setCompleteCodeCopied(true)
      setTimeout(() => setCompleteCodeCopied(false), 3000)
    } catch { alert('복사 실패. 잠시 후 다시 시도해주세요.') }
    finally { setLoadingComplete(false) }
  }

  const handleCopyCompleteCode202 = async (e) => {
    e.stopPropagation()
    setLoadingComplete202(true)
    try {
      const res = await fetch('/mr-dashboard-complete.gs.txt')
      const code = await res.text()
      await navigator.clipboard.writeText(code)
      setCompleteCodeCopied202(true)
      setTimeout(() => setCompleteCodeCopied202(false), 3000)
    } catch { alert('복사 실패. 잠시 후 다시 시도해주세요.') }
    finally { setLoadingComplete202(false) }
  }

  return (
    <>
      <main className="max-w-6xl mx-auto px-5 py-6">
        {/* 안내 배너 */}
        <div className="mb-6 p-4 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 rounded-xl flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0 text-sm">⚡</div>
          <div>
            <h2 className="font-semibold text-violet-800 text-sm mb-1">바이브코딩 — 코드 한 줄 없이 업무 자동화 툴 만들기</h2>
            <p className="text-xs text-violet-600 leading-relaxed">
              Claude에게 말로 요청하면 Google Apps Script 코드가 완성됩니다. 복사 → 붙여넣기만 하면 
              <strong> 실제로 작동하는 웹 대시보드</strong>가 만들어집니다.
            </p>
          </div>
        </div>

        {/* 단계별 상세 가이드 */}
        <StepGuide />

        {/* 3종 툴 비교 안내 */}
        <div className="mb-5 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-600">📌 실습 툴 3종 — 각각 무엇을 만드나요?</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {[
              {
                color: '#2563EB', icon: '🖥️', label: '소장용 대시보드',
                result: '웹 URL (브라우저 페이지)',
                how: '배포 후 URL을 북마크에 저장',
                detail: '전체 MR 성과 · 파이프라인 · 방문 지연을 한 화면에서 확인',
                run: 'doGet() → 웹앱 배포',
              },
              {
                color: '#059669', icon: '📱', label: 'MR 대시보드',
                result: '웹 URL (모바일에서도 접속 가능)',
                how: '배포 후 URL을 북마크에 저장',
                detail: '본인 담당 거래처 · D-Day 알림 · 활동 이력을 개인 화면에서 확인',
                run: 'doGet() → 웹앱 배포',
              },
              {
                color: '#D97706', icon: '📧', label: '자동 보고서',
                result: '매주 금요일 자동 이메일 발송',
                how: '배포 없음 — 트리거(스케줄) 설정',
                detail: '이번 주 활동 집계 · 방문 지연 · 다음 주 예정을 이메일로 자동 전송',
                run: 'sendWeeklyReport() → 트리거 설정',
              },
            ].map((item, i) => (
              <div key={i} className="px-4 py-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-xs font-bold" style={{ color: item.color }}>{item.label}</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 w-10 flex-shrink-0 mt-0.5">결과물</span>
                    <span className="text-[11px] text-slate-700 font-semibold">{item.result}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 w-10 flex-shrink-0 mt-0.5">용도</span>
                    <span className="text-[11px] text-slate-500 leading-relaxed">{item.detail}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 w-10 flex-shrink-0 mt-0.5">실행</span>
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded text-white text-[10px]" style={{ backgroundColor: item.color }}>{item.run}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 트리거 설정 안내 */}
          <div className="mx-4 mb-4 mt-1 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-[11px] font-bold text-amber-800 mb-2">⏰ 자동 보고서 — 트리거 설정 방법 (배포 대신 이걸 해야 합니다)</p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-1.5">
              {[
                '① Apps Script 코드 붙여넣기 후 저장',
                '② 왼쪽 메뉴 ⏱ 트리거 아이콘 클릭',
                '③ 우측 하단 「+ 트리거 추가」 클릭',
                '④ 함수: sendWeeklyReport / 시간 기반 / 주간 타이머 / 금요일 / 오후 5~6시 선택',
                '⑤ 저장 → 권한 허용 → 완료!',
              ].map((step, si) => (
                <div key={si} className="flex items-start gap-1.5 bg-white border border-amber-100 rounded-lg px-2.5 py-2">
                  <span className="text-amber-600 font-bold text-[10px] flex-shrink-0 mt-0.5">{si + 1}</span>
                  <span className="text-[10px] text-slate-600 leading-relaxed">{step.substring(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2.5 bg-white border border-amber-200 rounded-lg">
              <p className="text-[11px] font-bold text-slate-700 mb-1.5">❓ 기존 MR 코드에 추가하는 건가요?</p>
              <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                <strong className="text-red-600">아닙니다.</strong> 세 가지 툴은 각각 <strong>별도의 새 Apps Script 파일</strong>입니다. 같은 스프레드시트에서 「확장 프로그램 → Apps Script」를 열어 <strong>기존 코드를 모두 지우고</strong> 새 코드를 붙여넣으면 됩니다.
              </p>
              <div className="bg-slate-900 rounded-lg px-3 py-2 font-mono text-[10px] text-green-400 leading-relaxed">
                <div className="text-slate-400 mb-1">// 구글 스프레드시트 (데이터는 하나)</div>
                <div>├── Apps Script ① → 소장용 대시보드 (웹 URL)</div>
                <div>├── Apps Script ② → MR 대시보드 (웹 URL)</div>
                <div className="text-yellow-400">└── Apps Script ③ → 자동 보고서 (이메일) ← 새로 만들기</div>
              </div>
            </div>
          </div>
        </div>

        {/* 프롬프트 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {prompts.map(prompt => {
            const m = meta[prompt.category]
            const copied = copiedId === prompt.id
            return (
              <div key={prompt.id}
                className="bg-white rounded-xl border border-slate-100 overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                onClick={() => setSelected(prompt)}>
                {/* 컬러 헤더 */}
                <div className="h-24 flex flex-col items-center justify-center gap-1.5 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${m?.color}22, ${m?.color}10)` }}>
                  <div className="absolute inset-0 opacity-10"
                    style={{ background: `radial-gradient(circle at 80% 20%, ${m?.color}, transparent 60%)` }} />
                  <span className="text-3xl relative z-10">{m?.icon}</span>
                  <div className="flex items-center gap-1.5 relative z-10">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: m?.color }}>{m?.name}</span>
                    <span className="text-[10px] text-slate-500 bg-white/80 px-2 py-0.5 rounded-full">
                      {prompt.time}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-slate-800 font-bold text-sm mb-1.5">{prompt.title}</h3>
                  <p className="text-slate-500 text-[11px] flex-1 mb-3 leading-relaxed">{prompt.description}</p>

                  {/* 기능 태그 */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {prompt.category === 'manager' && ['MR별 비교', '단계 파이프라인', '지연 알림', '검색/필터'].map(t => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-medium">{t}</span>
                    ))}
                    {prompt.category === 'mr' && ['D-Day 알림', '활동 이력', '단계별 현황', '모바일 지원'].map(t => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 bg-green-50 text-green-600 rounded font-medium">{t}</span>
                    ))}
                    {prompt.category === 'report' && ['자동 이메일', '주간 집계', '트리거 설정', '15분 완성'].map(t => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded font-medium">{t}</span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-1.5">
                      <button onClick={e => handleCopy(e, prompt)}
                        className="flex-1 py-2 rounded-lg text-xs font-semibold text-white transition-all"
                        style={{ backgroundColor: copied ? '#10B981' : m?.color }}>
                        {copied ? '✓ 복사됨' : 'Claude에 복사'}
                      </button>
                      <button onClick={e => { e.stopPropagation(); setSelected(prompt) }}
                        className="px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                        title="상세 보기">
                        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                    {prompt.id === 201 && (
                      <button onClick={handleCopyCompleteCode}
                        disabled={loadingComplete}
                        className="w-full py-2 rounded-lg text-xs font-semibold border-2 transition-all flex items-center justify-center gap-1.5"
                        style={{
                          borderColor: completeCodeCopied ? '#10B981' : '#f59e0b',
                          color: completeCodeCopied ? '#10B981' : '#92400e',
                          backgroundColor: completeCodeCopied ? '#f0fdf4' : '#fffbeb',
                        }}>
                        {loadingComplete ? (
                          <span>로딩 중...</span>
                        ) : completeCodeCopied ? (
                          <><span>✓</span><span>완성 코드 복사됨!</span></>
                        ) : (
                          <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg><span>완성 코드 바로 복사</span><span className="text-[9px] opacity-70">(Claude 없이 바로 사용)</span></>
                        )}
                      </button>
                    )}
                    {prompt.id === 202 && (
                      <button onClick={handleCopyCompleteCode202}
                        disabled={loadingComplete202}
                        className="w-full py-2 rounded-lg text-xs font-semibold border-2 transition-all flex items-center justify-center gap-1.5"
                        style={{
                          borderColor: completeCodeCopied202 ? '#10B981' : '#f59e0b',
                          color: completeCodeCopied202 ? '#10B981' : '#92400e',
                          backgroundColor: completeCodeCopied202 ? '#f0fdf4' : '#fffbeb',
                        }}>
                        {loadingComplete202 ? (
                          <span>로딩 중...</span>
                        ) : completeCodeCopied202 ? (
                          <><span>✓</span><span>완성 코드 복사됨!</span></>
                        ) : (
                          <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg><span>완성 코드 바로 복사</span><span className="text-[9px] opacity-70">(Claude 없이 바로 사용)</span></>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* 준비물 안내 */}
        <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <p className="text-xs font-semibold text-slate-600 mb-3">준비물 체크리스트</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
              <span className="text-base">📧</span>
              <div>
                <div className="text-xs font-medium text-slate-700">Google 계정</div>
                <div className="text-[10px] text-slate-400">필수</div>
              </div>
            </div>
            <a href="https://docs.google.com/spreadsheets/d/1imzIcjPObm2U7qJr3ext_AOGm2NDg-jR/edit?usp=drive_link&ouid=109854486906703700047&rtpof=true&sd=true"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-violet-50 border border-violet-300 rounded-lg px-3 py-2 hover:bg-violet-100 transition-colors cursor-pointer">
              <span className="text-base">📊</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-violet-700 flex items-center gap-1">
                  실습 데이터 시트
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div className="text-[10px] text-violet-500">클릭하여 다운로드</div>
              </div>
            </a>
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
              <span className="text-base">🤖</span>
              <div>
                <div className="text-xs font-medium text-slate-700">Claude 계정</div>
                <div className="text-[10px] text-slate-400">claude.ai 접속</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
              <span className="text-base">💻</span>
              <div>
                <div className="text-xs font-medium text-slate-700">인터넷 브라우저</div>
                <div className="text-[10px] text-slate-400">Chrome 권장</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 상세 보기 모달 */}
      {selected && (
        <Session2Modal prompt={selected} meta={meta[selected.category]} onClose={() => setSelected(null)} />
      )}
    </>
  )
}

function Session2Modal({ prompt, meta, onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.promptText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch { alert('복사 실패') }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{meta?.icon}</span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: meta?.color }}>{meta?.name}</span>
                <span className="text-[10px] text-slate-400">{prompt.time} 소요</span>
              </div>
              <h2 className="text-slate-800 font-bold text-sm">{prompt.title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 단계별 사용법 */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {STEPS_DETAIL.map((s, i) => (
              <div key={s.n} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: meta?.color }}>{s.n}</span>
                <div>
                  <span className="font-semibold">{s.title}</span>
                  <span className="text-slate-400 ml-1 hidden sm:inline">— {s.shortDesc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 프롬프트 본문 */}
        <div className="flex-1 overflow-y-auto">
          <pre className="px-5 py-4 text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed font-mono">
            {prompt.promptText}
          </pre>
        </div>

        {/* 하단 */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
          <p className="text-[11px] text-slate-400 hidden sm:block">
            복사 → <a href="https://claude.ai" target="_blank" rel="noreferrer" className="text-violet-600 underline font-medium">claude.ai</a>에 붙여넣기
          </p>
          <div className="flex gap-2 ml-auto">
            <button onClick={onClose} className="px-3 py-2 text-xs text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50">닫기</button>
            <button onClick={handleCopy}
              className="px-4 py-2 text-xs font-bold rounded-lg text-white transition-all"
              style={{ backgroundColor: copied ? '#10B981' : meta?.color }}>
              {copied ? '✓ 복사 완료!' : '📋 Claude에 복사'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// NotebookLM 프롬프트 미리보기 모달
// ══════════════════════════════════════════════════════════════
function NlmPreviewModal({ prompt, nlmFormat, nlmLength, onClose }) {
  const [copied, setCopied] = useState(false)

  const formatNote = nlmFormat === '발표자 슬라이드'
    ? '\n[출력 형식] 발표자 슬라이드용: 각 슬라이드 텍스트 최소화, 시각 요소와 핵심 키워드 중심으로 구성해.'
    : '\n[출력 형식] 자세한 자료용: 세부 설명과 데이터를 충분히 포함해 단독으로 읽어도 이해되게 만들어 줘.'
  const lengthNote = nlmLength === '짧게'
    ? '\n[분량] 슬라이드 수를 최소화하고 각 슬라이드는 간결하게.'
    : ''
  const fullText = prompt.promptText + formatNote + lengthNote

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch { alert('복사 실패') }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[88vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="min-w-0">
            <p className="text-[10px] text-slate-400 mb-0.5">NotebookLM 프롬프트 미리보기</p>
            <h2 className="text-slate-800 font-bold text-sm leading-tight truncate">{prompt.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 flex-shrink-0 ml-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 설정 현황 */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex-wrap">
          <span className="text-[10px] text-slate-500">현재 설정:</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{nlmFormat}</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">{nlmLength}</span>
          <span className="text-[10px] text-slate-400">— 복사 시 자동 반영</span>
        </div>

        {/* 프롬프트 본문 */}
        <div className="flex-1 overflow-y-auto">
          <pre className="px-5 py-4 text-xs text-slate-700 whitespace-pre-wrap leading-relaxed font-mono">
            {fullText}
          </pre>
        </div>

        {/* 하단 */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 gap-3">
          <p className="text-[11px] text-slate-400 hidden sm:block">
            NotebookLM <strong>&quot;만들려는 슬라이드 자료에 대한 설명&quot;</strong> 칸에 붙여넣기
          </p>
          <div className="flex gap-2 flex-shrink-0 ml-auto">
            <button onClick={onClose}
              className="px-3 py-2 text-xs text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50">
              닫기
            </button>
            <button onClick={handleCopy}
              className="px-4 py-2 text-xs font-bold rounded-lg text-white transition-all"
              style={{ backgroundColor: copied ? '#10B981' : '#1A73E8' }}>
              {copied ? '✓ 복사 완료!' : '📋 복사하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

