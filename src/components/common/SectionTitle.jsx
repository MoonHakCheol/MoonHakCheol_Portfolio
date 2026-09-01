import styles from './SectionTitle.module.css';

function SectionTitle({ children, subtitle }) {
  return (
    <header className={styles.wrap}>
      <h2 className={styles.title}>{children}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}

export default SectionTitle;
