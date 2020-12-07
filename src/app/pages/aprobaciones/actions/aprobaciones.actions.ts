import { createAction, props } from '@ngrx/store';

export const loadAprobacioness = createAction(
  '[Aprobaciones] Load Aprobacioness'
);

export const loadAprobacionesSeleccionado = createAction(
  '[Aprobaciones] Load Aprobaciones Seleccionado',
  props(),
);

export const cargarDatosIniciales = createAction(
  '[Aprobaciones] Cargar DatosIniciales',
  props(),
);
