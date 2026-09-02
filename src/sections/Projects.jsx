import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import ProjectCard from './ProjectCard';
import { useLang } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { projects } from '../data/projects';
import styles from './Projects.module.css';

function Projects() {
  const { lang } = useLang();
  const t = ui[lang];

  return (
    <section id="projects" className="section">
      <Container>
        <SectionTitle subtitle={t.projectsSubtitle}>Projects</SectionTitle>
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Projects;
