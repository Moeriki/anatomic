import { mapValues } from '..';

describe('mapValues()', () => {
  it('should map values with key', () => {
    const fun = jest.fn();
    mapValues(fun)({ key1: 1, key2: 2 });
    expect(fun).toHaveBeenCalledTimes(2);
    expect(fun).toHaveBeenCalledWith(1, 'key1');
    expect(fun).toHaveBeenCalledWith(2, 'key2');
  });
});
