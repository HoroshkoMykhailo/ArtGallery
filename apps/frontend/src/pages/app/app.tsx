import { Footer, Header } from '~/libs/components/components.js';

import styles from './styles.module.css';

const App = (): JSX.Element => {
  return (
    <div className={styles['app']}>
      <Header />
      <main className={styles['main']}>App</main>
      <Footer />
    </div>
  );
};

export { App };
