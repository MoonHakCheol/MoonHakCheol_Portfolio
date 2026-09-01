// 경력 · 활동 · 교육 (타임라인) — 최신순 정렬.
// description 안에서 **텍스트** 로 감싼 부분은 굵은 빨간색으로 강조됩니다.
export const experience = [
  {
    period: '2025.03 ~ 2027.01 (진행 중)',
    title: '국가근로장학생',
    org: '(주)라함',
    // public/logos/ 에 아래 파일을 넣으면 자동으로 표시됩니다.
    logos: [
      { src: '/logos/amudo-eopgae.png', alt: '아무도없개' },
      { src: '/logos/dain-inc.png', alt: '다인아이앤씨' },
    ],
    description:
      '**IT 운영 지원**과 **사내 업무 자동화·웹 개발**을 담당하고 있습니다.',
    highlights: [
      {
        icon: 'tool',
        label: 'IT 운영 지원',
        desc: '씨트롤·K-Remote 기반 현장 장애 대응, 키오스크 설정·유지보수 보조',
      },
      {
        icon: 'database',
        label: '운영 데이터 관리',
        desc: 'VAN 정보 정리 및 Excel 기반 데이터·업무 문서 관리',
      },
      {
        icon: 'zap',
        label: 'AI 콘텐츠 워크플로우',
        desc: 'Gemini 초안 자동화 → ERP·Claude Code 연동으로 고도화한 네이버 블로그 콘텐츠 운영',
      },
      {
        icon: 'server',
        label: '서비스·인프라 개발',
        desc: 'ERP·미팅 관리·작업일지 사이트 및 자동 발행 프로그램 개발, Ubuntu 서버 구축·운영',
      },
    ],
  },
  {
    period: '2024.03 ~ 재학 중',
    title: '전문대학교 IT소프트웨어학과',
    org: '재학',
    description:
      'IT소프트웨어학과에 진학하여 본격적으로 소프트웨어 개발을 공부하고 있습니다.',
    projects: [
      {
        name: 'CarScope',
        role: '팀장 · 개발 총괄',
        period: '2025년 2학기',
        desc: '차량 관련 최저가와 주변 최저가 주차장 등 다양한 정보를 한곳에서 검색·비교할 수 있는 서비스',
      },
      {
        name: 'WatchMan',
        role: '프론트엔드 개발',
        period: '2026년 1학기',
        desc: '웹캠으로 사용자의 공부 상태를 감지·모니터링하여 집중 학습을 돕는 서비스',
      },
    ],
  },
];
