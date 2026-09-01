import { useEffect, useRef } from 'react';

// ↑ ↑ ↓ ↓ ← → ← → B A
const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/**
 * 코나미 코드를 순서대로 입력하면 callback을 호출한다.
 */
export function useKonamiCode(callback) {
  const indexRef = useRef(0);

  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (key === SEQUENCE[indexRef.current]) {
        indexRef.current += 1;
        if (indexRef.current === SEQUENCE.length) {
          indexRef.current = 0;
          callback();
        }
      } else {
        // 첫 글자면 1부터 다시 시작, 아니면 리셋
        indexRef.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [callback]);
}
