import ImgixClient from 'imgix-core-js';
import env from '@pesposa/core/src/config/env';

export default new ImgixClient({
  host: env.imgixHost,
});
