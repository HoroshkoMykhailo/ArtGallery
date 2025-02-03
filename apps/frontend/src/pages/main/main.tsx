import { ArtList } from '~/libs/components/components.js';
import { useRequest } from '~/libs/hooks/hooks.js';
import { artWorkApi } from '~/libs/modules/artwork/artwork.js';

import styles from './styles.module.css';

const Main = (): JSX.Element => {
  const { data, error, loading } = useRequest(() => artWorkApi.getArtWorks());

  return (
    <main className={styles['main']}>
      <h1 className={styles['main__title']}>Explore our collection</h1>
      <ArtList
        artWorks={data}
        loading={loading}
        {...(error && { error: error.message })}
      />
    </main>
  );
};

export { Main };
