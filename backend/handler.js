'use strict';

// See: https://www.serverless.com/plugins/serverless-http
const serverlessFramework = import('serverless-http');
const application = import('./app.js');
import { logger } from './src/util/logger.js';

const serverlessApp = async (event, context) => {
  // For debugging:
  //console.log("event: ", event);
  //console.log("context: ", context);
  const { default: serverless } = await serverlessFramework;
  const { app } = await application;
  const result = await serverless(app)(event, context);
  // For debugging:
  //logger.info(`serverlessApp: result: ${JSON.stringify(result)}`);

  return result;
};

module.exports.handler = serverlessApp;
