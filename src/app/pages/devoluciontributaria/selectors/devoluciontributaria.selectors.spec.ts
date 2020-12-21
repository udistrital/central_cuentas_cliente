import * as fromDevoluciontributaria from '../reducers/devoluciontributaria.reducer';
import { selectDevoluciontributariaState } from './devoluciontributaria.selectors';

describe('Devoluciontributaria Selectors', () => {
  it('should select the feature state', () => {
    const result = selectDevoluciontributariaState({
      [fromDevoluciontributaria.devoluciontributariaFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
