import createApp from '@anatomic/app-core';

const app = createApp();

app
  .once('started', ({ logger }) => {
    logger.info('App started!');
  })
  .emit('started', app.get());
