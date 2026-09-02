import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
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
          <p className={styles.intro}>{tr(profile.intro, lang)}</p>
          <ul className={styles.info}>
            {profile.info.map((item) => (
              <li key={tr(item.label, 'en')}>
                <span className={styles.label}>{tr(item.label, lang)}</span>
                <span className={styles.value}>{tr(item.value, lang)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default About;
