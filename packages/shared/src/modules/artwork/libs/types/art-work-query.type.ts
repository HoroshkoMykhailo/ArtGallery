import { type SortOrder } from '~/libs/enum/sort-order.enum.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type ArtWorkType } from '../enums/art-work-type.enum.js';

type ArtWorkQuery = {
  artist?: string;
  price?: ValueOf<typeof SortOrder>;
  title?: string;
  type?: ValueOf<typeof ArtWorkType>;
};

export { type ArtWorkQuery };
