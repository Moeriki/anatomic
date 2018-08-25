import createApp from '@anatomic/app-core';

const app = createApp();

app
  .set({
    boot() {
      console.log('Demo booted');
    },
  })
  .once('boot', () => {
    const { boot } = app.get();
    boot();
  })
  .emit('boot');
