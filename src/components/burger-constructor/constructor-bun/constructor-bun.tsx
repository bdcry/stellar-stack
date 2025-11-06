import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';

type TBunRowProps = {
  position: 'top' | 'bottom';
  bun: TIngredient;
};

const ConstructorBun = ({ position, bun }: TBunRowProps): React.JSX.Element => {
  return (
    <div className="pl-8">
      <ConstructorElement
        type={position}
        isLocked={true}
        text={`${bun.name} (${position === 'top' ? 'верх' : 'низ'})`}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );
};

export default ConstructorBun;
