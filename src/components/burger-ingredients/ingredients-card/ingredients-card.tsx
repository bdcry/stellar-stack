import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import styles from './ingredients-card.module.css';

type TDragItem = {
  _id: string;
  type: string;
};

type IngredientsCardProps = {
  _id: string;
  type: string;
  image: string;
  name: string;
  price: number;
  onClick: () => void;
  count?: number;
};

const IngredientsCard = ({
  _id,
  type,
  image,
  name,
  price,
  onClick,
  count = 0,
}: IngredientsCardProps): React.JSX.Element => {
  const [{ isDrag }, dragRef] = useDrag<TDragItem, void, { isDrag: boolean }>({
    type: 'ingredient',
    item: { _id, type },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  return (
    <div
      className={styles.ingredients_card}
      onClick={onClick}
      ref={dragRef as unknown as React.Ref<HTMLDivElement>}
      style={{ opacity: isDrag ? 0.5 : 1 }}
    >
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.price}>
        <p>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className="text text_type_main-small">{name}</h3>
      <Counter count={count} />
    </div>
  );
};

export default IngredientsCard;
