import styles from './styles.module.css';

type Properties = {
  isChecked: boolean;
  isReadOnly?: boolean;
  onChange?: () => void;
};

const Checkbox = ({
  isChecked,
  isReadOnly = false,
  onChange
}: Properties): JSX.Element => {
  return (
    <button
      className={styles['checkbox-wrapper']}
      onClick={onChange}
      type="button"
    >
      <input
        checked={isChecked}
        className={styles['checkbox']}
        readOnly={isReadOnly}
        type="checkbox"
      />
      <span className={styles['checkbox-custom']} />
    </button>
  );
};

export { Checkbox };
