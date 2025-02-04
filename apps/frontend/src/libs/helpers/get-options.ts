import { type Option } from '~/libs/types/types.js';

import { ONE_VALUE, ZERO_VALUE } from '../common/constants.js';

const getOptions = <T extends Record<string, string>>(
  enumObject: T
): Option[] =>
  Object.entries(enumObject).map(([key, value]) => ({
    label:
      key.charAt(ZERO_VALUE).toUpperCase() + key.slice(ONE_VALUE).toLowerCase(),
    value
  }));

export { getOptions };
