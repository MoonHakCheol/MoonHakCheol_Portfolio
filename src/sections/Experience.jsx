import { FiTool, FiDatabase, FiZap, FiServer } from 'react-icons/fi';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import { experience } from '../data/experience';
import styles from './Experience.module.css';

const ICONS = {
  tool: FiTool,
  database: FiDatabase,
  zap: FiZap,
  server: FiServer,
};

// **텍스트** 를 굵은 빨간색 강조로 변환한다.
function renderDescription(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className={styles.highlight}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function Experience() {
  return (
    <section id="experience" className="section">
      <Container>
        <SectionTitle subtitle="경력 · 활동 · 교육">Experience</SectionTitle>
        <ol className={styles.timeline}>
          {experience.map((item, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.period}>{item.period}</span>
              <div className={styles.content}>
                <h3 className={styles.title}>{item.title}</h3>
                {item.org && <p className={styles.org}>{item.org}</p>}

                {item.logos && item.logos.length > 0 && (
                  <div className={styles.logos}>
                    {item.logos.map((logo) => (
                      <img
                        key={logo.src}
                        src={logo.src}
                        alt={logo.alt}
                        className={styles.logo}
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}

                <p className={styles.desc}>
                  {renderDescription(item.description)}
                </p>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className={styles.highlights}>
                    {item.highlights.map((h) => {
                      const Icon = ICONS[h.icon];
                      return (
                        <li key={h.label} className={styles.highlightItem}>
                          {Icon && (
                            <span className={styles.hIcon} aria-hidden="true">
                              <Icon size={18} />
                            </span>
                          )}
                          <div>
                            <span className={styles.hLabel}>{h.label}</span>
                            <p className={styles.hDesc}>{h.desc}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {item.projects && item.projects.length > 0 && (
                  <div className={styles.projects}>
                    <span className={styles.projectsLabel}>진행 프로젝트</span>
                    <ul className={styles.projectList}>
                      {item.projects.map((p) => (
                        <li key={p.name} className={styles.projectItem}>
                          <div className={styles.pHead}>
                            <span className={styles.pName}>{p.name}</span>
                            <span className={styles.pPeriod}>{p.period}</span>
                          </div>
                          {p.desc && <p className={styles.pDesc}>{p.desc}</p>}
                          {p.role && <span className={styles.pRole}>{p.role}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export default Experience;
