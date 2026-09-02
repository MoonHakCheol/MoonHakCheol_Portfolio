// 프로젝트 목록. 카드/상세 페이지에 함께 쓰입니다. 다국어 필드는 { ko, en }.
// tags / links / problem / learned 는 실제 내용으로 채워 주세요 (TODO 표시).
export const projects = [
  {
    id: 'carscope',
    title: 'CarScope',
    summary: {
      ko: '차량 관련 최저가와 주변 최저가 주차장을 한곳에서 검색·비교하는 서비스',
      en: 'A service to search and compare the best car-related prices and nearby low-cost parking in one place',
    },
    thumbnail: '', // TODO: public/assets/projects/carscope.png 준비 후 경로 지정
    tags: [], // TODO: 실제 사용 기술 입력 (예: 'React', 'Spring Boot', 'MySQL')
    links: {
      demo: '', // TODO: 배포 주소
      github: '', // TODO: 저장소 주소
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
    thumbnail: '', // TODO: public/assets/projects/watchman.png 준비 후 경로 지정
    tags: [], // TODO: 실제 사용 기술 입력 (예: 'React', 'WebRTC')
    links: {
      demo: '', // TODO
      github: '', // TODO
    },
    period: { ko: '2026년 1학기 · 팀 프로젝트', en: '2026 Spring · Team project' },
    role: { ko: '프론트엔드 개발', en: 'Frontend Development' },
    problem: { ko: '', en: '' }, // TODO
    learned: { ko: '', en: '' }, // TODO
  },
];
