import * as R from 'ramda';

const JPEG = 'jpeg';
const PNG = 'png';
const GIF = 'gif';

const typeKeys = {
  jpeg: JPEG,
  png: PNG,
  gif: GIF,
};

const types = {
  [JPEG]: {
    mimeType: 'image/jpeg',
    prettyPrint: '.jpg',
  },
  [PNG]: {
    mimeType: 'image/png',
    prettyPrint: '.png',
  },
  [GIF]: {
    mimeType: 'image/gif',
    prettyPrint: '.gif',
  },
};

const createMap = getter =>
  R.compose(R.values, R.map(getter), R.pick(R.__, types));

const mimeFor = createMap(R.prop('mimeType'));

const acceptFor = R.compose(R.join(','), mimeFor);

const extensionFor = createMap(R.prop('extension'));

const prettyPrintFor = createMap(R.pipe(R.prop('extension'), R.concat('.')));

const files = {
  typeKeys,
  types,
  acceptFor,
  mimeFor,
  extensionFor,
  prettyPrintFor,
};

export default files;
