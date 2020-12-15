import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSolicitudesgiros from '../reducers/solicitudesgiros.reducer';

export const selectSolicitudesgirosState = createFeatureSelector<fromSolicitudesgiros.State>(
  fromSolicitudesgiros.solicitudesgirosFeatureKey
);

export const getSolicitudgiroSeleccionado = createSelector(
  selectSolicitudesgirosState,
  (state: fromSolicitudesgiros.State) => state.SolicitudgiroSeleccionado
);
