import { ArtWorkModal, Footer, Header } from '~/libs/components/components.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';

import { Main } from '../main/main.js';
import styles from './styles.module.css';

const App = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className={styles['app']}>
      <Header />
      <Main onOpenModal={openModal} />
      <Footer />
      {isModalOpen && <ArtWorkModal onClose={closeModal} />}
    </div>
  );
};

export { App };
