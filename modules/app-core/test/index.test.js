import createApp from '..';

import pluginEvents from '@anatomic/plugin-events';

jest.mock('@anatomic/plugin-events');

describe('@anatomic/app-core', () => {
  it('should load core plugins', () => {
    const app = createApp();
    expect(pluginEvents).toHaveBeenCalledWith(app);
  });
});
