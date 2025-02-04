import { useCallback } from '~/libs/hooks/hooks.js';
import { type Option } from '~/libs/types/types.js';

import styles from '../../styles.module.css';

type Properties = {
  onSelect: (value: string) => void;
  option: Option;
};

const MenuItem = ({ onSelect, option }: Properties): JSX.Element => {
  const handleSelect = useCallback((): void => {
    onSelect(option.value);
  }, [onSelect, option.value]);

  return (
    <button
      className={styles['dropdown__item']}
      key={option.value}
      onClick={handleSelect}
    >
      {option.label}
    </button>
  );
};

export { MenuItem };
