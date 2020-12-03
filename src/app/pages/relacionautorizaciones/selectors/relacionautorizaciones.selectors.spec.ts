import * as fromRelacionautorizaciones from '../reducers/relacionautorizaciones.reducer';
import { selectRelacionautorizacionesState } from './relacionautorizaciones.selectors';

describe('Relacionautorizaciones Selectors', () => {
  it('should select the feature state', () => {
    const result = selectRelacionautorizacionesState({
      [fromRelacionautorizaciones.relacionautorizacionesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
