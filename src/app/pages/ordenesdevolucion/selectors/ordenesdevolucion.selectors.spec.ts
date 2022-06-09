import * as fromOrdenesdevolucion from '../reducers/ordenesdevolucion.reducer';
import { selectOrdenesdevolucionState } from './ordenesdevolucion.selectors';

describe('Solicitudesgiros Selectors', () => {
  it('should select the feature state', () => {
    const result = selectOrdenesdevolucionState({
      [fromOrdenesdevolucion.ordenesdevolucionFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
