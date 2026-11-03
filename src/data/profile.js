// 기본 프로필 정보. 다국어 필드는 { ko, en } 형태.
export const profile = {
  name: { ko: '문학철', en: 'Moon Hak-cheol' },
  role: { ko: '풀스택 개발자', en: 'Full-Stack Developer' },
  tagline: {
    ko: '꾸준히 만들고, 문제를 끝까지 해결하는 개발자를 지향합니다.',
    en: 'A developer who keeps building and sees problems through to the end.',
  },
  email: 'gkrcjf1019@naver.com',
  phone: '010-3316-1466',
  resumeUrl: '/resume.pdf',
  // public/resume.pdf 를 넣은 뒤 true 로 바꾸면 이력서 버튼이 나타납니다.
  resumeReady: false,
  links: {
    github: 'https://github.com/MoonHakCheol',
    blog: '', // 나중에 추가
  },
  // About 섹션. 내용은 Experience 의 실제 경험을 기준으로 쓴다.
  about: {
    lead: {
      ko: '화면에서 서버까지, 실제 업무에 쓰이는 소프트웨어를 만듭니다.',
      en: 'From the screen to the server, I build software people actually use at work.',
    },
    story: {
      ko:
        '재학 중 국가근로장학생으로 일하는 (주)라함에서 사내 서버 구축과 웹 서비스 개발, ' +
        '업무 자동화를 맡아 현업의 문제를 코드로 풀어 왔습니다. ' +
        '학교에서는 CarScope와 Jambox의 팀장으로 개발과 협업을 이끌어 왔습니다.',
      en:
        'While studying, I work as a National Work-Study Scholar at Raham Co., Ltd., ' +
        'where I solve real business problems with in-house servers, web services and automation tools. ' +
        'At school, I have led development and collaboration as team lead of CarScope and Jambox.',
    },
    focus: [
      {
        label: { ko: '웹 서비스', en: 'Web Services' },
        desc: {
          ko: '점포 매출 통계 대시보드부터 미팅 일정 조율, 업무 관리까지 현업에 필요한 웹 서비스를 개발했습니다.',
          en: 'Built the web services the business needs, from a store sales dashboard to meeting scheduling and work management.',
        },
      },
      {
        label: { ko: '서버 · 인프라', en: 'Servers & Infra' },
        desc: {
          ko: 'Ubuntu 기반 사내 서버를 직접 구축하고 운영과 유지보수까지 맡고 있습니다.',
          en: 'Set up an in-house Ubuntu server myself and handle its operation and maintenance.',
        },
      },
      {
        label: { ko: '업무 자동화', en: 'Automation' },
        desc: {
          ko: 'AI 기반 네이버 블로그 자동 발행 프로그램과 TikTok 크롤링 수집기로 반복 업무와 데이터 수집을 자동화했습니다.',
          en: 'Automated repetitive work and data collection with an AI-powered Naver blog publisher and a TikTok crawler.',
        },
      },
    ],
  },
};
