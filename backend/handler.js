'use strict';

// See: https://www.serverless.com/plugins/serverless-http
const serverlessFramework = import('serverless-http');
const application = import('./app.js');

const serverlessApp = async (event, context) => {
  // For debugging:
  //console.log("event: ", event);
  //console.log("context: ", context);
  const { default: serverless } = await serverlessFramework;
  const { app } = await application;
  const result = await serverless(app)(event, context);
  return result;
};

module.exports.handler = serverlessApp;
