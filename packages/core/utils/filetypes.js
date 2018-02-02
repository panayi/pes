import * as R from 'ramda';
import { isArray } from 'ramda-adjunct';
import * as filetypes from '../constants/filetypes';

const createMap = getter =>
  R.ifElse(
    isArray,
    R.pipe(R.pick(R.__, filetypes), R.map(getter)),
    R.pipe(R.prop(R.__, filetypes), getter),
  );

const mimeFor = createMap(R.prop('mime'));

const extensionFor = createMap(R.prop('extension'));

const prettyPrintFor = createMap(R.pipe(R.prop('extension'), R.concat('.')));

export default {
  mimeFor,
  extensionFor,
  prettyPrintFor,
};
