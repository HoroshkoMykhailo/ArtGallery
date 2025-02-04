import { type MouseEvent } from 'react';

import { useCallback } from '~/libs/hooks/hooks.js';

import styles from './styles.module.css';

type Properties = {
  onClose: () => void;
};

const ArtWorkModal = ({ onClose }: Properties): JSX.Element => {
  const handleOverlayClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div className={styles['modal-overlay']} onClick={handleOverlayClick}>
      <div className={styles['modal-content']}>
        <h2>Add New Artwork</h2>
      </div>
    </div>
  );
};

export { ArtWorkModal };
