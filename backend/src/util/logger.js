import { createSimpleLogger} from 'simple-node-logger';

const simpleNodeLoggerOpts = {
  logFilePath: 'logs/backend.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};

const logLevel = process.env.LOG_LEVEL || 'debug';

function initLogger() {
  console.log(`simpleNodeLoggerOpts ${JSON.stringify(simpleNodeLoggerOpts)}`);
  const myLogger = createSimpleLogger(simpleNodeLoggerOpts);
  myLogger.setLevel(logLevel);
  myLogger.info(`logger: Logger set to ${logLevel}`);
  return myLogger;
}

const logger = initLogger();

export { logger };
