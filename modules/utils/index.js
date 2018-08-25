/* eslint import/prefer-default-export:off */

export const mapValues = (iteratee) => (obj) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: iteratee(value, key) }),
    {},
  );
