import express from 'express';
import router from './src/routing/router.mjs';
import errorHandler from './src/util/middleware.mjs';

const application = express();

application.use(router);
// Error handler middleware.
application.use(errorHandler);

export default application;
