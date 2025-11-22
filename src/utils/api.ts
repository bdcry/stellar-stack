import type {
  TApiResponseFetchIngredients,
  TApiResponsePostOrder,
  TIngredient,
} from './types';

export const API_URL = 'https://norma.education-services.ru/api/';

export const fetchIngredientsFromApi = async (): Promise<TIngredient[]> => {
  const response = await fetch(`${API_URL}ingredients`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const ingredientsData = (await response.json()) as TApiResponseFetchIngredients;
  return ingredientsData.data;
};

export const postOrderToApi = async (ingredientsIds: string[]): Promise<number> => {
  const response = await fetch(`${API_URL}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredientsIds }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const orderData = (await response.json()) as TApiResponsePostOrder;
  return orderData.order.number;
};
