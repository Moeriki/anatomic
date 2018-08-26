import superCreate, { Anatomic } from '@anatomic/app';

import config from '@anatomic/plugin-config';
import container from '@anatomic/plugin-container';
import events from '@anatomic/plugin-events';

export { Anatomic };

export default (options) =>
  superCreate(options)
    .use(config)
    .use(container)
    .use(events);
