import { type FC } from 'react';

import Arrow from '~/assets/images/icons/arrow.svg?react';
import Facebook from '~/assets/images/icons/facebook.svg?react';
import Instagram from '~/assets/images/icons/instagram.svg?react';
import Twitter from '~/assets/images/icons/twitter.svg?react';
import { type IconName } from '~/libs/types/types.js';

const iconNameToSvg: Record<IconName, FC<React.SVGProps<SVGSVGElement>>> = {
  arrow: Arrow,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter
};

export { iconNameToSvg };
