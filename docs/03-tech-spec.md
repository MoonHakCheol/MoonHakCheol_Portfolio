# 03. 기술 문서 (Tech Spec)

> 최종 수정: 2026-09-02

---

## 1. 기술 스택 및 선정 근거

| 구분 | 선택 | 근거 |
| --- | --- | --- |
| 빌드 도구 | **Vite** | 개발 서버가 매우 빠르고 설정이 간단. CRA는 유지보수 종료로 비권장 |
| 프레임워크 | **React 18** | 채용 수요 높음, 컴포넌트 재사용에 적합, 학습 자료 풍부 |
| 언어 | **JavaScript** | 초기 학습 부담을 줄이고 구현 속도 우선 (TS는 v2 마이그레이션 고려) |
| 스타일 | **CSS Modules** | 클래스 충돌 방지, 별도 런타임 없음, 순수 CSS 학습에도 유리 |
| 라우팅 | **react-router-dom** | 프로젝트 상세 페이지 확장 대비 |
| 아이콘 | **react-icons** | 다양한 아이콘 세트를 트리셰이킹으로 사용 |
| 배포 | **Vercel** | Git 연동 자동 배포, 무료, 커스텀 도메인 지원 |

> JavaScript를 선택했지만, 협업/채용을 고려하면 이후 TypeScript 전환이 가치가 큽니다. v2 로드맵에 포함.

### 선택하지 않은 것
- **Next.js**: 포트폴리오 규모에서는 오버스펙. SEO는 메타 태그 + SPA로 충분.
- **상태관리 라이브러리(Redux 등)**: 전역 상태가 거의 없어 불필요. 필요 시 Context API.
- **UI 라이브러리(MUI 등)**: 직접 스타일링이 프론트 역량 어필에 유리.

---

## 2. 폴더 구조

```
MoonHakCheol_Portfolio/
├─ docs/                    # 개발 문서 (본 폴더)
├─ public/                  # 정적 자산 (favicon, resume.pdf, og-image)
├─ src/
│  ├─ assets/               # 이미지, 폰트 등 번들 대상 자산
│  ├─ components/           # 재사용 UI 컴포넌트
│  │  ├─ common/            #   Button, Tag, SectionTitle 등
│  │  └─ layout/            #   Header, Footer, Nav
│  ├─ sections/             # 페이지 섹션 (Hero, About, Skills, Projects...)
│  ├─ pages/                # 라우트 페이지 (Home, ProjectDetail)
│  ├─ data/                 # 콘텐츠 데이터 (projects.js, skills.js, profile.js)
│  ├─ hooks/                # 커스텀 훅 (useScrollSpy, useInView 등)
│  ├─ styles/               # 전역 스타일 (variables.css, reset.css, global.css)
│  ├─ utils/                # 유틸 함수
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ vite.config.js
├─ package.json
├─ .gitignore
├─ .eslintrc.cjs / eslint.config.js
├─ .prettierrc
└─ README.md
```

### 콘텐츠는 데이터로 분리
콘텐츠(프로젝트, 스킬 등)는 컴포넌트에 하드코딩하지 않고 `src/data/`에 둡니다.

```js
// src/data/projects.js
export const projects = [
  {
    id: 'todo-app',
    title: '할 일 관리 앱',
    summary: '드래그 앤 드롭이 가능한 투두 리스트',
    thumbnail: '/assets/projects/todo.png',
    tags: ['React', 'CSS Modules', 'localStorage'],
    links: { demo: 'https://...', github: 'https://...' },
    // 상세용
    period: '2주 / 개인',
    role: '기획·디자인·개발 전체',
    problem: '드래그 시 리렌더링 성능 저하 → ...로 해결',
    learned: '...',
  },
  // ...
];
```

> 데이터 스키마를 통일하면 컴포넌트가 단순해지고 콘텐츠 추가가 쉬워집니다.

---

## 3. 코딩 컨벤션

### 파일/네이밍
- 컴포넌트 파일: `PascalCase.jsx` (예: `ProjectCard.jsx`)
- 훅: `useXxx.js` (예: `useScrollSpy.js`)
- 그 외 JS: `camelCase.js`
- CSS Module: `ComponentName.module.css`

### 컴포넌트 규칙
- 함수형 컴포넌트 + 화살표 함수 또는 `function` 선언 (프로젝트 내 통일).
- 하나의 파일에 하나의 주요 컴포넌트.
- props는 구조분해로 받기.
- 조건부 렌더링/매직넘버는 상수로 분리.

```jsx
// 예시
import styles from './ProjectCard.module.css';

function ProjectCard({ project }) {
  const { title, summary, tags } = project;
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.summary}>{summary}</p>
      <ul className={styles.tags}>
        {tags.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </article>
  );
}

export default ProjectCard;
```

### 스타일
- 색·간격·폰트는 반드시 `src/styles/variables.css`의 CSS 변수 사용 (하드코딩 금지).
- 컴포넌트 스타일은 해당 `*.module.css`에 co-location.

### import 순서
1. 외부 라이브러리 → 2. 내부 컴포넌트/훅 → 3. 데이터/유틸 → 4. 스타일

### 린트/포맷
- ESLint + Prettier 사용. 커밋 전 `npm run lint` 통과.

---

## 4. Git 컨벤션

> 저장소: https://github.com/MoonHakCheol/MoonHakCheol_Portfolio
> 이 저장소만 커밋 작성자를 로컬 설정(`git config user.name/email`)했고,
> 원격 URL에 사용자명(`MoonHakCheol@github.com`)을 넣어 계정별 자격 증명을 분리했습니다.

### 브랜치 (현재 구성)
- `main`: 배포(프로덕션) — push 시 Vercel 자동 배포
- `dev`: 평상시 개발/통합 브랜치
- `feat/<기능명>`: 큰 기능은 별도 브랜치에서 작업 후 `dev`로 병합 (예: `feat/hero-section`)
- 흐름: `dev`(또는 `feat/*`) → 병합 → `main` → 자동 배포

### 태그 (버전)
- 배포 단위마다 유의적 버전(SemVer) 태그: `v1.0.0`, `v1.1.0`, ...
- `git tag -a v1.1.0 -m "설명" && git push origin v1.1.0`
- 변경 내역은 [CHANGELOG.md](../CHANGELOG.md)에 기록

### 커밋 메시지 (Conventional Commits)
```
<type>: <제목>

type: feat | fix | style | docs | refactor | chore
예)
feat: 프로젝트 카드 그리드 구현
fix: 모바일에서 네비 겹침 수정
docs: 기술 문서 폴더 구조 추가
```

---

## 5. 성능 · SEO

- 이미지: WebP 사용, `loading="lazy"`, 적절한 크기로 리사이즈.
- 폰트: `font-display: swap`.
- `index.html`에 메타 태그 (title, description, Open Graph) 작성.
- 라우트 분할이 필요해지면 `React.lazy` + `Suspense`.
- 배포 후 Lighthouse로 측정 (목표 90+).

```html
<!-- index.html 메타 예시 -->
<meta name="description" content="신입 프론트엔드 개발자 문학철의 포트폴리오" />
<meta property="og:title" content="문학철 포트폴리오" />
<meta property="og:image" content="/og-image.png" />
```

---

## 6. 배포 (Vercel) — ✅ 완료

- 라이브: **https://mhc-portfolio-iota.vercel.app/**
- `main` 브랜치 push 시 자동 재배포 (GitHub 연동)
- `vercel.json`에 SPA rewrite 설정 → 새로고침 시 `/projects/...` 404 방지
- 상세 절차·점검 항목은 [docs/05-deploy.md](05-deploy.md) 참고

### 대안: GitHub Pages
`vite.config.js`의 `base`를 저장소명으로 설정하고 `gh-pages` 패키지 사용. (Vercel이 더 간편)

---

## 7. 환경 · 도구

- Node.js LTS (18 이상 권장)
- 패키지 매니저: npm (프로젝트 내 통일)
- 에디터: VS Code + 확장 (ESLint, Prettier)
- `.gitignore`에 `node_modules`, `dist`, `.env` 포함

---

## 8. 향후 확장 (v2)

- TypeScript 마이그레이션
- 다크 모드 토글
- 프로젝트 상세 페이지 라우팅 정식 도입
- 문의 폼 (Formspree/EmailJS)
- 방문 분석 (Vercel Analytics / GA)
