import { useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { FiArrowUpRight, FiChevronDown } from 'react-icons/fi';
import Section from '../components/common/Section';
import Reveal from '../components/motion/Reveal';
import { EASE_OUT } from '../components/motion/easing';
import { useSound } from '../context/sound-context';
import { useLang, tr } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { experience } from '../data/experience';
import styles from './Experience.module.css';

// **텍스트** 를 포인트 컬러 강조로 변환한다.
function renderDescription(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className={styles.highlight}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function TimelineItem({ item }) {
  const [open, setOpen] = useState(true);
  const bodyId = useId();
  const { play } = useSound();
  const { lang } = useLang();
  const t = ui[lang];

  const handleToggle = () => {
    play('click');
    setOpen((v) => !v);
  };

  return (
    <Reveal as="li" className={styles.item}>
      <span className={styles.period}>{tr(item.period, lang)}</span>
      <h3 className={styles.title}>
        <button
          type="button"
          className={styles.toggle}
          onClick={handleToggle}
          aria-expanded={open}
          aria-controls={bodyId}
          title={open ? t.expCollapse : t.expExpand}
        >
          {tr(item.title, lang)}
          <motion.span
            className={styles.chevron}
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            aria-hidden="true"
          >
            <FiChevronDown size={18} />
          </motion.span>
        </button>
      </h3>
      {item.org && <p className={styles.org}>{tr(item.org, lang)}</p>}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={bodyId}
            className={styles.collapse}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            {item.logos && item.logos.length > 0 && (
              <div className={styles.logos}>
                {item.logos.map((logo) => (
                  <img
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    className={styles.logo}
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            <p className={styles.desc}>
              {renderDescription(tr(item.description, lang))}
            </p>

            {item.link && (
              <a
                className={styles.link}
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tr(item.link.label, lang)}
                <FiArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}

            {item.highlights && item.highlights.length > 0 && (
              <ul className={styles.rows}>
                {item.highlights.map((h) => (
                  <li key={tr(h.label, 'en')} className={styles.row}>
                    <span className={styles.rowLabel}>{tr(h.label, lang)}</span>
                    <p className={styles.rowText}>{tr(h.desc, lang)}</p>
                  </li>
                ))}
              </ul>
            )}

            {item.projects && item.projects.length > 0 && (
              <>
                <span className={styles.groupLabel}>{t.expProjects}</span>
                <ul className={styles.rows}>
                  {item.projects.map((p) => (
                    <li key={p.name} className={styles.row}>
                      <span className={styles.rowLabel}>{p.name}</span>
                      <div>
                        {p.desc && (
                          <p className={styles.rowText}>{tr(p.desc, lang)}</p>
                        )}
                        <p className={styles.rowMeta}>
                          {tr(p.role, lang)} · {tr(p.period, lang)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

function Experience() {
  const wrapRef = useRef(null);
  const { lang } = useLang();
  const t = ui[lang];
  // 최신순 목록이라 시간은 아래에서 위로 흐른다. 선도 아래(과거)에서 위(현재)로 채우고,
  // 맨 위 항목에 닿는 순간이 화면 안에서 보이도록 목록 위쪽 기준으로 진행률을 잡는다.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start 1', 'start 0.2'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section
      id="experience"
      index="04"
      title="Experience"
      subtitle={t.experienceSubtitle}
    >
      <div ref={wrapRef} className={styles.wrap}>
        <ol className={styles.timeline}>
          {experience.map((item) => (
            <TimelineItem key={tr(item.title, 'en')} item={item} />
          ))}
        </ol>
        <motion.span
          className={styles.rail}
          style={{ scaleY }}
          aria-hidden="true"
        />
      </div>
    </Section>
  );
}

export default Experience;
