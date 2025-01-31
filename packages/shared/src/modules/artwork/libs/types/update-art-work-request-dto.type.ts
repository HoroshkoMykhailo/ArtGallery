import { type ValueOf } from '~/libs/types/types.js';

import { type ArtWorkType } from '../../artwork.js';

type UpdateArtWorkRequestDto = {
  artist?: string;
  availability?: boolean;
  price?: number;
  title?: string;
  type?: ValueOf<typeof ArtWorkType>;
};

export { type UpdateArtWorkRequestDto };
