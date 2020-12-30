import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSolicitudDevolucion from '../reducers/solicitud-devolucion.reducer';

export const selectSolicitudDevolucionState = createFeatureSelector<fromSolicitudDevolucion.State>(
  fromSolicitudDevolucion.solicitudDevolucionFeatureKey
);

export const getTipoDevolucion = createSelector(
  selectSolicitudDevolucionState,
  (state: fromSolicitudDevolucion.State) => state.TipoDevolucion
);