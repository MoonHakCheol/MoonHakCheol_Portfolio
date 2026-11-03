import { motion } from 'motion/react';
import { EASE_OUT } from './easing';

const TAGS = {
  div: motion.div,
  li: motion.li,
  ul: motion.ul,
  p: motion.p,
  section: motion.section,
};

/**
 * 뷰포트에 들어올 때 한 번 떠오르며 나타난다.
 * prefers-reduced-motion 은 main.jsx 의 MotionConfig 가 처리한다 (이동 없이 페이드만).
 */
function Reveal({ as = 'div', delay = 0, y = 16, children, ...rest }) {
  const Tag = TAGS[as];

  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
