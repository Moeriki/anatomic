import createApp from '@anatomic/app';
import pluginContainer from '@anatomic/plugin-container';

import pluginLogger from '..';

describe('@anatomic/plugin-logger', () => {
  it('should expose logger in container when loaded after', () => {
    const app = createApp()
      .use(pluginContainer)
      .use(pluginLogger);
    expect(app.get('logger')).not.toBeUndefined();
  });

  it('should expose logger in container when loaded before', () => {
    const app = createApp()
      .use(pluginLogger)
      .use(pluginContainer);
    expect(app.get('logger')).not.toBeUndefined();
  });

  it('should expose logger in namespace', () => {
    const app = createApp().use(pluginLogger);
    expect(app.plugin).toHaveProperty('$logger.logger');
  });
});
