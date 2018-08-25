import createApp from '@anatomic/app';

import defer from 'p-defer';
import delay from 'delay';

import pluginEvents from '..';

describe('@anatomic/plugin-events', () => {
  describe('on() / emit()', () => {
    it('should emit event', () => {
      const app = createApp().use(pluginEvents);
      const listener = jest.fn();
      app.on('eventName', listener);
      app.emit('eventName', 'Hello World!');
      expect(listener).toHaveBeenCalledWith('Hello World!');
    });
  });

  describe('on() / emitAsync()', () => {
    it('should emit async event', async () => {
      const app = createApp().use(pluginEvents);
      const deferred = defer();
      app.on('eventName', () => deferred.promise);
      let callback = false;
      app.emitAsync('eventName', 'Hello World!').then(() => {
        callback = true;
      });
      expect(callback).toBe(false);
      deferred.resolve();
      await delay(10);
      expect(callback).toBe(true);
    });
  });

  describe('off()', () => {
    it('should unsubscribe from events', () => {
      const app = createApp().use(pluginEvents);
      const listener = jest.fn();
      app.on('eventName', listener);
      app.emit('eventName', 'Hello World!');
      app.off('eventName', listener);
      app.emit('eventName', 'Hello World!');
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('once()', () => {
    it('should have tests', () => {
      const app = createApp().use(pluginEvents);
      const listener = jest.fn();
      app.once('eventName', listener);
      app.emit('eventName', 'Hello World!');
      app.emit('eventName', 'Hello World!');
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('onceThen()', () => {
    it('should listen once and resolve as promise', async () => {
      const app = createApp().use(pluginEvents);
      let callback = 0;
      app.onceThen('eventName').then(() => {
        callback += 1;
      });
      await app.emitAsync('eventName');
      await app.emitAsync('eventName');
      expect(callback).toBe(1);
    });
  });
});
