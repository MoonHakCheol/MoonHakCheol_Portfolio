import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import {
  FiMenu,
  FiMoon,
  FiSearch,
  FiSun,
  FiVolume2,
  FiVolumeX,
  FiX,
} from 'react-icons/fi';
import Container from '../common/Container';
import Button from '../common/Button';
import { SPRING_SNAPPY } from '../motion/easing';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useSectionNav } from '../../hooks/useSectionNav';
import { useSound } from '../../context/sound-context';
import { useTheme } from '../../context/theme-context';
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
const IS_MAC = /Mac|iPhone|iPad/.test(navigator.platform);

function Header({ onOpenPalette }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS, 80);
  const goToSection = useSectionNav();
  const { enabled, toggle, play } = useSound();
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang } = useLang();
  const { scrollY } = useScroll();
  const t = ui[lang];

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));

  const handleNavClick = (e, id) => {
    // 새 탭으로 열기 등 기본 동작은 그대로 둔다
    if (e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    play('click');
    setMenuOpen(false);
    goToSection(id);
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

  const handleThemeToggle = () => {
    play('click');
    toggleTheme();
  };

  const themeLabel = theme === 'dark' ? t.themeToLight : t.themeToDark;

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <Container className={styles.inner}>
        <a
          href="/#home"
          className={styles.logo}
          onClick={(e) => handleNavClick(e, 'home')}
        >
          {tr(profile.name, lang)}
        </a>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          aria-label="주요 메뉴"
        >
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    className={`${styles.navLink} ${active ? styles.active : ''}`}
                    aria-current={active ? 'true' : undefined}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className={styles.navPill}
                        transition={SPRING_SNAPPY}
                      />
                    )}
                    <span className={styles.navLabel}>{item.label}</span>
                  </a>
                </li>
              );
            })}
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
            className={styles.paletteBtn}
            onClick={onOpenPalette}
            aria-label={t.paletteOpen}
            title={t.paletteOpen}
          >
            <FiSearch size={15} aria-hidden="true" />
            <kbd className={styles.kbd}>{IS_MAC ? '⌘K' : 'Ctrl K'}</kbd>
          </button>

          <button
            type="button"
            className={styles.iconToggle}
            onClick={handleLangToggle}
            aria-label={t.langToggle}
            title={t.langToggle}
          >
            {lang === 'ko' ? 'EN' : '한'}
          </button>

          <button
            type="button"
            className={styles.iconToggle}
            onClick={handleThemeToggle}
            aria-label={themeLabel}
            title={themeLabel}
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <button
            type="button"
            className={styles.iconToggle}
            onClick={handleSoundToggle}
            aria-label={enabled ? t.soundOn : t.soundOff}
            aria-pressed={enabled}
            title={enabled ? t.soundOn : t.soundOff}
          >
            {enabled ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
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
