import * as R from 'ramda';
import HttpStatus from 'http-status-codes';

const sendErrorResponse = R.curry((code, res, error) =>
  res.status(code).send({
    error: error || HttpStatus.getStatusText(code),
  }),
);

export const internalServerError = sendErrorResponse(
  HttpStatus.INTERNAL_SERVER_ERROR,
);
export const unauthorized = sendErrorResponse(HttpStatus.FORBIDDEN);
