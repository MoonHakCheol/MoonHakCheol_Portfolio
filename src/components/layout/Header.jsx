import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import {
  FiGlobe,
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
import { EASE_OUT, SPRING_SNAPPY } from '../motion/easing';
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

// Hero 에 있을 때는 아무 메뉴도 활성화하지 않도록 home 을 포함한다
const SECTION_IDS = ['home', ...NAV_ITEMS.map((item) => item.id)];
const IS_MAC = /Mac|iPhone|iPad/.test(navigator.platform);
const DESKTOP_QUERY = '(min-width: 768px)';

function Header({ onOpenPalette }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const activeId = useScrollSpy(SECTION_IDS, 80);
  const goToSection = useSectionNav();
  const { enabled, toggle, play } = useSound();
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang } = useLang();
  const { scrollY } = useScroll();
  const t = ui[lang];

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));

  // 모바일 메뉴가 열린 동안: 뒤 화면 스크롤과 키보드 포커스를 막는다
  useLayoutEffect(() => {
    if (!menuOpen) return;
    const behind = document.querySelectorAll('main, footer');
    document.documentElement.style.overflow = 'hidden';
    behind.forEach((el) => {
      el.inert = true;
    });
    return () => {
      document.documentElement.style.overflow = '';
      behind.forEach((el) => {
        el.inert = false;
      });
    };
  }, [menuOpen]);

  // Esc 로 닫기, 데스크톱 폭이 되면 닫기
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const media = window.matchMedia(DESKTOP_QUERY);
    const handleResize = () => {
      if (media.matches) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    media.addEventListener('change', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKey);
      media.removeEventListener('change', handleResize);
    };
  }, [menuOpen]);

  const handleNavClick = (e, id) => {
    // 새 탭으로 열기 등 기본 동작은 그대로 둔다
    if (e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    play('click');
    // 스크롤 잠금을 먼저 풀어야 섹션으로 이동할 수 있다
    flushSync(() => setMenuOpen(false));
    goToSection(id);
  };

  const handleMenuToggle = () => {
    play('click');
    setMenuOpen((v) => !v);
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
  const soundLabel = enabled ? t.soundOn : t.soundOff;
  const ThemeIcon = theme === 'dark' ? FiSun : FiMoon;
  const SoundIcon = enabled ? FiVolume2 : FiVolumeX;

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <Container className={styles.inner}>
          <a
            href="/#home"
            className={styles.logo}
            onClick={(e) => handleNavClick(e, 'home')}
          >
            {tr(profile.name, lang)}
          </a>

          <nav className={styles.nav} aria-label={t.navLabel}>
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
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className={styles.navLine}
                          transition={SPRING_SNAPPY}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.controls}>
            {profile.resumeReady && (
              <Button
                as="a"
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.resumeBtn}
              >
                {t.resume}
              </Button>
            )}

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
              className={styles.iconBtn}
              onClick={handleLangToggle}
              aria-label={t.langToggle}
              title={t.langToggle}
            >
              {lang === 'ko' ? 'EN' : '한'}
            </button>

            <button
              type="button"
              className={styles.iconBtn}
              onClick={handleThemeToggle}
              aria-label={themeLabel}
              title={themeLabel}
            >
              <ThemeIcon size={18} />
            </button>

            <button
              type="button"
              className={styles.iconBtn}
              onClick={handleSoundToggle}
              aria-label={soundLabel}
              aria-pressed={enabled}
              title={soundLabel}
            >
              <SoundIcon size={18} />
            </button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuToggle}
            onClick={handleMenuToggle}
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </Container>
      </header>

      {/* 모바일 전체 화면 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.sheet}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <nav aria-label={t.navLabel}>
              <ul className={styles.sheetList}>
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.03 + i * 0.04,
                      ease: EASE_OUT,
                    }}
                  >
                    <a
                      href={`/#${item.id}`}
                      className={`${styles.sheetLink} ${activeId === item.id ? styles.sheetActive : ''}`}
                      aria-current={activeId === item.id ? 'true' : undefined}
                      onClick={(e) => handleNavClick(e, item.id)}
                    >
                      <span className={styles.sheetIndex} aria-hidden="true">
                        0{i + 1}
                      </span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className={styles.sheetControls}>
              <button
                type="button"
                className={styles.sheetBtn}
                onClick={handleLangToggle}
              >
                <FiGlobe size={18} aria-hidden="true" />
                {t.langToggle}
              </button>
              <button
                type="button"
                className={styles.sheetBtn}
                onClick={handleThemeToggle}
              >
                <ThemeIcon size={18} aria-hidden="true" />
                {themeLabel}
              </button>
              <button
                type="button"
                className={styles.sheetBtn}
                onClick={handleSoundToggle}
                aria-pressed={enabled}
              >
                <SoundIcon size={18} aria-hidden="true" />
                {soundLabel}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
