import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './constructor-price-display.module.css';

type TPriceDisplayProps = {
  total: number;
};

const ConstructorPriceDisplay = ({ total }: TPriceDisplayProps): React.JSX.Element => {
  return (
    <>
      <span className={`${styles.price} text text_type_digits-medium mr-2`}>
        <span className="text text_type_digits-medium">{total}</span>
        <CurrencyIcon
          className={`${styles.currency_icon} text text_type_main-large`}
          type="primary"
        />
      </span>
    </>
  );
};

export default ConstructorPriceDisplay;
