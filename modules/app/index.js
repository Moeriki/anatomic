import { mapValuesWithKey } from '@anatomic/utils';

// private

/**
 * @param {any} value
 * @return {object} property descriptor
 */
const createExtension = (value) => ({
  configurable: false,
  enumerable: true,
  writable: false,
  value,
});

/**
 * @param {object} extensions
 * @return {object} properties descriptors
 */
const createExtensions = mapValuesWithKey(createExtension);

// exports

export const Anatomic = {
  /**
   * @param {object} extensions
   * @return {this}
   */
  extend(extensions) {
    Object.defineProperties(this, createExtensions(extensions));
    return this;
  },
  // global() {
  //   global.app = this;
  // },
  /**
   * @param {function} plugin
   * @return {this}
   */
  use(plugin) {
    plugin(this);
    return this;
  },
};

/**
 * @param {object} [options]
 * @return {Anatomic} app
 */
export default (options = {}) => {
  const app = Object.create(Anatomic);

  app.env = process.env.NODE_ENV
    ? process.env.NODE_ENV.toLowerCase()
    : 'development';

  app.options = options;

  app.plugin = {};

  return app;
};
