import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ConstructorBun from './constructor-bun/constructor-bun';
import ConstructorFillings from './constructor-fillings/constructor-fillings';
import ConstructorOrderButton from './constructor-order-button/constructor-order-button';
import ConstructorPlaceholder from './constructor-placeholder/constructor-placeholder';
import ConstructorPriceDisplay from './constructor-price-display/constructor-price-display';
import { useConstructorLogic } from './hooks/useConstructorLogic';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const {
    bun,
    fillings,
    total,
    isOrderModalOpen,
    handleOpenModal,
    handleCloseModal,
    dropRefTopBun,
    isHoverBunTop,
    dropRefBottomBun,
    isHoverBunBottom,
    dropRefFillings,
    isHoverFilling,
  } = useConstructorLogic();

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.constructor_list}>
        {!bun ? (
          <div
            ref={dropRefTopBun as unknown as React.Ref<HTMLDivElement>}
            style={{
              border: isHoverBunTop ? '1px solid #4c4cff' : 'none',
            }}
          >
            <ConstructorPlaceholder text="Выберите булки" position="top" />
          </div>
        ) : (
          <div
            ref={dropRefTopBun as unknown as React.Ref<HTMLDivElement>}
            style={{
              border: isHoverBunTop ? '1px solid #4c4cff' : 'none',
            }}
          >
            <ConstructorBun position="top" bun={bun} />
          </div>
        )}
        <div
          className={styles.scroll_area}
          ref={dropRefFillings as unknown as React.Ref<HTMLDivElement>}
          style={{ border: isHoverFilling ? '1px solid #4c4cff' : 'none' }}
        >
          {fillings.length === 0 ? (
            <ConstructorPlaceholder text="Выберите начинку" />
          ) : (
            <ConstructorFillings fillings={fillings} />
          )}
        </div>
        {!bun ? (
          <div
            ref={dropRefBottomBun as unknown as React.Ref<HTMLDivElement>}
            style={{
              border: isHoverBunBottom ? '1px solid #4c4cff' : 'none',
            }}
          >
            <ConstructorPlaceholder text="Выберите булки" position="bottom" />
          </div>
        ) : (
          <div
            ref={dropRefBottomBun as unknown as React.Ref<HTMLDivElement>}
            style={{
              border: isHoverBunBottom ? '1px solid #4c4cff' : 'none',
            }}
          >
            <ConstructorBun position="bottom" bun={bun} />
          </div>
        )}
      </div>

      <div className={`${styles.price_bar} mt-10`}>
        <ConstructorPriceDisplay total={total} />
        <ConstructorOrderButton
          onOpen={handleOpenModal}
          disabled={!bun || fillings.length === 0}
        />
      </div>

      {isOrderModalOpen && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
