import { motion } from 'motion/react';
import { FiChevronDown, FiGithub, FiMail } from 'react-icons/fi';
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
        <motion.h1 className={styles.name} {...enter(1)}>
          {lang === 'ko' ? (
            <>
              {role}를 준비하는
              <br />
              <span className={styles.highlight}>{name}</span>입니다
            </>
          ) : (
            <>
              I&apos;m <span className={styles.highlight}>{name}</span>,
              <br />a {role}
            </>
          )}
        </motion.h1>
        <motion.p className={styles.tagline} {...enter(2)}>
          {tr(profile.tagline, lang)}
        </motion.p>

        <motion.div className={styles.actions} {...enter(3)}>
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
        </motion.div>

        <motion.div className={styles.socials} {...enter(4)}>
          {profile.links.github && (
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub size={22} />
            </a>
          )}
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <FiMail size={22} />
          </a>
        </motion.div>
      </Container>

      <a
        href="/#about"
        className={styles.cue}
        aria-label={t.scrollCue}
        onClick={(e) => scrollTo(e, 'about')}
      >
        <FiChevronDown size={22} />
      </a>
    </section>
  );
}

export default Hero;
