import logoSrc from '~/assets/images/logo.svg';

import styles from './styles.module.css';

const Header = (): JSX.Element => {
  return (
    <header className={styles['header']}>
      <img alt="GitFit logo" className={styles['logo-img']} src={logoSrc} />
      <h1 className={styles['logo-text']}>ArtGalleryManager</h1>
    </header>
  );
};

export { Header };
