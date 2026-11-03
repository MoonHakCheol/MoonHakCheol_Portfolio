import { motion, useScroll, useSpring } from 'motion/react';
import styles from './ScrollProgress.module.css';

/** 화면 최상단의 스크롤 진행 막대 */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div className={styles.bar} style={{ scaleX }} aria-hidden="true" />
  );
}

export default ScrollProgress;
