import { type ValueOf } from '~/libs/types/types.js';

import { type ArtWorkType } from '../../artwork.js';

type ArtWork = {
  artist: string;
  availability: boolean;
  id: number;
  price: number;
  title: string;
  type: ValueOf<typeof ArtWorkType>;
};

export { type ArtWork };
