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
  const problemText = tr(problem, lang);
  const learnedText = tr(learned, lang);

  return (
    <section className="section">
      <Container>
        <Link to="/#projects" className={styles.back}>
          <FiArrowLeft /> {t.detailBack}
        </Link>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.summary}>{tr(summary, lang)}</p>

        <div className={styles.tags}>
          {tags.length > 0 ? (
            tags.map((tag) => <Tag key={tr(tag, 'en')}>{tr(tag, lang)}</Tag>)
          ) : (
            <span className={styles.pending}>{t.techPending}</span>
          )}
        </div>

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
          {!links.demo && !links.github && (
            <span className={styles.pending}>{t.detailLinkPending}</span>
          )}
        </div>

        <dl className={styles.meta}>
          {period && (
            <div>
              <dt>{t.detailDuration}</dt>
              <dd>{tr(period, lang)}</dd>
            </div>
          )}
          {role && (
            <div>
              <dt>{t.detailRole}</dt>
              <dd>{tr(role, lang)}</dd>
            </div>
          )}
          <div>
            <dt>{t.detailProblem}</dt>
            <dd className={problemText ? '' : styles.pendingText}>
              {problemText || t.detailComingSoon}
            </dd>
          </div>
          <div>
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
