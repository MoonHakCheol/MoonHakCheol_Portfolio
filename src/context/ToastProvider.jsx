import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FiCheck } from 'react-icons/fi';
import { ToastContext } from './toast-context';
import styles from './ToastProvider.module.css';

const DURATION = 2200;

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(0);

  const show = useCallback((message) => {
    clearTimeout(timerRef.current);
    setToast({ id: Date.now(), message });
    timerRef.current = setTimeout(() => setToast(null), DURATION);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.region} role="status" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {toast && (
            <motion.div
              key={toast.id}
              className={styles.toast}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            >
              <FiCheck size={16} aria-hidden="true" />
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
