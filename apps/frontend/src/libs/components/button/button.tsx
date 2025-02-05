import styles from './styles.module.css';

type Properties = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'reset' | 'submit';
};

const Button = ({
  children,
  disabled,
  onClick,
  type = 'button'
}: Properties): JSX.Element => {
  return (
    <button
      className={styles['button']}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export { Button };
