import { useEffect, useId, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
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

            {item.links && item.links.length > 0 && (
              <div className={styles.links}>
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    className={styles.link}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tr(link.label, lang)}
                    <FiArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
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
  const reduceMotion = useReducedMotion();

  // 목록이 보이기 시작하면 선이 아래에서 위로 저절로 채워진다.
  const entered = useInView(wrapRef, {
    once: true,
    margin: '0px 0px -40% 0px',
  });
  const fill = useMotionValue(0);

  useEffect(() => {
    if (!entered) return undefined;
    if (reduceMotion) {
      fill.set(1);
      return undefined;
    }
    const controls = animate(fill, 1, { duration: 1.2, ease: EASE_OUT });
    return () => controls.stop();
  }, [entered, reduceMotion, fill]);

  // 스크롤을 내리면 파란 구간의 위쪽 끝이 화면에서 같이 내려간다.
  // 시작(150px)보다 끝(420px)을 아래에 둬야 끝점이 화면에서 아래로 움직인다.
  // 간격은 항목을 모두 접은 목록 높이보다 작아야 방향이 뒤집히지 않는다.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start 150px', 'end 420px'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });
  const scaleY = useTransform([fill, progress], ([f, p]) =>
    Math.max(0, Math.min(f, 1 - p)),
  );

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
