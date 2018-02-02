import * as R from 'ramda';
import { isArray } from 'ramda-adjunct';

export const JPEG = 'jpeg';
export const PNG = 'png';
export const GIF = 'gif';

export const FILETYPES = {
  [JPEG]: {
    mimeType: 'image/jpeg',
    prettyPrint: '.jpg',
  },
  [PNG]: {
    mimeType: 'image/png',
    prettyPrint: '.png',
  },
  [PNG]: {
    mimeType: 'image/gif',
    prettyPrint: '.gif',
  },
};

const createMap = getter =>
  R.ifElse(
    isArray,
    R.pipe(R.pick(R.__, FILETYPES), R.map(getter)),
    R.pipe(R.prop(R.__, FILETYPES), getter),
  );

const mimeFor = createMap(R.prop('mime'));

const extensionFor = createMap(R.prop('extension'));

const prettyPrintFor = createMap(R.pipe(R.prop('extension'), R.concat('.')));

export default {
  mimeFor,
  extensionFor,
  prettyPrintFor,
};
