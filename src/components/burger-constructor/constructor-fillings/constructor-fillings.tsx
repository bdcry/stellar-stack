import FillingItem from './filling-item/filling-item';

import type { TFilling } from '@/utils/types';

import styles from './constructor-fillings.module.css';

type TConstructorFillingsProps = {
  fillings: TFilling[];
};

const ConstructorFillings = ({
  fillings,
}: TConstructorFillingsProps): React.JSX.Element => {
  return (
    <ul className={styles.constructor_fillings}>
      {fillings.map((filling, index) => (
        <FillingItem key={filling.uuid} filling={filling} index={index} />
      ))}
    </ul>
  );
};

export default ConstructorFillings;
