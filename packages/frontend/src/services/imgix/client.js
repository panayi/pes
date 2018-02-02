import ImgixClient from 'imgix-core-js';

const host = process.env.REACT_APP_IMGIX_HOST;

export default new ImgixClient({
  host,
});
