import { useEffect, useState } from 'react';

/**
 * 현재 뷰포트에 보이는 섹션 id를 반환한다. (네비 active 표시용)
 * @param {string[]} sectionIds - 감시할 섹션 id 배열
 * @param {number} offset - 상단 헤더 높이 보정(px)
 */
export function useScrollSpy(sectionIds, offset = 80) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset + 1;
      let current = sectionIds[0] ?? '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}
