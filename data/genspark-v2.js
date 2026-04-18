// ════════════════════════════════════════════════════════════════
// 젠스파크 프롬프트 V2 - 2단계 분리 방식
// Step 1: ChatGPT/Claude로 원문을 슬라이드 구조에 맞게 정제
// Step 2: 젠스파크로 정제된 텍스트를 디자인 렌더링
// ════════════════════════════════════════════════════════════════

// ── 디자인 프리셋 6종
export const designPresets = {
  'navy-gold': {
    name: '딥 네이비 + 골드 (프리미엄 BD)',
    colors: {
      bg: '#0F1F3D', bgAlt: '#1A2E5A',
      text: '#FFFFFF', textMuted: '#CBD5E1', textSub: '#94A3B8',
      accent: '#C9A84C', accentSoft: '#E6D199',
      box: '#1A2E5A', boxBorder: '#C9A84C',
    },
    mood: '프리미엄, 권위감, 신뢰, 고급스러움',
    typography: '대제목 64px Heavy · 수치 80px Black · 본문 22px Regular',
    pattern: '다크 배경 + 골드 포인트. 수치를 박스로 크게 강조. 고급스럽고 격식 있는 분위기.',
  },
  'corporate-blue': {
    name: '코퍼레이트 블루 (비즈니스)',
    colors: {
      bg: '#FFFFFF', bgAlt: '#F1F5F9',
      text: '#0F172A', textMuted: '#334155', textSub: '#64748B',
      accent: '#1D4ED8', accentSoft: '#DBEAFE',
      box: '#EFF6FF', boxBorder: '#BFDBFE',
    },
    mood: '전문적, 신뢰감, 격식, 정돈된',
    typography: '대제목 56px Bold · 수치 72px Black · 본문 20px Regular',
    pattern: '화이트 배경 + 블루 헤더바. 비교 박스·KPI 카드 중심. 정돈된 비즈니스 문서 느낌.',
  },
  'clean-medical': {
    name: '클린 메디컬 (학술·임상)',
    colors: {
      bg: '#FFFFFF', bgAlt: '#F0FDF4',
      text: '#064E3B', textMuted: '#047857', textSub: '#065F46',
      accent: '#059669', accentSoft: '#A7F3D0',
      box: '#ECFDF5', boxBorder: '#6EE7B7',
    },
    mood: '청결함, 임상적 신뢰, 과학적 객관성',
    typography: '대제목 52px Bold · 수치 68px Black · 본문 20px Regular',
    pattern: '화이트 + 그린 계열. 데이터 표·그래프·통계 수치 중심. 학술지 스타일.',
  },
  'warm-academic': {
    name: '웜 아카데믹 (논문·학술)',
    colors: {
      bg: '#FFFBF0', bgAlt: '#FEF3C7',
      text: '#1C1917', textMuted: '#292524', textSub: '#78716C',
      accent: '#92400E', accentSoft: '#FDE68A',
      box: '#FFFFFF', boxBorder: '#D6D3D1',
    },
    mood: '학술적 권위, 따뜻함, 격식, 고전적',
    typography: '세리프 명조 · 대제목 48px · 본문 20px · 레퍼런스 14px',
    pattern: '크림 종이 배경 + 세리프 폰트. 서론·방법·결과·결론 구조. 레퍼런스 표기 필수.',
  },
  'impact-dark': {
    name: '임팩트 다크 (설득·PT)',
    colors: {
      bg: '#09090B', bgAlt: '#1C1C1E',
      text: '#FFFFFF', textMuted: '#D4D4D8', textSub: '#71717A',
      accent: '#06B6D4', accentSoft: '#22D3EE',
      box: '#18181B', boxBorder: '#06B6D4',
    },
    mood: '강렬함, 임팩트, 설득, 현대적',
    typography: '초대형 수치 96px Black · 대제목 60px · 본문 22px',
    pattern: '풀 다크 배경 + 시안 글로우. 대형 숫자 1개가 중심. 짧고 강렬한 메시지.',
  },
  'energetic-coral': {
    name: '에너제틱 코랄 (감사·관계)',
    colors: {
      bg: '#FFF7ED', bgAlt: '#FFEDD5',
      text: '#7C2D12', textMuted: '#9A3412', textSub: '#C2410C',
      accent: '#EA580C', accentSoft: '#FED7AA',
      box: '#FFFFFF', boxBorder: '#FDBA74',
    },
    mood: '따뜻함, 친밀감, 감사, 희망',
    typography: '대제목 56px Bold · 본문 22px Regular',
    pattern: '따뜻한 오렌지-코랄 톤. 둥근 카드와 친근한 아이콘. 감성적 메시지 중심.',
  },
}

// ── 슬라이드 타입별 필드 스펙
export const slideTypes = {
  cover: {
    name: 'COVER (표지)',
    layout: '중앙 정렬, 브랜드 배지 상단, 타이틀 대형, 대상 정보 하단',
    fields: ['뱃지(제목 위, 10자)', '메인 타이틀(20자)', '서브 타이틀(40자)', '대상(병원명·의사명, 30자)', '발표자(MR명·본부, 30자)'],
  },
  'stat-3': {
    name: 'STAT BOX ×3 (수치 3개)',
    layout: '제목 상단 · 3개 수치 박스 가로 배열 · 출처 하단',
    fields: ['타이틀(18자)', '서브타이틀(30자)', '수치1(단위 포함)·라벨(10자)·설명(20자)', '수치2·라벨·설명', '수치3·라벨·설명', '출처(15자)'],
  },
  'stat-4': {
    name: 'STAT BOX ×4 (수치 4개)',
    layout: '제목 상단 · 2×2 수치 박스 · 출처 하단',
    fields: ['타이틀(18자)', '수치1·라벨(10자)·설명(18자)', '수치2·라벨·설명', '수치3·라벨·설명', '수치4·라벨·설명', '출처(15자)'],
  },
  'compare-2': {
    name: 'COMPARE ×2 (좌우 비교)',
    layout: '제목 상단 · 좌우 50:50 비교 박스 · 결론 하단',
    fields: ['타이틀(18자)', '좌측 헤더(10자)', '좌측 불릿 1~4 (각 22자)', '우측 헤더(10자)', '우측 불릿 1~4 (각 22자)', '결론 메시지(30자)'],
  },
  'process-4': {
    name: 'PROCESS ×4 (4단계)',
    layout: '제목 상단 · 4단계 가로 플로우 · 각 단계 원형 번호+타이틀+설명',
    fields: ['타이틀(18자)', '단계1: 이름(8자)·설명(22자)', '단계2: 이름·설명', '단계3: 이름·설명', '단계4: 이름·설명'],
  },
  'process-3': {
    name: 'PROCESS ×3 (3단계)',
    layout: '제목 상단 · 3단계 가로 플로우',
    fields: ['타이틀(18자)', '단계1: 이름(8자)·설명(25자)', '단계2: 이름·설명', '단계3: 이름·설명'],
  },
  'cards-3': {
    name: 'CARDS ×3 (카드 3개)',
    layout: '제목 상단 · 3개 카드 가로 배열 · 각 카드: 아이콘힌트+헤더+본문',
    fields: ['타이틀(18자)', '카드1: 아이콘힌트(한 단어)·헤더(10자)·본문(40자)', '카드2: 아이콘힌트·헤더·본문', '카드3: 아이콘힌트·헤더·본문'],
  },
  'cards-4': {
    name: 'CARDS ×4 (카드 4개)',
    layout: '제목 상단 · 2×2 카드 그리드',
    fields: ['타이틀(18자)', '카드1: 아이콘힌트·헤더(10자)·본문(35자)', '카드2: 아이콘힌트·헤더·본문', '카드3: 아이콘힌트·헤더·본문', '카드4: 아이콘힌트·헤더·본문'],
  },
  profile: {
    name: 'PROFILE (인물 소개)',
    layout: '좌측 원형 이니셜+소속 · 우측 이름·직함·경력·담당·연락처',
    fields: ['이름(10자)', '직함·본부(20자)', '경력 1~3줄 (각 30자)', '담당 제품(30자)', '연락처(20자)'],
  },
  bullets: {
    name: 'BULLETS (불릿 리스트)',
    layout: '제목 상단 · 본문 4~6개 불릿 · 키포인트 박스 하단',
    fields: ['타이틀(18자)', '불릿 1(22자)', '불릿 2(22자)', '불릿 3(22자)', '불릿 4(22자)', '불릿 5(22자, 선택)', '불릿 6(22자, 선택)', '키포인트(30자, 선택)'],
  },
  table: {
    name: 'TABLE (비교표)',
    layout: '제목 상단 · 표(행 3~4, 열 3~4) · 출처 하단',
    fields: ['타이틀(18자)', '열 헤더 1~4 (각 10자)', '행1 데이터 1~4셀 (각 15자)', '행2 데이터', '행3 데이터', '행4 데이터(선택)', '출처(20자)'],
  },
  toc: {
    name: 'TABLE OF CONTENTS (목차)',
    layout: '제목 상단 · 번호 매긴 목차 항목',
    fields: ['타이틀(10자)', '목차1(20자)', '목차2(20자)', '목차3(20자)', '목차4(20자)', '목차5(20자)', '목차6(20자, 선택)'],
  },
  closing: {
    name: 'CLOSING (감사)',
    layout: '중앙 정렬, 메인 메시지 대형, 서브 메시지, 연락처 하단',
    fields: ['메인 메시지(15자)', '서브 메시지(35자)', 'MR 이름(15자)', '연락처(15자)', '이메일(30자)'],
  },
}

// ── 30개 시나리오 전체 정의
export const scenarios = [

  // ══════ A. 거래처 방문 & BD ══════
  {
    id: 1, category: 'A', preset: 'corporate-blue',
    title: '신규 거래처 첫 방문 BD',
    scenario: '새 병원/의원에 처음 방문하는 MR이 담당 의사에게 자사 제품을 소개하며 신뢰를 형성하는 BD 자료',
    purpose: '첫 인사와 제품·MR 소개를 통해 처방 관심 유도',
    slides: [
      { type: 'cover',     topic: '표지: [제품명] 처방 제안서' },
      { type: 'profile',   topic: 'MR 인사 및 자기소개' },
      { type: 'toc',       topic: '오늘 말씀드릴 내용' },
      { type: 'stat-3',    topic: '제품 핵심 강점 (유효성·안전성·편의성)' },
      { type: 'compare-2', topic: '기존 치료 vs [제품명] 비교' },
      { type: 'stat-3',    topic: '주요 임상 결과 (수치 3개)' },
      { type: 'cards-3',   topic: '처방 시 MR 지원 프로그램' },
      { type: 'bullets',   topic: '처방 대상 환자 제안' },
      { type: 'process-3', topic: '처방 시작→모니터링→피드백 단계' },
      { type: 'closing',   topic: '감사 인사 및 연락처' },
    ],
  },

  {
    id: 2, category: 'A', preset: 'corporate-blue',
    title: '기존 거래처 처방 증대 제안',
    scenario: '이미 [제품명]을 처방 중인 의사에게 처방량 확대를 설득하는 MR의 제안',
    purpose: '현재 처방을 유지하면서 대상 환자군을 넓혀 월 처방량 증대',
    slides: [
      { type: 'cover',     topic: '표지: [제품명] 처방 증대 제안' },
      { type: 'stat-3',    topic: '현재 처방 현황 (월 처방·환자군·원내 점유율)' },
      { type: 'compare-2', topic: '현재 처방 패턴 vs 확대 가능 영역' },
      { type: 'process-4', topic: '추가 처방 가능 적응증 4가지' },
      { type: 'stat-3',    topic: '처방 증대 시뮬레이션 (현재→목표→증가분)' },
      { type: 'stat-3',    topic: '더 처방해야 하는 임상 근거' },
      { type: 'cards-3',   topic: '처방 증대 지원 프로그램 3개' },
      { type: 'closing',   topic: '함께 성장하겠습니다' },
    ],
  },

  {
    id: 3, category: 'A', preset: 'navy-gold',
    title: '휴면 거래처 재활성화 제안',
    scenario: '처방이 끊긴 거래처 의사에게 다시 처방을 시작하도록 설득하는 MR의 재방문 제안',
    purpose: '업데이트된 임상 데이터와 새 지원 프로그램으로 처방 재개 유도',
    slides: [
      { type: 'cover',     topic: '표지: 다시 찾아왔습니다 — [제품명] 업데이트' },
      { type: 'stat-3',    topic: '이전 처방 이후 달라진 점 (임상 업데이트 3가지)' },
      { type: 'compare-2', topic: '처방 중단 이유 vs 해결된 내용' },
      { type: 'stat-3',    topic: '최신 실사용 데이터 (RWE 수치 3개)' },
      { type: 'cards-3',   topic: '재처방 지원 프로그램 3개' },
      { type: 'process-3', topic: '재처방 시작→첫 환자→피드백 단계' },
      { type: 'closing',   topic: '다시 시작하겠습니다 — 연락처' },
    ],
  },

  {
    id: 4, category: 'A', preset: 'navy-gold',
    title: 'VIP 거래처 파트너십 제안',
    scenario: '핵심 고객 의사를 위한 심층 파트너십 제안. 장기 협력 관계와 전용 지원 프로그램 강조',
    purpose: 'VIP 의사와 장기적 파트너십 구축 및 처방 심화',
    slides: [
      { type: 'cover',     topic: '표지: 선생님과 함께하는 파트너십 제안' },
      { type: 'profile',   topic: 'MR 소개 및 담당 이력' },
      { type: 'stat-3',    topic: '지금까지의 협력 성과 (처방 현황·기간·성과)' },
      { type: 'cards-4',   topic: 'VIP 전용 지원 프로그램 4가지' },
      { type: 'compare-2', topic: '일반 거래처 vs VIP 파트너십 혜택 비교' },
      { type: 'stat-3',    topic: '파트너십 기대 효과 (수치 3개)' },
      { type: 'process-4', topic: '파트너십 4단계 로드맵' },
      { type: 'bullets',   topic: '선생님께 드리는 약속 6가지' },
      { type: 'cards-3',   topic: '독점 제공 리소스 3가지' },
      { type: 'closing',   topic: '함께 더 멀리 — 연락처' },
    ],
  },

  {
    id: 5, category: 'A', preset: 'corporate-blue',
    title: '복수 제품 크로스셀 제안',
    scenario: '한 의사에게 2~3개 제품을 함께 제안하는 BD 자료. 제품 간 시너지와 처방 조합의 이점 강조',
    purpose: '멀티 제품 처방을 통한 1인 거래처 매출 극대화',
    slides: [
      { type: 'cover',     topic: '표지: [제품A] + [제품B] 함께 쓰는 이유' },
      { type: 'toc',       topic: '오늘 제안드릴 2가지 제품' },
      { type: 'stat-3',    topic: '[제품A] 핵심 수치 3개' },
      { type: 'stat-3',    topic: '[제품B] 핵심 수치 3개' },
      { type: 'compare-2', topic: '단독 처방 vs 병용 처방 비교' },
      { type: 'process-4', topic: '병용 처방 시 환자 치료 흐름 4단계' },
      { type: 'table',     topic: '두 제품 적응증·용량·보험 급여 비교표' },
      { type: 'cards-3',   topic: '병용 처방 시 MR 지원 3가지' },
      { type: 'process-3', topic: '처방 시작→조합 최적화→성과 확인' },
      { type: 'closing',   topic: '두 제품이 함께할 때 더 강합니다' },
    ],
  },

  {
    id: 6, category: 'A', preset: 'energetic-coral',
    title: '계절/시즌 맞춤 처방 제안',
    scenario: '독감철·환절기·연말 등 시즌별 처방 이슈에 맞춘 타이밍 BD 자료. 시즌 리스크와 솔루션 중심',
    purpose: '시즌 특수 환자 증가 시기에 맞춘 처방 증대 기회 포착',
    slides: [
      { type: 'cover',     topic: '표지: 이번 시즌 처방 준비되셨나요?' },
      { type: 'stat-3',    topic: '이번 시즌 예상 환자 규모 (수치 3개)' },
      { type: 'bullets',   topic: '시즌 주요 처방 이슈 5가지' },
      { type: 'compare-2', topic: '시즌 처방 준비 전 vs 후 비교' },
      { type: 'cards-3',   topic: '[제품명] 시즌 처방 포인트 3가지' },
      { type: 'process-3', topic: '시즌 처방 전략 3단계' },
      { type: 'closing',   topic: '이번 시즌도 함께하겠습니다' },
    ],
  },

  // ══════ B. 제품 소개 ══════
  {
    id: 7, category: 'B', preset: 'impact-dark',
    title: '신제품 론칭 소개 PPT',
    scenario: '신규 출시 제품의 첫 소개 슬라이드. 제품 탄생 배경, 기전, 임상 하이라이트, 처방 포인트 풀 구성',
    purpose: '신제품에 대한 강렬한 첫인상과 처방 시작 의지 유도',
    slides: [
      { type: 'cover',     topic: '표지: NEW — [제품명] 론칭' },
      { type: 'toc',       topic: '목차: 탄생 배경·기전·임상·처방 가이드·지원' },
      { type: 'bullets',   topic: '이 제품이 필요한 이유 (충족되지 않은 의료적 니즈)' },
      { type: 'process-4', topic: '작용 기전 4단계' },
      { type: 'stat-3',    topic: '핵심 임상 수치 3개 (유효성·안전성·편의성)' },
      { type: 'compare-2', topic: '기존 치료제 vs [제품명] 비교' },
      { type: 'stat-3',    topic: '주요 3상 임상 결과' },
      { type: 'table',     topic: '적응증별 용량·용법·보험 급여 요약표' },
      { type: 'cards-3',   topic: '처방 시작 지원 프로그램 3가지' },
      { type: 'bullets',   topic: '처방 전 알아야 할 주의사항 5가지' },
      { type: 'process-3', topic: '처방 시작→경과 관찰→피드백 단계' },
      { type: 'closing',   topic: '새로운 시작을 함께하겠습니다' },
    ],
  },

  {
    id: 8, category: 'B', preset: 'clean-medical',
    title: '성분/기전 중심 과학적 소개',
    scenario: '약리학적 기전과 성분을 의사에게 설명하는 학술적 제품 소개 PPT. 기전 다이어그램·작용 단계 시각화',
    purpose: '의사의 과학적 신뢰 형성을 통한 처방 결정 지원',
    slides: [
      { type: 'cover',     topic: '표지: [제품명] 작용 기전 심층 이해' },
      { type: 'toc',       topic: '목차: 성분·기전·약동학·임상 근거' },
      { type: 'bullets',   topic: '핵심 성분 및 구조적 특징' },
      { type: 'process-4', topic: '체내 작용 기전 4단계 (수용체→신호→효과→결과)' },
      { type: 'stat-3',    topic: '약동학 핵심 수치 (반감기·생체이용률·단백결합률)' },
      { type: 'compare-2', topic: '동일 계열 약물 기전 비교' },
      { type: 'stat-3',    topic: '기전 근거 임상 결과 3가지' },
      { type: 'table',     topic: '약물상호작용·금기 요약표' },
      { type: 'cards-3',   topic: '처방 근거 핵심 논문 3편 요약' },
      { type: 'closing',   topic: '과학이 만든 신뢰 — 연락처' },
    ],
  },

  {
    id: 9, category: 'B', preset: 'corporate-blue',
    title: '복용 편의성 강조 소개',
    scenario: '1일 1회·제형 편의성·복약 순응도를 중심으로 어필하는 소개 PPT. 환자 입장의 편의성 스토리라인',
    purpose: '복약 순응도 향상으로 치료 성과 개선 가능성 강조',
    slides: [
      { type: 'cover',     topic: '표지: 환자가 편해야 치료가 성공합니다' },
      { type: 'stat-3',    topic: '복약 불순응의 현실 (비용·입원율·치료 실패율)' },
      { type: 'compare-2', topic: '기존 제형 vs [제품명] 복용 편의성 비교' },
      { type: 'process-3', topic: '1일 1회 복용 → 순응도 향상 → 치료 성과 개선' },
      { type: 'stat-3',    topic: '복약 순응도 관련 임상 수치 3개' },
      { type: 'cards-3',   topic: '제형별 환자 편의 특징 3가지' },
      { type: 'bullets',   topic: '편의성이 좋은 환자군 프로파일 5가지' },
      { type: 'closing',   topic: '환자의 일상이 곧 치료입니다' },
    ],
  },

  {
    id: 10, category: 'B', preset: 'corporate-blue',
    title: '보험 급여/가격 경쟁력 소개',
    scenario: '급여 인정 범위·본인부담금·비용 효과성을 강조하는 PPT. 수치 비교와 환자 경제성 중심',
    purpose: '보험 급여 조건을 명확히 안내하고 처방 결정 장벽 제거',
    slides: [
      { type: 'cover',     topic: '표지: [제품명] 급여 혜택 안내' },
      { type: 'stat-3',    topic: '보험 급여 핵심 수치 (급여율·본인부담·월 비용)' },
      { type: 'table',     topic: '급여 인정 조건·적응증·처방 제한 요약표' },
      { type: 'compare-2', topic: '비급여 치료 vs [제품명] 급여 처방 비용 비교' },
      { type: 'stat-3',    topic: '비용 효과성 근거 수치 3개' },
      { type: 'bullets',   topic: '급여 적용 환자 기준 및 주의사항 5가지' },
      { type: 'cards-3',   topic: '급여 처방 절차 3단계' },
      { type: 'closing',   topic: '환자의 경제적 부담을 함께 줄이겠습니다' },
    ],
  },

  {
    id: 11, category: 'B', preset: 'clean-medical',
    title: '복합제/콤보 처방 제안',
    scenario: '병용 처방 또는 복합제의 이점을 설명하는 PPT. 단일 제제 대비 효과·복약 편의성·순응도 데이터',
    purpose: '복합제 처방으로 치료 성과와 환자 편의를 동시에 개선',
    slides: [
      { type: 'cover',     topic: '표지: 하나로 두 가지 치료를 — [복합제명]' },
      { type: 'compare-2', topic: '단일 제제 병용 vs 복합제 처방 비교' },
      { type: 'process-4', topic: '복합제 작용 기전 4단계' },
      { type: 'stat-3',    topic: '복합제 임상 핵심 수치 3개' },
      { type: 'table',     topic: '성분별 용량·역할·주의사항 비교표' },
      { type: 'stat-3',    topic: '순응도·치료 성과 관련 수치 3개' },
      { type: 'cards-3',   topic: '복합제 처방 적합 환자 유형 3가지' },
      { type: 'bullets',   topic: '복합제 처방 시 체크포인트 5가지' },
      { type: 'process-3', topic: '첫 처방→적정 용량→유지 단계' },
      { type: 'closing',   topic: '한 알로 더 완전한 치료를' },
    ],
  },

  // ══════ C. 임상/학술 ══════
  {
    id: 12, category: 'C', preset: 'warm-academic',
    title: '핵심 임상 논문 요약 발표',
    scenario: '최신 임상 논문의 핵심을 의사에게 전달하는 학술 요약 PPT. 연구 설계·결과·결론 구조화 발표',
    purpose: '최신 근거 공유를 통해 처방 신뢰도 강화',
    slides: [
      { type: 'cover',     topic: '표지: [논문명] 핵심 요약' },
      { type: 'bullets',   topic: '연구 배경 및 필요성' },
      { type: 'stat-4',    topic: '연구 설계 핵심 (대상·기간·용량·주요 평가변수)' },
      { type: 'stat-3',    topic: '1차 평가변수 결과 수치 3개' },
      { type: 'compare-2', topic: '대조군 vs 시험군 비교 결과' },
      { type: 'table',     topic: '2차 평가변수 결과 요약표' },
      { type: 'stat-3',    topic: '안전성 프로파일 수치 3개' },
      { type: 'bullets',   topic: '결론 및 임상적 의의 5가지' },
      { type: 'cards-3',   topic: '처방 실무 적용 포인트 3가지' },
      { type: 'closing',   topic: '출처: [학술지명, 연도] — 연락처' },
    ],
  },

  {
    id: 13, category: 'C', preset: 'clean-medical',
    title: 'Real-World Evidence 공유',
    scenario: '실제 처방 현장에서 수집된 RWE 데이터를 공유하는 PPT. 임상 현실과의 괴리 없는 근거 제시',
    purpose: 'RWE로 실사용 효과를 증명해 처방 확신 강화',
    slides: [
      { type: 'cover',     topic: '표지: 현실 데이터가 증명합니다 — [제품명] RWE' },
      { type: 'stat-3',    topic: 'RWE 연구 규모 (환자수·기간·기관수)' },
      { type: 'compare-2', topic: '임상시험 결과 vs 실사용 데이터 비교' },
      { type: 'stat-4',    topic: '실사용 핵심 결과 수치 4개' },
      { type: 'table',     topic: '환자군별 효과 비교표' },
      { type: 'bullets',   topic: '실사용 안전성 프로파일 5가지' },
      { type: 'stat-3',    topic: '비용 효과성 실사용 수치 3개' },
      { type: 'cards-3',   topic: '현장 적용 포인트 3가지' },
      { type: 'process-3', topic: 'RWE 근거 → 처방 결정 → 성과 확인' },
      { type: 'closing',   topic: '현장의 목소리가 근거입니다' },
    ],
  },

  {
    id: 14, category: 'C', preset: 'warm-academic',
    title: '가이드라인 업데이트 소개',
    scenario: '최신 치료 지침 변경 내용을 공유하는 PPT. 개정 전후 비교, 우리 제품의 위치 강조',
    purpose: '가이드라인 개정을 기점으로 처방 변화 유도',
    slides: [
      { type: 'cover',     topic: '표지: [가이드라인명] 최신 업데이트 핵심' },
      { type: 'stat-3',    topic: '개정 배경 (이전 가이드라인·연도·주요 변화점)' },
      { type: 'compare-2', topic: '이전 권고안 vs 새 권고안 비교' },
      { type: 'process-4', topic: '개정된 치료 단계 알고리즘 4단계' },
      { type: 'bullets',   topic: '개정 핵심 포인트 5가지' },
      { type: 'table',     topic: '권장 약물·용량·근거 등급 요약표' },
      { type: 'stat-3',    topic: '[제품명]의 가이드라인 내 위치 수치 3개' },
      { type: 'closing',   topic: '가이드라인이 바뀌었습니다 — 연락처' },
    ],
  },

  {
    id: 15, category: 'C', preset: 'clean-medical',
    title: '부작용·안전성 프로파일 설명',
    scenario: '안전성 우려를 객관적으로 해소하는 PPT. 부작용 발생률 비교·모니터링 방법·대처법 안내',
    purpose: '안전성 데이터로 처방 우려를 제거하고 신뢰 구축',
    slides: [
      { type: 'cover',     topic: '표지: [제품명] 안전성 프로파일 — 사실에 근거한 안내' },
      { type: 'stat-3',    topic: '전체 부작용 발생률 수치 3개 (경증·중등증·중증)' },
      { type: 'table',     topic: '주요 부작용별 발생률·대처법·중단 기준 요약표' },
      { type: 'compare-2', topic: '타 제품 vs [제품명] 안전성 비교' },
      { type: 'bullets',   topic: '모니터링 체크포인트 5가지' },
      { type: 'process-3', topic: '부작용 발생 시 대처 3단계' },
      { type: 'stat-3',    topic: '장기 투여 안전성 수치 3개' },
      { type: 'closing',   topic: '안전한 처방이 좋은 치료입니다' },
    ],
  },

  {
    id: 16, category: 'C', preset: 'warm-academic',
    title: '학술 세미나 발표 자료',
    scenario: '병원 내 소규모 CME/세미나 발표용 풀 학술 PPT. 도입·본론·결론·Q&A 완전 구성',
    purpose: '세미나 참석 의사 전원에게 근거 기반 처방 지지 형성',
    slides: [
      { type: 'cover',     topic: '표지: [세미나명] — 발표자·날짜' },
      { type: 'toc',       topic: '목차: 배경·연구 설계·결과·결론·Q&A' },
      { type: 'bullets',   topic: '배경 및 현재 치료의 한계 5가지' },
      { type: 'stat-3',    topic: '질환 역학 수치 3개 (유병률·치료율·미충족 니즈)' },
      { type: 'process-4', topic: '작용 기전 4단계' },
      { type: 'compare-2', topic: '주요 임상시험 설계 비교' },
      { type: 'stat-4',    topic: '1차·2차 평가변수 결과 수치 4개' },
      { type: 'table',     topic: '서브그룹 분석 결과 요약표' },
      { type: 'bullets',   topic: '안전성 핵심 포인트 5가지' },
      { type: 'stat-3',    topic: 'Real-World 적용 수치 3개' },
      { type: 'compare-2', topic: '주요 경쟁 약물 비교' },
      { type: 'bullets',   topic: '임상 적용 권고사항 5가지' },
      { type: 'stat-3',    topic: '비용 효과성 분석 수치 3개' },
      { type: 'cards-3',   topic: '처방 시작 포인트 3가지' },
      { type: 'table',     topic: '가이드라인 권고 등급 요약표' },
      { type: 'process-3', topic: '처방→모니터링→조절 단계' },
      { type: 'bullets',   topic: '자주 묻는 질문 5가지 (FAQ)' },
      { type: 'stat-3',    topic: '향후 연구 방향 및 파이프라인 수치' },
      { type: 'cards-3',   topic: '참고 문헌 핵심 3편 요약' },
      { type: 'closing',   topic: '감사합니다 — Q&A' },
    ],
  },

  // ══════ D. 경쟁/포지셔닝 ══════
  {
    id: 17, category: 'D', preset: 'impact-dark',
    title: '경쟁 제품 비교 분석표',
    scenario: '타사 제품과의 객관적 비교를 시각화한 PPT. 효능·안전성·편의성·가격 항목별 비교',
    purpose: '객관적 비교로 대웅 제품의 우위를 논리적으로 입증',
    slides: [
      { type: 'cover',     topic: '표지: [제품명] vs 경쟁 제품 — 객관적 비교' },
      { type: 'table',     topic: '효능·안전성·편의성·가격 항목별 비교표' },
      { type: 'compare-2', topic: '경쟁 제품 vs [제품명] 핵심 임상 비교' },
      { type: 'stat-3',    topic: '[제품명] 우위 수치 3개' },
      { type: 'compare-2', topic: '부작용 발생률 비교' },
      { type: 'stat-3',    topic: '비용 효과성 비교 수치 3개' },
      { type: 'cards-3',   topic: '[제품명]만의 차별점 3가지' },
      { type: 'closing',   topic: '데이터가 말합니다' },
    ],
  },

  {
    id: 18, category: 'D', preset: 'impact-dark',
    title: '타사 → 대웅 스위칭 제안',
    scenario: '현재 타사 제품을 처방 중인 의사를 대상으로 전환을 설득하는 PPT. 전환 이유와 단계별 전환 계획',
    purpose: '안전하고 논리적인 스위칭 근거 제공으로 처방 전환 유도',
    slides: [
      { type: 'cover',     topic: '표지: 더 나은 선택 — [제품명]으로 전환하세요' },
      { type: 'compare-2', topic: '현재 처방 제품 vs [제품명] 핵심 차이' },
      { type: 'stat-3',    topic: '스위칭 임상 근거 수치 3개' },
      { type: 'process-4', topic: '안전한 스위칭 4단계 프로토콜' },
      { type: 'stat-3',    topic: '스위칭 후 성과 데이터 수치 3개' },
      { type: 'cards-3',   topic: '스위칭 지원 프로그램 3가지' },
      { type: 'process-3', topic: '전환 결정→첫 처방→추적 관찰' },
      { type: 'closing',   topic: '더 좋은 치료를 선택하는 것이 옳습니다' },
    ],
  },

  {
    id: 19, category: 'D', preset: 'navy-gold',
    title: '제네릭 대응 전략 PPT',
    scenario: '특허 만료 후 오리지널 제품 유지를 위한 전략 PPT. 오리지널의 차별점과 제네릭 전환 리스크',
    purpose: '오리지널 처방 유지를 위한 논리적 근거 제공',
    slides: [
      { type: 'cover',     topic: '표지: 오리지널의 가치 — [제품명]을 지키는 이유' },
      { type: 'compare-2', topic: '오리지널 vs 제네릭 비교 (원료·제조·임상 데이터)' },
      { type: 'stat-3',    topic: '오리지널 장기 안전성 데이터 수치 3개' },
      { type: 'bullets',   topic: '제네릭 전환 시 리스크 5가지' },
      { type: 'stat-3',    topic: '오리지널 고수 환자군 결과 수치 3개' },
      { type: 'cards-3',   topic: '오리지널 처방 지원 프로그램 3가지' },
      { type: 'process-3', topic: '오리지널 유지→환자 모니터링→성과 확인' },
      { type: 'closing',   topic: '검증된 것을 선택하는 것이 현명합니다' },
    ],
  },

  {
    id: 20, category: 'D', preset: 'corporate-blue',
    title: '가격 vs 효능 포지셔닝',
    scenario: '비용 대비 효과를 논리적으로 설득하는 PPT. 비싸도 처방해야 하는 이유를 총 치료 비용 관점으로 증명',
    purpose: '총 치료 비용(Total Cost of Care) 관점으로 가격 저항 극복',
    slides: [
      { type: 'cover',     topic: '표지: 가격이 아닌 가치를 처방하세요' },
      { type: 'compare-2', topic: '단순 약가 비교 vs 총 치료 비용 비교' },
      { type: 'stat-3',    topic: '비용 효과성 수치 3개 (QALY·재입원율·의료비)' },
      { type: 'table',     topic: '1년 치료 비용 시나리오 비교표' },
      { type: 'stat-3',    topic: '치료 실패 비용 vs 예방 비용 수치' },
      { type: 'cards-3',   topic: '가치를 높이는 차별 요소 3가지' },
      { type: 'closing',   topic: '가장 경제적인 선택은 가장 효과적인 치료입니다' },
    ],
  },

  // ══════ E. 처방 전략/환자 ══════
  {
    id: 21, category: 'E', preset: 'clean-medical',
    title: '환자 프로파일별 처방 추천',
    scenario: '다양한 환자 유형별로 어떤 환자에게 처방할지 명확히 제시하는 PPT. 프로파일 매칭 시각화',
    purpose: '환자 유형별 최적 처방 선택 가이드로 처방 자신감 부여',
    slides: [
      { type: 'cover',     topic: '표지: 어떤 환자에게 [제품명]을 처방할까요?' },
      { type: 'cards-4',   topic: '처방 적합 환자 유형 4가지 (각 특징·나이·동반질환)' },
      { type: 'process-4', topic: '환자 선별 알고리즘 4단계' },
      { type: 'stat-3',    topic: '환자 유형별 치료 효과 수치 3개' },
      { type: 'compare-2', topic: '처방 적합 환자 vs 주의 필요 환자 비교' },
      { type: 'table',     topic: '동반질환·병용약물별 처방 가이드 요약표' },
      { type: 'bullets',   topic: '처방 전 확인해야 할 체크리스트 5가지' },
      { type: 'closing',   topic: '올바른 환자 선별이 치료 성공의 시작입니다' },
    ],
  },

  {
    id: 22, category: 'E', preset: 'corporate-blue',
    title: '처방 성공 케이스 스터디',
    scenario: '실제 처방 성공 사례를 스토리텔링 방식으로 전달하는 PPT. Before/After·치료 결과 포함',
    purpose: '성공 사례 공유로 처방 시작에 대한 확신 제공',
    slides: [
      { type: 'cover',     topic: '표지: 실제 처방 성공 사례 — [제품명]' },
      { type: 'bullets',   topic: '케이스 1: 환자 배경 및 치료 과제' },
      { type: 'compare-2', topic: '케이스 1: 처방 전 vs 처방 후 비교' },
      { type: 'stat-3',    topic: '케이스 1: 치료 결과 수치 3개' },
      { type: 'process-4', topic: '케이스 2: 처방 결정 과정 4단계' },
      { type: 'stat-3',    topic: '케이스 2: 치료 성과 수치 3개' },
      { type: 'cards-3',   topic: '사례에서 배운 처방 포인트 3가지' },
      { type: 'closing',   topic: '선생님의 다음 성공 케이스를 기대합니다' },
    ],
  },

  {
    id: 23, category: 'E', preset: 'corporate-blue',
    title: '처방 전환 단계별 가이드',
    scenario: '첫 처방→유지→증량 단계별 처방 전략을 안내하는 PPT. 단계별 체크포인트와 MR 액션 포함',
    purpose: '단계별 처방 가이드로 중도 포기 없이 치료 완주 지원',
    slides: [
      { type: 'cover',     topic: '표지: [제품명] 처방 단계별 완전 가이드' },
      { type: 'process-4', topic: '처방 4단계 (첫 처방→적응→증량→유지)' },
      { type: 'stat-3',    topic: '각 단계 평균 기간 및 성공률 수치' },
      { type: 'cards-3',   topic: '단계별 MR 지원 활동 3가지' },
      { type: 'compare-2', topic: '단계별 이탈 패턴 vs 성공 패턴 비교' },
      { type: 'table',     topic: '단계별 용량 조절·모니터링 항목 요약표' },
      { type: 'bullets',   topic: '단계별 주의사항 및 체크포인트 6가지' },
      { type: 'closing',   topic: '끝까지 함께하겠습니다 — 연락처' },
    ],
  },

  {
    id: 24, category: 'E', preset: 'clean-medical',
    title: '적응증별 처방 플로우',
    scenario: '질환별 처방 결정 흐름을 시각화한 PPT. 적응증→환자 선별→용량 선택→모니터링 플로우',
    purpose: '복수 적응증에서 올바른 처방 결정 흐름 안내',
    slides: [
      { type: 'cover',     topic: '표지: [제품명] 적응증별 처방 플로우' },
      { type: 'process-4', topic: '적응증 1 처방 플로우 4단계' },
      { type: 'bullets',   topic: '적응증 1 환자 선별 기준 5가지' },
      { type: 'cards-3',   topic: '적응증 2·3·4 처방 핵심 포인트' },
      { type: 'compare-2', topic: '적응증별 1차 vs 2차 치료 위치 비교' },
      { type: 'stat-3',    topic: '적응증별 치료 성과 수치 3개' },
      { type: 'table',     topic: '적응증별 용량·급여 코드·모니터링 요약표' },
      { type: 'closing',   topic: '모든 적응증에서 최선의 선택입니다' },
    ],
  },

  // ══════ F. 보고서/성과 ══════
  {
    id: 25, category: 'F', preset: 'corporate-blue',
    title: '주간 영업 활동 보고',
    scenario: '팀장/소장 보고용 주간 영업 활동 요약 PPT. 방문 현황·처방 변화·이슈·다음 주 계획',
    purpose: '주간 활동 성과를 가시적으로 정리해 팀 커뮤니케이션 강화',
    slides: [
      { type: 'cover',     topic: '표지: [이름] 주간 영업 보고 — [기간]' },
      { type: 'stat-3',    topic: '이번 주 핵심 지표 (방문 수·처방 수·신규 거래처)' },
      { type: 'table',     topic: '거래처별 방문·이슈·결과 요약표' },
      { type: 'bullets',   topic: '주요 성과 및 이슈 5가지' },
      { type: 'process-3', topic: '다음 주 주요 활동 계획 3단계' },
      { type: 'closing',   topic: '이상 보고 드립니다 — [이름]' },
    ],
  },

  {
    id: 26, category: 'F', preset: 'corporate-blue',
    title: '월간 성과 & 목표 현황',
    scenario: '본부 보고용 월간 성과 PPT. 목표 대비 달성률·제품별 처방 현황·KPI 대시보드 시각화',
    purpose: '월간 KPI 달성 현황 보고 및 다음 달 목표 공유',
    slides: [
      { type: 'cover',     topic: '표지: [이름] [월] 월간 성과 보고' },
      { type: 'stat-4',    topic: 'KPI 4개 (목표 대비 달성률·처방수·방문수·신규처)' },
      { type: 'compare-2', topic: '지난달 vs 이번달 성과 비교' },
      { type: 'table',     topic: '제품별 처방 현황·달성률·증감표' },
      { type: 'bullets',   topic: '성과 요인 분석 5가지' },
      { type: 'process-3', topic: '다음달 중점 활동 계획 3단계' },
      { type: 'cards-3',   topic: '이달 Best 거래처·제품·전략' },
      { type: 'closing',   topic: '이상 보고 드립니다 — [이름]' },
    ],
  },

  {
    id: 27, category: 'F', preset: 'navy-gold',
    title: '분기 전략 계획 발표',
    scenario: '분기 킥오프 또는 전략 회의용 PPT. 지난 분기 리뷰·이번 분기 목표·중점 활동 계획',
    purpose: '분기 전략 방향을 팀과 공유하고 행동 계획 정렬',
    slides: [
      { type: 'cover',     topic: '표지: [분기] 전략 계획 — [팀명]' },
      { type: 'toc',       topic: '목차: 지난 분기 리뷰·이번 분기 목표·중점 전략·실행 계획' },
      { type: 'stat-4',    topic: '지난 분기 KPI 4개 달성 현황' },
      { type: 'compare-2', topic: '지난 분기 목표 vs 실적 비교' },
      { type: 'process-4', topic: '이번 분기 전략 방향 4가지' },
      { type: 'table',     topic: '제품별·거래처별 분기 목표 수치표' },
      { type: 'bullets',   topic: '중점 활동 5가지 및 책임자' },
      { type: 'cards-3',   topic: '신규 지원 프로그램 3가지' },
      { type: 'process-3', topic: '실행 3단계 타임라인 (월별)' },
      { type: 'closing',   topic: '함께 목표를 달성합시다 — [팀명]' },
    ],
  },

  // ══════ G. 이벤트/발표 ══════
  {
    id: 28, category: 'G', preset: 'impact-dark',
    title: '런치 미팅 / 제품 설명회',
    scenario: '점심 시간을 활용한 제품 설명회 자료. 짧고 임팩트 있는 핵심 메시지 중심, 5~7분 발표용',
    purpose: '짧은 시간 안에 처방 관심을 끌어내는 임팩트 발표',
    slides: [
      { type: 'cover',     topic: '표지: 5분이면 충분합니다 — [제품명]' },
      { type: 'stat-3',    topic: '핵심 수치 3개 (Why Now)' },
      { type: 'compare-2', topic: '기존 치료 vs [제품명] 핵심 차이 1가지' },
      { type: 'cards-3',   topic: '기억해야 할 처방 포인트 3가지' },
      { type: 'process-3', topic: '처방 시작 3단계 (간단 버전)' },
      { type: 'closing',   topic: '감사합니다 — 연락처' },
    ],
  },

  {
    id: 29, category: 'G', preset: 'warm-academic',
    title: '심포지엄 발표 자료',
    scenario: '병원 내 소규모 의학 심포지엄 발표용 PPT. 학술적 권위와 비주얼 임팩트를 동시에 갖춘 구성',
    purpose: '심포지엄 참석 의사들에게 학술 권위로 처방 지지 형성',
    slides: [
      { type: 'cover',     topic: '표지: [심포지엄명] — 발표자·소속·날짜' },
      { type: 'toc',       topic: '목차: 배경·연구 목적·방법·결과·결론·Q&A' },
      { type: 'bullets',   topic: '연구 배경 및 미충족 의료 니즈' },
      { type: 'stat-3',    topic: '질환 역학 수치 3개' },
      { type: 'process-4', topic: '연구 방법 4단계 (설계·대상·평가변수·분석)' },
      { type: 'compare-2', topic: '연구군 vs 대조군 기본 특성 비교' },
      { type: 'stat-4',    topic: '1차·2차 평가변수 결과 수치 4개' },
      { type: 'table',     topic: '서브그룹 분석 결과 요약표' },
      { type: 'bullets',   topic: '안전성 핵심 내용 5가지' },
      { type: 'stat-3',    topic: '추가 분석 결과 수치 3개' },
      { type: 'compare-2', topic: '기존 연구 vs 이번 연구 비교' },
      { type: 'bullets',   topic: '연구의 강점 및 한계점 5가지' },
      { type: 'stat-3',    topic: '임상적 의의 및 적용 수치 3개' },
      { type: 'cards-3',   topic: '핵심 결론 3가지' },
      { type: 'table',     topic: '관련 가이드라인 권고 요약표' },
      { type: 'process-3', topic: '임상 적용 단계 (대상 선별→처방→추적)' },
      { type: 'bullets',   topic: '향후 연구 방향 5가지' },
      { type: 'stat-3',    topic: '파이프라인 및 후속 연구 현황' },
      { type: 'cards-3',   topic: '주요 참고 문헌 3편 요약' },
      { type: 'closing',   topic: '감사합니다 — Q&A · 연락처' },
    ],
  },

  {
    id: 30, category: 'G', preset: 'energetic-coral',
    title: '연말/시즌 인사 & 감사 자료',
    scenario: '연말·명절·기념일에 거래처 의사에게 전달하는 감사 인사 PPT. 따뜻한 디자인과 진심 메시지',
    purpose: '감사 인사와 관계 강화를 통해 지속적인 처방 파트너십 유지',
    slides: [
      { type: 'cover',     topic: '표지: 감사합니다, [의사명] 선생님께' },
      { type: 'stat-3',    topic: '올 한 해 함께한 성과 (함께한 기간·처방 환자 수·감사 인사)' },
      { type: 'cards-3',   topic: '선생님 덕분에 가능했던 일 3가지' },
      { type: 'bullets',   topic: '내년에 드릴 약속 5가지' },
      { type: 'closing',   topic: '건강하고 행복한 새해 되세요 — [MR 이름]' },
    ],
  },
]

// ── Step 1 빌더: 원문 → 슬라이드 원고 정제 (ChatGPT/Claude/NotebookLM)
export function buildStep1Prompt(scenario) {
  const slideLines = scenario.slides.map((s, i) => {
    const slideType = slideTypes[s.type]
    return `[슬라이드 ${i + 1}] ${slideType.name}
주제: ${s.topic}
필드:
${slideType.fields.map(f => `  - ${f}: _________`).join('\n')}`
  }).join('\n\n')

  return `# 역할
당신은 대웅제약 MR(Medical Representative)의 프레젠테이션 어시스턴트입니다.
아래 원문 자료를 분석해 "${scenario.title}" 슬라이드에 바로 붙여넣을 수 있는 정제된 한국어 원고를 작성합니다.

# 상황
- 시나리오: ${scenario.scenario}
- 목적: ${scenario.purpose}
- 총 슬라이드: ${scenario.slides.length}장

# 작업 규칙 (반드시 준수)
1. 아래 [슬라이드 원고 템플릿]의 각 필드를 원문에서 추출한 실제 내용으로 채우세요.
2. 원문에 없는 정보는 절대 지어내지 말고 "[원문에 없음 - 직접 입력]" 으로 표기하세요.
3. 각 필드의 글자 수 제한을 엄격히 지키세요 (괄호 안 숫자 기준).
4. 수치는 원문의 정확한 값을 그대로 사용 (예: 92.9%, 901억원, 3.2배).
5. 출처가 있으면 반드시 명시 (학술지명, 연도).
6. 출력은 아래 템플릿 형식 그대로, 다른 설명 없이 작성하세요.

# 슬라이드 원고 템플릿

${slideLines}

# 원문 자료
=== 아래에 내 자료를 붙여넣으세요 ===

[여기에 ChatGPT/NotebookLM 요약본 또는 논문·보고서 원문을 붙여넣으세요]

=== 원문 끝 ===

위 원문을 읽고 슬라이드 원고 템플릿을 완성해 주세요.`
}

// ── Step 2 빌더: 정제된 원고 → 젠스파크 디자인 렌더링
export function buildStep2Prompt(scenario) {
  const preset = designPresets[scenario.preset]
  const c = preset.colors
  const slideLines = scenario.slides.map((s, i) => {
    const slideType = slideTypes[s.type]
    return `--- SLIDE ${i + 1} of ${scenario.slides.length} ---
타입: ${slideType.name}
레이아웃: ${slideType.layout}
주제: ${s.topic}
내용: (Step 1 원고의 [슬라이드 ${i + 1}] 필드값을 그대로 사용)`
  }).join('\n\n')

  return `# 젠스파크 AI 슬라이드 생성

## 개요
- 제목: ${scenario.title}
- 시나리오: ${scenario.scenario}
- 총 슬라이드: ${scenario.slides.length}장
- 캔버스: 1920×1080 (16:9), 언어: 한국어

## 디자인 시스템
스타일: ${preset.name}
분위기: ${preset.mood}
패턴: ${preset.pattern}

### 컬러 (HEX — 이 값만 사용할 것)
- 배경: ${c.bg}
- 배경보조: ${c.bgAlt}
- 본문텍스트: ${c.text}
- 중간텍스트: ${c.textMuted}
- 약한텍스트: ${c.textSub}
- 포인트강조: ${c.accent}
- 포인트연한: ${c.accentSoft}
- 박스배경: ${c.box}
- 박스테두리: ${c.boxBorder}

### 타이포그래피
${preset.typography}
한국어 폰트: Pretendard 또는 Noto Sans KR

## 레이아웃 규칙 (절대 준수)
1. 안전 영역: 상하 80px · 좌우 120px 여백 필수
2. 요소 간격: 블록 간 최소 32px
3. 슬라이드당 요소 5개 이하
4. 콘텐츠는 Y=1000px 이내 종료 (오버플로우 금지)
5. 원고에 없는 표·차트·박스 임의 추가 금지

## 슬라이드 구성

${slideLines}

## 슬라이드 원고 (Step 1 결과를 여기에 붙여넣기)
=== 아래에 Step 1 정제 원고를 붙여넣으세요 ===

[여기에 Step 1 원고 붙여넣기]

=== 원고 끝 ===

## 최종 지시
위 원고를 디자인 시스템과 레이아웃 규칙에 따라 ${scenario.slides.length}장으로 렌더링하세요.
- 원고 텍스트만 사용 (새 내용 추가 금지)
- [원문에 없음] 필드는 "[사용자 입력]" 표시
- 컬러는 위 HEX 코드 정확히 사용`
}
