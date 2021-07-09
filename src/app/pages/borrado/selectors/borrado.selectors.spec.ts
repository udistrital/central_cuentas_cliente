import * as fromBorrado from '../reducers/borrado.reducer';
import { selectBorradoState } from './borrado.selectors';

describe('Borrado Selectors', () => {
  it('should select the feature state', () => {
    const result = selectBorradoState({
      [fromBorrado.borradoFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
