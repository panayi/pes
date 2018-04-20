import * as R from 'ramda';
import * as functions from 'firebase-functions';
import * as storageService from '@pesposa/core/src/services/storage';
import * as imageService from '@pesposa/core/src/services/image';

const AUTO_ORIENTED_FLAG = 'autoOriented';

const autoOrientImage = async object => {
  const filePath = object.name;
  const contentType = object.contentType;
  const metadata = object.metadata;
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

export const processImage = functions.storage
  .object()
  .onFinalize(autoOrientImage);
