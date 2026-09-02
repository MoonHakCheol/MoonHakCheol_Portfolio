import { useState } from 'react';
import { FiMenu, FiX, FiVolume2, FiVolumeX } from 'react-icons/fi';
import Container from '../common/Container';
import Button from '../common/Button';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useSound } from '../../context/sound-context';
import { useLang, tr } from '../../i18n/lang-context';
import { ui } from '../../i18n/ui';
import { playSound } from '../../utils/sound';
import { profile } from '../../data/profile';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS, 80);
  const { enabled, toggle, play } = useSound();
  const { lang, toggle: toggleLang } = useLang();
  const t = ui[lang];

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = () => {
    play('click');
    closeMenu();
  };

  const handleSoundToggle = () => {
    // 상태와 무관하게 토글 피드백음을 재생
    playSound(enabled ? 'toggleOff' : 'toggleOn');
    toggle();
  };

  const handleLangToggle = () => {
    play('click');
    toggleLang();
  };

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a href="#home" className={styles.logo} onClick={handleNavClick}>
          {tr(profile.name, lang)}
        </a>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          aria-label="주요 메뉴"
        >
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeId === item.id ? styles.active : ''}
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {profile.resumeReady ? (
            <Button
              as="a"
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeBtn}
            >
              {t.resume}
            </Button>
          ) : (
            <Button
              as="button"
              variant="secondary"
              className={styles.resumeBtn}
              disabled
              title={t.resumePending}
            >
              {t.resumePending}
            </Button>
          )}
        </nav>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.langToggle}
            onClick={handleLangToggle}
            aria-label={t.langToggle}
            title={t.langToggle}
          >
            {lang === 'ko' ? 'EN' : '한'}
          </button>

          <button
            type="button"
            className={styles.soundToggle}
            onClick={handleSoundToggle}
            aria-label={enabled ? t.soundOn : t.soundOff}
            aria-pressed={enabled}
            title={enabled ? t.soundOn : t.soundOff}
          >
            {enabled ? <FiVolume2 size={20} /> : <FiVolumeX size={20} />}
          </button>

          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </Container>
    </header>
  );
}

export default Header;
