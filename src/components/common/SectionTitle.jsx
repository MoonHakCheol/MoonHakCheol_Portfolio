import { motion } from 'motion/react';
import Reveal from '../motion/Reveal';
import { EASE_OUT } from '../motion/easing';
import styles from './SectionTitle.module.css';

function SectionTitle({ children, subtitle }) {
  return (
    <Reveal className={styles.wrap}>
      <h2 className={styles.title}>{children}</h2>
      <motion.span
        className={styles.line}
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT }}
      />
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </Reveal>
  );
}

export default SectionTitle;
