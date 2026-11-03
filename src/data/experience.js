// 경력 · 활동 · 교육 (타임라인) — 최신순. 다국어 필드는 { ko, en }.
// description 안의 **텍스트** 는 굵게 강조됩니다.
export const experience = [
  {
    period: { ko: '2026.06 ~ 진행 중', en: '2026.06 – present' },
    title: {
      ko: '프리랜서 · 페헤개발팀 운영',
      en: 'Freelancer · Running FeheDeveloperTeam',
    },
    org: {
      ko: '페헤(Fehe) · FeheDeveloperTeam(FDT) 팀장',
      en: 'Fehe · Team Lead of FeheDeveloperTeam (FDT)',
    },
    description: {
      ko: '**페헤**라는 이름으로 프리랜서 활동을 하며, 디스코드 봇과 웹을 개발하는 **페헤개발팀(FDT)**을 운영하고 있습니다.',
      en: 'I freelance under the name **Fehe** and run **FeheDeveloperTeam (FDT)**, a team focused on Discord bots and web development.',
    },
    links: [
      {
        href: 'https://www.fehe.dev',
        label: { ko: '팀 사이트 fehe.dev', en: 'Team site: fehe.dev' },
      },
      {
        href: 'https://www.fehe.dev/member/fehe',
        label: { ko: '페헤 소개 페이지', en: 'About Fehe' },
      },
    ],
    highlights: [
      {
        label: { ko: '제공 서비스', en: 'Services' },
        desc: {
          ko: '유튜버·크리에이터를 위한 디스코드 서버 구축, 디스코드 봇 코드 개발, 봇 대시보드와 웹사이트 제작',
          en: 'Discord server setup for YouTubers and creators, Discord bot development, and bot dashboards and websites',
        },
      },
      {
        label: { ko: '운영 프로젝트', en: 'Own Project' },
        desc: {
          ko: 'AI 채팅, 인증·티켓·로그, 미니게임 기능을 갖춘 디스코드 봇 치유미(Chiyumi) 개발 및 운영',
          en: 'Built and run Chiyumi, a Discord bot with AI chat, verification, tickets, logging and mini-games',
        },
      },
    ],
  },
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
      ko: '**사내 서버 구축**부터 **업무 자동화 프로그램**과 **웹 서비스 개발**까지 맡아 진행하고 있습니다.',
      en: 'I take on everything from **in-house server setup** to **automation programs** and **web service development**.',
    },
    highlights: [
      {
        label: { ko: '인프라', en: 'Infrastructure' },
        desc: {
          ko: 'Ubuntu Desktop 26.04 서버 구축 및 유지보수',
          en: 'Set up and maintain an Ubuntu Desktop 26.04 server',
        },
      },
      {
        label: { ko: '웹 서비스', en: 'Web Services' },
        desc: {
          ko: '점포 매출 통계 대시보드, 사내 미팅 일정 조율 사이트, 업무 관리 사이트 개발',
          en: 'Built a store sales analytics dashboard, an internal meeting scheduling site and a work management site',
        },
      },
      {
        label: { ko: '자동화 · 데이터', en: 'Automation & Data' },
        desc: {
          ko: 'AI 기반 네이버 블로그 자동 발행 및 업무 자동화 프로그램(다인아이앤씨), TikTok 크롤링 수집기 개발',
          en: 'Built an AI-powered Naver blog auto-publishing and work automation program (Dain I&C) and a TikTok crawler',
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
        name: 'Jambox',
        role: { ko: '팀장 · 개발', en: 'Team Lead · Development' },
        period: { ko: '2026년 2학기', en: '2026 Fall' },
        desc: {
          ko: '오락·레저 활동을 찾아주고 추천해 주는 사이트',
          en: 'A site that helps you find and get recommendations for entertainment and leisure activities',
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
      {
        name: 'CarScope',
        role: { ko: '팀장 · 개발 총괄', en: 'Team Lead · Development Lead' },
        period: { ko: '2025년 2학기', en: '2025 Fall' },
        desc: {
          ko: '차량 관련 최저가와 주변 최저가 주차장을 한곳에서 검색·비교하는 서비스',
          en: 'A service to search and compare the best car-related prices and nearby low-cost parking in one place',
        },
      },
    ],
  },
];
