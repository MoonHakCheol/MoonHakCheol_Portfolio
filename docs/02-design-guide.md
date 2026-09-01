# 02. 디자인 가이드

> 최종 수정: 2026-09-02
> 목표: 화려함보다 **명료함·일관성**. 신입 개발자의 신뢰감을 주는 깔끔한 디자인.

---

## 1. 디자인 원칙

1. **여백을 아끼지 않는다** — 답답하지 않게, 콘텐츠에 숨 쉴 공간.
2. **색은 적게** — 무채색 베이스 + 포인트 컬러 1개.
3. **일관성** — 간격/모서리/그림자를 토큰으로 통일.
4. **가독성 우선** — 폰트 크기·대비를 충분히.
5. **모바일 퍼스트** — 작은 화면부터 설계 후 확장.

---

## 2. 컬러 팔레트

CSS 변수로 관리합니다. 라이트 모드 기준, 다크 모드는 v2 확장.

```css
:root {
  /* Neutral (베이스) */
  --color-bg:        #ffffff;
  --color-surface:   #f7f8fa;  /* 카드 배경 */
  --color-border:    #e5e7eb;
  --color-text:      #1a1a1a;  /* 본문 */
  --color-text-sub:  #6b7280;  /* 보조 텍스트 */

  /* Point (포인트 — 취향에 맞게 1개 선택) */
  --color-primary:      #2563eb;  /* 블루 예시 */
  --color-primary-hover:#1d4ed8;
  --color-primary-soft: #eff6ff;  /* 연한 배경 */

  /* State */
  --color-success: #16a34a;
  --color-danger:  #dc2626;
}
```

> 포인트 컬러 후보: 블루(#2563eb, 신뢰), 그린(#059669, 성장), 바이올렛(#7c3aed, 창의). 하나만 선택.

### 대비(접근성)
- 본문 텍스트와 배경 대비 **4.5:1 이상** 유지.
- 포인트 컬러 위 텍스트는 흰색으로 대비 확보.

---

## 3. 타이포그래피

```css
:root {
  --font-sans: 'Pretendard', -apple-system, BlinkMacSystemFont,
               'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;

  /* Type scale (1.25 비율 기준) */
  --fs-xs:   0.75rem;  /* 12px */
  --fs-sm:   0.875rem; /* 14px */
  --fs-base: 1rem;     /* 16px 본문 */
  --fs-lg:   1.25rem;  /* 20px */
  --fs-xl:   1.5rem;   /* 24px */
  --fs-2xl:  2rem;     /* 32px 섹션 제목 */
  --fs-3xl:  3rem;     /* 48px Hero */

  --lh-tight: 1.2;   /* 제목 */
  --lh-base:  1.6;   /* 본문 */
  --fw-normal: 400;
  --fw-medium: 500;
  --fw-bold:   700;
}
```

- 한글 웹폰트는 **Pretendard** 권장 (가독성 우수, 무료). CDN 또는 로컬.
- 제목은 bold + tight, 본문은 normal + 1.6 행간.

---

## 4. 간격 · 레이아웃

```css
:root {
  /* Spacing scale (4px 단위) */
  --space-1: 0.25rem;  /* 4  */
  --space-2: 0.5rem;   /* 8  */
  --space-3: 0.75rem;  /* 12 */
  --space-4: 1rem;     /* 16 */
  --space-6: 1.5rem;   /* 24 */
  --space-8: 2rem;     /* 32 */
  --space-12: 3rem;    /* 48 */
  --space-16: 4rem;    /* 64 */
  --space-24: 6rem;    /* 96 섹션 간 여백 */

  /* Layout */
  --container-max: 1120px;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;

  --shadow-sm: 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,.08);
}
```

- 콘텐츠 최대 폭 `1120px`, 좌우 패딩 모바일 `16px` / 데스크톱 `24px`.
- 섹션 상하 여백 `--space-24` (모바일에서는 `--space-16`).

---

## 5. 반응형 브레이크포인트

모바일 퍼스트로 작성하고 `min-width`로 확장.

| 이름 | 범위 | 대상 |
| --- | --- | --- |
| base | ~639px | 모바일 |
| sm | 640px~ | 큰 모바일 / 세로 태블릿 |
| md | 768px~ | 태블릿 |
| lg | 1024px~ | 데스크톱 |
| xl | 1280px~ | 큰 데스크톱 |

```css
/* 예시 */
.grid { grid-template-columns: 1fr; }

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## 6. 컴포넌트 스타일 가이드

### 버튼
- Primary: 포인트 컬러 배경 + 흰 텍스트, hover 시 어둡게.
- Secondary: 테두리만(outline), 배경 투명.
- 높이 44px 이상 (터치 타깃), 좌우 패딩 `--space-6`, radius `--radius-sm`.

### 카드 (프로젝트)
- 배경 `--color-surface`, 테두리 `--color-border`, radius `--radius-md`.
- hover: `--shadow-md` + 살짝 위로 이동(`translateY(-4px)`), transition 0.2s.
- 썸네일은 `aspect-ratio: 16 / 9`로 통일.

### 태그 (기술 스택)
- 작은 pill 형태, `--fs-xs`, 배경 `--color-primary-soft`, 텍스트 포인트 컬러.

### 섹션 제목
- `--fs-2xl` bold, 하단에 짧은 언더라인 또는 보조 설명.

---

## 7. 모션 · 인터랙션

- 과하지 않게. transition은 `0.2s ease` 정도.
- 스크롤 진입 시 페이드/업 애니메이션 (Intersection Observer, `prefers-reduced-motion` 존중).
- hover 피드백은 명확하게 (색/그림자/이동).

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

---

## 8. 접근성 체크리스트

- [ ] 모든 이미지에 `alt` 제공
- [ ] 색만으로 정보 전달하지 않기
- [ ] 키보드로 모든 링크/버튼 접근 가능 (`:focus-visible` 스타일)
- [ ] 시맨틱 태그 사용 (`header`, `nav`, `main`, `section`, `footer`)
- [ ] 대비 4.5:1 이상

---

## 9. 참고 자료

- 폰트: [Pretendard](https://github.com/orioncactus/pretendard)
- 아이콘: [Lucide](https://lucide.dev/) / [react-icons](https://react-icons.github.io/react-icons/)
- 컬러 도구: [Coolors](https://coolors.co/), 대비 검사 [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
