import { createAction, props } from '@ngrx/store';

export const CatchError = createAction(
  '[Shared] Catch Error',
  props<{}>()
);

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

export const subirAutorizacionGiro = createAction(
  '[Solicitudes] Subir Autorizaciones de giro al crud de central cuentas',
  props<{ element: any }>(),
);

export const actualizarAutorizacionGiro = createAction(
  '[Solicitudes] Actualizar Autorizaciones de giro al crud de central cuentas',
  props<{ id: string, element: any, path?: string}>(),
);

export const getSolicitudesGiro = createAction(
  '[Solicitudes] Obtener solicitudes de giro del crud de central de cuentas',
  props<{sortby: string[], order: string[]}>(),
);

export const cargarSolicitudesGiro = createAction(
  '[Solicitudes] Carga solicitudes de giro al store',
  props(),
);

export const cargarSolicitudGiro = createAction(
  '[Solicitudes] Carga la solicitud de giro al store',
  props(),
);
