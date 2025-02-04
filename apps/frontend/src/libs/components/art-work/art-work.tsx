import {
  DEFAULT_IMAGE,
  ONE_VALUE,
  ZERO_VALUE
} from '~/libs/common/constants.js';
import { ENV } from '~/libs/enums/enums.js';
import { getRandomShadowColor } from '~/libs/helpers/helpers.js';
import { type ArtWork as TArtWork } from '~/libs/modules/artwork/artwork.js';

import { Icon } from '../components.js';
import styles from './styles.module.css';

type Properties = {
  artWork: TArtWork;
  isRemoving: boolean;
  selectedId: null | number;
};

const ArtWork = ({
  artWork,
  isRemoving,
  selectedId
}: Properties): JSX.Element => {
  const image = artWork.image ?? DEFAULT_IMAGE;
  const isSelected = selectedId === artWork.id;
  const availableClass = artWork.availability
    ? styles['available']
    : styles['not-available'];
  const boxShadowColor = getRandomShadowColor();
  const removeClass = isRemoving ? styles['art-work__remove'] : '';
  const selectedClass = isSelected ? styles['art-work__selected'] : '';

  return (
    <div
      className={`${styles['art-work']} ${removeClass} ${selectedClass}`}
      data-artwork-id={artWork.id}
      style={{ boxShadow: isSelected ? 'none' : `0 1px 5px ${boxShadowColor}` }}
    >
      {isSelected && (
        <div className={styles['art-work__trash-icon']}>
          <Icon height={48} name="trash" width={48} />
        </div>
      )}
      <div className={styles['art-work__img-wrapper']}>
        <img
          alt={artWork.title}
          className={styles['art-work__img']}
          src={`${ENV.SERVER_URL}${image}`}
        />
      </div>
      <div className={styles['art-work__body']}>
        <div className={styles['art-work__info']}>
          <h3 className={styles['art-work__title']}>{artWork.title}</h3>
          <p className={styles['art-work__artist']}>
            {artWork.type.charAt(ZERO_VALUE).toUpperCase() +
              artWork.type.slice(ONE_VALUE)}{' '}
            By: {artWork.artist}
          </p>
        </div>
        <div className={styles['art-work__right']}>
          <h3 className={styles['art-work__price']}>${artWork.price}</h3>
          <p
            className={`${styles['art-work__availability']} ${availableClass}`}
          >
            {artWork.availability ? 'Available' : 'Not Available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export { ArtWork };
