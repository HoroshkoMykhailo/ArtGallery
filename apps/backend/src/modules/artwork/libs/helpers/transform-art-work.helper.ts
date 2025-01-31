import { type ArtWork as ArtWorkEntity } from '../../artwork.entity.js';
import { type ArtWork } from '../types/types.js';

const transformArtWork = (entity: ArtWorkEntity): ArtWork => {
  const { artist, availability, id, image, price, title, type } = entity;
  const artWork: ArtWork = { id: id.toString() };

  if (image) {
    artWork.image = image;
  }

  if (title) {
    artWork.title = title;
  }

  if (artist) {
    artWork.artist = artist;
  }

  if (type) {
    artWork.type = type;
  }

  if (price) {
    artWork.price = price;
  }

  if (availability) {
    artWork.availability = availability;
  }

  return artWork;
};

export { transformArtWork };
