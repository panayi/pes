import gm from 'gm';

const imageMagick = gm.subClass({ imageMagick: true });

export const autoOrient = buffer =>
  new Promise((resolve, reject) => {
    imageMagick(buffer)
      .autoOrient()
      .toBuffer((error, outputBuffer) => {
        if (error) {
          reject(error);
        } else {
          resolve(outputBuffer);
        }
      });
  });
