import type {
  TApiResponseAuth,
  TApiResponseFetchIngredients,
  TApiResponsePostOrder,
  TApiResponseReset,
  TApiResponseToken,
  TApiUserData,
  TIngredient,
} from './types';

// requestPasswordReset → resetPasswordRequest
// confirmPasswordReset → resetPasswordConfirm
// requestRegister → signUp
// requestLogin → signIn
// requestLogout → logout
// requestNewToken → refreshAccessToken
// fetchUserData → getUser
// updateUserData → updateUser

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

export const requestPasswordReset = async (
  email: string
): Promise<TApiResponseReset> => {
  const response = await request('password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = (await response.json()) as TApiResponseReset;
  return data;
};

export const confirmPasswordReset = async (
  password: string,
  token: string
): Promise<TApiResponseReset> => {
  const response = await request('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, token }),
  });

  const data = (await response.json()) as TApiResponseReset;
  return data;
};

export const signUp = async (
  email: string,
  password: string,
  name: string
): Promise<TApiResponseAuth> => {
  const response = await request('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });

  const data = (await response.json()) as TApiResponseAuth;
  return data;
};

export const signIn = async (
  email: string,
  password: string
): Promise<TApiResponseAuth> => {
  const response = await request('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = (await response.json()) as TApiResponseAuth;

  return data;
};

export const requestLogout = async (
  refreshToken: string
): Promise<TApiResponseReset> => {
  const response = await request('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  });

  const data = (await response.json()) as TApiResponseReset;
  return data;
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<TApiResponseToken> => {
  const response = await request('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  });

  const data = (await response.json()) as TApiResponseToken;
  return data;
};

export const fetchUserData = async (token: string): Promise<TApiUserData> => {
  const response = await request('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = (await response.json()) as TApiUserData;
  return data;
};

export const updateUserData = async (
  token: string,
  name: string,
  email: string,
  password: string
): Promise<TApiUserData> => {
  const response = await request('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = (await response.json()) as TApiUserData;
  return data;
};
