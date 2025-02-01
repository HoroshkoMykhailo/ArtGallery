import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
  <StrictMode>
    <h1>ArtGallery</h1>
  </StrictMode>
);
