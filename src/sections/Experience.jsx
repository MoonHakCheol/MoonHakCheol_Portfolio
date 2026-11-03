import { useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { FiChevronDown, FiGlobe, FiServer, FiZap } from 'react-icons/fi';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import Reveal from '../components/motion/Reveal';
import { EASE_OUT } from '../components/motion/easing';
import { useSound } from '../context/sound-context';
import { useLang, tr } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { experience } from '../data/experience';
import styles from './Experience.module.css';

const ICONS = {
  globe: FiGlobe,
  zap: FiZap,
  server: FiServer,
};

// **텍스트** 를 굵은 빨간색 강조로 변환한다.
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
      <div className={styles.content}>
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

              {item.highlights && item.highlights.length > 0 && (
                <ul className={styles.highlights}>
                  {item.highlights.map((h) => {
                    const Icon = ICONS[h.icon];
                    return (
                      <li
                        key={tr(h.label, 'en')}
                        className={`spotlight ${styles.highlightItem}`}
                      >
                        {Icon && (
                          <span className={styles.hIcon} aria-hidden="true">
                            <Icon size={18} />
                          </span>
                        )}
                        <div>
                          <span className={styles.hLabel}>
                            {tr(h.label, lang)}
                          </span>
                          <p className={styles.hDesc}>{tr(h.desc, lang)}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {item.projects && item.projects.length > 0 && (
                <div className={styles.projects}>
                  <span className={styles.projectsLabel}>{t.expProjects}</span>
                  <ul className={styles.projectList}>
                    {item.projects.map((p) => (
                      <li
                        key={p.name}
                        className={`spotlight ${styles.projectItem}`}
                      >
                        <div className={styles.pHead}>
                          <span className={styles.pName}>{p.name}</span>
                          <span className={styles.pPeriod}>
                            {tr(p.period, lang)}
                          </span>
                        </div>
                        {p.desc && (
                          <p className={styles.pDesc}>{tr(p.desc, lang)}</p>
                        )}
                        {p.role && (
                          <span className={styles.pRole}>
                            {tr(p.role, lang)}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function Experience() {
  const wrapRef = useRef(null);
  const { lang } = useLang();
  const t = ui[lang];
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start 0.8', 'end 0.7'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="section">
      <Container>
        <SectionTitle subtitle={t.experienceSubtitle}>Experience</SectionTitle>
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
      </Container>
    </section>
  );
}

export default Experience;
