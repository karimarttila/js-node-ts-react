import logger from './logger.mjs';
import { production } from './config.mjs';
import { NotFoundError } from './errors.mjs';
import { validateToken } from '../db/users.mjs';

// ErrorHandler.js
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  logger.debug('Middleware Error Handling triggered');
  const errStatus = err.statusCode || 500;
  const errMsg = production() ? 'Not found' : err.message || 'Something went wrong';
  logger.error(`Error: ${errStatus} - ${errMsg}`);
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: production() ? {} : err.stack,
  });
};

const verifyToken = (req, _res, next) => {
  const token = req.headers['x-token'];
  if (!token) {
    throw new NotFoundError('A token is required for authentication');
  }
  validateToken(token);
  return next();
};

// export default errorHandler;
export { errorHandler, verifyToken };
