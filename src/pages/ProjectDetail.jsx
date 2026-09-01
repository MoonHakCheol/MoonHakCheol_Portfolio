import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi';
import Container from '../components/common/Container';
import Tag from '../components/common/Tag';
import { projects } from '../data/projects';
import styles from './ProjectDetail.module.css';

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section className="section">
        <Container>
          <p className={styles.notFound}>프로젝트를 찾을 수 없습니다.</p>
          <Link to="/#projects" className={styles.back}>
            <FiArrowLeft /> 목록으로
          </Link>
        </Container>
      </section>
    );
  }

  const { title, summary, tags, links, period, role, problem, learned } =
    project;

  return (
    <section className="section">
      <Container>
        <Link to="/#projects" className={styles.back}>
          <FiArrowLeft /> 목록으로
        </Link>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.summary}>{summary}</p>

        <div className={styles.tags}>
          {tags.length > 0 ? (
            tags.map((t) => <Tag key={t}>{t}</Tag>)
          ) : (
            <span className={styles.pending}>기술 스택 준비 중</span>
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
            <span className={styles.pending}>데모 · 저장소 링크 준비 중</span>
          )}
        </div>

        <dl className={styles.meta}>
          {period && (
            <div>
              <dt>기간 / 인원</dt>
              <dd>{period}</dd>
            </div>
          )}
          {role && (
            <div>
              <dt>역할</dt>
              <dd>{role}</dd>
            </div>
          )}
          <div>
            <dt>문제와 해결</dt>
            <dd className={problem ? '' : styles.pendingText}>
              {problem || '내용을 채울 예정입니다.'}
            </dd>
          </div>
          <div>
            <dt>배운 점</dt>
            <dd className={learned ? '' : styles.pendingText}>
              {learned || '내용을 채울 예정입니다.'}
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}

export default ProjectDetail;
