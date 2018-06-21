import { buildUrl } from '@pesposa/core/src/services/imgix';

export const LOGO_URL = buildUrl('uploads/rlogo.png', {
  auto: ['compress', 'format'],
  w: 140,
});
