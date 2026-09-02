import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import Tag from '../components/common/Tag';
import { useLang, tr } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import styles from './ProjectCard.module.css';

function ProjectCard({ project }) {
  const { id, title, summary, thumbnail, tags, links } = project;
  const { lang } = useLang();
  const t = ui[lang];

  return (
    <article className={styles.card}>
      <Link to={`/projects/${id}`} className={styles.thumb}>
        {thumbnail ? (
          <img src={thumbnail} alt={`${title} 미리보기`} loading="lazy" />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            {title}
          </div>
        )}
      </Link>

      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link to={`/projects/${id}`} className={styles.titleLink}>
            {title}
          </Link>
        </h3>
        <p className={styles.summary}>{tr(summary, lang)}</p>

        <div className={styles.tags}>
          {tags.length > 0 ? (
            tags.map((tag) => <Tag key={tr(tag, 'en')}>{tr(tag, lang)}</Tag>)
          ) : (
            <span className={styles.pending}>{t.techPending}</span>
          )}
        </div>

        <div className={styles.links}>
          <Link to={`/projects/${id}`} className={styles.link}>
            {t.cardDetails} <FiArrowRight />
          </Link>
          {!links.demo && !links.github && (
            <span className={styles.pending}>{t.linkPending}</span>
          )}
          {links.demo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <FiExternalLink /> Demo
            </a>
          )}
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <FiGithub /> GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
