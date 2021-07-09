import * as fromSolicitudesgiros from '../reducers/solicitudesgiros.reducer';
import { selectSolicitudesgirosState } from './solicitudesgiros.selectors';

describe('Solicitudesgiros Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSolicitudesgirosState({
      [fromSolicitudesgiros.solicitudesgirosFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
