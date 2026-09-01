import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';
import styles from './Projects.module.css';

function Projects() {
  return (
    <section id="projects" className="section">
      <Container>
        <SectionTitle subtitle="직접 만든 결과물">Projects</SectionTitle>
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
