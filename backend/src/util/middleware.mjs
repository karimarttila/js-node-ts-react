import logger from './logger.mjs';
import { production } from './config.mjs';

// ErrorHandler.js
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  logger.debug('Middleware Error Hadnling triggered');
  const errStatus = err.statusCode || 500;
  const errMsg = production() ? 'Not found' : err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: production() ? {} : err.stack,
  });
};

export default errorHandler;
