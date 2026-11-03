import { useEffect, useRef, useState } from 'react';
import {
  FiCheck,
  FiCopy,
  FiEdit3,
  FiGithub,
  FiMail,
  FiPhone,
} from 'react-icons/fi';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import Reveal from '../components/motion/Reveal';
import { useCopy } from '../hooks/useCopy';
import { useSound } from '../context/sound-context';
import { useLang } from '../i18n/lang-context';
import { ui } from '../i18n/ui';
import { profile } from '../data/profile';
import styles from './Contact.module.css';

const COPIED_MS = 1800;

function CopyButton({ value, message, label }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(0);
  const copy = useCopy();
  const { play } = useSound();

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleClick = async () => {
    play('click');
    if (await copy(value, message)) {
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), COPIED_MS);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.copy} ${copied ? styles.copied : ''}`}
      onClick={handleClick}
      aria-label={`${label} ${value}`}
      title={label}
    >
      {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
    </button>
  );
}

function Contact() {
  const { lang } = useLang();
  const t = ui[lang];

  return (
    <section id="contact" className="section">
      <Container>
        <SectionTitle subtitle={t.contactSubtitle}>Contact</SectionTitle>
        <Reveal className={styles.card}>
          <p className={styles.lead}>{t.contactLead}</p>
          <ul className={styles.links}>
            <li className={styles.row}>
              <a href={`mailto:${profile.email}`} className={styles.link}>
                <FiMail size={20} />
                <span>{profile.email}</span>
              </a>
              <CopyButton
                value={profile.email}
                message={t.copiedEmail}
                label={t.copy}
              />
            </li>
            {profile.phone && (
              <li className={styles.row}>
                <a
                  href={`tel:${profile.phone.replace(/-/g, '')}`}
                  className={styles.link}
                >
                  <FiPhone size={20} />
                  <span>{profile.phone}</span>
                </a>
                <CopyButton
                  value={profile.phone}
                  message={t.copiedPhone}
                  label={t.copy}
                />
              </li>
            )}
            {profile.links.github && (
              <li className={styles.row}>
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
              <li className={styles.row}>
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
              <li className={styles.row}>
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
        </Reveal>
      </Container>
    </section>
  );
}

export default Contact;
