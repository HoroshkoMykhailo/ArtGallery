import { useState } from 'react';

import { ArtList, FilterOptions } from '~/libs/components/components.js';
import { useRequest } from '~/libs/hooks/hooks.js';
import {
  type ArtWorkQuery,
  artWorkApi
} from '~/libs/modules/artwork/artwork.js';

import styles from './styles.module.css';

const Main = (): JSX.Element => {
  const [query, setQuery] = useState<ArtWorkQuery>({});
  const { data, error, loading } = useRequest(
    () => artWorkApi.getArtWorks(query),
    {
      refreshDeps: [query]
    }
  );

  return (
    <main className={styles['main']}>
      <h1 className={styles['main__title']}>Explore our collection</h1>
      <FilterOptions setQuery={setQuery} />
      <ArtList
        artWorks={data}
        loading={loading}
        {...(error && { error: error.message })}
      />
    </main>
  );
};

export { Main };
