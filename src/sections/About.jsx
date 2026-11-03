import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import Reveal from '../components/motion/Reveal';
import { useLang, tr } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { profile } from '../data/profile';
import styles from './About.module.css';

function About() {
  const { lang } = useLang();
  const t = ui[lang];

  return (
    <section id="about" className="section">
      <Container>
        <SectionTitle subtitle={t.aboutSubtitle}>About</SectionTitle>
        <div className={styles.grid}>
          <Reveal as="p" className={styles.intro}>
            {tr(profile.intro, lang)}
          </Reveal>
          <ul className={styles.info}>
            {profile.info.map((item, i) => (
              <Reveal as="li" key={tr(item.label, 'en')} delay={0.1 + i * 0.08}>
                <span className={styles.label}>{tr(item.label, lang)}</span>
                <span className={styles.value}>{tr(item.value, lang)}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default About;
