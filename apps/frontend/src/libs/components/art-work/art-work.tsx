import { DEFAULT_IMAGE } from '~/libs/common/constants.js';
import { ENV } from '~/libs/enums/enums.js';
import { getRandomShadowColor } from '~/libs/helpers/helpers.js';
import { type ArtWork as TArtWork } from '~/libs/modules/artwork/types/types.js';

import styles from './styles.module.css';

type Properties = {
  artWork: TArtWork;
};

const ArtWork = ({ artWork }: Properties): JSX.Element => {
  const image = artWork.image ?? DEFAULT_IMAGE;
  const boxShadowColor = getRandomShadowColor();

  return (
    <div
      className={styles['art-work']}
      style={{ boxShadow: `0 1px 5px ${boxShadowColor}` }}
    >
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
          <p className={styles['art-work__artist']}>By: {artWork.artist}</p>
        </div>
        <h3 className={styles['art-work__price']}>${artWork.price}</h3>
      </div>
    </div>
  );
};

export { ArtWork };
