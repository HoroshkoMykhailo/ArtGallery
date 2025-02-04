import { APIPath } from '~/libs/enums/enums.js';

import { axiosInstance as httpApi } from '../api/axios-instance.js';
import { ArtWork as ArtWorkApi } from './artwork-api.js';

const artWorkApi = new ArtWorkApi({
  apiPath: APIPath.ARTWORKS,
  httpApi
});

export { artWorkApi };
export {
  type ArtWork,
  type ArtWorkQuery,
  ArtWorkType,
  SortOrder
} from './libs/types/types.js';
