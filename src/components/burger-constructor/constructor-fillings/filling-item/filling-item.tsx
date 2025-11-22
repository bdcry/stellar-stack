import { removeFilling } from '@/services/slices/constructor-slice';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';

import type { TFilling } from '@/utils/types';

type TFillingItemProps = { filling: TFilling };

import styles from './filling-item.module.css';

const FillingItem = ({ filling }: TFillingItemProps): React.JSX.Element => {
  const dispatch = useDispatch();
  return (
    <li className={`${styles.item} text text_type_main-small`}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={filling.name}
        price={filling.price}
        thumbnail={filling.image}
        handleClose={() => dispatch(removeFilling(filling.uuid))}
      />
    </li>
  );
};

export default FillingItem;
