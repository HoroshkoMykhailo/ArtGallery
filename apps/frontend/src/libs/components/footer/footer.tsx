import { FooterIcon } from './libs/components/components.js';
import styles from './styles.module.css';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__left']}>
        <h1 className={styles['footer__title']}>ArtGalleryManager</h1>
        <p>Your go-to platform for managing and exploring art pieces.</p>
      </div>
      <div className={styles['footer__right']}>
        <FooterIcon name="facebook" />
        <FooterIcon name="twitter" />
        <FooterIcon name="instagram" />
      </div>
    </footer>
  );
};

export { Footer };
