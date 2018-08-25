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
  emit(...args) {
    return this.plugin[NAMESPACE].emitter.emit(...args);
  },
  emitAsync(...args) {
    return this.plugin[NAMESPACE].emitter.emitAsync(...args);
  },
  off(...args) {
    this.plugin[NAMESPACE].emitter.off(...args);
    return this;
  },
  on(...args) {
    this.plugin[NAMESPACE].emitter.on(...args);
    return this;
  },
  once(...args) {
    this.plugin[NAMESPACE].emitter.once(...args);
    return this;
  },
  onceThen(eventName) {
    return new Promise((resolve) => {
      this.once(eventName, (...args) => resolve(args));
    });
  },
};

export default (app) => {
  app.plugin.$events = createNamespace();

  Object.getPrototypeOf(app).extend(extension);
};
