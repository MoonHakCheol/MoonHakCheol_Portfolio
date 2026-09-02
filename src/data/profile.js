// 기본 프로필 정보. 다국어 필드는 { ko, en } 형태.
export const profile = {
  name: { ko: '문학철', en: 'Moon Hak-cheol' },
  role: { ko: '풀스택 개발자', en: 'Full-Stack Developer' },
  tagline: {
    ko: '꾸준히 만들고, 문제를 끝까지 해결하는 개발자를 지향합니다.',
    en: 'A developer who keeps building and sees problems through to the end.',
  },
  intro: {
    ko:
      '안녕하세요, 풀스택 개발자 문학철입니다. ' +
      '프론트엔드부터 서버·인프라까지 직접 만들며 문제를 끝까지 해결하는 것을 좋아합니다.',
    en:
      "Hello, I'm Moon Hak-cheol, a full-stack developer. " +
      'I enjoy building everything from the frontend to servers and infrastructure, and solving problems end to end.',
  },
  location: { ko: '대한민국', en: 'South Korea' },
  email: 'gkrcjf1019@naver.com',
  phone: '010-3316-1466',
  resumeUrl: '/resume.pdf',
  // public/resume.pdf 를 넣은 뒤 true 로 바꾸면 이력서 버튼이 나타납니다.
  resumeReady: false,
  links: {
    github: 'https://github.com/MoonHakCheol',
    blog: '', // 나중에 추가
  },
  info: [
    {
      label: { ko: '지역', en: 'Location' },
      value: { ko: '대한민국', en: 'South Korea' },
    },
    {
      label: { ko: '관심 분야', en: 'Interests' },
      value: {
        ko: '풀스택 개발, 업무 자동화, 서버·인프라',
        en: 'Full-stack dev, workflow automation, servers & infra',
      },
    },
  ],
};
