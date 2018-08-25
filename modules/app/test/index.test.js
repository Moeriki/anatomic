import createApp, { Anatomic } from '..';

const { NODE_ENV } = process.env;

describe('@anatomic/app', () => {
  describe('createApp()', () => {
    it('should set env to lowercase NODE_ENV', () => {
      process.env.NODE_ENV = 'DEVELOPMENT';
      const app = createApp();
      expect(app.env).toBe('development');
    });

    it('should default env to "development"', () => {
      delete process.env.NODE_ENV;
      const app = createApp();
      expect(app.env).toBe('development');
    });

    it('should have default options', () => {
      const app = createApp();
      expect(app.options).toEqual({});
    });

    it('should set options', () => {
      const options = {};
      const app = createApp(options);
      expect(app.options).toBe(options);
    });

    it('should create empty namespace for plugins', () => {
      const app = createApp();
      expect(app.plugin).toEqual({});
    });

    describe('app.extend()', () => {
      it('should extend app', () => {
        const app = createApp();
        const fun1 = jest.fn();
        const fun2 = jest.fn();
        app.extend({ fun1, fun2 });
        expect(Anatomic).not.toHaveProperty('fun1');
        expect(Anatomic).not.toHaveProperty('fun2');
        expect(app).toHaveProperty('fun1');
        expect(app).toHaveProperty('fun2');
        app.fun1();
        app.fun2();
        expect(fun1).toHaveBeenCalledTimes(1);
        expect(fun2).toHaveBeenCalledTimes(1);
      });

      it('should create app extensions ', () => {
        const app = createApp();
        const fun1 = () => {};
        const fun2 = () => {};
        app.extend({ fun: fun1 });
        expect(Object.getOwnPropertyDescriptor(app, 'fun')).toMatchObject({
          configurable: false,
          enumerable: true,
          writable: false,
        });
        expect(() => app.extend({ fun: fun2 })).toThrowError(
          /Cannot redefine property/,
        );
      });
    });

    describe('app.use()', () => {
      it('should call plugins with app', () => {
        const app = createApp();
        const plugin = jest.fn();
        app.use(plugin);
        expect(plugin).toHaveBeenCalledWith(app);
      });

      it('should return app', () => {
        const app = createApp();
        expect(app.use(() => {})).toBe(app);
      });
    });
  });

  describe('Anatomic', () => {
    describe('Anatomic.extend()', () => {
      it('should extend Anatomic', () => {
        const app = createApp();
        const fun1 = jest.fn();
        const fun2 = jest.fn();
        Anatomic.extend({ fun1, fun2 });
        expect(Anatomic).toHaveProperty('fun1');
        expect(Anatomic).toHaveProperty('fun2');
        expect(app).not.toHaveProperty('fun1');
        expect(app).not.toHaveProperty('fun2');
        app.fun1();
        app.fun2();
        expect(fun1).toHaveBeenCalledTimes(1);
        expect(fun2).toHaveBeenCalledTimes(1);
      });
    });

    describe('Anatomic.use()', () => {
      it('should call plugins with Anatomic', () => {
        const plugin = jest.fn();
        Anatomic.use(plugin);
        expect(plugin).toHaveBeenCalledWith(Anatomic);
      });

      it('should return Anatomic', () => {
        expect(Anatomic.use(() => {})).toBe(Anatomic);
      });
    });
  });

  afterAll(() => {
    process.env.NODE_ENV = NODE_ENV;
  });
});
