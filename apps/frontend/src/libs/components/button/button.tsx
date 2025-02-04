import styles from './styles.module.css';

type Properties = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

const Button = ({ children, disabled, onClick }: Properties): JSX.Element => {
  return (
    <button className={styles['button']} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
