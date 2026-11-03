import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 섹션으로 이동한다.
 * 홈에서는 바로 스크롤하고(같은 해시를 다시 눌러도 동작), 다른 페이지에서는 홈으로 돌아간 뒤
 * ScrollToHash 가 해당 섹션으로 스크롤한다.
 */
export function useSectionNav() {
  const navigate = useNavigate();

  return useCallback(
    (id) => {
      document.getElementById(id)?.scrollIntoView();
      navigate(`/#${id}`);
    },
    [navigate]
  );
}
