import * as fromAprobaciones from '../reducers/aprobaciones.reducer';
import { selectAprobacionesState } from './aprobaciones.selectors';

describe('Aprobaciones Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAprobacionesState({
      [fromAprobaciones.aprobacionesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
