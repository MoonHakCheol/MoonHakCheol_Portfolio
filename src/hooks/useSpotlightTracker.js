import { useEffect } from 'react';

/** .spotlight 요소 위에서 커서 위치를 --mx / --my 로 알려 준다. (테두리 글로우용) */
export function useSpotlightTracker() {
  useEffect(() => {
    const handleMove = (e) => {
      if (e.pointerType === 'touch') return;
      const spot = e.target instanceof Element && e.target.closest('.spotlight');
      if (!spot) return;
      const rect = spot.getBoundingClientRect();
      spot.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      spot.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    document.addEventListener('pointermove', handleMove, { passive: true });
    return () => document.removeEventListener('pointermove', handleMove);
  }, []);
}
