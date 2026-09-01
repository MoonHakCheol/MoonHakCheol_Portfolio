import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import Tag from '../components/common/Tag';
import { skills } from '../data/skills';
import styles from './Skills.module.css';

function Skills() {
  return (
    <section id="skills" className="section">
      <Container>
        <SectionTitle subtitle="사용할 수 있는 기술">Skills</SectionTitle>
        <div className={styles.grid}>
          {skills.map((group) => (
            <div key={group.category} className={styles.group}>
              <h3 className={styles.category}>{group.category}</h3>
              <div className={styles.tags}>
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
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
