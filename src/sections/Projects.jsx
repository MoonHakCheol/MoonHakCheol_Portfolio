import Section from '../components/common/Section';
import Reveal from '../components/motion/Reveal';
import ProjectRow from './ProjectRow';
import { useLang } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { projects } from '../data/projects';
import styles from './Projects.module.css';

function Projects() {
  const { lang } = useLang();
  const t = ui[lang];

  return (
    <Section
      id="projects"
      index="03"
      title="Projects"
      subtitle={t.projectsSubtitle}
    >
      <div className={styles.list}>
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.06}>
            <ProjectRow project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Projects;
