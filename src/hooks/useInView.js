import { useEffect, useRef, useState } from 'react';

/**
 * 요소가 뷰포트에 들어오면 true를 반환한다. (스크롤 진입 애니메이션용)
 * @param {object} options - IntersectionObserver 옵션
 */
export function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(el);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}
