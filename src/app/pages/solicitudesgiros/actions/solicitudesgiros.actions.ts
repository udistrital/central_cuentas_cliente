import { createAction, props } from '@ngrx/store';

export const loadSolicitudesgiros = createAction(
  '[Solicitudes] Load Solicitudes'
);

export const loadSolicitudgiroSeleccionado = createAction(
  '[Solicitudes] Load Solicitudesgiros Seleccionado',
  props(),
);

export const loadInfosolicitudgiro = createAction(
  '[Solicitudes] Load Informacion Solicitud',
  props(),
);

export const loadAutorizaciongiro = createAction(
  '[Solicitudes] Load Autorizacion Giro',
  props(),
);

export const loadDocumentos = createAction(
  '[Solicitudes] Load Documentos Giro',
  props(),
);
