import Container from '../common/Container';
import { profile } from '../../data/profile';
import styles from './Footer.module.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <Container>
        <p className={styles.text}>
          © {year} {profile.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
