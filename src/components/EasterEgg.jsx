import { useCallback, useEffect, useState } from 'react';
import { useKonamiCode } from '../hooks/useKonamiCode';
import { useSound } from '../context/sound-context';
import { useLang } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { playSound } from '../utils/sound';
import { launchConfetti } from '../utils/confetti';
import styles from './EasterEgg.module.css';

function EasterEgg() {
  const { enabled } = useSound();
  const { lang } = useLang();
  const [show, setShow] = useState(false);

  const trigger = useCallback(() => {
    launchConfetti();
    // 이스터에그는 음소거 여부와 무관하게 축하음을 재생 (특별한 순간)
    if (enabled) playSound('success');
    setShow(true);
  }, [enabled]);

  useKonamiCode(trigger);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <div className={styles.toast} role="status" aria-live="polite" hidden={!show}>
      {ui[lang].easterEgg}
    </div>
  );
}

export default EasterEgg;
