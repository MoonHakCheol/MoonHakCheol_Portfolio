import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import Tag from '../components/common/Tag';
import Reveal from '../components/motion/Reveal';
import { SPRING_SNAPPY } from '../components/motion/easing';
import { useSound } from '../context/sound-context';
import { useLang, tr } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { skills } from '../data/skills';
import styles from './Skills.module.css';

const ALL = 'all';

function Skills() {
  const [filter, setFilter] = useState(ALL);
  const { play } = useSound();
  const { lang } = useLang();
  const t = ui[lang];

  const filters = [
    { id: ALL, label: t.skillsAll },
    ...skills.map((group) => ({
      id: tr(group.category, 'en'),
      label: tr(group.category, lang),
    })),
  ];
  const visible =
    filter === ALL
      ? skills
      : skills.filter((group) => tr(group.category, 'en') === filter);

  const handleFilter = (id) => {
    play('click');
    setFilter(id);
  };

  return (
    <section id="skills" className="section">
      <Container>
        <SectionTitle subtitle={t.skillsSubtitle}>Skills</SectionTitle>

        <Reveal className={styles.filters}>
          <LayoutGroup id="skills-filter">
            {filters.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`${styles.filter} ${filter === id ? styles.filterActive : ''}`}
                aria-pressed={filter === id}
                onClick={() => handleFilter(id)}
              >
                {filter === id && (
                  <motion.span
                    layoutId="skills-filter-pill"
                    className={styles.filterPill}
                    transition={SPRING_SNAPPY}
                  />
                )}
                <span className={styles.filterLabel}>{label}</span>
              </button>
            ))}
          </LayoutGroup>
        </Reveal>

        <Reveal className={styles.grid}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((group) => (
              <motion.div
                key={tr(group.category, 'en')}
                layout="position"
                className={`spotlight ${styles.group}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className={styles.category}>{tr(group.category, lang)}</h3>
                <div className={styles.tags}>
                  {group.items.map((item) => (
                    <Tag key={tr(item, 'en')}>{tr(item, lang)}</Tag>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </Reveal>
      </Container>
    </section>
  );
}

export default Skills;
