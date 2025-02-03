import { type ArtWork } from './types.js';

type ArtWorkApi = {
  getArtWorks: () => Promise<ArtWork[]>;
};

export { type ArtWorkApi };
