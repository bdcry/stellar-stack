import { useState } from 'react';

type TUseFormOptions = {
  onFieldChange?: () => void;
};

type TUseFormReturn<T> = {
  form: T;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setForm: React.Dispatch<React.SetStateAction<T>>;
};

export const useForm = <T>(
  inputValues = {} as T,
  options?: TUseFormOptions
): TUseFormReturn<T> => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    options?.onFieldChange?.();
  };

  return { form: values, handleChange, setForm: setValues };
};
