import { type ArtWork } from './types.js';

type ArtWorkApi = {
  deleteArtWork: (id: number) => Promise<boolean>;
  getArtWorks: () => Promise<ArtWork[]>;
};

export { type ArtWorkApi };
