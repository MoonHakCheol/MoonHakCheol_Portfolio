import Container from './Container';
import Reveal from '../motion/Reveal';
import styles from './Section.module.css';

/**
 * 페이지 공통 섹션 틀.
 * 데스크톱은 왼쪽에 제목(스크롤 시 고정), 오른쪽에 내용. 모바일은 위아래로 쌓인다.
 */
function Section({ id, index, title, subtitle, inverted = false, children }) {
  return (
    <section
      id={id}
      className={`${styles.section} ${inverted ? 'inverted' : ''}`}
    >
      <Container className={styles.grid}>
        <Reveal className={styles.head}>
          <span className={styles.index} aria-hidden="true">
            {index}
          </span>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </Reveal>
        <div className={styles.body}>{children}</div>
      </Container>
    </section>
  );
}

export default Section;
