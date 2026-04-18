export const categories = [
  { id: '전체', label: '전체 (30개)' },
  { id: 'A', label: 'A. 거래처 방문 & BD' },
  { id: 'B', label: 'B. 제품 소개 & 론칭' },
  { id: 'C', label: 'C. 임상 · 학술' },
  { id: 'D', label: 'D. 경쟁 대응' },
  { id: 'E', label: 'E. 환자 케이스' },
  { id: 'F', label: 'F. 영업 보고' },
  { id: 'G', label: 'G. 이벤트 & 관계' },
]

export const categoryMeta = {
  A: { name: '거래처 방문 & BD', color: '#0057A8' },
  B: { name: '제품 소개 & 론칭', color: '#7C3AED' },
  C: { name: '임상 · 학술', color: '#059669' },
  D: { name: '경쟁 대응', color: '#DC2626' },
  E: { name: '환자 케이스', color: '#D97706' },
  F: { name: '영업 보고', color: '#0891B2' },
  G: { name: '이벤트 & 관계', color: '#DB2777' },
}

// ─────────────────────────────────────────
// 프롬프트 #1 전체 텍스트
// ─────────────────────────────────────────
const PROMPT_01 = `[GenSpark Slide Template Request]

STYLE: Corporate Navy
CANVAS: 16:9 (1920x1080px)
TOTAL SLIDES: 10
FONT: Pretendard

════════════════════════════════════════════════════════════════

[DESIGN PHILOSOPHY]
Create VISUALLY RICH, PROFESSIONAL slides for pharmaceutical BD!
Be GENEROUS with visual elements — convey TRUST, EXPERTISE, CREDIBILITY.

[COLOR PALETTE]
- Background: #FFFFFF
- Primary Text: #1A2E5A
- Secondary Text: #6B7280
- Accent Color: #0057A8
- Accent Background: #EBF3FB
- Box/Card Background: #F4F8FC
- Divider: #B3D1EE

[VISUAL ELEMENTS TO USE]
-> Cards/boxes with rounded corners and subtle shadows
-> Icon badges with circular or rounded backgrounds
-> Large bold numbers for stats
-> Accent-colored highlights for product names and key claims
-> Decorative shapes: lines, circles, subtle patterns

[TYPOGRAPHY - Pretendard]
- Titles: Bold, impactful
- Product names: Highlight with accent color
- Clinical numbers: Extra large for visual impact
- Clear hierarchy at all times

════════════════════════════════════════════════════════════════

[SAFE ZONE - STRICT]
- ALL content MUST stay within: X=80~1700px, Y=80~900px
- HARD STOP: Nothing below Y=900px -> if content overflows, REDUCE font size or item count, NEVER extend downward
- HARD STOP: Nothing right of X=1700px
- Logo reserved zone: X=1720~1920px (DO NOT place any element here)
- Footer reserved zone: Y=940~1080px (DO NOT place any element here)

[CONTENT DENSITY RULES]
- Max bullet points per slide: 5
- Max characters per bullet point: 40 (Korean)
- Max lines per text block: 3
- Title max characters: 20
- If [CONTENT] input exceeds limits: truncate and summarize — DO NOT overflow
- Minimum font size: 18px (never go smaller)

[OVERLAP PREVENTION - CRITICAL]
- Minimum gap between any two adjacent elements: 16px
- Before placing stacked elements, calculate total height:
  Total stack height = sum of all element heights + all gaps between them
  Total stack height MUST be less than or equal to 820px
- Card/box height = content height + top padding(24px) + bottom padding(24px)
- Include padding in ALL size calculations
- VERIFY all elements fit within safe zone BEFORE rendering
- If layout cannot fit: reduce item count — NEVER extend beyond boundaries

════════════════════════════════════════════════════════════════

[SLIDE SPECIFICATIONS]

---
SLIDE 1: COVER
---
Layout: ALL ELEMENTS CENTERED HORIZONTALLY AND VERTICALLY
Safe zone: X=80~1700, Y=80~900

Elements (top to bottom, total stack height must be less than or equal to 820px):
- Badge: pill-shape, background #EBF3FB, text 20px Medium #0057A8
  Height: 36px
- Gap: 20px
- Accent Line: 120x4px #0057A8, centered
  Height: 4px
- Gap: 24px
- Main Title: 64px Bold #1A2E5A, centered, max 1 line
  Height: 76px
- Gap: 18px
- Subtitle: 32px Medium #0057A8, centered, max 1 line
  Height: 40px
- Gap: 48px
- Hospital Info: 24px Regular #6B7280, centered
  Height: 30px
- Gap: 12px
- MR Info: 22px Regular #6B7280, centered
  Height: 28px
- Gap: 32px
- Bottom Line: 120x3px #B3D1EE, centered
  Height: 3px
-> Total: 36+20+4+24+76+18+40+48+30+12+28+32+3 = 371px (OK)

[CONTENT]
- Badge: 대웅제약 ETC본부
- Title: [제품명] 처방 제안서
- Subtitle: [적응증 또는 슬로건]
- Hospital: [병원명] [담당 의사명] 선생님께
- MR: [MR 이름] | 대웅제약 ETC [지역]본부

---
SLIDE 2: MR 소개
---
Layout: TWO COLUMNS, vertically centered
Safe zone: X=80~1700, Y=80~900
Column boundary: Left X=80~680 / Right X=740~1700

Left Column (width=600px):
- Profile circle: 260x260px, background #F4F8FC, border 3px #0057A8, centered
- Gap: 16px
- Name: 36px Bold #1A2E5A, centered, max 10자
  Height: 44px
- Gap: 8px
- Title Tag: 20px Medium #0057A8, centered, max 16자
  Height: 26px
-> Left column total height: 260+16+44+8+26 = 354px (OK)

Right Column (width=960px):
- Label: "ABOUT MR" 18px Medium #0057A8
  Height: 22px
- Gap: 10px
- Divider: 60x3px #0057A8
  Height: 3px
- Gap: 20px
- Bullet 1~4: 24px Regular #1A2E5A, bullet circle 8px #0057A8, line-height=48px
  Height: 4x48 = 192px
- Gap: 20px
- Highlight Box: background #EBF3FB, border-left 4px #0057A8, padding 18px
  Inner text: 20px Regular #1A2E5A, max 2 lines
  Height: 56px
-> Right column total height: 22+10+3+20+192+20+56 = 323px (OK)

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
Layout: CENTERED HORIZONTALLY AND VERTICALLY
Safe zone: X=80~1700, Y=80~900

Elements (total stack height less than or equal to 820px):
- Title: "오늘의 제안 순서" 52px Bold #1A2E5A, centered
  Height: 62px
- Gap: 12px
- Subtitle: 24px Regular #6B7280, centered, max 30자
  Height: 30px
- Gap: 40px
- Chapter List (4 items):
  Each item = Number circle(44px) + Title text(32px Medium) side by side
  Item height: 52px, gap between items: 24px
  Total: (52x4) + (24x3) = 280px
-> Total: 62+12+30+40+280 = 424px (OK)

[CONTENT]
- Subtitle: [병원명] · [방문 날짜]
- Chapter 1: [제품명] 소개
- Chapter 2: 임상 근거 데이터
- Chapter 3: 처방 혜택 및 지원
- Chapter 4: 제안 요약 및 Q&A

---
SLIDE 4: 제품 소개
---
Layout: 50/50 SPLIT
Safe zone: X=80~1700, Y=80~900
Left half: X=80~820 / Right half: X=880~1700

Left Half:
- Image placeholder: 640x400px, background #EBF3FB, rounded 14px, border 2px #B3D1EE
  Vertically centered, Y=250px
- Product badge: pill-tag at bottom-center of image, background #0057A8, text #FFFFFF 20px Bold
  Height: 32px, Y=650px
- Caption: 16px Regular #6B7280, centered, Y=690px, max 20자

Right Half:
- Label: "PRODUCT OVERVIEW" 16px Medium #0057A8, Y=200px
- Gap: 10px
- Product Name: 44px Bold #1A2E5A, max 14자
  Height: 52px
- Gap: 14px
- Divider: 60x3px #0057A8
- Gap: 20px
- Feature Cards (3 items):
  Each card: width=820px, height=100px, background #F4F8FC, rounded 10px
  Inside: icon circle 40px (left) + Title 22px Bold #1A2E5A + Desc 18px Regular #6B7280
  Gap between cards: 16px
  Total: (100x3)+(16x2) = 332px

[CONTENT]
- Product Name: [제품명]
- Caption: [성분명 / 제형 / 용량]
- Feature 1 Title: [특징1] / Feature 1 Desc: [설명, 20자 이내]
- Feature 2 Title: [특징2] / Feature 2 Desc: [설명, 20자 이내]
- Feature 3 Title: [특징3] / Feature 3 Desc: [설명, 20자 이내]

---
SLIDE 5: 핵심 임상 데이터
---
Layout: Title TOP-LEFT, 3 Stat boxes CENTERED BELOW
Safe zone: X=80~1700, Y=80~900

Title Area (Y=80~199):
- Title: 52px Bold #1A2E5A, X=120px, Y=80px, max 18자
- Gap: 12px
- Subtitle: 22px Regular #6B7280, max 36자
- Gap: 14px
- Divider: 80x3px #0057A8

Stat Boxes Area (Y=220~520):
- 3 boxes centered, total width = (380x3)+(48x2) = 1236px
- Each box: 380x280px, background #F4F8FC, rounded 16px, top border 4px #0057A8
  Inside:
  - Number: 80px Bold #0057A8, centered, padding-top 28px
  - Label: 24px Medium #1A2E5A, gap 14px
  - Desc: 18px Regular #6B7280, gap 8px, max 2 lines
- Box top Y=240px, box bottom Y=520px (OK, within 900px)

Source note: 16px Regular #6B7280, centered, Y=560px (OK)

[CONTENT]
- Title: 임상 근거 핵심 데이터
- Subtitle: [논문명 또는 임상 연구명]
- Stat 1 Number: [수치, ex: 98%] / Label: [항목명] / Desc: [설명 20자 이내]
- Stat 2 Number: [수치] / Label: [항목명] / Desc: [설명 20자 이내]
- Stat 3 Number: [수치] / Label: [항목명] / Desc: [설명 20자 이내]
- Source: 출처: [학술지명, 연도]

---
SLIDE 6: 경쟁 제품 비교
---
Layout: Title TOP-LEFT, 2 comparison boxes CENTERED
Safe zone: X=80~1700, Y=80~900

Title Area (Y=80~182):
- Title: 52px Bold #1A2E5A, X=120px, Y=80px
- Gap: 12px
- Subtitle: 22px Regular #6B7280

Comparison Area (Y=210~730):
- Two boxes + VS badge, total width = 520+80+520 = 1120px
  Start X = 370px
- Each box: 520x520px, rounded 12px
- VS badge: 56x56px circle, background #1A2E5A, "VS" 20px Bold #FFFFFF
  Centered horizontally between boxes, Y-center = 470px
- Box bottom Y = 730px (OK)

Left Box (우리 제품):
- Header: 28px Bold #0057A8, padding 20px top, max 12자
- Horizontal line: 1px #B3D1EE, margin 14px
- Bullets max 4: 22px Regular #1A2E5A, bullet 8px #0057A8, line-height 52px
- Background: #EBF3FB, border-top 4px #0057A8

Right Box (경쟁사):
- Same structure, Header color: #6B7280, bullet color: #9CA3AF
- Background: #F9FAFB

[CONTENT]
- Title: 왜 [제품명]인가?
- Left Header: [제품명] (대웅제약)
- Left Bullet 1~4: [우위점 각 20자 이내]
- Right Header: 타사 동일 계열
- Right Bullet 1~4: [상대적 약점 각 20자 이내]

---
SLIDE 7: 처방 대상 환자 프로파일
---
Layout: Title TOP-LEFT, 4 profile cards CENTERED
Safe zone: X=80~1700, Y=80~900

Title Area (Y=80~182):
- Title: 52px Bold #1A2E5A, X=120px, Y=80px
- Gap: 12px
- Subtitle: 22px Regular #6B7280, max 36자

Cards Area (Y=210~610):
- 4 cards in a row, total width = (280x4)+(32x3) = 1216px, Start X=322px
- Each card: 280x400px, background #F4F8FC, rounded 16px, top border 3px #0057A8
  Inside:
  - Icon circle: 64x64px, background #EBF3FB, border 2px #0057A8, centered, padding-top 24px
  - Gap: 16px
  - Patient Type: 22px Bold #1A2E5A, centered, max 10자
  - Gap: 10px
  - Description: 18px Regular #6B7280, centered, max 3 lines
  - Padding-bottom: 24px
- Cards bottom Y = 610px (OK)

[CONTENT]
- Title: 이런 환자에게 [제품명]을 권합니다
- Subtitle: [선생님 진료 환경에 맞는 처방 대상 요약, 30자 이내]
- Profile 1: [환자 유형1] / [설명 40자 이내]
- Profile 2: [환자 유형2] / [설명 40자 이내]
- Profile 3: [환자 유형3] / [설명 40자 이내]
- Profile 4: [환자 유형4] / [설명 40자 이내]

---
SLIDE 8: 처방 지원 프로그램
---
Layout: Title TOP-LEFT, 3 support cards STACKED
Safe zone: X=80~1700, Y=80~900

Title Area (Y=80~201):
- Title: 52px Bold #1A2E5A, X=120px, Y=80px
- Gap: 12px
- Subtitle: 22px Regular #6B7280, max 36자
- Gap: 16px
- Divider: 80x3px #0057A8

Support Cards (Y=225~745):
- 3 cards stacked vertically
- Each card: X=120~1700 (width=1580px), height=160px, background #F4F8FC, rounded 12px, left border 5px #0057A8
- Gap between cards: 20px
- Total: (160x3)+(20x2) = 520px
- Cards bottom Y = 745px (OK)

Each Card Inside:
- Left icon circle: 56x56px, background #EBF3FB, X=24px, vertically centered
- Title: 24px Bold #1A2E5A, X=104px, max 20자
- Description: 20px Regular #6B7280, X=104px, max 1 line 40자

[CONTENT]
- Title: 처방 후 지원 프로그램
- Subtitle: 대웅제약이 선생님의 처방을 끝까지 책임집니다
- Support 1 Title: [지원명1] / Desc: [설명 40자 이내]
- Support 2 Title: [지원명2] / Desc: [설명 40자 이내]
- Support 3 Title: [지원명3] / Desc: [설명 40자 이내]

---
SLIDE 9: 제안 요약
---
Layout: Title CENTERED TOP, large summary card CENTERED
Safe zone: X=80~1700, Y=80~900

Title Area (Y=80~162):
- Title: "처방 제안 요약" 52px Bold #1A2E5A, centered, Y=80px
- Gap: 16px
- Divider: 100x4px #0057A8, centered

Summary Card (Y=185~705):
- Card: X=120~1700 (width=1580px), height=520px
  Background #EBF3FB, rounded 20px, border 2px #B3D1EE
- Card bottom Y = 705px (OK)

Inside Card — 3 columns:
- Each column width = 494px
- Column content centered vertically within card
  - Icon circle: 72x72px, background #FFFFFF, border 2px #0057A8
  - Gap: 16px
  - Heading: 26px Bold #1A2E5A, max 10자
  - Gap: 10px
  - Body: 20px Regular #6B7280, max 2 lines

Bottom CTA Strip (Y=625~705):
- Height=80px, Background #0057A8, rounded bottom 20px
- Text: 22px Medium #FFFFFF, centered, max 40자

[CONTENT]
- Column 1 Heading: 제품의 강점
- Column 1 Body: [핵심 강점 2줄 이내]
- Column 2 Heading: 처방 대상
- Column 2 Body: [핵심 처방 대상 2줄 이내]
- Column 3 Heading: 지원 내용
- Column 3 Body: [지원 프로그램 2줄 이내]
- CTA: [선생님, [제품명] 처방을 부탁드립니다]

---
SLIDE 10: CLOSING
---
Layout: ALL ELEMENTS CENTERED HORIZONTALLY AND VERTICALLY
Safe zone: X=80~1700, Y=80~900

Elements (total stack height less than or equal to 820px):
- Icon circle: 88x88px, background #EBF3FB, border 3px #0057A8, centered
- Gap: 20px
- Accent Line: 100x4px #0057A8, centered
- Gap: 24px
- Main Text: "감사합니다" 68px Bold #1A2E5A, centered
- Gap: 16px
- Subtext: 26px Regular #6B7280, centered, max 28자
- Gap: 28px
- Divider: 80x2px #B3D1EE, centered
- Gap: 24px
- Name: 26px Bold #1A2E5A, centered
- Gap: 8px
- Phone: 24px Regular #0057A8, centered
- Gap: 6px
- Email: 22px Regular #6B7280, centered
- Gap: 24px
- Bottom Line: 100x4px #B3D1EE, centered
-> Total: 88+20+4+24+80+16+32+28+2+24+32+8+30+6+28+24+4 = 450px (OK)

[CONTENT]
- Subtext: 언제든지 연락 주세요. 최선을 다하겠습니다.
- Name: [MR 이름] | 대웅제약 ETC [지역]본부
- Phone: [연락처]
- Email: [이메일]`

// ─────────────────────────────────────────
// 30개 프롬프트 목록
// ─────────────────────────────────────────
export const prompts = [
  // ── A. 거래처 방문 & BD 제안 ──────────────────────────────────
  {
    id: 1,
    category: 'A',
    title: '신규 거래처 첫 방문 BD',
    description: '새 병원/의원 첫 방문 전, 담당 의사 맞춤형 제품 소개 BD 슬라이드. 커버·MR 소개·제품·임상·비교·지원·마무리 구성.',
    slides: 10,
    status: 'ready',
    promptText: PROMPT_01,
  },
  {
    id: 2,
    category: 'A',
    title: '기존 거래처 처방 증대 제안',
    description: '이미 처방 중인 의사를 대상으로 처방 확대를 설득하는 BD 자료. 현재 처방 현황 → 목표 처방 → 단계별 액션 플랜 구성.',
    slides: 8,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 3,
    category: 'A',
    title: '휴면 거래처 재활성화 제안',
    description: '처방이 끊긴 거래처를 다시 시작하기 위한 설득 자료. 업데이트된 임상 데이터와 새로운 지원 프로그램 중심 구성.',
    slides: 7,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 4,
    category: 'A',
    title: 'VIP 거래처 파트너십 제안',
    description: '핵심 고객 의사를 위한 심층 파트너십 제안서. 장기적 협력 관계, 전용 지원 프로그램, 감사 메시지 포함.',
    slides: 10,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 5,
    category: 'A',
    title: '복수 제품 크로스셀 제안',
    description: '한 의사에게 2~3개 제품을 함께 제안하는 BD 자료. 제품 간 시너지와 처방 조합의 이점을 시각화.',
    slides: 10,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 6,
    category: 'A',
    title: '계절/시즌 맞춤 처방 제안',
    description: '독감철, 환절기, 연말 등 시즌별 처방 이슈에 맞춘 타이밍 BD 자료. 시즌 리스크와 솔루션 중심 구성.',
    slides: 7,
    status: 'coming-soon',
    promptText: '',
  },

  // ── B. 제품 소개 & 론칭 ──────────────────────────────────────
  {
    id: 7,
    category: 'B',
    title: '신제품 론칭 소개 PPT',
    description: '신규 출시 제품의 첫 소개 슬라이드. 제품 탄생 배경, 기전, 임상 하이라이트, 처방 포인트 풀 구성.',
    slides: 12,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 8,
    category: 'B',
    title: '성분/기전 중심 과학적 소개',
    description: '약리학적 기전과 성분을 의사에게 설명하는 학술적 제품 소개 PPT. 기전 다이어그램, 작용 단계 시각화.',
    slides: 10,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 9,
    category: 'B',
    title: '복용 편의성 강조 소개',
    description: '1일 1회, 제형 편의성, 복약 순응도를 중심으로 어필하는 소개 PPT. 환자 입장의 편의성 스토리라인.',
    slides: 8,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 10,
    category: 'B',
    title: '보험 급여/가격 경쟁력 소개',
    description: '급여 인정 범위, 본인부담금, 비용 효과성을 강조하는 PPT. 수치 비교와 환자 경제성 중심 구성.',
    slides: 8,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 11,
    category: 'B',
    title: '복합제/콤보 처방 제안',
    description: '병용 처방 또는 복합제의 이점을 설명하는 PPT. 단일 제제 대비 효과, 복약 편의성, 순응도 데이터.',
    slides: 10,
    status: 'coming-soon',
    promptText: '',
  },

  // ── C. 임상 · 학술 자료 ──────────────────────────────────────
  {
    id: 12,
    category: 'C',
    title: '핵심 임상 논문 요약 발표',
    description: '최신 임상 논문의 핵심을 의사에게 전달하는 학술 요약 PPT. 연구 설계·결과·결론 구조화 발표.',
    slides: 10,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 13,
    category: 'C',
    title: 'Real-World Evidence 공유',
    description: '실제 처방 현장에서 수집된 RWE 데이터를 공유하는 PPT. 임상 현실과의 괴리 없는 근거 제시.',
    slides: 10,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 14,
    category: 'C',
    title: '가이드라인 업데이트 소개',
    description: '최신 치료 지침 변경 내용을 공유하는 PPT. 개정 전후 비교, 우리 제품의 위치 강조.',
    slides: 8,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 15,
    category: 'C',
    title: '부작용·안전성 프로파일 설명',
    description: '안전성 우려를 객관적으로 해소하는 PPT. 부작용 발생률 비교, 모니터링 방법, 대처법 안내.',
    slides: 8,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 16,
    category: 'C',
    title: '학술 세미나 발표 자료',
    description: '병원 내 소규모 CME/세미나 발표용 풀 학술 PPT. 도입·본론·결론·Q&A 완전 구성.',
    slides: 20,
    status: 'coming-soon',
    promptText: '',
  },

  // ── D. 경쟁 대응 ─────────────────────────────────────────────
  {
    id: 17,
    category: 'D',
    title: '경쟁 제품 비교 분석표',
    description: '타사 제품과의 객관적 비교를 시각화한 PPT. 효능·안전성·편의성·가격 항목별 비교.',
    slides: 8,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 18,
    category: 'D',
    title: '타사 → 대웅 스위칭 제안',
    description: '현재 타사 제품을 처방 중인 의사를 대상으로 전환을 설득하는 PPT. 전환 이유와 단계별 전환 계획.',
    slides: 8,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 19,
    category: 'D',
    title: '제네릭 대응 전략 PPT',
    description: '특허 만료 후 오리지널 제품 유지를 위한 전략 PPT. 오리지널의 차별점과 제네릭 전환 리스크.',
    slides: 8,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 20,
    category: 'D',
    title: '가격 vs 효능 포지셔닝',
    description: '비용 대비 효과를 논리적으로 설득하는 PPT. 비싸도 처방해야 하는 이유를 데이터로 증명.',
    slides: 7,
    status: 'coming-soon',
    promptText: '',
  },

  // ── E. 환자 케이스 & 처방 가이드 ────────────────────────────
  {
    id: 21,
    category: 'E',
    title: '환자 프로파일별 처방 추천',
    description: '다양한 환자 유형별로 어떤 환자에게 처방할지 명확히 제시하는 PPT. 프로파일 매칭 시각화.',
    slides: 8,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 22,
    category: 'E',
    title: '처방 성공 케이스 스터디',
    description: '실제 처방 성공 사례를 스토리텔링 방식으로 전달하는 PPT. Before/After, 환자 반응 포함.',
    slides: 8,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 23,
    category: 'E',
    title: '처방 전환 단계별 가이드',
    description: '첫 처방 → 유지 → 증량 단계별 처방 전략을 안내하는 PPT. 단계별 체크포인트와 MR 액션.',
    slides: 8,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 24,
    category: 'E',
    title: '적응증별 처방 플로우',
    description: '질환별 처방 결정 흐름을 시각화한 PPT. 적응증 → 환자 선별 → 용량 선택 → 모니터링 플로우.',
    slides: 8,
    status: 'coming-soon',
    promptText: '',
  },

  // ── F. 영업 보고 & 내부 자료 ─────────────────────────────────
  {
    id: 25,
    category: 'F',
    title: '주간 영업 활동 보고',
    description: '팀장/소장 보고용 주간 영업 활동 요약 PPT. 방문 현황, 처방 변화, 이슈, 다음 주 계획.',
    slides: 6,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 26,
    category: 'F',
    title: '월간 성과 & 목표 현황',
    description: '본부 보고용 월간 성과 PPT. 목표 대비 달성률, 제품별 처방 현황, KPI 대시보드 시각화.',
    slides: 8,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 27,
    category: 'F',
    title: '분기 전략 계획 발표',
    description: '분기 킥오프 또는 전략 회의용 PPT. 지난 분기 리뷰, 이번 분기 목표, 중점 활동 계획.',
    slides: 10,
    status: 'coming-soon',
    promptText: '',
  },

  // ── G. 이벤트 & 관계 강화 ────────────────────────────────────
  {
    id: 28,
    category: 'G',
    title: '런치 미팅 / 제품 설명회',
    description: '점심 시간을 활용한 제품 설명회 자료. 짧고 임팩트 있는 핵심 메시지 중심, 5~7분 발표용.',
    slides: 6,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 29,
    category: 'G',
    title: '심포지엄 발표 자료',
    description: '병원 내 소규모 의학 심포지엄 발표용 PPT. 학술적 권위와 비주얼 임팩트를 동시에 갖춘 구성.',
    slides: 20,
    status: 'coming-soon',
    promptText: '',
  },
  {
    id: 30,
    category: 'G',
    title: '연말/시즌 인사 & 감사 자료',
    description: '연말·명절·기념일에 거래처 의사에게 전달하는 감사 인사 PPT. 따뜻한 디자인과 진심 메시지.',
    slides: 5,
    status: 'coming-soon',
    promptText: '',
  },
]
