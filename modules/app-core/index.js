import superCreate, { Anatomic } from '@anatomic/app';

import config from '@anatomic/plugin-config';
import container from '@anatomic/plugin-container';
import events from '@anatomic/plugin-events';
import logger from '@anatomic/plugin-logger';
import glob from '@anatomic/plugin-glob';

export { Anatomic };

export default (options) =>
  superCreate(options)
    .use(config)
    .use(container)
    .use(events)
    .use(glob)
    .use(logger);
