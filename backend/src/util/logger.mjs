import pkg from 'simple-node-logger';
// Not working when using Node Run and Debug REPL.
// import { createSimpleLogger } from 'simple-node-logger';
const { createSimpleLogger } = pkg;

const simpleNodeLoggerOpts = {
  logFilePath: 'logs/backend.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};

const logLevel = process.env.LOG_LEVEL || 'debug';

function initLogger() {
  // eslint-disable-next-line
  console.log(`simpleNodeLoggerOpts ${JSON.stringify(simpleNodeLoggerOpts)}`);
  const myLogger = createSimpleLogger(simpleNodeLoggerOpts);
  myLogger.setLevel(logLevel);
  myLogger.info(`logger: Logger set to ${logLevel}`);
  return myLogger;
}

const logger = initLogger();

export default logger;
