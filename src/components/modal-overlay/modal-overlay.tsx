import styles from './modal-overlay.module.css';

const ModalOverlay = (): React.JSX.Element => {
  return (
    <div className={styles.modal_overlay}>
      Компонент - лошара. Просто фончик фигарит красивенький. И отрабатывает на
      закрытие/открытие основной модалки с данными. Получается, что уже не лошара, а
      красавчик в виде компонента. Важный такой, деловой.
    </div>
  );
};

export default ModalOverlay;
