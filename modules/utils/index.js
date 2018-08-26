import { mapValues as _mapValues, set as _set } from 'lodash/fp';

export const mapValuesWithKey = _mapValues.convert({ cap: false });

export const set = _set.convert({ immutable: false });

export { defaultsDeep, get, isPlainObject, merge } from 'lodash/fp';
