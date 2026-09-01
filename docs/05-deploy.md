# 05. 배포 가이드 (Vercel)

> 최종 수정: 2026-09-02
> 저장소: https://github.com/MoonHakCheol/MoonHakCheol_Portfolio

이 프로젝트는 **Vercel + GitHub 연동**으로 배포합니다. `main` 브랜치에 push하면 자동으로 재배포됩니다.

---

## 사전 준비 (이미 완료된 설정)

- [x] `vercel.json` — SPA 라우팅 rewrite (새로고침 시 `/projects/...` 404 방지)
- [x] Vite 기본 빌드 설정 (`npm run build` → `dist/`)
- [x] GitHub 저장소에 코드 push

> Vercel은 Vite 프로젝트를 자동 감지합니다. 별도 빌드 설정을 손댈 필요가 거의 없습니다.

---

## 배포 절차 (대시보드 — 권장)

가장 간단하고, 이후 push마다 자동 배포됩니다.

1. https://vercel.com 접속 → **MoonHakCheol GitHub 계정으로 로그인**
   (Fehe1234 등 다른 계정으로 로그인하면 이 저장소가 안 보일 수 있습니다.)
2. **Add New… → Project** 클릭
3. `MoonHakCheol_Portfolio` 저장소 **Import**
   - 처음이면 GitHub 연동 권한(Install)에서 이 저장소 접근을 허용
4. 설정 화면에서 자동 감지값 확인 (그대로 두면 됩니다)
   | 항목 | 값 |
   | --- | --- |
   | Framework Preset | **Vite** |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |
5. **Deploy** 클릭 → 1~2분 후 `*.vercel.app` 주소 발급
6. 이후 `git push` 하면 자동 재배포

배포가 끝나면 발급된 URL을 [README.md](../README.md)의 상단이나 "프로젝트 상태"에 적어두세요.

---

## 배포 절차 (CLI — 대안)

터미널에서 바로 배포하고 싶을 때.

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 로그인 (브라우저 인증)
vercel login

# 3. 프로젝트 루트에서 실행 → 안내에 따라 프로젝트 연결
vercel

# 4. 프로덕션 배포
vercel --prod
```

> CLI로 배포해도 GitHub 연동을 함께 걸어두면 push 자동 배포를 그대로 쓸 수 있습니다.

---

## 커스텀 도메인 (선택)

1. Vercel 프로젝트 → **Settings → Domains**
2. 보유 도메인 입력 후 안내되는 DNS 레코드(A/CNAME)를 도메인 등록업체에 추가
3. 검증되면 HTTPS 인증서가 자동 발급됩니다

---

## 배포 후 점검 체크리스트

- [ ] 메인 페이지 정상 로딩
- [ ] 새로고침 상태에서 `/projects/carscope` 등 직접 접근 시 404 안 뜨는지 (vercel.json 확인)
- [ ] 로고·이미지 정상 표시 (`public/logos/*`)
- [ ] 이력서 다운로드 링크 (`public/resume.pdf` 업로드 필요)
- [ ] 모바일/데스크톱 레이아웃
- [ ] Lighthouse 성능·접근성 측정 (목표 90+)
- [ ] OG 이미지(`public/og-image.png`) — 카카오톡/디스코드 링크 미리보기용

---

## 참고: 환경 변수

현재는 백엔드/비밀키가 없어 환경 변수가 필요 없습니다.
추후 문의 폼(EmailJS 등)을 붙이면 Vercel **Settings → Environment Variables**에 키를 등록하세요.
