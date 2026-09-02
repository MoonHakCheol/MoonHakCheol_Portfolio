import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import Tag from '../components/common/Tag';
import { useLang, tr } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { skills } from '../data/skills';
import styles from './Skills.module.css';

function Skills() {
  const { lang } = useLang();
  const t = ui[lang];

  return (
    <section id="skills" className="section">
      <Container>
        <SectionTitle subtitle={t.skillsSubtitle}>Skills</SectionTitle>
        <div className={styles.grid}>
          {skills.map((group) => (
            <div key={tr(group.category, 'en')} className={styles.group}>
              <h3 className={styles.category}>{tr(group.category, lang)}</h3>
              <div className={styles.tags}>
                {group.items.map((item) => (
                  <Tag key={tr(item, 'en')}>{tr(item, lang)}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Skills;
