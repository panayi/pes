import imageSize from 'image-size';
import https from 'https';
import url from 'url';

const getImageDimensions = imageUrl => {
  const options = url.parse(imageUrl);

  return new Promise(resolve => {
    https.get(options, response => {
      const chunks = [];

      response
        .on('data', chunk => {
          chunks.push(chunk);
        })
        .on('end', () => {
          const buffer = Buffer.concat(chunks);
          resolve(imageSize(buffer));
        });
    });
  });
};

export default getImageDimensions;
