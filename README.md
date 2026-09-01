# 문학철 포트폴리오 (MoonHakCheol Portfolio)

신입 개발자 취업을 목표로 한 개인 포트폴리오 웹사이트입니다.
방문자(채용 담당자)가 **5분 안에** 나의 역량·프로젝트·연락처를 파악할 수 있도록 하는 것을 목표로 합니다.

## 기술 스택

- **빌드 도구**: Vite
- **프레임워크**: React 18 (JavaScript)
- **스타일**: CSS Modules (+ 필요 시 유틸리티)
- **라우팅**: react-router-dom (단일 페이지 스크롤 + 세부 페이지 혼용)
- **배포**: Vercel (또는 GitHub Pages)

> 스택 선정 근거는 [docs/03-tech-spec.md](docs/03-tech-spec.md) 참고.

## 문서 (docs/)

개발 시작 전 아래 문서를 순서대로 읽으면 전체 그림이 잡힙니다.

| 순서 | 문서 | 내용 |
| --- | --- | --- |
| 1 | [기획서 · 정보구조(PRD/IA)](docs/01-prd-ia.md) | 목적, 타깃, 페이지/섹션 구조, 콘텐츠 정의 |
| 2 | [디자인 가이드](docs/02-design-guide.md) | 컬러, 타이포그래피, 간격, 반응형, 컴포넌트 스타일 |
| 3 | [기술 문서](docs/03-tech-spec.md) | 스택 근거, 폴더 구조, 코딩 컨벤션, 배포 |
| 4 | [작업 로드맵 · 할일](docs/04-roadmap.md) | 단계별 태스크와 체크리스트 |

## 빠른 시작

프로젝트는 이미 세팅되어 있습니다. 아래 명령으로 바로 실행하세요.

```bash
# 1. 의존성 설치 (최초 1회)
npm install

# 2. 개발 서버 실행 (http://localhost:5173)
npm run dev

# 3. 프로덕션 빌드 / 미리보기
npm run build
npm run preview

# 4. 린트
npm run lint
```

## 프로젝트 상태

- [x] 기획 및 문서 정리
- [x] 프로젝트 초기 세팅 (Vite)
- [x] 공통 컴포넌트 / 레이아웃 (기본 뼈대)
- [x] 섹션별 구현 (기본 뼈대 — 콘텐츠 채우기 필요)
- [ ] 반응형 대응 다듬기
- [ ] 배포

진행 현황은 [docs/04-roadmap.md](docs/04-roadmap.md)에서 관리합니다.
