// 경력 · 활동 · 교육 (타임라인) — 최신순. 다국어 필드는 { ko, en }.
// description 안의 **텍스트** 는 굵은 빨간색으로 강조됩니다.
export const experience = [
  {
    period: {
      ko: '2025.03 ~ 2027.01 (진행 중)',
      en: '2025.03 – 2027.01 (ongoing)',
    },
    title: { ko: '국가근로장학생', en: 'National Work-Study Scholar' },
    org: { ko: '(주)라함', en: 'Raham Co., Ltd.' },
    // public/logos/ 에 아래 파일을 넣으면 자동으로 표시됩니다.
    logos: [
      { src: '/logos/amudo-eopgae.png', alt: '아무도없개' },
      { src: '/logos/dain-inc.png', alt: '다인아이앤씨' },
    ],
    description: {
      ko: '**IT 운영 지원**과 **사내 업무 자동화·웹 개발**을 담당하고 있습니다.',
      en: 'I handle **IT operations support** and **in-house automation & web development**.',
    },
    highlights: [
      {
        icon: 'tool',
        label: { ko: 'IT 운영 지원', en: 'IT Operations Support' },
        desc: {
          ko: '씨트롤·K-Remote 기반 현장 장애 대응, 키오스크 설정·유지보수 보조',
          en: 'On-site incident response with C-troll/K-Remote, kiosk setup & maintenance support',
        },
      },
      {
        icon: 'database',
        label: { ko: '운영 데이터 관리', en: 'Operations Data Management' },
        desc: {
          ko: 'VAN 정보 정리 및 Excel 기반 데이터·업무 문서 관리',
          en: 'Organizing VAN data and managing Excel-based data & business documents',
        },
      },
      {
        icon: 'zap',
        label: { ko: 'AI 콘텐츠 워크플로우', en: 'AI Content Workflow' },
        desc: {
          ko: 'Gemini 초안 자동화 → ERP·Claude Code 연동으로 고도화한 네이버 블로그 콘텐츠 운영',
          en: 'Naver blog content pipeline, from Gemini draft automation to ERP & Claude Code integration',
        },
      },
      {
        icon: 'server',
        label: { ko: '서비스·인프라 개발', en: 'Service & Infra Development' },
        desc: {
          ko: 'ERP·미팅 관리·작업일지 사이트 및 자동 발행 프로그램 개발, Ubuntu 서버 구축·운영',
          en: 'Built ERP, meeting-management and worklog sites plus an auto-publishing program; set up and ran Ubuntu servers',
        },
      },
    ],
  },
  {
    period: { ko: '2024.03 ~ 재학 중', en: '2024.03 – present' },
    title: {
      ko: '전문대학교 IT소프트웨어학과',
      en: 'College, Dept. of IT Software',
    },
    org: { ko: '재학', en: 'Enrolled' },
    description: {
      ko: 'IT소프트웨어학과에 진학하여 본격적으로 소프트웨어 개발을 공부하고 있습니다.',
      en: 'Studying software development in the Department of IT Software.',
    },
    projects: [
      {
        name: 'CarScope',
        role: { ko: '팀장 · 개발 총괄', en: 'Team Lead · Development Lead' },
        period: { ko: '2025년 2학기', en: '2025 Fall' },
        desc: {
          ko: '차량 관련 최저가와 주변 최저가 주차장을 한곳에서 검색·비교하는 서비스',
          en: 'A service to search and compare the best car-related prices and nearby low-cost parking in one place',
        },
      },
      {
        name: 'WatchMan',
        role: { ko: '프론트엔드 개발', en: 'Frontend Development' },
        period: { ko: '2026년 1학기', en: '2026 Spring' },
        desc: {
          ko: '웹캠으로 사용자의 공부 상태를 감지·모니터링하여 집중 학습을 돕는 서비스',
          en: "A service that uses a webcam to detect and monitor the user's study state, helping them focus",
        },
      },
    ],
  },
];
