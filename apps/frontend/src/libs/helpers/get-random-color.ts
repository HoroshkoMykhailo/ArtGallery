import { MAX_HUE } from '../common/constants.js';

const getRandomShadowColor = (): string => {
  const hue = Math.floor(Math.random() * MAX_HUE);

  return `hsl(${hue}, 70%, 50%)`;
};

export { getRandomShadowColor };
