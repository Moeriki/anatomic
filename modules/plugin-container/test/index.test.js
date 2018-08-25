import createApp from '@anatomic/app';

import pluginContainer from '..';

describe('@anatomic/plugin-container', () => {
  let app;

  beforeEach(() => {
    app = createApp().use(pluginContainer);
  });

  describe('apply()', () => {
    it('should run function with dependencies', () => {
      app.plugin.$container.container = { one: 1, two: 2 };
      expect(app.apply((one, two) => one + two)).toBe(3);
    });
  });

  describe('get()', () => {
    it('should get dependencies', () => {
      app.plugin.$container.container = { one: 1, two: 2 };
      expect(app.get('one')).toBe(1);
      expect(app.get('two')).toBe(2);
    });

    it('should get dependencies through destructuring', () => {
      app.plugin.$container.container = { one: 1, two: 2 };
      const { one, two } = app.get();
      expect(one).toBe(1);
      expect(two).toBe(2);
    });

    it('should return undefined', () => {
      expect(app.get('one')).toBe(undefined);
    });
  });

  describe('register()', () => {
    it('should register lazy factory', () => {
      const factory = jest.fn();
      app.register('my-factory', factory);
      expect(factory).not.toHaveBeenCalled();
      app.get('my-factory');
      expect(factory).toHaveBeenCalled();
    });
  });

  describe('run()', () => {
    it('should run function with dependencies', () => {
      app.plugin.$container.container = { one: 1, two: 2 };
      app.run((one, two) => {
        expect(one).toBe(1);
        expect(two).toBe(2);
      });
      expect.assertions(2);
    });
  });

  describe('set()', () => {
    it('should set dependencies', () => {
      app.set({ one: 1, two: 2 });
      const { one, two } = app.plugin.$container.container;
      expect(one).toBe(1);
      expect(two).toBe(2);
    });
  });
});
