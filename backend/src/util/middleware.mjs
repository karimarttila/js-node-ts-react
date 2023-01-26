import logger from './logger.mjs';
import { production } from './config.mjs';
import { NotFoundError } from './errors.mjs';

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

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-token'];

  if (!token) {
    throw new NotFoundError('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

export default { errorHandler, verifyToken };
