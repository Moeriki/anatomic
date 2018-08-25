import createApp from '@anatomic/app-core';

const app = createApp();

app.on('test-event', () => {
  console.log('OK');
});

app.emit('test-event');
