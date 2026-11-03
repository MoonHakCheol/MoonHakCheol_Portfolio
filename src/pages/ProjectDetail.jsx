import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi';
import Container from '../components/common/Container';
import Tag from '../components/common/Tag';
import { useLang, tr } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { projects } from '../data/projects';
import styles from './ProjectDetail.module.css';

function ProjectDetail() {
  const { id } = useParams();
  const { lang } = useLang();
  const t = ui[lang];
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section className="section">
        <Container>
          <p className={styles.notFound}>{t.detailNotFound}</p>
          <Link to="/#projects" className={styles.back}>
            <FiArrowLeft /> {t.detailBack}
          </Link>
        </Container>
      </section>
    );
  }

  const { title, summary, tags, links, period, role, problem, learned } =
    project;
  const summaryText = tr(summary, lang);
  const problemText = tr(problem, lang);
  const learnedText = tr(learned, lang);

  return (
    <section className="section">
      <Container>
        <Link to="/#projects" className={styles.back}>
          <FiArrowLeft /> {t.detailBack}
        </Link>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.summary}>{summaryText || t.summaryPending}</p>

        {(links.demo || links.github) && (
          <div className={styles.links}>
            {links.demo && (
              <a href={links.demo} target="_blank" rel="noopener noreferrer">
                <FiExternalLink /> Live Demo
              </a>
            )}
            {links.github && (
              <a href={links.github} target="_blank" rel="noopener noreferrer">
                <FiGithub /> GitHub
              </a>
            )}
          </div>
        )}

        <dl className={styles.meta}>
          {period && (
            <div className={styles.row}>
              <dt>{t.detailDuration}</dt>
              <dd>{tr(period, lang)}</dd>
            </div>
          )}
          {role && (
            <div className={styles.row}>
              <dt>{t.detailRole}</dt>
              <dd>{tr(role, lang)}</dd>
            </div>
          )}
          <div className={styles.row}>
            <dt>{t.detailTech}</dt>
            <dd>
              {tags.length > 0 ? (
                <div className={styles.tags}>
                  {tags.map((tag) => (
                    <Tag key={tr(tag, 'en')}>{tr(tag, lang)}</Tag>
                  ))}
                </div>
              ) : (
                <span className={styles.pendingText}>{t.techPending}</span>
              )}
            </dd>
          </div>
          <div className={styles.row}>
            <dt>{t.detailProblem}</dt>
            <dd className={problemText ? '' : styles.pendingText}>
              {problemText || t.detailComingSoon}
            </dd>
          </div>
          <div className={styles.row}>
            <dt>{t.detailLearned}</dt>
            <dd className={learnedText ? '' : styles.pendingText}>
              {learnedText || t.detailComingSoon}
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}

export default ProjectDetail;
