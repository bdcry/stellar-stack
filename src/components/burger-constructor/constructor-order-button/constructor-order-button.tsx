import { Button } from '@krgaa/react-developer-burger-ui-components';
import React from 'react';

const ConstructorOrderButton = React.memo((): React.JSX.Element => {
  return (
    <Button htmlType="button" type="primary" size="large">
      Оформить заказ
    </Button>
  );
});

// иначе линтер ругается на отсутствие имени функции
ConstructorOrderButton.displayName = 'ConstructorOrderButton';

export default ConstructorOrderButton;
