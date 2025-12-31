import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';

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
  count?: number;
};

const IngredientsCard = ({
  _id,
  type,
  image,
  name,
  price,
  count = 0,
}: IngredientsCardProps): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const [{ isDrag }, dragRef] = useDrag<TDragItem, void, { isDrag: boolean }>({
    type: 'ingredient',
    item: { _id, type },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const handleClick = (): void => {
    void navigate(`/ingredients/${_id}`, { state: { background: location } });
  };

  return (
    <div
      className={styles.ingredients_card}
      onClick={handleClick}
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
