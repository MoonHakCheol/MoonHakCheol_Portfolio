import { useCallback } from 'react';
import { useToast } from '../context/toast-context';
import { useLang } from '../i18n/lang-context';
import { ui } from '../i18n/ui';

/** 클립보드에 복사하고 결과를 토스트로 알린다. 성공 여부를 반환한다. */
export function useCopy() {
  const { show } = useToast();
  const { lang } = useLang();

  return useCallback(
    async (text, successMessage) => {
      try {
        await navigator.clipboard.writeText(text);
        show(successMessage);
        return true;
      } catch {
        show(ui[lang].copyFailed);
        return false;
      }
    },
    [show, lang]
  );
}
