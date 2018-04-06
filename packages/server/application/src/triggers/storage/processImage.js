import * as R from 'ramda';
import * as functions from 'firebase-functions';
import * as storageService from '@pesposa/server-core/src/services/storage';
import * as imageService from '@pesposa/server-core/src/services/image';

const AUTO_ORIENTED_FLAG = 'autoOriented';

const autoOrientImage = async object => {
  const { name: filePath, contentType, metadata } = object;
  const autoOriented = R.path(['metadata', AUTO_ORIENTED_FLAG], object);

  // Exit if already auto-oriented image
  if (autoOriented) {
    return;
  }

  const buffer = await storageService.readFile(filePath);
  const outputBuffer = await imageService.autoOrient(buffer);

  const finalMetadata = R.merge(metadata, { [AUTO_ORIENTED_FLAG]: true });
  await storageService.writeFile(
    outputBuffer,
    contentType,
    filePath,
    finalMetadata,
  );
};

const processImage = functions.storage.object().onFinalize(autoOrientImage);

export default processImage;
