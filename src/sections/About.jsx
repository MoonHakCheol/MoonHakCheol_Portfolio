import Section from '../components/common/Section';
import Reveal from '../components/motion/Reveal';
import { useLang, tr } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { profile } from '../data/profile';
import styles from './About.module.css';

function About() {
  const { lang } = useLang();
  const t = ui[lang];

  return (
    <Section id="about" index="01" title="About" subtitle={t.aboutSubtitle}>
      <Reveal as="p" className={styles.intro}>
        {tr(profile.intro, lang)}
      </Reveal>
      <ul className={styles.info}>
        {profile.info.map((item, i) => (
          <Reveal
            as="li"
            key={tr(item.label, 'en')}
            delay={0.08 + i * 0.06}
            className={styles.row}
          >
            <span className={styles.label}>{tr(item.label, lang)}</span>
            <span>{tr(item.value, lang)}</span>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export default About;
