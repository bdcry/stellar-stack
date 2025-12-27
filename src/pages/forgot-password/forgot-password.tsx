import { requestPasswordReset } from '@/utils/api';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState, type JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { TResetPasswordData } from '@/utils/types';

import styles from './forgot-password.module.css';

export const ForgotPassword = (): JSX.Element => {
  const navigate = useNavigate();
  const [form, setForm] = useState<TResetPasswordData>({ email: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ email: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await requestPasswordReset(form.email);
      localStorage.setItem('canResetPassword', 'true');
      void navigate('/reset-password', { state: { fromForgotPassword: true } });
    } catch (_err) {
      setError('Ошибка отправки. Проверьте email или попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <form className={styles.form} onSubmit={(e) => void handleSubmit(e)}>
          <Input
            name="email"
            onChange={handleChange}
            placeholder="E-mail"
            size="default"
            type="email"
            value={form.email}
            error={!!error}
            errorText={error ?? ''}
          />
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            extraClass="mb-20"
            disabled={isLoading}
          >
            {isLoading ? 'Отправляем...' : 'Восстановить'}
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
