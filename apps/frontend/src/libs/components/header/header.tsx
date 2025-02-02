import logoSrc from '~/assets/images/logo.svg';

import styles from './styles.module.css';

const Header = (): JSX.Element => {
  return (
    <header className={styles['header']}>
      <img alt="GitFit logo" className={styles['logo-img']} src={logoSrc} />
      <p className={styles['logo-text']}>ArtGalleryManager</p>
    </header>
  );
};

export { Header };
