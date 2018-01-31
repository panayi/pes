import * as R from 'ramda';
import { isArray } from 'ramda-adjunct';
import * as filetypes from 'constants/filetypes';

const createMap = getter =>
  R.ifElse(
    isArray,
    R.pipe(R.pick(R.__, filetypes), R.map(getter)),
    R.pipe(R.prop(R.__, filetypes), getter),
  );

export const mimeFor = createMap(R.prop('mime'));

export const extensionFor = createMap(R.prop('extension'));

export const prettyPrintFor = createMap(
  R.pipe(R.prop('extension'), R.concat('.')),
);
