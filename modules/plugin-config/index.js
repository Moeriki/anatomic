import { get, isPlainObject, merge } from '@anatomic/utils';

/**
 * @constructor
 * @param {object} [options]
 */
export function Options(options) {
  Object.assign(this, options);
}

Object.assign(Options.prototype, {
  /**
   * @param {object} options
   * @return {Options}
   */
  defaults(options) {
    return new Options(options).merge(this.plain());
  },
  /**
   * @param {Array<string>|string} path
   * @return {any}
   */
  get(path) {
    const result = get(path, this);
    return isPlainObject(result) ? new Options(result) : result;
  },
  /**
   * @param {object} options
   * @return {Options}
   */
  merge(options) {
    return new Options(merge(this.plain(), options));
  },
  /**
   * @return {object}
   */
  plain() {
    return Object.assign({}, this);
  },
});

/**
 * @param {Anatomic} app
 */
export default (app) => {
  Object.setPrototypeOf(app.options, Options.prototype);
};
