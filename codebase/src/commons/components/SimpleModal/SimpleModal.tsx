import styles from './SimpleModal.module.scss';
import { useState, useLayoutEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ReactPortalProps {
  children: ReactNode,
  id: string,
}

const ReactPortal = ({ children, id }: ReactPortalProps) => {
  const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let el = document.getElementById(id);

    if (!el) {
      el = document.createElement('div');
      el.setAttribute('id', id);
      document.body.appendChild(el);
    }

    setContainerEl(el);
  
    return () => {
      el.parentElement?.removeChild(el);
    }
  }, [id]);

  if (containerEl) {
    return createPortal(children, containerEl);
  }

  return null;
};

interface SimpleModal {
  isOpen: boolean,
  onClose: () => void,
  children: ReactNode,
}

export const SimpleModal = ({ isOpen, onClose, children }: SimpleModal) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ReactPortal id='simpleModal'>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <button onClick={onClose} className={styles.closeButton}>
            Close
          </button>
          {children}
        </div>
      </div>
    </ReactPortal>
  );
};
