import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalElement = document.getElementById('modals-root');

type TModalProps = {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
};

const Modal = ({ children, title, onClose }: TModalProps): React.JSX.Element => {
  useEffect(() => {
    const handleEscClose = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return (): void => {
      document.removeEventListener('keydown', handleEscClose);
    };
  });

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <div className={title ? styles.header : styles.header_no_title}>
          {title && <h2 className="text text_type_main-large">{title}</h2>}
          <button className={styles.btn} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </>,
    modalElement as HTMLDivElement
  );
};

export default Modal;
