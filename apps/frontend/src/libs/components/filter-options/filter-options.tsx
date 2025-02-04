import { getOptions } from '~/libs/helpers/get-options.js';
import {
  useCallback,
  useDebounce,
  useEffect,
  useState
} from '~/libs/hooks/hooks.js';
import {
  type ArtWorkQuery,
  ArtWorkType,
  SortOrder
} from '~/libs/modules/artwork/artwork.js';
import { type ValueOf } from '~/libs/types/types.js';

import { Button, Dropdown } from '../components.js';
import styles from './styles.module.css';

type Properties = {
  setQuery: React.Dispatch<React.SetStateAction<ArtWorkQuery>>;
};

const FilterOptions = ({ setQuery }: Properties): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchBy, setSearchBy] = useState<'' | 'artist' | 'title'>('');
  const [sortOrder, setSortOrder] = useState<'' | ValueOf<typeof SortOrder>>(
    ''
  );
  const [artworkType, setArtworkType] = useState<
    '' | ValueOf<typeof ArtWorkType>
  >('');

  const debouncedSearchValue = useDebounce(searchValue, { wait: 500 });

  useEffect(() => {
    setQuery(previousQuery => ({
      ...previousQuery,
      [searchBy || 'title']: debouncedSearchValue,
      ...(sortOrder && { price: sortOrder }),
      ...(artworkType && { type: artworkType })
    }));
  }, [artworkType, debouncedSearchValue, searchBy, setQuery, sortOrder]);

  const handleClear = useCallback(() => {
    setSearchValue('');
    setSearchBy('');
    setSortOrder('');
    setArtworkType('');
    setQuery({});
  }, [setQuery]);

  const handleSetSearchValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    []
  );

  const handleSelectChange = useCallback((value: string) => {
    setSearchBy(value as '' | 'artist' | 'title');
  }, []);

  const handleSelectSortOrder = useCallback((value: string) => {
    const order = value as ValueOf<typeof SortOrder>;
    setSortOrder(order);
  }, []);

  const handleSelectArtworkType = useCallback((value: string) => {
    const type = value as ValueOf<typeof ArtWorkType>;
    setArtworkType(type);
  }, []);

  return (
    <div className={styles['filter-options']}>
      <input
        className={styles['filter-options__input']}
        onChange={handleSetSearchValue}
        placeholder="Search..."
        type="text"
        value={searchValue}
      />
      <Dropdown
        onSelect={handleSelectChange}
        options={[
          { label: 'Title', value: 'title' },
          { label: 'Artist', value: 'artist' }
        ]}
        placeholder="Search by"
        selected={searchBy}
      />
      <Dropdown
        onSelect={handleSelectSortOrder}
        options={getOptions(SortOrder)}
        placeholder="Sort By"
        selected={sortOrder}
      />
      <Dropdown
        onSelect={handleSelectArtworkType}
        options={getOptions(ArtWorkType)}
        placeholder="Select type"
        selected={artworkType}
      />
      {/* <Button onClick={handleSearch}>Search</Button> */}
      <Button onClick={handleClear}>Clear</Button>
    </div>
  );
};

export { FilterOptions };
