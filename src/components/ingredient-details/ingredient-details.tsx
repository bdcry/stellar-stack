import { useAppSelector } from '@/services/store';
import { useParams } from 'react-router-dom';

import styles from './ingredient-details.module.css';

const IngredientDetails = (): React.JSX.Element => {
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const ingredients = useAppSelector((state) => state.ingredients.items);
  const ingredient = ingredients.find((item) => item._id === ingredientId);

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

  const { name, image, calories, proteins, fat, carbohydrates } = ingredient;
  return (
    <div className={styles.ingredient_details}>
      <div className={styles.main_info}>
        <img className={styles.image} src={image} alt={name} />
        <h2 className={`${styles.title} text text_type_main-medium`}>{name}</h2>
      </div>
      <ul className={styles.composition}>
        <li className={styles.composition_item}>
          <span className="text text_type_main-small text_color_inactive">
            Калории, ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {calories}
          </span>
        </li>
        <li className={styles.composition_item}>
          <span className="text text_type_main-small text_color_inactive">Белки, г</span>
          <span className="text text_type_digits-default text_color_inactive">
            {proteins}
          </span>
        </li>
        <li className={styles.composition_item}>
          <span className="text text_type_main-small text_color_inactive">Жиры, г</span>
          <span className="text text_type_digits-default text_color_inactive">
            {fat}
          </span>
        </li>
        <li className={styles.composition_item}>
          <span className="text text_type_main-small text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
