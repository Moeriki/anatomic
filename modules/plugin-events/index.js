import createDebug from 'debug';
import EventEmitter from 'eventemitter2';

const debug = createDebug('anatomic:events');

const NAMESPACE = '$events';

const createNamespace = () => {
  const namespace = {};

  namespace.emitter = new EventEmitter({
    verboseMemoryLeak: true,
    wildcard: true,
  });

  namespace.emitter.on('*', (type) => {
    debug('heard %s', type);
  });

  return namespace;
};

const extension = {
  /**
   * @param {string} eventName
   * @param {...any} args
   * @return {this}
   */
  emit(eventName, ...args) {
    this.plugin[NAMESPACE].emitter.emit(eventName, ...args);
    return this;
  },
  /**
   * @param {string} eventName
   * @param {...any} args
   * @return {Promise<Array<any>>} results of the listeners via Promise.all
   */
  emitAsync(eventName, ...args) {
    return this.plugin[NAMESPACE].emitter.emitAsync(eventName, ...args);
  },
  /**
   * @param {string} eventName
   * @param {function} listener
   * @return {this}
   */
  off(eventName, listener) {
    this.plugin[NAMESPACE].emitter.off(eventName, listener);
    return this;
  },
  /**
   * @param {string} eventName
   * @param {function} listener
   * @return {this}
   */
  on(eventName, listener) {
    this.plugin[NAMESPACE].emitter.on(eventName, listener);
    return this;
  },
  /**
   * @param {string} eventName
   * @param {function} listener
   * @return {this}
   */
  once(eventName, listener) {
    this.plugin[NAMESPACE].emitter.once(eventName, listener);
    return this;
  },
  /**
   * @param {string} eventName
   * @return {Promise<Array<any>>} arguments of the event
   */
  onceThen(eventName) {
    return new Promise((resolve) => {
      this.once(eventName, (...args) => resolve(args));
    });
  },
};

/**
 * @param {Anatomic} app
 */
export default (app) => {
  app.plugin.$events = createNamespace();

  Object.getPrototypeOf(app).extend(extension);
};
