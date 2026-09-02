import { createContext, useContext } from 'react';

// { lang: 'ko' | 'en', toggle: () => void, setLang: (l) => void }
export const LangContext = createContext({
  lang: 'ko',
  toggle: () => {},
  setLang: () => {},
});

export function useLang() {
  return useContext(LangContext);
}

// 다국어 값 선택: {ko, en} 형태면 해당 언어 값을, 아니면 값 그대로 반환.
export function tr(value, lang) {
  if (value && typeof value === 'object' && ('ko' in value || 'en' in value)) {
    return value[lang] ?? value.ko ?? value.en ?? '';
  }
  return value;
}
