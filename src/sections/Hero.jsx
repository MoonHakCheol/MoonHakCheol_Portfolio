import { FiGithub, FiMail } from 'react-icons/fi';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { profile } from '../data/profile';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <Container className={styles.inner}>
        <p className={styles.greeting}>안녕하세요 👋</p>
        <h1 className={styles.name}>
          {profile.role}를 준비하는
          <br />
          <span className={styles.highlight}>{profile.name}</span>입니다
        </h1>
        <p className={styles.tagline}>{profile.tagline}</p>

        <div className={styles.actions}>
          <Button as="a" href="#projects">
            프로젝트 보기
          </Button>
          <Button
            as="a"
            variant="secondary"
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            이력서 다운로드
          </Button>
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
          <a href={`mailto:${profile.email}`} aria-label="이메일">
            <FiMail size={22} />
          </a>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
