import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './ingredients-card.module.css';

type IngredientsCardProps = {
  image: string;
  name: string;
  price: number;
  onClick: () => void;
  count?: number;
};

const IngredientsCard = ({
  image,
  name,
  price,
  onClick,
  count = 0,
}: IngredientsCardProps): React.JSX.Element => {
  return (
    <div className={styles.ingredients_card} onClick={onClick}>
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
