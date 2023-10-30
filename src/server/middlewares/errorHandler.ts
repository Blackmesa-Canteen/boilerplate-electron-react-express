import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode, sendResponse } from '../utils/responseHelper';
import logger from '../../main/logger';

/**
 * Error handler middleware
 * @param err error object
 * @param req request object
 * @param res response object
 * @param next next function
 * @returns void
 * @author Shawn
 */
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Log the error
  logger.error(`Error occurred on ${req.method} ${req.path} - ${err.message}`);

  // Check if response headers were already sent
  if (res.headersSent) {
    return next(err);
  }

  // Send the error response using your helper function
  return sendResponse(res, {
    code: HttpStatusCode.INTERNAL_SERVER,
    error: err,
  });
}

export default errorHandler;
