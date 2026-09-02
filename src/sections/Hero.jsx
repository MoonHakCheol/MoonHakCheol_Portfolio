import { FiGithub, FiMail } from 'react-icons/fi';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useLang, tr } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { profile } from '../data/profile';
import styles from './Hero.module.css';

function Hero() {
  const { lang } = useLang();
  const t = ui[lang];
  const name = tr(profile.name, lang);
  const role = tr(profile.role, lang);

  return (
    <section id="home" className={styles.hero}>
      <Container className={styles.inner}>
        <p className={styles.greeting}>{t.heroGreeting}</p>
        <h1 className={styles.name}>
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
        </h1>
        <p className={styles.tagline}>{tr(profile.tagline, lang)}</p>

        <div className={styles.actions}>
          <Button as="a" href="#projects">
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
        </div>

        <div className={styles.socials}>
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
        </div>
      </Container>
    </section>
  );
}

export default Hero;
