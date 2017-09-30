import buildPalette from './helpers/buildPalette';

const BASE_COLOR = '#DF068C';

export default {
  breakpoints: [
    32,
    48,
    64,
    80,
    100,
    120,
    140,
    160,
    180,
    200,
    220,
    240,
    260,
    280,
    300,
  ],
  space: [
    0,
    4,
    8,
    16,
    32,
    64,
    128,
  ],
  fontSizes: [
    12,
    14,
    16,
    20,
    24,
    32,
    48,
    64,
    72,
    96,
  ],
  weights: [
    400,
    700,
  ],
  colors: {
    ...buildPalette(BASE_COLOR),
    black: '#000',
    white: '#fff',
  },
  radius: 4,
  font: '-apple-system, BlinkMacSystemFont, sans-serif',
  monospace: '"SF Mono", "Roboto Mono", Menlo, monospace',
};
