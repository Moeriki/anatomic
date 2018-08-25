import superCreate, { Anatomic } from '@anatomic/app';

import events from '@anatomic/plugin-events';

export { Anatomic };

export default (options) => superCreate(options).use(events);
