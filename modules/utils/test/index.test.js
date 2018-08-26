import { mapValuesWithKey } from '..';

describe('mapValuesWithKey()', () => {
  it('should map values with key', () => {
    const fun = jest.fn();
    const source = { key1: 1, key2: 2 };
    mapValuesWithKey(fun, source);
    expect(fun).toHaveBeenCalledTimes(2);
    expect(fun).toHaveBeenCalledWith(1, 'key1', source);
    expect(fun).toHaveBeenCalledWith(2, 'key2', source);
  });
});
