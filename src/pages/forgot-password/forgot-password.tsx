import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';

import type { JSX } from 'react';

import styles from './forgot-password.module.css';

export const ForgotPassword = (): JSX.Element => {
  const navigate = useNavigate();
  const handleSubmit = (): void => {
    // если такой e-mail есть в базе, то перенаправляем пользователя на страницу сброса пароля.
    console.log('hello world from btn');
    void navigate('/reset-password');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <form className={styles.form}>
          <Input
            name="email"
            onChange={() => console.log('hello world from e-mail')}
            placeholder="E-mail"
            size="default"
            type="email"
            value=""
          />
          <Button
            onClick={handleSubmit}
            type="primary"
            size="medium"
            htmlType="submit"
            extraClass="mb-20"
          >
            Восстановить
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{' '}
          <Link to="/login" className={`${styles.link} text_color_accent`}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
