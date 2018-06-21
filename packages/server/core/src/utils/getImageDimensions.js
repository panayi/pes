import * as R from 'ramda';
import requestImageSize from 'request-image-size';

const getImageDimensions = async imageUrl => {
  const result = await requestImageSize(imageUrl);
  return R.omit(['downloaded'], result);
};

export default getImageDimensions;
