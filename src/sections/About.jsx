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
      <Reveal as="p" className={styles.lead}>
        {tr(profile.about.lead, lang)}
      </Reveal>
      <Reveal as="p" className={styles.story} delay={0.06}>
        {tr(profile.about.story, lang)}
      </Reveal>

      <ul className={styles.focus}>
        {profile.about.focus.map((item, i) => (
          <Reveal
            as="li"
            key={tr(item.label, 'en')}
            delay={0.1 + i * 0.06}
            className={styles.item}
          >
            <h3 className={styles.label}>{tr(item.label, lang)}</h3>
            <p className={styles.desc}>{tr(item.desc, lang)}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export default About;
