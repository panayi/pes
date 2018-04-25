import ImgixClient from 'imgix-core-js';
import env from '../../config/env';

export default new ImgixClient({
  host: env.imgixHost,
});
