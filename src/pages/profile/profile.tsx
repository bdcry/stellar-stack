import { updateUser } from '@/services/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState, type JSX } from 'react';
import { Link } from 'react-router-dom';

import styles from './profile.module.css';

export const Profile = (): JSX.Element => {
  const userInfo = useAppSelector(({ auth }) => auth.user);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: userInfo.name,
    email: userInfo.email,
    password: '',
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleInputChange = (fieldName: string, value: string): void => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    setIsEditing((prev) => ({ ...prev, [fieldName]: true }));
  };

  const isAnyFieldEditing = Object.values(isEditing).some((editing) => editing);

  const handleClearField = (fieldName: string): void => {
    if (fieldName === 'password') {
      setFormData((prev) => ({ ...prev, password: '' }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: userInfo[fieldName as 'name' | 'email'],
      }));
    }

    setIsEditing((prev) => ({ ...prev, [fieldName]: false }));
  };

  const handleCancel = (): void => {
    setFormData({
      name: userInfo.name,
      email: userInfo.email,
      password: '',
    });
    setIsEditing({
      name: false,
      email: false,
      password: false,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void dispatch(updateUser(formData));
  };

  useEffect(() => {
    setFormData({
      name: userInfo.name,
      email: userInfo.email,
      password: '',
    });
    setIsEditing({
      name: false,
      email: false,
      password: false,
    });
  }, [userInfo]);

  return (
    <div className={styles.profile}>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <Link className={styles.link} to="/profile">
            <h2 className="text text_type_main-medium">Профиль</h2>
          </Link>
          <Link className={styles.link} to="/profile/orders">
            <h2 className="text text_type_main-medium text_color_inactive">
              История заказов
            </h2>
          </Link>
          <Link className={styles.link} to="/">
            <h2 className="text text_type_main-medium text_color_inactive">Выход</h2>
          </Link>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              icon={isEditing.name ? 'CloseIcon' : 'EditIcon'}
              onIconClick={() => handleClearField('name')}
              name="name"
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Имя"
              size="default"
              type="text"
              value={formData.name}
            />
            <Input
              icon={isEditing.email ? 'CloseIcon' : 'EditIcon'}
              onIconClick={() => handleClearField('email')}
              name="email"
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="E-mail"
              size="default"
              type="email"
              value={formData.email}
            />
            <Input
              icon={isEditing.password ? 'CloseIcon' : 'EditIcon'}
              onIconClick={() => handleClearField('password')}
              name="password"
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Пароль"
              size="default"
              type="password"
              value={formData.password}
            />
            {isAnyFieldEditing && (
              <div className={styles.buttonGroup}>
                <Button
                  type="secondary"
                  size="medium"
                  htmlType="button"
                  onClick={handleCancel}
                >
                  Отмена
                </Button>
                <Button
                  type="primary"
                  size="medium"
                  htmlType="submit"
                  extraClass="mb-20"
                >
                  Сохранить
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
