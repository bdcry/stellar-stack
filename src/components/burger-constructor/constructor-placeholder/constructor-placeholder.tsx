import styles from './constructor-placeholder.module.css';

type TConstructorPlaceholderProps = {
  text: string;
  position?: 'top' | 'bottom' | 'middle';
};

const ConstructorPlaceholder = ({
  text,
  position = 'middle',
}: TConstructorPlaceholderProps): React.JSX.Element => {
  return (
    <div className={`${styles.placeholder} ${styles[position]}`}>
      <p className="text text_type_main-default">{text}</p>
    </div>
  );
};

export default ConstructorPlaceholder;
