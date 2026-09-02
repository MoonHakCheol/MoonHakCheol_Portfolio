import Container from '../common/Container';
import { useLang, tr } from '../../i18n/lang-context';
import { profile } from '../../data/profile';
import styles from './Footer.module.css';

function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <Container>
        <p className={styles.text}>
          © {year} {tr(profile.name, lang)}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
