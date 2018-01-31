import * as R from 'ramda';
import fetch from 'node-fetch';
import HttpStatus from 'http-status-codes';

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export const getImage = async url => {
  const response = await fetch(url);
  if (!R.equals(response.status, HttpStatus.OK)) {
    throw new Error(`Image fetch failed with status ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (!R.contains(contentType, IMAGE_TYPES)) {
    throw new Error(
      `Content type is ${contentType}, but an image was expected`,
    );
  }

  const buffer = await response.buffer();
  return { buffer, contentType };
};
