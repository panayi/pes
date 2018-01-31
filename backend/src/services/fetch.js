import * as R from 'ramda';
import fetch from 'node-fetch';
import HttpStatus from 'http-status-codes';
import * as imagesConfig from 'frontend/config/images';
import * as filetypesUtils from 'frontend/utils/filetypes';

const acceptedImageMimeTypes = filetypesUtils.mimeFor(
  imagesConfig.ACCEPTED_TYPES,
);

export const getImage = async url => {
  const response = await fetch(url);
  if (!R.equals(response.status, HttpStatus.OK)) {
    throw new Error(`Image fetch failed with status ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (!R.contains(contentType, acceptedImageMimeTypes)) {
    throw new Error(
      `Content type (${contentType}), is not an accepted image mime type (${R.join(
        ', ',
        acceptedImageMimeTypes,
      )})`,
    );
  }

  const buffer = await response.buffer();
  return { buffer, contentType };
};
