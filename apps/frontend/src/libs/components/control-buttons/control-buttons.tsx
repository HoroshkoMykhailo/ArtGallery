import { Button } from '../components.js';
import styles from './styles.module.css';

type Properties = {
  disabled: boolean;
  isRemoving: boolean;
  onAddNew: () => void;
  onCancelRemove: () => void;
  onConfirmRemove: () => void;
  onRemove: () => void;
};

const ControlButtons = ({
  disabled,
  isRemoving,
  onAddNew,
  onCancelRemove,
  onConfirmRemove,
  onRemove
}: Properties): JSX.Element => {
  return (
    <div className={styles['control-buttons']}>
      <Button onClick={onAddNew}>Add New Artwork</Button>
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
