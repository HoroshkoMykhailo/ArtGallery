import { Icon } from '~/libs/components/components.js';
import { type IconName } from '~/libs/types/types.js';

import styles from './styles.module.css';

type Properties = {
  name: IconName;
};

const FooterIcon = ({ name }: Properties): JSX.Element => {
  return (
    <a
      className={styles['footer__link']}
      href="https://github.com/HoroshkoMykhailo/ArtGallery"
    >
      <Icon height={16} name={name} width={16} />
    </a>
  );
};

export { FooterIcon };
