// 프로젝트 목록. 카드/상세 페이지에 함께 쓰입니다. 다국어 필드는 { ko, en }.
// tags / problem / learned 는 실제 내용으로 채워 주세요 (TODO 표시). 공개 링크가 없으면 links 는 비워 둡니다.
export const projects = [
  {
    id: 'carscope',
    title: 'CarScope',
    summary: {
      ko: '차량 관련 최저가와 주변 최저가 주차장을 한곳에서 검색·비교하는 서비스',
      en: 'A service to search and compare the best car-related prices and nearby low-cost parking in one place',
    },
    tags: [], // TODO: 실제 사용 기술 입력 (예: 'React', 'Spring Boot', 'MySQL')
    links: {
      demo: '',
      github: '',
    },
    period: { ko: '2025년 2학기 · 팀 프로젝트', en: '2025 Fall · Team project' },
    role: { ko: '팀장 · 개발 총괄', en: 'Team Lead · Development Lead' },
    problem: { ko: '', en: '' }, // TODO: 문제와 해결 과정 (면접에서 가장 많이 질문받는 부분)
    learned: { ko: '', en: '' }, // TODO: 배운 점 / 회고
  },
  {
    id: 'watchman',
    title: 'WatchMan',
    summary: {
      ko: '웹캠으로 사용자의 공부 상태를 감지·모니터링하여 집중 학습을 돕는 서비스',
      en: "A service that uses a webcam to detect and monitor the user's study state, helping them focus",
    },
    tags: [], // TODO: 실제 사용 기술 입력 (예: 'React', 'WebRTC')
    links: {
      demo: '',
      github: '',
    },
    period: { ko: '2026년 1학기 · 팀 프로젝트', en: '2026 Spring · Team project' },
    role: { ko: '프론트엔드 개발', en: 'Frontend Development' },
    problem: { ko: '', en: '' }, // TODO
    learned: { ko: '', en: '' }, // TODO
  },
  {
    id: 'jambox',
    title: 'Jambox',
    summary: {
      ko: '오락·레저 활동을 찾아주고 추천해 주는 사이트',
      en: 'A site that helps you find and get recommendations for entertainment and leisure activities',
    },
    tags: [], // TODO: 실제 사용 기술 입력
    links: {
      demo: '',
      github: '',
    },
    period: { ko: '2026년 2학기 · 팀 프로젝트', en: '2026 Fall · Team project' },
    role: { ko: '팀장 · 개발', en: 'Team Lead · Development' },
    problem: { ko: '', en: '' }, // TODO
    learned: { ko: '', en: '' }, // TODO
  },
];
