// import globby from 'globby';

const extension = {
  /**
   * @param {object} options
   * @param {string} options.pattern
   * @param {string} options.register
   */
  glob(opts = {}) {
    opts.register = opts.register || this.register;
    // const filepaths = globby.sync(opts.pattern);
    return this;
  },
};

export default (app) => {
  Object.getPrototypeOf(app).extend(extension);
};
