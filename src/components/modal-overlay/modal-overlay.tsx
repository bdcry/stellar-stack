import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClose }: { onClose: () => void }): React.JSX.Element => {
  return (
    <div
      className={styles.modal_overlay}
      onClick={onClose}
      data-cy="modal-overlay"
    ></div>
  );
};

export default ModalOverlay;
