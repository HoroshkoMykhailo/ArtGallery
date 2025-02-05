import { type ChangeEvent, type FormEvent, type MouseEvent } from 'react';
import { type NumberFormatValues, NumericFormat } from 'react-number-format';

import { ZERO_VALUE } from '~/libs/common/constants.js';
import { getOptions } from '~/libs/helpers/helpers.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';
import {
  type ArtWorkRequestDto,
  ArtWorkType,
  artWorkApi
} from '~/libs/modules/artwork/artwork.js';
import { type ValueOf } from '~/libs/types/types.js';

import { Button, Checkbox, Dropdown } from '../components.js';
import styles from './styles.module.css';

type Properties = {
  onClose: () => void;
};

const ArtWorkModal = ({ onClose }: Properties): JSX.Element => {
  const [formData, setFormData] = useState<
    { price: string; type: string } & Omit<ArtWorkRequestDto, 'price' | 'type'>
  >({
    artist: '',
    availability: true,
    price: '',
    title: '',
    type: ''
  });

  const handleOverlayClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;

      setFormData(previous => ({
        ...previous,
        [name]: value
      }));
    },
    []
  );

  const handleTypeSelect = useCallback((selectedType: string) => {
    setFormData(previous => ({
      ...previous,
      type: selectedType as ValueOf<typeof ArtWorkType>
    }));
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formattedData = {
        ...formData,
        price: formData.price === '' ? ZERO_VALUE : Number(formData.price),
        type: formData.type as ValueOf<typeof ArtWorkType>
      };

      void artWorkApi.createArtWork(formattedData);
      onClose();
    },
    [formData, onClose]
  );

  const handlePriceChange = useCallback(
    (values: NumberFormatValues) => {
      setFormData(previous => ({
        ...previous,
        price: values.value
      }));
    },
    [setFormData]
  );

  const handleAvailabilityChange = useCallback(() => {
    setFormData(previous => ({
      ...previous,
      availability: !previous.availability
    }));
  }, []);

  return (
    <div className={styles['modal-overlay']} onClick={handleOverlayClick}>
      <div className={styles['modal-content']}>
        <h2 className={styles['modal-content__title']}>Add New Artwork</h2>
        <form className={styles['modal-content__form']} onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label className={styles['form-group__label']} htmlFor="title">
              Title
            </label>
            <input
              className={styles['modal-content__input']}
              name="title"
              onChange={handleChange}
              placeholder="The Persistence of Memory"
              required
              type="text"
              value={formData.title}
            />
          </div>
          <div className={styles['form-group']}>
            <label className={styles['form-group__label']} htmlFor="artist">
              Artist
            </label>
            <input
              className={styles['modal-content__input']}
              name="artist"
              onChange={handleChange}
              placeholder="Salvador Dalí"
              required
              type="text"
              value={formData.artist}
            />
          </div>
          <div className={styles['form-group']}>
            <label className={styles['form-group__label']} htmlFor="type">
              Type
            </label>
            <Dropdown
              onSelect={handleTypeSelect}
              options={getOptions(ArtWorkType)}
              placeholder="Painting"
              selected={formData.type}
            />
          </div>
          <div className={styles['form-group']}>
            <label className={styles['form-group__label']} htmlFor="price">
              Price
            </label>
            <NumericFormat
              className={styles['modal-content__input']}
              decimalScale={2}
              onValueChange={handlePriceChange}
              placeholder="5000$"
              suffix="$"
              thousandSeparator
              value={formData.price}
            />
          </div>
          <div
            className={`${styles['form-group']} ${styles['form-group--checkbox']}`}
          >
            <label
              className={styles['form-group__label']}
              htmlFor="availability"
            >
              Available
            </label>
            <Checkbox
              isChecked={!!formData.availability}
              onChange={handleAvailabilityChange}
            />
          </div>
          <div className={styles['modal-buttons']}>
            <Button type="submit">Add</Button>
            <Button onClick={onClose} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { ArtWorkModal };
