import { set } from '@anatomic/utils';
import pino from 'pino';

const NAMESPACE = '$logger';

export const createLogger = pino;

export default (app) => {
  const logger = createLogger(app.options.logger);

  app.plugin[NAMESPACE] = { logger };

  set('$container.container.logger', logger, app.plugin);
};
