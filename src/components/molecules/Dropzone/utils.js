import * as R from 'ramda';
import * as fileTypes from './constants/fileTypes';

const fileTypesInfo = {
  [fileTypes.JPEG]: {
    mimeType: 'image/jpeg',
    prettyPrint: '.jpg',
  },
  [fileTypes.PNG]: {
    mimeType: 'image/png',
    prettyPrint: '.png',
  },
  [fileTypes.GIF]: {
    mimeType: 'image/gif',
    prettyPrint: '.gif',
  },
};

// getMimeTypes :: [FileType] | Nil -> FileTypeInfos
//   FileTypeInfos = { mimeType, prettyPrint }
const getFileTypesInfo = R.compose(
  R.pick(R.__, fileTypesInfo),
  R.defaultTo([]),
);

// getMimeTypes :: [FileType] -> [String]
//   FileType = String
export const getMimeTypes = R.compose(
  R.pluck('mimeType'),
  R.values,
  getFileTypesInfo,
);

// getAccept :: [FileType] -> String
export const getAccept = R.compose(R.join(','), getMimeTypes);

// getPrettyPrintFileTypes :: [FileType] -> String
export const getPrettyPrintFileTypes = R.compose(
  R.join(', '),
  R.values,
  R.pluck('prettyPrint'),
  getFileTypesInfo,
);
