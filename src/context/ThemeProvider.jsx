import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { ThemeContext } from './theme-context';

const STORAGE_KEY = 'portfolio-theme';

function readInitial() {
  // index.html 의 인라인 스크립트가 첫 페인트 전에 정해 둔 값을 따른다 (깜빡임 방지)
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitial);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const apply = () => flushSync(() => setTheme(next));

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 저장 실패 무시 (프라이빗 모드 등)
    }

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (document.startViewTransition && !reduced) {
      document.startViewTransition(apply); // 지원 브라우저에서는 부드럽게 교차 전환
    } else {
      apply();
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
