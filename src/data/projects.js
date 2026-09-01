// 프로젝트 목록 — 예시 데이터. 실제 프로젝트로 교체하세요.
// STAR 구조(개요/기간·역할/문제해결/배운점)로 상세를 채우면 좋습니다.
export const projects = [
  {
    id: 'todo-app',
    title: '할 일 관리 앱',
    summary: '드래그 앤 드롭이 가능한 투두 리스트',
    thumbnail: '', // 이미지 준비 후 '/assets/projects/todo.png' 형태로 지정
    tags: ['React', 'CSS Modules', 'localStorage'],
    links: {
      demo: '',
      github: '',
    },
    period: '2주 / 개인',
    role: '기획 · 디자인 · 개발 전체',
    problem:
      '드래그 시 불필요한 리렌더링으로 성능이 저하됨 → memo와 상태 구조 개선으로 해결.',
    learned: '리렌더링 최적화와 컴포넌트 분리 기준을 익혔습니다.',
  },
  {
    id: 'weather-app',
    title: '날씨 대시보드',
    summary: '위치 기반 실시간 날씨 조회 서비스',
    thumbnail: '',
    tags: ['React', 'REST API', 'Chart'],
    links: {
      demo: '',
      github: '',
    },
    period: '1주 / 개인',
    role: '기획 · 개발 전체',
    problem: 'API 호출이 과도하게 발생 → 디바운스와 캐싱으로 요청 수를 줄임.',
    learned: '비동기 데이터 처리와 로딩/에러 상태 관리를 연습했습니다.',
  },
];
