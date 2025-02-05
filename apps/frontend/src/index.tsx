import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '~/assets/css/styles.css';

import { App } from './pages/app/app.js';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
