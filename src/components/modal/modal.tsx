import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './modal.module.css';

const modalElement = document.getElementById('modal-root');

const Modal = (): React.JSX.Element => {
  // потральчик тоже тут зафигарим, чтобы не париться с z-индексами и дисплей нан/блок
  // ну тут будет короче лоигка закрытия/открытия модалки, которую я напишу завтра, тк сегодня я уже схожу с ума , вот такие вот дела. привет тому, кто будет это читать потом. если ты ученик - лучше не списывай, а учись, даже если сложно. за основу можешь использовать, там например подумать, как лучше сделать этот компонент и тп, но вот эти буковки пиши сам, а если ты ревьюер, то большой привет тебе и спасибо за проверку, йоу нигга.

  console.log(modalElement); // чтобы не ругался линтер на неиспользуемую переменную
  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <h2 className="text text_type_main-large">Modal Title</h2>
        <button onClick={() => console.log('ляляля, закрываем модалочку')}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <p>
        тут тело модалочки. принимаем данные из пропсов в виде детишек. в детишках
        данные: либо динамически получаем, например для ингредиента, либо статичные,
        например для оформления заказа
      </p>
    </div>
  );
};

export default Modal;
