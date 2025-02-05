import { type ArtWork, type ArtWorkRequestDto } from './types.js';

type ArtWorkApi = {
  createArtWork: (artWork: ArtWorkRequestDto) => Promise<ArtWork>;
  deleteArtWork: (id: number) => Promise<boolean>;
  getArtWorks: () => Promise<ArtWork[]>;
};

export { type ArtWorkApi };
