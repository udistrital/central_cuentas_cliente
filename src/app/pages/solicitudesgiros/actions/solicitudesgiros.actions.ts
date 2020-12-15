import { createAction, props } from '@ngrx/store';

export const loadSolicitudesgiros = createAction(
  '[Solicitudes] Load Solicitudes'
);

export const loadSolicitudgiroSeleccionado = createAction(
  '[Solicitudes] Load Solicitudesgiros Seleccionado',
  props(),
);




