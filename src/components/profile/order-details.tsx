import { useParams } from 'react-router-dom';

import type { JSX } from 'react';

export const OrderDetails = (): JSX.Element => {
  const { number } = useParams<{ number: string }>();

  return (
    <div>
      <p className="text text_type_main-large">Детали заказа #{number}</p>
      <p className="text text_type_main-default mt-20">
        Эта страница в разработке, ожидайте...
      </p>
    </div>
  );
};
