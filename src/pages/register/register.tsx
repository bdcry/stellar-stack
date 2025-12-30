import { register } from '@/services/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { useForm } from '@/shared/hooks/useForm';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState, type JSX } from 'react';
import { Link } from 'react-router-dom';

import type { TRegisterData } from '@/utils/types';

import styles from './register.module.css';

export const Register = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const fieldError = useAppSelector(({ auth }) => auth.error);

  const { form, handleChange } = useForm<TRegisterData>({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void dispatch(
      register({ name: form.name, email: form.email, password: form.password })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            name="name"
            onChange={handleChange}
            placeholder="Имя"
            size="default"
            type="text"
            value={form.name}
          />
          <Input
            error={!!fieldError}
            errorText="Пользователь с таким email уже существует"
            name="email"
            onChange={handleChange}
            placeholder="E-mail"
            size="default"
            type="email"
            value={form.email}
          />
          <Input
            icon={showPassword ? 'ShowIcon' : 'HideIcon'}
            onIconClick={() => setShowPassword(!showPassword)}
            name="password"
            onChange={handleChange}
            placeholder="Пароль"
            size="default"
            type={showPassword ? 'password' : 'text'}
            value={form.password}
          />
          <Button type="primary" size="medium" htmlType="submit" extraClass="mb-20">
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы?{' '}
          <Link to="/login" className={`${styles.link} text_color_accent`}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
