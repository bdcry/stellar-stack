import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';

type TFillingItemProps = { filling: TIngredient };

import styles from './filling-item.module.css';

const FillingItem = ({ filling }: TFillingItemProps): React.JSX.Element => {
  return (
    <li className={`${styles.item} text text_type_main-small`}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={filling.name}
        price={filling.price}
        thumbnail={filling.image}
      />
    </li>
  );
};

export default FillingItem;
