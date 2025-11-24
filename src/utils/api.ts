import type {
  TApiResponseFetchIngredients,
  TApiResponsePostOrder,
  TIngredient,
} from './types';

export const API_URL = 'https://norma.education-services.ru/api/';

const checkResponse = (res: Response): Response => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res;
};

const request = (endPoint: string, options?: RequestInit): Promise<Response> => {
  return fetch(`${API_URL}${endPoint}`, options).then(checkResponse);
};

export const fetchIngredientsFromApi = async (): Promise<TIngredient[]> => {
  const response = await request('ingredients');
  const ingredientsData = (await response.json()) as TApiResponseFetchIngredients;
  return ingredientsData.data;
};

export const postOrderToApi = async (ingredientsIds: string[]): Promise<number> => {
  const response = await request('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredientsIds }),
  });

  const orderData = (await response.json()) as TApiResponsePostOrder;
  return orderData.order.number;
};
