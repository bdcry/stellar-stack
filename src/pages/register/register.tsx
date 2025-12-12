import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import type { JSX } from 'react';

import styles from './register.module.css';

export const Register = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <form className={styles.form}>
          <Input
            errorText="Ошибка"
            name="name"
            onChange={() => console.log('hello world from e-mail')}
            placeholder="Имя"
            size="default"
            type="text"
            value=""
          />
          <Input
            errorText="Ошибка"
            name="email"
            onChange={() => console.log('hello world from e-mail')}
            placeholder="E-mail"
            size="default"
            type="email"
            value=""
          />
          <Input
            errorText="Ошибка"
            icon="ShowIcon"
            name="password"
            onChange={() => console.log('hello world from password')}
            placeholder="Пароль"
            size="default"
            type="password"
            value=""
          />
          <Button
            onClick={() => console.log('hello world from btn')}
            type="primary"
            size="medium"
            htmlType="submit"
            extraClass="mb-20"
          >
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
