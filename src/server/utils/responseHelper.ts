import { Response } from 'express';
import logger from '../../main/logger';

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

interface SendResponseProps {
  message?: string;
  data?: any;
  error?: Error;
  code?: HttpStatusCode;
}

export const sendResponse = (
  res: Response,
  { message, data, error, code }: SendResponseProps,
): void => {
  const success = !error;
  const statusCode = error
    ? code || HttpStatusCode.INTERNAL_SERVER
    : code || HttpStatusCode.OK;
  const responseMessage = message || (error ? 'An error occurred' : '');

  if (error) {
    logger.error(`Error: ${error.message}, Status Code: ${statusCode}`);
  } else {
    logger.info(
      `Response Status Code: ${statusCode}, Message: ${responseMessage}`,
    );
  }

  res.status(statusCode).json({
    success,
    message: responseMessage,
    data: success ? data : undefined,
  });
};
