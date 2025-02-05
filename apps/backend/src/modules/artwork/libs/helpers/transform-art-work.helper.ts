import { type ArtWork as ArtWorkEntity } from '../../artwork.entity.js';
import { type ArtWork } from '../types/types.js';

const transformArtWork = (entity: ArtWorkEntity): ArtWork => {
  const { artist, availability, id, image, price, title, type } = entity;
  const artWork: ArtWork = {
    artist,
    availability,
    id,
    price,
    title,
    type
  };

  if (image) {
    artWork.image = image;
  }

  return artWork;
};

export { transformArtWork };
