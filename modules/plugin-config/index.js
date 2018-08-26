import deepmerge from 'deepmerge';
import isPlainObject from 'is-plain-object';

/**
 * When merging, overwrite arrays completely.
 * https://github.com/KyleAMathews/deepmerge#arraymerge
 */
const arrayMerge = (dst, src) => src;

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
    return new Options(options).merge(this);
  },
  /**
   * @param {Array<string>|string} path
   * @return {any}
   */
  get(path) {
    const arrPath = Array.isArray(path) ? path : path.split('.');
    const result = arrPath.reduce(
      (acc, prop) => (acc == null ? undefined : acc[prop]),
      this,
    );
    return isPlainObject(result) ? new Options(result) : result;
  },
  /**
   * @param {object} options
   * @return {Options}
   */
  merge(options) {
    return new Options(deepmerge(this, options, { arrayMerge }));
  },
});

/**
 * @param {Anatomic} app
 */
export default (app) => {
  Object.setPrototypeOf(app.options, Options.prototype);
};
