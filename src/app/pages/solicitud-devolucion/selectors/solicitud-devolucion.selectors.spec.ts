import * as fromSolicitudDevolucion from '../reducers/solicitud-devolucion.reducer';
import { selectSolicitudDevolucionState } from './solicitud-devolucion.selectors';

describe('SolicitudDevolucion Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSolicitudDevolucionState({
      [fromSolicitudDevolucion.solicitudDevolucionFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
