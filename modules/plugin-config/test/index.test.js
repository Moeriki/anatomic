import createApp from '@anatomic/app';

import pluginConfig, { Options } from '..';

describe('@anatomic/plugin-config', () => {
  it('should set options prototype', () => {
    const app = createApp().use(pluginConfig);
    expect(app.options).toBeInstanceOf(Options);
  });

  describe('constructor', () => {
    it('should assign options', () => {
      const options = new Options({ key: 'my-value' });
      expect(options).toHaveProperty('key', 'my-value');
    });
  });

  describe('defaults()', () => {
    it('should set defaults without modifying objects', () => {
      const source = { key2: 'my-value-2', key3: 'my-value-3' };
      const defaults = {
        key1: 'my-default-value-1',
        key2: 'my-default-value-2',
      };
      const result = new Options(source).defaults(defaults);
      expect(source).toEqual({ key2: 'my-value-2', key3: 'my-value-3' });
      expect(defaults).toEqual({
        key1: 'my-default-value-1',
        key2: 'my-default-value-2',
      });
      expect(result).toEqual({
        key1: 'my-default-value-1',
        key2: 'my-value-2',
        key3: 'my-value-3',
      });
    });
  });

  describe('get()', () => {
    it('should get array path', () => {
      const options = new Options({ key: { nested: 'my-value' } });
      expect(options.get('key.nested')).toBe('my-value');
    });

    it('should get string path', () => {
      const options = new Options({ key: { nested: 'my-value' } });
      expect(options.get(['key', 'nested'])).toBe('my-value');
    });

    it('should get unknown path', () => {
      const options = new Options();
      expect(options.get('nested.path')).toBe(undefined);
    });

    it('should get object as Options instance', () => {
      const options = new Options({ key: { nested: 'my-value' } });
      const key = options.get('key');
      expect(key).toHaveProperty('nested', 'my-value');
      expect(key).toBeInstanceOf(Options);
    });
  });

  describe('merge()', () => {
    it('should merge without modifying objects', () => {
      const options = new Options({ key1: 'my-value-1' });
      const source = { key2: 'my-value-2' };
      const result = options.merge(source);
      expect(options).toEqual({ key1: 'my-value-1' });
      expect(source).toEqual({ key2: 'my-value-2' });
      expect(result).toEqual({ key1: 'my-value-1', key2: 'my-value-2' });
    });

    it('should not merge arrays', () => {
      const result = new Options({ key: [1, 2] }).merge({ key: [2, 3] });
      expect(result).toEqual({ key: [2, 3] });
    });
  });
});
