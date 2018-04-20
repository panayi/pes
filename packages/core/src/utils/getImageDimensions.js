import requestImageSize from 'request-image-size';

const getImageDimensions = imageUrl => requestImageSize(imageUrl);

export default getImageDimensions;
