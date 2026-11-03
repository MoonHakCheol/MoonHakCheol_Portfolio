import { useEffect, useRef, useState } from 'react';
import {
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiEdit3,
  FiGithub,
  FiMail,
  FiPhone,
} from 'react-icons/fi';
import Section from '../components/common/Section';
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
    <Section
      id="contact"
      index="05"
      title="Contact"
      subtitle={t.contactSubtitle}
      inverted
    >
      <Reveal>
        <p className={styles.lead}>{t.contactLead}</p>
        <ul className={styles.list}>
          <li className={styles.row}>
            <a href={`mailto:${profile.email}`} className={styles.link}>
              <FiMail size={20} aria-hidden="true" />
              <span className={styles.value}>{profile.email}</span>
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
                <FiPhone size={20} aria-hidden="true" />
                <span className={styles.value}>{profile.phone}</span>
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
                <FiGithub size={20} aria-hidden="true" />
                <span className={styles.value}>GitHub</span>
              </a>
              <FiArrowUpRight
                className={styles.external}
                size={18}
                aria-hidden="true"
              />
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
                <FiEdit3 size={20} aria-hidden="true" />
                <span className={styles.value}>Blog</span>
              </a>
              <FiArrowUpRight
                className={styles.external}
                size={18}
                aria-hidden="true"
              />
            </li>
          ) : (
            <li className={styles.row}>
              <span
                className={`${styles.link} ${styles.pending}`}
                aria-disabled="true"
              >
                <FiEdit3 size={20} aria-hidden="true" />
                <span className={styles.value}>{t.blogPending}</span>
              </span>
            </li>
          )}
        </ul>
      </Reveal>
    </Section>
  );
}

export default Contact;
