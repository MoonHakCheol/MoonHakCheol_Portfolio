# 변경 이력 (CHANGELOG)

이 프로젝트의 주요 변경 사항을 기록합니다.
버전은 [유의적 버전(SemVer)](https://semver.org/lang/ko/)을 따릅니다.

## [Unreleased]

### 남은 작업 (콘텐츠)

- 프로젝트 상세: 사용 기술(tags), 문제 해결 과정, 배운 점, 데모/저장소 링크
- 프로젝트 썸네일/스크린샷, 이력서 PDF(`public/resume.pdf` → `resumeReady: true`), OG 이미지

## [1.4.0] - 2026-11-03

### 추가

- **절제된 애니메이션** (`motion` 도입): 섹션 등장, Hero 순차 등장, 타임라인 선 채움, 스크롤 진행 막대, 페이지 전환 페이드
- **다크 모드**: 시스템 설정을 따르고, 헤더 토글로 변경 가능 (선택 저장)
- **빠른 이동 팔레트** (Ctrl/⌘ + K): 섹션·프로젝트 이동, 테마·언어·사운드 전환, 이메일 복사
- **Skills 카테고리 필터**, **Experience 항목 접기/펼치기**, **Contact 복사 버튼과 토스트**, **맨 위로 버튼**
- 헤더 활성 메뉴 표시 애니메이션, 카드 테두리 글로우, Hero 배경 점 격자

### 변경

- Experience 근로장학생 내용을 인프라 / 웹 서비스 / 자동화·데이터 기준으로 재구성
- Projects 그리드를 데스크톱 2열로 변경

### 수정

- 프로젝트 상세 페이지에서 헤더 메뉴를 눌러도 해당 섹션으로 이동하지 않던 문제

## [1.3.0] - 2026-09-02

### 추가

- **한국어 ↔ 영어 이중 언어 지원 (i18n)**
  - 헤더에 언어 토글 버튼(EN/한), 선택은 localStorage에 기억
  - 모든 UI 문구·프로필·경력·프로젝트 콘텐츠를 `{ ko, en }` 구조로 다국어화
  - `document.documentElement.lang` 자동 갱신

## [1.2.0] - 2026-09-02

### 변경

- 클릭 사운드 스타일 교체: 8비트(triangle 비프) → **부드러운 팝**(sine + 피치 글라이드)
  - 클릭 / 사운드 토글 / 이스터에그 축하음 모두 부드러운 톤으로 통일

## [1.1.1] - 2026-09-02

### 추가

- 내용이 비어 있는 영역에 "준비 중 / 내용을 채울 예정" 표기·비활성 처리
  - 이력서 버튼: "이력서 준비 중" 비활성 버튼 (헤더·Hero)
  - 프로젝트 카드/상세: 빈 기술 스택·링크에 "준비 중" 배지
  - 프로젝트 상세: 문제와 해결 / 배운 점이 비면 "내용을 채울 예정입니다" 표기
  - Contact: 블로그 링크 없을 때 "블로그 준비 중" 비활성 표기

## [1.1.0] - 2026-09-02

### 추가

- 실제 프로젝트(CarScope, WatchMan)로 Projects 데이터 교체
- 이력서 파일 준비 전까지 이력서 버튼을 숨기는 `resumeReady` 플래그 (깨진 링크 방지)
- 배포 가이드 문서(`docs/05-deploy.md`), 변경 이력(`CHANGELOG.md`)

### 변경

- 문서 최신화: 배포 URL, Git 브랜치/태그 구성, 진행 현황 반영
  (`README.md`, `docs/03-tech-spec.md`, `docs/04-roadmap.md`)

## [1.0.0] - 2026-09-02

### 추가

- Vite + React(JS) 프로젝트 세팅 및 폴더 구조
- 섹션: Hero / About / Skills / Projects / Experience / Contact
- `react-router-dom` 라우팅 (홈 + 프로젝트 상세 `/projects/:id`)
- 프로필·경력·학력·근로장학생 활동·스택 데이터
- Experience: 로고 표시, 업무 카드, 학교 프로젝트, 강조(굵은 빨간색) 처리
- 재미 요소: 클릭 사운드(Web Audio) + 코나미 코드 이스터에그(컨페티)
- 개발 문서(`docs/`), Pretendard 폰트, 접근성/반응형 기본 대응
- Vercel 배포 및 SPA rewrite (`vercel.json`)
- Git 브랜치(`main`/`dev`) 및 릴리스 태그 설정

[Unreleased]: https://github.com/MoonHakCheol/MoonHakCheol_Portfolio/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/MoonHakCheol/MoonHakCheol_Portfolio/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/MoonHakCheol/MoonHakCheol_Portfolio/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/MoonHakCheol/MoonHakCheol_Portfolio/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/MoonHakCheol/MoonHakCheol_Portfolio/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/MoonHakCheol/MoonHakCheol_Portfolio/releases/tag/v1.0.0
