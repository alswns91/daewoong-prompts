// 실습 섹션 정의
export const sections = [
  {
    id: 'session1',
    label: '실습 1',
    sublabel: 'Genspark AI 슬라이드 제작',
    icon: '🎨',
    color: '#0057A8',
    description: 'Genspark으로 거래처 맞춤 BD/PPT 제작',
  },
  {
    id: 'session2',
    label: '실습 2',
    sublabel: '바이브코딩 자동화 툴',
    icon: '⚡',
    color: '#7C3AED',
    description: 'AI와 대화하며 코드 없이 업무 자동화 툴 제작',
  },
]

// 실습1 Genspark 카테고리 — 디자인 테마별
export const categories = [
  { id: '전체', label: '전체' },
  { id: 'L', label: '라이트 계열' },
  { id: 'D', label: '다크 계열' },
  { id: 'W', label: '웜 & 비비드' },
]

export const categoryMeta = {
  L: { name: '라이트 계열', color: '#1D4ED8' },
  D: { name: '다크 계열',   color: '#1E1B4B' },
  W: { name: '웜 & 비비드', color: '#EA580C' },
}

// ── NotebookLM 카테고리
export const nlmCategories = [
  { id: 'nlm-all',      label: '전체',           color: '#1A73E8' },
  { id: 'nlm-simple',   label: '심플',           color: '#64748B' },
  { id: 'nlm-business', label: '모던 비즈니스',   color: '#0057A8' },
  { id: 'nlm-academic', label: '학술 · 논문',    color: '#059669' },
  { id: 'nlm-report',   label: '보고서',          color: '#0891B2' },
  { id: 'nlm-impact',   label: '임팩트 · PT',    color: '#DC2626' },
  { id: 'nlm-data',     label: '데이터 비주얼',   color: '#7C3AED' },
]

export const nlmCategoryMeta = {
  'nlm-simple':   { name: '심플',          color: '#64748B', bg: '#F8FAFC', accent: '#94A3B8' },
  'nlm-business': { name: '모던 비즈니스', color: '#0057A8', bg: '#EFF6FF', accent: '#3B82F6' },
  'nlm-academic': { name: '학술 · 논문',  color: '#059669', bg: '#F0FDF4', accent: '#34D399' },
  'nlm-report':   { name: '보고서',        color: '#0891B2', bg: '#F0F9FF', accent: '#38BDF8' },
  'nlm-impact':   { name: '임팩트 · PT',  color: '#DC2626', bg: '#FFF1F2', accent: '#F87171' },
  'nlm-data':     { name: '데이터 비주얼', color: '#7C3AED', bg: '#F5F3FF', accent: '#A78BFA' },
}

// 실습2 카테고리
export const session2Categories = [
  { id: '전체',      label: '전체' },
  { id: 'manager',   label: '소장용' },
  { id: 'mr',        label: 'MR용' },
  { id: 'report',    label: '자동 보고서' },
  { id: 'crm',       label: '고객관리앱' },
]

export const session2CategoryMeta = {
  manager:  { name: '소장용',       color: '#1D4ED8', icon: '👔' },
  mr:       { name: 'MR용',        color: '#059669', icon: '🧑‍💼' },
  report:   { name: '자동 보고서',  color: '#D97706', icon: '📧' },
  crm:      { name: '고객관리앱',   color: '#7C3AED', icon: '📱' },
}

// ─────────────────────────────────────────
// 공통 안전 규칙 + 표준 레이아웃 픽셀 스펙 (모든 프롬프트 삽입)
// ─────────────────────────────────────────
const RULES = `
================================================================

[FORBIDDEN ZONES — ABSOLUTE, NO EXCEPTIONS]
• Right 220px  (X=1700~1920): Logo/branding only — NO content ever
• Bottom 140px (Y=940~1080): Footer/subtitle — NO content ever
• SAFE CONTENT AREA: X=80~1700, Y=60~930 (1620×870px usable)

[CANVAS & FONT RULES]
• Canvas: 1920×1080px (16:9)
• Minimum font size: 18px — NEVER render smaller
• Title: 48~56px Bold ONE LINE  |  Sub-label: 22px  |  Body: 22px Regular
• Stat number: 80~96px ExtraBold  |  Caption: 18px at Y≤900px

================================================================
⚠️  STRICT RENDERING RULES — HIGHEST PRIORITY  ⚠️
================================================================

[NO EXTRA ELEMENTS — CRITICAL]
• Each template defines EXACTLY what goes on the slide.
• DO NOT add tables, extra stat boxes, footnote rows, or summary strips
  beyond what the template specifies.
• If a template says "3 Stat Boxes" → render ONLY those 3 boxes. NOTHING ELSE.
• If a template says "4 Bullet points" → render ONLY those bullets. NOTHING ELSE.
• Violating this rule causes overflow. STOP after the last template element.

[STRICT TEXT LENGTH — HARD ENFORCED]
• Slide title:    max 20 Korean chars, 1 line only — cut at 20, add "…"
• Sub-label:      max 28 Korean chars, 1 line only
• Bullet point:   max 22 Korean chars, 1 line only — NO line wrap allowed
• Stat number:    short only (e.g. "92.9%", "22.3%", "901억") max 8 chars
• Stat label:     max 12 Korean chars
• Stat desc:      max 20 Korean chars, 2 lines max
• Card heading:   max 14 Korean chars
• Card body:      max 2 lines × 22 Korean chars
• Support title:  max 16 Korean chars
• Support desc:   max 28 Korean chars
• NO LONG SENTENCES anywhere. Summarize aggressively.

================================================================
[STANDARD LAYOUT TEMPLATES — USE EXACT PIXEL VALUES]
================================================================

[TEMPLATE: COVER]
• Badge:       pill shape, Y=260, centered, max 14 chars
• Accent line: 120×4px, Y=320, centered
• Main title:  56px Bold, Y=360, centered, 1 line max
• Subtitle:    28px Medium, Y=440, centered, 1 line max
• Info line 1: 22px Regular, Y=500, centered
• Info line 2: 22px Regular, Y=536, centered
⛔ STOP HERE. Nothing below Y=560.

[TEMPLATE: STAT BOX ×3]
• Title:       52px Bold, X=80, Y=80 (1 line)
• Sub-label:   22px Regular, X=80, Y=148
• Box size:    400×280px each, rounded 16px
• Box gaps:    60px between boxes
• Total width: 1320px → X start=300, X end=1620
• Box top Y:   220 → box bottom Y=500
• Inside each box:
    - Number:  80px ExtraBold, centered, top-padding 40px → Y≈260
    - Label:   22px Medium, centered, 14px below number → Y≈354
    - Desc:    20px Regular, centered, 10px below label, max 2 lines → Y≈388
• Source:      18px Regular, centered, Y=530
⛔ STOP HERE. Nothing below Y=560. NO TABLES. NO EXTRA BOXES.

[TEMPLATE: COMPARISON ×2]
• Title:       52px Bold, X=80, Y=80 (1 line)
• Sub-label:   22px Regular, X=80, Y=148
• Box size:    700×560px each, rounded 12px
• Gap:         60px between boxes
• Total width: 1460px → X start=130, X end=1590
• Box top Y:   200 → box bottom Y=760
• Inside each box:
    - Header:  26px Bold accent, top-padding 28px, left-padding 28px → Y≈228
    - Divider: 2px, 12px below header → Y≈266
    - Bullets: 4 items MAX, 22px Regular, 48px line-height, left-padding 28px
               First bullet Y≈290, last bullet Y≈434
    - Bullet circle: 8px accent, left of text
• Source:      18px Regular, centered, Y=790
⛔ STOP HERE. Nothing below Y=820. NO EXTRA STAT BOXES BELOW COLUMNS.

[TEMPLATE: PROCESS STEPS ×4]
• Title:       52px Bold, X=80, Y=80 (1 line)
• Sub-label:   22px Regular, X=80, Y=148
• Circle size: 120×120px each, border 3px accent, rounded
• Gaps:        160px between circles (center-to-center: 280px)
• Total span:  4×120 + 3×160 = 960px → X start=480, X end=1440
• Circle center Y: 460
• Number inside: 36px Bold accent, centered
• Label below: 24px Bold, Y=548 (16px below circle bottom 532)
• Desc below:  20px Regular, Y=578, max width 230px, max 2 lines, centered
⛔ STOP HERE. Nothing below Y=650. NO EXTRA ELEMENTS.

[TEMPLATE: PROFILE CARDS ×4]
• Title:       52px Bold, X=80, Y=80 (1 line)
• Sub-label:   22px Regular, X=80, Y=148
• Card size:   320×360px each, rounded 12px
• Card gaps:   24px between cards
• Total width: 1352px → X start=184, X end=1536
• Card top Y:  200 → card bottom Y=560
• Inside each card:
    - Icon circle: 56px, centered, top-padding 28px → center Y≈256
    - Type label:  22px Bold, centered, 14px below icon → Y≈326
    - Desc:        20px Regular, centered, 10px below label,
                   max 2 lines × 22 chars, padding 0 16px → Y≈356
⛔ STOP HERE. Nothing below Y=590. NO EXTRA ELEMENTS.

[TEMPLATE: FEATURE CARDS ×3]
• Title:       52px Bold, X=80, Y=80 (1 line)
• Sub-label:   22px Regular, X=80, Y=148
• Card size:   460×340px each, rounded 12px
• Card gaps:   40px between cards
• Total width: 1460px → X start=130, X end=1590
• Card top Y:  210 → card bottom Y=550
• Inside each card:
    - Icon:    48px, top-padding 28px, left-padding 24px → Y≈238
    - Heading: 22px Bold, 12px below icon → Y≈298
    - Body:    20px Regular, 10px below heading, max 2 lines × 22 chars
⛔ STOP HERE. Nothing below Y=580. NO EXTRA ELEMENTS.

[TEMPLATE: SUPPORT CARDS ×3 (STACKED)]
• Title:       52px Bold, X=80, Y=80 (1 line)
• Sub-label:   22px Regular, X=80, Y=148
• Card size:   1540×130px each (full width), rounded 12px
• Card gaps:   18px between cards
• Stack top Y: 210 → total 3×130+2×18 = 426px → bottom Y=636
• Inside each card:
    - Left accent border: 5px
    - Icon:  36px, X=48, vertically centered → Y≈247
    - Title: 22px Bold, X=104, Y-center-14
    - Desc:  20px Regular, X=104, Y-center+14, max 28 chars
⛔ STOP HERE. Nothing below Y=670. NO EXTRA ELEMENTS.

[TEMPLATE: TWO-COLUMN (MR INTRO)]
• Left col: X=80~700 (620px)
    - Profile circle: 240×240px, centered X=390, Y=220
    - Name:    34px Bold, centered, Y=492
    - Role:    20px Regular, centered, Y=530
• Right col: X=760~1660 (900px)
    - Label:   18px Medium accent, X=760, Y=180
    - Name:    44px Bold, X=760, Y=212
    - Divider: 80×3px accent, X=760, Y=272
    - Bullets: 4 items, 22px Regular, X=760, start Y=306, 52px line-height
⛔ STOP HERE. Nothing below Y=620. NO EXTRA ELEMENTS.

================================================================

[FINAL CHECK BEFORE RENDERING EACH SLIDE]
□ Did I add ANY element not in the template? → REMOVE IT
□ Does any element go below Y=930? → REMOVE IT
□ Is any text longer than the limit? → TRUNCATE with "…"
□ Did I add a table? → REMOVE THE TABLE
□ Is the closing slide the last slide? → YES
□ Minimum gap 20px between all elements? → YES

================================================================`

// ─────────────────────────────────────────
// 카테고리별 공통 헤더 생성 함수
// ─────────────────────────────────────────
const header = (style, slides, primary, accent, accentBg, divider) =>
`[GenSpark Slide Template Request]

■ STYLE: ${style}
■ CANVAS: 16:9 (1920×1080px)
■ TOTAL SLIDES: ${slides}
■ FONT: Pretendard

================================================================

[DESIGN PHILOSOPHY]
Create VISUALLY RICH, PROFESSIONAL slides!
Be GENEROUS with visual elements — convey TRUST, EXPERTISE, CREDIBILITY.
Use cards, icons, large numbers, accent highlights freely.

[COLOR PALETTE]
- Background:       #FFFFFF
- Primary Text:     ${primary}
- Secondary Text:   #6B7280
- Accent Color:     ${accent}
- Accent Background:${accentBg}
- Card Background:  #F8FAFC
- Divider:          ${divider}

[VISUAL ELEMENTS]
✦ Cards/boxes with rounded corners (16px) and subtle shadows
✦ Icon badges with circular backgrounds (accent color)
✦ Large bold stat numbers (80~96px ExtraBold)
✦ Accent-colored highlights for product names and key numbers
✦ Decorative shapes: lines, circles, subtle patterns

[TYPOGRAPHY — Pretendard]
- Slide Title:   48~60px Bold — one line only
- Sub-label:     22~26px Medium
- Body/bullet:   22~24px Regular
- Stat number:   80~96px ExtraBold
- Caption:       18px Regular`

// ─────────────────────────────────────────
// 카테고리별 색상 상수
// ─────────────────────────────────────────
const C_A = ['#1A2E5A', '#0057A8', '#EBF3FB', '#B3D1EE'] // 거래처 BD - Navy
const C_B = ['#3B0764', '#7C3AED', '#F3E8FF', '#DDD6FE'] // 제품소개 - Purple
const C_C = ['#064E3B', '#059669', '#ECFDF5', '#A7F3D0'] // 임상학술 - Green
const C_D = ['#450A0A', '#DC2626', '#FEF2F2', '#FECACA'] // 경쟁대응 - Red
const C_E = ['#451A03', '#D97706', '#FFFBEB', '#FDE68A'] // 환자케이스 - Amber
const C_F = ['#0C4A6E', '#0891B2', '#ECFEFF', '#A5F3FC'] // 영업보고 - Cyan
const C_G = ['#500724', '#DB2777', '#FDF2F8', '#FBCFE8'] // 이벤트 - Pink


// ══════════════════════════════════════════════════════════════
// 프롬프트 #1 — 신규 거래처 첫 방문 BD (Category A)
// ══════════════════════════════════════════════════════════════
const PROMPT_01 = `${header('Corporate Navy', 10, ...C_A)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
Layout: ALL ELEMENTS CENTERED
Elements:
- Badge: pill-shape bg #EBF3FB, text 20px Medium #0057A8
- Accent Line: 120x4px #0057A8
- Main Title: 64px Bold #1A2E5A, max 1 line
- Subtitle: 32px Medium #0057A8, max 1 line
- Hospital Info: 24px Regular #6B7280
- MR Info: 22px Regular #6B7280
- Bottom Line: 120x3px #B3D1EE

[CONTENT]
- Badge: 대웅제약 ETC본부
- Title: [제품명] 처방 제안서
- Subtitle: [적응증 또는 슬로건]
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: MR 소개
---
→ USE TEMPLATE: TWO-COLUMN (MR INTRO)
Left: Profile circle 260x260px + Name 36px Bold + Title 20px
Right: ABOUT MR label + Divider + 4 Bullets 24px + Highlight Box

[CONTENT]
- Name: [MR 이름]
- Title: 대웅제약 ETC [지역]본부 [직급]
- Bullet 1: 담당 구역: [담당 지역/거래처]
- Bullet 2: 주력 품목: [주력 제품명]
- Bullet 3: 경력: [근무 연수]년 이상
- Bullet 4: 연락처: [전화번호]
- Highlight: [한 줄 소개 문구]

---
SLIDE 3: 목차
---
Layout: CENTERED
Elements:
- Title: "오늘의 제안 순서" 52px Bold
- Subtitle: 24px Regular
- 4 Chapter items: Number circle + Title text

[CONTENT]
- Subtitle: [병원명] · [방문 날짜]
- Chapter 1: [제품명] 소개
- Chapter 2: 임상 근거 데이터
- Chapter 3: 처방 혜택 및 지원
- Chapter 4: 제안 요약 및 Q&A

---
SLIDE 4: 제품 소개
---
→ USE TEMPLATE: COMPARISON ×2 (50/50 split)
Left: Product image placeholder 640x400px + Badge + Caption
Right: PRODUCT OVERVIEW label + Product Name 44px Bold + Divider + 3 Feature Cards

[CONTENT]
- Product Name: [제품명]
- Caption: [성분명 / 제형 / 용량]
- Feature 1: [특징1] / [설명 20자 이내]
- Feature 2: [특징2] / [설명 20자 이내]
- Feature 3: [특징3] / [설명 20자 이내]

---
SLIDE 5: 핵심 임상 데이터
---
→ USE TEMPLATE: STAT BOX ×3
Each Box: 380x280px, top border 4px accent, Number 80px Bold + Label + Desc

[CONTENT]
- Title: 임상 근거 핵심 데이터
- Subtitle: [논문명 또는 임상 연구명]
- Stat 1: [수치 예: 98%] / [항목명] / [설명 20자]
- Stat 2: [수치] / [항목명] / [설명 20자]
- Stat 3: [수치] / [항목명] / [설명 20자]
- Source: 출처: [학술지명, 연도]

---
SLIDE 6: 경쟁 제품 비교
---
→ USE TEMPLATE: COMPARISON ×2 (add VS badge centered between boxes)
Left Box (우리 제품): Header 28px Bold accent + 4 bullets
Right Box (경쟁사): Header 28px Gray + 4 bullets

[CONTENT]
- Title: 왜 [제품명]인가?
- Left Header: [제품명] (대웅제약)
- Left Bullets 1~4: [우위점 각 20자 이내]
- Right Header: 타사 동일 계열
- Right Bullets 1~4: [상대적 약점 각 20자 이내]

---
SLIDE 7: 처방 대상 환자 프로파일
---
→ USE TEMPLATE: PROFILE CARDS ×4
Each Card: 280x400px, Icon circle + Patient Type 22px Bold + Description 18px

[CONTENT]
- Title: 이런 환자에게 [제품명]을 권합니다
- Subtitle: [처방 대상 요약 30자 이내]
- Profile 1~4: [환자 유형] / [설명 40자 이내]

---
SLIDE 8: 처방 지원 프로그램
---
→ USE TEMPLATE: SUPPORT CARDS ×3 (STACKED)
Each Card: width=1580px, height=160px, left border 5px accent, Icon + Title + Desc

[CONTENT]
- Title: 처방 후 지원 프로그램
- Subtitle: 대웅제약이 선생님의 처방을 끝까지 책임집니다
- Support 1~3: [지원명] / [설명 40자 이내]

---
SLIDE 9: 제안 요약
---
→ USE TEMPLATE: STAT BOX ×3 (3-column summary variant)\n3 Columns: Icon + Heading 26px Bold + Body 20px (max 2 lines each)
CTA Strip: bg accent, text white

[CONTENT]
- Column 1 Heading: 제품의 강점 / Body: [요약 2줄]
- Column 2 Heading: 처방 대상 / Body: [요약 2줄]
- Column 3 Heading: 지원 내용 / Body: [요약 2줄]
- CTA: [선생님, [제품명] 처방을 부탁드립니다]

---
SLIDE 10: CLOSING
---
Layout: ALL CENTERED
Elements: Icon circle + Accent Line + "감사합니다" 68px Bold + Subtext + Divider + Contact info

[CONTENT]
- Subtext: 언제든지 연락 주세요. 최선을 다하겠습니다.
- Name: [MR 이름] | 대웅제약 ETC [지역]본부
- Phone: [연락처]
- Email: [이메일]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #2 — 기존 거래처 처방 증대 제안 (Category A)
// ══════════════════════════════════════════════════════════════
const PROMPT_02 = `${header('Corporate Blue', 8, ...C_A)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
Layout: ALL CENTERED
Elements: Badge + Accent Line + Title 64px Bold + Subtitle 32px + Hospital Info + MR Info

[CONTENT]
- Badge: 대웅제약 ETC본부
- Title: [제품명] 처방 증대 제안
- Subtitle: 더 많은 환자에게 더 나은 치료를
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 현재 처방 현황
---
→ USE TEMPLATE: STAT BOX ×3
Each box shows current prescription data

[CONTENT]
- Title: 현재 처방 현황
- Stat 1: [현재 월 처방 수] / 월평균 처방 / [기간] 기준
- Stat 2: [처방 환자 비율] / 적응증 내 처방률 / 추정
- Stat 3: [타 제품 대비 비율] / 원내 점유율 / 추정
- Source: 사내 데이터 기준 / [날짜]

---
SLIDE 3: 처방 확대 기회 분석
---
Layout: Title TOP-LEFT + 2 Column Comparison (현재 vs 목표)
Left: 현재 처방 패턴 (4 bullets)
Right: 확대 가능 영역 (4 bullets, accent color)

[CONTENT]
- Title: 처방 확대 기회
- Left Header: 현재 처방 패턴
- Left Bullets 1~4: [현재 처방 상황 각 20자]
- Right Header: 확대 가능 영역
- Right Bullets 1~4: [기회 포인트 각 20자]

---
SLIDE 4: 추가 적응증 제안
---
→ USE TEMPLATE: PROCESS STEPS ×4
Each Step: Number Circle + Label + Description

[CONTENT]
- Title: 추가 처방 가능 적응증
- Step 1: [적응증1 명칭] / [대상 환자 설명]
- Step 2: [적응증2 명칭] / [대상 환자 설명]
- Step 3: [적응증3 명칭] / [대상 환자 설명]
- Step 4: [적응증4 명칭] / [대상 환자 설명]

---
SLIDE 5: 처방 증대 시뮬레이션
---
Layout: Title TOP-LEFT + Large Simulation Card CENTERED
Card: 3 columns (현재/목표/증가분) with large numbers

[CONTENT]
- Title: 처방 증대 시뮬레이션
- Subtitle: [기간] 기준 목표
- Column 1: [현재 월 처방수] / 현재 월 처방
- Column 2: [목표 월 처방수] / 목표 월 처방
- Column 3: [증가 환자수] / 추가 치료 환자
- Note: *선생님 진료 환경 기준 추정치입니다

---
SLIDE 6: 임상 근거 (증대 이유)
---
→ USE TEMPLATE: STAT BOX ×3 + Source Note

[CONTENT]
- Title: 더 처방해야 하는 이유
- Subtitle: [핵심 임상 근거 연구명]
- Stat 1: [수치] / [항목] / [설명]
- Stat 2: [수치] / [항목] / [설명]
- Stat 3: [수치] / [항목] / [설명]
- Source: 출처: [학술지명, 연도]

---
SLIDE 7: 처방 증대 지원 프로그램
---
→ USE TEMPLATE: SUPPORT CARDS ×3 (STACKED)

[CONTENT]
- Title: 처방 증대를 위한 지원
- Support 1: [지원명1] / [설명 40자]
- Support 2: [지원명2] / [설명 40자]
- Support 3: [지원명3] / [설명 40자]

---
SLIDE 8: CLOSING
---
Layout: ALL CENTERED
Elements: Icon circle + "함께 성장하겠습니다" 60px Bold + Subtext + Contact

[CONTENT]
- Main Text: 함께 성장하겠습니다
- Subtext: 선생님의 처방이 환자의 삶을 바꿉니다
- Name: [MR 이름] | 대웅제약 ETC [지역]본부
- Phone: [연락처]
- Email: [이메일]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #3 — 휴면 거래처 재활성화 제안 (Category A)
// ══════════════════════════════════════════════════════════════
const PROMPT_03 = `${header('Warm Navy', 7, ...C_A)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
Layout: ALL CENTERED
Elements: Badge + Accent Line + Title + Subtitle + Hospital Info + MR Info

[CONTENT]
- Badge: 대웅제약 ETC본부
- Title: 다시 함께하고 싶습니다
- Subtitle: [제품명] 업데이트 소식을 전합니다
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 그동안의 변화
---
→ USE TEMPLATE: PROCESS STEPS ×4
마지막 처방 이후 달라진 점들을 순서대로 제시

[CONTENT]
- Title: 그동안 달라진 것들
- Subtitle: 선생님의 마지막 처방 이후 [기간]이 지났습니다
- Step 1: [변화1 제목] / [내용 예: 새 임상 결과 발표]
- Step 2: [변화2 제목] / [내용]
- Step 3: [변화3 제목] / [내용]
- Step 4: [변화4 제목] / [내용]

---
SLIDE 3: 업데이트된 임상 데이터
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 새로운 임상 근거
- Subtitle: [최신 임상 연구명, 연도]
- Stat 1: [수치] / [항목] / [설명]
- Stat 2: [수치] / [항목] / [설명]
- Stat 3: [수치] / [항목] / [설명]
- Source: 출처: [학술지명, 연도]

---
SLIDE 4: 새로운 지원 프로그램
---
→ USE TEMPLATE: SUPPORT CARDS ×3 (STACKED)

[CONTENT]
- Title: 새롭게 준비한 지원 프로그램
- Subtitle: 선생님의 처방을 더 잘 보조하겠습니다
- Support 1: [신규 지원1] / [설명]
- Support 2: [신규 지원2] / [설명]
- Support 3: [신규 지원3] / [설명]

---
SLIDE 5: 처방 재시작 제안
---
→ USE TEMPLATE: STAT BOX ×3 (3-column card variant)\n3 Columns: 처음 처방 / 유지 처방 / 장기 목표

[CONTENT]
- Title: 다시 시작하는 처방 플랜
- Column 1: 처음 처방 / [첫 처방 제안 내용]
- Column 2: 1개월 후 / [유지 및 평가 계획]
- Column 3: 3개월 목표 / [장기 처방 목표]
- CTA: 작은 시작이 큰 변화를 만듭니다

---
SLIDE 6: 비교 (처방 전 vs 후)
---
→ USE TEMPLATE: COMPARISON ×2
Left: 처방 없을 때 환자 상황
Right: 처방 후 기대 효과 (accent color)

[CONTENT]
- Title: 처방이 만드는 차이
- Left Header: 처방 없을 때
- Left Bullets 1~4: [환자 불편/위험 각 20자]
- Right Header: [제품명] 처방 후
- Right Bullets 1~4: [기대 효과 각 20자]

---
SLIDE 7: CLOSING
---
Layout: ALL CENTERED

[CONTENT]
- Main Text: 다시 찾아뵙겠습니다
- Subtext: 선생님의 환자를 위해 더 열심히 하겠습니다
- Name: [MR 이름] | 대웅제약 ETC [지역]본부
- Phone: [연락처]
- Email: [이메일]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #4 — VIP 거래처 파트너십 제안 (Category A)
// ══════════════════════════════════════════════════════════════
const PROMPT_04 = `${header('Premium Navy', 10, ...C_A)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
→ USE TEMPLATE: COVER (all elements centered)\n
[CONTENT]
- Badge: 대웅제약 VIP 파트너십
- Title: [담당 의사명] 선생님과의 파트너십
- Subtitle: 감사와 신뢰, 그리고 미래를 함께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 그동안의 파트너십 감사
---
Layout: Title CENTERED + Large Thank-you Card
Card: warm background, meaningful message, key milestone numbers

[CONTENT]
- Title: 함께한 시간에 감사드립니다
- Milestone 1: [협력 기간] / 함께한 기간
- Milestone 2: [누적 처방 수 추정] / 누적 처방 환자
- Milestone 3: [방문 횟수] / 방문 횟수
- Message: [감사 메시지 2줄]

---
SLIDE 3: 처방 기여도 현황
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 선생님의 처방이 만든 변화
- Stat 1: [처방 환자 수] / 치료 받은 환자
- Stat 2: [처방 기간] / 꾸준한 처방 기간
- Stat 3: [원내 점유율] / 원내 점유율
- Note: *감사의 마음을 담아 추정한 수치입니다

---
SLIDE 4: 심층 파트너십 제안
---
→ USE TEMPLATE: PROFILE CARDS ×4 (파트너십 혜택 4가지)

[CONTENT]
- Title: 더 깊은 파트너십을 제안드립니다
- Card 1: [혜택1 제목] / [설명]
- Card 2: [혜택2 제목] / [설명]
- Card 3: [혜택3 제목] / [설명]
- Card 4: [혜택4 제목] / [설명]

---
SLIDE 5: 전용 지원 프로그램
---
→ USE TEMPLATE: SUPPORT CARDS ×3 (STACKED)

[CONTENT]
- Title: VIP 전용 지원 프로그램
- Support 1: [프로그램1] / [설명]
- Support 2: [프로그램2] / [설명]
- Support 3: [프로그램3] / [설명]

---
SLIDE 6: 학술 활동 지원
---
→ USE TEMPLATE: FEATURE CARDS ×3

[CONTENT]
- Title: 학술 활동 전담 지원
- Card 1: 최신 임상 자료 제공 / [상세 내용]
- Card 2: 학회 정보 공유 / [상세 내용]
- Card 3: 논문 검색 지원 / [상세 내용]

---
SLIDE 7: 전용 핫라인 안내
---
Layout: Title CENTERED + Large Contact Card

[CONTENT]
- Title: 24시간 전담 대응
- Contact Name: [MR 이름]
- Phone: [연락처] (언제든지)
- Email: [이메일]
- Response: 문의 후 2시간 내 응답 보장

---
SLIDE 8: 연간 파트너십 로드맵
---
→ USE TEMPLATE: PROCESS STEPS ×4 (분기별)

[CONTENT]
- Title: [연도]년 파트너십 로드맵
- Q1: [1분기 활동 계획]
- Q2: [2분기 활동 계획]
- Q3: [3분기 활동 계획]
- Q4: [4분기 활동 계획]

---
SLIDE 9: 제안 요약
---
Layout: Title CENTERED + 3 Column Summary Card + CTA

[CONTENT]
- Column 1: 감사 / [감사 메시지]
- Column 2: 지원 / [제공 혜택 요약]
- Column 3: 약속 / [미래 약속]
- CTA: 앞으로도 함께해 주세요

---
SLIDE 10: CLOSING
---
→ USE TEMPLATE: COVER (all elements centered)\n
[CONTENT]
- Main Text: 항상 감사합니다
- Subtext: 선생님의 신뢰에 보답하는 MR이 되겠습니다
- Name: [MR 이름] | 대웅제약 ETC [지역]본부
- Phone: [연락처]
- Email: [이메일]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #5 — 복수 제품 크로스셀 제안 (Category A)
// ══════════════════════════════════════════════════════════════
const PROMPT_05 = `${header('Multi-Product Navy', 10, ...C_A)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 대웅제약 ETC본부
- Title: [제품A] + [제품B] 처방 제안
- Subtitle: 두 가지 선택, 하나의 파트너
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 선생님 진료 환경 분석
---
→ USE TEMPLATE: PROFILE CARDS ×4
진료과 특성, 주요 환자군, 현재 처방 패턴, 미충족 수요

[CONTENT]
- Title: 선생님 진료 환경 분석
- Card 1: 진료과/전문 분야 / [설명]
- Card 2: 주요 환자군 / [설명]
- Card 3: 현재 처방 패턴 / [설명]
- Card 4: 미충족 수요 / [설명]

---
SLIDE 3: 제품 A 소개
---
→ USE TEMPLATE: COMPARISON ×2 (50/50 split)
Left: Product image + Badge
Right: Name + Divider + 3 Feature Cards

[CONTENT]
- Product A Name: [제품A 이름]
- Caption: [성분/제형/용량]
- Feature 1~3: [특징] / [설명]

---
SLIDE 4: 제품 B 소개
---
→ USE TEMPLATE: COMPARISON ×2 (50/50 split) (reversed — image on right)
Left: Name + Divider + 3 Feature Cards
Right: Product image + Badge

[CONTENT]
- Product B Name: [제품B 이름]
- Caption: [성분/제형/용량]
- Feature 1~3: [특징] / [설명]

---
SLIDE 5: 두 제품의 시너지
---
Layout: Title CENTERED + Venn Diagram style card
Center overlap area shows synergy benefits

[CONTENT]
- Title: 함께 처방하면 더 강력합니다
- Product A Circle: [제품A 강점 3가지]
- Product B Circle: [제품B 강점 3가지]
- Center Synergy: [병용 처방 시 핵심 시너지]

---
SLIDE 6: 임상 데이터 (각 제품)
---
→ USE TEMPLATE: STAT BOX ×3 (2-row grid variant)\n
[CONTENT]
- Title: 임상 근거 요약
- [제품A] Stat 1~3: [수치] / [항목] / [출처]
- [제품B] Stat 1~3: [수치] / [항목] / [출처]

---
SLIDE 7: 처방 조합 가이드
---
→ USE TEMPLATE: PROCESS STEPS ×4
환자 → 진단 → 제품 선택 → 모니터링

[CONTENT]
- Title: 어떤 환자에게 어떻게?
- Step 1: 환자 유형 확인 / [기준]
- Step 2: 주증상 파악 / [방법]
- Step 3: 제품 매칭 / [기준]
- Step 4: 처방 후 관리 / [방법]

---
SLIDE 8: 지원 프로그램
---
→ USE TEMPLATE: SUPPORT CARDS ×3 (STACKED)

[CONTENT]
- Title: 두 제품 처방을 위한 지원
- Support 1: [지원1] / [설명]
- Support 2: [지원2] / [설명]
- Support 3: [지원3] / [설명]

---
SLIDE 9: 처방 제안 요약
---
Layout: Title CENTERED + 3 Column Card + CTA

[CONTENT]
- Column 1: [제품A] / [핵심 요약]
- Column 2: [제품B] / [핵심 요약]
- Column 3: 병용 시너지 / [요약]
- CTA: 두 제품 모두 처방을 부탁드립니다

---
SLIDE 10: CLOSING
---
[CONTENT]
- Main Text: 감사합니다
- Subtext: 두 제품 모두 믿고 맡겨 주세요
- Name: [MR 이름] | 대웅제약 ETC [지역]본부
- Phone: [연락처] / Email: [이메일]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #6 — 계절/시즌 맞춤 처방 제안 (Category A)
// ══════════════════════════════════════════════════════════════
const PROMPT_06 = `${header('Season Navy', 7, ...C_A)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: [시즌명, 예: 2025 독감 시즌]
- Title: [시즌] 처방 제안
- Subtitle: 이 시기, [제품명]이 필요한 이유
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 시즌 처방 이슈
---
→ USE TEMPLATE: STAT BOX ×3 (시즌 관련 통계)

[CONTENT]
- Title: [시즌] 처방 환경
- Stat 1: [수치] / [시즌 관련 지표1] / [설명]
- Stat 2: [수치] / [시즌 관련 지표2] / [설명]
- Stat 3: [수치] / [시즌 관련 지표3] / [설명]
- Source: 출처: [자료 출처]

---
SLIDE 3: 시즌 특화 처방 포인트
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: [시즌]에 꼭 기억할 처방 포인트
- Step 1: [포인트1] / [설명]
- Step 2: [포인트2] / [설명]
- Step 3: [포인트3] / [설명]
- Step 4: [포인트4] / [설명]

---
SLIDE 4: 임상 근거
---
Layout: Title TOP-LEFT + 2 Column Comparison

[CONTENT]
- Title: 왜 [제품명]인가?
- Left Header: [제품명]의 강점
- Left Bullets 1~4: [임상 근거 각 20자]
- Right Header: 이 시즌 특히 중요한 이유
- Right Bullets 1~4: [시즌 특화 이유 각 20자]

---
SLIDE 5: 처방 대상 환자
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 이런 환자를 주목해 주세요
- Profile 1~4: [시즌 특이 환자 유형] / [설명]

---
SLIDE 6: 시즌 한정 지원 프로그램
---
→ USE TEMPLATE: SUPPORT CARDS ×3 (STACKED)

[CONTENT]
- Title: [시즌] 한정 지원 프로그램
- Support 1: [지원1] / [설명]
- Support 2: [지원2] / [설명]
- Support 3: [지원3] / [설명]

---
SLIDE 7: CLOSING
---
[CONTENT]
- Main Text: 이번 [시즌], 함께 준비해요
- Subtext: 선생님 환자의 건강한 [시즌]을 위해 노력하겠습니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #7 — 신제품 론칭 소개 PPT (Category B)
// ══════════════════════════════════════════════════════════════
const PROMPT_07 = `${header('Launch Purple', 12, ...C_B)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: NEW LAUNCH | 대웅제약
- Title: [제품명] 출시
- Subtitle: [주요 슬로건 또는 적응증]
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 신제품 탄생 배경
---
→ USE TEMPLATE: FEATURE CARDS ×3
미충족 수요, 개발 동기, 출시 의의

[CONTENT]
- Title: 왜 만들었나요?
- Card 1: 미충족 수요 / [기존 치료의 한계 설명]
- Card 2: 개발 동기 / [연구 배경]
- Card 3: 출시 의의 / [이 제품이 주는 가치]

---
SLIDE 3: 제품 개요
---
→ USE TEMPLATE: COMPARISON ×2 (50/50 split)
Left: Product image + Badge
Right: Name + 3 Key Specs Cards

[CONTENT]
- Product Name: [제품명]
- Spec 1: 성분 / [성분명]
- Spec 2: 제형 / [제형 및 용량]
- Spec 3: 적응증 / [주 적응증]

---
SLIDE 4: 작용 기전
---
→ USE TEMPLATE: PROCESS STEPS ×4 (기전 단계)

[CONTENT]
- Title: 작용 기전
- Subtitle: [기전 한 줄 요약]
- Step 1: [기전 1단계] / [설명]
- Step 2: [기전 2단계] / [설명]
- Step 3: [기전 3단계] / [설명]
- Step 4: [최종 효과] / [설명]

---
SLIDE 5: 핵심 임상 효능
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 임상 효능 핵심 데이터
- Subtitle: [임상 연구명]
- Stat 1~3: [수치] / [항목] / [설명]
- Source: 출처: [학술지명, 연도]

---
SLIDE 6: 안전성 프로파일
---
→ USE TEMPLATE: STAT BOX ×3 (안전성 지표)

[CONTENT]
- Title: 안전성 프로파일
- Subtitle: [안전성 연구명]
- Stat 1: [부작용 발생률] / 부작용 발생률 / [비교 기준]
- Stat 2: [중단율] / 투약 중단율 / [비교]
- Stat 3: [안전성 지표] / [항목] / [설명]
- Source: 출처: [자료]

---
SLIDE 7: 경쟁 제품 비교
---
→ USE TEMPLATE: COMPARISON ×2 (add VS badge centered between boxes)

[CONTENT]
- Title: 기존 치료 대비 우위
- Left Header: [제품명] (신제품)
- Left Bullets 1~4: [차별점 각 20자]
- Right Header: 기존 치료
- Right Bullets 1~4: [기존 한계 각 20자]

---
SLIDE 8: 처방 대상 환자
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 이런 환자에게 처방하세요
- Profile 1~4: [환자 유형] / [설명]

---
SLIDE 9: 용법 용량
---
→ USE TEMPLATE: PROCESS STEPS ×4 (복용 단계)

[CONTENT]
- Title: 용법 · 용량
- Step 1: 초기 용량 / [내용]
- Step 2: 유지 용량 / [내용]
- Step 3: 증량 기준 / [내용]
- Step 4: 주의사항 / [내용]

---
SLIDE 10: 급여 안내
---
→ USE TEMPLATE: FEATURE CARDS ×3

[CONTENT]
- Title: 보험 급여 안내
- Card 1: 급여 적용 범위 / [내용]
- Card 2: 환자 본인부담금 / [금액 또는 비율]
- Card 3: 처방 시 코드 / [급여 코드]

---
SLIDE 11: 지원 프로그램
---
→ USE TEMPLATE: SUPPORT CARDS ×3 (STACKED)

[CONTENT]
- Title: 신제품 론칭 지원 프로그램
- Support 1~3: [지원명] / [설명]

---
SLIDE 12: CLOSING
---
[CONTENT]
- Main Text: [제품명]과 함께 새로운 시작을
- Subtext: 처음 처방의 순간, 항상 옆에 있겠습니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #8 — 성분/기전 중심 과학적 소개 (Category B)
// ══════════════════════════════════════════════════════════════
const PROMPT_08 = `${header('Science Purple', 10, ...C_B)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 대웅제약 과학적 근거
- Title: [제품명] 기전 심층 분석
- Subtitle: 성분이 말하는 치료의 이유
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 질환 기전 이해
---
Layout: Title TOP-LEFT + Image + Text (50/50)
Left: 질환 기전 다이어그램 placeholder
Right: 질환 설명 bullets

[CONTENT]
- Title: [질환명] 기전 이해
- Image Caption: [질환 기전 다이어그램]
- Bullet 1~4: [질환 기전 핵심 포인트 각 30자]

---
SLIDE 3: 기존 치료의 한계
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 기존 치료의 한계
- Left Header: 기존 치료 방식
- Left Bullets 1~4: [기존 치료 설명]
- Right Header: 해결되지 않은 문제
- Right Bullets 1~4: [미충족 수요]

---
SLIDE 4: 성분 소개
---
Layout: Title CENTERED + Large Component Card
Card: 성분명 크게 + 분자 구조 placeholder + 특성 3가지

[CONTENT]
- Title: [성분명] 소개
- Component Name: [성분명 (IUPAC 또는 일반명)]
- Property 1: [화학적 특성]
- Property 2: [약동학적 특성]
- Property 3: [선택성/특이성]

---
SLIDE 5: 약리 기전 1단계
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 약리 기전 — 1단계
- Subtitle: [수용체/효소 작용 단계]
- Step 1~4: [기전 단계별 설명]

---
SLIDE 6: 약리 기전 2단계
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 약리 기전 — 2단계
- Subtitle: [세포/조직 수준 효과]
- Step 1~4: [효과 단계별 설명]

---
SLIDE 7: 임상 근거
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 기전이 만드는 임상 효과
- Stat 1~3: [수치] / [항목] / [설명]
- Source: [학술지명, 연도]

---
SLIDE 8: 처방 포인트
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 기전 기반 처방 포인트
- Card 1~4: [처방 포인트] / [기전 근거 설명]

---
SLIDE 9: 안전성 프로파일
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 안전성 프로파일
- Stat 1~3: [수치] / [안전성 항목] / [설명]
- Note: [주요 주의사항]

---
SLIDE 10: CLOSING
---
[CONTENT]
- Main Text: 과학이 증명한 선택
- Subtext: 기전부터 임상까지, [제품명]을 믿어주세요
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #9 — 복용 편의성 강조 소개 (Category B)
// ══════════════════════════════════════════════════════════════
const PROMPT_09 = `${header('Convenience Purple', 8, ...C_B)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 복약 편의성 특화
- Title: 환자가 지키는 치료, [제품명]
- Subtitle: 간편한 복용이 만드는 치료 성공
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 복약 순응도 현황
---
→ USE TEMPLATE: STAT BOX ×3 (순응도 통계)

[CONTENT]
- Title: 복약 순응도가 왜 중요한가
- Stat 1: [비순응 환자 비율] / 복약 비순응 환자 / [설명]
- Stat 2: [치료 실패율] / 비순응으로 인한 치료 실패 / [설명]
- Stat 3: [추가 비용] / 비순응으로 인한 추가 비용 / [설명]
- Source: 출처: [자료]

---
SLIDE 3: [제품명] 편의성 특징
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: [제품명]이 편리한 이유
- Card 1: [1일 1회 복용] / [설명]
- Card 2: [제형 특징] / [설명]
- Card 3: [보관 편의성] / [설명]
- Card 4: [복용 시간 자유도] / [설명]

---
SLIDE 4: 타사 제품 편의성 비교
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 복용 편의성 비교
- Left Header: [제품명]
- Left Bullets 1~4: [편의성 우위점]
- Right Header: 타사 동일 계열
- Right Bullets 1~4: [상대적 불편함]

---
SLIDE 5: 환자 순응도 데이터
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 실제 환자 순응도 데이터
- Stat 1: [순응도 수치] / 복약 순응도 / [비교]
- Stat 2: [지속 복용 기간] / 평균 지속 복용 / [비교]
- Stat 3: [환자 만족도] / 환자 만족도 / [비교]
- Source: 출처: [자료]

---
SLIDE 6: 처방 대상 환자
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 이런 환자에게 특히 추천합니다
- Profile 1: 다제 복용 환자 / [설명]
- Profile 2: 고령 환자 / [설명]
- Profile 3: 직장인/바쁜 환자 / [설명]
- Profile 4: 이전 순응도 불량 환자 / [설명]

---
SLIDE 7: 복약 가이드
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 환자에게 전달할 복약 가이드
- Step 1: 복용 시간 / [가이드]
- Step 2: 복용 방법 / [가이드]
- Step 3: 주의사항 / [가이드]
- Step 4: 증상 모니터링 / [가이드]

---
SLIDE 8: CLOSING
---
[CONTENT]
- Main Text: 편리한 복용이 완주를 만듭니다
- Subtext: 환자가 끝까지 복용하는 치료, [제품명]
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #10 — 보험 급여/가격 경쟁력 소개 (Category B)
// ══════════════════════════════════════════════════════════════
const PROMPT_10 = `${header('Value Purple', 8, ...C_B)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 급여 · 가격 경쟁력
- Title: [제품명] 급여 및 비용 안내
- Subtitle: 효과는 최상, 부담은 최소
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 보험 급여 현황
---
→ USE TEMPLATE: FEATURE CARDS ×3

[CONTENT]
- Title: 보험 급여 현황
- Card 1: 급여 코드 / [급여 코드 번호]
- Card 2: 급여 기준 / [급여 인정 기준 요약]
- Card 3: 급여 시작일 / [급여 적용 날짜]

---
SLIDE 3: 급여 적용 환자 범위
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 급여 적용 환자
- Profile 1~4: [급여 적용 환자 기준] / [상세 조건]

---
SLIDE 4: 환자 본인부담금 비교
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 환자 실제 부담금
- Stat 1: [외래 본인부담금] / 외래 처방 시 / 1개월 기준
- Stat 2: [입원 본인부담금] / 입원 처방 시 / [기준]
- Stat 3: [타사 대비 절감액] / 타사 대비 절감 / 월 기준

---
SLIDE 5: 비용 효과성 분석
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 비용 효과성 비교
- Left Header: [제품명]
- Left Bullets 1~4: [비용 효과성 우위]
- Right Header: 타사 동일 계열
- Right Bullets 1~4: [상대적 비용 부담]

---
SLIDE 6: 총 치료 비용 비교
---
→ USE TEMPLATE: STAT BOX ×3 (총 비용)

[CONTENT]
- Title: 총 치료 비용 비교
- Stat 1: [1년 총 비용] / 연간 총 치료비 / [제품명]
- Stat 2: [타사 대비 절감] / 연간 절감액 / 타사 대비
- Stat 3: [QOL 개선] / 삶의 질 개선 지수 / [출처]
- Source: 출처: [자료]

---
SLIDE 7: 처방 시 유의사항
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 처방 시 꼭 확인하세요
- Step 1: 급여 적용 조건 확인 / [확인 방법]
- Step 2: 처방전 기재 방법 / [방법]
- Step 3: 삭감 예방 포인트 / [주의사항]
- Step 4: 재심사 대응 / [방법]

---
SLIDE 8: CLOSING
---
[CONTENT]
- Main Text: 효과도, 경제성도 [제품명]
- Subtext: 환자 부담 줄이는 처방, 함께 만들어 갑니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #11 — 복합제/콤보 처방 제안 (Category B)
// ══════════════════════════════════════════════════════════════
const PROMPT_11 = `${header('Combo Purple', 10, ...C_B)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 복합제 · 병용 처방
- Title: [복합제명] 처방 제안
- Subtitle: 하나로 해결하는 [두 가지 효과]
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 단독 요법의 한계
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 단독 요법으로 부족한 이유
- Left Header: 성분A 단독
- Left Bullets 1~4: [단독 요법 한계]
- Right Header: 성분B 단독
- Right Bullets 1~4: [단독 요법 한계]

---
SLIDE 3: 복합제 개요
---
→ USE TEMPLATE: COMPARISON ×2 (50/50 split)

[CONTENT]
- Product Name: [복합제명]
- Caption: [성분A + 성분B / 제형 / 용량]
- Feature 1: 성분 조합 / [설명]
- Feature 2: 복용 편의 / [설명]
- Feature 3: 임상 근거 / [설명]

---
SLIDE 4: 성분 시너지 기전
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 두 성분의 시너지 기전
- Step 1: [성분A 작용] / [설명]
- Step 2: [성분B 작용] / [설명]
- Step 3: [상호 보완 기전] / [설명]
- Step 4: [복합 효과] / [설명]

---
SLIDE 5: 임상 데이터
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 복합제 임상 효과
- Stat 1~3: [수치] / [항목] / [설명]
- Source: [학술지명, 연도]

---
SLIDE 6: 단독 vs 복합 비교
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 단독 vs 복합제 비교
- Left Header: 단독 요법 (각각 복용)
- Left Bullets 1~4: [단독 요법 문제점]
- Right Header: [복합제명] 한 알
- Right Bullets 1~4: [복합제 장점]

---
SLIDE 7: 처방 대상
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 이런 환자에게 처방하세요
- Profile 1~4: [환자 유형] / [설명]

---
SLIDE 8: 복약 편의성
---
Layout: Title CENTERED + 3 Column Card

[CONTENT]
- Column 1: 알 수 감소 / [단독 복용 알 수 vs 복합제]
- Column 2: 복용 횟수 / [단독 vs 복합제]
- Column 3: 순응도 향상 / [데이터]

---
SLIDE 9: 지원 프로그램
---
→ USE TEMPLATE: SUPPORT CARDS ×3 (STACKED)

[CONTENT]
- Title: 복합제 처방 지원
- Support 1~3: [지원명] / [설명]

---
SLIDE 10: CLOSING
---
[CONTENT]
- Main Text: 하나로 두 가지를, [복합제명]
- Subtext: 환자의 복약 부담을 줄이는 처방을 함께 합니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #12 — 핵심 임상 논문 요약 발표 (Category C)
// ══════════════════════════════════════════════════════════════
const PROMPT_12 = `${header('Academic Green', 10, ...C_C)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 임상 논문 리뷰
- Title: [논문명 약칭] 핵심 요약
- Subtitle: [학술지명] · [연도] · [저자]
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 연구 배경
---
→ USE TEMPLATE: PROCESS STEPS ×4 (bullet list variant: replace steps with 5 bullet items, start Y=280, 56px line-height, bullet circle 10px accent)

[CONTENT]
- Title: 연구 배경 및 목적
- Subtitle: 이 연구가 필요했던 이유
- Bullet 1~5: [연구 배경 포인트 각 30자]

---
SLIDE 3: 연구 설계
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 연구 설계 (Study Design)
- Step 1: 연구 유형 / [RCT / 코호트 등]
- Step 2: 연구 기간 / [기간]
- Step 3: 대상 환자 / [포함/제외 기준 요약]
- Step 4: 평가 지표 / [주요 endpoint]

---
SLIDE 4: 환자 특성
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 환자 특성 (Baseline)
- Stat 1: [총 환자 수] / 등록 환자 / [기간]
- Stat 2: [평균 나이] / 평균 연령
- Stat 3: [주요 특성 수치] / [항목]

---
SLIDE 5: 주요 결과 1 (효능)
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 주요 결과 — 효능
- Stat 1~3: [수치] / [1차/2차 endpoint] / [p값 등]
- Source: [논문명, 연도]

---
SLIDE 6: 주요 결과 2 (비교 효과)
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 대조군 대비 우월성
- Left Header: [제품명] 투여군
- Left Bullets 1~4: [결과]
- Right Header: 대조군 / 위약군
- Right Bullets 1~4: [결과]

---
SLIDE 7: 안전성 결과
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 안전성 결과
- Stat 1: [이상반응률] / 전체 이상반응 / [비교]
- Stat 2: [중증 이상반응] / 중증 이상반응 / [비교]
- Stat 3: [투약 중단율] / 투약 중단 / [비교]

---
SLIDE 8: 결론
---
→ USE TEMPLATE: PROCESS STEPS ×4 (bullet list variant: replace steps with 5 bullet items, start Y=280, 56px line-height, bullet circle 10px accent)

[CONTENT]
- Title: 연구 결론 (Conclusion)
- Subtitle: 저자의 핵심 메시지
- Bullet 1~4: [결론 포인트 각 30자]

---
SLIDE 9: 임상적 의의
---
→ USE TEMPLATE: FEATURE CARDS ×3

[CONTENT]
- Title: 처방에 주는 메시지
- Card 1: 효능 측면 / [임상적 의의]
- Card 2: 안전성 측면 / [임상적 의의]
- Card 3: 처방 적용 / [실제 처방에서의 의의]

---
SLIDE 10: CLOSING
---
[CONTENT]
- Main Text: 근거 기반 처방, [제품명]
- Subtext: 더 궁금한 내용은 언제든지 문의해 주세요
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #13 — Real-World Evidence 공유 (Category C)
// ══════════════════════════════════════════════════════════════
const PROMPT_13 = `${header('RWE Green', 10, ...C_C)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: Real-World Evidence
- Title: [제품명] 실제 처방 근거
- Subtitle: 임상이 아닌 현실에서 증명된 효과
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: RWE란?
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: RWE(실사용 근거)란?
- Left Header: 임상시험 (RCT)
- Left Bullets 1~4: [RCT 특징/한계]
- Right Header: 실사용 근거 (RWE)
- Right Bullets 1~4: [RWE 특징/장점]

---
SLIDE 3: 데이터 출처 및 규모
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 데이터 출처 및 규모
- Stat 1: [분석 환자 수] / 분석 환자 / [기간/지역]
- Stat 2: [데이터 기간] / 데이터 수집 기간
- Stat 3: [참여 기관 수] / 참여 의료기관
- Source: 출처: [DB명 또는 기관]

---
SLIDE 4: 처방 패턴 분석
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 실제 처방 패턴
- Card 1: 주요 처방 적응증 / [비율 및 설명]
- Card 2: 평균 처방 기간 / [기간]
- Card 3: 주요 처방 환자군 / [특성]
- Card 4: 병용 처방 패턴 / [설명]

---
SLIDE 5: 실사용 효능 결과
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 실사용 효능 결과
- Stat 1~3: [수치] / [항목] / [설명]
- Source: [자료 출처]

---
SLIDE 6: 실사용 안전성 결과
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 실사용 안전성 결과
- Stat 1~3: [수치] / [안전성 항목] / [설명]

---
SLIDE 7: 서브그룹 분석
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 환자군별 서브그룹 분석
- Card 1: [환자군1] / [결과]
- Card 2: [환자군2] / [결과]
- Card 3: [환자군3] / [결과]
- Card 4: [환자군4] / [결과]

---
SLIDE 8: RCT vs RWE 비교
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 임상 vs 실사용 결과 비교
- Left Header: 임상시험 결과
- Left Bullets 1~4: [RCT 결과]
- Right Header: 실사용 결과 (RWE)
- Right Bullets 1~4: [RWE 결과]

---
SLIDE 9: 임상적 시사점
---
→ USE TEMPLATE: FEATURE CARDS ×3

[CONTENT]
- Title: 처방에 주는 시사점
- Card 1~3: [시사점 제목] / [내용]

---
SLIDE 10: CLOSING
---
[CONTENT]
- Main Text: 현실이 증명한 [제품명]
- Subtext: 실제 환자에서도 효과는 같습니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #14 — 가이드라인 업데이트 소개 (Category C)
// ══════════════════════════════════════════════════════════════
const PROMPT_14 = `${header('Guideline Green', 8, ...C_C)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 가이드라인 업데이트
- Title: [학회명] [연도] 가이드라인 개정
- Subtitle: 달라진 것, 알고 처방하세요
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 최신 가이드라인 개요
---
→ USE TEMPLATE: FEATURE CARDS ×3

[CONTENT]
- Title: [연도] 가이드라인 개요
- Card 1: 발표 학회 / [학회명]
- Card 2: 개정 연도 / [연도] — 이전 개정: [이전 연도]
- Card 3: 핵심 변경 방향 / [한 줄 요약]

---
SLIDE 3: 주요 변경 사항
---
→ USE TEMPLATE: PROCESS STEPS ×4 (bullet list variant: replace steps with 5 bullet items, start Y=280, 56px line-height, bullet circle 10px accent)

[CONTENT]
- Title: 이번 개정의 핵심 변경사항
- Bullet 1~5: [변경 사항 각 30자]

---
SLIDE 4: Before vs After
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 개정 전 vs 개정 후
- Left Header: 기존 가이드라인
- Left Bullets 1~4: [기존 권고 사항]
- Right Header: 최신 가이드라인
- Right Bullets 1~4: [변경된 권고 사항]

---
SLIDE 5: 우리 제품의 위치
---
→ USE TEMPLATE: PROCESS STEPS ×4 (치료 단계)

[CONTENT]
- Title: 새 가이드라인에서 [제품명]의 위치
- Step 1: [1차 치료] / [권고 등급]
- Step 2: [2차 치료] / [권고 등급]
- Step 3: [특수 상황] / [권고 사항]
- Step 4: [병용 요법] / [권고 사항]

---
SLIDE 6: 처방 권고 등급
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: [제품명] 처방 권고 등급
- Stat 1: [권고 등급, 예: Class I] / 처방 권고 등급 / [근거 수준]
- Stat 2: [근거 수준, 예: Level A] / 근거 수준 / [설명]
- Stat 3: [처방 대상 환자%] / 해당 환자 비율 / [설명]

---
SLIDE 7: 임상 적용 방법
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 새 가이드라인 적용 방법
- Step 1: 환자 평가 / [방법]
- Step 2: 적응증 확인 / [기준]
- Step 3: 용량 결정 / [방법]
- Step 4: 모니터링 / [방법]

---
SLIDE 8: CLOSING
---
[CONTENT]
- Main Text: 가이드라인이 선택한 [제품명]
- Subtext: 최신 기준에 맞는 처방을 함께 만들어 갑니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #15 — 부작용·안전성 프로파일 설명 (Category C)
// ══════════════════════════════════════════════════════════════
const PROMPT_15 = `${header('Safety Green', 8, ...C_C)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 안전성 프로파일
- Title: [제품명] 안전성 심층 분석
- Subtitle: 알고 처방하면 더 안심입니다
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 안전성 개요
---
→ USE TEMPLATE: STAT BOX ×3 (핵심 안전성 지표)

[CONTENT]
- Title: 안전성 핵심 지표
- Stat 1: [전체 이상반응률] / 전체 이상반응 / 대조군 대비
- Stat 2: [중대 이상반응률] / 중대 이상반응 / 대조군 대비
- Stat 3: [투약 중단율] / 이상반응으로 인한 중단 / 대조군 대비
- Source: 출처: [임상 연구명, 연도]

---
SLIDE 3: 주요 이상반응 빈도
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 주요 이상반응 발생 빈도
- Card 1: [이상반응1] / [발생률] — [대조군 비교]
- Card 2: [이상반응2] / [발생률] — [대조군 비교]
- Card 3: [이상반응3] / [발생률] — [대조군 비교]
- Card 4: [이상반응4] / [발생률] — [대조군 비교]

---
SLIDE 4: 타사 제품 안전성 비교
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 타사 대비 안전성 비교
- Left Header: [제품명]
- Left Bullets 1~4: [안전성 우위]
- Right Header: 타사 동일 계열
- Right Bullets 1~4: [상대적 위험]

---
SLIDE 5: 위험 환자군 관리
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 주의가 필요한 환자군
- Card 1: [위험 환자군1] / [관리 방법]
- Card 2: [위험 환자군2] / [관리 방법]
- Card 3: [위험 환자군3] / [관리 방법]
- Card 4: [금기 환자군] / [기준]

---
SLIDE 6: 모니터링 방법
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 처방 후 모니터링 프로토콜
- Step 1: 처방 전 확인 / [체크리스트]
- Step 2: 초기 모니터링 / [기간 및 방법]
- Step 3: 정기 모니터링 / [주기 및 항목]
- Step 4: 이상반응 발생 시 / [대응 방법]

---
SLIDE 7: 이상반응 대처법
---
→ USE TEMPLATE: SUPPORT CARDS ×3 (STACKED)

[CONTENT]
- Title: 이상반응 발생 시 대처법
- Card 1: [경미한 이상반응] / [대처 방법]
- Card 2: [중등도 이상반응] / [대처 방법]
- Card 3: [즉시 중단 기준] / [기준 및 방법]

---
SLIDE 8: CLOSING
---
[CONTENT]
- Main Text: 알고 처방하면 안심입니다
- Subtext: 이상반응 발생 시 즉시 연락 주세요. 24시간 대응합니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #16 — 학술 세미나 발표 자료 (Category C)
// ══════════════════════════════════════════════════════════════
const PROMPT_16 = `${header('Seminar Green', 20, ...C_C)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 학술 세미나
- Title: [세미나 주제]
- Subtitle: [부제목]
- Presenter: [발표자명] | [소속/직함]
- Date: [발표 날짜] | [장소/병원명]

---
SLIDE 2: 발표자 소개
---
→ USE TEMPLATE: TWO-COLUMN (MR INTRO) — Profile + Career

[CONTENT]
- Name: [발표자명]
- Title: [직함/소속]
- Career 1~4: [경력 사항]
- Contact: [이메일]

---
SLIDE 3: 목차
---
[CONTENT]
- Chapter 1: 질환 이해 및 현황
- Chapter 2: 기존 치료의 한계
- Chapter 3: [제품명] 소개 및 기전
- Chapter 4: 임상 근거
- Chapter 5: 실제 처방 가이드

---
SLIDE 4: [질환명] 역학 및 현황 (Section 1)
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: [질환명] 국내외 현황
- Stat 1: [유병률] / 국내 유병률 / [출처]
- Stat 2: [진단율] / 진단율 / [설명]
- Stat 3: [치료율] / 적절한 치료율 / [설명]

---
SLIDE 5: 질환 기전
---
Layout: Title TOP-LEFT + Image + Bullets

[CONTENT]
- Title: [질환명] 발생 기전
- Image: [기전 다이어그램]
- Bullet 1~4: [기전 핵심 포인트]

---
SLIDE 6: 기존 치료의 한계 (Section 2)
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 기존 치료의 미충족 수요
- Left Header: 기존 치료 방식
- Bullets 1~4: [기존 치료 특징]
- Right Header: 해결되지 않은 문제
- Bullets 1~4: [미충족 수요]

---
SLIDE 7: 새로운 치료 패러다임
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 치료 패러다임의 변화
- Step 1~4: [변화 단계별 설명]

---
SLIDE 8: [제품명] 소개 (Section 3)
---
→ USE TEMPLATE: COMPARISON ×2 (50/50 split)

[CONTENT]
- Product Name: [제품명]
- Caption: [성분명 / 제형]
- Feature 1~3: [특징] / [설명]

---
SLIDE 9: 작용 기전
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 작용 기전
- Step 1~4: [기전 단계]

---
SLIDE 10: 제품 특징
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: [제품명]의 차별화된 특징
- Card 1~4: [특징 제목] / [설명]

---
SLIDE 11: 주요 임상 1 — 효능 (Section 4)
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 주요 임상 연구 1 — 효능
- Subtitle: [연구명]
- Stat 1~3: [수치] / [항목] / [설명]
- Source: [출처]

---
SLIDE 12: 주요 임상 2 — 비교 효과
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 대조군 대비 우월성
- Left: [제품명] 투여군 결과
- Right: 대조군/위약 결과

---
SLIDE 13: 안전성 결과
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 안전성 프로파일
- Stat 1~3: [안전성 지표] / [수치] / [비교]

---
SLIDE 14: 처방 대상 (Section 5)
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 적합한 처방 대상 환자
- Card 1~4: [환자 유형] / [설명]

---
SLIDE 15: 용법 용량
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 용법 · 용량 가이드
- Step 1: 초기 용량 / [내용]
- Step 2: 유지 용량 / [내용]
- Step 3: 증량 기준 / [내용]
- Step 4: 특수 상황 / [내용]

---
SLIDE 16: 가이드라인 내 위치
---
→ USE TEMPLATE: PROCESS STEPS ×4 (치료 알고리즘)

[CONTENT]
- Title: 치료 알고리즘 내 위치
- Step 1~4: [치료 단계 및 권고]

---
SLIDE 17: 처방 성공 케이스
---
Layout: Title TOP-LEFT + 2 Case Cards

[CONTENT]
- Title: 처방 케이스 소개
- Case 1: [환자 특성] → [처방 경과] → [결과]
- Case 2: [환자 특성] → [처방 경과] → [결과]

---
SLIDE 18: 핵심 메시지 요약
---
Layout: Title CENTERED + 3 Column Summary

[CONTENT]
- Column 1: 효능 / [핵심 메시지]
- Column 2: 안전성 / [핵심 메시지]
- Column 3: 편의성 / [핵심 메시지]

---
SLIDE 19: Q&A
---
→ USE TEMPLATE: COVER (all elements centered)\n
[CONTENT]
- Main: Q & A
- Subtitle: 궁금하신 점을 편하게 질문해 주세요
- Contact: [이메일] | [전화번호]

---
SLIDE 20: CLOSING
---
[CONTENT]
- Main Text: 감사합니다
- Subtext: Thank you for your attention
- Name: [발표자명] | [소속]
- Contact: [이메일] | [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #17 — 경쟁 제품 비교 분석표 (Category D)
// ══════════════════════════════════════════════════════════════
const PROMPT_17 = `${header('Competitive Red', 8, ...C_D)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 경쟁 제품 비교 분석
- Title: [제품명] vs 경쟁 제품
- Subtitle: 객관적 비교로 최선의 처방을
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 시장 현황
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: [계열/시장] 현황
- Stat 1: [시장 규모] / 국내 시장 규모 / [연도]
- Stat 2: [경쟁 제품 수] / 동일 계열 제품 수
- Stat 3: [우리 점유율] / 대웅 시장 점유율

---
SLIDE 3: 제품 비교표 (전체)
---
Layout: Title TOP-LEFT + Large Comparison Table Card
3~4 제품을 항목별로 비교 (효능/안전성/편의성/가격)

[CONTENT]
- Title: 주요 제품 종합 비교
- Product List: [제품명A(대웅)] / [제품명B] / [제품명C]
- Row 1: 성분 / [각 제품 성분]
- Row 2: 적응증 / [각 제품 적응증]
- Row 3: 급여 / [각 제품 급여 상태]
- Row 4: 용법 / [각 제품 복용법]

---
SLIDE 4: 효능 비교
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 효능 비교
- Left Header: [제품명] (대웅)
- Left Bullets 1~4: [효능 우위 각 20자]
- Right Header: 주요 경쟁 제품
- Right Bullets 1~4: [상대적 비교 각 20자]

---
SLIDE 5: 안전성 비교
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 안전성 비교
- Left Header: [제품명] (대웅)
- Left Bullets 1~4: [안전성 우위]
- Right Header: 주요 경쟁 제품
- Right Bullets 1~4: [상대적 안전성]

---
SLIDE 6: 편의성/복용법 비교
---
→ USE TEMPLATE: FEATURE CARDS ×3

[CONTENT]
- Title: 복용 편의성 비교
- Card 1: 복용 횟수 / [제품명]: [횟수] vs 경쟁: [횟수]
- Card 2: 제형 / [제형 비교]
- Card 3: 보관 / [보관 조건 비교]

---
SLIDE 7: 가격 비교
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 가격 비교 (환자 부담)
- Stat 1: [제품명] 본인부담 / 월 / [금액]
- Stat 2: 경쟁 제품 평균 / 월 / [금액]
- Stat 3: 환자 절감 금액 / 연간 / [금액]

---
SLIDE 8: CLOSING
---
[CONTENT]
- Main Text: 비교해 보면 [제품명]입니다
- Subtext: 선생님의 최선의 선택을 지원하겠습니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #18 — 타사 → 대웅 스위칭 제안 (Category D)
// ══════════════════════════════════════════════════════════════
const PROMPT_18 = `${header('Switch Red', 8, ...C_D)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 처방 전환 제안
- Title: [타사 제품명]에서 [제품명]으로
- Subtitle: 더 나은 선택을 위한 전환 제안
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 현재 처방 상황 분석
---
→ USE TEMPLATE: FEATURE CARDS ×3

[CONTENT]
- Title: 현재 [타사 제품명] 처방 현황
- Card 1: 처방 기간 / [추정 기간]
- Card 2: 주요 처방 환자군 / [특성]
- Card 3: 알려진 한계점 / [타사 제품의 주요 이슈]

---
SLIDE 3: 전환 이유 1 — 효능
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 효능 측면의 전환 이유
- Left Header: [타사 제품명]
- Left Bullets 1~4: [타사 제품 효능 한계]
- Right Header: [제품명] (대웅)
- Right Bullets 1~4: [우월한 효능 포인트]

---
SLIDE 4: 전환 이유 2 — 안전성
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 안전성 측면의 전환 이유
- Left Header: [타사 제품명]
- Left Bullets 1~4: [타사 안전성 이슈]
- Right Header: [제품명] (대웅)
- Right Bullets 1~4: [개선된 안전성]

---
SLIDE 5: 전환 이유 3 — 편의성/비용
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 편의성 & 경제성 비교
- Stat 1: [복용 편의성 비교] / 복용 방법
- Stat 2: [환자 부담금 비교] / 월 환자 부담
- Stat 3: [순응도 비교] / 복약 순응도

---
SLIDE 6: 전환 시 주의사항
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 안전한 처방 전환을 위한 체크리스트
- Step 1: 전환 전 환자 상태 확인 / [방법]
- Step 2: 용량 조절 방법 / [가이드]
- Step 3: 초기 모니터링 / [기간/방법]
- Step 4: 추적 관찰 / [방법]

---
SLIDE 7: 단계별 전환 계획
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 처방 전환 로드맵
- Step 1: 1주차 / [전환 시작 방법]
- Step 2: 2~4주차 / [초기 모니터링]
- Step 3: 1~3개월 / [유지 및 평가]
- Step 4: 3개월 이후 / [장기 관리]

---
SLIDE 8: CLOSING
---
[CONTENT]
- Main Text: 더 나은 처방으로 전환하세요
- Subtext: 전환 과정의 모든 것을 함께 하겠습니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #19 — 제네릭 대응 전략 (Category D)
// ══════════════════════════════════════════════════════════════
const PROMPT_19 = `${header('Original Red', 8, ...C_D)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 오리지널 처방 유지
- Title: 오리지널 [제품명]을 지켜야 하는 이유
- Subtitle: 제네릭이 같다고 생각하십니까?
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 오리지널 vs 제네릭
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 오리지널과 제네릭의 차이
- Left Header: 오리지널 [제품명]
- Left Bullets 1~4: [오리지널 특징 및 강점]
- Right Header: 제네릭 의약품
- Right Bullets 1~4: [제네릭 한계]

---
SLIDE 3: 품질 동등성의 한계
---
→ USE TEMPLATE: FEATURE CARDS ×3

[CONTENT]
- Title: 생물학적 동등성의 한계
- Card 1: 허용 범위 / BE 기준 80~125% — 실제 차이 가능
- Card 2: 첨가제 차이 / [오리지널 vs 제네릭 성분 차이]
- Card 3: 제조 공정 / [차이 설명]

---
SLIDE 4: 임상 데이터 비교
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 오리지널 임상 데이터
- Subtitle: 제네릭에는 없는 오리지널만의 근거
- Stat 1~3: [수치] / [오리지널 임상 근거] / [설명]
- Source: 출처: [학술지명]

---
SLIDE 5: 처방 전환 시 리스크
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 제네릭 전환 시 예상 리스크
- Card 1: 효능 변화 가능성 / [설명]
- Card 2: 이상반응 프로파일 변화 / [설명]
- Card 3: 환자 혼란 및 순응도 저하 / [설명]
- Card 4: 안정적 처방 패턴 붕괴 / [설명]

---
SLIDE 6: 환자 안전성 고려
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 환자 안전을 위한 선택
- Left Header: 오리지널 유지 시
- Left Bullets 1~4: [안전성 이점]
- Right Header: 제네릭 전환 시
- Right Bullets 1~4: [주의해야 할 점]

---
SLIDE 7: 오리지널 유지 이유 요약
---
Layout: Title CENTERED + 3 Column Summary + CTA

[CONTENT]
- Column 1: 품질 / [오리지널 품질 강점]
- Column 2: 근거 / [임상 근거 우위]
- Column 3: 안전 / [환자 안전성]
- CTA: 오리지널 처방, 계속 믿어 주세요

---
SLIDE 8: CLOSING
---
[CONTENT]
- Main Text: 처음의 선택이 옳았습니다
- Subtext: 오리지널 [제품명], 변함없이 함께 하겠습니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #20 — 가격 vs 효능 포지셔닝 (Category D)
// ══════════════════════════════════════════════════════════════
const PROMPT_20 = `${header('Value Red', 7, ...C_D)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 비용 효과성 분석
- Title: [제품명], 비용 이상의 가치
- Subtitle: 가격이 아닌 결과로 판단하세요
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 가격 논쟁의 핵심
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 단순 가격 비교의 함정
- Left Header: 표면적 비용만 볼 때
- Left Bullets 1~4: [저가 제품 선택 시 문제]
- Right Header: 총 치료 비용으로 볼 때
- Right Bullets 1~4: [올바른 비교 관점]

---
SLIDE 3: 총 치료 비용 분석
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 총 치료 비용 (Total Cost of Care)
- Stat 1: [약제비 단가] / 약제비 / [비교 기준]
- Stat 2: [재발/재입원 비용 절감] / 재발 예방 절감액 / 연간
- Stat 3: [총 치료 비용 비교] / 총 치료 비용 / 타사 대비

---
SLIDE 4: 효능 차이 데이터
---
→ USE TEMPLATE: STAT BOX ×3 (효능 우위)

[CONTENT]
- Title: 더 높은 가격, 더 확실한 효능
- Stat 1~3: [효능 수치] / [항목] / [비교 데이터]
- Source: 출처: [학술지명]

---
SLIDE 5: 재발·입원 비용 비교
---
→ USE TEMPLATE: PROCESS STEPS ×4 (비용 흐름)

[CONTENT]
- Title: 치료 실패 시 추가 비용
- Step 1: 재발 시 추가 진료비 / [금액 추정]
- Step 2: 재입원 비용 / [금액 추정]
- Step 3: 생산성 손실 / [추정]
- Step 4: 총 추가 비용 / [합계]

---
SLIDE 6: 비용 효과성 결론
---
Layout: Title CENTERED + 3 Column Summary + CTA

[CONTENT]
- Column 1: 약제 비용 / [비교 수치]
- Column 2: 총 치료 비용 / [비교 수치]
- Column 3: 효능 차이 / [비교 수치]
- CTA: 진짜 비용 효과적인 선택은 [제품명]입니다

---
SLIDE 7: CLOSING
---
[CONTENT]
- Main Text: 가치 있는 처방, [제품명]
- Subtext: 환자의 치료 결과가 최선의 투자입니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #21 — 환자 프로파일별 처방 추천 (Category E)
// ══════════════════════════════════════════════════════════════
const PROMPT_21 = `${header('Patient Amber', 8, ...C_E)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 환자 맞춤 처방 가이드
- Title: 어떤 환자에게 [제품명]을?
- Subtitle: 환자 프로파일별 처방 매칭 가이드
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 처방 결정 기준
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: [제품명] 처방 결정 흐름
- Step 1: 적응증 해당 여부 확인 / [기준]
- Step 2: 금기 사항 확인 / [주요 금기]
- Step 3: 환자 특성 매칭 / [매칭 기준]
- Step 4: 용량 결정 / [기준]

---
SLIDE 3: 프로파일 A — 1순위 처방 대상
---
Layout: Title TOP-LEFT + Large Profile Card
Card: 환자 특성 + 처방 이유 + 기대 효과

[CONTENT]
- Title: 1순위 처방 대상 환자
- Profile: [환자 유형 제목]
- Characteristics: [연령/성별/기저질환 등 특성 4가지]
- Why Prescribe: [처방해야 하는 이유 3가지]
- Expected: [기대 효과]

---
SLIDE 4: 프로파일 B — 적극 권장 환자
---
Layout: 위와 동일 구조

[CONTENT]
- Title: 적극 권장 환자
- Profile: [환자 유형 제목]
- Characteristics: [특성 4가지]
- Why Prescribe: [이유 3가지]
- Expected: [기대 효과]

---
SLIDE 5: 프로파일 C — 신중 처방 환자
---
→ USE TEMPLATE: PROFILE CARDS ×4 (single large card variant)\n
[CONTENT]
- Title: 신중하게 처방할 환자
- Profile: [환자 유형]
- Characteristics: [특성 4가지]
- Caution: [주의 사항 3가지]
- Monitor: [모니터링 포인트]

---
SLIDE 6: 프로파일 D — 금기/주의 환자
---
→ USE TEMPLATE: PROFILE CARDS ×4 (single large card variant)\n
[CONTENT]
- Title: 금기 및 주의 환자
- Profile: [환자 유형]
- Contraindication: [금기 사항]
- Alternative: [대안 처방]
- Note: [추가 주의사항]

---
SLIDE 7: 처방 매칭 요약표
---
Layout: Title TOP-LEFT + Large Summary Table Card
4가지 프로파일을 한 눈에 비교

[CONTENT]
- Title: 환자 프로파일 처방 매칭 요약
- Profile A: [유형] → [처방 권고 수준]
- Profile B: [유형] → [처방 권고 수준]
- Profile C: [유형] → [신중 처방]
- Profile D: [유형] → [금기/주의]

---
SLIDE 8: CLOSING
---
[CONTENT]
- Main Text: 맞는 환자에게 맞는 처방을
- Subtext: 궁금한 환자 케이스는 언제든지 상담해 주세요
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #22 — 처방 성공 케이스 스터디 (Category E)
// ══════════════════════════════════════════════════════════════
const PROMPT_22 = `${header('Case Amber', 8, ...C_E)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 처방 성공 케이스
- Title: [제품명] 처방 성공 사례
- Subtitle: 실제 현장에서 만난 변화
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 케이스 1 — 환자 소개
---
Layout: Title TOP-LEFT + Profile Card (환자 정보)

[CONTENT]
- Title: 케이스 1 환자 소개
- Age/Sex: [나이/성별]
- Diagnosis: [진단명]
- History: [기저질환 및 과거력]
- Chief Complaint: [주증상]
- Previous Tx: [이전 치료]

---
SLIDE 3: 처방 전 상황
---
→ USE TEMPLATE: COMPARISON ×2 (이전 vs 문제)

[CONTENT]
- Title: 처방 전 상황
- Left Header: 이전 치료 현황
- Left Bullets 1~4: [이전 치료 내용]
- Right Header: 해결되지 않은 문제
- Right Bullets 1~4: [미해결 증상/문제]

---
SLIDE 4: [제품명] 처방 과정
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: [제품명] 처방 결정 과정
- Step 1: 처방 결정 배경 / [이유]
- Step 2: 초기 용량 / [처방 내용]
- Step 3: 경과 관찰 / [모니터링]
- Step 4: 용량 조정 / [내용]

---
SLIDE 5: 치료 결과
---
→ USE TEMPLATE: STAT BOX ×3 (결과 수치)

[CONTENT]
- Title: 치료 결과
- Stat 1: [주요 지표 개선] / [항목] / [처방 전 vs 후]
- Stat 2: [증상 개선] / [항목] / [개선 정도]
- Stat 3: [환자 만족도/QOL] / 삶의 질 변화 / [내용]

---
SLIDE 6: 케이스 2 요약
---
→ USE TEMPLATE: PROCESS STEPS ×4 (bullet list variant: replace steps with 5 bullet items, start Y=280, 56px line-height, bullet circle 10px accent) (간략 케이스)

[CONTENT]
- Title: 케이스 2 — [두 번째 케이스 제목]
- Bullet 1: 환자: [특성 요약]
- Bullet 2: 처방 전: [문제 요약]
- Bullet 3: 처방 내용: [내용]
- Bullet 4: 결과: [결과 요약]
- Bullet 5: 핵심 교훈: [메시지]

---
SLIDE 7: 핵심 교훈
---
Layout: Title CENTERED + 3 Column Summary

[CONTENT]
- Column 1: 처방 성공 요인 / [요인]
- Column 2: 주의 포인트 / [포인트]
- Column 3: 선생님께 제안 / [제안]

---
SLIDE 8: CLOSING
---
[CONTENT]
- Main Text: 선생님 환자에게도 같은 변화를
- Subtext: 처방 관련 케이스 상담은 언제든 환영합니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #23 — 처방 전환 단계별 가이드 (Category E)
// ══════════════════════════════════════════════════════════════
const PROMPT_23 = `${header('Journey Amber', 8, ...C_E)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 처방 단계별 가이드
- Title: [제품명] 처방 성공 로드맵
- Subtitle: 첫 처방부터 장기 관리까지
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 처방 단계 개요
---
→ USE TEMPLATE: PROCESS STEPS ×4 (전체 단계)

[CONTENT]
- Title: 처방 성공을 위한 4단계
- Step 1: 첫 처방 / 올바른 시작
- Step 2: 초기 모니터링 / 4주 이내
- Step 3: 유지 처방 / 3개월
- Step 4: 장기 관리 / 6개월 이후

---
SLIDE 3: 1단계 — 첫 처방
---
Layout: Title TOP-LEFT + Large Step Card + Checklist

[CONTENT]
- Title: 1단계: 첫 처방 (Day 1)
- Checklist 1: 환자 선별 기준 확인 / [기준]
- Checklist 2: 금기 사항 확인 / [금기]
- Checklist 3: 초기 용량 결정 / [용량]
- Checklist 4: 환자 복약 교육 / [교육 포인트]
- MR Action: [MR이 해야 할 일]

---
SLIDE 4: 2단계 — 초기 모니터링 (4주)
---
Layout: Title TOP-LEFT + Large Step Card

[CONTENT]
- Title: 2단계: 초기 모니터링 (1~4주)
- Monitor 1: 효능 평가 / [평가 방법]
- Monitor 2: 이상반응 확인 / [확인 항목]
- Monitor 3: 복약 순응도 / [확인 방법]
- Monitor 4: 용량 조절 여부 / [기준]
- MR Action: [MR이 해야 할 일]

---
SLIDE 5: 3단계 — 유지 처방 (3개월)
---
Layout: Title TOP-LEFT + Large Step Card

[CONTENT]
- Title: 3단계: 유지 처방 (1~3개월)
- Action 1: 정기 효능 평가 / [방법]
- Action 2: 용량 최적화 / [기준]
- Action 3: 장기 안전성 모니터링 / [항목]
- Action 4: 처방 갱신 / [주기]
- MR Action: [MR이 해야 할 일]

---
SLIDE 6: 4단계 — 장기 관리 (6개월+)
---
Layout: Title TOP-LEFT + Large Step Card

[CONTENT]
- Title: 4단계: 장기 관리 (6개월 이후)
- Goal 1: 치료 목표 달성 확인 / [기준]
- Goal 2: 장기 안전성 / [모니터링]
- Goal 3: 삶의 질 평가 / [방법]
- Goal 4: 처방 지속 여부 결정 / [기준]
- MR Action: [MR이 해야 할 일]

---
SLIDE 7: 단계별 MR 지원
---
→ USE TEMPLATE: PROFILE CARDS ×4 (각 단계 지원)

[CONTENT]
- Title: 각 단계에서 MR의 역할
- Card 1: 첫 처방 시 / [MR 지원 내용]
- Card 2: 초기 모니터링 시 / [MR 지원 내용]
- Card 3: 유지 처방 시 / [MR 지원 내용]
- Card 4: 장기 관리 시 / [MR 지원 내용]

---
SLIDE 8: CLOSING
---
[CONTENT]
- Main Text: 처음부터 끝까지 함께 합니다
- Subtext: 각 단계에서 필요한 모든 것을 지원하겠습니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #24 — 적응증별 처방 플로우 (Category E)
// ══════════════════════════════════════════════════════════════
const PROMPT_24 = `${header('Flow Amber', 8, ...C_E)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 적응증별 처방 플로우
- Title: [제품명] 처방 플로우 가이드
- Subtitle: 적응증별 최적 처방 경로
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 전체 처방 플로우
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: [제품명] 전체 처방 플로우
- Step 1: 환자 스크리닝 / [진단 기준]
- Step 2: 적응증 확인 / [적응증 목록]
- Step 3: 처방 결정 / [결정 기준]
- Step 4: 모니터링 / [방법]

---
SLIDE 3: 적응증 A — 처방 플로우
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: [적응증A] 처방 플로우
- Step 1: 진단 기준 / [기준]
- Step 2: 환자 선별 / [기준]
- Step 3: 초기 용량 / [용량]
- Step 4: 효능 평가 및 조절 / [방법]

---
SLIDE 4: 적응증 B — 처방 플로우
---
Layout: 위와 동일

[CONTENT]
- Title: [적응증B] 처방 플로우
- Step 1~4: [각 단계 내용]

---
SLIDE 5: 환자 선별 기준
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 처방 적합/부적합 기준
- Left Header: 처방 적합 환자
- Left Bullets 1~4: [포함 기준]
- Right Header: 처방 제외 환자
- Right Bullets 1~4: [제외 기준/금기]

---
SLIDE 6: 용량 선택 가이드
---
→ USE TEMPLATE: FEATURE CARDS ×3

[CONTENT]
- Title: 상황별 용량 선택 가이드
- Card 1: 일반 성인 / [용량]
- Card 2: 고령 환자 / [용량 조절]
- Card 3: 신/간기능 저하 / [용량 조절]

---
SLIDE 7: 모니터링 플로우
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 처방 후 모니터링 플로우
- Step 1: 처방 1주 후 / [확인 항목]
- Step 2: 처방 1개월 후 / [확인 항목]
- Step 3: 처방 3개월 후 / [확인 항목]
- Step 4: 장기 관리 / [관리 방법]

---
SLIDE 8: CLOSING
---
[CONTENT]
- Main Text: 플로우를 알면 처방이 쉬워집니다
- Subtext: 처방 과정의 모든 단계를 함께 하겠습니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #25 — 주간 영업 활동 보고 (Category F)
// ══════════════════════════════════════════════════════════════
const PROMPT_25 = `${header('Weekly Report Cyan', 6, ...C_F)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 주간 영업 보고
- Title: [주차] 주간 영업 활동 보고
- Subtitle: [날짜 범위, 예: 04.14 ~ 04.18]
- Reporter: [MR 이름] | 대웅제약 ETC [지역]본부
- Date: [보고 날짜]

---
SLIDE 2: 주간 활동 요약
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 이번 주 활동 요약
- Stat 1: [방문 거래처 수] / 방문 거래처 / [목표 대비]
- Stat 2: [신규 거래처] / 신규 개척 / [목표 대비]
- Stat 3: [처방 확인 건수] / 처방 확인 / [전주 대비]

---
SLIDE 3: 처방 변화 현황
---
→ USE TEMPLATE: PROFILE CARDS ×4 (주요 거래처별)

[CONTENT]
- Title: 주요 거래처 처방 변화
- Card 1: [거래처명] / [처방 변화 내용]
- Card 2: [거래처명] / [처방 변화 내용]
- Card 3: [거래처명] / [처방 변화 내용]
- Card 4: [거래처명] / [처방 변화 내용]

---
SLIDE 4: 주요 이슈 및 기회
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 이슈 & 기회
- Left Header: 주요 이슈
- Left Bullets 1~4: [이슈 내용]
- Right Header: 발굴된 기회
- Right Bullets 1~4: [기회 내용]

---
SLIDE 5: 다음 주 계획
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 다음 주 활동 계획
- Step 1: 월요일 / [계획]
- Step 2: 화~수요일 / [계획]
- Step 3: 목요일 / [계획]
- Step 4: 금요일 / [계획 및 주간 마무리]

---
SLIDE 6: 지원 요청 사항
---
→ USE TEMPLATE: SUPPORT CARDS ×3 (STACKED)

[CONTENT]
- Title: 본사/지점 지원 요청
- Request 1: [요청 사항1] / [이유 및 필요 시기]
- Request 2: [요청 사항2] / [이유]
- Request 3: [기타 요청] / [내용]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #26 — 월간 성과 & 목표 현황 (Category F)
// ══════════════════════════════════════════════════════════════
const PROMPT_26 = `${header('Monthly Report Cyan', 8, ...C_F)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 월간 성과 보고
- Title: [월]월 영업 성과 보고
- Subtitle: [연도]년 [월]월 실적 및 분석
- Reporter: [MR 이름] | 대웅제약 ETC [지역]본부
- Date: [보고 날짜]

---
SLIDE 2: 이달 성과 요약
---
→ USE TEMPLATE: STAT BOX ×3 (핵심 KPI)

[CONTENT]
- Title: [월]월 핵심 성과
- Stat 1: [매출/처방 달성률] / 목표 달성률 / 전월 대비 [+/-]%
- Stat 2: [방문 거래처 수] / 활동 거래처 / 목표 대비
- Stat 3: [신규 거래처] / 신규 개척 / 누적 [연간]

---
SLIDE 3: 목표 대비 달성률
---
→ USE TEMPLATE: PROCESS STEPS ×4 (제품별)

[CONTENT]
- Title: 제품별 목표 달성 현황
- Step 1: [제품A] / 목표 [X] → 실적 [Y] ([달성률]%)
- Step 2: [제품B] / 목표 [X] → 실적 [Y] ([달성률]%)
- Step 3: [제품C] / 목표 [X] → 실적 [Y] ([달성률]%)
- Step 4: 합계 / 목표 [X] → 실적 [Y] ([달성률]%)

---
SLIDE 4: 제품별 처방 현황
---
→ USE TEMPLATE: STAT BOX ×3 (제품별)

[CONTENT]
- Title: 제품별 처방 현황
- Stat 1: [제품A] / [처방 수 또는 매출] / 전월 대비
- Stat 2: [제품B] / [처방 수 또는 매출] / 전월 대비
- Stat 3: [제품C] / [처방 수 또는 매출] / 전월 대비

---
SLIDE 5: 거래처별 현황
---
→ USE TEMPLATE: PROFILE CARDS ×4 (주요 거래처)

[CONTENT]
- Title: 주요 거래처별 현황
- Card 1~4: [거래처명] / [처방 상태 및 특이 사항]

---
SLIDE 6: 주요 이슈 분석
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 주요 성공 요인 & 이슈
- Left Header: 성공 요인
- Left Bullets 1~4: [성공 요인]
- Right Header: 해결 필요 이슈
- Right Bullets 1~4: [이슈 및 대응 방안]

---
SLIDE 7: 다음 달 계획
---
→ USE TEMPLATE: FEATURE CARDS ×3

[CONTENT]
- Title: [다음 월]월 핵심 활동 계획
- Card 1: 목표 / [목표 수치]
- Card 2: 중점 거래처 / [목록]
- Card 3: 핵심 활동 / [활동 계획]

---
SLIDE 8: CLOSING (지원 요청)
---
Layout: Title TOP-LEFT + 3 Support Cards

[CONTENT]
- Title: 다음 달을 위한 지원 요청
- Request 1~3: [요청 사항] / [이유 및 기한]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #27 — 분기 전략 계획 발표 (Category F)
// ══════════════════════════════════════════════════════════════
const PROMPT_27 = `${header('Quarterly Cyan', 10, ...C_F)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: [연도] [분기] 전략 발표
- Title: [연도]년 [분기] 영업 전략
- Subtitle: 목표 달성을 위한 핵심 전략과 실행 계획
- Reporter: [MR 이름] | 대웅제약 ETC [지역]본부
- Date: [발표 날짜]

---
SLIDE 2: 지난 분기 리뷰
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 전 분기 성과 요약
- Stat 1: [매출 달성률] / 목표 달성률 / [전년 동기 대비]
- Stat 2: [활동 거래처] / 거래처 확보 / [전 분기 대비]
- Stat 3: [신규 개척] / 신규 거래처 / [전 분기 대비]

---
SLIDE 3: KPI 달성 현황
---
→ USE TEMPLATE: PROCESS STEPS ×4 (KPI별)

[CONTENT]
- Title: 전 분기 KPI 달성 현황
- Step 1: [KPI1] / 목표 [X] → 실적 [Y]
- Step 2: [KPI2] / 목표 [X] → 실적 [Y]
- Step 3: [KPI3] / 목표 [X] → 실적 [Y]
- Step 4: [KPI4] / 목표 [X] → 실적 [Y]

---
SLIDE 4: 시장 환경 분석
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: [분기] 시장 환경
- Left Header: 기회 요인 (Opportunity)
- Left Bullets 1~4: [기회 요인]
- Right Header: 위협 요인 (Threat)
- Right Bullets 1~4: [위협 요인]

---
SLIDE 5: 이번 분기 목표
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: [분기] 목표
- Stat 1: [매출 목표] / 분기 매출 목표 / 전년 대비 [+X]%
- Stat 2: [활동 목표] / 활동 거래처 목표
- Stat 3: [신규 목표] / 신규 개척 목표

---
SLIDE 6: 중점 거래처 전략
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 거래처별 중점 전략
- Card 1: A등급 거래처 / [전략]
- Card 2: B등급 거래처 / [전략]
- Card 3: 신규 타겟 / [전략]
- Card 4: 휴면 재활성화 / [전략]

---
SLIDE 7: 제품별 전략
---
→ USE TEMPLATE: FEATURE CARDS ×3

[CONTENT]
- Title: 제품별 분기 전략
- Card 1: [제품A] / [목표 및 전략]
- Card 2: [제품B] / [목표 및 전략]
- Card 3: [제품C] / [목표 및 전략]

---
SLIDE 8: 월별 활동 계획
---
→ USE TEMPLATE: PROCESS STEPS ×4 (월별)

[CONTENT]
- Title: 월별 핵심 활동 계획
- Step 1: [분기 1월] / [핵심 활동]
- Step 2: [분기 2월] / [핵심 활동]
- Step 3: [분기 3월] / [핵심 활동]
- Step 4: 분기 마무리 / [평가 및 피드백]

---
SLIDE 9: 지원 요청
---
Layout: Title TOP-LEFT + 3 Support Cards

[CONTENT]
- Title: 본사/지점 지원 요청
- Request 1~3: [요청 내용] / [이유 및 기한]

---
SLIDE 10: CLOSING
---
[CONTENT]
- Main Text: [분기] 반드시 달성합니다
- Subtext: 팀의 지원과 함께 최선을 다하겠습니다
- Name: [MR 이름] | 연락처: [전화번호]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #28 — 런치 미팅 / 제품 설명회 (Category G)
// ══════════════════════════════════════════════════════════════
const PROMPT_28 = `${header('Lunch Pink', 6, ...C_G)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 런치 미팅 · 제품 설명회
- Title: [제품명] 5분 핵심 요약
- Subtitle: 점심 시간을 빌려 드리는 중요한 이야기
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: 핵심 메시지 1 — 제품 소개
---
→ USE TEMPLATE: COMPARISON ×2 (50/50 split) — visual + bullets
Maximum impact, minimal text

[CONTENT]
- Title: [제품명]이란?
- Image Caption: [성분명 / 제형]
- Bullet 1: [핵심 특징1 — 20자 이내]
- Bullet 2: [핵심 특징2 — 20자 이내]
- Bullet 3: [핵심 특징3 — 20자 이내]

---
SLIDE 3: 핵심 데이터 — 임팩트 있게
---
Layout: Title TOP-LEFT + 3 Large Stat Boxes
Make numbers BIG and BOLD — maximum visual impact

[CONTENT]
- Title: 숫자로 보는 [제품명]
- Stat 1: [가장 임팩트 있는 수치] / [항목] / [설명]
- Stat 2: [두 번째 수치] / [항목] / [설명]
- Stat 3: [세 번째 수치] / [항목] / [설명]
- Source: [출처]

---
SLIDE 4: 이런 환자에게 처방하세요
---
→ USE TEMPLATE: PROFILE CARDS ×4 (간결하게)

[CONTENT]
- Title: 처방 1순위 환자
- Card 1~4: [환자 유형] / [한 줄 설명]

---
SLIDE 5: 지원 안내
---
→ USE TEMPLATE: SUPPORT CARDS ×3 (STACKED) (간결)

[CONTENT]
- Title: 처방 후 지원
- Support 1~3: [지원명] / [한 줄 설명]

---
SLIDE 6: CLOSING
---
→ USE TEMPLATE: COVER (all elements centered)\n
[CONTENT]
- Main Text: 바쁘신 중 감사합니다
- Subtext: 궁금하신 점은 편하게 연락 주세요
- Name: [MR 이름]
- Phone: [연락처]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #29 — 심포지엄 발표 자료 (Category G)
// ══════════════════════════════════════════════════════════════
const PROMPT_29 = `${header('Symposium Pink', 20, ...C_G)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
[CONTENT]
- Badge: 의학 심포지엄
- Title: [심포지엄 주제]
- Subtitle: [부제목]
- Presenter: [발표자명 MD, PhD] | [병원/기관명]
- Event: [심포지엄명] · [날짜] · [장소]

---
SLIDE 2: 발표자 소개
---
→ USE TEMPLATE: TWO-COLUMN (MR INTRO)

[CONTENT]
- Name: [발표자명]
- Affiliation: [소속 병원/대학]
- Title: [직함]
- Career 1~4: [주요 경력]
- Research: [주요 연구 분야]

---
SLIDE 3: 심포지엄 목차
---
[CONTENT]
- Chapter 1: [질환] 최신 가이드라인
- Chapter 2: 미충족 수요와 새로운 접근
- Chapter 3: [제품명] 임상 근거
- Chapter 4: 실제 처방 경험
- Chapter 5: Q&A

---
SLIDE 4: 최신 가이드라인 개요
---
→ USE TEMPLATE: FEATURE CARDS ×3

[CONTENT]
- Title: [연도] 최신 가이드라인
- Card 1: 주요 변경 사항 / [내용]
- Card 2: 처방 권고 등급 / [등급]
- Card 3: 임상 적용 핵심 / [내용]

---
SLIDE 5: 질환 부담 및 역학
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: [질환명] 질병 부담
- Stat 1~3: [역학 수치] / [항목] / [출처]

---
SLIDE 6: 현재 치료의 미충족 수요
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: 해결되지 않은 임상적 과제
- Left Header: 현재 치료로 가능한 것
- Left Bullets 1~4: [가능한 것]
- Right Header: 여전히 부족한 것
- Right Bullets 1~4: [미충족 수요]

---
SLIDE 7: 새로운 치료 접근법
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 새로운 치료 패러다임
- Step 1~4: [새로운 접근 단계]

---
SLIDE 8: [제품명] 소개
---
→ USE TEMPLATE: COMPARISON ×2 (50/50 split)

[CONTENT]
- Product Name: [제품명]
- Caption: [성분명 / 제형]
- Feature 1~3: [특징] / [설명]

---
SLIDE 9: 작용 기전
---
→ USE TEMPLATE: PROCESS STEPS ×4

[CONTENT]
- Title: 작용 기전 (MOA)
- Step 1~4: [기전 단계]

---
SLIDE 10: 핵심 임상 연구 1
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: [임상 연구1명]
- Stat 1~3: [수치] / [endpoint] / [설명]
- Source: [출처]

---
SLIDE 11: 핵심 임상 연구 2
---
→ USE TEMPLATE: COMPARISON ×2

[CONTENT]
- Title: [임상 연구2명] — 대조 연구
- Left: [제품명] 투여군 결과
- Right: 대조군 결과

---
SLIDE 12: 메타분석 결과
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 메타분석 종합 결과
- Stat 1~3: [수치] / [항목] / [CI 또는 p값]
- Source: [메타분석 출처]

---
SLIDE 13: 안전성 종합
---
→ USE TEMPLATE: STAT BOX ×3

[CONTENT]
- Title: 안전성 종합 결과
- Stat 1~3: [안전성 수치] / [항목] / [설명]

---
SLIDE 14: 특수 집단 데이터
---
→ USE TEMPLATE: PROFILE CARDS ×4

[CONTENT]
- Title: 특수 환자군 데이터
- Card 1~4: [특수 집단] / [데이터 결과]

---
SLIDE 15: 가이드라인 내 위치
---
→ USE TEMPLATE: PROCESS STEPS ×4 (알고리즘)

[CONTENT]
- Title: 치료 알고리즘 내 [제품명]의 위치
- Step 1~4: [치료 단계 및 권고]

---
SLIDE 16: 실제 처방 경험 1
---
Layout: Title TOP-LEFT + Large Case Card

[CONTENT]
- Title: 임상 케이스 1
- Patient: [환자 특성]
- Before: [처방 전]
- Treatment: [처방 내용]
- Outcome: [결과]

---
SLIDE 17: 실제 처방 경험 2
---
Layout: Title TOP-LEFT + Large Case Card

[CONTENT]
- Title: 임상 케이스 2
- Patient/Before/Treatment/Outcome: [내용]

---
SLIDE 18: 핵심 메시지 요약
---
Layout: Title CENTERED + 3 Column Summary

[CONTENT]
- Column 1: 효능 / [핵심 메시지]
- Column 2: 안전성 / [핵심 메시지]
- Column 3: 임상 적용 / [핵심 메시지]

---
SLIDE 19: Q&A
---
Layout: ALL CENTERED

[CONTENT]
- Main: Q & A
- Subtitle: 질문과 토론을 환영합니다
- Contact: [이메일]

---
SLIDE 20: CLOSING
---
[CONTENT]
- Main Text: 감사합니다
- Subtext: Thank you for your attention
- Name: [발표자명] | [소속]
- Contact: [이메일]`


// ══════════════════════════════════════════════════════════════
// 프롬프트 #30 — 연말/시즌 인사 & 감사 자료 (Category G)
// ══════════════════════════════════════════════════════════════
const PROMPT_30 = `${header('Season Pink', 5, ...C_G)}
${RULES}

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
→ USE TEMPLATE: COVER (all elements centered)\nUse soft pink/warm tones, add subtle seasonal decorative elements

[CONTENT]
- Badge: [시즌명, 예: 2025 연말 인사]
- Title: 감사한 한 해였습니다
- Subtitle: [선생님 이름] 선생님께 드리는 진심
- From: [MR 이름] | 대웅제약 ETC [지역]본부
- Date: [날짜]

---
SLIDE 2: 올 한해 돌아보기
---
Layout: Title CENTERED + 3 Stat Boxes (함께한 기간 통계)
Warm, personal tone

[CONTENT]
- Title: 선생님과 함께한 [연도]년
- Stat 1: [방문 횟수] / 함께한 방문 횟수
- Stat 2: [처방 환자 수 추정] / 치료 받은 환자 추정
- Stat 3: [협력 기간] / 함께한 기간
- Note: *감사의 마음을 담아 준비한 수치입니다

---
SLIDE 3: 선생님께 감사한 점
---
→ USE TEMPLATE: PROFILE CARDS ×4 (감사 메시지)
Each card: warm icon + heartfelt message

[CONTENT]
- Title: 선생님께 감사한 것들
- Card 1: 환자를 위한 처방 / [감사 메시지]
- Card 2: 따뜻한 응대 / [감사 메시지]
- Card 3: 귀한 피드백 / [감사 메시지]
- Card 4: 믿음과 신뢰 / [감사 메시지]

---
SLIDE 4: 내년을 향한 약속
---
→ USE TEMPLATE: SUPPORT CARDS ×3 (STACKED)
Each card: promise/commitment to the doctor

[CONTENT]
- Title: [연도+1]년, 이렇게 함께 하겠습니다
- Promise 1: [약속1, 예: 더 빠른 응답] / [구체적 약속]
- Promise 2: [약속2, 예: 최신 정보 제공] / [구체적 약속]
- Promise 3: [약속3, 예: 환자 지원 강화] / [구체적 약속]

---
SLIDE 5: CLOSING
---
→ USE TEMPLATE: COVER (all elements centered)\n
[CONTENT]
- Main Text: 새해 복 많이 받으세요
- Subtext: 선생님의 건강과 행복을 진심으로 기원합니다
- Message: [개인화된 감사 메시지 1~2줄]
- From: [MR 이름] 드림 | [연락처]`


// ══════════════════════════════════════════════════════════════
// 실습1 — Genspark 프롬프트 30개
// ══════════════════════════════════════════════════════════════
export const prompts = [
  { id: 1,  section: 'session1', tool: 'genspark', category: 'L', title: '코퍼레이트 블루',   description: '화이트 배경 + 블루 포인트. 정돈된 비즈니스 문서 느낌. KPI 카드·비교 박스 중심.',              slides: 8, status: 'ready', promptText: PROMPT_01, version: 'v2' },
  { id: 7,  section: 'session1', tool: 'genspark', category: 'L', title: '클린 메디컬 그린',  description: '화이트 + 에메랄드 그린. 청결하고 신뢰감 있는 임상·헬스케어 스타일.',                              slides: 8, status: 'ready', promptText: PROMPT_07, version: 'v2' },
  { id: 25, section: 'session1', tool: 'genspark', category: 'L', title: '미니멀 슬레이트',   description: '연회색 배경 + 다크 슬레이트. 여백 중심의 절제된 세련미. 모던하고 깔끔한 레이아웃.',               slides: 8, status: 'ready', promptText: PROMPT_25, version: 'v2' },
  { id: 26, section: 'session1', tool: 'genspark', category: 'L', title: '프레쉬 민트',       description: '화이트 + 틸 민트 포인트. 신선하고 청량한 헬스케어 스타일.',                                         slides: 8, status: 'ready', promptText: PROMPT_26, version: 'v2' },
  { id: 2,  section: 'session1', tool: 'genspark', category: 'D', title: '딥 네이비 골드',    description: '다크 네이비 배경 + 골드 포인트. 프리미엄·고급스러운 분위기. 수치 박스 크게 강조.',                 slides: 8, status: 'ready', promptText: PROMPT_02, version: 'v2' },
  { id: 8,  section: 'session1', tool: 'genspark', category: 'D', title: '임팩트 다크',        description: '풀 다크 배경 + 시안 글로우. 강렬하고 현대적인 임팩트 PT 스타일. 대형 숫자 중심.',                   slides: 8, status: 'ready', promptText: PROMPT_08, version: 'v2' },
  { id: 21, section: 'session1', tool: 'genspark', category: 'D', title: '로얄 퍼플',          description: '딥 퍼플 배경 + 바이올렛 포인트. 고급감과 창의성. 혁신적인 분위기.',                                 slides: 8, status: 'ready', promptText: PROMPT_21, version: 'v2' },
  { id: 12, section: 'session1', tool: 'genspark', category: 'W', title: '웜 아이보리',        description: '크림 아이보리 배경 + 브라운 포인트. 학술·논문 스타일. 따뜻하고 격식 있는 분위기.',                 slides: 8, status: 'ready', promptText: PROMPT_12, version: 'v2' },
  { id: 17, section: 'session1', tool: 'genspark', category: 'W', title: '에너제틱 코랄',      description: '따뜻한 오렌지-코랄 톤. 둥근 카드와 친근한 아이콘. 활기차고 감성적인 분위기.',                       slides: 8, status: 'ready', promptText: PROMPT_17, version: 'v2' },
  { id: 28, section: 'session1', tool: 'genspark', category: 'W', title: '볼드 스칼렛',        description: '화이트 배경 + 딥 레드 포인트. 강렬하고 자신감 있는 임팩트 PT 스타일.',                              slides: 8, status: 'ready', promptText: PROMPT_28, version: 'v2' },

  // ══════════════════════════════════════════════════════════════
  // NotebookLM 슬라이드 디자인 프롬프트 30개 (실습1)
  // ══════════════════════════════════════════════════════════════

  // ── 심플 (5개) ──────────────────────────────────────────────
  { id: 101, section: 'session1', tool: 'notebooklm', category: 'nlm-simple',
    title: '화이트 미니멀',
    description: '순백 배경·모노크롬·넓은 여백. 불필요한 요소 없이 텍스트만으로 승부.',
    design: { bg: '#FFFFFF', accent: '#1A1A1A', type: '텍스트 중심' },
    status: 'ready',
    promptText: `[디자인 스타일] 화이트 미니멀
[컬러 시스템] 배경: #FFFFFF / 제목 텍스트: #111827 / 본문 텍스트: #374151 / 구분선: #E5E7EB / 포인트(키워드 강조): #1D4ED8
[레이아웃] 1단 중앙 정렬. 슬라이드 상단 20% 제목 영역(굵은 고딕, 큰 폰트), 나머지 80% 본문. 각 슬라이드 여백 비율 30% 이상 유지.
[디자인 특성] 아이콘·그래픽 사용 금지. 얇은 수평 구분선(#E5E7EB)으로만 섹션 분리. 핵심 키워드만 볼드 처리. 불릿 포인트로 내용 정리.
[텍스처] 플랫 화이트, 그림자 없음, 장식 없음.` },

  { id: 102, section: 'session1', tool: 'notebooklm', category: 'nlm-simple',
    title: '라이트 그레이 + 아이콘',
    description: '페일 그레이 배경·간단한 아이콘 포인트. 슬라이드당 메시지 1개 원칙.',
    design: { bg: '#F1F5F9', accent: '#475569', type: '아이콘 포인트' },
    status: 'ready',
    promptText: `[디자인 스타일] 라이트 그레이 + 아이콘 포인트
[컬러 시스템] 배경: #F1F5F9 / 카드 배경: #FFFFFF / 제목: #1E293B / 본문: #475569 / 아이콘 강조: #3B82F6 / 구분선: #CBD5E1
[레이아웃] 슬라이드 중앙 대형 아이콘(상단), 아래 핵심 제목 1줄, 설명 2~3줄. 1슬라이드 = 1메시지 원칙. 카드형 컨테이너(흰색, 모서리 라운드) 사용.
[디자인 특성] 이모지 또는 심플 라인 아이콘 사용. 텍스트는 최소화. 핵심 문장만 크게. 여백 충분히 활용.
[텍스처] 라이트 그레이 배경 위 흰색 카드. 카드 그림자 매우 연하게.` },

  { id: 103, section: 'session1', tool: 'notebooklm', category: 'nlm-simple',
    title: '오프화이트 + 라인 강조',
    description: '따뜻한 오프화이트·얇은 수평선 구분·키워드 언더라인 강조.',
    design: { bg: '#FAFAF8', accent: '#2563EB', type: '라인 강조' },
    status: 'ready',
    promptText: `[디자인 스타일] 오프화이트 + 라인 강조
[컬러 시스템] 배경: #FAFAF8 / 제목: #1C1917 / 본문: #44403C / 강조 언더라인: #2563EB / 섹션 구분선: #D6D3D1 / 서브텍스트: #78716C
[레이아웃] 1단 구성. 슬라이드 좌측 4px 수직 컬러바(#2563EB) → 제목 → 얇은 수평선 → 본문 순서. 각 항목 사이 충분한 줄 간격.
[디자인 특성] 키워드마다 파란색 언더라인 강조. 번호 매기기(①②③) 활용. 그래픽 없이 텍스트 위계로만 구성. 따뜻하고 차분한 분위기.
[텍스처] 크림빛 종이 질감. 장식 없음. 폰트 세리프 계열 추천.` },

  { id: 104, section: 'session1', tool: 'notebooklm', category: 'nlm-simple',
    title: '타이포그래피 중심',
    description: '폰트 크기·굵기만으로 계층 표현. 제목 극대화, 본문 최소화.',
    design: { bg: '#FFFFFF', accent: '#0F172A', type: '타이포 계층' },
    status: 'ready',
    promptText: `[디자인 스타일] 타이포그래피 중심
[컬러 시스템] 배경: #FFFFFF / 대제목: #0F172A(매우 굵게, 최대 크기) / 소제목: #334155(중간) / 본문: #64748B(얇게, 작게) / 포인트 숫자: #2563EB
[레이아웃] 슬라이드 상단 40% 대형 제목(볼드, 좌측 정렬). 하단 60% 핵심 문장 2~3줄. 제목과 본문 폰트 크기 비율 3:1 이상.
[디자인 특성] 이미지·아이콘 전혀 없음. 폰트 굵기(900/700/400) 세 단계만 사용. 핵심 숫자는 포인트 컬러(#2563EB)로. 여백이 디자인 요소.
[텍스처] 완전 플랫 화이트. 그림자·테두리 없음. 고딕(산세리프) 폰트 필수.` },

  { id: 105, section: 'session1', tool: 'notebooklm', category: 'nlm-simple',
    title: '2단 클린 레이아웃',
    description: '좌측 키워드·우측 설명의 50:50 분할. 구분선 하나로 정돈된 인상.',
    design: { bg: '#FFFFFF', accent: '#334155', type: '2단 분할' },
    status: 'ready',
    promptText: `[디자인 스타일] 2단 클린 레이아웃
[컬러 시스템] 배경: #FFFFFF / 좌측 키워드: #1E293B(볼드, 중간 크기) / 우측 설명: #475569(일반) / 중앙 구분선: #E2E8F0 / 제목 배경바: #F8FAFC
[레이아웃] 상단 제목 배경바(#F8FAFC, 패딩 16px). 본문 영역 50:50 2단 분할. 중앙 1px 수직 구분선. 좌측: 키워드/소제목, 우측: 설명 3~4줄.
[디자인 특성] 대칭 구조 유지. 각 행 좌우 내용은 반드시 매칭. 좌측 키워드는 볼드+포인트 컬러. 그래픽 없음. 깔끔한 대조.
[텍스처] 플랫, 그림자 없음. 상단 제목바만 미묘한 배경색 차이.` },

  // ── 모던 비즈니스 (6개) ─────────────────────────────────────
  { id: 106, section: 'session1', tool: 'notebooklm', category: 'nlm-business',
    title: '딥 네이비 + 골드',
    description: '딥 네이비 배경·금색 포인트. 수치를 박스로 강조하는 프리미엄 비즈니스.',
    design: { bg: '#0F1F3D', accent: '#C9A84C', type: '수치 강조 박스' },
    status: 'ready',
    promptText: `[디자인 스타일] 딥 네이비 + 골드 프리미엄 비즈니스
[컬러 시스템] 배경: #0F1F3D / 제목: #FFFFFF / 본문: #CBD5E1 / 포인트(골드): #C9A84C / 수치 강조 박스 배경: #1A2E5A / 수치 강조 박스 테두리: #C9A84C / 서브텍스트: #94A3B8
[레이아웃] 좌측 상단 골드 로고 영역(작게). 제목 상단 중앙. 하단 3개 수치 강조 박스(가로 배열, 각 박스: 큰 숫자 + 설명 2줄). 우측 하단 슬라이드 번호.
[디자인 특성] 큰 숫자(72px)를 골드 컬러로 강조. 박스 테두리 1px 골드. 미묘한 배경 그라디언트(#0F1F3D→#1A2E5A). 고급스러운 분위기.
[텍스처] 다크 배경, 미세한 격자 패턴(투명도 5%). 박스에 은은한 그림자.` },

  { id: 107, section: 'session1', tool: 'notebooklm', category: 'nlm-business',
    title: '다크 차콜 + 데이터',
    description: '차콜 배경·밝은 텍스트·시안 포인트. 데이터와 차트가 돋보이는 다크 모드.',
    design: { bg: '#1C1C1E', accent: '#38BDF8', type: '다크 데이터' },
    status: 'ready',
    promptText: `[디자인 스타일] 다크 차콜 + 데이터 비주얼
[컬러 시스템] 배경: #1C1C1E / 제목: #F8FAFC / 본문: #CBD5E1 / 포인트(시안): #38BDF8 / 데이터 강조: #0EA5E9 / 보조색(라벤더): #818CF8 / 카드 배경: #2C2C2E
[레이아웃] 상단 제목(흰색, 좌측 정렬). 중앙 데이터 시각화 영역(넓게). 하단 3~4개 지표 카드(#2C2C2E 배경, 시안 수치). 좌측 컬러 수직 바(#38BDF8, 4px).
[디자인 특성] 차트/그래프/수치 중심. 다크 배경으로 데이터가 빛나는 효과. 포인트 컬러로 중요 수치 강조. 그리드 라인 희미하게.
[텍스처] 다크 매트. 카드에 약한 테두리(#3F3F46). 데이터 요소에 글로우 효과 미약하게.` },

  { id: 108, section: 'session1', tool: 'notebooklm', category: 'nlm-business',
    title: '코퍼레이트 블루 + 비교',
    description: '화이트 배경·진한 블루 포인트. 두 항목 비교 박스가 핵심인 전문 비즈니스.',
    design: { bg: '#FFFFFF', accent: '#1D4ED8', type: '비교 박스' },
    status: 'ready',
    promptText: `[디자인 스타일] 코퍼레이트 블루 + 비교 레이아웃
[컬러 시스템] 배경: #FFFFFF / 헤더바: #1E3A5F / 헤더 텍스트: #FFFFFF / 제목: #1E3A5F / 본문: #374151 / 포인트: #1D4ED8 / 비교박스A 배경: #EFF6FF / 비교박스B 배경: #F0FDF4 / 구분선: #DBEAFE
[레이아웃] 상단 진한 헤더바(#1E3A5F, 흰 제목). 본문 2단 비교 박스(좌: 항목A, 우: 항목B). 각 박스 내 항목별 아이콘+텍스트 리스트. 하단 결론 강조 영역.
[디자인 특성] 대비를 통한 설득 구조. 비교 항목 3~5개. 우위 항목에 체크마크(✓) 강조. 헤더와 본문 명확한 구분.
[텍스처] 플랫 화이트. 박스 1px 테두리(#DBEAFE). 헤더 부분만 다크.` },

  { id: 109, section: 'session1', tool: 'notebooklm', category: 'nlm-business',
    title: '그라디언트 인포그래픽',
    description: '블루→퍼플 그라디언트 헤더·인포그래픽 요소·큰 숫자 임팩트.',
    design: { bg: '#EFF6FF', accent: '#6366F1', type: '인포그래픽' },
    status: 'ready',
    promptText: `[디자인 스타일] 그라디언트 + 인포그래픽 비즈니스
[컬러 시스템] 헤더 그라디언트: #3B82F6→#8B5CF6 / 배경: #F0F4FF / 카드 배경: #FFFFFF / 수치 강조: #4F46E5 / 본문: #374151 / 아이콘: #6366F1 / 라인: #E0E7FF
[레이아웃] 상단 그라디언트 헤더(20% 높이, 흰 제목+서브). 하단 3~4개 인포그래픽 카드(원형 아이콘+수치+설명). 수치는 카드 상단 중앙에 크게.
[디자인 특성] 원형/아이콘 그래픽 적극 활용. 핵심 수치 64px 이상. 그라디언트 배지로 카테고리 구분. 스텝 넘버링(1→2→3) 화살표 연결.
[텍스처] 라이트 퍼플 배경. 카드 둥근 모서리(16px). 카드 그림자 중간.` },

  { id: 110, section: 'session1', tool: 'notebooklm', category: 'nlm-business',
    title: '블랙&화이트 볼드',
    description: '극단적 흑백 대비·볼드 타이포. 설득력 있는 강렬한 비즈니스 임팩트.',
    design: { bg: '#FFFFFF', accent: '#000000', type: '볼드 임팩트' },
    status: 'ready',
    promptText: `[디자인 스타일] 블랙&화이트 볼드 비즈니스
[컬러 시스템] 배경: #FFFFFF / 대제목: #000000(Heavy 900) / 소제목: #111827(Bold 700) / 본문: #374151(Regular) / 포인트 라인: #000000 / 강조 텍스트 배경: #F9FAFB / 한 개 포인트 컬러: #EF4444
[레이아웃] 좌측 8px 두꺼운 검정 수직 바 → 대형 제목(전체 슬라이드의 35% 차지). 중간 얇은 수평선. 하단 핵심 내용 2~3포인트.
[디자인 특성] 색상은 흑백+포인트 1색(#EF4444)만. 제목 최대한 크고 굵게. 미니멀 바 차트(흑백). 여백을 두려워하지 말 것.
[텍스처] 완전 플랫. 두꺼운 선과 굵은 폰트만으로 텍스처 표현.` },

  { id: 111, section: 'session1', tool: 'notebooklm', category: 'nlm-business',
    title: '딥 그린 + KPI',
    description: '그린 계열 포인트·KPI 대시보드 레이아웃·달성률 수치 강조.',
    design: { bg: '#F0FDF4', accent: '#059669', type: 'KPI 대시보드' },
    status: 'ready',
    promptText: `[디자인 스타일] 딥 그린 KPI 대시보드
[컬러 시스템] 배경: #F0FDF4 / 헤더: #065F46 / 헤더 텍스트: #FFFFFF / KPI 수치: #059669(큰 폰트) / 달성 강조: #10B981 / 미달 강조: #EF4444 / 카드 배경: #FFFFFF / 구분선: #A7F3D0
[레이아웃] 상단 다크 그린 헤더(제목+기간 표기). 중앙 KPI 카드 3~4개 가로 배열(각 카드: 지표명+수치+달성률 퍼센트). 하단 요약 바 차트 또는 트렌드 선.
[디자인 특성] 수치를 가장 크게(56px). 달성/미달을 색으로 즉시 구분. 화살표(↑↓)로 증감 표시. 목표 대비 현재 진행 바.
[텍스처] 연한 그린 배경. 카드 흰색, 모서리 12px. 그린 테두리 1px.` },

  // ── 학술 · 논문 (5개) ────────────────────────────────────────
  { id: 112, section: 'session1', tool: 'notebooklm', category: 'nlm-academic',
    title: '크림 학술 클래식',
    description: '크림 배경·세리프 폰트·레퍼런스 영역. 권위 있고 신뢰감 있는 학술지 스타일.',
    design: { bg: '#FFFBF0', accent: '#92400E', type: '학술지 스타일' },
    status: 'ready',
    promptText: `[디자인 스타일] 크림 화이트 학술 클래식
[컬러 시스템] 배경: #FFFBF0 / 제목: #1C1917(세리프, 볼드) / 본문: #292524 / 포인트 컬러: #92400E(앰버-브라운) / 레퍼런스 텍스트: #78716C(작게) / 구분선: #D6D3D1 / 섹션 배지: #FEF3C7
[레이아웃] 상단 섹션 배지(서론/방법/결과/결론) + 제목. 본문 1단 구성. 하단 레퍼런스 영역(작은 폰트, 회색, 구분선 위). 슬라이드 번호 우측 하단.
[디자인 특성] 세리프(명조) 폰트 필수. 학술 구조(서론→방법→결과→결론) 순서 유지. 인용 표시([1], [2]) 포함. 그래픽 없이 텍스트와 표 중심.
[텍스처] 크림빛 종이 느낌. 고전적이고 격식 있는 분위기.` },

  { id: 113, section: 'session1', tool: 'notebooklm', category: 'nlm-academic',
    title: '연구 결과 표 중심',
    description: '블루 포인트·데이터 표 강조·섹션 구분 명확. 연구 발표 전용 구성.',
    design: { bg: '#F8FAFF', accent: '#1D4ED8', type: '데이터 표' },
    status: 'ready',
    promptText: `[디자인 스타일] 연구 결과 표 중심 학술
[컬러 시스템] 배경: #F8FAFF / 헤더바: #1E40AF / 헤더 텍스트: #FFFFFF / 제목: #1E3A5F / 본문: #374151 / 표 헤더: #DBEAFE / 표 홀수행: #EFF6FF / 표 짝수행: #FFFFFF / 강조셀: #FEF3C7 / 통계 유의값: #DC2626
[레이아웃] 상단 블루 헤더바(제목+저자). 중앙 데이터 표(전체 슬라이드 60%). 표 하단 통계 유의성 표기(p<0.05 등). 표 옆/아래 간단한 해석 텍스트.
[디자인 특성] 표를 슬라이드 중심에 크게 배치. 통계적으로 유의한 결과는 굵게+별표(**). p값은 빨간색으로 강조. 열/행 헤더 명확히.
[텍스처] 화이트 기반 학술 표 스타일. 표 테두리 명확(1px #CBD5E1).` },

  { id: 114, section: 'session1', tool: 'notebooklm', category: 'nlm-academic',
    title: '통계 그래프 비주얼',
    description: '그래프·차트 중심·통계 수치 강조. 데이터로 설득하는 학술 발표.',
    design: { bg: '#FFFFFF', accent: '#0284C7', type: '그래프 중심' },
    status: 'ready',
    promptText: `[디자인 스타일] 통계 그래프 학술 비주얼
[컬러 시스템] 배경: #FFFFFF / 제목: #0C4A6E / 본문: #374151 / 그래프 주색: #0284C7 / 그래프 보조색: #7DD3FC / 비교 컬러: #F59E0B / 오차 막대: #64748B / 통계값(p, n): #DC2626 / 축 라벨: #6B7280
[레이아웃] 상단 제목(슬라이드 15%). 중앙 그래프/차트 영역(슬라이드 65%). 하단 통계 요약 텍스트(p값, 95%CI, n=). 오른쪽 또는 하단에 범례.
[디자인 특성] 바차트·산점도·카플란마이어 등 적극 활용. 오차 막대 표시. 통계 유의성 표기(*,**,***). 수치 라벨을 그래프 위에 직접 표기.
[텍스처] 클린 화이트. 그래프 배경 연한 그리드(#F1F5F9).` },

  { id: 115, section: 'session1', tool: 'notebooklm', category: 'nlm-academic',
    title: '논문 구조 단계형',
    description: '서론→방법→결과→결론 단계 배지. 논문 흐름대로 읽히는 컨퍼런스 발표용.',
    design: { bg: '#FEFCE8', accent: '#A16207', type: '논문 구조' },
    status: 'ready',
    promptText: `[디자인 스타일] 논문 구조 단계형 학술
[컬러 시스템] 배경: #FEFCE8 / 단계 배지(서론): #FDE68A / 단계 배지(방법): #BBF7D0 / 단계 배지(결과): #BAE6FD / 단계 배지(결론): #E9D5FF / 제목: #1C1917 / 본문: #374151 / 포인트: #A16207
[레이아웃] 상단 좌측 현재 단계 컬러 배지(서론/방법/결과/결론) + 제목. 상단 우측 전체 4단계 진행 표시(현재 단계 강조). 본문 1단. 하단 다음 단계 예고(작게).
[디자인 특성] 논문 4단계(IMRAD) 구조를 시각적으로 추적 가능하게. 단계마다 배지 컬러 다름. 슬라이드 흐름이 논문 흐름과 일치.
[텍스처] 따뜻한 크림-옐로우 배경. 단계 배지 둥근 모서리.` },

  { id: 116, section: 'session1', tool: 'notebooklm', category: 'nlm-academic',
    title: '비교 분석표 학술',
    description: '다중 데이터 나란히 비교·그레이 포인트·중립적 분석 레이아웃.',
    design: { bg: '#F9FAFB', accent: '#4B5563', type: '다중 비교표' },
    status: 'ready',
    promptText: `[디자인 스타일] 비교 분석표 학술
[컬러 시스템] 배경: #F9FAFB / 표 헤더: #374151(흰 텍스트) / 항목행 홀수: #FFFFFF / 항목행 짝수: #F3F4F6 / 우위 강조셀: #DCFCE7 / 열등 강조셀: #FEF2F2 / 동일: #F9FAFB / 포인트 텍스트: #059669 / 본문: #374151
[레이아웃] 상단 제목(비교 대상 명시). 중앙 비교 매트릭스 표(항목 좌측, 비교대상 상단 헤더). 하단 요약 1~2줄(결론).
[디자인 특성] 3개 이상 대상을 나란히 비교. 최우수 셀 초록, 최하위 셀 연한 빨강으로 즉시 인식. 각 행 항목 명확한 라벨. 중립적이고 객관적 톤.
[텍스처] 그레이 계열. 플랫 표 스타일. 셀 패딩 넉넉하게.` },

  // ── 보고서 (6개) ────────────────────────────────────────────
  { id: 117, section: 'session1', tool: 'notebooklm', category: 'nlm-report',
    title: '공식 비즈니스 보고서',
    description: '화이트 배경·블루 헤더바·섹션별 요약 박스. 격식 있는 공식 보고서.',
    design: { bg: '#FFFFFF', accent: '#1E40AF', type: '공식 보고서' },
    status: 'ready',
    promptText: `[디자인 스타일] 공식 비즈니스 보고서
[컬러 시스템] 배경: #FFFFFF / 상단 헤더바: #1E40AF / 헤더 텍스트: #FFFFFF / 제목: #1E3A5F / 본문: #374151 / 요약 박스 배경: #EFF6FF / 요약 박스 테두리: #BFDBFE / 강조 텍스트: #1D4ED8 / 구분선: #E5E7EB
[레이아웃] 상단 파란 헤더바(제목+날짜+보고자). 본문 섹션별 구분(구분선). 각 섹션 시작 전 요약 박스(파란 배경, 핵심 1줄). 우측 하단 페이지 번호.
[디자인 특성] 계층 구조 명확(대제목→소제목→본문→주석). 요약 박스를 섹션마다 배치. 번호 매기기(1. 2. 3.) 사용. 공식 문서 느낌.
[텍스처] 클린 화이트. 헤더만 다크 블루. 전체적으로 격식 있고 신뢰감 있게.` },

  { id: 118, section: 'session1', tool: 'notebooklm', category: 'nlm-report',
    title: '실적 보고 + KPI 카드',
    description: '그레이 배경·KPI 카드 3개 가로배열·달성률 게이지. 실적 보고 전용.',
    design: { bg: '#F1F5F9', accent: '#0057A8', type: 'KPI 카드' },
    status: 'ready',
    promptText: `[디자인 스타일] 실적 보고 KPI 카드
[컬러 시스템] 배경: #F1F5F9 / KPI 카드: #FFFFFF / 카드 제목: #374151 / KPI 수치: #0057A8(크게) / 달성률 게이지 배경: #E2E8F0 / 달성률 채움: #0057A8 / 초과달성: #10B981 / 미달: #EF4444 / 증감 화살표 상승: #10B981 / 증감 화살표 하락: #EF4444
[레이아웃] 상단 타이틀(기간 명시). 중앙 KPI 카드 3~4개 가로 배열(각 카드: 지표명+수치+달성률 바). 하단 상세 실적 표(간략하게).
[디자인 특성] KPI 수치 56px 이상 크게. 달성률 게이지 바 필수. ↑↓ 화살표로 전월 대비 증감. 달성/미달 색상으로 즉시 구분.
[텍스처] 그레이 배경에 흰 카드. 카드 그림자 연하게. 게이지 바 둥근 모서리.` },

  { id: 119, section: 'session1', tool: 'notebooklm', category: 'nlm-report',
    title: '목표 대비 달성률 차트',
    description: '블루&화이트·바 차트 중심·목표선 빨간 점선. 경영진 보고용 실적 차트.',
    design: { bg: '#EFF6FF', accent: '#1D4ED8', type: '달성률 바차트' },
    status: 'ready',
    promptText: `[디자인 스타일] 목표 대비 달성률 차트 보고서
[컬러 시스템] 배경: #EFF6FF / 헤더: #1E3A5F / 헤더 텍스트: #FFFFFF / 달성 바: #3B82F6 / 초과달성 바: #10B981 / 목표선: #DC2626(점선) / 축 라벨: #6B7280 / 수치 라벨: #1D4ED8(굵게) / 하단 요약: #374151
[레이아웃] 상단 헤더(목표 수치 큰 글씨로). 중앙 가로/세로 바 차트(전체 60%). 목표선 점선으로 표시. 각 바 위에 실적 수치. 하단 결론 1줄.
[디자인 특성] 목표선은 빨간 점선으로 시각적으로 명확하게. 달성한 항목은 진한 블루, 초과달성은 그린. 총합 수치를 헤더에 크게. 경영진이 한눈에 파악 가능하게.
[텍스처] 라이트 블루 배경. 차트 배경 흰색. 그리드 라인 연하게.` },

  { id: 120, section: 'session1', tool: 'notebooklm', category: 'nlm-report',
    title: '체크리스트 + 프로세스',
    description: '화이트 배경·체크리스트·화살표 프로세스 플로우. 진행 현황 추적 보고.',
    design: { bg: '#FFFFFF', accent: '#059669', type: '체크리스트' },
    status: 'ready',
    promptText: `[디자인 스타일] 체크리스트 + 프로세스 플로우
[컬러 시스템] 배경: #FFFFFF / 완료 체크: #10B981(초록 원+✓) / 진행중: #F59E0B(주황 원+•) / 미완료: #E5E7EB(회색 원) / 제목: #1E293B / 본문: #475569 / 화살표: #94A3B8 / 프로세스 완료 단계: #DCFCE7 / 현재 단계: #FEF3C7
[레이아웃] 상단 제목(진행 현황 요약). 중앙 프로세스 플로우(단계별 박스 + 화살표 연결, 가로 또는 세로). 우측 또는 하단 체크리스트(항목별 완료 여부). 완료/진행/미완 범례.
[디자인 특성] 체크마크(✓) 명확하게. 현재 단계 강조(노란 배경). 완료 단계 초록. 미완 회색으로 시각적 진행 상태 즉시 파악.
[텍스처] 플랫 화이트. 단계 박스 둥근 모서리. 화살표 연결선 점선 또는 실선.` },

  { id: 121, section: 'session1', tool: 'notebooklm', category: 'nlm-report',
    title: '현황판 + 상태 인디케이터',
    description: '뉴트럴 그레이·신호등 색상 상태 인디케이터·단계별 진행 현황 대시보드.',
    design: { bg: '#F8FAFC', accent: '#0891B2', type: '상태 대시보드' },
    status: 'ready',
    promptText: `[디자인 스타일] 현황판 + 상태 인디케이터 대시보드
[컬러 시스템] 배경: #F8FAFC / 카드 배경: #FFFFFF / 상태-완료: #22C55E / 상태-진행중: #F59E0B / 상태-지연: #EF4444 / 상태-미시작: #94A3B8 / 제목: #0F172A / 항목 텍스트: #374151 / 구분선: #E2E8F0
[레이아웃] 상단 전체 현황 요약 바(완료 N개/진행 N개/지연 N개 카운터). 중앙 항목별 카드 그리드(각 카드: 항목명+담당자+상태 배지+진행률 바). 하단 이슈 사항 요약.
[디자인 특성] 상태를 신호등 색으로 즉시 구분. 진행률 게이지 바. 지연 항목 빨간 경고 표시. 전체 현황 한 화면에 파악 가능.
[텍스처] 그레이 배경에 흰 카드. 상태 배지 둥근 태그 스타일.` },

  { id: 122, section: 'session1', tool: 'notebooklm', category: 'nlm-report',
    title: '아이콘 요약 대시보드',
    description: '슬레이트 그레이·카테고리별 아이콘 카드·숫자 강조. 전체 현황 1페이지 요약.',
    design: { bg: '#F1F5F9', accent: '#334155', type: '아이콘 요약' },
    status: 'ready',
    promptText: `[디자인 스타일] 아이콘 요약 대시보드
[컬러 시스템] 배경: #F1F5F9 / 카드 배경: #FFFFFF / 아이콘 배경 원: #E2E8F0 / 아이콘 컬러: #334155 / 수치: #0F172A(굵게 크게) / 라벨: #64748B / 구분선: #CBD5E1 / 포인트 카드(중요): #EFF6FF + 파란 테두리
[레이아웃] 상단 타이틀(날짜/기간). 2×3 또는 3×2 카드 그리드(각 카드: 원형 아이콘+숫자+라벨+전월비 화살표). 하단 코멘트 1줄.
[디자인 특성] 각 카드 아이콘으로 카테고리 즉시 인식. 숫자 크게 강조. 전월 대비 ↑↓ 표시. 중요 지표 카드는 파란 테두리로 강조.
[텍스처] 그레이 배경에 흰 카드. 아이콘 배경 원 연한 회색. 카드 그림자 연하게.` },

  // ── 임팩트 · PT (4개) ───────────────────────────────────────
  { id: 123, section: 'session1', tool: 'notebooklm', category: 'nlm-impact',
    title: '풀 다크 + 대형 숫자',
    description: '완전 블랙 배경·시안 글로우 포인트·슬라이드당 대형 숫자 1개. 강렬한 임팩트.',
    design: { bg: '#09090B', accent: '#06B6D4', type: '대형 숫자 임팩트' },
    status: 'ready',
    promptText: `[디자인 스타일] 풀 다크 + 대형 숫자 임팩트
[컬러 시스템] 배경: #09090B / 대형 숫자: #FFFFFF(96px 이상, Extra Bold) / 포인트(시안): #06B6D4 / 단위 텍스트: #06B6D4(중간) / 설명 텍스트: #94A3B8(작게) / 하단 라인: #1E293B / 서브 포인트: #818CF8
[레이아웃] 슬라이드 중앙 대형 숫자(전체 화면의 40%). 숫자 위 작은 레이블(무엇을 의미하는지). 숫자 아래 짧은 설명(1줄). 우측 하단 슬라이드 넘버(시안).
[디자인 특성] 슬라이드당 핵심 숫자 1개만. 숫자는 최대한 크게. 글로우 효과(text-shadow, 시안). 배경 완전 검정. 여백을 두려움 없이 사용.
[텍스처] 완전 다크. 숫자에 미묘한 글로우. 하단 얇은 시안 수평선.` },

  { id: 124, section: 'session1', tool: 'notebooklm', category: 'nlm-impact',
    title: '그라디언트 풀스크린',
    description: '퍼플→블루 풀스크린 그라디언트·반투명 카드·감성적이고 강한 비주얼.',
    design: { bg: '#3B0764', accent: '#A78BFA', type: '풀스크린 그라디언트' },
    status: 'ready',
    promptText: `[디자인 스타일] 그라디언트 풀스크린 임팩트
[컬러 시스템] 배경 그라디언트: #4F46E5→#7C3AED→#1E1B4B(대각선) / 제목: #FFFFFF(Heavy) / 본문: #E0E7FF / 반투명 카드 배경: rgba(255,255,255,0.1) / 카드 테두리: rgba(255,255,255,0.2) / 포인트: #C4B5FD / 아이콘: #A5B4FC
[레이아웃] 풀스크린 그라디언트 배경. 중앙 상단 대형 제목(흰색, 굵게). 중앙 2~3개 반투명 카드(frosted glass 효과). 하단 핵심 키워드 바.
[디자인 특성] 배경이 전체를 덮는 그라디언트. 유리형(frosted glass) 카드. 내용은 짧고 강렬하게. 시각적 임팩트 최대화.
[텍스처] 그라디언트 위 반투명 오버레이. 카드 백드롭 블러(blur) 효과.` },

  { id: 125, section: 'session1', tool: 'notebooklm', category: 'nlm-impact',
    title: '레드&블랙 설득형',
    description: '레드+블랙 대비·초대형 타이포·3초 안에 핵심 전달. 설득과 행동 촉구.',
    design: { bg: '#0D0D0D', accent: '#EF4444', type: '설득형 임팩트' },
    status: 'ready',
    promptText: `[디자인 스타일] 레드&블랙 설득형 임팩트
[컬러 시스템] 배경: #0D0D0D / 대형 텍스트: #FFFFFF(Extra Bold) / 포인트(레드): #EF4444 / 강조 단어: #EF4444 또는 #FCA5A5 / 서브 텍스트: #71717A / 하단 CTA 배경: #EF4444 / CTA 텍스트: #FFFFFF
[레이아웃] 배경 전면 블랙. 중앙 대형 헤드카피(1~2줄, 최대 크기). 핵심 단어 한두 개만 레드 컬러. 하단 행동 촉구 버튼형 박스(레드 배경, 흰 텍스트). 상단 슬라이드 타이틀 작게.
[디자인 특성] 텍스트 초대형(72~96px). 레드 포인트 단어로 시선 집중. 3초 안에 메시지 전달 가능 분량. 행동 촉구(CTA) 명확하게.
[텍스처] 완전 다크. 레드 포인트만 빛나는 효과. 심플하고 강렬하게.` },

  { id: 126, section: 'session1', tool: 'notebooklm', category: 'nlm-impact',
    title: '비비드 블루 에너지',
    description: '밝은 블루 포인트·아이콘+수치 카드·에너지 넘치는 동기부여 레이아웃.',
    design: { bg: '#EFF6FF', accent: '#2563EB', type: '에너지 아이콘' },
    status: 'ready',
    promptText: `[디자인 스타일] 비비드 블루 에너지 임팩트
[컬러 시스템] 배경: #EFF6FF / 헤더 그라디언트: #1D4ED8→#3B82F6 / 헤더 텍스트: #FFFFFF / 아이콘 원 배경: #DBEAFE / 아이콘 컬러: #2563EB / 수치: #1D4ED8(굵게 크게) / 본문: #1E40AF / 강조 배지: #2563EB(흰 텍스트)
[레이아웃] 상단 그라디언트 헤더(강렬한 타이틀). 본문 아이콘+수치+설명 카드 3~4개 배치. 각 카드: 원형 아이콘(크게) → 수치 → 1줄 설명. 화살표로 연결(흐름 표현).
[디자인 특성] 아이콘 원형 배경으로 강조. 수치 굵고 크게. 에너지 있고 긍정적인 분위기. 화살표 연결로 모멘텀 표현. 행동 지향적 메시지.
[텍스처] 라이트 블루 배경. 카드 흰색. 카드 그림자 중간. 에너지 있게.` },

  // ── 데이터 비주얼 (4개) ────────────────────────────────────
  { id: 127, section: 'session1', tool: 'notebooklm', category: 'nlm-data',
    title: '다크 차트 스토리텔링',
    description: '다크 네이비·시안 차트 라인·색상 코딩. 데이터가 이야기하는 스토리텔링.',
    design: { bg: '#0F172A', accent: '#38BDF8', type: '차트 스토리텔링' },
    status: 'ready',
    promptText: `[디자인 스타일] 다크 차트 데이터 스토리텔링
[컬러 시스템] 배경: #0F172A / 제목: #F8FAFC / 서브: #94A3B8 / 차트 주선: #38BDF8 / 차트 보조선: #818CF8 / 강조 포인트: #F59E0B / 차트 배경: #1E293B / 축 라벨: #64748B / 데이터 라벨: #E2E8F0 / 범례: #CBD5E1
[레이아웃] 상단 제목(흰색, 간결하게). 중앙 대형 차트/그래프(슬라이드 70%). 차트 내 주요 포인트에 콜아웃 라벨. 하단 인사이트 1줄(핵심 발견).
[디자인 특성] 차트가 슬라이드를 지배하게 배치. 중요 데이터 포인트에 노란 원형 강조. 트렌드선 또는 변곡점 표시. 설명보다 데이터로 말하는 구조.
[텍스처] 다크 배경. 차트 배경 약간 밝게(#1E293B). 시안 글로우 효과 약하게.` },

  { id: 128, section: 'session1', tool: 'notebooklm', category: 'nlm-data',
    title: '화이트 인포그래픽',
    description: '화이트 배경·퍼플 아이콘·수치+아이콘+설명 조합. 한눈에 보이는 인포그래픽.',
    design: { bg: '#FFFFFF', accent: '#7C3AED', type: '아이콘 인포그래픽' },
    status: 'ready',
    promptText: `[디자인 스타일] 화이트 인포그래픽 시각화
[컬러 시스템] 배경: #FFFFFF / 아이콘 원 배경: #F5F3FF / 아이콘: #7C3AED / 수치: #4C1D95(Extra Bold, 크게) / 제목: #1E1B4B / 본문: #374151 / 커넥터 라인: #DDD6FE / 강조 배지: #EDE9FE + 보라 텍스트 / 단위: #8B5CF6
[레이아웃] 타이틀 상단. 2×2 또는 1×4 인포그래픽 카드 배치. 각 카드: 대형 원형 아이콘 → 수치(크게) → 단위 → 설명 2줄. 카드 간 커넥터 라인.
[디자인 특성] 수치+아이콘+설명 3요소 세트. 각 카드 독립적으로 읽힘. 퍼플 계열 일관된 아이콘 컬러. 숫자 최대한 크게 강조.
[텍스처] 클린 화이트. 카드 연한 퍼플 배경. 아이콘 원형 배경 연보라.` },

  { id: 129, section: 'session1', tool: 'notebooklm', category: 'nlm-data',
    title: '멀티 KPI 색상 코딩',
    description: '퍼플 포인트·다중 KPI 카드·신호등 색상 등급. 성과 분류 즉시 인식.',
    design: { bg: '#F5F3FF', accent: '#6D28D9', type: '멀티 KPI 등급' },
    status: 'ready',
    promptText: `[디자인 스타일] 멀티 KPI 색상 코딩 대시보드
[컬러 시스템] 배경: #F5F3FF / 카드 배경: #FFFFFF / KPI 상 등급: #16A34A(초록) / KPI 중 등급: #D97706(주황) / KPI 하 등급: #DC2626(빨강) / 포인트(퍼플): #6D28D9 / 수치: #1E1B4B(굵게 크게) / 라벨: #6B7280 / 헤더: #4C1D95
[레이아웃] 상단 헤더(분석 타이틀+기간). 3×N KPI 카드 그리드. 각 카드: 상단 컬러 스트라이프(등급 색상, 4px) → KPI명 → 수치(크게) → 목표 대비 % → 등급 배지. 우측 사이드 전체 분포 도넛 차트.
[디자인 특성] 카드 상단 컬러 스트라이프로 등급 즉시 구분. 도넛 차트로 전체 현황. 목표 대비 % 항상 표시. 많은 KPI를 한 화면에 비교 가능.
[텍스처] 연 퍼플 배경. 흰 카드. 등급 컬러 스트라이프 강조.` },

  { id: 130, section: 'session1', tool: 'notebooklm', category: 'nlm-data',
    title: '타임라인 + 단계 플로우',
    description: '퍼플 타임라인·마일스톤 노드·단계별 핵심 포인트. 시간 흐름 시각화.',
    design: { bg: '#FAF5FF', accent: '#9333EA', type: '타임라인 플로우' },
    status: 'ready',
    promptText: `[디자인 스타일] 타임라인 + 단계 플로우
[컬러 시스템] 배경: #FAF5FF / 타임라인 선: #9333EA(4px) / 완료 노드: #7E22CE(채워진 원) / 현재 노드: #A855F7(강조 원, 크게) / 미래 노드: #DDD6FE(빈 원) / 단계 카드: #FFFFFF / 카드 테두리 완료: #C084FC / 카드 테두리 미래: #E9D5FF / 텍스트: #3B0764 / 서브: #7E22CE
[레이아웃] 중앙 수평 또는 수직 타임라인 메인 선. 노드마다 날짜/단계명 표시. 각 노드에서 카드 연결(위아래 번갈아). 현재 단계 노드 크게 강조. 완료 단계 카드는 색 채워짐.
[디자인 특성] 타임라인 선이 중심. 완료/현재/미래 세 상태 명확히 구분. 현재 단계에 강조 표시(크고 밝게). 카드 내 핵심 달성 내용 2~3줄.
[텍스처] 연한 라벤더 배경. 퍼플 타임라인. 카드 흰색, 퍼플 테두리.` },
]

// ══════════════════════════════════════════════════════════════
// 실습2 — 바이브코딩 프롬프트 (추후 추가)
// ══════════════════════════════════════════════════════════════
const PROMPT_S2_01 = `당신은 Google Apps Script 전문가입니다.
아래 구글 스프레드시트 데이터를 읽어서 소장(관리자)용 팀 성과 대시보드 웹앱을 만들어주세요.

# 스프레드시트 구조 (시트명과 컬럼명을 정확히 사용할 것)

## 시트명: 조직도및MR (총 10행, 헤더 포함)
컬럼 순서: 구분(A) | 사업부(B) | 사무소(C) | 소장(D) | MR(E) | 직급(F) | 담당고객수(G) | 누적활동건수(H) | 연락처(가상)(I)
- 구분값: "관리자"(소장행) 또는 "실무"(MR행)
- MR 이름은 E열에, 소장 이름은 D열에 있음

## 시트명: 고객마스터 (총 1,001행, 헤더 포함)
컬럼 순서: 고객ID(A) | 사업부(B) | 사무소(C) | 소장(D) | MR(E) | 거래처명(F) | 고객명(G) | 고객유형(H) | 전문과목(I) | 전월단계(J) | 현재단계(K) | 잠재점수(L) | 잠재등급(M) | 우선순위(N) | 관심분야(O) | 세부관심(P) | 선호접점(Q) | 최근활동일(R) | 다음활동예정일(S) | 월목표활동수(T) | 이번달활동수(U) | 최근반응(V) | 중점제품(W) | 접근팁(X) | 비고(Y)
- 현재단계: "1단계"~"5단계" (1=초기탐색, 2=관계형성, 3=검토시험, 4=정기처방, 5=핵심고객)
- 잠재등급: "A"(핵심), "B"(성장), "C"(유지)
- 최근반응: "긍정", "보통", "부정"

## 시트명: 활동로그 (총 6,039행, 헤더 포함)
컬럼 순서: 활동ID(A) | 활동일자(B) | 주차(C) | 사업부(D) | 사무소(E) | 소장(F) | MR(G) | 고객ID(H) | 거래처명(I) | 고객명(J) | 전문과목(K) | 활동유형(L) | 방문목적(M) | 중점제품(N) | 결과요약(O) | 고객반응(P) | 단계변화(Q) | 후속조치(R) | 다음활동예정일(S) | 소요시간(분)(T) | 활동점수(U) | 관리자피드백(V)
- 활동일자 형식: "2026-03-01"
- 주차 형식: "2026-W09"
- 단계변화: "상승", "유지", "하락"

# 대시보드 요구사항

## 상단 KPI 카드 (4개 가로 배열)
1. 전체 담당 거래처 수 (고객마스터 데이터 행 수)
2. 이번 달 총 활동건수 (활동로그에서 활동일자 기준 이번 달 집계)
3. 잠재등급 A인 거래처 수 (핵심 고객)
4. 다음활동예정일이 오늘~7일 이내인 거래처 수

## MR별 성과 비교 테이블
- 컬럼: MR이름 | 담당고객수 | 이번달활동수(이번달활동수 컬럼 합계) | A등급수 | 4~5단계수 | 평균잠재점수
- 조직도및MR 시트의 MR별로 집계
- 행 클릭 시 하단 거래처 리스트를 해당 MR로 필터

## 현재단계 파이프라인 (1~5단계)
- 각 단계별 거래처 수를 카드로 표시
- 단계 이름: 1=초기탐색, 2=관계형성, 3=검토시험, 4=정기처방, 5=핵심고객
- 각 단계 카드 클릭 시 하단 리스트 필터

## 방문 지연 거래처 리스트
- 다음활동예정일이 오늘보다 지난 거래처 (빨간 배지로 지연일수 표시)
- 컬럼: 거래처명 | MR | 현재단계 | 잠재등급 | 다음활동예정일 | 지연일수

## 전체 거래처 리스트 (검색/필터)
- MR 필터, 현재단계 필터, 잠재등급 필터 드롭다운
- 검색: 거래처명, 고객명으로 검색
- 컬럼: 거래처명 | 고객명 | MR | 현재단계 | 잠재등급 | 잠재점수 | 최근활동일 | 다음활동예정일

# 디자인 요구사항
- 색상: 네이비 헤더(#1A2E5A) + 흰 배경 + 파란 포인트(#2563EB)
- 반응형 (PC/모바일 모두 잘 보이게)
- 폰트: Noto Sans KR (구글 폰트 링크 포함)
- KPI 카드: 둥근 모서리(border-radius:12px), 그림자, 숫자 크게(2rem 이상)

# 기술 요구사항
- Google Apps Script doGet() 함수로 웹앱 구현
- HtmlService.createHtmlOutput()으로 HTML 반환
- 상단에 const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; 변수로 분리
- SpreadsheetApp.openById(SPREADSHEET_ID)로 시트 접근
- 모든 데이터는 getDataRange().getValues()로 읽어옴
- 오늘 날짜는 new Date()로 자동 계산
- 데이터는 JSON으로 HTML에 전달 (scriptlet 사용 또는 JSON.stringify)

완전하고 실행 가능한 코드를 하나의 .gs 파일로 작성해주세요.`

const PROMPT_S2_02 = `당신은 Google Apps Script 전문가입니다.
아래 구글 스프레드시트 데이터를 읽어서 MR 개인용 고객 관리 대시보드 웹앱을 만들어주세요.

# 스프레드시트 구조 (시트명과 컬럼명을 정확히 사용할 것)

## 시트명: 조직도및MR (총 10행, 헤더 포함)
컬럼 순서: 구분(A) | 사업부(B) | 사무소(C) | 소장(D) | MR(E) | 직급(F) | 담당고객수(G) | 누적활동건수(H) | 연락처(가상)(I)
- MR 이름 목록은 E열에서 추출 (구분이 "실무"인 행만)

## 시트명: 고객마스터 (총 1,001행, 헤더 포함)
컬럼 순서: 고객ID(A) | 사업부(B) | 사무소(C) | 소장(D) | MR(E) | 거래처명(F) | 고객명(G) | 고객유형(H) | 전문과목(I) | 전월단계(J) | 현재단계(K) | 잠재점수(L) | 잠재등급(M) | 우선순위(N) | 관심분야(O) | 세부관심(P) | 선호접점(Q) | 최근활동일(R) | 다음활동예정일(S) | 월목표활동수(T) | 이번달활동수(U) | 최근반응(V) | 중점제품(W) | 접근팁(X) | 비고(Y)
- 현재단계: "1단계"~"5단계" (1=초기탐색, 2=관계형성, 3=검토시험, 4=정기처방, 5=핵심고객)
- 잠재등급: "A"(핵심), "B"(성장), "C"(유지)
- 최근반응: "긍정", "보통", "부정"

## 시트명: 활동로그 (총 6,039행, 헤더 포함)
컬럼 순서: 활동ID(A) | 활동일자(B) | 주차(C) | 사업부(D) | 사무소(E) | 소장(F) | MR(G) | 고객ID(H) | 거래처명(I) | 고객명(J) | 전문과목(K) | 활동유형(L) | 방문목적(M) | 중점제품(N) | 결과요약(O) | 고객반응(P) | 단계변화(Q) | 후속조치(R) | 다음활동예정일(S) | 소요시간(분)(T) | 활동점수(U) | 관리자피드백(V)
- 활동일자 형식: "2026-03-01"
- 주차 형식: "2026-W09"
- 단계변화: "상승", "유지", "하락"

# 대시보드 요구사항

## MR 선택 드롭다운
- 페이지 최상단에 MR 이름 선택 드롭다운
- 조직도및MR 시트에서 구분="실무"인 행의 E열(MR)에서 이름 목록 추출
- 선택한 MR의 데이터만 전체 대시보드에 반영 (페이지 새로고침 없이 JavaScript로 필터)

## 내 성과 요약 KPI (4개 카드)
1. 내 담당 거래처 수 (고객마스터에서 MR열 일치)
2. 이번 달 내 활동건수 (활동로그에서 MR열 일치 + 이번 달)
3. 내 잠재등급 A 거래처 수 (잠재등급="A")
4. 이번 주 방문 예정 수 (다음활동예정일이 오늘~7일 이내)

## 오늘의 우선 방문 리스트
- 다음활동예정일이 오늘 ~ 7일 이내인 내 거래처를 날짜 임박 순 정렬
- 컬럼: 거래처명 | 고객명 | 현재단계 | 잠재등급 | 다음활동예정일 | D-Day
- D-Day 배지: 오늘=빨간(#EF4444), 1~3일=주황(#F97316), 4~7일=노란(#EAB308)

## 현재단계별 내 거래처 현황 (5개 카드)
- 1단계~5단계 각각: 거래처 수 + 평균 잠재점수 표시
- 카드 클릭 시 하단 전체 리스트를 해당 단계로 필터

## 내 전체 거래처 리스트
- 현재단계 필터, 잠재등급 필터, 거래처명/고객명 검색
- 컬럼: 거래처명 | 고객명 | 현재단계 | 잠재등급 | 잠재점수 | 최근활동일 | 다음활동예정일 | 접근팁
- 행 클릭 시 활동 이력 모달 표시 (해당 고객의 활동로그 최근 5개)
  - 모달 컬럼: 활동일자 | 활동유형 | 방문목적 | 결과요약 | 단계변화

# 디자인 요구사항
- 색상: 그린 헤더(#059669) + 흰 배경 + 그린 포인트
- 반응형 (모바일 우선, max-width 기준 레이아웃 전환)
- 폰트: Noto Sans KR (구글 폰트 링크 포함)
- 활동 이력 모달: 반투명 오버레이 + 흰 카드

# 기술 요구사항
- Google Apps Script doGet() 함수로 웹앱 구현
- HtmlService.createHtmlOutput()으로 HTML 반환
- 상단에 const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; 변수로 분리
- 모든 데이터는 doGet()에서 읽어서 JSON으로 HTML에 전달
- MR 필터 및 활동 이력 팝업은 클라이언트 JavaScript로 처리 (서버 재호출 없이)
- 모달 닫기: 배경 클릭 또는 X 버튼

완전하고 실행 가능한 코드를 하나의 .gs 파일로 작성해주세요.`

const PROMPT_S2_03 = `당신은 Google Apps Script 전문가입니다.
아래 구글 스프레드시트 데이터를 읽어서 매주 자동으로 주간 영업 보고서를 생성하고 이메일을 발송하는 스크립트를 만들어주세요.

# 스프레드시트 구조 (시트명과 컬럼명을 정확히 사용할 것)

## 시트명: 조직도및MR (총 10행, 헤더 포함)
컬럼 순서: 구분(A) | 사업부(B) | 사무소(C) | 소장(D) | MR(E) | 직급(F) | 담당고객수(G) | 누적활동건수(H) | 연락처(가상)(I)

## 시트명: 고객마스터 (총 1,001행, 헤더 포함)
컬럼 순서: 고객ID(A) | 사업부(B) | 사무소(C) | 소장(D) | MR(E) | 거래처명(F) | 고객명(G) | 고객유형(H) | 전문과목(I) | 전월단계(J) | 현재단계(K) | 잠재점수(L) | 잠재등급(M) | 우선순위(N) | 최근활동일(R) | 다음활동예정일(S) | 이번달활동수(U)
- 잠재등급: "A"(핵심), "B"(성장), "C"(유지)

## 시트명: 활동로그 (총 6,039행, 헤더 포함)
컬럼 순서: 활동ID(A) | 활동일자(B) | 주차(C) | 사무소(E) | MR(G) | 고객ID(H) | 거래처명(I) | 고객명(J) | 활동유형(L) | 방문목적(M) | 결과요약(O) | 단계변화(Q) | 다음활동예정일(S) | 활동점수(U)
- 활동일자 형식: "2026-03-01" (문자열)
- 단계변화: "상승", "유지", "하락"

# 보고서 요구사항

## 이메일 설정 (코드 상단 변수)
- const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'
- const REPORT_EMAIL = 'YOUR_EMAIL_HERE'
- const OFFICE_NAME = '대전1사무소'  ← 사무소명 설정

## 이메일 제목 & 형식
- 제목: [대웅제약] OFFICE_NAME 주간 영업 보고서 - YYYY년 MM월 W주차
- HTML 이메일 (깔끔한 테이블 레이아웃)
- 헤더 색상: #1A2E5A

## 보고서 내용 (이번 주 = 월요일~오늘)
1. **이번 주 총 활동건수** — MR별 분류 테이블 (MR이름 | 활동건수 | 평균활동점수)
2. **단계 변화 현황** — 단계변화="상승"인 거래처 수 / "하락"인 거래처 수
3. **A등급 방문 현황** — 잠재등급=A 거래처 중 이번 주 방문한 수 / 전체 수
4. **다음 주 방문 예정** — 다음활동예정일이 다음 주 월~금인 거래처 상위 10개 (거래처명 | MR | 현재단계 | 다음활동예정일)
5. **방문 지연 거래처** — 다음활동예정일이 오늘 이전인 거래처 목록 (거래처명 | MR | 지연일수)

## 트리거 안내 주석
- 코드 최상단에 트리거 설정 방법 주석으로 안내
- "Apps Script 편집기 → 트리거 → 시간 기반 → 주간 → 금요일 17:00~18:00"

# 기술 요구사항
- 함수명: sendWeeklyReport()
- 이번 주 월요일 ~ 오늘 날짜 자동 계산 (new Date() 활용)
- GmailApp.sendEmail(REPORT_EMAIL, subject, '', {htmlBody: htmlContent}) 사용
- 각 섹션을 별도 함수로 분리 (getWeeklyActivities(), getStageChanges() 등)

완전하고 실행 가능한 코드를 작성해주세요.`

// ─────────────────────────────────────────
// 실습2-04: 고객관리 웹앱 (CRM)
// ─────────────────────────────────────────
const PROMPT_S2_04 = `당신은 Google Apps Script 전문가입니다.
아래 스프레드시트 데이터를 읽어 MR과 소장 모두 사용할 수 있는 고객관리 웹앱을 만들어주세요.

===== 1. 스프레드시트 구조 =====

const SPREADSHEET_ID = '';  // 반드시 실제 ID로 변경

[시트1: 조직도및MR]
컬럼(0-index): 구분(0), 사업부(1), 사무소(2), 소장(3), MR(4), 직급(5), 담당고객수(6), 누적활동건수(7), 연락처(가상)(8)
※ 구분 값: '관리'=소장, '실무'=MR

[시트2: 고객마스터] — 헤더 1행, 데이터 2행부터
컬럼(0-index): 고객ID(0), 사업부(1), 사무소(2), 소장(3), MR(4), 거래처명(5), 고객명(6), 고객유형(7),
전문과목(8), 전월단계(9), 현재단계(10), 잠재점수(11), 잠재등급(12), 우선순위(13),
관심분야(14), 세부관심(15), 선호접점(16), 최근활동일(17), 다음활동예정일(18),
월목표활동수(19), 이번달활동수(20), 최근반응(21), 중점제품(22), 접근팁(23), 비고(24)

[시트3: 활동로그] — 헤더 1행, 데이터 2행부터
컬럼(0-index): 활동ID(0), 활동일자(1), 주차(2), 사업부(3), 사무소(4), 소장(5), MR(6), 고객ID(7),
거래처명(8), 고객명(9), 전문과목(10), 활동유형(11), 방문목적(12), 중점제품(13),
결과요약(14), 고객반응(15), 단계변화(16), 후속조치(17), 다음활동예정일(18),
소요시간(분)(19), 활동점수(20), 관리자피드백(21)

===== 2. 서버 사이드 함수 명세 =====

[doGet()]
- HtmlService.createHtmlOutput(buildAppHtml())으로 HTML 반환
- setTitle('대웅제약 고객관리 앱') 설정

[getInitialData()]
- 조직도및MR에서 구분='실무'인 MR 목록: [{name, office, title}]
- 고객마스터 전체: 각 행을 아래 객체로 변환
  { id, bizUnit, office, manager, mr, bizName, name, type, specialty,
    prevStage, currStage, potScore, potGrade, priority, interest, detailInt,
    prefContact, lastActDate, nextActDate, monthTarget, monthActual,
    lastReaction, keyProduct, approachTip, note }
  날짜 필드(lastActDate, nextActDate)는 'YYYY-MM-DD' 형식 문자열로 변환
- 활동로그 전체: 각 행을 아래 객체로 변환
  { actId, actDate, week, bizUnit, office, manager, mr, custId, bizName, custName,
    specialty, actType, purpose, keyProduct, summary, reaction,
    stageChange, followUp, nextDate, duration, score, feedback }
- JSON.stringify({ mrList, customers, activities }) 반환

[saveActivity(dataJson)]
- dataJson 파싱: { actDate, mr, custId, custName, actType, purpose, keyProduct,
                   summary, reaction, stageChange, followUp, nextDate, duration }
- 활동로그 시트에 새 행 추가:
  활동ID='ACT'+타임스탬프, 주차=ISO 주차 자동계산,
  사무소/소장/사업부는 고객마스터에서 custId로 조회
- 고객마스터 해당 고객 행 업데이트: 최근활동일(18열), 다음활동예정일(19열), 이번달활동수(21열) +1
- nextDate가 있으면 CalendarApp으로 구글 캘린더 종일 일정 등록:
  제목: '[대웅] {거래처명} - {고객명} 방문'
  설명: 'MR: {mr} | 목적: {purpose} | 중점제품: {keyProduct}'
- JSON.stringify({ success: true/false, message }) 반환

[addNewCustomer(dataJson)]
- dataJson 파싱: { mr, bizName, custName, custType, specialty, currStage, potScore,
                   potGrade, priority, interest, detailInt, prefContact, keyProduct,
                   approachTip, monthTarget, lastActDate, nextActDate, note }
- 조직도및MR에서 mr 기준으로 bizUnit, office, manager 조회
- 고객ID = 'CUST' + 타임스탬프
- 고객마스터에 새 행 추가 (컬럼 순서 정확히 준수):
  [custId, bizUnit, office, manager, mr, bizName, custName, custType, specialty,
   currStage(전월단계=현재단계와 동일), currStage, potScore, potGrade, priority,
   interest, detailInt, prefContact, lastActDate, nextActDate, monthTarget,
   0(이번달활동수), '', keyProduct, approachTip, note]
- JSON.stringify({ success: true/false, custId, message }) 반환

[addCalendarEvent(title, dateStr, description)]
- dateStr 'YYYY-MM-DD' → Date 객체 변환
- CalendarApp.getDefaultCalendar().createAllDayEvent(title, date, {description}) 실행
- JSON.stringify({ success: true/false }) 반환

===== 3. 앱 화면 구성 =====

[공통 헤더]
- 배경: #1A2E5A, 앱 이름: '대웅제약 고객관리'
- MR 선택 드롭다운 (전체 보기 + MR 목록, 변경 시 고객 목록/D-Day 즉시 갱신)

[탭 구성: 4개]
PC: 상단 탭바
모바일(768px 이하): 화면 하단 고정 네비게이션 바 (상단 탭바 숨김)
  탭 목록: 📋고객목록 / 📝활동기록 / ⚠️D-Day / ➕신규등록

[탭1: 고객 목록]
필터 바 (모바일에서는 '🔍 검색/필터' 버튼으로 접기/펼치기):
- 텍스트 검색 (거래처명, 고객명)
- 잠재등급: 전체/A/B/C/D
- 현재단계: 전체/1단계/2단계/3단계/4단계/5단계
- 날짜 빠른 선택 (다음활동예정일 기준):
  전체 / 오늘 방문 / 이번 주(~금) / 이번 달(~말일) / 지연 방문 / 직접 입력
  '직접 입력' 선택 시 시작일~종료일 date picker + 초기화 버튼 노출

고객 카드 그리드:
- PC: 2~3열, 모바일: 1열
- 카드: 거래처명(굵게), 고객명·전문과목, 잠재등급 배지, 현재단계 배지, D-Day 표시
  D-Day 0이하=빨강(지연), 1~3=빨강, 4~7=주황, 이상=회색

고객 상세 모달:
- PC: 가운데 팝업, 모바일: 하단에서 슬라이드업 (border-radius: 20px 20px 0 0)
- 좌측: 기본정보 (mr, specialty, type, currStage, potGrade, potScore, interest,
        detailInt, prefContact, keyProduct, lastActDate, nextActDate, approachTip)
- 우측: 활동 이력 타임라인 (해당 custId, 최신순, actDate/actType/summary/stageChange)
- 하단: '활동 기록하기' 버튼 → 탭2로 이동 + 해당 고객 자동 선택

[탭2: 활동 기록]
폼: 활동일자(기본=오늘), MR 선택, 고객 선택(MR 변경 시 갱신),
활동유형(직접방문/전화/이메일/화상), 방문목적, 중점제품,
결과요약(textarea), 고객반응(매우긍정/긍정/중립/부정/매우부정),
단계변화(상승/유지/하락), 후속조치, 다음활동예정일, 소요시간(분)
저장 버튼 → saveActivity() 호출 → 성공 시 폼 초기화 + 데이터 재로드

[탭3: D-Day 경보]
상단 KPI 3개: 오늘 방문 예정 / 이번 주 방문 예정 / 지연 방문
섹션별 목록:
- 🔴 오늘 방문 / 🟠 3일 이내(D-1~D-3) / 🟡 7일 이내(D-4~D-7) / ⏰ 지연
각 카드: 거래처명, 고객명, MR, 잠재등급, 날짜, '📅 캘린더' 버튼 → addCalendarEvent()

[탭4: 신규 고객 등록]
섹션1 - 기본 정보: MR*(필수), 거래처명*(필수), 고객명*(필수), 고객유형, 전문과목,
         현재단계(1~5단계 선택, 기본: 1단계), 잠재등급(A/B/C/D, 기본: C),
         잠재점수(숫자 0~100), 우선순위(높음/중간/낮음)
섹션2 - 고객 특성: 관심분야, 세부관심, 선호접점, 중점제품, 접근팁(textarea)
섹션3 - 활동 계획: 월목표활동수(기본:2), 최근활동일, 다음활동예정일, 비고
저장 버튼 → addNewCustomer() → 성공 시 폼 초기화 + 데이터 재로드 + 고객 목록 탭 이동

===== 4. 디자인 & 모바일 최적화 =====

컬러 시스템:
- 메인: #1A2E5A, 포인트: #E8620A, 배경: #F4F7FB, 테두리: #D0DAE8
- 잠재등급 배지: A=빨강(#fee2e2/#b91c1c), B=주황(#ffedd5/#c2410c), C=파랑(#dbeafe/#1d4ed8), D=회색
- 현재단계 배지: 5단계=진초록, 4단계=초록, 3단계=파랑, 2단계=주황, 1단계=회색

모바일 최적화 (@media max-width: 768px):
- 상단 탭바 숨김, 하단 네비게이션 바 표시 (position: fixed, bottom: 0)
- 탭 콘텐츠 하단 패딩 80px (하단 네비와 겹침 방지)
- 모달: 하단 슬라이드업 (border-radius 상단만, max-height: 90vh, overflow-y: auto)
- 필터 바: 접기/펼치기 토글 버튼, 기본 상태는 접힘
- 입력 필드 font-size: 16px (iOS 자동 줌 방지)
- 터치 타겟 min-height: 44px
- 토스트 알림: 하단 네비 위 (bottom: 70px)
- 고객 그리드: 1열

===== 5. 클라이언트 동작 규칙 =====

- 앱 시작 시 google.script.run.getInitialData()로 데이터 1회 로드
- 모든 필터/검색/탭 전환은 클라이언트에서 처리 (서버 재호출 없음)
- 저장/등록 성공 후에만 getInitialData() 재호출로 데이터 갱신
- 날짜는 항상 'YYYY-MM-DD' 문자열로 비교
- 토스트 알림으로 성공/실패 메시지 3.5초 표시

===== 6. 코딩 규칙 =====

- buildAppHtml() 함수에서 html 문자열 변수에 += 로 조합 후 return html
- 모든 HTML은 문자열 연결(+)로 작성 (백틱 템플릿 리터럴 중첩 절대 금지)
- 날짜 정규화 함수: Date 객체, 문자열 모두 'YYYY-MM-DD'로 변환
- 에러 핸들링: try/catch로 감싸고 JSON.stringify({success:false, message:e.message}) 반환
- const SPREADSHEET_ID = ''; 최상단 선언

===== 7. 배포 방법 =====
1. SPREADSHEET_ID 값 변경
2. 배포 > 새 배포 > 웹 앱 > 실행 계정: 나 > 액세스: 모든 사용자
3. 배포 URL 접속

완전하고 실행 가능한 코드를 작성해주세요.`

export const session2Prompts = [
  {
    id: 201, section: 'session2', tool: 'vibe', category: 'manager',
    title: '소장용 팀 성과 대시보드',
    description: '전체 MR 성과 비교 · 처방단계 파이프라인 · 방문 지연 거래처 현황 · 거래처 검색/필터 — PC/모바일 웹으로 배포.',
    status: 'ready',
    difficulty: '중급',
    time: '30~40분',
    promptText: PROMPT_S2_01,
  },
  {
    id: 202, section: 'session2', tool: 'vibe', category: 'mr',
    title: 'MR 개인 고객 관리 대시보드',
    description: '내 거래처만 필터 · D-Day 우선 방문 알림 · 처방단계별 현황 · 거래처 클릭 시 활동 이력 팝업 — 모바일에서도 사용 가능.',
    status: 'ready',
    difficulty: '중급',
    time: '30~40분',
    promptText: PROMPT_S2_02,
  },
  {
    id: 203, section: 'session2', tool: 'vibe', category: 'report',
    title: '주간 보고서 자동 이메일 발송',
    description: '매주 금요일 자동 실행 · 이번 주 활동 집계 · 다음 주 방문 예정 · MR별 성과 요약 → HTML 이메일 자동 발송.',
    status: 'ready',
    difficulty: '초급',
    time: '15~20분',
    promptText: PROMPT_S2_03,
  },
  {
    id: 204, section: 'session2', tool: 'vibe', category: 'crm',
    title: '고객관리 웹앱 (CRM)',
    description: '고객 목록·검색·필터 · 고객 상세 + 활동 이력 타임라인 · 활동 기록 입력 폼 · D-Day 미방문 경보 · 구글 캘린더 자동 일정 등록.',
    status: 'ready',
    difficulty: '고급',
    time: '50~60분',
    promptText: PROMPT_S2_04,
  },
]


