import { useCallback, useState } from '~/libs/hooks/hooks.js';
import { type ArtWorkQuery } from '~/libs/modules/artwork/artwork.js';

import { Button } from '../components.js';
import styles from './styles.module.css';

type Properties = {
  query: ArtWorkQuery;
  setQuery: (newQuery: ArtWorkQuery) => void;
};

const FilterOptions = ({ query, setQuery }: Properties): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchBy, setSearchBy] = useState<'' | 'artist' | 'title'>('');

  const handleSearch = useCallback(() => {
    let newQuery: ArtWorkQuery = { ...query };

    if (searchBy) {
      newQuery[searchBy] = searchValue;
    } else {
      newQuery.title = searchValue;
    }

    setQuery(newQuery);
  }, [query, searchBy, searchValue, setQuery]);

  const handleClear = useCallback(() => {
    setSearchValue('');
    setSearchBy('');
    setQuery({});
  }, [setQuery]);

  const handleSetSearchValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    []
  );

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchBy(event.target.value as 'artist' | 'title');
    },
    []
  );

  return (
    <div className={styles['filter-options']}>
      <input
        className={styles['filter-options__input']}
        onChange={handleSetSearchValue}
        placeholder="Search..."
        type="text"
        value={searchValue}
      />
      <select
        className={styles['filter-options__select']}
        onChange={handleSelectChange}
        value={searchBy}
      >
        <option hidden selected value="">
          Search by
        </option>
        <option value="title">Title</option>
        <option value="artist">Artist</option>
      </select>
      <Button onClick={handleSearch}>Search</Button>
      <Button onClick={handleClear}>Clear</Button>
    </div>
  );
};

export { FilterOptions };
