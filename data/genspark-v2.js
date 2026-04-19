// ════════════════════════════════════════════════════════════════
// 젠스파크 프롬프트 V2 — 순수 디자인 템플릿 전용
// 사용법: buildStep2Prompt(scenario) → Genspark에 붙여넣기
//         내용은 Genspark 내에서 직접 입력
// ════════════════════════════════════════════════════════════════

// ── 디자인 프리셋 10종
export const designPresets = {

  'corporate-blue': {
    name: '코퍼레이트 블루',
    colors: {
      bg: '#FFFFFF', bgAlt: '#F1F5F9',
      text: '#0F172A', textMuted: '#334155', textSub: '#64748B',
      accent: '#1D4ED8', accentSoft: '#DBEAFE',
      box: '#EFF6FF', boxBorder: '#BFDBFE',
    },
    mood: '전문적, 신뢰감, 격식, 정돈된 비즈니스',
    typography: '대제목 56px Bold · 수치 80px ExtraBold · 본문 22px Regular',
    pattern: '화이트 배경 + 블루 헤더바. KPI 카드·비교 박스 중심. 깔끔한 비즈니스 문서 느낌.',
  },

  'navy-gold': {
    name: '딥 네이비 골드',
    colors: {
      bg: '#0F1F3D', bgAlt: '#1A2E5A',
      text: '#FFFFFF', textMuted: '#CBD5E1', textSub: '#94A3B8',
      accent: '#C9A84C', accentSoft: '#E6D199',
      box: '#1A2E5A', boxBorder: '#C9A84C',
    },
    mood: '프리미엄, 권위감, 신뢰, 고급스러움',
    typography: '대제목 64px Heavy · 수치 80px Black · 본문 22px Regular',
    pattern: '다크 네이비 배경 + 골드 포인트. 수치 박스 크게 강조. 고급스럽고 격식 있는 분위기.',
  },

  'clean-medical': {
    name: '클린 메디컬 그린',
    colors: {
      bg: '#FFFFFF', bgAlt: '#F0FDF4',
      text: '#064E3B', textMuted: '#047857', textSub: '#065F46',
      accent: '#059669', accentSoft: '#A7F3D0',
      box: '#ECFDF5', boxBorder: '#6EE7B7',
    },
    mood: '청결함, 임상적 신뢰, 과학적 객관성',
    typography: '대제목 52px Bold · 수치 68px Black · 본문 20px Regular',
    pattern: '화이트 + 에메랄드 그린. 데이터·통계 수치 중심. 학술지·임상 자료 스타일.',
  },

  'impact-dark': {
    name: '임팩트 다크',
    colors: {
      bg: '#09090B', bgAlt: '#1C1C1E',
      text: '#FFFFFF', textMuted: '#D4D4D8', textSub: '#71717A',
      accent: '#06B6D4', accentSoft: '#22D3EE',
      box: '#18181B', boxBorder: '#06B6D4',
    },
    mood: '강렬함, 임팩트, 설득, 현대적',
    typography: '초대형 수치 96px Black · 대제목 60px Bold · 본문 22px Regular',
    pattern: '풀 다크 배경 + 시안 글로우. 대형 숫자 중심. 짧고 강렬한 메시지.',
  },

  'warm-academic': {
    name: '웜 아이보리',
    colors: {
      bg: '#FFFBF0', bgAlt: '#FEF3C7',
      text: '#1C1917', textMuted: '#292524', textSub: '#78716C',
      accent: '#92400E', accentSoft: '#FDE68A',
      box: '#FFFFFF', boxBorder: '#D6D3D1',
    },
    mood: '학술적 권위, 따뜻함, 격식, 고전적',
    typography: '대제목 48px Bold · 본문 20px Regular · 캡션 14px',
    pattern: '크림 아이보리 배경 + 브라운 포인트. 학술·논문 스타일. 데이터 근거 중심.',
  },

  'energetic-coral': {
    name: '에너제틱 코랄',
    colors: {
      bg: '#FFF7ED', bgAlt: '#FFEDD5',
      text: '#7C2D12', textMuted: '#9A3412', textSub: '#C2410C',
      accent: '#EA580C', accentSoft: '#FED7AA',
      box: '#FFFFFF', boxBorder: '#FDBA74',
    },
    mood: '따뜻함, 친밀감, 에너지, 희망',
    typography: '대제목 56px Bold · 본문 22px Regular',
    pattern: '따뜻한 오렌지-코랄 톤. 둥근 카드와 친근한 아이콘. 감성적이고 활기찬 분위기.',
  },

  'royal-purple': {
    name: '로얄 퍼플',
    colors: {
      bg: '#1E1B4B', bgAlt: '#2D2A6E',
      text: '#FFFFFF', textMuted: '#C4B5FD', textSub: '#A78BFA',
      accent: '#7C3AED', accentSoft: '#DDD6FE',
      box: '#2D2A6E', boxBorder: '#7C3AED',
    },
    mood: '고급감, 창의성, 혁신, 프리미엄 다크',
    typography: '대제목 60px Bold · 수치 84px ExtraBold · 본문 22px Regular',
    pattern: '딥 퍼플 배경 + 바이올렛 포인트. 창의적이고 혁신적인 분위기.',
  },

  'minimal-slate': {
    name: '미니멀 슬레이트',
    colors: {
      bg: '#F8FAFC', bgAlt: '#F1F5F9',
      text: '#0F172A', textMuted: '#475569', textSub: '#94A3B8',
      accent: '#475569', accentSoft: '#CBD5E1',
      box: '#FFFFFF', boxBorder: '#E2E8F0',
    },
    mood: '미니멀, 클린, 절제된 세련미, 모던',
    typography: '대제목 52px Medium · 수치 76px Bold · 본문 20px Regular',
    pattern: '연회색 배경 + 다크 슬레이트 포인트. 여백 중심의 미니멀 레이아웃.',
  },

  'fresh-mint': {
    name: '프레쉬 민트',
    colors: {
      bg: '#FFFFFF', bgAlt: '#F0FDFA',
      text: '#134E4A', textMuted: '#0F766E', textSub: '#115E59',
      accent: '#0D9488', accentSoft: '#99F6E4',
      box: '#F0FDFA', boxBorder: '#5EEAD4',
    },
    mood: '신선함, 건강, 청량감, 신뢰',
    typography: '대제목 52px Bold · 수치 72px Black · 본문 20px Regular',
    pattern: '화이트 + 틸 민트 포인트. 신선하고 신뢰감 있는 헬스케어 스타일.',
  },

  'bold-scarlet': {
    name: '볼드 스칼렛',
    colors: {
      bg: '#FFFFFF', bgAlt: '#FFF1F2',
      text: '#0F172A', textMuted: '#BE123C', textSub: '#9F1239',
      accent: '#BE123C', accentSoft: '#FECDD3',
      box: '#FFF1F2', boxBorder: '#FDA4AF',
    },
    mood: '강렬함, 자신감, 긴박감, 임팩트',
    typography: '대제목 56px Bold · 수치 80px ExtraBold · 본문 22px Regular',
    pattern: '화이트 배경 + 딥 레드 포인트. 강렬하고 자신감 있는 임팩트 PT 스타일.',
  },
}

// ── 슬라이드 타입별 레이아웃 스펙
export const slideTypes = {
  cover: {
    name: 'COVER (표지)',
    layout: '중앙 정렬. 브랜드 배지(상단) · 메인 타이틀(대형) · 서브타이틀 · 정보 라인(하단)',
    fields: ['배지(10자)', '메인 타이틀(20자)', '서브 타이틀(40자)', '정보1(30자)', '정보2(30자)'],
  },
  toc: {
    name: 'TABLE OF CONTENTS (목차)',
    layout: '중앙 정렬. 제목 + 번호 매긴 목차 4~6개',
    fields: ['타이틀(10자)', '목차1(20자)', '목차2(20자)', '목차3(20자)', '목차4(20자)', '목차5(20자)', '목차6(20자, 선택)'],
  },
  bullets: {
    name: 'BULLETS (불릿 리스트)',
    layout: '제목 상단 · 불릿 4~6개 · 키포인트 박스 하단(선택)',
    fields: ['타이틀(18자)', '서브타이틀(28자)', '불릿1(22자)', '불릿2(22자)', '불릿3(22자)', '불릿4(22자)', '불릿5(22자, 선택)', '불릿6(22자, 선택)'],
  },
  'stat-3': {
    name: 'STAT BOX ×3 (수치 3개)',
    layout: '제목 상단 · 수치 박스 3개 가로 배열 · 출처 하단',
    fields: ['타이틀(18자)', '서브타이틀(30자)', '수치1(8자)·라벨(12자)·설명(20자)', '수치2·라벨·설명', '수치3·라벨·설명', '출처(20자)'],
  },
  'compare-2': {
    name: 'COMPARE ×2 (좌우 비교)',
    layout: '제목 상단 · 좌우 50:50 비교 박스 · 결론 하단',
    fields: ['타이틀(18자)', '좌측 헤더(10자)', '좌측 불릿1~4(각 22자)', '우측 헤더(10자)', '우측 불릿1~4(각 22자)'],
  },
  'cards-3': {
    name: 'CARDS ×3 (카드 3개)',
    layout: '제목 상단 · 카드 3개 가로 배열. 각 카드: 아이콘+헤더+본문',
    fields: ['타이틀(18자)', '카드1: 아이콘힌트·헤더(14자)·본문(40자)', '카드2: 아이콘힌트·헤더·본문', '카드3: 아이콘힌트·헤더·본문'],
  },
  'process-4': {
    name: 'PROCESS ×4 (4단계)',
    layout: '제목 상단 · 4단계 가로 플로우. 원형 번호 + 이름 + 설명',
    fields: ['타이틀(18자)', '단계1: 이름(8자)·설명(22자)', '단계2: 이름·설명', '단계3: 이름·설명', '단계4: 이름·설명'],
  },
  closing: {
    name: 'CLOSING (마무리)',
    layout: '중앙 정렬. 메인 메시지(대형) · 서브 메시지 · 연락처 블록',
    fields: ['메인 메시지(15자)', '서브 메시지(35자)', '이름(15자)', '연락처(20자)', '이메일(30자)'],
  },
}

// ── 10개 디자인 전용 템플릿 시나리오
export const scenarios = [

  // ── L: 라이트 계열 ──────────────────────────
  {
    id: 1, category: 'L', preset: 'corporate-blue',
    title: '코퍼레이트 블루',
    slides: [
      { type: 'cover',     topic: '표지 슬라이드' },
      { type: 'toc',       topic: '목차' },
      { type: 'bullets',   topic: '핵심 포인트' },
      { type: 'stat-3',    topic: '주요 데이터 수치' },
      { type: 'compare-2', topic: '항목 비교' },
      { type: 'cards-3',   topic: '주요 특징 3가지' },
      { type: 'process-4', topic: '단계별 프로세스' },
      { type: 'closing',   topic: '마무리' },
    ],
  },

  {
    id: 7, category: 'L', preset: 'clean-medical',
    title: '클린 메디컬 그린',
    slides: [
      { type: 'cover',     topic: '표지 슬라이드' },
      { type: 'toc',       topic: '목차' },
      { type: 'bullets',   topic: '핵심 포인트' },
      { type: 'stat-3',    topic: '주요 데이터 수치' },
      { type: 'compare-2', topic: '항목 비교' },
      { type: 'cards-3',   topic: '주요 특징 3가지' },
      { type: 'process-4', topic: '단계별 프로세스' },
      { type: 'closing',   topic: '마무리' },
    ],
  },

  {
    id: 25, category: 'L', preset: 'minimal-slate',
    title: '미니멀 슬레이트',
    slides: [
      { type: 'cover',     topic: '표지 슬라이드' },
      { type: 'toc',       topic: '목차' },
      { type: 'bullets',   topic: '핵심 포인트' },
      { type: 'stat-3',    topic: '주요 데이터 수치' },
      { type: 'compare-2', topic: '항목 비교' },
      { type: 'cards-3',   topic: '주요 특징 3가지' },
      { type: 'process-4', topic: '단계별 프로세스' },
      { type: 'closing',   topic: '마무리' },
    ],
  },

  {
    id: 26, category: 'L', preset: 'fresh-mint',
    title: '프레쉬 민트',
    slides: [
      { type: 'cover',     topic: '표지 슬라이드' },
      { type: 'toc',       topic: '목차' },
      { type: 'bullets',   topic: '핵심 포인트' },
      { type: 'stat-3',    topic: '주요 데이터 수치' },
      { type: 'compare-2', topic: '항목 비교' },
      { type: 'cards-3',   topic: '주요 특징 3가지' },
      { type: 'process-4', topic: '단계별 프로세스' },
      { type: 'closing',   topic: '마무리' },
    ],
  },

  // ── D: 다크 계열 ──────────────────────────
  {
    id: 2, category: 'D', preset: 'navy-gold',
    title: '딥 네이비 골드',
    slides: [
      { type: 'cover',     topic: '표지 슬라이드' },
      { type: 'toc',       topic: '목차' },
      { type: 'bullets',   topic: '핵심 포인트' },
      { type: 'stat-3',    topic: '주요 데이터 수치' },
      { type: 'compare-2', topic: '항목 비교' },
      { type: 'cards-3',   topic: '주요 특징 3가지' },
      { type: 'process-4', topic: '단계별 프로세스' },
      { type: 'closing',   topic: '마무리' },
    ],
  },

  {
    id: 8, category: 'D', preset: 'impact-dark',
    title: '임팩트 다크',
    slides: [
      { type: 'cover',     topic: '표지 슬라이드' },
      { type: 'toc',       topic: '목차' },
      { type: 'bullets',   topic: '핵심 포인트' },
      { type: 'stat-3',    topic: '주요 데이터 수치' },
      { type: 'compare-2', topic: '항목 비교' },
      { type: 'cards-3',   topic: '주요 특징 3가지' },
      { type: 'process-4', topic: '단계별 프로세스' },
      { type: 'closing',   topic: '마무리' },
    ],
  },

  {
    id: 21, category: 'D', preset: 'royal-purple',
    title: '로얄 퍼플',
    slides: [
      { type: 'cover',     topic: '표지 슬라이드' },
      { type: 'toc',       topic: '목차' },
      { type: 'bullets',   topic: '핵심 포인트' },
      { type: 'stat-3',    topic: '주요 데이터 수치' },
      { type: 'compare-2', topic: '항목 비교' },
      { type: 'cards-3',   topic: '주요 특징 3가지' },
      { type: 'process-4', topic: '단계별 프로세스' },
      { type: 'closing',   topic: '마무리' },
    ],
  },

  // ── W: 웜 & 비비드 계열 ──────────────────────────
  {
    id: 12, category: 'W', preset: 'warm-academic',
    title: '웜 아이보리',
    slides: [
      { type: 'cover',     topic: '표지 슬라이드' },
      { type: 'toc',       topic: '목차' },
      { type: 'bullets',   topic: '핵심 포인트' },
      { type: 'stat-3',    topic: '주요 데이터 수치' },
      { type: 'compare-2', topic: '항목 비교' },
      { type: 'cards-3',   topic: '주요 특징 3가지' },
      { type: 'process-4', topic: '단계별 프로세스' },
      { type: 'closing',   topic: '마무리' },
    ],
  },

  {
    id: 17, category: 'W', preset: 'energetic-coral',
    title: '에너제틱 코랄',
    slides: [
      { type: 'cover',     topic: '표지 슬라이드' },
      { type: 'toc',       topic: '목차' },
      { type: 'bullets',   topic: '핵심 포인트' },
      { type: 'stat-3',    topic: '주요 데이터 수치' },
      { type: 'compare-2', topic: '항목 비교' },
      { type: 'cards-3',   topic: '주요 특징 3가지' },
      { type: 'process-4', topic: '단계별 프로세스' },
      { type: 'closing',   topic: '마무리' },
    ],
  },

  {
    id: 28, category: 'W', preset: 'bold-scarlet',
    title: '볼드 스칼렛',
    slides: [
      { type: 'cover',     topic: '표지 슬라이드' },
      { type: 'toc',       topic: '목차' },
      { type: 'bullets',   topic: '핵심 포인트' },
      { type: 'stat-3',    topic: '주요 데이터 수치' },
      { type: 'compare-2', topic: '항목 비교' },
      { type: 'cards-3',   topic: '주요 특징 3가지' },
      { type: 'process-4', topic: '단계별 프로세스' },
      { type: 'closing',   topic: '마무리' },
    ],
  },
]

// ── Step 1 빌더 (레거시 호환 — 현재 UI에서 미사용)
export function buildStep1Prompt(scenario) {
  return `# ${scenario.title} — 슬라이드 원고 작성\n\n(이 기능은 현재 사용되지 않습니다.)`
}

// ── 디자인 템플릿 프롬프트 빌더 (Genspark 전용)
// slideCount: 원하는 총 슬라이드 수. 미지정 시 scenario.slides.length 기본값 사용
export function buildStep2Prompt(scenario, slideCount) {
  const preset = designPresets[scenario.preset]
  const c = preset.colors
  const defaultCount = scenario.slides.length
  const targetCount = slideCount || defaultCount

  // 기본 슬라이드 구성 (표지 + 본문 + 마무리)
  const slideLines = scenario.slides.map((s, i) => {
    const st = slideTypes[s.type]
    return `--- SLIDE ${i + 1} / ${targetCount} ---
레이아웃: ${st.name}
배치 규칙: ${st.layout}`
  }).join('\n\n')

  // 추가 슬라이드가 필요한 경우 안내 문구 생성
  const extraNote = targetCount > defaultCount
    ? `\n\n[추가 슬라이드 안내]
위 ${defaultCount}장 구성 이후 ${targetCount - defaultCount}장을 추가로 생성합니다.
추가 슬라이드는 동일한 디자인 시스템을 적용하여 아래 레이아웃 중에서 선택합니다:
- BULLETS (불릿 리스트): 핵심 포인트 나열
- STAT BOX ×3 (수치 3개): 주요 데이터 강조
- CARDS ×3 (카드 3개): 항목별 특징 소개
- COMPARE ×2 (좌우 비교): 항목 비교
마지막 슬라이드(${targetCount}장)는 항상 CLOSING(마무리)으로 종료합니다.`
    : ''

  return `# Genspark AI Slides — 디자인 템플릿 생성

## 기본 설정
- 캔버스: 1920×1080px (16:9)  |  총 슬라이드: ${targetCount}장
- 언어: 한국어  |  폰트: 한국어 폰트: Pretendard 또는 Noto Sans KR

---

## 디자인 테마: ${preset.name}
분위기: ${preset.mood}
패턴: ${preset.pattern}

### 컬러 팔레트 (HEX — 이 값만 사용, 임의 변경 금지)
- 배경:         ${c.bg}
- 배경 보조:     ${c.bgAlt}
- 본문 텍스트:   ${c.text}
- 중간 텍스트:   ${c.textMuted}
- 약한 텍스트:   ${c.textSub}
- 포인트 강조:   ${c.accent}
- 포인트 연한:   ${c.accentSoft}
- 박스 배경:     ${c.box}
- 박스 테두리:   ${c.boxBorder}

### 타이포그래피
${preset.typography}
한국어 폰트: Pretendard 또는 Noto Sans KR

---

================================================================
⚠️  오버플로우 & 겹침 방지 규칙 — 최우선 순위, 절대 위반 금지  ⚠️
================================================================

[CORE PRINCIPLE — 가장 중요한 원칙]
• 내용이 많아도 레이아웃을 절대 늘리지 않는다
• 정해진 공간에 들어가지 않는 내용은 과감히 잘라낸다 ("…" 처리)
• AI가 "더 넣고 싶어도" 스펙 외 요소를 추가하는 것은 금지
• 슬라이드 품질 = 디자인 완성도. 내용 완전성이 아님

[SAFE ZONE — 이 구역 안에만 콘텐츠 배치]
• 콘텐츠 안전 구역: X=80~1700 / Y=60~900
• 우측 220px (X=1700~1920): 로고 전용 → 콘텐츠 절대 배치 금지
• 하단 180px (Y=900~1080): 푸터 전용 → 콘텐츠 절대 배치 금지
• 모든 콘텐츠 요소는 Y=880 이전에 반드시 종료

[FONT SIZE CAPS — 이 크기 이상 절대 사용 금지]
• 슬라이드 제목:  최대 52px Bold · 1줄 고정 · 초과 시 "…" 처리
• 서브 제목:      최대 24px Regular · 1줄 고정
• 본문 / 불릿:    18~20px Regular · 줄바꿈(word wrap) 완전 금지 · 1줄 고정
• 통계 숫자:      72~88px ExtraBold · 최대 8자 (예: "92.9%", "901억")
• 수치 라벨:      20px Medium · 최대 12자 · 1줄
• 수치 설명:      18px Regular · 최대 20자 · 1줄

[COMPARE ×2 전용 규칙 — 비교 슬라이드 오버플로우 방지]
• 각 컬럼 박스 높이: 최대 580px 고정 (Y=200~780). 절대 초과 금지
• 컬럼 내부 허용 요소: 제품 헤더(1개) + 불릿(최대 4개) ONLY
• ❌ 컬럼 안에 서브 헤더 추가 금지 (예: "스위칭 제안 포인트", "경쟁 포인트" 등)
• ❌ 컬럼 안에 추가 박스/섹션 삽입 금지 (예: "MR 활용 문장", "핵심 메시지" 등)
• ❌ 컬럼 안에 불릿 5개 이상 금지 — 4개 초과분은 삭제
• 불릿 1개: 1줄 고정 · 최대 22자 · 초과 시 "…" 처리
• 컬럼 아래(Y=800 이후): 출처 라인(18px, 1줄) 외 추가 요소 금지

[CARDS / BULLETS 전용 규칙]
• 카드 1개 내부: 아이콘 + 헤더(1줄) + 본문(최대 2줄) ONLY — 서브 섹션 추가 금지
• 불릿 슬라이드: 불릿 최대 5개 · 하단 키포인트 박스는 선택(넣으면 불릿 4개로 제한)
• 카드/불릿 내용이 많으면 핵심 키워드만 남기고 나머지 삭제

[ELEMENT SPACING — 겹침 원천 차단]
• 모든 블록/요소 간 최소 간격: 28px
• 제목 영역: Y=60~140 (타이틀 + 서브타이틀만)
• 본문 영역: Y=160~860 (모든 본문 콘텐츠)
• 슬라이드당 최대 블록: 5개 — 초과 시 우선순위 낮은 블록 삭제
• 수치 박스: 최대 3개 (반드시 1행 배치)
• 카드: 최대 3개 (1행) 또는 4개 (2×2)

[HARD PROHIBITIONS — 이 항목 위반 시 전체 다시 렌더링]
• ❌ 안전 구역(X=80~1700, Y=60~880) 밖 요소 배치
• ❌ 요소 겹침 — 모든 요소 독립 공간 확보 필수
• ❌ Word wrap / 줄바꿈 — 텍스트는 1줄 고정 엄수
• ❌ 스펙 미지정 추가 요소 삽입 (내용이 많아도 추가 금지)
• ❌ 컬럼/카드/박스 내부에 서브 섹션, 추가 헤더, 중첩 박스 삽입
• ❌ Y=880 이후 콘텐츠 배치
• ❌ 지정 색상 외 임의 색상 사용

================================================================

## 슬라이드 구성 (빈 플레이스홀더로 생성)

각 슬라이드는 위 디자인 시스템을 적용하여 빈 템플릿으로 생성합니다.
텍스트는 "[제목을 입력하세요]", "[내용을 입력하세요]" 형태의 플레이스홀더로 채웁니다.

${slideLines}${extraNote}

================================================================
[렌더링 전 최종 체크리스트 — 슬라이드마다 확인]
□ 총 슬라이드 수가 ${targetCount}장인가?
□ 모든 요소가 X=80~1700, Y=60~880 안에 있는가?
□ 요소 간 최소 28px 간격이 확보되었는가?
□ 겹치는 요소가 없는가?
□ 줄바꿈(word wrap)이 없는가?
□ 슬라이드당 블록이 5개 이하인가?
□ COMPARE 슬라이드: 각 컬럼 안에 서브 헤더/추가 박스가 없는가?
□ COMPARE 슬라이드: 각 컬럼 불릿이 4개 이하인가?
□ 카드/불릿 내부에 중첩 섹션이 없는가?
□ 지정된 컬러 팔레트만 사용했는가?
================================================================`
}
