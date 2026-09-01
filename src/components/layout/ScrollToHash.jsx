import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 라우트 이동 시:
 * - 해시(#section)가 있으면 해당 섹션으로 스크롤
 * - 없으면 페이지 최상단으로 이동
 * (다른 페이지에서 "/#projects" 로 돌아올 때도 정상 동작)
 */
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default ScrollToHash;
