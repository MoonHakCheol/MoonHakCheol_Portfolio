import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import Section from '../components/common/Section';
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

  const handleFilter = (e, id) => {
    play('click');
    setFilter(id);
    // 모바일 가로 스크롤 목록에서 누른 항목이 가운데로 오게 한다
    const button = e.currentTarget;
    const list = button.parentElement;
    list.scrollTo({
      left: button.offsetLeft - (list.clientWidth - button.offsetWidth) / 2,
    });
  };

  return (
    <Section id="skills" index="02" title="Skills" subtitle={t.skillsSubtitle}>
      <Reveal className={styles.filters}>
        <LayoutGroup id="skills-filter">
          {filters.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`${styles.filter} ${filter === id ? styles.filterActive : ''}`}
              aria-pressed={filter === id}
              onClick={(e) => handleFilter(e, id)}
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

      <Reveal className={styles.list}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((group) => (
            <motion.div
              key={tr(group.category, 'en')}
              layout="position"
              className={styles.row}
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
    </Section>
  );
}

export default Skills;
