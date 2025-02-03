import { ZERO_VALUE } from '~/libs/common/constants.js';
import { type ArtWork as TArtWork } from '~/libs/modules/artwork/artwork.js';

import { ArtWork, Loader } from '../components.js';
import styles from './styles.module.css';

type Properties = {
  artWorks: TArtWork[] | undefined;
  error?: string;
  loading: boolean;
};

const ArtList = ({ artWorks, error, loading }: Properties): JSX.Element => {
  const zeroArtWorks =
    !loading && artWorks && artWorks.length <= ZERO_VALUE && !error;
  const hasArtWorks = !error && !loading && !zeroArtWorks && !!artWorks;
  const listClassName = `${styles['art-list']} ${hasArtWorks ? '' : styles['art-list__grow']}`;

  return (
    <div className={listClassName}>
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
        artWorks.map(artWork => <ArtWork artWork={artWork} key={artWork.id} />)}
    </div>
  );
};

export { ArtList };
