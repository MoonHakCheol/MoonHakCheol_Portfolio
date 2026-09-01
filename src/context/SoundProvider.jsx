import { useCallback, useMemo, useState } from 'react';
import { SoundContext } from './sound-context';
import { playSound } from '../utils/sound';

const STORAGE_KEY = 'portfolio-sound';

function readInitial() {
  try {
    // 기본값: 켜짐 ('off' 로 저장된 경우에만 끔)
    return localStorage.getItem(STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
}

function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(readInitial);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
      } catch {
        // 저장 실패는 무시 (프라이빗 모드 등)
      }
      return next;
    });
  }, []);

  const play = useCallback(
    (type) => {
      if (enabled) playSound(type);
    },
    [enabled]
  );

  const value = useMemo(
    () => ({ enabled, toggle, play }),
    [enabled, toggle, play]
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export default SoundProvider;
