import { createAction, props } from '@ngrx/store';

export const loadSolicitudDevolucions = createAction(
  '[SolicitudDevolucion] Load SolicitudDevolucions'
);

export const seleccionarTipoDevolucion = createAction(
  '[SolicitudDevolucion] Seleccionar TipoDevolucion',
  props()
);

export const seleccionarDatosSolicitud = createAction(
  '[SolicitudDevolucion] Seleccionar DatosSolicitud',
  props()
);

export const seleccionarDatosSolicitante = createAction(
  '[SolicitudDevolucion] Seleccionar DatosSolicitante',
  props()
);

export const seleccionarDatosTablaAnexos = createAction(
  '[SolicitudDevolucion] Seleccionar DatosTablaAnexos',
  props()
);

export const seleccionarDatosTablaImpuestos = createAction(
  '[SolicitudDevolucion] Seleccionar DatosTablaImpuestos',
  props()
);

export const cambiarTotalSolicitado = createAction(
  '[SolicitudDevolucion] Cambiar TotalSolicitado',
  props()
);
