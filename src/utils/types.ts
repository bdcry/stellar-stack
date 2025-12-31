export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TApiResponseFetchIngredients = {
  success: boolean;
  data: TIngredient[];
};

export type TApiResponsePostOrder = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type TFilling = TIngredient & { uuid: string };

export type TApiResponseReset = {
  success: boolean;
  message: string;
};

export type TApiResponseAuth = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type TApiResponseToken = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TApiUserData = Omit<TApiResponseAuth, 'accessToken' | 'refreshToken'>;

export type TLoginData = {
  email: string;
  password: string;
};

export type TRegisterData = TLoginData & { name: string };

export type TUpdateUserData = {
  name: string;
  email: string;
  password: string;
};

export type TResetPasswordData = {
  email: string;
};

export type TResetPasswordFormData = {
  password: string;
  token: string;
};
