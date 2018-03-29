import HttpStatus from 'http-status-codes';

const sendErrorResponse = (code, res, error) =>
  res.status(code).send({
    error: error || HttpStatus.getStatusText(code),
  });

export const internalServerError = (res, error) =>
  sendErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, res, error);
export const unauthorized = (res, error) =>
  sendErrorResponse(HttpStatus.FORBIDDEN, res, error);
