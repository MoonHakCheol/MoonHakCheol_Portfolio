import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import Reveal from '../components/motion/Reveal';
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
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={i * 0.08}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={styles.cell}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Projects;
