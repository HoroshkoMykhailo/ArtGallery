import {
  useCallback,
  useEffect,
  useRef,
  useState
} from '~/libs/hooks/hooks.js';
import { type Option } from '~/libs/types/types.js';

import { Icon } from '../components.js';
import { MenuItem } from './libs/components/menu-item.js';
import styles from './styles.module.css';

type Properties = {
  onSelect: (value: string) => void;
  options: Option[];
  placeholder: string;
  selected?: string;
};

const Dropdown = ({
  onSelect,
  options,
  placeholder,
  selected
}: Properties): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownReference = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (value: string): void => {
      onSelect(value);
      setIsOpen(false);
    },
    [onSelect]
  );

  const handleSetOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownReference.current &&
        !dropdownReference.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return (): void => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles['dropdown']} ref={dropdownReference}>
      <button
        className={`${styles['dropdown__button']} ${selected && styles['dropdown__button--selected']}`}
        onClick={handleSetOpen}
        type="button"
      >
        {selected
          ? options.find(opt => opt.value === selected)?.label
          : placeholder}

        <Icon height={16} name="arrow" width={16} />
      </button>
      {isOpen && (
        <ul className={styles['dropdown__menu']}>
          {options.map(option => (
            <MenuItem
              key={option.value}
              onSelect={handleSelect}
              option={option}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export { Dropdown };
