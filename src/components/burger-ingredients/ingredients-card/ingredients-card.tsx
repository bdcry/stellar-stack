import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './ingredients-card.module.css';

type IngredientsCardProps = {
  image: string;
  name: string;
  price: number;
};

const IngredientsCard = ({
  image,
  name,
  price,
}: IngredientsCardProps): React.JSX.Element => {
  return (
    <div className={styles.ingredients_card}>
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.price}>
        <p>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className="text text_type_main-small">{name}</h3>
      <Counter count={1} />
    </div>
  );
};

export default IngredientsCard;
