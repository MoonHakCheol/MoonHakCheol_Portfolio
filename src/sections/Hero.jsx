import { motion } from 'motion/react';
import { FiArrowDown, FiGithub, FiMail } from 'react-icons/fi';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { EASE_OUT } from '../components/motion/easing';
import { useSectionNav } from '../hooks/useSectionNav';
import { useLang, tr } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { profile } from '../data/profile';
import styles from './Hero.module.css';

// 위에서 아래로 차례로 나타나는 등장 애니메이션
const enter = (order) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.05 + order * 0.08, ease: EASE_OUT },
});

// 커서 주변의 점만 밝아지도록 위치를 CSS 변수로 넘긴다
function trackPointer(e) {
  if (e.pointerType === 'touch') return;
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--hx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--hy', `${e.clientY - rect.top}px`);
}

function Hero() {
  const { lang } = useLang();
  const goToSection = useSectionNav();
  const t = ui[lang];
  const name = tr(profile.name, lang);
  const role = tr(profile.role, lang);

  const highlighted = <span className={styles.highlight}>{name}</span>;
  const lines =
    lang === 'ko'
      ? [`${role}를 준비하는`, <>{highlighted}입니다</>]
      : [<>I&apos;m {highlighted},</>, `a ${role}`];

  const scrollTo = (e, id) => {
    e.preventDefault();
    goToSection(id);
  };

  return (
    <section id="home" className={styles.hero} onPointerMove={trackPointer}>
      <div className={styles.dots} aria-hidden="true" />
      <div className={styles.dotsGlow} aria-hidden="true" />

      <Container className={styles.inner}>
        <motion.p className={styles.greeting} {...enter(0)}>
          {t.heroGreeting}
        </motion.p>

        <h1 key={lang} className={styles.name}>
          {lines.map((line, i) => (
            <span key={i} className={styles.lineMask}>
              <motion.span
                className={styles.line}
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASE_OUT }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p className={styles.tagline} {...enter(3)}>
          {tr(profile.tagline, lang)}
        </motion.p>

        <motion.div className={styles.actions} {...enter(4)}>
          <Button
            as="a"
            href="/#projects"
            onClick={(e) => scrollTo(e, 'projects')}
          >
            {t.heroViewProjects}
          </Button>
          {profile.resumeReady ? (
            <Button
              as="a"
              variant="secondary"
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.heroDownloadResume}
            </Button>
          ) : (
            <Button
              as="button"
              variant="secondary"
              disabled
              title={t.heroResumePending}
            >
              {t.heroResumePending}
            </Button>
          )}
          <div className={styles.socials}>
            {profile.links.github && (
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <FiGithub size={20} />
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              title="Email"
            >
              <FiMail size={20} />
            </a>
          </div>
        </motion.div>
      </Container>

      <Container className={styles.cueWrap}>
        <a
          href="/#about"
          className={styles.cue}
          onClick={(e) => scrollTo(e, 'about')}
        >
          <FiArrowDown size={16} className={styles.cueIcon} aria-hidden="true" />
          {t.scrollCue}
        </a>
      </Container>
    </section>
  );
}

export default Hero;
