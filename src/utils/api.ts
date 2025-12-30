import type {
  TApiResponseAuth,
  TApiResponseFetchIngredients,
  TApiResponsePostOrder,
  TApiResponseReset,
  TApiResponseToken,
  TApiUserData,
  TIngredient,
} from './types';

export const API_URL = 'https://norma.education-services.ru/api/';

const checkResponse = <T>(res: Response): T => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json() as T;
};

const request = <T>(endPoint: string, options?: RequestInit): Promise<T> => {
  return fetch(`${API_URL}${endPoint}`, options).then(checkResponse<T>);
};

export const fetchIngredientsFromApi = async (): Promise<TIngredient[]> => {
  const ingredientsData = await request<TApiResponseFetchIngredients>('ingredients');
  return ingredientsData.data;
};

export const postOrderToApi = async (
  ingredientsIds: string[],
  token: string
): Promise<number> => {
  const orderData = await request<TApiResponsePostOrder>('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify({ ingredients: ingredientsIds }),
  });
  return orderData.order.number;
};

export const requestPasswordReset = async (
  email: string
): Promise<TApiResponseReset> => {
  const data = await request<TApiResponseReset>('password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  return data;
};

export const confirmPasswordReset = async (
  password: string,
  token: string
): Promise<TApiResponseReset> => {
  const data = await request<TApiResponseReset>('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, token }),
  });

  return data;
};

export const signUp = async (
  email: string,
  password: string,
  name: string
): Promise<TApiResponseAuth> => {
  const data = await request<TApiResponseAuth>('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });
  return data;
};

export const signIn = async (
  email: string,
  password: string
): Promise<TApiResponseAuth> => {
  const data = await request<TApiResponseAuth>('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return data;
};

export const logoutRequest = async (
  refreshToken: string
): Promise<TApiResponseReset> => {
  const data = await request<TApiResponseReset>('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  });
  return data;
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<TApiResponseToken> => {
  const data = await request<TApiResponseToken>('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  });
  return data;
};

export const getUserData = async (token: string): Promise<TApiUserData> => {
  const data = await request<TApiUserData>('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
  return data;
};

export const updateUserData = async (
  token: string,
  name: string,
  email: string,
  password: string
): Promise<TApiUserData> => {
  const data = await request<TApiUserData>('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify({ name, email, password }),
  });
  return data;
};
