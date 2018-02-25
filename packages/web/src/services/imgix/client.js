import ImgixClient from 'imgix-core-js';
import { env } from 'pesposa-config';

export default new ImgixClient({
  host: env.imgixHost,
});
