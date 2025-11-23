import { moveFilling, removeFilling } from '@/services/slices/constructor-slice';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import type { TFilling } from '@/utils/types';

type TFillingItemProps = { filling: TFilling; index: number };

import styles from './filling-item.module.css';

const FillingItem = ({ filling, index }: TFillingItemProps): React.JSX.Element => {
  const dispatch = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: 'filling',
    item: { uuid: filling.uuid, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'filling',
    hover: (item: { uuid: string; index: number }) => {
      if (item.uuid !== filling.uuid) {
        dispatch(moveFilling({ fromIndex: item.index, toIndex: index }));
      }
    },
  });

  return (
    <li
      className={`${styles.item} text text_type_main-small`}
      ref={dropRef as unknown as React.Ref<HTMLLIElement>}
      style={{ opacity: isDrag ? 0.5 : 1 }}
    >
      <div
        ref={dragRef as unknown as React.Ref<HTMLDivElement>}
        className={styles.wrapper}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          isLocked={false}
          text={filling.name}
          price={filling.price}
          thumbnail={filling.image}
          handleClose={() => dispatch(removeFilling(filling.uuid))}
        />
      </div>
    </li>
  );
};

export default FillingItem;
