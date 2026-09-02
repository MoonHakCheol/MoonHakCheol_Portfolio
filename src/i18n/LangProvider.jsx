import { useCallback, useEffect, useMemo, useState } from 'react';
import { LangContext } from './lang-context';

const STORAGE_KEY = 'portfolio-lang';

function readInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ko' || saved === 'en') return saved;
  } catch {
    // 무시
  }
  return 'ko';
}

function LangProvider({ children }) {
  const [lang, setLang] = useState(readInitial);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // 저장 실패 무시 (프라이빗 모드 등)
    }
  }, [lang]);

  const toggle = useCallback(
    () => setLang((prev) => (prev === 'ko' ? 'en' : 'ko')),
    []
  );

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, toggle]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export default LangProvider;
