import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import { profile } from '../data/profile';
import styles from './About.module.css';

function About() {
  return (
    <section id="about" className="section">
      <Container>
        <SectionTitle subtitle="저를 소개합니다">About</SectionTitle>
        <div className={styles.grid}>
          <p className={styles.intro}>{profile.intro}</p>
          <ul className={styles.info}>
            {profile.info.map((item) => (
              <li key={item.label}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default About;
