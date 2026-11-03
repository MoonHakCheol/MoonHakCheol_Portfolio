import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import { FiArrowUp } from 'react-icons/fi';
import { useSound } from '../../context/sound-context';
import { useLang } from '../../i18n/lang-context';
import { ui } from '../../i18n/ui';
import styles from './BackToTop.module.css';

const SHOW_AFTER = 600;

function BackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const { play } = useSound();
  const { lang } = useLang();
  const label = ui[lang].backToTop;

  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > SHOW_AFTER));

  const handleClick = () => {
    play('click');
    window.scrollTo({ top: 0 });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          className={styles.button}
          onClick={handleClick}
          aria-label={label}
          title={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
        >
          <FiArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;
