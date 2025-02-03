import { Footer, Header } from '~/libs/components/components.js';

import { Main } from '../main/main.js';
import styles from './styles.module.css';

const App = (): JSX.Element => {
  return (
    <div className={styles['app']}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export { App };
