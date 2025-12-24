import { login } from '@/services/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState, type JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { TLoginData } from '@/utils/types';

import styles from './login.module.css';

export const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(true);
  const [form, setForm] = useState<TLoginData>({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuth) {
      void navigate('/', { replace: true });
    }
  }, [isAuth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void dispatch(login({ email: form.email, password: form.password }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className="text text_type_main-medium mb-6">Войти</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            error={!!error}
            errorText="Неверный Email"
            name="email"
            onChange={handleChange}
            placeholder="E-mail"
            size="default"
            type="email"
            value={form.email}
          />
          <Input
            error={!!error}
            errorText="Неверный пароль"
            icon={showPassword ? 'ShowIcon' : 'HideIcon'}
            name="password"
            onChange={handleChange}
            onIconClick={() => setShowPassword(!showPassword)}
            placeholder="Пароль"
            size="default"
            type={showPassword ? 'password' : 'text'}
            value={form.password}
          />
          <Button type="primary" size="medium" htmlType="submit" extraClass="mb-20">
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы — новый пользователь?{' '}
          <Link to="/register" className={`${styles.link} text_color_accent`}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{' '}
          <Link to="/forgot-password" className={`${styles.link} text_color_accent`}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
