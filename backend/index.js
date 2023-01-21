import application from './app.mjs';
// import logger from './src/util/logger.mjs';

const serverlessFramework = import('serverless-http');

// See: https://www.serverless.com/plugins/serverless-http
const handler = async (event, context) => {
  // For debugging:
  // console.log("event: ", event);
  // console.log("context: ", context);
  const { default: serverless } = await serverlessFramework;
  // This is not needed (at least the linter says so)?
  const app = await application;
  const result = await serverless(app)(event, context);
  // For debugging:
  // logger.debug(`handler: result: ${JSON.stringify(result)}`);

  return result;
};

export default handler;
