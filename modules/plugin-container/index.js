import createDebug from 'debug';
import fnArgs from 'fn-args';
import { defaultsDeep } from '@anatomic/utils';

const NAMESPACE = '$container';

const debug = createDebug('anatomic:container');
const defaultNamespace = defaultsDeep({ container: {}, factories: {} });

const extension = {
  /**
   * @param {function} func
   * @return {any}
   */
  apply(func) {
    const dependencies = fnArgs(func);
    return func(...dependencies.map(this.get, this));
  },
  /**
   * @param {string} name
   * @return {any}
   */
  get(name) {
    const { container, factories } = this.plugin[NAMESPACE];
    if (name == null) {
      return container;
    }
    if (name in container) {
      return container[name];
    }
    if (name in factories) {
      debug('produced %s', name);
      container[name] = this.apply(factories[name]);
      return container[name];
    }
    return undefined;
  },
  /**
   * @param {string} name
   * @param {function} factory
   * @return {this}
   */
  register(name, factory) {
    const { factories } = this.plugin[NAMESPACE];
    debug('registered %s', name);
    factories[name] = factory;
    return this;
  },
  /**
   * @param {function} func
   * @return {this}
   */
  run(func) {
    this.apply(func);
    return this;
  },
  /**
   * @param {object} values
   * @return {this}
   */
  set(values) {
    const { container } = this.plugin[NAMESPACE];
    Object.assign(container, values);
    return this;
  },
};

/**
 * @param {Anatomic} app
 */
export default (app) => {
  app.plugin[NAMESPACE] = defaultNamespace(app.plugin[NAMESPACE]);

  Object.getPrototypeOf(app).extend(extension);
};
