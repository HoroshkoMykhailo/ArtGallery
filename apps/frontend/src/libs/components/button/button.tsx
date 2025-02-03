import styles from './styles.module.css';

type Properties = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: Properties): JSX.Element => {
  return (
    <button className={styles['button']} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
