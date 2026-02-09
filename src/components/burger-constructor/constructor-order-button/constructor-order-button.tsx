import { Button } from '@krgaa/react-developer-burger-ui-components';
import React from 'react';

type TConstructorOrderButtonProps = {
  onOpen: () => void;
  disabled: boolean;
};

const ConstructorOrderButton = React.memo(
  ({ onOpen, disabled }: TConstructorOrderButtonProps): React.JSX.Element => {
    return (
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={onOpen}
        disabled={disabled}
        data-cy="order-button"
      >
        Оформить заказ
      </Button>
    );
  }
);

// иначе линтер ругается на отсутствие имени функции
ConstructorOrderButton.displayName = 'ConstructorOrderButton';

export default ConstructorOrderButton;
