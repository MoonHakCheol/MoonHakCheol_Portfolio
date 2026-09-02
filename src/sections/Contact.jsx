import { FiGithub, FiMail, FiEdit3, FiPhone } from 'react-icons/fi';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import { useLang } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { profile } from '../data/profile';
import styles from './Contact.module.css';

function Contact() {
  const { lang } = useLang();
  const t = ui[lang];

  return (
    <section id="contact" className="section">
      <Container>
        <SectionTitle subtitle={t.contactSubtitle}>Contact</SectionTitle>
        <div className={styles.card}>
          <p className={styles.lead}>{t.contactLead}</p>
          <ul className={styles.links}>
            <li>
              <a href={`mailto:${profile.email}`} className={styles.link}>
                <FiMail size={20} />
                <span>{profile.email}</span>
              </a>
            </li>
            {profile.phone && (
              <li>
                <a
                  href={`tel:${profile.phone.replace(/-/g, '')}`}
                  className={styles.link}
                >
                  <FiPhone size={20} />
                  <span>{profile.phone}</span>
                </a>
              </li>
            )}
            {profile.links.github && (
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <FiGithub size={20} />
                  <span>GitHub</span>
                </a>
              </li>
            )}
            {profile.links.blog ? (
              <li>
                <a
                  href={profile.links.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <FiEdit3 size={20} />
                  <span>Blog</span>
                </a>
              </li>
            ) : (
              <li>
                <span
                  className={`${styles.link} ${styles.pending}`}
                  aria-disabled="true"
                  title={t.blogPending}
                >
                  <FiEdit3 size={20} />
                  <span>{t.blogPending}</span>
                </span>
              </li>
            )}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default Contact;
