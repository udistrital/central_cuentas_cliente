import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSolicitudDevolucion from '../reducers/solicitud-devolucion.reducer';

export const selectSolicitudDevolucionState = createFeatureSelector<fromSolicitudDevolucion.State>(
  fromSolicitudDevolucion.solicitudDevolucionFeatureKey
);

export const getTipoDevolucion = createSelector(
  selectSolicitudDevolucionState,
  (state: fromSolicitudDevolucion.State) => state.TipoDevolucion
);

export const getDatosSolicitud = createSelector(
  selectSolicitudDevolucionState,
  (state: fromSolicitudDevolucion.State) => state.DatosSolicitud
);

export const getDatosSolicitante = createSelector(
  selectSolicitudDevolucionState,
  (state: fromSolicitudDevolucion.State) => state.DatosSolicitante
);

export const getDatosTablaAnexos = createSelector(
  selectSolicitudDevolucionState,
  (state: fromSolicitudDevolucion.State) => state.DatosTablaAnexos
);

export const getDatosTablaImpuestos = createSelector(
  selectSolicitudDevolucionState,
  (state: fromSolicitudDevolucion.State) => state.DatosTablaImpuestos
);

export const getTotalSolicitado = createSelector(
  selectSolicitudDevolucionState,
  (state: fromSolicitudDevolucion.State) => state.TotalSolicitado
);
