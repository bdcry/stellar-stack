import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import type { JSX } from 'react';

import styles from './reset-password.module.css';

export const ResetPassword = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <form className={styles.form}>
          <Input
            name="password"
            onChange={() => console.log('hello world from password')}
            placeholder="Введите новый пароль"
            size="default"
            type="password"
            value=""
            icon="ShowIcon"
          />
          <Input
            name="email-code"
            onChange={() => console.log('hello world from email-code')}
            placeholder="Введите код из письма"
            size="default"
            type="text"
            value=""
          />
          <Button
            onClick={() => console.log('hello world from btn')}
            type="primary"
            size="medium"
            htmlType="submit"
            extraClass="mb-20"
          >
            Сохранить
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
