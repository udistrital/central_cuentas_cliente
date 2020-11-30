import { createAction, props } from '@ngrx/store';

export const loadSolicitudesgiros = createAction(
  '[Solicitudes] Load Solicitudes'
);

export const loadSolicitudgiroSeleccionado = createAction(
  '[Solicitudesgiros] Load Solicitudesgiros Seleccionado',
  props(),
);




