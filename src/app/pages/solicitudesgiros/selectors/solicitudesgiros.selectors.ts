import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSolicitudesgiros from '../reducers/solicitudesgiros.reducer';

export const selectSolicitudesgirosState = createFeatureSelector<fromSolicitudesgiros.State>(
  fromSolicitudesgiros.solicitudesgirosFeatureKey
);

export const getSolicitudgiroSeleccionado = createSelector(
  selectSolicitudesgirosState,
  (state: fromSolicitudesgiros.State) => state.SolicitudgiroSeleccionado
);

export const getInfosolicitudes = createSelector(
  selectSolicitudesgirosState,
  (state: fromSolicitudesgiros.State) => state.InfoSolicitudgiro
);

export const getAutorizaciongiro = createSelector(
  selectSolicitudesgirosState,
  (state: fromSolicitudesgiros.State) => state.Autorizaciongiro
);

export const getDocumentosgiro = createSelector(
  selectSolicitudesgirosState,
  (state: fromSolicitudesgiros.State) => state.Documentosgiro
);
