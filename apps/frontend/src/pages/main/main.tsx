import { useCallback, useState } from 'react';

import {
  ArtList,
  ControlButtons,
  FilterOptions
} from '~/libs/components/components.js';
import { useRequest } from '~/libs/hooks/hooks.js';
import {
  type ArtWorkQuery,
  artWorkApi
} from '~/libs/modules/artwork/artwork.js';

import styles from './styles.module.css';

type Properties = {
  onOpenModal: () => void;
};

const Main = ({ onOpenModal }: Properties): JSX.Element => {
  const [query, setQuery] = useState<ArtWorkQuery>({});
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<null | number>(null);

  const { data, error, loading } = useRequest(
    () => artWorkApi.getArtWorks(query),
    {
      refreshDeps: [query]
    }
  );

  const handleRemoveClick = useCallback(() => {
    setIsRemoving(true);
    setSelectedId(null);
  }, []);

  const handleCancelRemove = useCallback(() => {
    setIsRemoving(false);
    setSelectedId(null);
  }, []);

  const removeArtwork = useCallback(() => {
    if (!selectedId) {
      return;
    }

    void artWorkApi.deleteArtWork(selectedId);
    setSelectedId(null);
    setIsRemoving(false);
  }, [selectedId]);

  return (
    <main className={styles['main']}>
      <h1 className={styles['main__title']}>Explore our collection</h1>
      <FilterOptions setQuery={setQuery} />
      <ArtList
        artWorks={data}
        loading={loading}
        {...(error && { error: error.message })}
        isRemoving={isRemoving}
        onSelect={setSelectedId}
        selectedId={selectedId}
      />
      <ControlButtons
        disabled={isRemoving && !selectedId}
        isRemoving={isRemoving}
        onAddNew={onOpenModal}
        onCancelRemove={handleCancelRemove}
        onConfirmRemove={removeArtwork}
        onRemove={handleRemoveClick}
      />
    </main>
  );
};

export { Main };
