import { useForm } from '@/shared/hooks/useForm';
import { confirmPasswordReset } from '@/utils/api';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState, type JSX } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import type { TResetPasswordFormData } from '@/utils/types';

import styles from './reset-password.module.css';

export const ResetPassword = (): JSX.Element => {
  const navigate = useNavigate();
  const { form, handleChange } = useForm<TResetPasswordFormData>(
    {
      password: '',
      token: '',
    },
    { onFieldChange: () => setError(null) }
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const canReset = localStorage.getItem('canResetPassword');

  if (!canReset) {
    return <Navigate to="/forgot-password" replace />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await confirmPasswordReset(form.password, form.token);
      localStorage.removeItem('canResetPassword');
      void navigate('/login');
    } catch (_err) {
      setError('Ошибка сброса пароля. Проверьте код и пароль.');
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
            name="password"
            onChange={handleChange}
            placeholder="Введите новый пароль"
            size="default"
            type={showPassword ? 'password' : 'text'}
            value={form.password}
            icon={showPassword ? 'ShowIcon' : 'HideIcon'}
            onIconClick={() => setShowPassword(!showPassword)}
            error={!!error}
            errorText={error ?? ''}
          />
          <Input
            name="token"
            onChange={handleChange}
            placeholder="Введите код из письма"
            size="default"
            type="text"
            value={form.token}
          />
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            extraClass="mb-20"
            disabled={isLoading}
          >
            {isLoading ? 'Сохраняем...' : 'Сохранить'}
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
