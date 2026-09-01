import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import Tag from '../components/common/Tag';
import styles from './ProjectCard.module.css';

function ProjectCard({ project }) {
  const { id, title, summary, thumbnail, tags, links } = project;

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
        <p className={styles.summary}>{summary}</p>

        <div className={styles.tags}>
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className={styles.links}>
          <Link to={`/projects/${id}`} className={styles.link}>
            자세히 <FiArrowRight />
          </Link>
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
