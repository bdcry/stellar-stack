import { Button, Input } from '@krgaa/react-developer-burger-ui-components';

import type { JSX } from 'react';

import styles from './login.module.css';

export const Login = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className="text text_type_main-medium mb-6">Войти</h1>
        <form className={styles.form}>
          <Input
            errorText="Ошибка"
            name="name"
            onChange={() => console.log('hello world from e-mail')}
            placeholder="E-mail"
            size="default"
            type="email"
            value=""
          />
          <Input
            errorText="Ошибка"
            icon="ShowIcon"
            name="name"
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
            Войти
          </Button>
        </form>
        {/* добавить линки сюда позже, сейчас впадлу */}
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы — новый пользователь?{' '}
          <span className="text_color_accent">Зарегистрироваться</span>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль? <span className="text_color_accent">Восстановить пароль</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
