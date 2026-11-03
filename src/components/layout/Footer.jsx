import Container from '../common/Container';
import { useLang, tr } from '../../i18n/lang-context';
import { ui } from '../../i18n/ui';
import { profile } from '../../data/profile';
import styles from './Footer.module.css';

function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className={`inverted ${styles.footer}`}>
      <Container className={styles.inner}>
        <p>
          © {year} {tr(profile.name, lang)}. All rights reserved.
        </p>
        <p className={styles.tip}>{ui[lang].footerTip}</p>
      </Container>
    </footer>
  );
}

export default Footer;
