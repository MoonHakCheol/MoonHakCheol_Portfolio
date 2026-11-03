import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  FiCopy,
  FiCornerDownLeft,
  FiFolder,
  FiGithub,
  FiGlobe,
  FiHash,
  FiMoon,
  FiSearch,
  FiSun,
  FiVolume2,
  FiVolumeX,
} from 'react-icons/fi';
import { SPRING_SNAPPY } from './motion/easing';
import { useSectionNav } from '../hooks/useSectionNav';
import { useCopy } from '../hooks/useCopy';
import { useSound } from '../context/sound-context';
import { useTheme } from '../context/theme-context';
import { useLang, tr } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import styles from './CommandPalette.module.css';

const SECTIONS = [
  { id: 'home', label: 'Home', ko: '홈 처음' },
  { id: 'about', label: 'About', ko: '소개' },
  { id: 'skills', label: 'Skills', ko: '기술 스택' },
  { id: 'projects', label: 'Projects', ko: '프로젝트' },
  { id: 'experience', label: 'Experience', ko: '경력 활동 교육' },
  { id: 'contact', label: 'Contact', ko: '연락처' },
];

function PaletteDialog({ onClose }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const navigate = useNavigate();
  const goToSection = useSectionNav();
  const copy = useCopy();
  const { enabled: soundOn, toggle: toggleSound, play } = useSound();
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang } = useLang();
  const t = ui[lang];

  const items = useMemo(() => {
    const all = [
      ...SECTIONS.map((s) => ({
        key: `section-${s.id}`,
        group: t.paletteSections,
        label: s.label,
        keywords: s.ko,
        Icon: FiHash,
        run: () => goToSection(s.id),
      })),
      ...projects.map((p) => ({
        key: `project-${p.id}`,
        group: t.paletteProjects,
        label: p.title,
        keywords: tr(p.summary, lang),
        Icon: FiFolder,
        run: () => navigate(`/projects/${p.id}`),
      })),
      {
        key: 'theme',
        group: t.paletteActions,
        label: theme === 'dark' ? t.themeToLight : t.themeToDark,
        keywords: 'theme dark light 테마 다크 라이트',
        Icon: theme === 'dark' ? FiSun : FiMoon,
        run: () => toggleTheme(),
      },
      {
        key: 'lang',
        group: t.paletteActions,
        label: t.langToggle,
        keywords: 'language 언어 한국어 english',
        Icon: FiGlobe,
        run: toggleLang,
      },
      {
        key: 'sound',
        group: t.paletteActions,
        label: soundOn ? t.soundOn : t.soundOff,
        keywords: 'sound mute 사운드 소리',
        Icon: soundOn ? FiVolumeX : FiVolume2,
        run: toggleSound,
      },
      {
        key: 'copy-email',
        group: t.paletteActions,
        label: t.copyEmail,
        keywords: `email mail 메일 ${profile.email}`,
        Icon: FiCopy,
        run: () => copy(profile.email, t.copiedEmail),
      },
      {
        key: 'github',
        group: t.paletteActions,
        label: t.openGithub,
        keywords: 'github 깃허브 repo',
        Icon: FiGithub,
        run: () =>
          window.open(profile.links.github, '_blank', 'noopener,noreferrer'),
      },
    ];

    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((item) =>
      `${item.label} ${item.keywords}`.toLowerCase().includes(q)
    );
  }, [
    query,
    lang,
    t,
    theme,
    soundOn,
    goToSection,
    navigate,
    toggleTheme,
    toggleLang,
    toggleSound,
    copy,
  ]);

  // 열릴 때 입력창에 포커스, 닫히면 원래 위치로 되돌린다
  useEffect(() => {
    const previous = document.activeElement;
    inputRef.current?.focus();
    return () => {
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, []);

  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [active, items]);

  const execute = (item) => {
    if (!item) return;
    play('click');
    onClose();
    item.run();
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (items.length) setActive((i) => (i + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (items.length) setActive((i) => (i - 1 + items.length) % items.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execute(items[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Tab') {
      // 대화상자 안에는 입력창 하나뿐이므로 포커스를 가둔다
      e.preventDefault();
    }
  };

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={t.paletteOpen}
        initial={{ opacity: 0, scale: 0.95, y: -16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.12 } }}
        transition={{ type: 'spring', stiffness: 460, damping: 34 }}
      >
        <div className={styles.search}>
          <FiSearch size={18} aria-hidden="true" />
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={t.palettePlaceholder}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={
              items[active] ? `palette-${items[active].key}` : undefined
            }
            autoComplete="off"
            spellCheck="false"
          />
          <kbd className={styles.kbd}>Esc</kbd>
        </div>

        <ul
          id="palette-list"
          ref={listRef}
          className={styles.list}
          role="listbox"
          aria-label={t.paletteOpen}
        >
          {items.length === 0 && (
            <li className={styles.empty} role="presentation">
              {t.paletteEmpty}
            </li>
          )}
          {items.map((item, i) => {
            const showGroup = i === 0 || items[i - 1].group !== item.group;
            const { Icon } = item;
            return (
              <li key={item.key} role="presentation">
                {showGroup && (
                  <span className={styles.group}>{item.group}</span>
                )}
                <div
                  id={`palette-${item.key}`}
                  role="option"
                  aria-selected={i === active}
                  className={`${styles.option} ${i === active ? styles.optionActive : ''}`}
                  onPointerMove={() => setActive(i)}
                  onClick={() => execute(item)}
                >
                  {i === active && (
                    <motion.span
                      layoutId="palette-active"
                      className={styles.optionPill}
                      transition={SPRING_SNAPPY}
                    />
                  )}
                  <span className={styles.optionIcon} aria-hidden="true">
                    <Icon size={16} />
                  </span>
                  <span className={styles.optionLabel}>{item.label}</span>
                  {i === active && (
                    <FiCornerDownLeft
                      className={styles.optionEnter}
                      size={14}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.footer}>
          <span>
            <kbd className={styles.kbd}>↑↓</kbd> {t.paletteHintMove}
          </span>
          <span>
            <kbd className={styles.kbd}>Enter</kbd> {t.paletteHintRun}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Ctrl/⌘ + K 로 여는 빠른 이동 · 동작 팔레트 */
function CommandPalette({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && <PaletteDialog onClose={onClose} />}
    </AnimatePresence>
  );
}

export default CommandPalette;
