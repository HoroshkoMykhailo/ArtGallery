import { type ArtWorkQuery } from '../types/types.js';

const toQueryParameters = (query: ArtWorkQuery): string => {
  const parameters = new URLSearchParams();

  if (query.artist) {
    parameters.append('artist', query.artist);
  }

  if (query.price) {
    parameters.append('price', query.price);
  }

  if (query.title) {
    parameters.append('title', query.title);
  }

  if (query.type) {
    parameters.append('type', query.type);
  }

  return parameters.toString();
};

export { toQueryParameters };
