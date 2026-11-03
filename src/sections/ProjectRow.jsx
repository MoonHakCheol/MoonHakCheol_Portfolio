import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import Tag from '../components/common/Tag';
import { useLang, tr } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import styles from './ProjectRow.module.css';

function ProjectRow({ project, index }) {
  const { id, title, summary, tags, links, period, role } = project;
  const { lang } = useLang();
  const t = ui[lang];
  const summaryText = tr(summary, lang);

  return (
    <article className={styles.row}>
      <span className={styles.index} aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className={styles.main}>
        <h3 className={styles.title}>
          {/* ::after 로 줄 전체를 클릭 영역으로 넓힌다 */}
          <Link to={`/projects/${id}`} className={styles.titleLink}>
            {title}
          </Link>
        </h3>
        <p
          className={`${styles.summary} ${summaryText ? '' : styles.pending}`}
        >
          {summaryText || t.summaryPending}
        </p>

        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Tag key={tr(tag, 'en')}>{tr(tag, lang)}</Tag>
            ))}
          </div>
        )}

        {(links.demo || links.github) && (
          <div className={styles.links}>
            {links.demo && (
              <a href={links.demo} target="_blank" rel="noopener noreferrer">
                <FiExternalLink /> Demo
              </a>
            )}
            {links.github && (
              <a href={links.github} target="_blank" rel="noopener noreferrer">
                <FiGithub /> GitHub
              </a>
            )}
          </div>
        )}
      </div>

      <div className={styles.meta}>
        <span>{tr(role, lang)}</span>
        <span>{tr(period, lang)}</span>
      </div>

      <FiArrowUpRight className={styles.arrow} size={22} aria-hidden="true" />
    </article>
  );
}

export default ProjectRow;
