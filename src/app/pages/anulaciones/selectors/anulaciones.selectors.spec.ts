import * as fromAnulaciones from '../reducers/anulaciones.reducer';
import { selectAnulacionesState } from './anulaciones.selectors';

describe('Anulaciones Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAnulacionesState({
      [fromAnulaciones.anulacionesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
