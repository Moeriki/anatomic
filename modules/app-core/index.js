import superCreate, { Anatomic } from '@anatomic/app';

import container from '@anatomic/plugin-container';
import events from '@anatomic/plugin-events';

export { Anatomic };

export default (options) =>
  superCreate(options)
    .use(container)
    .use(events);
