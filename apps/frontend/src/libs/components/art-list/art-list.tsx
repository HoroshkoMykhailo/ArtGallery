import { ZERO_VALUE } from '~/libs/common/constants.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type ArtWork as TArtWork } from '~/libs/modules/artwork/artwork.js';

import { ArtWork, Loader } from '../components.js';
import styles from './styles.module.css';

type Properties = {
  artWorks: TArtWork[] | undefined;
  error?: string;
  isRemoving: boolean;
  loading: boolean;
  onSelect: (id: number) => void;
  selectedId: null | number;
};

const ArtList = ({
  artWorks,
  error,
  isRemoving,
  loading,
  onSelect,
  selectedId
}: Properties): JSX.Element => {
  const zeroArtWorks =
    !loading && artWorks && artWorks.length <= ZERO_VALUE && !error;
  const hasArtWorks = !error && !loading && !zeroArtWorks && !!artWorks;
  const listClassName = `${styles['art-list']} ${hasArtWorks ? '' : styles['art-list__grow']}`;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      const target = event.target as HTMLElement;
      const artWorkElement = target.closest('[data-artwork-id]');

      if (artWorkElement) {
        const artWorkId = Number(
          (artWorkElement as HTMLDivElement).dataset['artworkId']
        );

        if (!Number.isNaN(artWorkId)) {
          onSelect(artWorkId);
        }
      }
    },
    [onSelect]
  );

  return (
    <div className={listClassName} onClick={handleClick}>
      {loading && (
        <div className={styles['art-list__loader']}>
          <Loader />
        </div>
      )}

      {error && <p className={styles['art-list__error']}>{error}</p>}

      {zeroArtWorks && (
        <p className={styles['art-list__error']}>Artworks not found</p>
      )}

      {hasArtWorks &&
        artWorks.map(artWork => (
          <ArtWork
            artWork={artWork}
            isRemoving={isRemoving}
            key={artWork.id}
            selectedId={selectedId}
          />
        ))}
    </div>
  );
};

export { ArtList };
