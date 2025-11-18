import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClose }: { onClose: () => void }): React.JSX.Element => {
  return <div className={styles.modal_overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
