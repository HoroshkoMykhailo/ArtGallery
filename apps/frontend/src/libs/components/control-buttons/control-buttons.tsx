import { useCallback } from 'react';

import { Button } from '../components.js';
import styles from './styles.module.css';

type Properties = {
  disabled: boolean;
  isRemoving: boolean;
  onCancelRemove: () => void;
  onConfirmRemove: () => void;
  onRemove: () => void;
};

const ControlButtons = ({
  disabled,
  isRemoving,
  onCancelRemove,
  onConfirmRemove,
  onRemove
}: Properties): JSX.Element => {
  const addNew = useCallback(() => {
    throw new Error('Not implemented');
  }, []);

  return (
    <div className={styles['control-buttons']}>
      <Button onClick={addNew}>Add New Artwork</Button>
      {isRemoving ? (
        <>
          <Button disabled={disabled} onClick={onConfirmRemove}>
            Confirm Remove
          </Button>
          <Button onClick={onCancelRemove}>Cancel</Button>
        </>
      ) : (
        <Button onClick={onRemove}>Remove Artwork</Button>
      )}
    </div>
  );
};

export { ControlButtons };
